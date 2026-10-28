# Intel 移动 CPU：笔记本与二合一的时间轴补证

资料读取于 2026-10-28。研究笔记，不是正式文章。收录笔记本、上网本、可运行通用 PC 系统的二合一；不收手机、嵌入式专供、服务器和掌机专用处理器。性能证据只使用笔记本原作者测试。

日期数据留在事件字段，供页面左侧时间轴使用。产品卡正文只保留型号/代号、核心配置与定位；不要把本表日期再抄入卡片。精度为年、月或季度时应原样显示，不补成某月一日。

## 1. 早期移动产品、Core i 各代与低功耗并行线

这一表是家族谱系。旧官方目录有时把多个后续频率档合在一行，不应把整行全部型号都写成同日首发。`年段` 表示索引范围，尚未完成其中每批产品的首发归档。

| ID | 左侧时间字段及事件类型 | 产品 / 代号 | 产品卡可使用的事实、边界 | 证据 |
|---|---|---|---|---|
| MI01 | 1990-10-15；介绍 | Intel386 SL | 面向便携系统的 386 衍生；与普通 386DX/SX 分开。 | [Intel 按年速查](https://www.intel.com/pressroom/kits/quickrefyr.htm) |
| MI02 | 1992-11-09；介绍 | Intel486 SL | 移动功耗管理分支；不能从桌面 486DX 首发日推导移动日期。 | [Intel 按年速查](https://www.intel.com/pressroom/kits/quickrefyr.htm) |
| MI03 | 1990 年代中期；年段，具体首发待补 | Mobile Pentium / P54 系、后续移动 MMX | 早期移动 Pentium 系列；本轮不将桌面 Pentium 的首发日期套入。 | [Intel 老产品家族表](https://www.intel.com/pressroom/kits/quickreffam.htm)；早期非 MMX 移动批次需继续查同期手册 |
| MI04 | 1997-09；产品目录记录 | Pentium Notebook with MMX / Tillamook | 0.25 μm 移动 MMX 分支；不要采用桌面 MMX 日期。 | [Intel 家族表](https://www.intel.com/pressroom/kits/quickreffam.htm) |
| MI05 | 1998-04；1999-01 后续 | Mobile Pentium II / Tonga，后续 Dixon | 早批外置 L2 与后续集成 L2 实现不同；两个阶段分开。 | [Intel 家族表](https://www.intel.com/pressroom/kits/quickreffam.htm) |
| MI06 | 1999-10；2001-07 后续 | Mobile Pentium III / Coppermine → Pentium III-M / Tualatin | 后续 SpeedStep、低电压和超低电压版本同属多批次产品；不能统一为桌面 Katmai 首发。 | [Intel 家族表的 Mobile 区](https://www.intel.com/pressroom/kits/quickreffam.htm) |
| MI07 | 2002-03；产品目录记录 | Mobile Pentium 4-M / Northwood-M | 应与后来的 Mobile Pentium 4（含 HT）区分，均不等于 Pentium M。 | [Intel 家族表](https://www.intel.com/pressroom/kits/quickreffam.htm) |
| MI08 | 2003-06；2003-09 HT 扩展 | Mobile Pentium 4 / 后续支持 HT 的系列 | 桌面替代笔记本方向，功耗定位与 Pentium M 不同；名称近似不能合并成一个产品家族。 | [Intel 家族表](https://www.intel.com/pressroom/kits/quickreffam.htm) |
| MI09 | 2003-03-12；发布 | Pentium M / Banias | 为笔记本设计的系列；Centrino 是包含处理器、芯片组、无线网络的平台注册标识，不是一颗 CPU。 | [Intel 按年速查](https://www.intel.com/pressroom/kits/quickrefyr.htm) |
| MI10 | 2004-05；目录及同期产品记录 | Pentium M / Dothan | 90 nm、2 MB L2 的后续内核；与 Banias 的比较应保留整机、频率与电池条件。 | [Intel 老产品目录](https://www.intel.com/pressroom/kits/quickreffam.htm)、[同期笔记本实测](https://hardware-mag.de/artikel/notebooks/intel_pentium_m_735_dothan_im_praxistest/10/) |
| MI11 | 2006-01；首批 | Core Solo / Core Duo / Yonah | 单核/双核移动产品；不是 Core 2，也不按后来的 Core i 世代编号。 | [Intel 按年与家族目录](https://www.intel.com/pressroom/kits/quickrefyr.htm) |
| MI12 | 2006-08；移动产品批次 | Core 2 Duo / Merom；后续 Merom-L | 移动 Core 2 与桌面 Conroe 同属 Core 微架构，但不可套用桌面整机上市日。 | [Intel 家族表](https://www.intel.com/pressroom/kits/quickreffam.htm)、[Core 2 资料包](https://www.intel.com/pressroom/kits/core2duo/index.htm) |
| MI13 | 2008 年；移动扩展年段 | Core 2 / Penryn、Penryn-3M，后续低电压与四核型号 | 45 nm 移动系列；双核、四核、低压与超低压应按产品批次记录。 | [Intel 按年速查](https://www.intel.com/pressroom/kits/quickrefyr.htm) |
| MI14 | 2009 年；高性能移动产品 | 第一代 Core i7 / Clarksfield | Nehalem 移动四核；不要把 2008 年桌面 Bloomfield 当作移动首发。 | [Intel 2010 全家族资料与既有产品对照](https://www.intel.com/pressroom/archive/releases/2010/20100107comp_sm.htm)；本轮仅锁年 |
| MI15 | 2010-01-07；发布 | 第一代 Core i / Arrandale | 32 nm CPU 加同封装图形的移动双核支线；与 Clarksfield 并行。 | [Intel 发布稿](https://www.intel.com/pressroom/archive/releases/2010/20100107comp_sm.htm) |
| MI16 | 2011-01；家族发布 | 第二代移动 Core / Sandy Bridge | M/QM/XM 等产品按型号区分；AVX、CPU 与图形集成、Quick Sync。 | [官方 CES 公布说明](https://www.intc.com/news-events/press-releases/detail/709/live-a-visual-life-with-intel-at-ces-2011) |
| MI17 | 2012-04 起；分批 | 第三代移动 Core / Ivy Bridge | 22 nm Tri-Gate；高端四核与后续双核并非同日开售。 | [Intel 家族发布稿](https://www.intc.com/news-events/press-releases/detail/577/3rd-generation-intel-core-processors-bring-exciting) |
| MI18 | 2013-06；后续刷新延续至 2014 | 第四代移动 Core / Haswell | M/H/U/Y 等不同功耗与配置；双核低压和四核高性能不能只凭“i7”比较。 | [Intel 发布稿](https://www.intc.com/news-events/press-releases/detail/499/innovation-reinvention-on-intel-architecture-fuel-wave) |
| MI19 | 2014-09-05；Core M 发布 | Broadwell-Y / Core M | Broadwell 最先进入低功耗二合一，不能把整代移动统一起算于 2015。 | [Intel Core M 历史条目](https://timeline.intel.com/2014/breaking-the-14-nanometer-barrier%3A-the-intel-core-m) |
| MI20 | 2015 年；U/H 产品扩展年段 | 第五代移动 Core / Broadwell-U、Broadwell-H | 与先发 Core M 分开；H 四核晚于主流 U，具体整机日期需按 OEM 查。 | [Intel 同期年报](https://www.intc.com/filings-reports/all-sec-filings/content/0000050863-16-000105/a10kdocument12262015q4.htm)；本轮不补具体日 |
| MI21 | 2015-09-01；广泛家族发布 | 第六代移动 Core / Skylake | U/Y/H 等多分支；8 月首批桌面 K 解禁不等于笔记本全家族上市。 | [Intel 全家族发布稿](https://www.intc.com/news-events/press-releases/detail/1193/introducing-6th-generation-intel-core-intels-best) |
| MI22 | 2016 Q3 U/Y；2017 Q1 高性能扩展 | 第七代移动 Core / Kaby Lake | 同一代移动产品跨两个年份；不能一律采用 2017 年桌面日期。 | [Kaby Lake 官方型号表](https://www.intel.com/content/www/us/en/ark/products/codename/82879/products-formerly-kaby-lake.html) |
| MI23 | 2017-08-21；家族首批公布 | 第八代移动 Core / Kaby Lake Refresh-U | 主流低压 U 增加核心，是第八代最先出现的一支；不是 Coffee Lake-H。 | [Intel 首批公布](https://www.intc.com/news-events/press-releases/detail/210/new-8th-gen-intel-core-processors-simplifying-today) |
| MI24 | 2018 年；高性能与特殊封装扩展 | 第八代移动 Core / Coffee Lake-H；Kaby Lake-G | H 与 G 是不同路线；G 搭配 Radeon 图形和 HBM 的封装，笔记本产品应与桌面 NUC 用途分开。Kaby Lake-G 首发原稿本轮未复核，暂不标具体日。 | [Intel 移动产品生命周期目录](https://www.intel.com/content/dam/support/us/en/documents/processors/CustomerSupportServicing-MobileProcessors.pdf)；G 的精确日与首批笔记本待补 |
| MI25 | 2018-08-28；公布 | 第八代移动 Core / Whiskey Lake-U、Amber Lake-Y | 连接特性更新与更低功耗定位；不能因为属于第八代就等同于 Coffee Lake-H。 | [Intel 发布稿](https://www.intc.com/news-events/press-releases/detail/130/new-8th-gen-intel-core-processors-optimize-connectivity) |
| MI26 | 2019 年；高性能移动扩展 | 第九代移动 Core / Coffee Lake-H Refresh | H/HK 高性能方向；不能用桌面 9900K 的日期与功耗代表。 | [Intel 移动生命周期目录](https://www.intel.com/content/dam/support/us/en/documents/processors/CustomerSupportServicing-MobileProcessors.pdf)；本轮仅锁年 |
| MI27 | 2019-08-01；公布，假日季整机 | 第十代移动 Core / Ice Lake-U/Y | 10 nm、不同核显配置；与同代 Comet Lake 完全分开记录。 | [Intel 原始发布稿](https://download.intel.com/newsroom/2021/archive/2019-08-01-news-intel-launches-first-10th-gen-intel-core-processors-redefining-next-era-laptop-experiences.pdf) |
| MI28 | 2019 年 U/Y；2020 年 H | 第十代移动 Core / Comet Lake-U/Y、Comet Lake-H | 14 nm 分支；同一代编号跨不同内核、制程和市场。具体型号按 ARK 查季度，不拿 Ice Lake 日期代替。 | [Intel 移动生命周期目录](https://www.intel.com/content/dam/support/us/en/documents/processors/CustomerSupportServicing-MobileProcessors.pdf) |
| MI29 | 2020-06-10；公布 | Lakefield / Core with Intel Hybrid Technology | 用于轻薄/折叠类 PC 的混合 CPU，属于本笔记本/二合一范围；不是 Atom 手机上的同类路线。 | [Intel 原始发布稿](https://www.intc.com/news-events/press-releases/detail/1078/intel-hybrid-processors-uncompromised-pc-experiences-for) |
| MI30 | 2020-09-02；U 级首发；2021 年 H 扩展 | 第十一代移动 Core / Tiger Lake、Tiger Lake-H35/H45 | H35 与 H45 核数、功耗等级不同；不能把所有 11 代 H 都写成同一配置。 | [Intel 首发稿](https://www.intc.com/news-events/press-releases/detail/1411/intel-launches-worlds-best-processor-for-thin-and-light)、[同期 11800H 对比说明](https://www.techspot.com/review/2410-intel-core-i7-12700h/) |
| MI31 | 2022 年；H/P/U/HX 分批 | 第十二代移动 Core / Alder Lake | 混合 P/E 核进入笔记本主流；H/P/U/HX 面向不同整机功耗范围，不能套桌面 K 数据。 | [实际移动 H 原测与配置](https://www.techspot.com/review/2410-intel-core-i7-12700h/)；各发布批次的精确日待补 |
| MI32 | 2023 年；H/P/U/HX 家族 | 第十三代移动 Core / Raptor Lake | 后缀与裸片实现不同；HX 不能作为全部轻薄本的代表。 | [Intel 移动生命周期目录](https://www.intel.com/content/dam/support/us/en/documents/processors/CustomerSupportServicing-MobileProcessors.pdf)；本轮只保留到年，不套桌面 2022 日期 |

## 2. Atom 上网本、二合一及纯 N 线

不纳入 Silverthorne MID、Medfield/手机 Atom、Atom C/P/工业 x6000E；即使共享 CPU 内核也不属于此次终端范围。

| ID | 左侧时间字段 / 精度 | 笔记本或二合一谱系 | 产品卡要点 | 来源与核实状态 |
|---|---|---|---|---|
| MI33 | 2008 年 | Atom / Bonnell / Diamondville N270、N280 等 | 上网本低功耗产品；与 Silverthorne MID 分开。 | [Intel 品牌发布稿](https://www.intel.com/pressroom/archive/releases/2008/20080302comp.htm)、[Atom 产品原始文档](https://www.intel.com/content/www/us/en/products/docs/processors/atom/technical-resources.html) |
| MI34 | 2009–2010 年段 | Atom / Pineview / Pine Trail N4xx、N5xx | CPU 与图形/内存控制器集成进一步推进；各型号不统一写为同一日。 | [Atom 官方文档集合](https://www.intel.com/content/www/us/en/products/docs/processors/atom/technical-resources.html)；本轮为谱系索引 |
| MI35 | 2011–2012 年段 | Atom / Saltwell / Cedarview、Cedar Trail N2xxx | 32 nm 上网本分支；不纳入同内核的手机平台。 | [Atom 官方文档集合](https://www.intel.com/content/www/us/en/products/docs/processors/atom/technical-resources.html)；逐款首发待补 |
| MI36 | 2013 年 | Silvermont / Bay Trail-M（Pentium/Celeron N）及 Bay Trail-T（Atom Z37xx） | N 用于入门笔记本，Z37xx 可用于通用 PC 二合一；不把全部 Atom 平板默认纳入。 | [Silvermont 官方架构稿](https://www.intc.com/news-events/press-releases/detail/507/intel-launches-low-power-high-performance-silvermont)、[Bay Trail 产品发布](https://www.intc.com/news-events/press-releases/detail/479/intel-launches-new-multicore-low-power-socs-for-tablets-2) |
| MI37 | 2015 年 | Airmont / Braswell N3xxx；Cherry Trail Atom x5/x7-Z8xxx | 入门笔记本与二合一分支；不要混入 Atom x3 的手机产品。 | [Atom 原始技术文档集合](https://www.intel.com/content/www/us/en/products/docs/processors/atom/technical-resources.html)；具体笔记本 SKU 日期待补 |
| MI38 | 2016 年；2017 年后续 | Goldmont / Apollo Lake N33xx/N34xx/N4200；Goldmont Plus / Gemini Lake N4000/N4100/N5000 | Pentium/Celeron 是品牌层，Goldmont/Plus 是内核层；不混用嵌入式 Atom E 型号。 | [Intel 工具支持历史](https://www.intel.com/content/dam/develop/external/us/en/documents/release-notes-socwatch-windows-v2020-1-797107.pdf) 能确认平台存在；不是精确首发日证据 |
| MI39 | 2019 年刷新；2021 年新代 | Gemini Lake Refresh；Tremont / Jasper Lake N45xx/N50xx/N60xx | Jasper Lake 是客户端笔记本线，与工业 Elkhart Lake 分开；首发具体日待补。 | [Intel 处理器规格目录](https://www.intel.com/content/www/us/en/products/details/processors/intel-processor.html)；逐款补历史 ARK，不把现存页面更新时间作为上市日 |
| MI40 | 2023-01；资料初版 | Intel Processor N / Alder Lake-N；Core i3-N | 纯 E 核入门移动线，N100 为 4 核、i3-N300 为 8 核；i3 品牌不意味着有 P 核。 | [Intel 官方 N 线规格](https://download.intel.com/newsroom/2023/client-computing/Intel-N-series-Processors-Media_Presentation.pdf)、[官方数据手册修订记录](https://edc.intel.com/content/www/ca/fr/design/products/platforms/processor-and-core-i3-n-series-datasheet-volume-1-of-2/002/revision-history/) |
| MI41 | 2025 Q1；ARK 上市季度 | Twin Lake / N150、N250；Core 3 N350/N355 | 继续纯 E 核客户端路线；与 Core 200U、Core Ultra 200U 都是不同产品。 | [Twin Lake 官方型号与季度表](https://www.intel.com/content/www/us/en/ark/products/codename/238004/products-formerly-twin-lake.html) |

## 3. 近期移动命名与日期核对

| ID | 时间字段：架构预览 / 公布 / 整机可用性 | 产品卡名称与代号 | 后缀、架构与定位记录 | 原始证据 |
|---|---|---|---|---|
| MI42 | 2023-09 预览；2023-12-14 正式发布及首批销售 | Core Ultra Series 1 / 100H、100U / Meteor Lake | Redwood Cove P 核、Crestmont E/LP-E 核；CPU/GPU/NPU 分工。H/U 配置不同，不能把全系列都叫 16 核。 | [Intel 正式发布稿](https://www.intel.com/content/www/us/en/newsroom/news/core-ultra-client-computing-news-1.htm)、[架构预览稿](https://www.intc.com/news-events/press-releases/detail/1648/intel-innovation-2023-empowering-developers-to-bring-ai) |
| MI43 | 2024-01-08 公布；该年内多批 OEM | 第十四代 Core HX / Raptor Lake-HX Refresh | 与 Core Ultra 并行的高性能笔记本支线；桌面首发不是移动 HX 日期。 | [Intel CES 2024 更正后的正式稿](https://www.intc.com/news-events/press-releases/detail/1667/ces-2024-intel-delivers-new-high-level-compute-solutions) |
| MI44 | 2024-01-08 公布；2024 Q1 整机 | Core Series 1 / 100U：150U、120U、100U | Raptor Lake-U Refresh；**普通 Core**，不是 Meteor Lake 的 Core Ultra；系列序号不能代替内核名。 | [同一官方发布稿中的 Series 1 可用性](https://www.intc.com/news-events/press-releases/detail/1667/ces-2024-intel-delivers-new-high-level-compute-solutions)、[官方规格资料包](https://download.intel.com/newsroom/2024/client-computing/Media-Deck-Intel-Core-Processors-HXU-Mobile-65-35W-Desktop.pdf) |
| MI45 | 2024-09-03 正式发布；2024-09-24 已有原作者上市评测 | Core Ultra 200V / Lunar Lake | 4P+4E、无 HT，封装内 LPDDR5X；V 与 H/U/HX 不能合并成“同一 Arrow Lake”。本轮 09-24 仅作为上市评测证据，不据此替所有地区保证供货。 | [Intel 发布会记录](https://newsroom.intel.com/client-computing/keynote-core-ultra-200v-series-mobile)、[原作者 09-24 实测](https://www.notebookcheck.net/Intel-Lunar-Lake-CPU-analysis-The-Core-Ultra-7-258V-s-multi-core-performance-is-disappointing-but-its-everyday-efficiency-is-good.893405.0.html) |
| MI46 | **2024 Q4**；ARK 产品上市季度；2025 CES 再作组合介绍 | 普通 Core Series 2 / 200H：270H、250H、240H 等 | Raptor Lake-H Refresh；不是 Core Ultra 200H。不能因 CES 2025 介绍就把这些型号首发全部写成 2025。 | [Intel 官方 Series 2 型号表](https://www.intel.com/content/www/us/en/products/details/processors/core/series-2.html) 明确 250H/240H/220H 为 Q4’24 |
| MI47 | **2025 Q1**；ARK 上市季度 | 普通 Core Series 2 / 200U：250U、220U | 仍为 Raptor Lake 系的主流轻薄本产品，250U 为 2P+8E/12 线程；不是 Ultra 200U。 | [250U 官方 ARK](https://www.intel.com/content/www/us/en/products/sku/238771/intel-core-7-processor-250u-12m-cache-up-to-5-40-ghz/specifications.html)、[官方系列表](https://www.intel.com/content/www/us/en/products/details/processors/core/series-2.html) |
| MI48 | 2025-01-06 公布；**2025-02 起整机** | Core Ultra 200H / Arrow Lake-H | Lion Cove P 核、Skymont E 核；H 产品还存在低功耗岛。不能把 U 的 HT/内核配置照搬到 H。 | [Intel CES 2025 原始稿 P4](https://d1io3yog0oux5.cloudfront.net/_e1df4b2e16a695782160a442d8457838/intel/news/2025-01-06_Intel_Extends_Leadership_in_AI_PCs_and_Edge_1722.pdf)、[Intel 对记者的直接架构确认](https://arstechnica.com/gadgets/2025/01/intel-rounds-out-core-ultra-200-laptop-cpus-with-new-but-less-advanced-models/) |
| MI49 | 2025-01-06 公布；官方当时预计**2025 上半年整机** | Core Ultra 200HX / Arrow Lake-HX | 高性能移动/桌面替代定位；无 HT，不等同 200H 的完整 SoC 结构。当前保留当时供货窗口，不将其推成统一实际开售日。 | [Intel CES 2025 原稿的可用性段](https://d1io3yog0oux5.cloudfront.net/_e1df4b2e16a695782160a442d8457838/intel/news/2025-01-06_Intel_Extends_Leadership_in_AI_PCs_and_Edge_1722.pdf) |
| MI50 | 2025-01-06 公布；**2025-02 起整机** | Core Ultra 200U / 官方代号 Arrow Lake-U | **CPU 内核沿用 Redwood Cove + Crestmont，计算块使用 Intel 3**，保留 P 核 HT；不能写成与 H/HX 相同的 Lion Cove+Skymont。“Meteor Lake Refresh”可作解释，官方家族代号仍按 Arrow Lake-U 留档。 | [Intel 发布稿](https://d1io3yog0oux5.cloudfront.net/_e1df4b2e16a695782160a442d8457838/intel/news/2025-01-06_Intel_Extends_Leadership_in_AI_PCs_and_Edge_1722.pdf)、[Ars 记者得到的 Intel 直接确认](https://arstechnica.com/gadgets/2025/01/intel-rounds-out-core-ultra-200-laptop-cpus-with-new-but-less-advanced-models/)、[PCWorld 记者得到的 Intel 原始邮件说明](https://www.pcworld.com/article/2568168/intel-debuts-arrow-lake-for-laptops-with-core-h-hx-chips.html) |
| MI51 | 2025-10 架构预览；**2026-01-05 产品发布；01-27 起销售** | Core Ultra Series 3 / 3xx / Panther Lake | Intel 18A 移动平台；2025 的披露和出货计划不等于当时已有零售整机。 | [Intel 预览发布稿](https://www.intc.com/news-events/press-releases/detail/1752/intel-unveils-panther-lake-architecture-first-ai-pc)、[CES 2026 官方资料包](https://newsroom.intel.com/press-kit/press-kit-intel-at-ces-2026)；后者搜索索引全文可读、直接打开重定向失败，原样保留取证状态 |
| MI52 | **2026-03-17**；公布及 OEM 系统开始推出 | Core Ultra 200HX Plus / 290HX Plus、270HX Plus | Arrow Lake-HX 刷新；依然 Series 2，不因推出年份归到 Panther Lake。加入 Binary Optimization Tool，对特定游戏起作用，不保证所有程序统一获益。 | [Intel 官方发布稿](https://www.intel.com/content/www/us/en/newsroom/news/client-computing/intel-launches-core-ultra-200hx-plus-series-mobile-processors.html) |
| MI53 | **2026-04-16**；公布及 OEM 系统开始推出 | 普通 Core Series 3 / 3xx | 官方称基于 Panther Lake 的技术基础并采用 Intel 18A，针对入门/主流整机；与 Ultra Series 3 分开。Wildcat Lake 名称本轮未取得明确官方原稿，不在卡片据此断言同一裸片。 | [Intel 官方发布稿及 OEM 清单](https://www.intel.com/content/www/us/en/newsroom/news/client-computing/intel-launches-intel-core-series-3-processors-changing-the-game-for-everyday-computing.html) |

注意：上表有的“可用性”来自发布时的未来窗口，有的来自“今日开始推出”的声明，两者不可改写成同样的“全球全部整机已现货”。“从今日开始”也不代表每个 OEM 在所有地区同步上架。

## 4. 三组真实笔记本测试

| 对象与原测时间 | 硬件、功耗或电池条件 | 具体结果 | 可支持的记录与限制 | 原文 |
|---|---|---|---|---|
| Pentium M Dothan / Banias；Marcel Fladrich，2004-06-09 | Maxdata Pro 8100X：Dothan 1.7 GHz；Asus M6800N：Banias 1.6 GHz。均 i855PM、Mobility Radeon 9600；两块电池均 14.8 V × 4.4 Ah，名义 **65.12 Wh**。内存条布局不同。 | 作者综合评分 **114 / 100**；空闲续航 **3h40m / 3h29m**，后者复算约 **+5.3%**。 | 这是不同整机和频率的组合结果，不是等频 IPC +14%，也不是 CPU 能效 +5.3%。作者推算出的“等频 +8%”不是实际等频测量，卡片不采用。没有可靠整机功率表，不能由续航直接冒充 CPU 封装功耗。 | [测试平台](https://hardware-mag.de/artikel/notebooks/intel_pentium_m_735_dothan_im_praxistest/5/)、[电池与空闲续航](https://hardware-mag.de/artikel/notebooks/intel_pentium_m_735_dothan_im_praxistest/4/)、[原始评分及推算说明](https://hardware-mag.de/artikel/notebooks/intel_pentium_m_735_dothan_im_praxistest/10/) |
| Alder Lake 12700H 对 11800H；Tim Schiesser，2022-02-08 | XMG/Uniwill GM7AG8M、GM5AG7Y，32 GB DDR5-4800；CPU **PL1 45 W / 75 W 两档**，PL2 115 W。45 W 与 75 W 是 CPU 限制，不是整机插座功率。 | Cinebench R23 多线程：同档相对 11800H 约 **+27%（45 W）/ +36%（75 W）**；45 W Blender 约 **+25%**。 | 可支持移动平台的明显代际提升，但必须保留测试功耗档。原作者也指出插座读数下 12700H 仍多几瓦，不能仅按相同 PL1 称整机能效同比例提高。不要把 75 W 结果写成轻薄本必达。 | [完整原测与功率设置](https://www.techspot.com/review/2410-intel-core-i7-12700h/) |
| Lunar Lake 258V；Andreas Osthoff，2024-09-24，后有更新 | Asus Zenbook S 14 UX5406 等笔记本；约 **22 min PCMark 10** 场景，各平台默认功耗设置；封装内存使计量边界与外置内存平台存在差别。 | 作者记录 CPU package power 平均：258V **略低于 9 W**、Ryzen AI 9 HX 370 **略高于 14 W**、Meteor Lake 155H **接近 16 W**。 | 属于日常混合任务中的**CPU 封装**遥测，不是整机功率；不将约数复算成精确百分比，也不推出所有整机续航翻倍。多核满载和日常功耗分别陈述。 | [原作者分析，Power consumption during everyday use](https://www.notebookcheck.net/Intel-Lunar-Lake-CPU-analysis-The-Core-Ultra-7-258V-s-multi-core-performance-is-disappointing-but-its-everyday-efficiency-is-good.893405.0.html) |

## 5. 落到记录页时的取证规则与缺口

- 页面的产品记录以家族与代际为单位，日期只存在左侧事件轴；正文卡片不重复日期。一个家族可有“公布”和“首批整机”两个事件，不能把不同事件拼成一个精确日。
- 老产品日期未核到日的，直接写年/月/季度。文档初版日期、页面更新日期、架构演示日期都不是默认的实际整机首发。
- 近期最易混淆的五组：普通 Core 100U 与 Ultra 100U；普通 Core 200H 与 Ultra 200H；Ultra 200U 与 200H/HX；200V 与其他 200 后缀；Ultra Series 3 与普通 Core Series 3。
- 旧低端 Pentium/Celeron 命名贯穿 Core 与 Atom 衍生内核。按实际代号放入家族，不能将所有 Celeron 作为单一架构，也不能把所有带 N 的处理器写成 Atom 品牌。
- 本轮没有按每台历史笔记本逐 SKU 抄录规格。待补项：早期 Mobile Pentium 首发、部分 Core 2/第九至十三代 H/P/U/HX 的精确发布批次、Atom/N 线全部首发日、Kaby Lake-G 原始发布稿、Ultra 200HX 首批具体整机上架日。
- 三组实测不构成跨年代统一跑分曲线。AnandTech 失效材料不用于补写数字；Panther Lake 本轮只锁定发布/销售节点，不用厂商宣传百分比充作独立实测。
- 官方新资料集中在 CES 2024、CES 2025、CES 2026、普通 Core Series 2/250U ARK、Ultra 200HX Plus、普通 Core Series 3；其余沿用本仓库已建立的 Intel 历史原件入口，避免无限扩搜。

## 成文补核：移动产品批次原稿

- [第九代 H 系列原稿](https://download.intel.com/newsroom/2021/archive/2019-04-23-news-9th-gen-intel-core-mobile-h-series.pdf)：锁定移动 H 的公布节点，避免套用桌面第九代日期。
- [CES 四个新处理器家族原稿](https://www.intel.com/content/www/us/en/newsroom/news/ces-2021-four-new-processor-families.html)：补入 H35、Jasper Lake；与后续八核 H45 分开。
- [第十二代移动 H 原稿](https://www.intc.com/news-events/press-releases/detail/1517/intel-engineers-fastest-mobile-processor-ever-with-12th-gen)：主线家族公布节点；后续 P/U、HX 是其他批次。
- [Alder Lake P/U 扩线原稿](https://download.intel.com/newsroom/archive/2025/en-us-2022-02-23-intel-expands-mobile-leadership-brings-enthusiast-performance-to-thinandlight-laptops.pdf)：补入轻薄 P/U 的独立公布节点。
- [第十三代移动与 N 线原稿](https://d1io3yog0oux5.cloudfront.net/_ef0e74a029a7ab7ac2a7aade0699acb6/intel/news/2023-01-03_CES_Intel_Extends_Performance_Leadership_with_1596.pdf)：同日分别记录高性能/主流移动 Core 和纯 E 核入门 N 线。

*作者：[AI-Authored Tech Chronicles]*
*系列：《移动 CPU 时间轴》研究材料·Intel 补充证据*
*分析基于：Intel 历史目录、ARK、CES 发布稿与技术资料 + Hardware-Magazin、TechSpot、Notebookcheck 原作者笔记本实测 + Ars Technica、PCWorld 记者取得的 Intel 架构直接确认，资料读取于 2026-10-28*
