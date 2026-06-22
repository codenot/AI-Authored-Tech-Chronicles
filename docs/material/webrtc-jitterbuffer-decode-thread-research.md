# WebRTC JitterBuffer 与解码线程联动调研

> 目标：梳理 WebRTC 音视频接收链路中 RTP、jitter/frame buffer、解码调度器和 decode queue 的协作方式，并对当前混录 `AdaptiveJitterBuffer` / `MixedRecordDecodeExecutor` 的设计给出参考。
>
> 参考分支：WebRTC `main` 分支。视频源码入口以 `video_receive_stream2.cc`、`rtp_video_stream_receiver2.cc`、`video_stream_buffer_controller.cc` 为主；音频源码入口以 `audio/channel_receive.cc`、`audio/audio_transport_impl.cc`、`audio/audio_receive_stream.cc`、`modules/audio_coding/neteq/neteq_impl.cc` 为主。

## 1. 核心结论

WebRTC 的视频解码不是“每个 RTP 包到来就触发 decoder 拉一次帧”。

它采用的是分层事件驱动：

```text
RTP packet
  -> packet buffer 组包
  -> 完整 EncodedFrame
  -> reference/frame buffer 判断是否连续、可解码
  -> decoder ready 时，根据 render timing 调度 release
  -> 到点 release 一个 temporal unit
  -> post 到 decode_queue 真正解码
  -> 解码完成后 StartNextDecode，再允许调度下一帧
```

因此，WebRTC 的关键触发点不是 packet arrival，而是：

- packet buffer 拼出完整 frame；
- frame/reference buffer 判断出 decodable temporal unit；
- decoder 完成上一帧后重新 ready；
- timing scheduler 到达 latest decode time。

这对我们当前实现的启发是：视频路径不应在每个 RTP 包到来时无条件 `NotifyTrack()`，更理想的是让 jitter buffer 输出“完整帧/可解码帧就绪”事件，再触发解码调度。

WebRTC 的音频路径和视频路径不同。音频没有类似视频的独立 `decode_queue_` 和 `FrameDecodeScheduler`，而是：

```text
RTP packet
  -> ChannelReceive::OnRtpPacket()
  -> ChannelReceive::ReceivePacket()
  -> ChannelReceive::OnReceivedPayloadData()
  -> NetEq::InsertPacket()

音频设备/混音器每 10ms 拉取
  -> AudioTransportImpl::NeedMorePlayData()
  -> AudioMixer::Mix()
  -> AudioReceiveStreamImpl::GetAudioFrameWithInfo()
  -> ChannelReceive::GetAudioFrameWithInfo()
  -> NetEq::GetAudio()
  -> NetEq 内部决定正常解码、PLC、CNG、accelerate 或 preemptive expand
```

所以音频也不是“每个 RTP 到来就立刻解码”。RTP 到来主要是喂给 NetEq；真正的音频解码发生在播放/混音线程按 10ms 节奏调用 `GetAudio()` 时。

## 2. WebRTC 视频接收主链路

### 2.1 RTP 包进入 packet buffer

入口位于 `RtpVideoStreamReceiver2::ReceivePacket()`：

- 空 payload 只更新接收状态，不进入解码链路。
- RED/FEC 先拆封。
- 普通视频 RTP 先按 payload type 找 depacketizer。
- 解析 payload 后进入 `OnReceivedPayloadData()`。

在 `OnReceivedPayloadData()` 中，WebRTC 会把 RTP 包包装成 packet buffer 能理解的 packet：

```text
RtpPacketReceived
  -> ParsedRtpPayload
  -> PacketBuffer::Packet
  -> packet_buffer_.InsertPacket(...)
```

源码参考：

- `RtpVideoStreamReceiver2::ReceivePacket()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/rtp_video_stream_receiver2.cc
- `RtpVideoStreamReceiver2::OnReceivedPayloadData()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/rtp_video_stream_receiver2.cc

关键点：单个 RTP 包只是推进 packet buffer 状态，不会直接进入 decoder。

### 2.2 packet buffer 拼出完整帧

packet buffer 发现某个视频帧完整后，会通过 `OnInsertedPacket()` 组装 `RtpFrameObject`，再进入 `OnAssembledFrame()`。

后续流程：

```text
OnInsertedPacket()
  -> 组装 RtpFrameObject
  -> OnAssembledFrame()
  -> reference_finder_->ManageFrame(...)
  -> OnCompleteFrames(...)
  -> complete_frame_callback_->OnCompleteFrame(...)
```

源码参考：

- `RtpVideoStreamReceiver2::OnInsertedPacket()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/rtp_video_stream_receiver2.cc
- `RtpVideoStreamReceiver2::OnAssembledFrame()` / `OnCompleteFrames()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/rtp_video_stream_receiver2.cc

关键点：WebRTC 在这里才从 packet 粒度提升到 frame 粒度。

## 3. 完整帧进入 FrameBuffer

`VideoReceiveStream2::OnCompleteFrame()` 收到完整 `EncodedFrame` 后，会把它插入 `VideoStreamBufferController`：

```text
VideoReceiveStream2::OnCompleteFrame(...)
  -> buffer_->InsertFrame(std::move(frame))
```

源码参考：

- `VideoReceiveStream2::OnCompleteFrame()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_receive_stream2.cc

现代 WebRTC 中，`buffer_` 对应 `VideoStreamBufferController`。它内部持有 `FrameBuffer`，负责判断：

- 该帧是否可插入；
- 是否形成新的 continuous temporal unit；
- 是否存在 next decodable temporal unit；
- 是否应该调度 release 给 decoder。

源码参考：

- `VideoStreamBufferController::InsertFrame()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_stream_buffer_controller.cc
- `api/video/frame_buffer.h`：  
  https://webrtc.googlesource.com/src/+/lkgr/api/video/frame_buffer.h
- `api/video/frame_buffer.cc`：  
  https://webrtc.googlesource.com/src/+/44825581b5ec2fab212335e3b8408b21166bbdbb/api/video/frame_buffer.cc

`FrameBuffer` 的职责不是按 RTP 包唤醒 decoder，而是维护一个“按 frame id / temporal unit 排序后的可解码流”。

## 4. Decoder Ready 门控

`VideoStreamBufferController` 中有一个关键状态：`decoder_ready_for_new_frame_`。

当上一帧尚未解码完成时，即使 frame buffer 中已有可解码帧，也不会继续 release 下一帧。

核心逻辑在 `StartNextDecode()`：

```text
StartNextDecode(keyframe_required)
  -> decoder_ready_for_new_frame_ = true
  -> MaybeScheduleFrameForRelease()
```

而 `MaybeScheduleFrameForRelease()` 开头会检查：

```text
if (!decoder_ready_for_new_frame_ || !decodable_tu_info) {
  return;
}
```

源码参考：

- `VideoStreamBufferController::StartNextDecode()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_stream_buffer_controller.cc
- `VideoStreamBufferController::MaybeScheduleFrameForRelease()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_stream_buffer_controller.cc

关键点：WebRTC 是“单流一次只 release 一个 temporal unit 给 decoder”，解码完成后再通过 `StartNextDecode()` 归还令牌。

## 5. 按播放时间调度 release

即便 frame 已经 decodable，WebRTC 也不会立即解码所有可用帧。

`MaybeScheduleFrameForRelease()` 会调用 `FrameDecodeTiming::OnFrameBufferUpdated()` 计算 `FrameSchedule`：

```text
render_time = timing_->RenderTime(next_temporal_unit_rtp, now)
max_wait    = timing_->MaxWaitingTime(render_time, now, too_many_frames_queued)
latest_decode_time = now + clamp(max_wait)
```

源码参考：

- `FrameDecodeTiming::OnFrameBufferUpdated()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/frame_decode_timing.cc

之后通过 `FrameDecodeScheduler` 调度 release：

```text
frame_decode_scheduler_->ScheduleFrame(
  next_rtp_timestamp,
  schedule,
  FrameReadyForDecode callback)
```

源码参考：

- `FrameDecodeScheduler` 接口：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/frame_decode_scheduler.h
- `TaskQueueFrameDecodeScheduler`：  
  https://webrtc.googlesource.com/src/+/main/video/task_queue_frame_decode_scheduler.h
- `TaskQueueFrameDecodeScheduler::ScheduleFrame()`：  
  https://webrtc.googlesource.com/src/+/0d4b350006eae7dfeeb8c67f16f51b1c62351cee/video/task_queue_frame_decode_scheduler.cc

关键点：jitter/frame buffer 的输出是“到点 release”，不是 decoder 主动不停 poll。

## 6. 到点 release 后进入 decode queue

`FrameDecodeScheduler` 到点后回调 `FrameReadyForDecode()`：

```text
FrameReadyForDecode(rtp_timestamp, render_time)
  -> 再次确认 next decodable frame 仍然匹配
  -> buffer_->ExtractNextDecodableTemporalUnit()
  -> OnFrameReady(frames, render_time)
```

`OnFrameReady()` 会更新 jitter/timing 统计，然后把完整 encoded frame 交给接收流：

```text
receiver_->OnEncodedFrame(std::move(frame))
```

源码参考：

- `VideoStreamBufferController::FrameReadyForDecode()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_stream_buffer_controller.cc
- `VideoStreamBufferController::OnFrameReady()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_stream_buffer_controller.cc

`VideoReceiveStream2::OnEncodedFrame()` 再把真正解码工作 post 到 `decode_queue_`：

```text
decode_queue_->PostTask(...)
  -> HandleEncodedFrameOnDecodeQueue(...)
  -> DecodeAndMaybeDispatchEncodedFrame(...)
```

源码参考：

- `VideoReceiveStream2::OnEncodedFrame()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_receive_stream2.cc
- `VideoReceiveStream2::HandleEncodedFrameOnDecodeQueue()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_receive_stream2.cc

关键点：真正 decoder 调用运行在 decode queue，不运行在 RTP 收包线程，也不运行在 packet/frame buffer 的插入逻辑里。

## 7. 解码完成后重新调度下一帧

`OnEncodedFrame()` 的 decode task 完成后，会 post 回 worker / packet 相关线程，更新 keyframe 状态和 frame decoded 状态，然后调用：

```text
buffer_->StartNextDecode(keyframe_required_);
```

源码参考：

- `VideoReceiveStream2::OnEncodedFrame()` 中 decode 后回调：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/video/video_receive_stream2.cc

这一步相当于归还解码令牌：

```text
decoder_ready_for_new_frame_ = true
MaybeScheduleFrameForRelease()
```

## 8. WebRTC 音频接收与 NetEq 拉取模型

### 8.1 RTP 到来只插入 NetEq

音频 RTP 入口位于 `ChannelReceive::OnRtpPacket()`。它会更新最后接收的 RTP 时间戳、NACK、接收统计、RTP header，然后调用 `ReceivePacket()`。

`ReceivePacket()` 负责处理 payload、可选解密、可选 frame transformer。最终进入 `OnReceivedPayloadData()`。

`OnReceivedPayloadData()` 的核心动作是：

```text
neteq_->InsertPacket(header, payload, RtpPacketInfo(header, receive_time))
```

源码参考：

- `ChannelReceive::OnRtpPacket()` / `ReceivePacket()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/audio/channel_receive.cc
- `ChannelReceive::OnReceivedPayloadData()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/audio/channel_receive.cc

关键点：音频 RTP 收包线程只把包放进 NetEq，不直接驱动 decoder 输出 PCM。

### 8.2 播放/混音线程按 10ms 拉取音频

音频输出由 audio device 或渲染侧周期性拉取。`AudioTransportImpl::NeedMorePlayData()` 会检查本次请求是 10ms 音频，并调用：

```text
mixer_->Mix(...)
```

源码参考：

- `AudioTransportImpl::NeedMorePlayData()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/audio/audio_transport_impl.cc

`AudioReceiveStreamImpl::Start()` 会把接收流加入 `AudioState`，后续 `AudioMixer` 会从各个 source 拉取音频。

源码参考：

- `AudioReceiveStreamImpl::Start()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/audio/audio_receive_stream.cc

### 8.3 NetEq::GetAudio() 内部完成解码和抗丢包决策

混音器拉到具体接收流时，最终进入：

```text
ChannelReceive::GetAudioFrameWithInfo(...)
  -> neteq_->GetAudio(audio_frame)
```

源码参考：

- `ChannelReceive::GetAudioFrameWithInfo()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/audio/channel_receive.cc

`NetEqImpl::GetAudio()` 再进入 `GetAudioInternal()`。这里不是简单“有包就 decode”，而是先通过 controller 决策当前 10ms 应该做什么：

```text
GetAudio()
  -> GetAudioInternal()
  -> GetDecision(...)
  -> controller_->GetDecision(...)
  -> DecodeLoop(...) 或 PLC/CNG/accelerate/preemptive expand 等处理
```

源码参考：

- `NetEqImpl::InsertPacket()` / `GetAudio()` / `GetAudioInternal()` / `DecodeLoop()`：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/modules/audio_coding/neteq/neteq_impl.cc
- NetEq 官方说明：  
  https://webrtc.googlesource.com/src/+/refs/heads/main/modules/audio_coding/neteq/g3doc/index.md

关键点：NetEq 的输出节奏由播放端 10ms tick 决定。即使网络 RTP 包突发到来，NetEq 也不会按包突发解码，而是在每次 `GetAudio()` 时根据 buffer level、丢包、目标延迟和同步约束选择正常解码或音频修复策略。

### 8.4 与视频模型的本质区别

视频路径是：

```text
packet arrival -> frame complete -> decodable -> timing release -> decode_queue 解码
```

音频路径是：

```text
packet arrival -> NetEq packet buffer
audio render tick -> NetEq::GetAudio -> 解码/PLC/CNG/变速
```

因此，在我们的混录实现里，音频不适合照搬视频的“帧完成后 release 给 decoder”模型。更贴近 WebRTC 的做法是：

- RTP 到来只负责喂给 `AdaptiveAudioJitterBuffer`；
- 混音时钟或音频输出 tick 负责按固定间隔拉取 PCM；
- `AdaptiveAudioJitterBuffer` 在拉取时决定正常解码、静音、补偿、丢包隐藏或后续的变速策略；
- 不需要每个 RTP 到来都启动一次音频解码任务。

## 9. 与当前混录实现的差异

当前混录链路大致是：

```text
ReceiveRtpPacket
  -> MixedRecordMediaPipeline::PushRtp(...)
  -> AdaptiveAudio/VideoJitterBuffer::PushRtp(...)
  -> decode_executor_.NotifyTrack(track_id)
  -> MixedRecordTrackDecodeRuntime::PollDecode(...)
  -> buffer.PullNextAudioFrame()/PullNextVideoFrame()
```

`MixedRecordDecodeExecutor` 已经做了一个重要保护：

- 同一个 track 同一时刻只允许一个 lane token 排队或运行；
- 重复 RTP 到达只累计 `pending_counts_`；
- 不会让同一个 decoder 被多个 worker 并发调用。

但它仍然偏 packet-driven：

- 每个 RTP 到来都会尝试 `NotifyTrack()`；
- 视频包还没形成完整帧时，worker 可能被唤醒后拉不到帧；
- 解码调度没有明确区分“包到达”“帧完整”“可解码”“到了应该输出的时间”。

WebRTC 的视频模型更偏 frame-ready / decodable-ready / timing-ready driven；音频模型更偏 render-tick driven。

## 10. 对后续改造的建议

### 10.1 PushRtp 返回事件

建议让 jitter buffer 的 `PushRtp()` 返回结构化结果：

```cpp
enum class JitterPushEvent
{
	kNoop,
	kPacketQueued,
	kFrameCompleted,
	kDecodableFrameReady,
	kNeedKeyframe,
	kTimingUpdated
};
```

视频路径可以只在 `kFrameCompleted` 或 `kDecodableFrameReady` 时通知解码执行器。

音频路径不再建议进入 `MixedRecordDecodeExecutor`。RTP 到来只写入 `AdaptiveAudioJitterBuffer`，由混音/输出时钟在 `ReadAudioFrame()` 中拉取音频。

### 10.2 引入 decoder ready 门控

每条 track runtime 可以维护类似 WebRTC 的状态：

```text
decoder_ready_for_new_frame
scheduled_frame_rtp_timestamp
```

解码开始时置为 false，解码完成后再置为 true，并尝试调度下一帧。

这比单纯 `pending_counts_` 更贴近 WebRTC 的“单流一次 release 一个 temporal unit”模型。

### 10.3 解码调度从 pull 改为 release

当前 executor 是：

```text
worker wakeup -> PollDecode -> buffer.PullNext*
```

更像 WebRTC 的方式是：

```text
jitter/frame buffer 判断 next frame ready
  -> 根据 target delay / render pts 算 release time
  -> release 指定 frame 给 decode runtime
  -> decode runtime 解码该 frame
```

这样可以避免 worker 空跑，也能更自然地实现 hold/drop/keyframe recovery。

### 10.4 视频和音频采用不同触发粒度

音频：

- 一个 RTP 包通常就是一个音频帧；
- 不建议每个 RTP 包到来就通知 decode executor；
- 更贴近 WebRTC 的方向是由混音/输出时钟按固定 tick 拉取；
- 后续重点是 PLC、CNG、加速/扩展和 sync delay。

视频：

- 一个视频帧可能由多个 RTP 包组成；
- 必须等 marker / frame complete；
- 还要考虑关键帧、参考关系、可解码性；
- 应优先采用 frame-ready 或 decodable-ready notify。

## 11. 结论

WebRTC 的 jitter buffer 与解码线程联动可以概括为：

```text
packet-driven ingest
frame-driven assembly
decodability-driven scheduling
timing-driven release
decode-completion-driven next scheduling
```

对我们当前混录实现而言，`MixedRecordDecodeExecutor` 的“per-track 串行、多 track 并行”方向是合理的，但触发机制还可以继续从“每个 RTP notify”收敛到“帧完整/可解码/到点 release notify”。

第一阶段可做的最小优化：

1. `AdaptiveVideoJitterBuffer::PushRtp()` 返回是否形成完整 playable frame。
2. `MixedRecordMediaPipeline::PushRtp()` 只在视频完整帧形成时 `NotifyTrack()`。
3. 音频 RTP 到来只进入 `AdaptiveAudioJitterBuffer`，不进入 `MixedRecordDecodeExecutor`。
4. 音频 source 在混音 tick 内调用 `AdaptiveAudioJitterBuffer::PullNextAudioFrame()`，第一版可继续使用当前 20ms tick。
5. 后续再引入更完整的视频 per-track decode-ready 与 release-time scheduler。
