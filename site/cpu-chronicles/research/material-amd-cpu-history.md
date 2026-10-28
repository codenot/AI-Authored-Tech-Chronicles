# AMD CPU 历史材料：家族、代际、发布时间与评价证据

资料读取日：2026-10-28。用途：供后续选题和文章事实核查；本文件是研究笔记，不是正式文章。

范围按用户确认覆盖桌面、移动、服务器、工作站与嵌入式的**家族和主要代际**。APU/SoC 按其 CPU 部分收录；位片、微控制器、协处理器、收购取得的产品和定制游戏机芯片另标类型。本表不穷尽频率档、步进、封装、OEM 专供与区域 SKU，也不把品牌编号直接等同于 CPU 微架构。

## 日期与证据口径

- `发布`是公告日期；`上市/可用`是原文明确的供货节点；`预计`保留当时的计划性质。资料只有年或季度时，不补成具体日。
- `至迟`表示已在当年 AMD 原始手册中出现，**不是首发日期**。1970–1980 年代若未找到首发公报，保留缺口。
- 表内“工程观察”是从规格推导的写作线索；“领先、最快”若只出现在厂商稿中，不作为独立评价。
- 原始手册由 Bitsavers/Ardent Tool 等保存，著作主体仍是 AMD；目录能证明存在档案，目录上传时间不等于产品日期。部分大 PDF 超过浏览工具读取限制，表中明确按档案目录/已索引文本核对，不假称通读。

## 早期 CPU、兼容产品和独立架构

| 时间及性质 | 家族 / 分支 | 市场与工程事实 | 来源 / 状态 |
| --- | --- | --- | --- |
| 1970 年代；至迟 1977 年有手册 | Am9080 / 8080A / 9080A | 8 位 CPU；应将产品出现、授权协议与量产节点分开核实，不能将 Intel 8080 首发年直接挪给 AMD | [AMD 1977 手册][a01]；首发日待补，PDF 本次超读取大小 |
| 1975（博物馆实物年代）；1978 手册 | Am2900 / Am2901 | 位片处理器组件，组合成数据通路和控制器；一枚 2901 不是一颗完整的现代通用 CPU | [CHM 实物][a02]、[AMD 1978 家族手册][a03] |
| 至迟 1979–1980 | AmZ8000：AmZ8001 / AmZ8002 | Z8000 兼容 16 位 CPU 旁支；1979 指令集、接口资料和 1980 数据手册可追溯 | [AMD Z8000 原始文档目录][a04] |
| 至迟 1983 | 8086 / 8088 / 8085A | AMD 1983 MOS 手册列出 16 位与 8 位 CPU；这是第二来源时期，需与 Intel 同名型号的推出时间区分 | [AMD 1983 数据手册][a05] |
| 至迟 1983；1988 有专册 | 8051 / 8031 / 80C51 | 带 CPU 内核的单片微控制器；归嵌入式谱系，不与桌面 CPU 排名混列 | [1983 手册][a05]、[1988 8051 专册档案][a06] |
| 1980 年代；至迟 1992 手册 | Am286 / CMOS 286 | x86 16 位兼容 CPU；保留 286 原始手册，不以 Intel 1982 发布日代替 AMD 首发 | [AMD PC 微处理器手册][a07]、[286 文档][a08] |
| 1980–1990 年代手册记录 | Am186 / Am188（EM、ES、ED、ER、CC、CH、CU 等） | 80186/188 兼容嵌入式微控制器；集成外设，不应一律称为普通 PC 186 CPU | [AMD Élan SC520 手册附录的产品谱系][a09]、[186 手册目录][a10] |
| 至迟 1988；1990 家族手册 | Am29000 / 29005 / 29030 / 29035 / 29040 / 29050 | 32 位 RISC 嵌入式家族；与 Am2900 位片家族不同。1995 年报列出打印、图形和通信控制用途 | [AMD 29K 原始手册目录][a11]、[1994 年报][a12] |
| 1985–1988 手册记录 | Am29300 / Am29C300；Am29500 | 微程序化数据通路及阵列/DSP 组件旁支；不等同于 29K RISC CPU | [AMD 位片手册目录][a13] |
| 1991 引入 | Am386 DX / SX | x86 32 位兼容产品；1993 年报明确回顾 1991 引入，可用于抵消把 Intel 386 日期当 AMD 日期的错误 | [AMD 1993 年报][a14] |
| 1993 Q2 开始 DX 出货；1994 SX 批量出货 | Am486 DX / SX；后续 DX2 / DX4 | 1993 年报区分 DX、SX 的出货批次；不同型号不是同一天发布 | [AMD 1993 10-K][a15]、[486 文档库][a16] |
| 1990 年代中期；具体首发日待补 | Am5x86 / Amx86 嵌入式衍生 | 延续 486 平台的升级/嵌入式分支；不与 AMD-K5 当作同一架构 | [AMD 486/5x86 原始资料][a16]、[SC520 产品附录][a09] |
| 1990 年代；SC520 手册记录 | Élan SC300 / 310 / 400 / 410 / 520 | PC/AT 兼容嵌入式控制器；SC520 为 32 位集成器件。各子系列首发时间尚待原公告补齐 | [AMD 原始数据手册][a09] |
| 1996 Q1 首批 PR75；Q3 PR100 | K5 / SSA5 / 5k86 | AMD 自有 x86 设计的重要节点；1995 路线图与实际 1996 出货不能混淆；1996 年报也承认进入第五代市场较晚 | [AMD 1996 年报 10-K][a17] |
| 1997-04-02 宣布已出货 | K6 | MMX、Socket 7；原稿称已经出货，不仅是架构预告 | [AMD 原始发布稿镜像][a18] |
| 1998-05 引入 | K6-2 | 3DNow!、Socket 7 平台延续；SIMD 功能收益取决于软件支持 | [AMD 1998 年报][a19] |
| 1999；具体首发日待补 | K6-III；后续 K6-2+ / K6-III+、Mobile、Embedded E | 片上 L2 与移动/嵌入式派生应分开；本次以原始技术文档作为谱系入口，不据目录时间断言上市日 | [AMD K6 原始手册目录][a20] |
| 1999-06 初始出货；下半年批量 | K7 / Athlon（Argon、后续 Thunderbird 等） | 高性能 x86 独立平台；采用 EV6 总线，后续缓存布局/封装变化应逐型号看 | [AMD 1999 10-K][a21] |
| 2000 下半年出货（年报口径） | Duron | Athlon 衍生的入门桌面 CPU；品牌分档不等同于新的 ISA | [AMD 2000 10-K][a22] |
| 至迟 2002 年已有在售记录 | Athlon MP；Mobile Athlon 4 / XP / Duron | MP 面向服务器/工作站；移动产品为独立功耗与平台分支，首发日未在本轮逐项确证 | [AMD 2002 10-K][a23] |
| 2001-10 引入 | Athlon XP（Palomino、后续 Thoroughbred / Barton） | QuantiSpeed 和型号评级；例如“1800+”不是 1.8 GHz。年报解释性能同时取决于架构与频率 | [AMD 2002 10-K][a23] |
| 2003-04 引入 | K8 / Opteron | AMD64、集成内存控制器、HyperTransport；服务器先于 Athlon 64 上市；支持 32 位软件过渡 | [AMD 2003 10-K][a24] |
| 2003-09 引入 | Athlon 64 / Athlon 64 FX；后续 Mobile Athlon 64 | AMD64 扩展到客户端；原生 64 位软件与 32 位兼容运行需分别衡量 | [AMD 2003 10-K][a24] |
| 2003-08 收购；后续 AMD 产品线 | Geode GX / LX / NX | 收购 National Semiconductor 的 x86 嵌入式产品；不能把收购年写成所有 Geode 架构的诞生年 | [AMD 2003 10-K][a24]、[AMD Geode 原始文档][a25] |
| 至迟 2004 年报已有；具体首发日待补 | Sempron | 入门桌面/移动品牌，跨越 K7、K8 等实现；需保留完整型号和 32/64 位支持信息 | [AMD 2004 10-K][a26] |
| 2005-03 引入；2006-05 双核引入 | Turion 64 / Turion 64 X2 | 轻薄移动路线；后续 X2 不等同于 2005 单核产品 | [AMD 2005 10-K][a27]、[AMD 2006 10-K][a28] |
| 2005-04 双核 Opteron；2005 客户端双核 | Dual-Core Opteron / Athlon 64 X2 / FX X2 | 双核与每核缓存；AM2/DDR2 的后续升级不是全家族首发配置 | [AMD 2005 10-K][a27]、[AMD 2006 10-K][a28] |
| 2007-09-10 发布 | K10 / Barcelona：Quad-Core Opteron | 原生四核服务器；必须结合 B2/B3 与勘误评价，不能只用发布稿中的“最先进” | [AMD 发布稿][a29] |
| 2007 引入；2008-03 X3 引入 | Phenom X4 / X3 | K10 桌面；TLB 勘误修复和 BIOS 规避的性能成本是独立证据主题 | [AMD 2007 10-K][a30]、[AMD 2008 10-K][a31] |
| 2008–2009 记录 | Turion X2 Ultra / X2（Puma 平台）；Athlon Neo（2009-01 Yukon）；Neo X2（2009-06） | Puma 平台名称与后来的低功耗 Puma CPU 核不是同一个概念；Neo 包含轻薄笔记本与嵌入式分支 | [AMD 2008 10-K][a31]、[AMD 2009 10-K][a32] |
| 2009-01 Phenom II；2009–2010 产品谱系 | Phenom II / Athlon II / Turion II / Phenom II Mobile | 45 nm K10 派生；桌面/移动、二/三/四/六核配置分开，不以品牌认定统一缓存结构 | [AMD 2008 10-K][a31]、[AMD 2010 10-K][a33] |
| 2009-06 六核服务器；2010-03 / 06 新平台 | Opteron Istanbul；6100 Magny-Cours / 4100 Lisbon | 六核到多芯片八/十二核与 2P/4P、云平台分化；不能把封装核数增长全部解释为 IPC 增长 | [AMD 2009 10-K][a32]、[AMD 2010 10-K][a33] |

## Fusion、低功耗与 Bulldozer 系

| 时间及性质 | 家族 / 代号 | 市场、变化与局限 | 原始来源 |
| --- | --- | --- | --- |
| 2011-01-04 可用 | Bobcat：Brazos / Ontario / Zacate，C/E 系列；后续 Hondo / Brazos 2.0 | 低功耗 x86 APU；Fusion 品牌不表示所有产品都是同一种 CPU 核 | [AMD Fusion 发布稿][b01]、[2013 路线稿][b02] |
| 2011-06-14 宣布可用 | Llano / A-Series | 主流 APU，CPU 与 GPU 同 die；与 Bobcat 低功耗路线分开 | [AMD A-Series 发布稿][b03] |
| 2011-09-07 收入出货公告；2011-11 正式推出 | Bulldozer：Opteron 6200 Interlagos / 4200 Valencia | 服务器模块化多线程架构；出货与正式发布相差数月 | [AMD 出货稿][b04]、[2011 年报][b05] |
| 2011-10-12 零售可用 | Bulldozer：FX / Zambezi | AM3+；模块共享资源，核数标签不足以预测单线程/浮点吞吐 | [AMD FX 发布稿][b06]；评价见下表 |
| 2012-05-15 发布 | Piledriver：Trinity APU | APU 转向 Piledriver，覆盖笔记本/一体机/桌面；独显协同和续航主张需保留脚注条件 | [AMD Trinity 稿][b07] |
| 2012-10-23 发布 | Piledriver：FX / Vishera；服务器 Opteron 6300 Abu Dhabi / 4300 / 3300 | FX 改进与服务器更新不是同一个发布事件；Abu Dhabi 当前保留 2012-11 月级记录 | [AMD FX 原稿（通讯社发行）][b08]、[原作者 Opteron 实测][r08] |
| 2013-01 OEM 出货记录；2013-03-12 可用公告 | Richland | Trinity 演进的 APU；不要只取 CES 演示日代替上市 | [AMD CES 稿][b02]、[AMD Richland 稿][b09] |
| 2013；1 月演示/计划上半年出货 | Jaguar：Kabini / Temash；后续 AM1 Athlon / Sempron；Opteron X-Series | 低功耗 SoC 路线；AM1 为桌面平台版本。2013-05-23 实测可用于实际产品节点 | [AMD CES 稿][b02]、[Kabini 首发实测（正文访问受限）][r07]、[2015 年报][b14] |
| 2014-01-14 桌面；2014-06-04 移动发布 | Steamroller：Kaveri；后续 Godavari | APU / HSA / GCN；“12 Compute Cores”中包含 GPU 单元，不能写成 12 个 CPU 核 | [AMD Kaveri 桌面稿][b10]、[移动稿][b11] |
| 2014-04-29 发布 | Puma：Beema / Mullins；后续 Carrizo-L | 低功耗路线，最多四个 x86 核；与 2008 年 Puma 平台及高性能 Carrizo 不混同 | [AMD Beema/Mullins 稿][b12]；Carrizo-L 首发日待补 |
| 2015-06-02 发布 | Excavator：Carrizo；后续 Athlon X4 845 / 相关嵌入式 | 主流移动 APU 整合 SoC；高性能 CPU 核与低功耗 Carrizo-L 为不同分支 | [AMD Carrizo 稿][b13] |
| 2016-05-31 全线发布；4 月已有提前供应记录 | Excavator：Bristol Ridge / Stoney Ridge | 第七代 A-Series/FX/E-Series，15 W / 35 W 档；早期 AM4 产品不一定是 Zen | [AMD 第七代移动稿][b15] |
| 2011–2016 历代；2015-10 R-Series SoC | Embedded G-Series / R-Series（含 Bald Eagle、Merlin Falcon 等派生） | G/R 为嵌入式生命周期和集成度分档，跨不同 CPU 架构；2015 R-Series SoC 明确为 Excavator | [AMD 2015 10-K][b14]；各代首次发布日期未逐项补齐 |
| 2016-01-14 正式发布；2014 年已有开发套件 | Opteron A1100 / Seattle | ARM64 SoC，AMD CPU 历史不只有 x86；开发套件不能替代量产发布时间 | [AMD A1100 稿][b16]、[2014 Q3 报告][b17] |

## Zen 客户端与工作站

| 时间及性质 | 家族 / 代号 | 工程变化与写作注意点 | 原始来源 |
| --- | --- | --- | --- |
| 2017-03-02 Ryzen 7 上市 | Zen：Ryzen 1000 / Summit Ridge | AM4、最多 8C/16T；首发 1800X 499 美元、1700 329 美元为美国建议价，不能当中国含税价 | [AMD 上市稿][c01] |
| 2017-06-29 发布 | Ryzen PRO；后续 Athlon PRO / Ryzen AI PRO | PRO 是商用安全、管理、供货方案，与 Zen 微架构代次分别记录 | [AMD 首代 PRO 稿][c02] |
| 2017-08-10 首批上市 | Threadripper 1000 / Whitehaven | Zen、TR4、最多 16 核，64 条 PCIe 3.0；不是普通双通道 AM4 平台 | [AMD 上市稿][c03] |
| 2017-10-26 发布；随后数周整机 | Raven Ridge：Ryzen Mobile 2000U；后续 2000G | Zen 与 Vega APU，15 W 移动首发；产品 2000 不表示与桌面 Ryzen 2000 同一 Zen+ 核 | [AMD 移动稿][c04] |
| 2018-04-13 预售；04-19 可用 | Zen+：Ryzen 2000 / Pinnacle Ridge | 12 nm、Precision Boost 2；保留主板 BIOS 支持条件 | [AMD 预售稿][c05]、[上市稿][c06] |
| 2018-08-06 预售；08-13 首款可用 | Threadripper 2000 / Colfax | Zen+，最多 32 核；2990WX、2950X 等分批供货，不能统一写成 8 月 6 日上市 | [AMD 预售稿][c07]、[上市稿][c08] |
| 2018-09-06 发布 | Zen-based Athlon / 200GE；后续 3000G、Mobile、Silver / Gold | Athlon 品牌进入 Zen APU；品牌复用不说明与早期 K7 Athlon 是相同架构 | [AMD Athlon 稿][c09] |
| 2019-01-06 发布；Q1 首批整机 | Ryzen Mobile 3000 / Picasso；Athlon Mobile 300 | 第二代移动，Zen+ 世代；与同年桌面 Ryzen 3000 Zen 2 分开 | [AMD 移动稿][c10] |
| 2019-05 公告；07-07 首批可用 | Zen 2：Ryzen 3000 / Matisse；同日 3000G APU 另支 | 7 nm CCD 与独立 I/O、PCIe 4.0；3000G APU 不应自动认作 Zen 2 | [AMD Computex 稿][c11]、[上市稿][c12] |
| 2019–2020；首批与 3990X 分批 | Threadripper 3000 / Castle Peak | Zen 2、sTRX4/TRX40，最多 64 核；不是旧 TR4 主板直接升级。首发日当前待补官方单独公报 | [AMD 2020 CES 稿][c13]；首发日期缺口 |
| 2020-01-06 公告；Q1 整机计划 | Ryzen Mobile 4000 / Renoir；后续 4000G/PRO | Zen 2 单片 APU、最多 8 核；移动性能须看整机功耗和内存 | [AMD CES 稿][c13]、[PRO 4000 可用稿][c14] |
| 2020-07-14 公告；秋季 P620 整机计划 | Threadripper PRO 3000 WX | Zen 2，最多 64 核、8 通道 DDR4、128 PCIe 4.0；WRX 平台能力与普通 TRX 区分 | [AMD PRO 首发稿][c15] |
| 2020-10-08 公告；11-05 预计零售 | Zen 3：Ryzen 5000 / Vermeer | 8 核共享缓存组织；首发不能等同所有后续 5000G、GT、X3D 型号日期 | [AMD 发布稿][c16] |
| 2021-01-12 公告；Q1 整机计划 | Ryzen Mobile 5000：Cezanne / Lucienne；后续 Barcelo、5000G | 5000U 混用 Zen 3 和 Zen 2：5800U/5600U 与 5700U/5500U 不能只按编号归架构 | [AMD CES 规格表][c17] |
| 2022-01-04 公告；2 月首批整机计划 | Zen 3+：Ryzen 6000 / Rembrandt | 6 nm、RDNA 2 核显、DDR5/LPDDR5；不是桌面 Ryzen 5000 之后必然有普通 6000 桌面代 | [AMD CES 稿][c18] |
| 2022-03-08 发布 | Threadripper PRO 5000 WX / Chagall | Zen 3 工作站、最多 64 核；无普通 Threadripper 5000 全线与之对应 | [AMD PRO 5000 稿][c19] |
| 2022 首批；具体供货日需逐款查 | Ryzen 5000 X3D（5800X3D）；后续 5600X3D / 5700X3D | 3D V-Cache 分支；2024 5700X3D 的公告不能当 5800X3D 首发。5800X3D 在 2022 CES 已公布 | [AMD CES 稿][c18]、[2024 扩展稿][c25] |
| 2022-08-29 公告；09-27 预计可用 | Zen 4：Ryzen 7000 / Raphael | AM5、DDR5、PCIe 5.0、5 nm CCD / 6 nm I/O；与 7000 移动多架构集合分开 | [AMD 发布稿][c20] |
| 2022-09-20 产品记录；2022 Q4 整机计划 | Ryzen / Athlon 7020 / Mendocino | Zen 2+RDNA 2 入门 APU；首位“7”不是 Zen 4 | [AMD 7520U 规格页][c21]、[Computex 计划稿][c22] |
| 2023-01-04 公告；1–3 月分批整机计划 | Ryzen 7030 / Barcelo-R；7035 / Rembrandt-R；7040 / Phoenix；7045HX / Dragon Range | 分别覆盖 Zen 3、Zen 3+、Zen 4 APU 与桌面衍生 HX；7040 的 NPU 亦只在指定型号上 | [AMD CES 全系公告及规格][c23] |
| 2023 公告并分批可用 | Ryzen 7000 X3D | 7950X3D、7900X3D 与 7800X3D 不同批；双 CCD 的缓存/频率分工不能直接外推到单 CCD | [AMD 2023 CES 稿][c23]；逐款上市日待补 |
| 2023-10-19 公告；后续零售/OEM 批次 | Threadripper 7000 / PRO 7000 WX | Zen 4，普通最多 64 核、PRO 最多 96 核；TRX50 四通道与 WRX90 八通道按主板区分 | [AMD Threadripper 7000 稿][c24] |
| 2023 年底公告；2024 整机 | Ryzen Mobile 8040 / Hawk Point；后续 8000HX | Zen 4 APU 的 NPU 演进；8040 不是 Zen 5。8000HX 与 8040 的集成方案不同，首发日未补齐 | [AMD 2024 CES 整机记录][c25]、[AMD 2024 年报][c26] |
| 2024-01-08 公告；01-31 预计零售 | Ryzen 8000G / Phoenix、Phoenix 2 | AM5 APU；8700G/8600G 有 NPU，8500G/8300G 无 NPU；Zen 4c 和 PCIe 配置需逐款看 | [AMD 发布稿和规格表][c25] |
| 2024-06-02 公告；2024-08 实际分批上市 | Zen 5：Ryzen 9000 / Granite Ridge | 发布稿原定 7 月，不能当实际上市日期；本轮不以原计划日期填入实际字段 | [AMD 原公告][c27]、[AMD 8 月驱动支持记录][c28]、[首发实测][r03] |
| 2024-06-02 公告；7 月整机批次 | Ryzen AI 300 / Strix Point；后续 Krackan Point | Zen 5/Zen 5c、RDNA 3.5、XDNA 2；NPU TOPS 与 CPU 单/多核性能是不同指标 | [AMD 原公告][c27]、[AMD 2025 CES 扩展][c29] |
| 2024–2026 分批产品 | Ryzen 9000 X3D：9800X3D；9950X3D / 9900X3D；9850X3D | Zen 5 缓存堆叠分支；2025-01-06 宣布 9 系双 CCD X3D，2026-01-05 宣布 9850X3D，不能全写成 2024 产品 | [AMD CES 2025 游戏稿][c30]、[CES 2026 稿][c31] |
| 2025-01-06 公告；Q1 / Q2 整机计划 | Ryzen AI Max / Strix Halo；Ryzen AI 300 扩展；Ryzen 200 | Max 面向大核显/统一内存；Ryzen 200 延续 Zen 4，不是 Ryzen 2000 的同名缩写 | [AMD 客户端 CES 稿][c29] |
| 2025-01-06 公告 | Ryzen 9000HX / Fire Range；Ryzen Z2（含多种实现） | 高性能笔记本和掌机为独立线；掌机 Z2 不能按名字认定全部同一种 CPU 架构 | [AMD 游戏 CES 稿][c30] |
| 2025-05-20 公告；后续 OEM/零售批次 | Threadripper 9000 / PRO 9000 WX | Zen 5 HEDT / 工作站；普通与 PRO 的最大核数和内存/I/O配置分别核实 | [AMD Computex 稿][c32] |
| 2025-10-01（170）；2026-06-02（180），官网 Launch Date 字段 | Ryzen 100 / Rembrandt、Hawk Point | 三位数 Ryzen 100 与 Ryzen 1000 分开；170 为 Zen 3+ / 6 nm，180 为 Zen 4 / 4 nm，不能把整个系列视为同一种 CPU 核。产品页日期不替代各 OEM 整机首销日期 | [AMD Ryzen 7 170](https://www.amd.com/en/products/processors/laptop/ryzen/100-series/amd-ryzen-7-170.html)、[AMD Ryzen 9 180](https://www.amd.com/en/products/processors/laptop/ryzen/100-series/amd-ryzen-9-180.html) |
| 2026-01-05 公告；Q1 移动 / Q2 桌面计划 | Ryzen AI 400 / PRO 400；AI Max+ 392 / 388 | AI 400 延续 Zen 5 平台；新增 Max+ 型号是配置扩展，不代表又一代 CPU 核 | [AMD CES 2026 稿][c31] |
| 2026-03-02 公告；Q2 桌面整机计划 | Ryzen AI 400 AM5 desktop / PRO | CPU+核显+NPU 组合扩展到 AM5 桌面；本次保留公告/计划供货，不把未来计划自动标已上市 | [AMD 桌面扩展稿][c33] |
| 2026-05 公告；Q3 OEM 计划 | Ryzen AI Max PRO 400 | Zen 5 工作站/企业 APU 配置更新；与 Zen 6 服务端不混同 | [AMD 2026 官方博客][c34] |

## Zen 服务器与嵌入式

| 时间及性质 | 家族 / 代号 | 规格、定位与工程约束 | 原始来源 |
| --- | --- | --- | --- |
| 2017-05-16 品牌公布；06-20 发布 | EPYC 7001 / Naples | Zen、最多 32 核；多 die/NUMA 组织是解释实测的必要条件 | [品牌公告][d01]、[发布稿][d02] |
| 2018-02-21 发布 | EPYC Embedded 3000 / Snowy Owl；Ryzen Embedded V1000 / Great Horned Owl | 分别为服务器型嵌入式 CPU 与 Zen 与 Vega APU；生命周期、BGA、I/O 与桌面不同 | [AMD 嵌入式首发稿][d03] |
| 2019-04 引入 | Ryzen Embedded R1000 | 较小规模 APU，面向边缘/瘦客户机等；2020 新型号公告不是家族首发 | [AMD 2020 公告中的回溯][d04] |
| 2019-08-07 发布 | EPYC 7002 / Rome | Zen 2、最多 64 核；CCD+中央 I/O，PCIe 4.0 | [AMD 发布稿][d05] |
| 2020-11-10 发布 | Ryzen Embedded V2000 | Zen 2、最多 8 核；相比 V1000 的性能宣传需按功耗和配置核对 | [AMD 发布稿][d06] |
| 2021-03-15 发布 | EPYC 7003 / Milan | Zen 3、最多 64 核，仍是 SP3 世代；不能将后续 Milan-X 日期并入普通 Milan | [AMD 发布稿][d07] |
| 2022-03-21 宣布普遍可用 | EPYC 7003X / Milan-X | 3D V-Cache、768 MB L3；针对 CFD/FEA/EDA 等缓存敏感负载 | [AMD 可用稿][d08] |
| 2022-06-21 公告 | Ryzen Embedded R2000 | Zen+ 嵌入式 APU，核数/接口增强；不是 Zen 2 的同义词 | [AMD R2000 稿][d09] |
| 2022-09-27 发布 | Ryzen Embedded V3000 | Zen 3，网络/存储 CPU；V 系列名称不保证每代均有可用显示核显 | [AMD V3000 稿][d10] |
| 2022-11-10 发布 | EPYC 9004 / Genoa | Zen 4、最多 96 核；SP5、DDR5、PCIe 5.0，与 SP3 更换平台 | [AMD 首发可用稿][d11] |
| 2023-03-14 公告 | EPYC Embedded 9004 | Zen 4、最多 96 核；嵌入式的生命周期和可用节点与服务器 Genoa 分开 | [AMD 发布稿][d12] |
| 2023-04-20 宣布可用 | Ryzen Embedded 5000 | Zen 3、AM4、6–16 核、ECC；原稿明确已在生产并计划五年制造供货 | [AMD 发布稿][d13] |
| 至迟 2023 原始公告有在售谱系 | EPYC Embedded 7002 / 7003 | Zen 2/Zen 3、SP3；不是 EPYC Embedded 3000 的同一封装替换件；本轮首发日待补 | [AMD 7000 规格页][d14]、[2023 嵌入式公告][d13] |
| 2023-06-13 发布 | EPYC 97x4 / Bergamo；9004X / Genoa-X | Zen 4c 高密度与 Zen 4 大缓存两条支线；Bergamo 128 核，Genoa-X 面向技术计算 | [AMD 同期发布稿][d15] |
| 2023-09-18 宣布可用 | EPYC 8004 / Siena | Zen 4c、SP6、最多 64 核，面向边缘/电信等；不能同 SP5 当可互换型号 | [AMD 发布稿][d16] |
| 2024-04-02 官方博客 | Ryzen Embedded 8000 | Zen 4、RDNA 3、NPU；独立嵌入式谱系，长期供货承诺应以型号文档为准 | [AMD 官方博客][d17] |
| 2024-05 官方公告记录 | EPYC 4004 / Raphael | AM5 入门服务器、4–16 核，双通道内存；EPYC 品牌不等于所有型号都是 SP5 多通道大 CPU | [AMD 官方博客][d18] |
| 2024-10-01 官方公告 | EPYC Embedded 8004 | Zen 4c、SP6；嵌入式上市时间晚于服务器 Siena | [AMD 官方博客][d19] |
| 2024-10-10 宣布可用 | EPYC 9005 / Turin | Zen 5 / Zen 5c，8–192 核；保留 SP5 但 BIOS/主板支持仍需确认 | [AMD 发布稿][d20] |
| 2025-03-11 公告 | EPYC Embedded 9005 | Zen 5/Zen 5c；网络、存储、工业长生命周期应用 | [AMD 发布稿][d21] |
| 2025-05-13 发布 | EPYC 4005 / Granite Ridge | Zen 5、AM5 入门企业服务器；与 4004 相同插座并不意味着无需验证固件 | [AMD 发布稿][d22] |
| 2025-09-16 官方公告；2025 家族扩展 | EPYC Embedded 4005 / 2005；Ryzen Embedded 9000 | 分别为 AM5、BGA 与工业 AM5 路线；9000 官方博客日期 10-07，年报确认 2025 推出 | [4005 官方博客][d23]、[9000 官方博客][d24]、[AMD 2025 10-K][d25] |
| 2026-01 公告；P100 首批、X100 后续 | Ryzen AI Embedded P100 / X100 | CPU、GPU、NPU 融合的边缘/工业/汽车路线；7 月另有 X100 发布事件，1 月预告不能覆盖全部上市节点 | [AMD 1 月发布稿][d26]、[7 月发布稿][d27] |
| 2026-07-23 发布公告；不同平台可用性需分查 | EPYC 9006 / 第六代：SP7、SP8、9006X、LP（Verano） | 官方记录已包含新代，不能将历史截止在 Turin；单独记录高密度、HPC、大缓存、AI 主机路线，不以公告推断每款都已出货 | [AMD 9006 专稿][d28]、[AMD AAI 主稿][d27] |

第六代 EPYC 的公开稿还把功耗表述改为 **Default CPU Power**，并解释其与历史 TDP 的关系。后续跨代性能/瓦比较必须保留测量边界，不能直接把“CPU 功耗参考值”当整机墙上功耗。该段为厂商定义记录，不是独立能效测试。[AMD AAI 2026 脚注][d27]

## 定制与收购取得的其他 CPU 路线

| 分支 | 已找到的证据与处理边界 |
| --- | --- |
| Alchemy Au 系列（MIPS） | AMD 2005 Q1 原稿记录 Au1200 推出；这是 MIPS 嵌入式 CPU/SoC，不能遗漏但也不应写成 AMD64 产品。Au1000/1100/1500/1550 等逐款首发还需补原手册。[AMD Q1 原稿][e01] |
| PlayStation、Xbox、Steam Deck 定制 APU | AMD 年报确认 semi-custom 业务与具体平台；其销售形式为客户整机，不是通用零售 CPU SKU。PS4/Xbox One 的 Jaguar 与 PS5/Series/Deck 的 Zen 路线需要按客户官方规格分拆。此处不推定未经披露的内部代号。[AMD 2024 10-K][c26] |
| Ryzen Z1 | AMD 2023 新闻存档记录 2023-04-25 发布；归开放掌机 PC 处理器线，与仅售给主机客户的 semi-custom 芯片分开。[AMD 2023 原始新闻存档][e02] |
| Xilinx 取得的 Zynq、Zynq UltraScale+ MPSoC/RFSoC、Versal、MicroBlaze | 若“所有 AMD CPU”按今天公司产品组合定义，应补含 ARM 硬核和可配置软核的 adaptive SoC；这不是 Zen 的一个世代。本轮以 AMD 年报确认分支，未展开收购前 Xilinx 各代/每个 FPGA 软核配置的历史，正式写该分支需另建专项档案。[AMD 2025 10-K][d25] |
| Am9511 / Am9512 等算术协处理器 | 1983 AMD 手册将其列为 Arithmetic Processor；属于辅助计算器件，不在主 CPU 首发时间线中冒充一代通用 CPU。[AMD 1983 数据手册][a05] |

## 同期评价与可复核实测入口

以下为独立评测原作者自己的测量/分析，区别于 AMD 营销稿。只摘取已经能核对的结论；没有读到图表的项目不补跑分。“当时评价”应保持当时软件、固件、售价和竞品，不能用 2026 年新系统重测冒充首发结论。

| 对象与评价时间 | 一手实测入口 | 本次可直接采用的材料 / 局限 |
| --- | --- | --- |
| K6-266，1998-02-05 | [Anand Lal Shimpi 原评测][r01] | 搜索索引仍有原文记录；本次 AnandTech 正文打开重定向论坛，暂作档案线索，具体分数需先找存档快照 |
| Athlon 64 3400+，2004-01-06 | [Anand Lal Shimpi 原评测][r02] | 当年以 3400+ 与 FX-51 的价格/性能取舍为主题。当前正文链接失效风险同上，不凭搜索摘要编写全套结论 |
| Phenom B3 / TLB，2008-03-12 | [AnandTech 原作者勘误测试][r06] | 用于区分硬件 B3 修复与 B2 BIOS 规避；正文当前访问问题相同，补快照后才提取损失百分比 |
| FX-8150，2011-10-12 | [TechSpot 首发评测][r04]、[结论页][r05] | 原作者 Steven Walton；可访问。价格 245 美元、不同游戏/编码/功耗章节并列，可用于讨论共享模块与桌面负载匹配问题；不将某项编码结果外推为普遍更快 |
| Opteron 6300，2013-01 | [Johan De Gelas 原始实测][r08] | 研究服务器 Piledriver 的工作负载差异；本轮仅索引可见，正文需存档。评测年与 2012-11 产品发布年要分开 |
| Kabini A4-5000，2013-05-23 | [Jarred Walton 首发实测][r07] | 对低功耗 APU 的原型机测试；原型机/零售整机和 CPU 数据分开。AnandTech 正文需档案恢复 |
| Ryzen 7，2017-03-02 | [Ian Cutress 首发深测][r09]、[其测试平台页][r10] | 原测为 1800X/1700X/1700，Windows 10、DDR4-2400 配置；可作为同期材料定位。本文没有从失效正文捏造游戏落后幅度 |
| Ryzen 3900X / 3700X，2019-07-07 | [Steven Walton / TechSpot 首发实测][r11] | 可访问，应用、游戏、功耗分开；12 核与 8 核型号差异、内存与测试显卡必须保留。另有 [AnandTech 同期原测][r12] 但正文现已重定向 |
| Ryzen 5000，2020-11 | [AnandTech 首发深测][r13] | 搜索索引保留原评测与“竞争格局改变”的当时判断；具体百分比暂不引用，需档案快照或其他首发原测交叉核对 |
| Ryzen 9950X，2024-08-14 | [Steven Walton / TechSpot 首发实测][r03] | **该评测的 13 游戏平均中，9950X 对 7950X 约 +1%**；AM5 使用 X670E Aorus Master、BIOS F32b、DDR5-6000 CL30、RTX 4090、Windows 11。只代表这个首发环境，不能写成所有 Zen 5 工作负载都只快 1% |
| EPYC 9755 AVX-512，2024-10-11 | [Michael Larabel / Phoronix 原测][r14] | 对 512-bit、256-bit 数据通路及禁用 AVX-512 做对照，适合验证向量单元收益，不与桌面游戏结论混用 |
| EPYC 7601 → Turin，2025 重测 | [Phoronix 同环境历史重测][r15] | 原作者明确使用现代 2025 Linux 栈重测。适合跨代架构研究，但不是 2017 年首发舆论证据 |

## 写作最容易混淆的事实

1. **AMD 早期产品的首发年不等于 Intel 同名产品首发年。** 286/386/486 必须用 AMD 的出货、授权和手册记录；本次已找到 AMD 明确说明 Am386 1991、Am486DX 1993 Q2 的年报。[1993 年报][a14]、[10-K][a15]
2. **品牌编号不等于架构。** 2019 桌面 3000 与移动 3000、2021 5000U 内部、2023 7000 移动内部均存在不同 CPU 核；直接用型号首页和规格表交叉核对。[2019 移动][c10]、[2021 规格][c17]、[2023 规格][c23]
3. **“Compute Cores”不能全算 CPU 核。** Kaveri 宣传中的 12 Compute Cores 包括 4 CPU+8 GPU。[Kaveri 发布稿][b10]
4. **演示、收入出货、正式上市是三种事件。** Interlagos 2011-09 出货、11 月发布；Seattle 2014 开发套件、2016 发布，是可直接引用的反例。[Interlagos 出货][b04]、[年报][b05]、[Seattle][b16]
5. **移动代际必须附整机。** 核数、频率、TDP 不是续航或持续性能的直接测量；内存通道、功耗限制、散热、BIOS、系统版本缺失时，不拼接成“跨代性能曲线”。
6. **厂商产品页也会出错。** 例如官方 Siena 博客曾把 Genoa-X 缓存单位写成 GB，而不是 MB；引用大数值要对照规格表/数据手册。[原博客][e03]、[同期规格来源][d15]
7. **最新公告不等于全线已供货。** 2026 EPYC 9006 的公开范围包括多个平台和 LP 分支；本次只确证公告，逐款量产/可用状态仍需产品页/厂商整机文档补足。[9006 专稿][d28]

## 后续逐型号核查入口与现存缺口

官方入口：[AMD 产品规格目录](https://www.amd.com/en/products/specifications.html)、[EPYC 产品](https://www.amd.com/en/products/processors/server/epyc.html)、[EPYC Embedded 家族](https://www.amd.com/en/products/embedded/epyc.html)、[AMD 文档中心](https://www.amd.com/en/search/documentation/hub.html)、[AMD IR 发布稿](https://ir.amd.com/news-events/press-releases)、[AMD SEC 年报/季度报告](https://ir.amd.com/financial-information/sec-filings)。现代目录可能撤下停产型号，因此不把网页搜索无结果理解为产品从未存在。

旧文档入口：[Bitsavers AMD 原件档案](https://bitsavers.trailing-edge.com/components/amd/)、[Ardent Tool AMD 原始文档](https://www.ardent-tool.com/CPU/docs/AMD/)。这些是原件保存站；二级数据库 CPU-World、WikiChip 可以做型号查漏工具，但日期与技术结论应回到原始手册、厂商公告或评测作者原文。

尚未完成：Am9080/286/5x86 等精确首发日；K6 的移动“+”与 E 各分支；每个 Athlon 内核代号的单独发布日；Opteron 130 nm→90 nm→65 nm→45 nm 各批次；Embedded G/R 每个刷新代；Xilinx 收购前所有含 CPU 产品、软核版本和 Zynq/Versal 子系列；2026 新产品逐款供货验证。已经列入这些分支，不将其描述成“全部型号和全部史料已经穷尽”。

AnandTech 多个历史正文在 2026-10-28 实际打开时重定向到论坛首页。该站搜索索引可检出原标题/作者/日期，但**不能替代原页图表**；未来引用数值前需补 Internet Archive 快照与快照日期。本文件已优先保留可访问 TechSpot/Phoronix 自测作为替代证据。

## 来源目录

链接与表格逐项对应；目录/动态产品页仅作查漏入口，不充当所有历史发布日期的共同证明。

[a01]: https://bitsavers.trailing-edge.com/components/amd/_dataBooks/1977_AMD_8080A_9080A_MOS_Microprocessor_Handbook.pdf
[a02]: https://www.computerhistory.org/revolution/digital-logic/12/330/1579
[a03]: https://bitsavers.trailing-edge.com/components/amd/bitslice/1978_The_Am2900_Family_Data_Book.pdf
[a04]: https://bitsavers.trailing-edge.com/components/amd/z8000/
[a05]: https://www.rsp-italy.it/Electronics/Databooks/AMD/_contents/AMD%20Mos%20microprocessors%20and%20peripherals%201983.pdf
[a06]: https://bitsavers.trailing-edge.com/components/amd/_dataBooks/1988_AMD_8051_Microcontrollers.pdf
[a07]: https://bitsavers.trailing-edge.com/components/amd/x86/1992_AMD_Personal_Computer_Microprocessors_Data_Book.pdf
[a08]: https://www.ardent-tool.com/CPU/docs/AMD/286/
[a09]: https://cdn.embeddedts.com/resource-attachments/ElanSC520-datasheet.pdf
[a10]: https://www.ardent-tool.com/CPU/docs/AMD/8018x/
[a11]: https://bitsavers.trailing-edge.com/components/amd/Am29000/
[a12]: https://ir.amd.com/financial-information/sec-filings/content/0000950131-95-000530/10-K.txt
[a13]: https://bitsavers.trailing-edge.com/components/amd/bitslice/
[a14]: https://ir.amd.com/financial-information/sec-filings/content/0000891618-94-000068/EX-13.txt
[a15]: https://ir.amd.com/financial-information/sec-filings/content/0000891618-94-000068/10-K.txt
[a16]: https://www.ardent-tool.com/CPU/docs/AMD/486_5x86/
[a17]: https://ir.amd.com/financial-information/sec-filings/content/0001012870-97-000533/10-K.txt
[a18]: https://www.cpushack.com/CIC/announce/1997/AMDK6Processor.html
[a19]: https://ir.amd.com/financial-information/sec-filings/content/0001012870-99-000892/EX-13.txt
[a20]: https://www.ardent-tool.com/CPU/docs/AMD/K6/
[a21]: https://ir.amd.com/financial-information/sec-filings/content/0001012870-00-001494/10-K405.txt
[a22]: https://ir.amd.com/financial-information/sec-filings/content/0001012870-01-001228/0001.txt
[a23]: https://ir.amd.com/financial-information/sec-filings/content/0001012870-03-001181/d10k.htm
[a24]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-04-037179/d10k.htm
[a25]: https://bitsavers.trailing-edge.com/components/amd/AMD_Geode/
[a26]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-05-039876/d10k.htm
[a27]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-06-040130/d10k.htm
[a28]: https://ir.amd.com/sec-filings/content/0001193125-07-044191/0001193125-07-044191.pdf
[a29]: https://ir.amd.com/news-events/press-releases/detail/180/amd-introduces-the-worlds-most-advanced-x86-processor-designed-for-the-demanding-datacenter
[a30]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-08-038588/d10k.htm
[a31]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-09-036235/d10k.htm
[a32]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-10-035218/d10k.htm
[a33]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-11-040392/d10k.htm
[b01]: https://ir.amd.com/news-events/press-releases/detail/168/amd-fusion-apu-era-begins
[b02]: https://ir.amd.com/news-events/press-releases/detail/72/amd-unveils-innovative-new-apus-and-socs-that-give-consumers-a-more-exciting-and-immersive-experience
[b03]: https://ir.amd.com/news-events/press-releases/detail/360/amd-ushers-in-next-generation-of-computing-with-amd-a-series-apus
[b04]: https://ir.amd.com/news-events/press-releases/detail/32/amd-ships-first-bulldozer-processors
[b05]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-12-075837/d257108d10k.htm
[b06]: https://ir.amd.com/news-events/press-releases/detail/64/unlock-your-record-setting-amd-fx-series-processor-today
[b07]: https://ir.amd.com/news-events/press-releases/detail/86/second-generation-amd-a-series-apus-enable-best-in-class-pc-mobility-entertainment-and-gaming-experience-in-single-chip
[b08]: https://www.globenewswire.com/news-release/2012/10/23/1011821/0/en/New-AMD-FX-Line-Up-Brings-Faster-Speeds-and-Higher-Performance-Core-Over-Previous-Generation-to-PC-Enthusiasts-and-Gamers.html
[b09]: https://ir.amd.com/news-events/press-releases/detail/215/new-amd-a-series-apu-offers-mobile-pc-users-innovative-experiences-elite-graphics-performance-and-longer-battery-life
[b10]: https://ir.amd.com/news-events/press-releases/detail/479/amd-revolutionizes-compute-and-ultrahd-entertainment-with-2014-amd-a-series-accelerated-processors
[b11]: https://ir.amd.com/news-events/press-releases/detail/528/amd-announces-its-most-advanced-mobile-apus-for-consumer-and-commercial-notebooks
[b12]: https://ir.amd.com/news-events/press-releases/detail/510/next-generation-mobile-apus-extend-amd-performance-leadership-add-cutting-edge-features-and-enhanced-security
[b13]: https://ir.amd.com/news-events/press-releases/detail/616/amd-unveils-6th-generation-a-series-processor-bringing-unprecedented-hd-streaming-online-gaming-and-innovative-computing-experiences-to-notebooks-and-all-in-ones
[b14]: https://ir.amd.com/financial-information/sec-filings/content/0000002488-16-000111/amd-12262015x10k.htm
[b15]: https://ir.amd.com/news-events/press-releases/detail/689/work-faster-play-longer-with-new-mobile-7th-generation-amd-a-series-processors
[b16]: https://ir.amd.com/news-events/press-releases/detail/661/amd-and-key-industry-partners-welcome-the-amd-opterontm-a1100-soc-to-the-64-bit-arm-datacenter-arena
[b17]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-14-389701/0001193125-14-389701.pdf
[c01]: https://ir.amd.com/news-events/press-releases/detail/753/amd-ryzentm-7-desktop-processors-featuring-record-breaking-overclocking-performance-available-worldwide-today
[c02]: https://ir.amd.com/news-events/press-releases/detail/775/amd-ryzen-pro-desktop-processors-deliver-professional-grade-performance-security-and-reliability-for-businesses-worldwide
[c03]: https://ir.amd.com/news-events/press-releases/detail/786/amd-launches-the-highest-performance-desktop-processor-ever-with-ryzen-threadripper-high-end-desktop-processors
[c04]: https://ir.amd.com/news-events/press-releases/detail/795/correcting-and-replacing----amd-introduces-new-ryzen-mobile-processors-the-worlds-fastest-processor-for-ultrathin-notebooks1
[c05]: https://ir.amd.com/news-events/press-releases/detail/823/2nd-generation-amd-ryzen-processors-ultimate-desktop-cpus-for-high-performance-computing-available-april-19-worldwide
[c06]: https://ir.amd.com/news-events/press-releases/detail/827/2nd-generation-amd-ryzen-desktop-processors-deliver-best-in-class-compute-performance-and-even-faster-gaming-framerates-than-previous-generation
[c07]: https://ir.amd.com/news-events/press-releases/detail/844/world-record-breaking-2nd-generation-amd-ryzen-threadripper-processor-pre-sales-begin-today-with-initial-availability-aug-13
[c08]: https://ir.amd.com/news-events/press-releases/detail/846/amd-launches-worlds-most-powerful-desktop-processor-bigger-better-2nd-generation-amd-ryzen-threadripper-processors-break-boundaries-of-high-end-desktop-market
[c09]: https://ir.amd.com/news-events/press-releases/detail/850/amd-reimagines-everyday-computing-with-new-zen-based-athlon-desktop-processors-expands-commercial-client-portfolio-with-2nd-generation-ryzen-pro-desktop-processors
[c10]: https://ir.amd.com/news-events/press-releases/detail/870/amd-kicks-off-2019-offering-complete-mobile-portfolio-new-ryzen-athlon-and-a-series-processors-for-ultrathin-mainstream-and-chromebook-laptops
[c11]: https://ir.amd.com/news-events/press-releases/detail/892/amd-announces-next-generation-leadership-products-at-computex-2019-keynote
[c12]: https://ir.amd.com/news-events/press-releases/detail/899/amd-unleashes-ultimate-pc-gaming-platform-with-worldwide-availability-of-amd-radeon-rx-5700-series-graphics-cards-and-amd-ryzen-3000-series-desktop-processors
[c13]: https://ir.amd.com/news-events/press-releases/detail/926/amd-announces-worlds-highest-performance-desktop-and-ultrathin-laptop-processors-at-ces-2020
[c14]: https://ir.amd.com/news-events/press-releases/detail/947/amd-delivers-ultimate-performance-and-work-anywhere-flexibility-with-amd-ryzen-pro-4000-series-mobile-processors
[c15]: https://ir.amd.com/news-events/press-releases/detail/959/amd-announce-worlds-first-64-core-pro-workstation-the-lenovo-thinkstation-p620-the-pinnacle-of-performance-for-modern-professionals
[c16]: https://ir.amd.com/news-events/press-releases/detail/972/amd-launches-amd-ryzen-5000-series-desktop-processors-the-fastest-gaming-cpus-in-the-world
[c17]: https://ir.amd.com/news-events/press-releases/detail/986/amd-announces-worlds-best-mobile-processors-in-ces-2021-keynote
[c18]: https://ir.amd.com/news-events/press-releases/detail/1040/amd-presents-latest-high-performance-computing-technologies-in-2022-product-premiere-livestream
[c19]: https://ir.amd.com/news-events/press-releases/detail/1051/new-amd-ryzen-threadripper-pro-5000-wx-series-processors-are-the-ultimate-workstation-processors-for-professionals-with-up-to-double-the-performance-of-competing-solutions
[c20]: https://ir.amd.com/news-events/press-releases/detail/1089/amdlaunches-ryzen-7000-series-desktop-processors-with-zen-4-architecture-the-fastest-core-in-gaming
[c21]: https://www.amd.com/zh-tw/products/processors/laptop/ryzen/7000-series/amd-ryzen-5-7520u.html
[c22]: https://www.amd.com/en/newsroom/press-releases/2022-5-22-amd-showcases-industry-leading-gaming-commercial-.html
[c23]: https://ir.amd.com/news-events/press-releases/detail/1111/amdextends-its-leadership-with-the-introduction-of-its-broadest-portfolio-of-high-performance-pc-products-for-mobile-and-desktop
[c24]: https://ir.amd.com/news-events/press-releases/detail/1162/amd-introduces-new-amd-ryzen-threadripper-7000-series-processors-and-ryzen-threadripper-pro-7000-wx-series-processors-for-the-ultimate-workstation
[c25]: https://ir.amd.com/news-events/press-releases/detail/1177/amd-reveals-next-gen-desktop-processors-for-extreme-pc-gaming-and-creator-performance
[c26]: https://ir.amd.com/financial-information/sec-filings/content/0000002488-25-000012/amd-20241228.htm
[c27]: https://ir.amd.com/news-events/press-releases/detail/1202/amd-unveils-next-gen-zen-5-ryzen-processors-to-power-advanced-ai-experiences
[c28]: https://www.amd.com/en/resources/support-articles/release-notes/RN-RYZEN-MASTER-2-14-0-3205.html
[c29]: https://ir.amd.com/news-events/press-releases/detail/1232/amd-announces-expanded-consumer-and-commercial-ai-pc-portfolio-at-ces
[c30]: https://ir.amd.com/news-events/press-releases/detail/1233/amd-announces-new-graphics-and-gaming-products-for-ultimate-gameplay-experience-at-ces
[c31]: https://ir.amd.com/news-events/press-releases/detail/1270/amd-expands-ai-leadership-across-client-graphics-and-software-with-new-ryzen-ryzen-ai-and-amd-rocm-announcements-at-ces-2026
[c32]: https://ir.amd.com/news-events/press-releases/detail/1253/amd-introduces-new-radeon-graphics-cards-and-ryzen-threadripper-processors-at-computex-2025
[c33]: https://ir.amd.com/news-events/press-releases/detail/1281/amd-gives-consumers-and-businesses-more-ai-pc-options-with-expanded-ryzen-ai-400-series-portfolio
[c34]: https://www.amd.com/en/blogs/2026/amd-powers-next-generation-agent-computers-with-new-ryzen-ai-hal.html
[d01]: https://ir.amd.com/news-events/press-releases/detail/766/amd-raises-expectations-for-server-performance-unveils-epyc-processor-brand-for-the-datacenter
[d02]: https://ir.amd.com/news-events/press-releases/detail/773/amd-epyc-datacenter-processor-launches-with-record-setting-performance-optimized-platforms-and-global-server-ecosystem-support
[d03]: https://ir.amd.com/news-events/press-releases/detail/816/amd-launches-epyc-embedded-and-ryzen-embedded-processors-for-end-to-end-zen-experiences-from-the-core-to-the-edge
[d04]: https://ir.amd.com/news-events/press-releases/detail/935/new-amd-processors-drive-high-performance-computing-for-embedded-industry
[d05]: https://ir.amd.com/news-events/press-releases/detail/904/2nd-gen-amd-epyc-processors-set-new-standard-for-the-modern-datacenter-with-record-breaking-performance-and-significant-tco-savings
[d06]: https://ir.amd.com/news-events/press-releases/detail/979/amd-unveils-amd-ryzen-embedded-v2000-processors-with-enhanced-performance-and-power-efficiency
[d07]: https://ir.amd.com/news-events/press-releases/detail/993/amd-epyc-7003-series-cpus-set-new-standard-as-highest-performance-server-processor
[d08]: https://ir.amd.com/news-events/press-releases/detail/1055/3rd-gen-amd-epyc-processors-with-amd-3d-v-cache-technology-deliver-outstanding-leadership-performance-in-technical-computing-workloads
[d09]: https://ir.amd.com/news-events/press-releases/detail/1079/amd-announces-ryzen-embedded-r2000-series-with-optimized-performance-and-power-efficiency-for-industrial-machine-vision-iot-and-thin-client-solutions
[d10]: https://ir.amd.com/news-events/press-releases/detail/1092/amd-launches-ryzen-embedded-v3000-series-processors-delivering-new-levels-of-performance-and-power-efficiency-for-always-on-storage-and-networking
[d11]: https://ir.amd.com/news-events/press-releases/detail/1100/offering-unmatched-performance-leadership-energy-efficiency-and-next-generation-architecture-amd-brings-4th-gen-amd-epyc-processors-to-the-modern-data-center
[d12]: https://www.amd.com/en/newsroom/press-releases/2023-3-14-amd-brings-world-class-performance-of-4th-gen-amd-.html
[d13]: https://ir.amd.com/news-events/press-releases/detail/1126/amd-bolsters-embedded-portfolio-with-new-ryzen-embedded-5000-series-processors-for-networking-solutions
[d14]: https://www.amd.com/en/products/embedded/epyc/7000-series.html
[d15]: https://ir.amd.com/news-events/press-releases/detail/1136/amd-expands-leadership-data-center-portfolio-with-new-epyc-cpus-and-shares-details-on-next-generation-amd-instinct-accelerator-and-software-enablement-for-generative-ai
[d16]: https://www.amd.com/en/newsroom/press-releases/2023-9-18-amd-completes-4th-gen-epyc-family-with-the-amd-epy.html
[d17]: https://www.amd.com/zh-tw/blogs/2024/amd-launches-ryzen-embedded-8000-series-processor.html
[d18]: https://www.amd.com/en/blogs/2024/introducing-the-amd-epyc-4000-series-processors.html
[d19]: https://www.amd.com/en/blogs/2024/amd-introducing-energy-efficient-epyc--embedded-8.html
[d20]: https://ir.amd.com/news-events/press-releases/detail/1219/amd-launches-5th-gen-amd-epyc-cpus-maintaining-leadership-performance-and-features-for-the-modern-data-center
[d21]: https://ir.amd.com/news-events/press-releases/detail/1239/amd-unveils-5th-gen-amd-epyc-embedded-processors-delivering-leadership-performance-efficiency-and-long-product-lifecycles-for-networking-storage-and-industrial-edge-markets
[d22]: https://ir.amd.com/news-events/press-releases/detail/1249/amd-unveils-epyc-4005-series-processors-delivering-workload-optimized-solutions-for-entry-level-enterprise
[d23]: https://www.amd.com/en/blogs/2025/amd-introduces-epyc-embedded-4005-processors-for-low.html
[d24]: https://www.amd.com/en/blogs/2025/amd-ryzen-embedded-9000-series-brings-next-gen-performa.html
[d25]: https://ir.amd.com/financial-information/sec-filings/content/0000002488-26-000018/amd-20251227.htm
[d26]: https://ir.amd.com/news-events/press-releases/detail/1271/amd-introduces-ryzen-ai-embedded-processor-portfolio-powering-ai-driven-immersive-experiences-in-automotive-industrial-and-physical-ai
[d27]: https://ir.amd.com/news-events/press-releases/detail/1294/aai-2026-amd-delivers-full-stack-compute-for-the-agentic-ai-era
[d28]: https://newsroom.amd.com/news/aai-2026-6th-gen-epyc/
[e01]: https://ir.amd.com/financial-information/sec-filings/content/0001193125-05-075683/dex991.htm
[e02]: https://newsroom.amd.com/news/2023-amd-newsroom-archive/
[e03]: https://www.amd.com/en/blogs/2023/4th-gen-amd-epyc-8004-series-processors-designed-.html
[r01]: https://www.anandtech.com/show/165
[r02]: https://www.anandtech.com/show/1215
[r03]: https://www.techspot.com/review/2881-amd-ryzen-9-9950x/
[r04]: https://www.techspot.com/review/452-amd-bulldozer-fx-cpus/
[r05]: https://www.techspot.com/review/452-amd-bulldozer-fx-cpus/page13.html
[r06]: https://www.anandtech.com/show/2477/2
[r07]: https://www.anandtech.com/show/6974/amd-kabini-review
[r08]: https://www.anandtech.com/show/6508/the-new-opteron-6300-finally-tested
[r09]: https://www.anandtech.com/show/11170/the-amd-zen-and-ryzen-7-review-a-deep-dive-on-1800x-1700x-and-1700
[r10]: https://www.anandtech.com/Show/Index/11170?all=False&cPage=50&page=16&slug=the-amd-zen-and-ryzen-7-review-a-deep-dive-on-1800x-1700x-and-1700&sort=0
[r11]: https://www.techspot.com/review/1869-amd-ryzen-3900x-ryzen-3700x/
[r12]: https://www.anandtech.com/show/14605/the-and-ryzen-3700x-3900x-review-raising-the-bar
[r13]: https://www.anandtech.com/show/16214/amd-zen-3-ryzen-deep-dive-review-5950x-5900x-5800x-and-5700x-tested
[r14]: https://www.phoronix.com/review/amd-epyc-9755-avx512
[r15]: https://www.phoronix.com/review/amd-epyc-9005-7601

*作者：[AI-Authored Tech Chronicles]*
*系列：《CPU 历史资料库》AMD 研究材料*
*分析基于：AMD 发布稿、产品规格、SEC 年报与原始技术手册 + Computer History Museum 实物档案 + TechSpot/Phoronix 作者实测 + AnandTech 历史评测索引（访问限制已标明），资料读取于 2026-10-28*
