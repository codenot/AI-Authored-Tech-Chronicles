# WebRTC 音视频同步机制核心实现解构

> 本文档是对 WebRTC (以 M120+ 之后 main 分支为参考) 音视频跨流同步底层的纪实性分析。重点解构 `StreamSynchronization`、`RtpStreamsSynchronizer` 及底层音视频 Buffer 如何联动实现同步。

## 1. 核心延迟运算规则：Max 法则

在 WebRTC 的设计中，音频（NetEq）与视频（Video Jitter Buffer）在决定一帧到底要被缓冲多久（Target Delay）时，遵循的是取最大值（Max）的原则，而非简单相加。

### 1.1 音频侧 (NetEq) 源码验证
`modules/audio_coding/neteq/delay_constraints.cc` 中对最终目标延迟约束的计算：

```cpp
void DelayConstraints::UpdateEffectiveMinimumDelay() {
  const int base_minimum_delay_ms =
      SafeClamp(base_minimum_delay_ms_, 0, MinimumDelayUpperBound());
      
  // minimum_delay_ms_ 来源于上层同步控制器（RtpStreamsSynchronizer）下发的 sync_delay
  effective_minimum_delay_ms_ =
      std::max(minimum_delay_ms_, base_minimum_delay_ms);
}

int DelayConstraints::Clamp(int delay_ms) const {
  // delay_ms 是纯抗网络抖动估算出的 jitter delay
  // 取 max(jitter_delay, effective_minimum_delay_ms_)
  delay_ms = std::max(delay_ms, effective_minimum_delay_ms_);
  
  if (maximum_delay_ms_ > 0) {
    delay_ms = std::min(delay_ms, maximum_delay_ms_);
  }
  return delay_ms;
}
```
**结论**：在音频侧，`Target Delay = max(Jitter Delay, Sync Delay, User Base Delay)`。

### 1.2 视频侧 (VCMTiming) 源码验证
`video/video_receive_stream2.cc` 中响应同步器下发延迟的逻辑：

```cpp
void VideoReceiveStream2::UpdatePlayoutDelays() const {
  const std::initializer_list<std::optional<TimeDelta>> min_delays = {
      frame_minimum_playout_delay_, 
      base_minimum_playout_delay_,
      syncable_minimum_playout_delay_ // <--- 同步器下发的 sync_delay
  };

  // 取最大值作为下限
  std::optional<TimeDelta> minimum_delay = std::max(min_delays);
  
  if (minimum_delay.has_value()) {
      timing_->set_min_playout_delay(*minimum_delay);
  }
}
```

随后在 `modules/video_coding/timing/timing.cc` 计算目标延迟：
```cpp
TimeDelta VCMTiming::VideoDelayTimings::TargetDelay() const {
  // minimum_delay + estimated_max_decode_time + render_delay 为基础视频抗抖动处理耗时
  return std::max(min_playout_delay,
                  minimum_delay + estimated_max_decode_time + render_delay);
}
```
**结论**：在视频侧同样遵循，`Target Delay = max(基于抖动计算的处理延迟, Sync Delay)`。

---

## 2. 相对偏差计算：relative_delay_ms

同步控制器需要知道音视频在**网络传输阶段**的相对延迟偏差。这个计算在 `video/stream_synchronization.cc` 的 `ComputeRelativeDelay` 方法中：

```cpp
bool StreamSynchronization::ComputeRelativeDelay(
    const Measurements& audio_measurement,
    const Measurements& video_measurement,
    int* relative_delay_ms) {
    
  // 1. 将 RTP Timestamp 转换为统一的 NTP 采集时间
  NtpTime audio_last_capture_time =
      audio_measurement.rtp_to_ntp.Estimate(audio_measurement.latest_timestamp);
  NtpTime video_last_capture_time =
      video_measurement.rtp_to_ntp.Estimate(video_measurement.latest_timestamp);
  
  int64_t audio_last_capture_time_ms = audio_last_capture_time.ToMs();
  int64_t video_last_capture_time_ms = video_last_capture_time.ToMs();

  // 2. 偏差 = (视频接收时间 - 音频接收时间) - (视频采集时间 - 音频采集时间)
  *relative_delay_ms =
      video_measurement.latest_receive_time_ms -
      audio_measurement.latest_receive_time_ms -
      (video_last_capture_time_ms - audio_last_capture_time_ms);

  return true;
}
```

### 2.1 数据采样口径
传入该方法的 `Measurements` 结构体，其 `latest_receive_time_ms` 和 `latest_timestamp` 来自于 `ChannelReceive::GetSyncInfo()`（以音频为例）：
- **并非“即将播放”的包**：它取的是 `last_received_rtp_timestamp_`。
- **为什么不用“即将播放”的包？** 
  如果使用队列头部（即将播放）的包来计算偏差，计算结果会严重受到 Jitter Buffer 内部状态的污染：
  1. 如果视频正在等待关键帧（Hold 状态），队头根本没有有效包。
  2. 如果音频正在进行丢包隐藏（PLC），凭空生成的波形并没有真实的 RTP 包对应，无法提取时间戳。
  3. 这种“滞后”的测量意味着你用 200ms 之前的网络状态来决策现在的同步（存在严重的时滞 Lag），会导致控制环路剧烈震荡。
- **物理意义与前瞻控制**：提取的是**网络最前沿、刚刚到达接收端的数据包的时间**。不管底层是不是在抗丢包或等关键帧，最新到达的包能最快速地反映出当前网络传输通道的延迟变化，实现前瞻性控制。

### 2.2 极端抖动的化解策略
既然采样的是最新收到的包，遇到极端网络抖动（例如由于网络乱序，最新收到的其实是一个序号很老的旧包）导致计算出的 `relative_delay_ms` 发生剧烈跳变怎么办？WebRTC 通过以下机制化解：
1. **滑动平均滤波**：偏差计算并不是立刻生效，而是进入一个滤波器 `avg_diff_ms_ = ((kFilterLength - 1) * avg_diff_ms_ + current_diff_ms) / kFilterLength`，极端的离群点会被大幅平滑。
2. **死区控制 (Dead Zone)**：如果算出来的偏差小于 `kMinDeltaMs`（通常为 30ms），系统选择忽略，不触发任何调整。
3. **缓和步长限制**：即使经过平滑，每次应用调整时依然只取误差的一半 `diff_ms = avg_diff_ms_ / 2`，并且硬性限制单次最大调整量不超过 `kMaxChangeMs`（80ms），确保了即便遭遇极端的抖动突刺，同步目标也会平滑渐进地过渡。

### 2.2 为什么必须结合 NTP 采集时间？
若仅凭 `视频接收时间 - 音频接收时间`，无法区分是网络引发的延迟差，还是收发两端设备天然采集时的时钟错位。
引入由 RTCP SR 校准过的 NTP 采集时间相减，可以彻底抵消 Clock Offset。计算出的 `relative_delay_ms` 代表的是纯正的**由网络传输和封包处理额外引入的相对时差**。

---

## 3. 跨流延迟决算：闭环积分控制器

明确了纯网络延迟（`relative_delay_ms`）后，`StreamSynchronization::ComputeDelays` 进行最终的端到端补偿计算。

### 3.1 端到端偏差推导
```cpp
int current_audio_delay_ms = audio_info->current_delay.ms(); // 已经包含了 Jitter 等待的本地延迟
int current_video_delay_ms = video_info->current_delay.ms();

// current_diff_ms = 端到端最终播放时间差
int current_diff_ms = current_video_delay_ms - current_audio_delay_ms + relative_delay_ms;
```
- `current_video_delay_ms - current_audio_delay_ms`：代表本地 Buffer 施加的缓冲等待时间差。
- 两者相加的物理意义：如果网络上视频晚到 100ms（+100），但音频在本地被强行多等了 100ms（-100），则 `current_diff_ms == 0`，代表最终播出的瞬间音视频是严格对齐的。

### 3.2 积分累加突破底层 Max 约束
在得知偏差（`current_diff_ms` > 0 时表示视频仍晚于音频，音频需要等待）后，WebRTC 并未直接将该值作为同步延迟去相加。相反，它采用的是积分控制：

```cpp
  avg_diff_ms_ = ((kFilterLength - 1) * avg_diff_ms_ + current_diff_ms) / kFilterLength;
  int diff_ms = avg_diff_ms_ / 2; // 缓和步长
  
  if (diff_ms > 0) {  
      // 核心机制：累加！
      audio_delay_.extra_ms += diff_ms; 
  }
```

**与底层 Max 法则的博弈推演**：
1. 底层 Buffer 的运算为 `Target = max(Jitter Delay, Sync Delay)`。
2. 同步器初始下发的 `audio_delay_.extra_ms` 极有可能因为远小于网络自身的 `Jitter Delay`，从而在 Max 函数中被丢弃（底层物理缓冲无实质变化）。
3. 此时，下个周期的 `current_diff_ms` 依然存在误差。
4. 控制器无视底层的抵抗，继续执行累加：`audio_delay_.extra_ms += diff_ms`。
5. 如此往复循环（积分项持续增长），最终 `extra_ms` 一定会累加至突破底层的 `Jitter Delay`，强制接管 `Target`，使得底层音频开始切实减速等待。

这种闭环反馈（PID 中的积分项应用）极其优雅地抹平了各种底层不可控的网络抖动量，使得宏观的跨流同步与微观的单流抗抖动被完美解耦。