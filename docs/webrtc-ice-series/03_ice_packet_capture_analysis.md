# 🦈 【深海抓包】Wireshark 视角下的 ICE：探路石到底是什么形状的？

> **题记**
> 伪代码再好看，那也是经过浏览器或 SDK 封装好的温室花朵。当你去服务器排查丢包时，你面对的只有 Wireshark（抓包工具）里密密麻麻的 16 进制字节流。
> 
> ICE 建立连接的时候，到底往网络大动脉里注射了什么药水？这节课，我们要潜入深海，直接把“探路石（网络包）”捞上岸解剖。

很多人的第一直觉是：既然有了 `IP:Port`，是不是直接开始发 `Client Hello` 或者视频帧了？
绝对不是。**在真正的高速路建成之前，ICE 派出的所有“工兵”，本质上全都是 STUN 协议包。** 甚至连后续的保活心跳（Keep-Alive），也是 STUN 包。

我们就用 Wireshark 抓取一次成功的 WebRTC P2P 建联，看看这三包最致命的“探路石”。

---

## 一、 第一包：问路照妖镜（Gathering 阶段）

**场景**：在你刚刚调用 `setLocalDescription` 时，你的电脑向谷歌的公用服务器 `stun.l.google.com:19302` 发射了第一个包。

### 📤 上行：抓包长这样 (`STUN Binding Request`)
```text
User Datagram Protocol, Src Port: 55555, Dst Port: 19302
Simple Traversal of UDP Through NAT (STUN)
    Message Type: 0x0001 (Binding Request)
    Message Length: 0
    Message Cookie: 2112a442 (固定魔数)
    Message Transaction ID: 89ab3c... (这次问路的流水号)
```
- **物理学解构**：包裹很小，除了包头什么都没有。因为它的目的就是**“人肉撞枪口”**。你对服务器喊：“我是编号 `89ab3c`，请告诉我我是从哪个门钻出来的！”

### 📥 下行：照妖镜的回声 (`STUN Binding Response`)
```text
STUN Message Type: 0x0101 (Binding Success Response)
    Message Transaction ID: 89ab3c... (对上了！是我刚才的问题)
    Attributes:
        XOR-MAPPED-ADDRESS: 203.0.113.1, Port: 8888
```
- **物理学解构**：服务器收到了你的“空包”，它看了看这个包外层的 IP 地址（经过 NAT 洗礼后的地址），把它写进 `XOR-MAPPED-ADDRESS` 字段里扔了回来。
- **动作**：你的 WebRTC 底层拿到这个地址，立刻触发 `onicecandidate` 把它生成一张 `srflx` 的名片，然后通过信令发给远端朋友。

---

## 二、 第二包：真刀真枪的死亡冲锋（Checking 阶段）

**场景**：你收到了朋友通过信令发来的 `a=candidate` 名片，并且拿到了他 SDP 里的暗号 `ice-ufrag: Bob_ABC` 和 `ice-pwd: 12345`。你的电脑开始向朋友的地址 `198.51.100.5:9999` 发起物理冲锋。

这是排错最最最关键的一个包！如果这个包过不去，永远黑屏。

### 📤 冲锋探路石 (`STUN Binding Request` 去往对端)
```text
User Datagram Protocol, Src Port: 55555, Dst Port: 9999
STUN Message Type: 0x0001 (Binding Request)
    Attributes:
    1. [USERNAME]: Alice_XYZ:Bob_ABC
    2. [PRIORITY]: 2113929471
    3. [ICE-CONTROLLING]: tie-breaker = 1234...
    4. [MESSAGE-INTEGRITY]: HMAC-SHA1 signature (用 Bob 的 pwd 加密)
    5. [FINGERPRINT]: CRC32 校验和
```

让我们把这些冷冰冰的字段，逐一映射成**“特工接头”**的物理画面：
| 抓包字段 | 特工接头暗语（核心原理） | 排错灵感 |
| :--- | :--- | :--- |
| **`USERNAME`**<br/>(非必填变必填) | “我是 Alice (我的 ufrag)，我来找 Bob (对端的 ufrag)。” | 如果这个字段**拼错了**，说明信令服务器把 SDP 传乱了，对端的保安（WebRTC底层引擎）会直接把这颗探路石按死。 |
| **`MESSAGE-INTEGRITY`** | **防伪印章**。我用你给我的 `pwd` 把整个公文包加密签了个名。 | 中间路由器如果擅自篡改了包裹里的内容，到了对头那边拆开一算哈希对不上，当即销毁。（防止中间人篡改） |
| **`PRIORITY`** | “我是持有特级 VIP 黑卡来的（优先级分数计算）。” | 当有好几条路同时打通时，双方对照算算哪条路的 `PRIORITY` 积分高，就走哪条路。 |
| **`ICE-CONTROLLING`** | “听我的！我是发令员！” | WebRTC 里必须有一个人是真正的“决策者”（Controlling），一般是发 `Offer` 的一方。有了分歧（比如都觉得某条路好），Controlling 说了算。 |

---

## 三、 第三包：胜利的号角（提名定局）

如果在几十个、上百个来回扫射的 Ping/Pong 网络包里，某一对地址（比如 Alice 的局域网 IP 和 Bob 的局域网 IP）**双向的探路石都收到了正确的回声**，那么这条隧道就算是“打通”了。

这时候，身为 `ICE-CONTROLLING`（决策者）的一方，会下发最后一道金牌指令：

### 🏁 拍板包 (`STUN Binding Request` 附带 `USE-CANDIDATE`)
```text
STUN Message Type: 0x0001 (Binding Request)
    Attributes:
    1. [USERNAME]: Alice_XYZ:Bob_ABC
    2. [USE-CANDIDATE]: (Flag 标记)   <------------- 绝对的灵魂！
    3. [MESSAGE-INTEGRITY]: ...
```

- **物理学解构**：这是一个非常霸道的动作。在原有的探路石里加了一个名为 `USE-CANDIDATE` 的小标签（由于它是只是个 Flag 标记，长度为 0）。
- **它代表什么意思？**：“老弟，我刚才试了这么多条路，这几十条路里有 3 条是双向通的。但这条路延迟最低（优先级最高），**别选了，以后所有的视频大车，统统从这条路给我走！**”

一旦对方回了 `Success Response`，ICE 引擎就会光荣地将状态变更为 `connected`。紧接着，`DTLS` 握手就会无缝骑着这条被选定的 UDP 独木桥，呼啸而过。

---

## 四、 实战灵感：抓包排错的“望闻问切”诊脉法

现在，你拿到了服务器或者本地的 Wireshark Pcap 抓包文件。面对红绿交替的流量，你教你一套“望闻问切”的绝招：

### 1. 只有“去”的 Request，没有“回”的 Response？
- **症状**：满屏白色的 `STUN Binding Request` 出去，没有任何一条蓝色的 `Success` 回来。
- **切脉结论**：**网络层绝对不通**。你要么被恶毒的企业防火墙把 UDP 全丢弃了，要么是对称 NAT 在中间改了端口。
- **处方**：老老实实加上 `TURN` 服务器。如果加了 `TURN` 还不通，说明 `TURN` 没配对、过期了，或者是 `TURN over UDP` 被封了（考虑换 `TURN over TLS`）。

### 2. Response 回来了，但报了一堆 `401 Unauthorized`？
- **症状**：对面确实回包了，但不是 `Success`，而是黄红色的 `Error: Unauthorized`。
- **切脉结论**：**信令层塌方，暗号对不上**。极大概率是你的信令服务器把 SDP 里的 `ufrag` 吞了、改了，或者传的是上一次陈旧的 SDP session，导致底层的 C++ 引擎觉得“你是个拿着假令牌的骗子”。
- **处方**：严查 WebSocket（或你的信令中间件）传输 SDP 的一致性。

### 3. 一切看似成功，握手完毕后瞬间停止发包（黑屏）？
- **症状**：看到了 `USE-CANDIDATE` 标志，ICE 漂亮地进入了 `connected`，**但随后 0 个 RTP 视频包流出**。
- **切脉结论**：**MTU（最大传输单元）黑洞**。STUN 探路包非常小（只有几十个字节），它能从缝隙里钻过去完美握手；但接下来传输的关键帧（I帧）包有 1300+ 字节，这台拉胯的路由器缝隙太小，大包全被“静默丢弃”了！
- **处方**：让发送端把编码器的 MTU 砍小点试试，或者强行走 TCP Relay（不分段）。

---

## 五、 本章总结

从网络包的微观角度来看，ICE 并不是一个神秘的高魔咒语，而是**极其淳朴的暴力穷举法**。
它用极小的、带有加密签名的“乒乓球（STUN）”，向所有的可行方向疯狂扔过去。谁接到了扔回来，说明路就是通的；加上 `USE-CANDIDATE` 一锤定音后，铺设在 UDP 之上的实时音视频传输大动脉才算真正竣工。

看懂了这些，以后 `webrtc-internals` 里的天书对你来说，就像看着两支蚂蚁部队在互相试探着搭桥一样，充满了机械齿轮运转的物理美感！
