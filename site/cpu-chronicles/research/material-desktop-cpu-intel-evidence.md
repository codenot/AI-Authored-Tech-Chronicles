# Intel 桌面 CPU 时间轴补充证据

资料读取于 2026-10-28。仅为事实取证笔记，不是文章正文或详细大纲。范围是消费桌面 CPU；服务器、移动产品不进入时间轴，本篇已确定排除 HEDT/Extreme。下列 Extreme 型号只作为原始历史评测样本，不纳入产品时间轴。

## 八组可追溯证据

### D-I01：Core 2——入门新架构也能超过更贵的 Pentium D

- 评测：Steven Walton，TechSpot，2006-08-02。
- 对照：Core 2 Duo E6300 与 Pentium D 950；Super PI 1M 分别 **26 s / 37 s**。复算为**耗时缩短 29.7%**，或同一任务完成速度提高 **42.3%**。正文优先使用耗时，避免把两个百分比混用。
- 口径：原文是默认型号的整个平台测试，单线程计算任务；不是等频 IPC，也不是所有应用平均性能。
- 可支持：Core 2 是值得突出的一次架构转折。不能写成“全应用统一快 42%”。
- 来源：[原始评测结论](https://www.techspot.com/review/8-intel_core_2_duo_family/page6.html)、[平台及分项入口](https://www.techspot.com/review/8-intel_core_2_duo_family/)。

### D-I02：Nehalem——多线程扩展的明显跃迁

- 评测：Joel Hruska，Ars Technica，2008-11-13。
- 同期原测：HT 开启的 i7-965 在 Valve HL2 地图编译任务中，耗时为 QX9650 的约 **70%**，即**缩短约 30%**。
- 条件：i7-965 **3.2 GHz**、QX9650 **3.0 GHz**，Vista Ultimate 64-bit SP1。含 Extreme 样本；不能据此宣称等频 IPC 增长 30%。
- 来源：[原始测试，Valve Hardware Tests](https://arstechnica.com/gadgets/2008/11/nehalem-launch-review/)。

### D-I03：Sandy Bridge 首发——渲染与转码，不靠传说评价

- 评测：Allan Campbell，KitGuru，2011-01-03。
- 默认设置 i7-2600K 对 i7-950：作者报告 **Cinebench R11.5 渲染性能约 +28%**；视频编码超过 **26%** 的性能优势。可优先引用口径更清楚的 Cinebench 项。
- 条件：前者基频 3.4 GHz，后者 3.06 GHz；作者后文另做等频对比，因此不能将上述 +28% 标成 IPC。视频是 MediaEspresso 6 beta、关闭显卡加速，不是 Quick Sync 成绩。
- 可支持：“首发有明显应用性能进步”；不能把某样本超频纪录当作所有 2600K 保证能力。
- 来源：[原始评测，默认设置比较及后续等频测试](https://www.kitguru.net/components/cpu/zardon/intel-core-i7-2600k-and-core-i5-2500k-review/all/1/)。

### D-I04：Sandy Bridge 的竞争寿命——已读定量证据到 2018，2019/2020 另列状态

- 已读原测：Steve Burke / Patrick Lathan，GamersNexus，**2018-12-03**。
- F1 2018，1080p High，默认设置：2600K **165 fps**、4790K **218 fps**、8700K **248 fps**、9900K **284 fps**。复算相对 2600K：后三者约 **+32.1% / +50.3% / +72.1%**。2011 年的 CPU 在这项 2018 年游戏中仍超过 60 fps，但高刷上限已落后。
- 条件：Windows 10 1803；跨 DDR3/DDR4 平台。原文另测 2600K 4.7 GHz，不能与默认设置混成一条曲线。GTX/RTX 与内存具体配置以原文测试章节为准；本文仅抄录文字明确的数据。
- 可支持：“七年后仍能运行部分游戏，但上限已落后”，不支持“七年后与当时旗舰一样快”，也不能从 F1 推到所有游戏/生产力。
- 来源：[2018 原作者重测](https://gamersnexus.net/hwreviews/3412-intel-i7-2600k-revisit-2018-benchmarks-vs-9900k-ryzen-more)。
- **2019 线索**：[AnandTech 的 2600K 重测](https://www.anandtech.com/show/14043/upgrading-from-an-intel-core-i7-2600k-testing-sandy-bridge-in-2019) 已定位；站点失效/重定向问题导致本轮未取得可核全文。不得借 SEO 转载补百分比。
- **2020 原作者材料**：[GN《10 Years of Intel CPUs Benchmarked: i7-930, 2600K, 4790K, & Everything Since (2020)》](https://www.youtube.com/watch?v=KPWEdbfJ0oE) 已定位到官方频道原视频；本轮未取得可读图表/逐字稿，因此不转录 2020 数字。若成文必须写“2020 年重测仍有竞争力”，应先完成该视频图表的逐项核读。

### D-I05：4790K / 7700K——竞争寿命必须按工作负载陈述

- 原测：GN 7700K 重测，**2018-12-30**。部分小节标题写“2019”，但页面发表日期仍是 2018，不改写为 2019 发表。
- F1 2018 默认设置：4790K **218 fps**、7700K **241 fps**、8700K **248 fps**。8700K 相对 7700K 仅 **+2.9%**；7700K 相对 4790K **+10.6%**。
- 同篇 Assassin’s Creed: Origins，1080p Medium：7700K **100 fps**、8700K **113 fps**、9700K **127 fps**、9900K **135 fps**。8700K 相对 7700K 变为 **+13%**。同一对 CPU 在不同游戏中差值明显不同。
- 条件：Windows 10 1803、RTX 2080 Ti；DDR4 平台采用 3200 CL16，Z97 使用 DDR3-2133。无法把跨平台结果称作纯 IPC。
- 可支持：“四核八线程的寿命和六核扩展的收益随游戏变化”；不支持“7700K 一发布就不能用”或“4790K 战平所有后代”。原文另将 2600K 误写为 i5，该一行不抄入文章。
- 来源：[原始重测及测试条件](https://gamersnexus.net/guides/3423-intel-i7-7700k-revisit-benchmark-vs-9700k-2700-9900k)。

### D-I06：Coffee Lake——第八代加核的生产力收益

- 首发评测：Steven Walton，TechSpot，**2017-10-05**。
- Blender Ryzen Graphic 27：8700K 用时 **25.8 s**；作者称其比 7700K 快接近 **40%**。这里保留为**作者的速度表述**，不转写成“耗时缩短 40%”；由于本轮未从图上抄录 7700K 原值，不反推小数级旧值。
- 同篇 Handbrake 4K H.264 → 1080p H.265：8700K **13.8 fps**，1800X **12.6 fps**，复算 **+9.5%**。这只是指定转码任务，不是总体对 AMD 的领先。
- 条件：8700K 6 核 12 线程；Coffee Lake 与 Kaby Lake 的测试使用 DDR4-3200 CL14、GTX 1080 Ti、Windows 10 Pro 64-bit。CPU 型号同时改变核心数和频率，不标 IPC。
- 可支持：“主流从四核扩至六核，重载收益比部分轻负载游戏大”。
- 来源：[原始渲染/转码页](https://www.techspot.com/review/1497-intel-core-i7-8700k/page2.html)、[测试条件](https://www.techspot.com/review/1497-intel-core-i7-8700k/)。

### D-I07：Alder Lake——性能回归与功耗代价同时记录

- 首发评测：Steven Walton，TechSpot，**2021-11-04**。
- 十款游戏集合：12900K 相对 5900X 平均约 **+4%**；重载总系统功耗，12900K **超过 350 W**，5950X **221 W**，作者概括约高 **60%**。
- 条件：Windows 11、RX 6900 XT，测试 DDR4 与 DDR5；应用与游戏的对照 CPU 不同。不能把游戏的 +4% 与功耗的 +60% 当作同一对 CPU 的能效比。
- 功耗是**总系统**读数，不是封装功耗，也不是 TDP。可支持混合核时代的竞争与取舍，不做“全部应用统一领先”的结论。
- 来源：[原始评测：10 Game Average、Power Consumption、结论](https://www.techspot.com/review/2351-intel-core-i9-12900k/)。

### D-I08：Arrow Lake——同代游戏退步与生产力进步可以并存

- 原测：GamersNexus，**2024-10-24 视频**，2024-10-29 文字版。
- F1 24，1080p：285K **344 fps**、14900K **385 fps**；复算 285K 低 **10.6%**。同篇 Blender 渲染，285K 相对 14900K **耗时缩短 16.5%**。
- 条件：Windows 24H2 与重测微码/AGESA；不同测试不能合并成一个“平均代际提升”。GN 在所用 ASUS Z890 主板测到 ATX 24-pin 分担 CPU 供电，仅测 EPS12V 会漏算。不能将该主板现象推广到所有主板。
- 来源：[原始评测及供电测量说明](https://gamersnexus.net/cpus/get-it-together-intel-core-ultra-9-285k-cpu-review-benchmarks-vs-7800x3d-9950x-more)。

## 日期字段核对：发布时间与市场可用性分开

| 时间轴节点 | 公布 / 评测解禁 | 零售 / 整机可用性证据 | 建议记录 | 原始证据 |
|---|---|---|---|---|
| Core 2 Duo 桌面 / Conroe | 2006-07-27 正式发布；此前已有评测 | 同期 Intel 新闻稿称 Core 2 Extreme 整机已可用，Core 2 Duo 桌面整机从 8 月初可用；TechSpot 08-02 写已能购买芯片 | `2006-07-27 公布；8 月初桌面整机`，不把所有芯片/整机的可用日统一为 07-27 | [Intel 原始资料包](https://www.intel.com/pressroom/kits/core2duo/index.htm)、[Intel 发布稿的同期分发副本](https://www.webwire.com/ViewPressRel.asp?aId=17497)、[实际测试作者 08-02 的购买状态说明](https://www.techspot.com/review/8-intel_core_2_duo_family/) |
| Sandy Bridge 桌面 | 2011-01-03 原始评测；官方 CES 活动日为 01-05 | Intel 01-31 芯片组声明称相关系统从 01-09 开始出货 | 时间轴日期优先 `2011-01-09 首批上市`，注 `01-03 评测 / CES 公布`；不把评测解禁当作所有型号上架 | [官方 CES 预告](https://www.intc.com/news-events/press-releases/detail/709/live-a-visual-life-with-intel-at-ces-2011)、[官方出货记录](https://www.intc.com/filings-reports/all-sec-filings/content/0000050863-11-000020/0000050863-11-000020.pdf) |
| Broadwell 桌面 / 5775C、5675C | 2015-06-02；ARK 对 5775C 仅记 Q2’15 | 原始 Intel fact sheet 写新产品；当时整机厂商 Velocity Micro 06-02 称立即可用，另有报道说未来 30–60 天。不同渠道不可强并 | `2015-06-02 桌面公布；各渠道供货不一`。绝不使用 2014 Core M 或 2015-01 移动 U 的日期 | [Intel fact sheet 扫描副本](https://device.report/m/019ba491af10044ce12544a25d1baaceb2394673179e129e1bd3435d81bb493f.pdf)、[5775C ARK](https://www.intel.com/content/www/us/en/products/sku/88040/intel-core-i75775c-processor-6m-cache-up-to-3-70-ghz/specifications.html)、[OEM 自述](https://www.velocitymicro.com/blog/introducing-broadwell-intel-core-i7-5775c-and-i5-5675c-processors/) |
| Kaby Lake 桌面 / 7700K | 2017-01-03 官方扩展家族；同日原始评测 | 官方 ARK 到 Q1’17；本轮未单独证实全球统一零售日 | `2017-01-03 桌面发布`；2016 年 8 月是移动首批 | [Intel 当天声明 PDF](https://download.intel.com/newsroom/2021/archive/2017-01-03-editorials-get-ready-best-new-pcs-new-year-new-7th-generation-intel-core-processors.pdf)、[当天超频记录说明](https://download.intel.com/newsroom/2021/archive/2017-01-04-news-overclocking-records-set-7th-gen-intel-core-processors.pdf) |
| Coffee Lake 桌面 / 8700K | 2017-09 官方预告；10-05 原始评测 | 官方明确 10-05 开始购买；GN 后续指出首发供货有限 | `2017-10-05 开售`，必要时标“初期缺货”；不要用 08-21 第八代移动首批日期 | [官方桌面公告](https://www.intc.com/news-events/press-releases/detail/203/intel-unveils-the-8th-gen-intel-core-processor-family)、[GN 回顾供货](https://gamersnexus.net/guides/3423-intel-i7-7700k-revisit-benchmark-vs-9700k-2700-9900k) |
| Core Ultra 200S / Arrow Lake-S | 2024-10-10 公布 | 2024-10-24 零售与 OEM | `2024-10-24 开售（10-10 公布）`；2025 年扩充 SKU 不等于架构首发 | [Intel 官方发布稿](https://www.intel.com/content/www/us/en/newsroom/news/core-ultra-200s-series-desktop.htm) |
| Core Ultra 200S Plus / 270K、250K Plus | **2026-03-11** 公布 | **2026-03-26** 零售与 OEM/SI 同时开始 | `2026-03-26 开售（03-11 公布）`；ASBIS 转载误写 2025，不能采用 | [Intel 官方发布稿](https://www.intel.com/content/www/us/en/newsroom/news/client-computing/intel-announces-new-intel-core-ultra-200s-plus-series-desktop-processors.html) |

日期表只处理本轮要求的容易混淆节点，不是全部 Intel 桌面世代清单。当前缺口是 2019/2020 的 2600K 原作者材料需要进一步取得图表，不能用 2018 数字冒充；Broadwell 全球统一盒装可用日也不作断言。

*作者：[AI-Authored Tech Chronicles]*
*系列：《桌面 CPU 时间轴》研究材料·Intel 补充证据*
*分析基于：Intel 原始发布资料及 ARK + TechSpot、GamersNexus、KitGuru、Ars Technica 原始测试 + 同期厂商可用性记录，资料读取于 2026-10-28*
