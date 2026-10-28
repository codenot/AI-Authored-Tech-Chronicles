# AMD 笔记本 CPU 编年史事实补证

研究笔记，资料读取于 2026-10-28。用于记录型移动 CPU 时间轴；只收笔记本、二合一和上网本，排除手机、嵌入式、服务器、专用掌机和桌面 CPU。来源以此前已读取的 AMD 公告/年报为基础，本轮补 6 个关键官方页面、3 篇原作者整机实测。

**渲染约束：以下主表的日期只来自 `date` 列；`title`、`description` 不包含事件日期。** 型号编号、架构编号和跑分版本是技术名称，不是日期。若要区分公布与整机可用，应新增时间轴事件或放在左侧日期标签，厂商内容不重复日期。源文件链接中的年份不应作为可见链接标签重复显示。

`公布`、`型号页launch`、`年度存续记录`和`整机可用计划`不是同一种事件。旧档案只到年；未得到实际供货原件时，不把公告中的 expected 改成已上市。

## 可供时间轴使用的记录

| date | title | description | source / 核实状态 |
| --- | --- | --- | --- |
| 至迟 2000；档案记录，首发年待补 | Mobile K6 / K6-2 / K6-III 与“+”派生 | Socket 7 路线的移动 CPU；低电压、PowerNow! 与缓存配置按具体型号区分。桌面 K6 的发布时间不能直接移作移动全线首发 | [AMD 移动原件目录][O01]；目录入口已确认，未逐份读取所有 PDF |
| 2001–2003；家族记录，细分首发待补 | Mobile Athlon 4 / Mobile Duron / Athlon XP-M | K7 移动路线，PowerNow! 调频调压；XP-M 内部跨多个核心与功耗档。现有年报证实移动品牌存在，不以桌面 Athlon XP 公告代替移动发布 | [AMD 年报的移动产品清单][O02]；保留年级精度 |
| 2004；季度记录 | Mobile Athlon 64 | AMD64、集成内存控制器的移动分支，面向便携/桌面替代整机；与桌面 Athlon 64 分开记录 | [AMD 季度原稿][O03] |
| 2004–2005；年度记录 | Mobile Sempron | 入门移动品牌；须按完整型号核对 CPU 核与位宽支持，不是一种固定微架构 | [AMD 年报][O04] |
| 2005-03；年报回溯 | Turion 64 / Lancaster | 面向轻薄笔记本的 AMD64 品牌，单核、独立移动功耗档；不把桌面 K8 与整机续航等同 | [AMD 年报][O05] |
| 2006-05；年报回溯 | Turion 64 X2 | 双核移动路线；增加并行能力，仍需看内存、芯片组与整机功耗 | [AMD 年报][O06] |
| 2008；年度记录 | Turion X2 / X2 Ultra，Puma 平台 | Griffin 移动 CPU 与平台组合；这里的 Puma 是平台名，后面低功耗 CPU 核复用同一词时必须区分 | [AMD 年报][O07] |
| 2009-01；平台公布 | Athlon Neo / Yukon | 轻薄低功耗笔记本路线；Neo 不等于后续 Bobcat 核。只收笔记本平台，不混入同名嵌入式 BGA 出货事件 | [AMD 年报][O08] |
| 2009–2010；年度记录 | Turion II / Turion II Ultra / Neo X2 / Athlon II Neo | Caspian、Champlain 等移动平台演进；品牌、平台、CPU 内核名称分开。首发日尚未逐个补齐 | [AMD 年报][O08]、[后续年报产品清单][O09] |
| 2010；年度记录 | Phenom II Mobile | 移动双核、三核、四核产品进入笔记本；不挪用桌面 Deneb/Thuban 的发布时间或缓存配置 | [AMD 年报][O09] |
| 2011-01-04；可用公告 | Bobcat / Brazos：Ontario、Zacate，C/E-Series | 低功耗 APU 路线，CPU 与核显同封装/芯片集成；笔记本和上网本是本页范围，嵌入式应用另收 | [AMD Fusion 公告][O10] |
| 2011-06-14；可用公告 | A-Series Mobile / Llano，Sabine 平台 | 主流笔记本 APU，最多四个 x86 CPU 核与 Radeon 核显；这是与低功耗 Bobcat 并行的路线 | [AMD A-Series 公告][O11] |
| 2012-05-15；公布 | A-Series Mobile / Trinity | Piledriver APU，面向主流与轻薄笔记本；CPU 模块结构、核显收益和整机续航分开评价 | [AMD Trinity 公告][O12] |
| 2013-03-12；首批可用公告 | A-Series Mobile / Richland | Trinity 演进与电源管理更新；CPU 仍为 Piledriver 路线，编号更新不等于全新架构 | [AMD 移动 Richland 公告][O13] |
| 2013；产品阶段记录 | Jaguar / Kabini、Temash；后续 AM1 不收 | 低功耗双/四核 SoC，面向入门触控本与二合一。早期 CES 稿是演示/出货计划，不能据此认定已在零售 | [AMD 早期原稿][O14]；正式供货日待补 |
| 2014-04-29；公布 | Puma / Beema、Mullins | 低功耗 x86 CPU 核更新，面向入门笔记本与二合一；不与 Turion 的 Puma 平台混同，也不把安全处理器当主 CPU | [AMD 移动 APU 公告][O15] |
| 2014-06-04；公布 | Kaveri Mobile | Steamroller CPU、GCN 核显及 HSA 功能进入移动 APU；GPU 的 Compute Unit 不能加到 CPU 核数里 | [AMD 移动 Kaveri 公告][O16] |
| 2015-06-02；公布 | Carrizo / 第六代 A-Series Mobile；Carrizo-L 另支 | Carrizo 使用 Excavator 并整合 SoC；Carrizo-L 是低功耗 CPU 核分支，两者不能仅凭近似代号合并 | [AMD Carrizo 公告][O17]；Carrizo-L 细分首发待补 |
| 2016-04-05；提前可用公告 | Bristol Ridge Mobile / 第七代 A-Series | 提前供应支持 HP ENVY x360，属于笔记本事件；不是 AM4 桌面平台首发 | [AMD 移动提前可用原稿][O18] |
| 2016-05-31；全线公布 | Bristol Ridge / Stoney Ridge Mobile | Excavator 进入不同功耗与价格档：Bristol 覆盖 FX/A12/A10，Stoney 覆盖 A9/A6/E2；同代内部规模不同 | [AMD 移动全线公告][O19] |
| 2017-10-26；公布 | Ryzen Mobile 2000U / Raven Ridge | Zen + Vega，首批 2700U/2500U 为 15 W 可配置 APU；整机随后数周起陆续可用。不是桌面 Pinnacle Ridge 的 Zen+ | [AMD 移动原稿][O20] |
| 2019-01-06；公布 | Ryzen Mobile 3000U/H / Picasso；Athlon Mobile | Zen+ 世代 APU，覆盖轻薄与游戏本；同号桌面 Matisse 使用另一种 CPU 微架构 | [AMD 移动原稿][O21] |
| 2020-01-06；公布 | Ryzen Mobile 4000U/H/HS / Renoir | Zen 2 单片 APU，最多 8 核16线程；U、H、HS 功耗档不同，性能提升应附整机和功耗设置 | [AMD CES 原稿][O22] |
| 2021-01-12；公布 | Ryzen Mobile 5000U/H/HS/HX / Cezanne、Lucienne | H/HS/HX 与部分 U 使用 Zen 3；5700U/5500U/5300U 使用 Zen 2。不能将整个销售系列统一写成 Zen 3 | [AMD CES 规格表][O23] |
| 2022-01-04；公布 | Ryzen Mobile 6000U/H/HS/HX / Rembrandt | Zen 3+、6 nm、RDNA 2 核显、DDR5/LPDDR5平台；与同年 AM4 桌面 Zen 3 刷新不同 | [AMD CES 原稿][O24] |
| 2022-09-20；型号页launch | Ryzen/Athlon 7020 / Mendocino | 入门笔记本 APU，Zen 2 与 RDNA 2；销售编号较大不表示 CPU 已到 Zen 4 | [AMD 7520U 规格页][O25] |
| 2023-01-04；公布 | Ryzen Mobile 7030 / Barcelo-R | Zen 3 与 Vega 的成熟平台延续，最多八核；与 7040 的核显、内存和 NPU 配置不同 | [AMD CES 全系规格][O26] |
| 2023-01-04；公布 | Ryzen Mobile 7035 / Rembrandt-R | Zen 3+ 与 RDNA 2 的平台刷新；不是根据首位数字推导出来的 Zen 4 | [AMD CES 全系规格][O26] |
| 2023-01-04；公布 | Ryzen Mobile 7040HS / Phoenix；后续 U、Phoenix 2 | Zen 4、RDNA 3，指定型号集成 XDNA NPU；HS、U 和 Zen 4c 混合版本须按型号区分 | [AMD CES 全系规格][O26] |
| 2023-01-04；公布 | Ryzen Mobile 7045HX / Dragon Range | 桌面衍生 CCD + I/O 设计，最多16核；55–75 W可配置档与轻薄APU不可直接混比 | [AMD CES 全系规格][O26] |
| 2023-12-06；公布 | Ryzen Mobile 8040 / Hawk Point | 延续 Zen 4、RDNA 3，指定型号 NPU 增强；8945HS 与 8945HX 不是相同芯片或后缀写法 | [AMD 原始公告][N01] |
| 2024-06-02；公布 | Ryzen AI 300 / Strix Point | Zen 5/Zen 5c、RDNA 3.5、XDNA 2；HX 370 名称中的 HX 不应直接套用 Dragon Range HX 的封装和功耗 | [AMD Computex 公告][O27] |
| 2025-01-06；公布 | Ryzen AI 300 扩展 / Krackan Point | 以 AI 7、AI 5 等配置向更多笔记本扩展；AI 300 是销售系列，可包含不同 die 与核心组合 | [AMD CES 客户端公告][O28] |
| 2025-01-06；公布 | Ryzen AI Max / Strix Halo | 最多16个 Zen 5核、大规模 RDNA 3.5 核显与共享内存；本页只收笔记本/二合一搭载，mini PC 不收 | [AMD CES 客户端公告][O28] |
| 2025-01-06；公布 | Ryzen 200 Mobile / Hawk Point 延续 | 主流 Zen 4 系列；正式名字没有统一的“AI”前缀，NPU 依型号裁剪，不与 AI 300 混称 | [AMD CES 客户端公告][O28] |
| 2025-01-06；公布 | Ryzen 9000HX / Fire Range，含9955HX3D | Zen 5 桌面衍生笔记本路线；带3D缓存与普通HX型号的核数/缓存分别核实 | [AMD CES 游戏本公告][O29] |
| 2025-02-18；型号页launch | Ryzen AI 300 补充型号：AI 5 340 | Krackan Point 配置进入型号页；型号页launch与整个系列首次公告是不同事件 | [AMD 型号规格页][N02] |
| 2025-04-23；型号页launch | Ryzen 8000HX / Dragon Range Refresh | 8945HX 为 Zen 4、5 nm CCD + 6 nm I/O、16核32线程；不是8040HS的同一APU，也不是Zen5 | [AMD 8945HX 规格页][N03] |
| 2025-10-01；型号页launch | Ryzen 100：Ryzen 7 170 / Rembrandt | Zen 3+、6 nm、Radeon680M、8核16线程；这是成熟平台的新销售编号，名称无AI前缀 | [AMD 170 规格页][N04] |
| 2026-01-05；公布 | Ryzen AI 400 / Gorgon Point | 延续 Zen 5/Zen 5c 路线，指定型号 NPU 提升；mobile首发与后续AM5桌面扩展分开 | [AMD CES 公告][O30] |
| 2026-01-05；配置扩展公布 | Ryzen AI Max+ 392 / 388 | 在AI Max家族增加不同CPU核数与完整核显配置；不是又一代CPU架构。本页只列笔记本/二合一 | [AMD CES 公告][O30] |
| 2026-06-02；型号页launch | Ryzen 100：Ryzen 9 180 / Hawk Point | Zen 4、4 nm、Radeon780M、8核16线程；同一100销售系列已跨微架构，不能沿用170的Zen3+说明 | [AMD 180 规格页][N05] |

## 命名和日期冲突处理

1. **Ryzen 100、Ryzen 200 不能自动写成 Ryzen AI 100、Ryzen AI 200。** AMD CES 原稿虽然有带AI能力的描述，但产品名应逐个按型号页/规格表保留。也不能把它们认成 Ryzen 1000/2000 的缩写。
2. **HX、HS、H、U 是型号的一部分，不能省略后拿另一颗芯片替代。** 8945HX与8945HS是最直接的反例。AI 9 HX 370的命名体系又不同，不可仅凭HX判断它是桌面CCD衍生大芯片。
3. **HX 370 的官方日期字段当前存在冲突。** 本次读取的AMD型号页写 `Launch Date 7/28/2025`；已读AMD首发公告却在此前明确公布该家族。现有HTML又填 `2024-07-17`。本表采用有明确原始公报的家族公布事件，不默默把其中一个值升格为整机实际上市日。[冲突型号页][N06]、[原始家族公告][O27]
4. 官方`ryzen-consumer-master-quick-reference-competitive.pdf`搜索索引仍可见，直接打开已404；`ryzen-200-series-quick-reference-guide-non-competitive.pdf`也404。它们可作档案线索，**本表不依赖失效PDF来证明具体发布日期**。
5. 早期Mobile K6、Athlon4/XP-M、Turion及PhenomII在售记录与“首次发布日”未全部补齐。年报只证明年度产品组合时，不猜具体月日；这比套桌面日期可靠。

## 三组原作者整机实测

以下是评价证据，不是另一组产品发布日期。正文厂商格若采用这些结论，不重复评测日期；可把出处年份留在来源抽屉中。

### Renoir H：相同机身、接近功耗预算

[Tim Schiesser / TechSpot，XMG Core 15 原测][R01]。两台同系列Tongfang机身，4800H对10750H、RTX2060、16GB双通道DDR4；AMD内存3200、Intel2933。Overboost长期功耗AMD **72 W**、Intel **75 W**，不是45W等功耗测试。Cinebench R20多核AMD **+60%**，Handbrake **+49%**；Intel单核R20 **+4%**。这是8核对6核的产品对照，不能全归因IPC。

可用格内描述：“同机身原测中，4800H在72W对75W设置下，R20多核领先10750H约60%；单核仍有差距。”

### Renoir U：低功耗轻薄本的多线程扩展

[Tim Schiesser / TechSpot，4800U 原测][R02]。测试机Lenovo IdeaPad Slim7，4800U、16GB双通道LPDDR4X；长期限制分别15W/25W，仍允许短期boost。15W Cinebench R20多核对i7-1065G7 **超过+150%**，25W约 **+130%**；此为8核对4核，Intel对照是媒体配置组平均，**不是同机身**。不能据此写“所有应用快2.5倍”。

可用格内描述：“IdeaPad Slim7的15W配置在R20多核显著领先四核Ice Lake；核心数量、boost持续时间与平台差异都影响结果。”

### AI Max：大规模CPU与核显进入二合一

[Andreas Osthoff / Notebookcheck，ROG Flow Z13 GZ302EA-RU073W 原测][R03]。AI Max+395、32GB LPDDR5X-8000；Turbo为CPU短时 **86 W**、持续 **70 W**。原作者报告多核较旧Flow Z13的i9-13900H高约 **50–70%**，与115W的7945HX3D接近；这些是不同整机与不同功耗预算，不能标成等功耗代际IPC。

同机Turbo / Performance / Quiet的CB2024多核分别 **1648 / 1403 / 1289**。核显与65–75W RTX4070 Laptop的游戏对照是GPU证据，不能当成CPU提升；模式变化也说明不能只挂一个“395跑分”。

可用格内描述：“Flow Z13实测把16核CPU与大核显组合进二合一；CPU持续70W，多核较旧款明显提升，收益伴随散热与重量成本。”

## 本轮新增关键官方来源（6项）

[N01]: https://ir.amd.com/news-events/press-releases/detail/1172/amd-extends-mobile-pc-leadership-with-amd-ryzen-8040-series-processors-and-makes-ryzen-ai-software-widely-available-advancing-the-ai-pc-era
[N02]: https://www.amd.com/en/products/processors/laptop/ryzen/ai-300-series/amd-ryzen-ai-5-340.html
[N03]: https://www.amd.com/en/products/processors/laptop/ryzen/8000-series/amd-ryzen-9-8945hx.html
[N04]: https://www.amd.com/en/products/processors/laptop/ryzen/100-series/amd-ryzen-7-170.html
[N05]: https://www.amd.com/en/products/processors/laptop/ryzen/100-series/amd-ryzen-9-180.html
[N06]: https://www.amd.com/en/products/processors/laptop/ryzen/ai-300-series/amd-ryzen-ai-9-hx-370.html

## 已读官方原件与年报

[O01]: https://www.ardent-tool.com/CPU/docs/AMD/K6/mobile/
[O02]: https://ir.amd.com/financial-information/sec-filings/content/0001012870-03-001181/d10k.htm
[O03]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-04-062410/dex991.htm
[O04]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-05-039876/d10k.htm
[O05]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-06-040130/d10k.htm
[O06]: https://ir.amd.com/sec-filings/content/0001193125-07-044191/0001193125-07-044191.pdf
[O07]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-09-036235/d10k.htm
[O08]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-10-035218/d10k.htm
[O09]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-11-040392/d10k.htm
[O10]: https://ir.amd.com/news-events/press-releases/detail/168/amd-fusion-apu-era-begins
[O11]: https://ir.amd.com/news-events/press-releases/detail/360/amd-ushers-in-next-generation-of-computing-with-amd-a-series-apus
[O12]: https://ir.amd.com/news-events/press-releases/detail/86/second-generation-amd-a-series-apus-enable-best-in-class-pc-mobility-entertainment-and-gaming-experience-in-single-chip
[O13]: https://ir.amd.com/news-events/press-releases/detail/215/new-amd-a-series-apu-offers-mobile-pc-users-innovative-experiences-elite-graphics-performance-and-longer-battery-life
[O14]: https://ir.amd.com/news-events/press-releases/detail/72/amd-unveils-innovative-new-apus-and-socs-that-give-consumers-a-more-exciting-and-immersive-experience
[O15]: https://ir.amd.com/news-events/press-releases/detail/510/next-generation-mobile-apus-extend-amd-performance-leadership-add-cutting-edge-features-and-enhanced-security
[O16]: https://ir.amd.com/news-events/press-releases/detail/528/amd-announces-its-most-advanced-mobile-apus-for-consumer-and-commercial-notebooks
[O17]: https://ir.amd.com/news-events/press-releases/detail/616/amd-unveils-6th-generation-a-series-processor-bringing-unprecedented-hd-streaming-online-gaming-and-innovative-computing-experiences-to-notebooks-and-all-in-ones
[O18]: https://ir.amd.com/news-events/press-releases/detail/679/amd-accelerates-availability-of-mobile-7th-generation-amd-a-series-processors
[O19]: https://ir.amd.com/news-events/press-releases/detail/689/work-faster-play-longer-with-new-mobile-7th-generation-amd-a-series-processors
[O20]: https://ir.amd.com/news-events/press-releases/detail/795/correcting-and-replacing----amd-introduces-new-ryzen-mobile-processors-the-worlds-fastest-processor-for-ultrathin-notebooks1
[O21]: https://ir.amd.com/news-events/press-releases/detail/870/amd-kicks-off-2019-offering-complete-mobile-portfolio-new-ryzen-athlon-and-a-series-processors-for-ultrathin-mainstream-and-chromebook-laptops
[O22]: https://ir.amd.com/news-events/press-releases/detail/926/amd-announces-worlds-highest-performance-desktop-and-ultrathin-laptop-processors-at-ces-2020
[O23]: https://ir.amd.com/news-events/press-releases/detail/986/amd-announces-worlds-best-mobile-processors-in-ces-2021-keynote
[O24]: https://ir.amd.com/news-events/press-releases/detail/1040/amd-presents-latest-high-performance-computing-technologies-in-2022-product-premiere-livestream
[O25]: https://www.amd.com/zh-tw/products/processors/laptop/ryzen/7000-series/amd-ryzen-5-7520u.html
[O26]: https://ir.amd.com/news-events/press-releases/detail/1111/amdextends-its-leadership-with-the-introduction-of-its-broadest-portfolio-of-high-performance-pc-products-for-mobile-and-desktop
[O27]: https://ir.amd.com/news-events/press-releases/detail/1202/amd-unveils-next-gen-zen-5-ryzen-processors-to-power-advanced-ai-experiences
[O28]: https://ir.amd.com/news-events/press-releases/detail/1232/amd-announces-expanded-consumer-and-commercial-ai-pc-portfolio-at-ces
[O29]: https://ir.amd.com/news-events/press-releases/detail/1233/amd-announces-new-graphics-and-gaming-products-for-ultimate-gameplay-experience-at-ces
[O30]: https://ir.amd.com/news-events/press-releases/detail/1270/amd-expands-ai-leadership-across-client-graphics-and-software-with-new-ryzen-ryzen-ai-and-amd-rocm-announcements-at-ces-2026

## 原作者整机评测

[R01]: https://www.techspot.com/review/2075-same-laptop-different-cpu-productivity/
[R02]: https://www.techspot.com/review/2096-amd-ryzen-4800u/
[R03]: https://www.notebookcheck.net/Asus-ROG-Flow-Z13-GZ302EA-Convertible-Review-AMD-s-Strix-Halo-GPU-is-neck-and-neck-with-the-RTX-4070-Laptop.963266.0.html

## 成文补核：移动 3D V-Cache

[AMD 7945HX3D 官方型号页](https://www.amd.com/en/products/processors/laptop/ryzen/7000-series/amd-ryzen-9-7950hx3d.html)的页面标题及产品名为 Ryzen 9 7945HX3D，路径自身含 7950hx3d，不能按 URL 拼写改名。Launch Date 字段为 2023-07-27；16 核 32 线程、128 MB L3。时间轴按“型号页记录”标记，不用它替代所有地区 OEM 整机首销日期；游戏缓存收益也不自动等于所有 CPU 负载提升。

*作者：[AI-Authored Tech Chronicles]*
*系列：《CPU 历史资料库》AMD 笔记本与二合一补证*
*分析基于：AMD 官方发布稿、产品规格、年报与移动技术原件 + TechSpot/Notebookcheck 原作者整机实测，资料读取于 2026-10-28*
