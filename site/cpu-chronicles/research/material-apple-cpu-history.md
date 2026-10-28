# Apple 处理器历史研究材料：采用史、自研 SoC 与专用芯片

资料读取日：2026-10-28。用途：后续文章的事实、时间线与评价来源库；本文件是研究笔记，不是文章正文。

## 范围与证据口径

- 按家族与主要代际整理，不逐条枚举频率、屏蔽核心、封装、整机配置或 OEM SKU。覆盖个人电脑、工作站、服务器、手机、平板、穿戴与家庭设备。
- “Apple 采用的 CPU”与“Apple 设计的 SoC”分表。MOS、WDC、Motorola、IBM、Intel 的产品不能统称 Apple 自研 CPU；A4 是 Apple 设计的 SoC，也不表示其中每个 CPU/GPU IP 都由 Apple 从零设计。
- 日期默认为美国官方公布日期。整机采用日不等于芯片原厂首发日；标“年/月”的条目不擅自补成日。上市未逐条复核的条目标为“未逐项核实”。
- 工程备注是规格事实与据此可研究的问题，不是跑分结论。厂商“最高提升”等数字属于厂商测试，独立实测集中在后文。
- 旧 Apple 技术支持表、扫描手册可能存在录入错误或时间口径差异；正文引用应优先原发布稿与同期手册。托管在第三方档案站的 Apple 原手册仍是原始文献；第三方编纂年表仅作补查入口。

## 一、Apple 采用的外部处理器：1976—2020

| 编号 | 时间与事件口径 | 家族、设备与市场 | 工程事实、边界与研究价值 | 原始来源 |
|---|---|---|---|---|
| H01 | 1976；手册年份，精确首销日未在该手册核实 | MOS 6502；Apple-1，个人电脑 | 8 位 CPU；Apple 设计整机和监控程序，不是 6502 设计方。可从原理图观察 CPU、内存与终端的连接 | [Apple-1 原版操作手册，CHM 馆藏][h01] |
| H02 | 1977 产品代；所引参考手册为 1978 年版 | 6502；Apple II / II Plus | 6502 指令集、内存映射、显示和外设共同决定软件能力；不能用今天的 CPU 跑分追溯整机使用体验 | [Apple II Reference Manual 扫描件][h02] |
| H03 | 1980 家族；具体公布日待同期通告复核 | 6502A；Apple III / III Plus，商用电脑 | Apple III 原始 SOS 文档保留机器接口；6502A / 2 MHz 是现存规格表的检索线索。**该型号精确芯片后缀与时钟尚需电路/服务手册二次核验** | [Apple III SOS Reference Manual 原文][h03]；[存档规格表，辅助定位而非原厂设计证据][h03b] |
| H04 | 1984—1985 产品阶段；具体改款日期未逐项核实 | 65C02；Apple IIc、增强 IIe | CMOS 6502 衍生，增加指令；普通 IIe 与增强 IIe 应分开。IIc Plus 的时钟变更也不应写成新的 ISA 世代 | [Apple IIc Reference Manual 原文扫描][h04] |
| H05 | 1986-09 家族；所引手册确认硬件，不单独证明发布日期 | 65C816；Apple IIGS | 16 位寄存器与 6502 兼容模式；手册给出约 1.024 MHz / 2.8 MHz 两种运行速度。原文可追踪 FPI 与 Mega II 两个子系统 | [Apple IIGS Hardware Reference][h05]；[Apple 同期资料，CHM 馆藏][h05b] |
| H06 | 1983 Lisa 家族；此处 Apple 官方存档记录的是 1985-01-01 的 Macintosh XL | Motorola 68000；Lisa / Macintosh XL | XL 规格为 5 MHz；Lisa 采用 CPU 的历史不能从 1984 Macintosh 起算。**1983 首发日待 Lisa 原始发布文献补证** | [Macintosh XL 官方规格][h06] |
| H07 | 1984-01-24；官方 Introduced | Motorola 68000；Macintosh 128K | 8 MHz、128 KB RAM；规格把外部数据通路与地址模式分别列出，不能只以“16 位/32 位”一个标签覆盖全部层次 | [Macintosh 128K 官方规格][h07] |
| H08 | 1987-03-02；官方 Introduced | Motorola 68020；Macintosh II | 16 MHz、32 位数据通路，可配 68851 PMMU；CPU 能力与整机 ROM/系统寻址能力应分开 | [Macintosh II 官方规格][h08] |
| H09 | 1988 家族；精确日未在本次摘录中复核 | Motorola 68030；Macintosh IIx 等 | MMU 集成；68030 与 68020 的变化不仅是频率。SE/30 等整机继续复用同一家族 | [Macintosh IIx 官方规格][h09] |
| H10 | 1991-10-21；官方 Introduced | Motorola 68040 / 68LC040；Quadra、Centris、部分 LC/Performa | Quadra 700 为 25 MHz、集成 MMU/FPU；低价 LC040 不应沿用完整 68040 的 FPU 规格 | [Quadra 700 官方规格][h10] |
| H11 | 1994-03-14；官方 Introduced | PowerPC 601；Power Macintosh 6100/7100/8100 | 从 68k 转向 PowerPC；6100/60AV 的 60 MHz 与 32 KB L1 可由原厂表复核。并非 Apple 首次制造 CPU | [Power Macintosh 6100/60AV 官方规格][h11] |
| H12 | 1995；603 代表机官方表记 04-03；604 代表机记 05-01 | PowerPC 603/603e 与 604/604e；消费、移动与工作站 | 603 与 604 是并行产品定位，不是前后替换的统一“代”；旧规格表日期应与同期发布稿交叉核验 | [5200/75 LC 官方规格][h12]；[9500/132 官方规格][h12b] |
| H13 | 1997-11；官方技术表的 Introduced 为 11-15，不据此推定发布会日 | PowerPC 750，G3；Power Macintosh G3、PowerBook G3、后续 iMac | 缓存与系统设计是研究重点；不能把 1998 iMac 发布写成 G3 芯片首发 | [Power Macintosh G3 官方规格][h13]；[PowerBook G3 官方规格][h13b] |
| H14 | 1999 G4 家族；后续双处理器 2000-07-19；移动 G4 2001-01-09 | PowerPC G4；7400 及后续衍生，桌面、笔记本、Xserve | 向量执行和多处理器是不同维度。双单核 CPU 不等于单颗双核；G4 旁支需按具体 CPU 型号核验 | [首代 G4 官方规格][h14]；[双处理器 G4 发布][h14b]；[Titanium PowerBook G4][h14c] |
| H15 | 2003-06-23 公布；2003-08 开始出货；2005-10-19 公布双核/Quad 机型 | IBM PowerPC 970/970FX/970MP，G5；桌面、Xserve | 64 位 CPU 与整机系统支持边界分开；G5 Quad 是两颗双核。Apple 当年的“最快”属于特定比较条件下的厂商主张 | [G5 发布][h15]；[G5 出货][h15b]；[G5 Quad 发布][h15c] |
| H16 | 2005-06-06 宣布迁移；2006-01-10 首批产品 | Intel Core Solo / Core Duo（Yonah）；Mac mini、iMac、MacBook/Pro | 32 位 Intel Mac 与后续 64 位 Core 2 应分开；Rosetta 承担 PowerPC 应用迁移，不能把处理器倍数直接套到翻译执行的软件 | [迁移公告][h16]；[首批 Intel iMac 发布][h16b] |
| H17 | 2006-08-07 工作站；2006 下半年 Core 2 普及，后续到 2020 | Intel Core 2 / Core i 与 Xeon；Mac 消费、专业、服务器产品线 | Mac Pro 首代 Xeon 5100；后续 Core i 的 Nehalem 至 Ice Lake 等代际详见 Intel 材料。Mac 整机更新与 Intel CPU 首发不是同一日期 | [首代 Intel Mac Pro][h17]；[Mac 官方技术规格总入口][spec] |
| H18 | 2002-05-14 Xserve 公布；2004 G5；2006 Xeon；2009-04-07 Nehalem | Xserve G4 → G5 → Xeon；Apple 机架服务器 | 与消费 Mac 使用相同 CPU 家族不代表主板、ECC、I/O 和运维设计相同；2009 Xserve 已有 Xeon 5500 和 DDR3 ECC | [Xserve 2002][h18]；[Xserve 2009][h18b] |
| H19 | 1993—1997 产品阶段；此处 1997-03 为系列时间，精确日待原通告 | ARM610 / ARM710a / StrongARM SA-110；Newton MessagePad、eMate | 与日后的 A 系列分开；MessagePad 2000 原 Apple 技术文记 SA-110 161.9 MHz。ARM610/710a 的逐款对应目前只有补查索引，未在本表升级为全量一手核验 | [AppleCare MessagePad 2000 原文镜像][h19]；[按处理器索引，补查用][newton] |
| H20 | 2007—2009 产品阶段；首代拆解发表于 2007-06-29，不能当作全系列芯片发布日 | Samsung/ARM 应用处理器；初代 iPhone、iPhone 3G、iPhone 3GS，A4 之前的移动阶段 | iFixit 亲自拆解首代与 3GS，观察 Samsung/Apple 标识封装；其设备资料将首代归为 Samsung ARM11。**3G 的封装对应与 3GS 的精确 SoC/CPU 核型号尚未由本轮原始拆解摘录全部确认，不把网络常见的 S5L8900/S5L8920/S5PC100 名称直接互换。** 这是采购/定制应用处理器阶段，不等于 A 系列 CPU 架构代际 | [首代 iPhone 原作者拆解][prea1]；[首代设备规格及拆解入口][prea2]；[3GS 原作者拆解][prea3] |

Apple Network Server、Pippin、早期 Apple TV、iPod/打印机/AirPort 等旁支单列在覆盖缺口中；本表未将它们误写成已经逐代核验完成。

## 二、自研 A 系列：手机、平板及跨设备复用

表中发布日期是首次公开搭载该命名芯片的产品公布日。没有单独 CPU 零售 MSRP；手机/平板价格不能填写为 CPU 价格。核心微架构代号若不是 Apple 官方公开内容，应另引原作者逆向分析，不从品牌名推导。

| 编号 | 公布；首批上市（未列者未逐项核实） | 芯片/代表平台 | 工程事实与局限 | 原始来源 |
|---|---|---|---|---|
| A01 | 2010-01-27；Wi-Fi iPad 实际 04-03，非原稿预告的“3 月下旬” | A4；iPad，随后 iPhone 4 / Apple TV | Apple 设计 SoC 的明确节点；与“首次自研 CPU 核”不是同一命题 | [iPad 公布][a01]；[实际上市日期通告][a01b] |
| A02 | 2011-03-02；03-11 | A5；iPad 2 | 双核 CPU；iPhone 4S、iPad mini、Apple TV 等后续复用不另算新架构 | [iPad 2][a02] |
| A03 | 2012-03-07；03-16 | A5X；第三代 iPad | 强化 GPU/显示能力；“四核图形”不能写成四核 CPU | [新 iPad 发布][a03] |
| A04 | 2012-09-12；09-21 | A6；iPhone 5 | Apple 官方称 Apple-designed A6；CPU 内核具体设计分析需另引拆解/微架构原文 | [iPhone 5][a04] |
| A05 | 2012-10-23；11-02 | A6X；第四代 iPad | iPad 的 X 分支；不能只用数字 6 将手机和平板配置视为相同 | [iPad mini 与第四代 iPad 发布][a05] |
| A06 | 2013-09-10；09-20 | A7；iPhone 5s，随后 iPad Air/mini | 转向 64 位应用处理；另有 M7 运动协处理器。64 位、IPC 改善和整机 RAM 容量是三个问题 | [iPhone 5s][a06]；[TechInsights 实物拆解][r03] |
| A07 | 2014-09-09；09-19 | A8；iPhone 6/6 Plus，后续 Apple TV HD/HomePod | 第二代 64 位；跨产品复用跨度很长，不应用设备发布年倒推 CPU 世代 | [iPhone 6][a07] |
| A08 | 2014-10-16；10 月上市，具体首销日在本轮未逐项核实 | A8X；iPad Air 2 | 平板分支；CPU/GPU 配置不能复制 A8 手机规格 | [iPad Air 2][a08] |
| A09 | 2015-09-09；09-25 | A9；iPhone 6s，后续 iPhone SE/iPad | SoC、工艺、代工厂与 CPU 微架构需要分别记录，不能只看外包装芯片名 | [iPhone 6s][a09] |
| A10 | 2015-09-09；2015-11 | A9X；初代 iPad Pro | 更大平板性能与内存系统；发布和实际上市相隔约两个月 | [iPad Pro 公布][a10]；[上市通告][a10b] |
| A11 | 2016-09-07；09-16 | A10 Fusion；iPhone 7 | 2 个性能核 + 2 个效率核；核数增加不能自动推出四核同时执行 | [iPhone 7][a11] |
| A12 | 2017-06-05；6 月 | A10X Fusion；10.5/12.9 英寸 iPad Pro，后续 Apple TV 4K | 六核 CPU、十二核 GPU；不能将 GPU 核数当 CPU 线程数 | [iPad Pro 2017][a12] |
| A13 | 2017-09-12；iPhone 8 09-22，iPhone X 11-03 | A11 Bionic | 2P+4E，Neural Engine；同芯片分两批整机上市 | [iPhone 8][a13]；[iPhone X][a13b] |
| A14 | 2018-09-12；XS 09-21，XR 10-26 | A12 Bionic | Apple 发布稿给出 7 nm、8 核 Neural Engine；手机复用与后续 Apple TV 复用分开记 | [iPhone XS][a14]；[iPhone XR][a14b] |
| A15 | 2018-10-30；11-07 | A12X Bionic；iPad Pro | 8 核 CPU、7 核 GPU；X 不是简单调高手机 A12 频率 | [iPad Pro 2018][a15] |
| A16 | 2019-09-10；09-20 | A13 Bionic；iPhone 11 | CPU 的 ML 加速路径与独立 Neural Engine 不能相加为通用 CPU 性能 | [iPhone 11][a16] |
| A17 | 2020-03-18；03-25 | A12Z Bionic；iPad Pro；同年 DTK | 8 核 GPU；DTK 是需归还的开发过渡设备，不是正式零售 A 系列 Mac 产品线 | [iPad Pro 2020][a17]；[DTK 说明][transition] |
| A18 | 2020-09-15；iPad Air 与 iPhone 12/12 Pro 均于 10-23 首批上市 | A14 Bionic；iPad Air 首次公布 | 5 nm、6 核 CPU、16 核 Neural Engine；“首次公布设备”与“首先送到用户手中的设备”是不同字段 | [iPad Air 公布][a18]；[实际上市说明][a18b] |
| A19 | 2021-09-14；09-24 | A15 Bionic；iPhone 13/Pro、iPad mini | 同名不同 GPU 核数/整机条件；2022 iPhone 14 与 Apple TV 再采用不算新 CPU 代际 | [iPhone 13][a19]；[iPad mini][a19b] |
| A20 | 2022-09-07；09-16 | A16 Bionic；iPhone 14 Pro，随后 iPhone 15 | 同年普通 iPhone 14 仍用 A15，手机产品号已不能一对一映射芯片世代 | [iPhone 14 Pro][a20]；[iPhone 15][a20b] |
| A21 | 2023-09-12；09-22 | A17 Pro；iPhone 15 Pro，随后 iPad mini | 3 nm、6 核 CPU、硬件光追 GPU、AV1 解码；光追提升不是 CPU 提升 | [iPhone 15 Pro][a21] |
| A22 | 2024-09-09；09-20 | A18 / A18 Pro；iPhone 16 / Pro | 两个正式芯片分支，分别核对 CPU/GPU/内存系统；2025 iPhone 16e 采用 A18 但 GPU 配置不同 | [iPhone 16][a22]；[iPhone 16 Pro][a22b]；[iPhone 16e][c1] |
| A23 | 2025-09-09；2025-09；具体机型首销日未逐项核实 | A19 / A19 Pro；iPhone 17 / Pro / Air | A19 Pro 引入每 GPU 核的 Neural Accelerator；这不是在 CPU 上增加同数量通用核 | [iPhone 17][a23]；[iPhone 17 Pro][a23b]；[iPhone Air][n1] |
| A24 | 2026-09-09；09-18 | A20 Pro；iPhone 18 Pro/Max | 官方确认 2 nm、6 核 CPU、7 核 GPU；封装与内存布置变化影响热路径。**本轮未证实独立 A20 非 Pro 产品，不按命名规律补写** | [iPhone 18 Pro][a24]；[实际上市][a24b] |
| A25 | 2026-03-04；03-11 | A18 Pro 跨入零售 Mac：MacBook Neo | 这是已有 A18 Pro 的新用途，不是 2026 首发新 CPU；不应写成所有 Apple silicon Mac 都使用 M 系列 | [MacBook Neo 原始发布稿][a25] |

## 三、M 系列：2020—2026

这些是含 CPU、GPU、媒体引擎等的 SoC；统一内存容量、互连带宽、GPU 核数不能混成一列“CPU 性能”。同名芯片有不同核心配置，下表使用最大规格时明确写“最多”。

| 编号 | 首次公布时间 | 芯片与平台 | 可引用工程事实 / 需要评价的边界 | 原始来源 |
|---|---|---|---|---|
| M01 | 2020-11-10；首批 Mac 11-17 | M1；MacBook Air/Pro、Mac mini，后续 iPad | 5 nm，8 核 CPU（4P+4E）；集成平台与 Rosetta 2 迁移共同构成体验；不同散热整机不能混跑分 | [M1][m01]；[首批上市][m01b] |
| M02 | 2021-10-18；MacBook Pro 10-26 | M1 Pro / M1 Max | 最多 10 核 CPU；200 / 400 GB/s 内存带宽。Max 扩大 GPU/内存系统，不等于通用 CPU 单核翻倍 | [芯片发布][m02] |
| M03 | 2022-03-08；Mac Studio 03-18 | M1 Ultra | 两颗 M1 Max 用 UltraFusion 连接，最多 20 核 CPU；内存池与互连设计并不保证所有应用线性扩展 | [M1 Ultra][m03] |
| M04 | 2022-06-06；不同 Mac 机型分批上市 | M2 | 8 核 CPU、最多 10 核 GPU、100 GB/s；CPU、GPU、媒体引擎的收益取决于负载 | [M2][m04] |
| M05 | 2023-01-17；Mac 01-24 | M2 Pro / M2 Max | 最多 12 核 CPU；Max 最多 38 核 GPU、96 GB 内存。更大容量和专业媒体处理能力不等于所有任务收益一致 | [M2 Pro/Max][m05] |
| M06 | 2023-06-05；Mac 06-13 | M2 Ultra | 最多 24 核 CPU、76 核 GPU、192 GB 统一内存；Mac Pro 也进入 Apple silicon，但 PCIe 扩展与外置 GPU 支持需单独核验 | [M2 Ultra][m06] |
| M07 | 2023-10-30；M3/Pro 首批 11-07，Max 分批 | M3 / M3 Pro / M3 Max | 3 nm，GPU Dynamic Caching 与硬件光追；三个档位 CPU 配比和内存带宽不同，不能假设 Pro 是等比例扩展 | [M3 家族][m07] |
| M08 | 2024-05-07；iPad Pro 05-15；Mac 到同年 10 月 | M4 | 首发于 iPad，最多 10 核 CPU；不能从 Mac 发布日倒推芯片首发 | [M4][m08] |
| M09 | **2024-10-29** M4 Pro 首先随 Mac mini 公布 | M4 Pro | 独立芯片综述是 10-30，但不应覆盖 10-29 已公布的 Pro；最多 14 核 CPU | [Mac mini 原始发布稿][m09]；[次日芯片综述][m10] |
| M10 | 2024-10-30；MacBook Pro 11-08 | M4 Max | 最多 16 核 CPU、40 核 GPU；家族不同档位的内存/外接显示支持应保留具体条件 | [M4 Pro/Max][m10] |
| M11 | 2025-03-05；Mac Studio 03-12 | M3 Ultra | 出现在 M4 之后；两颗 M3 Max，最多 32 核 CPU、80 核 GPU、512 GB；序号不等于全产品线同步换代 | [M3 Ultra][m11]；[Mac Studio][m11b] |
| M12 | 2025-10-15；首批设备 10-22 | M5；MacBook Pro、iPad Pro、Vision Pro | 最多 10 核 CPU、153 GB/s；GPU 新增 Neural Accelerator。GPU AI 数字不能写成 CPU 提速倍数 | [M5][m12]；[实际上市][m12b] |
| M13 | 2026-03-03；MacBook Pro 03-11 | M5 Pro / M5 Max | Fusion Architecture 组合双 die；最多 18 核 CPU，官方把核心命名为 super / performance，不能原封套用旧代 P/E 配比 | [芯片发布][m13]；[MacBook Pro 上市说明][m13b] |
| M14 | 2026-08-25；Mac Studio 09-22 | M5 Ultra | 官方为四 die，最多 36 核 CPU、80 核 GPU、1.2 TB/s 内存带宽；不能继续沿用“两颗单 die Max”的旧示意 | [M6/M5 Ultra 发布][m14]；[实际上市][m14b] |
| M15 | 2026-08-25；Mac mini 09-22；10-27 再公布搭载 M6 的 iMac/MBP | M6 | 官方确认 2 nm、12 核 CPU、170 GB/s；**M6 首发不是 10-27**。10-27 机型预定 11-06 上市，截至读取日仍属已公布待上市的整机 | [芯片首发][m14]；[Mac mini][m15]；[10 月 MacBook Pro][m15b] |

本轮没有获得可引用的 M4 Ultra、M6 Pro、M6 Max、M6 Ultra 正式发布证据，不因产品名规律补齐。

## 四、S 系列 SiP 与穿戴产品

S 是 SiP 系列编号，不能据编号变化直接断言 CPU 微架构换代。Apple Watch 整机 Series 编号与 S 芯片编号也不是始终相同。

| 编号 | 公布时间；上市时间 | 芯片/采用设备 | 工程事实与证据边界 | 原始来源 |
|---|---|---|---|---|
| S01 | 2014-09-09 公布；2015-04 上市 | S1，初代 Apple Watch | 厂商命名为 System in Package；公布年与首销年跨年 | [Apple Watch 公布][s01] |
| S02 | 2016-09-07；09-16 | S1P / S2，Watch Series 1 / 2 | Series 1 双核与 S2 双核同日；原发布稿明确 S2、Series1 双核，但未给出 S1P 名称，S1P 留作按封装/规格补查标记 | [Series 2 与 Series 1][s02] |
| S03 | 2017-09-12 美国事件；地区稿有 09-13 | S3，Series 3 | 双核与蜂窝型号、W2 无线芯片分工；不同地区发布日期不可直接混排 | [Series 3 原稿][s03] |
| S04 | 2018-09-12；09-21 | S4，Series 4 | 64 位双核；CPU 迁移与 ECG 等传感器功能不是同一硬件变化 | [Series 4][s04] |
| S05 | 2019-09-10；09-20 | S5，Series 5；后续 HomePod mini | 代表整机加入常亮屏和指南针；**这些不能证明 CPU 新核或 IPC 提升** | [Series 5 原稿][s05]；[HomePod mini][home2] |
| S06 | 2020-09-15；09-18 | S6，Series 6 | 官方明确双核处理器基于 iPhone 11 的 A13；是设计复用线索，不能把两颗 SoC 配置视为相同 | [Series 6][s06] |
| S07 | 2021-09-14；10 月上市 | S7，Series 7；后续 HomePod 2 | Series7 发布变化重心是显示与结构；SiP 编号升级不自动等于 CPU 世代换代 | [Series 7][s07]；[HomePod 2][home3] |
| S08 | 2022-09-07；Series8/SE 09-16，Ultra 另批 | S8，Series 8 / SE 2 / Ultra | 同一 SiP 跨三个价位与机身；不能从 Ultra 整机名推导更快 CPU | [Series8/SE][s08] |
| S09 | 2023-09-12；09-22 | S9，Series 9 / Ultra 2 | 4 核 Neural Engine 与本地 Siri；Neural Engine 核数与通用 CPU 核数分开 | [Series 9][s09] |
| S10 | 2024-09-09；09-20；2025 Series11 再采用 | S10，Series 10 / Series 11 等 | 4 核 Neural Engine；Series11 没有改用所谓 S11。整机编号不能当芯片编号 | [Series10][s10]；[Series11 官方规格][s10b] |
| S11 | 2026-09-09；09-18 | S11，Series 12 / Ultra 4 | 官方确认 S11 与新的隔离处理能力；本材料未追加未证实的 S12 | [Series12][s11] |

## 五、复用平台、服务器与专用芯片旁支

这一节是范围补充，**专用控制/无线/感知芯片不并入通用 CPU 排名**。同样不能将运动协处理器 M7 与 2020 年起的 Mac M 系列混为一谈。

| 类别与节点 | 时间口径 | 定位与写作边界 | 原始来源 |
|---|---|---|---|
| Apple TV 的 A 系列复用 | A15 型：2022-10-18 公布、11-04 上市；A19 型：2026-10-13 公布、11-13 计划上市 | A4/A5/A8/A10X/A12/A15/A19 构成需逐产品追踪的采用序列；本轮对 A15、A19 有直接原稿，早期各代完整首发证据仍需补。A19 新机截至读取日尚未上市 | [A15 Apple TV][tv1]；[A19 Apple TV][tv2] |
| HomePod | 2017-06 公布 A8 初代；2020-10-13 S5 mini；2023-01-18 S7 第二代 | 同一品牌跨 A/S 两个系列；音频 DSP、整机声学和 CPU 性能不能混写 | [初代][home1]；[mini][home2]；[第二代][home3] |
| HomePod mini 2 | 2026-10-13 公布；10-30 计划上市 | S10 复用；截至读取日是已发布待上市，不是 S 系列新 CPU 代际 | [官方发布][home4] |
| HomeView | 2026-10-13 公布；11 月计划上市 | A18 家庭显示/控制终端；不是 A18 首次发布。芯片有安全隔离能力，不应据产品宣传推导原有 A18 所有设备均等同支持 | [HomeView 发布][home5]；[官方产品规格][home5b] |
| Vision Pro | 2023-06-05 公布；2024-02 首销；2025-10 M5 更新 | M2/M5 承担通用应用，R1 处理摄像头、传感器、麦克风；R1 的低延迟不能当作 CPU 算力指标 | [初代 Vision Pro][r1]；[M5 更新][vision5] |
| Private Cloud Compute | 2024-06-10 官方架构披露；2026-06-08 扩展架构 | Apple silicon 已进入 Apple 自建云计算节点；官方初稿未在本文可核内容中指定精确 M 型号，因此不写死“所有 PCC 都用 M2 Ultra”。2026 扩展到合作方基础设施，不表示所有节点都是 Mac | [SEAR 原始架构说明][pcc]；[2026 扩展说明][pcc2] |
| T1 / T2 | 2016 / 2017 产品阶段；具体发布稿未逐项补齐 | Intel Mac 的安全、Touch ID、控制与媒体等专用子系统；Apple silicon 将相关能力集成，并非与 Intel 主 CPU 竞争的桌面 CPU 系列 | [Apple Platform Security 原文][security] |
| 运动 M7 与后续 M 协处理器 | 2013 A7 同期起 | TechInsights 对 iPhone5s 实物识别 M7 为 NXP LPC18A1、Cortex-M3 类；不能写成 Apple M1 的第七代或 Apple 自研通用 CPU | [原始拆解、封装/裸片观察][r03] |
| H1 / H2 | H1：2019-03-20；H2：2022-09-07 | 耳机音频、低功耗和连接；本轮有两代原稿，其他 H 命名未全量核查；不因 2026 新 AirPods 直接推断 H3 | [H1 AirPods][h1]；[H2 AirPods Pro][h2] |
| U1 / 第二代 UWB；W1/W2/W3 | U1：2019 iPhone11；其余逐代证据未齐 | UWB 空间感知和无线连接分支；不是手机应用处理器。当前只将 U1 原稿与 W 系列目录线索纳入，不称已完成每代历史 | [U1 原始发布][a16]；[Series3 的 W2 说明][s03] |
| C1 / C1X / C2 与 N1 | C1：2025-02-19；C1X/N1：2025-09；C2：2026-09 | C 为蜂窝基带系统，N1 为 Wi-Fi/蓝牙/Thread；与 A19/A20 CPU 并存，不合成 CPU“代际” | [C1][c1]；[C1X/N1][n1]；[C2][a24] |

## 六、当时评价与第一手实测：可引用锚点

| 节点 | 一手观察或测试 | 能支持的判断 | 限制与后续取证 |
|---|---|---|---|
| A7 / 2013 | TechInsights 实物与显微分析识别 A7、1 GB LPDDR3，并验证 Samsung 28 nm；AnandTech 2013-09-17 的 iPhone5s 测试索引保留 JavaScript 测试结果 | 可把“64 位转向”落到实际芯片、封装、工艺与软件测试；不要声称性能变化全部由 64 位字宽造成 | [拆解原文][r03]可读；[AnandTech 原评测第6页][r01]的搜索索引可检索，原站打开已重定向，正式引数值前应固定档案快照及完整表头 |
| M1 / 2020 | Andrei Frumusanu 的《The 2020 Mac Mini Unleashed: Putting Apple Silicon M1 To The Test》是 SPEC 与功耗分析的重要同期原测试 | 可用于比较移动来源大核迁移到桌面之后的性能和能效 | [原始 URL][r02]本次重定向论坛，**不把失效链接视为已读全文证据**；需要互联网档案快照。现阶段不抄零散二手跑分 |
| M1 Pro/Max / 2021 | AnandTech 原测试索引保留单线程 Cinebench R23/SPEC 下“封装报告功耗”与“插座增量功耗”差异 | 同一芯片可同时出现不同功耗数字；要先统一计量边界，再谈每瓦性能 | [原测试功耗页][r04]打开已转到其他媒体主题页；搜索索引仍保留 11 W 报告功耗、约 8.5–8.7 W 插座增量的原文线索，正文引用须补快照 |
| M1 Ultra 扩展 / 2022 | Andrew Cunningham，Ars，2022-03-17，原作者对 Mac Studio Max/Ultra 自测 | Max 到 Ultra 的 GPU 扩展随测试而变；该文所测并未达到两倍，资源翻倍不保证吞吐线性增长 | [原评测][r05]；明确是其选定 GPU 测试与 Mac Studio 配置，不改写为所有 CPU/GPU 工作负载结论 |
| M1 Ultra 能效 / 2022 | 同一 Ars 测试：Handbrake 相近完成速度下，Core i9-12900 整机约 300 W，Ultra 整机约 80 多 W（插座计量） | 可支持**该两台测试整机、该编码任务**的能效对比 | 不是两颗裸 CPU 的 TDP/封装功耗；不可把这些数字用于全部 Intel/Apple 产品。与上一行合计只做简短摘要，详看原图和配置 |
| M3 Ultra / 2025 | Apple 原稿给最多 512 GB、双 M3 Max、32 核 CPU；测试脚注列对照 Mac Studio 配置 | 可研究本地大内存工作集的容量边界与跨 die 扩展 | 属厂商规格/测试，不是独立结论；“能容纳模型”不等于给定 token/s 或延迟达标 [原稿与脚注][m11] |
| M6 / M5 Ultra / A20 Pro / 2026 | 官方新闻稿已确认产品与规格；本轮未补齐所有同期独立基准 | 可引用发布、上市状态、核心配置、封装与内存带宽；可以建立待验证假设 | 不将厂商最高倍数、GPU AI 算力或 Neural Engine TOPS 写成 CPU 全面领先的实测结论 [M6/Ultra][m14]、[A20Pro][a24] |

AnandTech 失效链接处理：保留原始标题、作者、发布日期、原 URL；找到快照后新增快照时间和存档 URL。不要把跳转后的新文章当作旧文章正文，也不要用搜索摘要补全缺失的测试条件。

## 七、常见误写与覆盖缺口

1. **“Apple CPU 历史始于 PowerPC 或 M1”不完整。** 采购/采用史可以追到 1976 Apple-1；Apple 自研 SoC 史以 A4 为清晰节点；自研 CPU 核的里程碑还需具体微架构证据，三种历史不能混成一个起点。
2. **A4 / A14 / M4 的首发设备常被写错。** 三者分别先随 iPad、iPad Air、iPad Pro 公布；首个量产交付设备还需要另列日期，尤其 A14。
3. **M3 Ultra 晚于 M4，M5 Ultra 与 M6 并行。** 产品档位不同步，不能从最大数字推导工作站最强型号或完整产品栈。
4. **S10 在 Watch Series11、HomePod mini2 继续使用。** 芯片编号、整机编号与 CPU 内核代际分别建字段。
5. **价格口径。** Mac/iPhone/Watch/HomePod 的起售价是整机价；Apple 没有给 A/M/S 芯片通用零售 CPU MSRP，不能横排对比 Intel/AMD 盒装 CPU 建议价。
6. **性能资料缺口。** 旧 6502/68k/PowerPC 没有统一现代跑分；同期 BYTE、Macworld、Apple 技术文档的任务级测试应单独建表，不能拿现代 Geekbench 缺项推算成绩。A/M 每一代独立评测尚未全覆盖。
7. **历史旁支缺口。** Apple Network Server（PowerPC604）、Pippin（PowerPC603）、Newton 的 ARM610/710a 全型号、eMate、iPod 的 PortalPlayer/Samsung/后续 Apple 芯片、A4 前 iPhone 3G/3GS 的逐封装与 CPU 核对应、初代 Intel Apple TV、打印机/AirPort/显示设备控制器均尚未形成每代一手证据闭环。本轮明确保留目录，不承诺已穷尽。
8. **命名与技术披露缺口。** W 全代、U 第二代、H 其他命名、部分 S 芯片实际 CPU die 是否复用，需要技术规格、芯片 ID、拆解或软件设备树等原始证据；不能只引用新品新闻标题。
9. **2026 截止状态。** M6/M5 Ultra/A20 Pro 都有正式官方原稿；10 月公布的 Apple TV/HomeView、HomePod mini2、M6 iMac/MBP 包含读取日之后的预计上市日，已公布与已上市必须分列。没有正式证据的型号不补成事实。

## 八、继续扩展时使用的原始资料入口

- [Apple 技术规格检索][spec]：按具体机型追 CPU、介绍时间、端口、支持系统；旧表的厂商字段未必完整。
- [Apple Newsroom Archive][archive]：按产品/年月检索原发布、修订、出货稿；地区站时间有时相差一天。
- [Apple Platform Security][security]、[Metal Feature Set Tables][metal]：追踪 SoC 安全能力与 GPU API 支持，不能将 GPU family 编号当 CPU 家族编号。
- [Private Cloud Compute 原始安全文档][pccdocs]：研究服务器角色、信任链与运行时；节点具体 SKU 只在官方披露时记入。
- [CHM Apple 原始宣传资料][chm]：旧手册、产品册。文献原作者为 Apple，但扫描托管者为博物馆，应保留文献题名/年份。
- [EveryMac 按处理器索引][everymac]、[Newton CPU 索引][newton]：作为查漏入口；它们是第三方数据库，不替代原厂发布证明。

## 来源地址登记

[prea1]: https://www.ifixit.com/Teardown/iPhone%2B1st%2BGeneration%2BTeardown/599
[prea2]: https://www.ifixit.com/Device/iPhone_1st_Generation
[prea3]: https://www.ifixit.com/Teardown/iPhone%2B3GS%2BTeardown/817
[h01]: https://archive.computerhistory.org/resources/text/Apple/Apple.AppleI.1976.102646518.pdf
[h02]: https://apple2history.org/dl/Apple_II_Redbook.pdf
[h03]: https://www.apple3.org/Documents/Manuals/a3sosrm.pdf
[h03b]: https://fsck.technology/documentation/Apple/Apple%20Spec%20PDFs/Applespec03/Systems/Apple%20II/Apple%20III.pdf
[h04]: https://manuals.plus/m/2d280ce2e9f9e91d27b3a5ded59a2ab8ec4b28f338f1d32e32bda41fcb1a590a.pdf
[h05]: https://downloads.reactivemicro.com/Apple%20II%20Items/Documentation/Manuals/IIgs/IIgs%20Hardware%20Reference.pdf
[h05b]: https://archive.computerhistory.org/resources/access/text/2019/04/102779994-05-09-acc.pdf
[h06]: https://support.apple.com/en-lb/112184
[h07]: https://support.apple.com/en-la/112190
[h08]: https://support.apple.com/en-euro/112188
[h09]: https://support.apple.com/en-afri/112189
[h10]: https://support.apple.com/en-il/112219
[h11]: https://support.apple.com/en-sa/112101
[h12]: https://support.apple.com/en-ge/112109
[h12b]: https://support.apple.com/en-us/112053
[h13]: https://support.apple.com/en-am/112279
[h13b]: https://support.apple.com/en-ca/112176
[h14]: https://support.apple.com/en-ph/112296
[h14b]: https://www.apple.com/newsroom/2000/07/19Apple-Debuts-New-Power-Mac-G4s-with-Dual-Processors/
[h14c]: https://www.apple.com/newsroom/2001/01/09Apple-Unveils-One-Inch-Thick-Titanium-PowerBook-G4/
[h15]: https://www.apple.com/ca/newsroom/2003/06/23Apple-Unleashes-the-Worlds-Fastest-Personal-Computer-the-Power-Mac-G5/
[h15b]: https://www.apple.com/uk/newsroom/archive/?page=178
[h15c]: https://www.apple.com/newsroom/2005/10/19Apple-Introduces-Power-Mac-G5-Quad-Power-Mac-G5-Dual/
[h16]: https://www.apple.com/newsroom/2005/06/06Apple-to-Use-Intel-Microprocessors-Beginning-in-2006/
[h16b]: https://www.apple.com/newsroom/2006/01/10Apple-Unveils-New-iMac-with-Intel-Core-Duo-Processor/
[h17]: https://www.apple.com/newsroom/2006/08/07Apple-Unveils-New-Mac-Pro-Featuring-Quad-64-bit-Xeon-Processors/
[h18]: https://www.apple.com/ie/newsroom/2002/05/14Apple-Introduces-Xserve-1U-Rack-Mount-Server/
[h18b]: https://www.apple.com/newsroom/2009/04/07Apple-Updates-Xserve-with-Twice-the-Performance/
[h19]: https://savagetaylor.com/til/KB020991.html
[a01]: https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/
[a01b]: https://www.apple.com/newsroom/2010/03/05iPad-Available-in-US-on-April-3/
[a02]: https://www.apple.com/se/newsroom/2011/03/02Apple-Launches-iPad-2/
[a03]: https://www.apple.com/newsroom/2012/03/07Apple-Launches-New-iPad/
[a04]: https://www.apple.com/hk/en/newsroom/2012/09/12Apple-Introduces-iPhone-5/
[a05]: https://www.apple.com/es/newsroom/2012/10/23Apple-Introduces-iPad-mini/
[a06]: https://www.apple.com/it/newsroom/2013/09/10Apple-Announces-iPhone-5s-The-Most-Forward-Thinking-Smartphone-in-the-World/
[a07]: https://www.apple.com/jp/newsroom/2014/09/09Apple-Announces-iPhone-6-iPhone-6-Plus-The-Biggest-Advancements-in-iPhone-History/
[a08]: https://www.apple.com/newsroom/2014/10/16Apple-Introduces-iPad-Air-2-The-Thinnest-Most-Powerful-iPad-Ever/
[a09]: https://www.apple.com/newsroom/2015/09/09Apple-Introduces-iPhone-6s-iPhone-6s-Plus/
[a10]: https://www.apple.com/ne/newsroom/2015/09/09Apple-Introduces-iPad-Pro-Featuring-Epic-12-9-inch-Retina-Display/
[a10b]: https://www.apple.com/newsroom/2015/11/09Epic-12-9-inch-iPad-Pro-Available-to-Order-Online-Wednesday-Arrives-in-Stores-Later-This-Week/
[a11]: https://www.apple.com/newsroom/2016/09/apple-introduces-iphone-7-iphone-7-plus/
[a12]: https://www.apple.com/newsroom/2017/06/ipad-pro-10-5-and-12-9-inch-models-introduces-worlds-most-advanced-display-breakthrough-performance/
[a13]: https://www.apple.com/newsroom/2017/09/iphone-8-and-iphone-8-plus-a-new-generation-of-iphone/
[a13b]: https://www.apple.com/newsroom/2017/09/the-future-is-here-iphone-x/
[a14]: https://www.apple.com/newsroom/2018/09/iphone-xs-and-iphone-xs-max-bring-the-best-and-biggest-displays-to-iphone/
[a14b]: https://www.apple.com/newsroom/2018/09/apple-introduces-iphone-xr/
[a15]: https://www.apple.com/newsroom/2018/10/new-ipad-pro-with-all-screen-design-is-most-advanced-powerful-ipad-ever/
[a16]: https://www.apple.com/newsroom/2019/09/apple-introduces-dual-camera-iphone-11/
[a17]: https://www.apple.com/newsroom/2020/03/apple-unveils-new-ipad-pro-with-lidar-scanner-and-trackpad-support-in-ipados/
[a18]: https://www.apple.com/newsroom/2020/09/apple-unveils-all-new-ipad-air-with-a14-bionic-apples-most-advanced-chip/
[a18b]: https://www.apple.com/newsroom/2020/10/all-new-ipad-air-with-advanced-a14-bionic-chip-available-to-order-starting-today/
[a19]: https://www.apple.com/newsroom/2021/09/apple-introduces-iphone-13-and-iphone-13-mini/
[a19b]: https://www.apple.com/uk/newsroom/2021/09/apple-unveils-new-ipad-mini-with-breakthrough-performance-in-stunning-new-design/
[a20]: https://www.apple.com/ie/newsroom/2022/09/apple-debuts-iphone-14-pro-and-iphone-14-pro-max/
[a20b]: https://www.apple.com/newsroom/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/
[a21]: https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/
[a22]: https://www.apple.com/newsroom/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/
[a22b]: https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/
[a23]: https://www.apple.com/ml/newsroom/2025/09/apple-introduces-iphone-17/
[a23b]: https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/
[a24]: https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/
[a24b]: https://www.apple.com/newsroom/2026/09/the-latest-iphone-apple-watch-and-airpods-lineups-arrive-in-stores-worldwide/
[a25]: https://www.apple.com/newsroom/2026/03/say-hello-to-macbook-neo/
[m01]: https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/
[m01b]: https://www.apple.com/newsroom/2020/11/introducing-the-next-generation-of-mac/
[m02]: https://www.apple.com/newsroom/2021/10/introducing-m1-pro-and-m1-max-the-most-powerful-chips-apple-has-ever-built/
[m03]: https://www.apple.com/newsroom/2022/03/apple-unveils-m1-ultra-the-worlds-most-powerful-chip-for-a-personal-computer/
[m04]: https://www.apple.com/newsroom/2022/06/apple-unveils-m2-with-breakthrough-performance-and-capabilities/
[m05]: https://www.apple.com/newsroom/2023/01/apple-unveils-m2-pro-and-m2-max-next-generation-chips-for-next-level-workflows/
[m06]: https://www.apple.com/newsroom/2023/06/apple-introduces-m2-ultra/
[m07]: https://www.apple.com/newsroom/2023/10/apple-unveils-m3-m3-pro-and-m3-max-the-most-advanced-chips-for-a-personal-computer/
[m08]: https://www.apple.com/newsroom/2024/05/apple-introduces-m4-chip/
[m09]: https://www.apple.com/uk/newsroom/2024/10/apples-new-mac-mini-is-more-mighty-more-mini-and-built-for-apple-intelligence/
[m10]: https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/
[m11]: https://www.apple.com/newsroom/2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme/
[m11b]: https://www.apple.com/newsroom/2025/03/apple-unveils-new-mac-studio-the-most-powerful-mac-ever/
[m12]: https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/
[m12b]: https://www.apple.com/ie/newsroom/2025/10/new-ipad-pro-14-inch-macbook-pro-now-available/
[m13]: https://www.apple.com/newsroom/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/
[m13b]: https://www.apple.com/newsroom/2026/03/apple-introduces-macbook-pro-with-all-new-m5-pro-and-m5-max/
[m14]: https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/
[m14b]: https://www.apple.com/newsroom/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/
[m15]: https://www.apple.com/newsroom/2026/08/apple-unveils-a-more-powerful-mac-mini-featuring-the-all-new-m6-and-m5-pro/
[m15b]: https://www.apple.com/newsroom/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/
[s01]: https://www.apple.com/newsroom/2014/09/09Apple-Unveils-Apple-Watch-Apples-Most-Personal-Device-Ever/
[s02]: https://www.apple.com/newsroom/2016/09/apple-introduces-apple-watch-series-2/
[s03]: https://www.apple.com/br/newsroom/2017/09/apple-watch-series-3-features-built-in-cellular-and-more/
[s04]: https://www.apple.com/newsroom/2018/09/redesigned-apple-watch-series-4-revolutionizes-communication-fitness-and-health/
[s05]: https://www.apple.com/newsroom/2019/09/apple-unveils-apple-watch-series-5/
[s06]: https://www.apple.com/newsroom/2020/09/apple-watch-series-6-delivers-breakthrough-wellness-and-fitness-capabilities/
[s07]: https://www.apple.com/newsroom/2021/09/apple-reveals-apple-watch-series-7-featuring-the-largest-most-advanced-display/
[s08]: https://www.apple.com/newsroom/2022/09/apple-reveals-apple-watch-series-8-and-the-new-apple-watch-se/
[s09]: https://www.apple.com/newsroom/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/
[s10]: https://www.apple.com/newsroom/2024/09/introducing-apple-watch-series-10/
[s10b]: https://support.apple.com/en-mide/125093
[s11]: https://www.apple.com/newsroom/2026/09/introducing-apple-watch-series-12-with-the-all-new-health-sensing-system/
[tv1]: https://www.apple.com/newsroom/2022/10/apple-introduces-the-powerful-next-generation-apple-tv-4k/
[tv2]: https://www.apple.com/newsroom/2026/10/apple-unveils-the-new-apple-tv-4k/
[home1]: https://www.apple.com/newsroom/2017/06/homepod-reinvents-music-in-the-home/
[home2]: https://www.apple.com/newsroom/2020/10/apple-introduces-homepod-mini-a-powerful-smart-speaker-with-amazing-sound/
[home3]: https://www.apple.com/newsroom/2023/01/apple-introduces-the-new-homepod-with-breakthrough-sound-and-intelligence/
[home4]: https://www.apple.com/newsroom/2026/10/apple-announces-the-next-generation-of-homepod-mini/
[home5]: https://www.apple.com/ie/newsroom/2026/10/meet-apple-homeview-a-new-way-to-enjoy-entertainment-and-manage-the-home/
[home5b]: https://www.apple.com/in/apple-homeview/specs/
[r1]: https://www.apple.com/newsroom/2023/06/introducing-apple-vision-pro/
[vision5]: https://www.apple.com/newsroom/2025/10/apple-vision-pro-upgraded-with-the-m5-chip-and-dual-knit-band/
[pcc]: https://security.apple.com/blog/private-cloud-compute/
[pcc2]: https://security.apple.com/blog/expanding-pcc/
[pccdocs]: https://security.apple.com/documentation/private-cloud-compute/
[h1]: https://www.apple.com/ca/newsroom/2019/03/airpods-the-worlds-most-popular-wireless-headphones-are-getting-even-better/
[h2]: https://www.apple.com/newsroom/2022/09/apple-announces-the-next-generation-of-airpods-pro/
[c1]: https://www.apple.com/newsroom/2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/
[n1]: https://www.apple.com/newsroom/2025/09/introducing-iphone-air-a-powerful-new-iphone-with-a-breakthrough-design/
[r01]: https://www.anandtech.com/show/7335/the-iphone-5s-review/6
[r02]: https://www.anandtech.com/show/16252/mac-mini-apple-m1-tested
[r03]: https://www.techinsights.com/blog/apple-iphone-5s-teardown
[r04]: https://www.anandtech.com/show/17024/apple-m1-max-performance-review/3
[r05]: https://arstechnica.com/gadgets/2022/03/mac-studio-review-a-nearly-perfect-workhorse-mac/
[security]: https://help.apple.com/pdf/security/en_US/apple-platform-security-guide.pdf
[metal]: https://developer.apple.com/metal/capabilities/
[spec]: https://support.apple.com/specs
[archive]: https://www.apple.com/newsroom/archive/
[chm]: https://www.computerhistory.org/brochures/doc-43729572afbd3/
[everymac]: https://everymac.com/systems/by_processor/
[newton]: https://everymac.com/systems/by_processor/strongarm.html
[transition]: https://www.apple.com/newsroom/2020/06/apple-announces-mac-transition-to-apple-silicon/

*作者：[AI-Authored Tech Chronicles]*
*系列：《CPU 编年史》Apple 研究材料*
*分析基于：Apple 官方发布稿、技术规格、平台安全与开发文档 + Apple 原版手册档案 + TechInsights 原始拆解 + Ars Technica 原始测试；AnandTech 失效链接及索引另标为待快照复核，资料读取于 2026-10-28*
