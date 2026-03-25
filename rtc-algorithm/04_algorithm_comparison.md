# 🔬 第四章：算法关键差异全景对比

> 在了解了传统的丢包驱动算法、BBR 以及 GCC 后，本章将它们放在同一个擂系上进行横向对比。
> 通过直观的代码思维与场景推演，彻底搞懂它们"为什么这么设计"。

---

## 1. 核心哲学：你是怎么判断网络拥堵的？

这是三种算法最本质的分野：**拥塞信号的选取时机**。

```
算法           拥塞信号                 检测时机（针对路由器队列）
-----------   -------------------    ------------------------
基础算法       丢包率 (Loss)           已经溢出（最滞后，造成死伤才反应）
GCC           延迟梯度 (Trendline)    刚刚积压（最敏感，提早预警）
BBR           带宽延迟积 (BDP 模型)    不论是否积压，只管我的物理上限（最客观）
```

### 代码视角的差异

```cpp
// ============================================
// ① 基础算法（如早期的 TCP Reno/CUBIC 变体）
// 核心哲学：不见棺材不掉泪
// ============================================
class BasicCongestionSignal {
public:
    bool IsCongested(float loss_rate) const {
        // 只有包真的被路由器扔了，才承认拥塞
        return loss_rate > 0.10f;  
    }
};

// ============================================
// ② GCC (WebRTC 标配)
// 核心哲学：防乱于未然，做个敏感的老司机
// ============================================
class GCCCongestionSignal {
    TrendlineFilter filter_;
    OveruseDetector detector_;
public:
    BandwidthUsage DetectCongestion(double recv_delta, double send_delta) {
        // 把每一个包的到达时间差记下来，画线看趋势
        filter_.UpdateTrendline(recv_delta, send_delta, Now());
        // 只要趋势显示队伍在变长，马上拉响警报，绝不等丢包！
        return detector_.Detect(filter_.GetTrendline(), ...);
    }
};

// ============================================
// ③ BBR (Google 大规模数据分发标配)
// 核心哲学：我有物理模型，一切尽在计算中
// ============================================
class BBRCongestionSignal {
    int64_t btl_bw_bps_;   // 近期最大带宽
    int64_t rt_prop_ms_;   // 近期最小延迟
public:
    bool IsAboveBDP(int64_t inflight_bytes) const {
        // 管你丢没丢包、有没有延迟，我的物理模型算出来这条路最多只能容纳这么多车
        int64_t optimal_bdp = btl_bw_bps_ * rt_prop_ms_ / 8000;
        // 在途车辆超过最优容量？那你就是发多了
        return inflight_bytes > optimal_bdp;  
    }
};
```

---

## 2. 行为模式：发现拥塞后该怎么办？

面对网络的变化，算法做出的"反制动作"决定了视频的卡顿程度和恢复速度。

### 码率决策的逻辑对比

```cpp
// ① 基础算法：纯盲调（容易来回拉锯）
class BasicRateController {
public:
    int64_t ComputeNewBitrate(...) {
        if (congested) return current * 0.85; // 发生拥塞，盲目砍 15%
        else           return current * 1.08; // 没事，盲目加 8%
    }
};

// ② GCC：AIMD + 实际吞吐量锚定（稳健）
class GCCRateController {
public:
    int64_t ComputeNewBitrate(Signal signal, int64_t actual_acked_bps) {
        if (signal == kOveruse) {
            // 关键：不盲目砍当前码率，而是看"刚才实际上网络收到了多少"
            // 基于真实的、已被证明吞吐量去打折 (0.85)，能最快恢复稳定
            return actual_acked_bps * 0.85;  
        } else if (signal == kNormal) {
             // 离上限近就慢点加(+1kbps)，没摸到上限就快点加(x1.08)
             return IsNearMax() ? (current + 1000) : (current * 1.08);
        }
    }
};

// ③ BBR：根本就不调码率，只管按模型发
class BBRRateController {
public:
    // 特点：BBR 认为调整"码率"是个伪命题。它只调整 Pacing Gain（起搏器倍率）
    int64_t ComputePacingRate(State current_state) {
        double pacing_gain = GetPacingGain(current_state);
        // 如果我在排空期(DRAIN)，gain 就是 0.5；如果在探查期，就是 1.25
        return estimated_btl_bw * pacing_gain; 
    }
};
```

---

## 3. 同场竞技：一场 10 秒钟的网络推演

假设现在的环境是：**一条 10 Mbps 的宽带，物理延迟 50ms。**网络上有三种跑着不同算法的数据流。
在第 `t=5s` 时，网管突然把带宽限速到了 **5 Mbps**。看它们各自如何反应：

```text
====== 突发限速 10Mbps -> 5Mbps ======

[ 基础丢包算法 ]
- 回应：迟钝
- 动作推演：
  5.0s：限速发生。发送端还在用 10M 发数据。
  5.2s：路由器缓冲区渐渐被塞满 5M 的积压。
  5.5s：路由器缓冲区爆了，发生巨量丢包！
  5.6s：收到丢包信号！开始大砍码率 10M -> 8.5M -> 7M -> 5M...
- 结果：期间延迟飙升数百毫秒，发生严重的花屏/卡顿。

[ GCC 算法 ]
- 回应：极快
- 动作推演：
  5.0s：限速发生。
  5.1s：路由器刚开始积压，接收方发现包与包的间隔被拉长了。
  5.15s: Trendline 斜率骤升！触发 Overusing 报警。
  5.2s：直接获取当前实际吞吐量(刚刚降到5M)，乘以 0.85 降到 4.2M。
- 结果：几乎没有挤占路由器缓冲，延迟微增 10-20ms 后迅速归位，视频丝滑过渡，画质平稳下降。

[ BBR 算法 ]
- 回应：平稳模型化
- 动作推演：
  5.0s：限速发生。
  5.x秒内：BBR 发现在之后的几个 RTT 里，算出来的 BtlBw(瓶颈带宽) 从 10M 掉到了 5M。
  由于 BBR 一直在按 `5M * gain` 的模型发算，它不需要"报警"，直接按照降低后的 BtlBw 同步收缩了发包速率。
- 结果：非常平顺，没有多余判定。
```

---

## 4. 终极拷问：既然大家都很牛，为什么会有公平性问题？

**什么是拥塞控制的公平性（Fairness）？**
即同一条物理链路，大家各凭本事，最后能不能**平分带宽**。

**当谦谦君子 GCC 遇上硬核暴徒 BBR/CUBIC：**
这是目前 RTC 领域最让人头疼的问题。如果你在手机上用 GCC 开着视频会议，同时后台用 BBR（比如优酷/Netflix）在下电影。

1. **GCC 想做个好人**：只要发现稍微有一点延迟波动（Trendline 飙升），GCC 为了保住你的视频低延迟，立刻会大砍码率，给别人让路。
2. **BBR 是冷酷机器**：BBR 的 `PROBE_BW` 阶段天生就要往网络里多发 25% 的数据，故意制造一点微小的拥塞去测试水管极限。
3. **CUBIC 更是流氓**：除非网络丢包（路由器被彻底塞爆），否则绝不减速。

**结局**：BBR 和 CUBIC 制造的这些"轻微排队"，直接把高度敏感的 GCC 给吓坏了。GCC 一退再退，最后视频画质掉成马赛克，而下电影的 BBR/CUBIC 满载运行，霸占了 80% 以上的带宽。

> 这就是为什么现代的 GOOG-CC（改良版 GCC）要在"低延迟"和"高侵略性"之间不断寻找新的平衡点，甚至考虑引入基于探测和主动抢占的变种设计。

---

## 5. 总结：该怎么选？

不需要纠结哪个是"最好的算法"，只需要对号入座找"最适合的场景"。

```
你的业务场景是？
    │
    ├─【实时互动（如视频会议、云游戏、连麦直播）】
    │       └─ 选 GCC (WebRTC 标配)。
    │          理由：延迟就是生命。宁可损失画质，绝不可让操作/声音滞后。如果延迟容忍度在 50~150ms，它是最优解。
    │
    ├─【大规模点播、文件下载、防弱网卡顿（如抖音、YouTube）】
    │       └─ 选 BBR（配合 QUIC 或 TCP）。
    │          理由：不怕几百毫秒的延迟缓冲，只要能最大化吞吐量，扛得住 20%的无线乱丢包，体验就能拉满。
    │
    ├─【超低延迟工业级控制、高频电竞（RTT < 20ms）】
    │       └─ 选 SCReAM 或自己魔改的自时钟算法。
    │          理由：在两三毫秒的极速网络里，GCC 的趋势线太慢了会迷茫。
    │
    └─【我就自己随便写个 Demo 练手】
            └─ 选 基础的 AIMD 纯丢包算法。
               理由：几行代码就能跑起来，理解基本原理。
```

---

**学习路径总结：**

1. 🟢 **网络底层逻辑**：理解 带宽上限、RTT、队列延迟与 Bufferbloat（第一章）
2. 🟡 **建模派代表 BBR**：理解什么是 BDP 模型，"找出最大带宽和最小延迟"的思想（第二章）
3. 🔵 **预测派代表 GCC**：彻底吃透 Trendline、TWCC 反馈与提前刹车的艺术（第三章）
4. 🔴 **场景与抉择**：没有银弹，理解算法间的妥协与公平性博弈（本章）

**🎉 恭喜！你已完成了 RTC 拥塞控制所有的核心理论学习！**
