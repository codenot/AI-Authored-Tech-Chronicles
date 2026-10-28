# AMD 主流桌面 CPU 时间轴补证

研究笔记，读取于 2026-10-28。只用于记录型时间轴的数据核对，不是文章正文。排除 Threadripper、PRO 工作站、服务器和移动处理器；OEM 消费桌面与 DIY 零售分别标记。

初轮新增重点来源控制在 12 项（末尾 N01–N12），随后按追加点名补核9950X3D2一项（N13）；其余沿用此前资料中已读取来源及现有页面字段。未独立补证的日期明确标记，不能直接升级为“核实”。

## 桌面 APU：可用日期与公告日期分开

| 家族 | 桌面日期与事件 | 核实状态 / 可直接用于页面的表达 | 原始链接 |
| --- | --- | --- | --- |
| Llano / A8-3850、A6-3650 | **2011-06-30**，官方桌面 availability 公告 | 已核实。时间轴可写“Llano 桌面 APU 可用”。2011-06-14 是另一篇 A-Series 公告，不能将它当作这两款桌面型号的可用日 | [AMD 2011 桌面原稿][N01] |
| Trinity / A10-5800K 等 | **2012-10-02**，宣布桌面零售/分销渠道可用 | 已核实。FM2、Piledriver、DIY 与小型桌面；不要填移动 Trinity 的 2012-05-15 | [AMD 2012 桌面原稿][N02] |
| Richland / A10-6800K 等 | 渠道摘要写 **2013-06-04 launch**；IR 桌面新闻稿日期为 **2013-06-05** | 两个官方日期均有证据。页面若只能存一个日期，建议写“2013-06”；展开说明“渠道资料标6/4，新闻稿6/5”。不能声称3/12移动稿是桌面首发 | [AMD 渠道摘要][N03]、[AMD IR 桌面原稿][N04] |
| Kaveri | **2014-01-14** 桌面发布 | 此前已核实；移动版6/4另记。4 CPU + 8 GPU 的“12 compute cores”不是12 CPU核 | [AMD Kaveri 原稿][O01] |
| Godavari / A10-7870K | **2015-05-28** 宣布、并明确 e-tail available now | 已核实。原稿称 Kaveri refresh；不要把2016年的A10-7890K当作整个 Godavari 家族首发 | [AMD 原稿][N05] |
| Bristol Ridge / 第七代桌面 A-Series | **2016-09-05**：首批 OEM 消费整机已经出货；**2017-07-27**：全球发布 AM4 A-Series / Athlon X4 零售线 | 已核实两个事件。2016-05-31 是移动全线稿，不能顶替桌面时间 | [OEM 原稿][N06]、[DIY 原稿 PDF][N07] |
| Ryzen 2000G / Raven Ridge | 现有页字段 **2018-02-12** | 日期可作候选，但本轮未新增桌面原稿，不借2017-10-26移动Raven Ridge作证明。需要页面实现方已有2400G首发原测/AMD规格来源再确认 | 现有 amd-cpu-chronicle.html 的 2200G/2400G 数据字段；状态：本轮未独立补证 |
| Ryzen 3000G / Picasso | **2019-07-07**，AMD 全球可用稿同时包含 Ryzen 3000 桌面与3000系列带核显APU | 此前已核实。3400G/3200G 是 Zen+ APU，不是同日 Matisse 的 Zen 2 | [AMD 同日可用稿][O02] |
| Ryzen 4000G / Renoir | **2020-07-21** 发布；消费者 OEM 整机计划 **2020 Q3**；原稿明确该批产品仅 SI/OEM | 已核实。不能写成7/21全球盒装零售；PRO SI 首日与消费 OEM 整机供货分别处理 | [AMD 原稿][N08] |
| Ryzen 5000G / Cezanne | 现有页为2021-04 OEM / 2021-08零售；**2021-06-01** Computex 官方稿确认5700G/5600G将进入DIY | DIY路径已补证；**2021-08-05**是待补一手可用稿/规格页的日级候选，本轮 N09 正文本身只写 later this year，不能假称该稿明确8/5 | [AMD Computex 原稿][N09]；现有页已有2021-04/08月级字段 |
| Ryzen 8000G / Phoenix、Phoenix 2 | **2024-01-08** 公告；**2024-01-31** 预计DIY/SI可用；OEM整机预计Q2 | 此前已核实公告及计划；如果页面标签是“实际上市”，仍应结合型号页/当日零售证据。8700G/8600G有NPU，8500G/8300G无NPU | [AMD 原稿][O03] |
| Ryzen AI 400 AM5 desktop | **2026-03-02** 公告；**2026 Q2** HP/Lenovo等OEM整机可用计划 | 此前已核实。不能只按2026-01-05 CES移动系列公告，写成AI400桌面已在1月开售。CPU/GPU/NPU组合属于桌面APU线 | [AMD MWC 原稿][O04] |

## X3D：首次公开、定价公告与开售分开

| 产品 / 分支 | 首次明确型号公告 | 开售 / 可用日期字段 | 本轮证据与页面处理 |
| --- | --- | --- | --- |
| Ryzen 7 5800X3D | **2022-01-04** CES；**2022-03-15** 价格/可用日公告 | **2022-04-20**，449美元美国SEP | 两份公告此前/本轮已核实，3/15原稿明确on-shelf globally beginning April 20。[CES][O05]、[3/15原稿][N10] |
| Ryzen 7 5700X3D | **2024-01-08** | **2024-01-31** 原稿预计可用，249美元SEP | 原稿明确两个日期。它是AM4 Zen3补充，不是Zen5。[原稿][O03] |
| Ryzen 9 7950X3D / 7900X3D | **2023-01-04** CES | 现有页7950X3D为 **2023-02-28** | CES公告已核实；2/28日期本轮未补独立首发页。勿将三款统一填2月或统一填CES日。[CES原稿][O06] |
| Ryzen 7 7800X3D | **2023-01-04** CES | 现有页为 **2023-04-06** | 公告已核实；4/6日级值在现有页面有记录，本轮未新增AMD型号页核查，实施时可用已有首发实测来源交叉确认。[CES原稿][O06] |
| Ryzen 7 9800X3D | **2024-10-31** | 常见候选及现有页 **2024-11-07** | 本轮直接读取10/31官网原稿；**当前正文没有November/11月可用字段**，只足以证明公告和定价479美元，不可把11/7标为来自该正文。请使用已有型号页或独立首发评测补证。[10/31原稿][N11] |
| Ryzen 9 9950X3D / 9900X3D | **2025-01-06** CES | 现有页及所附 AMD 型号页字段为 **2025-03-12** | CES公告此前已读；日级供货值本轮未重新联网读取型号页。页面如沿用已核实字段，可保留原dateSource，不挂CES稿冒充开售日。[CES稿][O07] |
| Ryzen 7 9850X3D | **2026-01-05** CES | 现有页及其AMD型号页字段为 **2026-01-29** | CES公告此前已核实；日级供货待实施方已有型号页补证，不将1/5当开售。[CES稿][O08] |
| Ryzen 9 9950X3D2 Dual Edition | **2026-04-22** 发布稿 | **2026-04-22**，明确当天零售及OEM可用 | 追加独立核实。16C/32T、Zen5、208MB总缓存、200W、899美元SEP；两个CCD均堆叠缓存。属于AM5消费桌面高端，不是Threadripper。[官方原稿][N13] |

限定：这里的5800X3D“首次”是**消费桌面型号**，不是3D芯片封装或任何3D缓存CPU的全球首次。2021演示原型不等同于2022零售型号开售。

## 可以直接写的量化评价

### 2026 重测：5800X3D 的跨代持续竞争力

来源：[Steven Walton，TechSpot，2026-01-14][N12]。14款游戏；Medium与Ultra分别统计。RTX5090；AM4为X570S、DDR4-3600CL14，AM5为X670E、DDR5-6000CL30；14600K为DDR5-7200，285K为DDR5-8200；Windows11。不同平台内存不同，是整个平台游戏结果。

| 比较 | 同文已核实结论 |
| --- | --- |
| 5800X3D 对5800XT | Medium平均 **+29%** |
| 5800X3D 对14600K / 9600X / 285K | Medium平均分别 **+2% / −1% / −2%**，应表述为接近 |
| 5700X3D 对5800X3D | 平均约 **−5%** |
| 9800X3D 对5800X3D | Medium **+35%**；Ultra **+28%**，GPU限制改变差距 |

可写：“2026年这组游戏重测里，2022年的5800X3D仍接近新一代中端游戏性能。”不能写“全面打赢数代旗舰”。原文没有直接同机测试5800X3D的23H2/24H2，因此也不能把整个变化归因于系统更新。

### Zen 2：区分同核数改善与多加核心

沿用此前已读取的 [TechSpot 2019-07-07 首发实测][O09]。3700X对2700X：**Cinebench R20多核+22%**、WinRAR **+84%**；同文3900X对9900K：Blender **+41%**、整机功耗 **−8%**。条件为DDR4-3200CL14、RTX2080Ti；AMD新旧主板不同，Intel解除TDP限制并用280mm水冷。原文首发平台和散热并非完全对称。

可写：“Zen2在渲染/压缩等已测负载中出现明显跃升”；不能把WinRAR的84%写成平均IPC，也不能把12核对8核的结果全部算成架构改善。网页卡片最稳妥使用3700X对2700X的同核数R20 **+22%**，并保留“指定测试”。

### Zen 3：官方IPC与整机游戏提升分开

沿用 [AMD 2020-10-08 公告及脚注][O10]：官方宣称IPC平均 **+19%**；5900X对3900XT的11款游戏1080p High平均约 **+26%**。IPC脚注为同频8核、25负载结果，不是所有软件每项+19%；游戏值包含频率、缓存、内存等系统因素。页面必须标“AMD内部测试”，不能改成独立评测结论。

与Zen2卡片并排时建议各自写清证据：“Zen2：独立R20同核多核+22%”“Zen3：官方同频IPC平均+19%”。**不把两种指标画成同一纵轴的提升条形图。**

## 新增重点来源（初轮12项，追加点名1项）

[N01]: https://ir.amd.com/news-events/press-releases/detail/358/media-alert-amd-a-series-desktop-processors-set-the-apu-bar
[N02]: https://ir.amd.com/news-events/press-releases/detail/199/new-amd-a-series-processors-bring-faster-speeds-high-core-count-and-amd-radeon-hd-7000-series-graphics-to-do-it-yourself-pc-enthusiasts-and-gamers
[N03]: https://subscriptions.amd.com/newsletters/channelnews/images/archive/%7B72be457a-e9a1-44be-8008-c2b0925a0a97%7D_53574a_amd_elite_series_apu_product_summary.pdf
[N04]: https://ir.amd.com/news-events/press-releases/detail/40/amd-extends-graphics-and-compute-leadership-with-2013-elite-a-series-desktop-apus
[N05]: https://ir.amd.com/news-events/press-releases/detail/614/more-performance-features-and-value-new-amd-a-series-desktop-processors-deliver-best-in-class-experience-for-esports-and-online-gaming
[N06]: https://ir.amd.com/news-events/press-releases/detail/712/new-mainstream-esports-ready-gaming-pcs-powered-by-7th-generation-amd-a-series-desktop-processors-debut-globally
[N07]: https://d1io3yog0oux5.cloudfront.net/_963ca61a00a1833982d0781f305879b5/amd/news/2017-07-27_AMD_Completes_Ryzen_Mainstream_Desktop_Lineup_780.pdf
[N08]: https://ir.amd.com/news-events/press-releases/detail/962/amd-ryzen-4000-series-desktop-processors-with-amd-radeon-graphics-set-to-deliver-breakthrough-performance-for-commercial-and-consumer-desktop-pcs
[N09]: https://ir.amd.com/news-events/press-releases/detail/1007/amd-showcases-industry-leading-innovation-across-the-high-performance-computing-ecosystem-at-computex-2021
[N10]: https://www.amd.com/en/newsroom/press-releases/2022-3-15-amd-launches-the-ultimate-gaming-processor-brings.html
[N11]: https://www.amd.com/en/newsroom/press-releases/2024-10-31-the-gaming-legend-continues--amd-introduces-next-.html
[N12]: https://www.techspot.com/review/3077-amd-ryzen-am4-5800x3d-5700x3d/
[N13]: https://newsroom.amd.com/news/amd-launches-ryzen-9-9950x3d2-dual-edition-processor/

## 沿用的已读来源

[O01]: https://ir.amd.com/news-events/press-releases/detail/479/amd-revolutionizes-compute-and-ultrahd-entertainment-with-2014-amd-a-series-accelerated-processors
[O02]: https://ir.amd.com/news-events/press-releases/detail/899/amd-unleashes-ultimate-pc-gaming-platform-with-worldwide-availability-of-amd-radeon-rx-5700-series-graphics-cards-and-amd-ryzen-3000-series-desktop-processors
[O03]: https://ir.amd.com/news-events/press-releases/detail/1177/amd-reveals-next-gen-desktop-processors-for-extreme-pc-gaming-and-creator-performance
[O04]: https://ir.amd.com/news-events/press-releases/detail/1281/amd-gives-consumers-and-businesses-more-ai-pc-options-with-expanded-ryzen-ai-400-series-portfolio
[O05]: https://ir.amd.com/news-events/press-releases/detail/1040/amd-presents-latest-high-performance-computing-technologies-in-2022-product-premiere-livestream
[O06]: https://ir.amd.com/news-events/press-releases/detail/1111/amdextends-its-leadership-with-the-introduction-of-its-broadest-portfolio-of-high-performance-pc-products-for-mobile-and-desktop
[O07]: https://ir.amd.com/news-events/press-releases/detail/1233/amd-announces-new-graphics-and-gaming-products-for-ultimate-gameplay-experience-at-ces
[O08]: https://ir.amd.com/news-events/press-releases/detail/1270/amd-expands-ai-leadership-across-client-graphics-and-software-with-new-ryzen-ryzen-ai-and-amd-rocm-announcements-at-ces-2026
[O09]: https://www.techspot.com/review/1869-amd-ryzen-3900x-ryzen-3700x/
[O10]: https://ir.amd.com/news-events/press-releases/detail/972/amd-launches-amd-ryzen-5000-series-desktop-processors-the-fastest-gaming-cpus-in-the-world

## HTML 实施阶段补核

同日进一步读取 AMD 官方型号页，补齐三项原先保留的日级字段：[7950X3D 的 Launch Date 为 02/28/2023](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7950x3d.html)、[7800X3D 为 04/06/2023](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-7-7800x3d.html)、[9800X3D 为 11/07/2024](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9800x3d.html)。另确认 [9950X3D 为 03/12/2025](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x3d.html)。此前表格记录的是初轮证据边界，HTML 已给对应日期附上型号页，未把上市字段伪装成 CES 公告的内容。

*作者：[AI-Authored Tech Chronicles]*
*系列：《CPU 历史资料库》主流桌面 AMD 时间轴补证*
*分析基于：AMD 桌面发布稿、官方渠道材料与已读产品记录 + TechSpot 原作者首发与2026年重测，资料读取于 2026-10-28*
