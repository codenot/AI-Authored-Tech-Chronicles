# Apple 主流桌面 CPU 采用记录：用于三列时间轴的数据证据

读取日：2026-10-28。记录型资料；不写文章正文。范围为消费/通用桌面 Apple 电脑，以及用户指定的 Mac mini、iMac、Mac Studio；不含笔记本、iPad、Mac Pro/Xeon、Xserve。老 Power Macintosh 用于记录 PowerPC 消费/通用桌面采用阶段；Lisa、Apple Network Server 与 Pippin 不收。

## 统一时间口径

- **左侧主时间采用 Apple 桌面产品公布日**；与 AMD/Intel 独立 CPU 发布日比较时须在页面标明“Apple 为桌面整机采用时间”。上市列记录可核实交付/零售状态。
- 同一个 CPU 在 iPad、笔记本先发布，不提前放入 Apple 桌面列。M1 Max 是 2022 Mac Studio；M2 是 2023 Mac mini；M4 是 2024 iMac；M4 Max 是 2025 Mac Studio。
- 本表是家族/代表性桌面采用事件，**不是每代所有 Mac 型号和配置**，也不承诺每个旧家族都找到最早采用日。时间精度不足保留年/月；官方技术表的 Introduced 不升级为发布会日。
- Mac mini、iMac 历史上可搭载移动来源的 Intel CPU；本范围按整机形态判断“桌面”，不因 CPU 为移动封装而删除整机。
- Intel 架构名采用“处理器世代 → 微架构”的对应，官方 Apple 新闻稿有时只写第几代，不能称 Apple 原文逐字写出了全部架构名。CPU 原厂发布日期另见 [Intel 历史材料](material-intel-cpu-history.md)。

## 早期 Apple 与 PowerPC 桌面

| ID | 时间轴显示日期 | 芯片家族 | 桌面采用锚点 / 上市证据 | 显示时的限制 | 原始来源 |
|---|---|---|---|---|---|
| AD01 | 1976（年） | 6502 | Apple-1；所引手册为 1976 年，精确首销日未核 | 可作为历史起点；不要写 Apple 自研 6502 | [Apple 原版手册][h01] |
| AD02 | 1977（年） | 6502 | Apple II；II Plus/早期 IIe 为后续复用；所引手册 1978 年版 | 不是每个 Apple II 改款都是新 CPU 家族 | [Apple II Reference Manual][h02] |
| AD03 | 1980（年） | 6502A | Apple III 商用桌面；若页面只收普通消费机，可放旁注 | 具体后缀/频率应留“部分核验”；不把辅助编纂资料当原始发布日 | [Apple SOS 原文][h03]；[辅助规格线索][h03b] |
| AD04 | 1984（年） | 65C02 | Apple IIc，后续增强 IIe/IIc Plus | 同家族复用短列即可；IIe 与增强 IIe 不混 | [IIc 原版参考手册][h04] |
| AD05 | 1984-01-24 | Motorola 68000 | Macintosh 128K；官方 Introduced | Mac 实际采用日，不是 Motorola 芯片首发；8 MHz | [官方规格][h07] |
| AD06 | 1986-09（月） | 65C816 | Apple IIGS；16 位与 6502 兼容模式 | 同一 Apple II 支系；手册证明 CPU，不单独证明精确发布日 | [IIGS 硬件参考][h05]；[Apple 同期资料][h05b] |
| AD07 | 1987-03-02 | Motorola 68020 | Macintosh II；16 MHz，官方 Introduced | 32 位 CPU 数据通路与系统寻址能力分开 | [官方规格][h08] |
| AD08 | 1988（年） | Motorola 68030 | Macintosh IIx；精确月日未在本轮再摘录 | 不补默认 01-01；页面可显示“1988” | [官方规格][h09] |
| AD09 | 1991-10-21 | Motorola 68040 / LC040 家族 | Quadra 700 为完整 68040；后续 LC040 是无 FPU 分支 | 不把完整 68040 规格套给 LC040 | [Quadra700 官方规格][h10] |
| AD10 | 1994-03-14 | PowerPC 601 | Power Macintosh 6100/60AV；官方 Introduced | 是 Mac 的 PowerPC 采用节点，不是 Apple 独立设计 CPU 首发 | [官方规格][h11] |
| AD11 | 1995（年） | PowerPC 603/603e、604/604e | 消费 Performa/5200 与 Power Macintosh9500 两支；不同档位并行 | 603/604 不能画成统一前后替换；老表日期口径有分歧，保留年 | [603 机型][h12]；[604 机型][h12b] |
| AD12 | 1997-11（月） | PowerPC G3 / 750 | Power Macintosh G3；官方表记 11-15 Introduced | 本表保留月，不把 11-15 强称发布会日；1998 iMac 是后续复用 | [桌面 G3 官方规格][h13] |
| AD13 | 1999（年） | PowerPC G4 | 首代 Power Mac G4；2000 双 CPU 后续复用，2005 Mac mini 又采用 | 双单核 CPU 不等于单颗双核；此表未另开全部频率改款 | [首代官方规格][h14]；[双 CPU 原稿][h14b] |
| AD14 | 2003-06-23 | PowerPC G5 / 970 家族 | Power Mac G5 公布；2003-08 开始出货；2005 Quad 后续复用 | 970FX/970MP 可在同卡短列；G5 Quad 为两颗双核 | [首发原稿][h15]；[出货归档][h15b]；[Quad 原稿][h15c] |

## Intel 消费桌面 Mac：逐代采用，不合并成 2006 一条

| ID | Apple 桌面公布日期 | CPU 家族 / 代际 | 代表性采用产品 | 上市口径 | 可核实变化与限制 | 原始来源 |
|---|---|---|---|---|---|---|
| AD15 | 2006-01-10 | Core Duo，Yonah；后续 mini 有 Core Solo/Duo | iMac Early2006 | 原稿明确当日 shipping | 首批 Intel 消费桌面；32 位 Core Duo 不等于 64 位 Core2 | [Intel iMac 原稿][h16b] |
| AD16 | 2006-09-06 | Core 2 Duo，Core 微架构；Merom | iMac Late2006，含新增24英寸 | 当日 shipping | 同稿 Mac mini 仍是 Core Duo，不能把“iMac全系Core2”扩大到所有Mac | [原稿][di01] |
| AD17 | 2009-10-20 | Nehalem，Core i5/i7 四核支 | 27英寸 iMac 四核配置 | **2009-11 开始出货**；同日 Core2 款已出货 | 两种架构在一次 iMac 发布中并存；不把所有2009iMac写成Nehalem | [原稿明确11月交付][di02] |
| AD18 | 2010-07-27 | Westmere / Clarkdale 双核支，与 Nehalem 四核并存 | iMac Core i3/i5/i7 | 当日可购买/出货，原文 Availability | 产品品牌i5不足以判断架构；必须按双核/四核与具体配置区分 | [iMac2010 原稿][di03] |
| AD19 | 2011-05-03 | 第2代 Core，Sandy Bridge | iMac Mid2011 | 原稿当日 available | 全系四核 Core i5，可选i7；集成媒体引擎与Thunderbolt属于不同层变化 | [原稿][di04] |
| AD20 | 2012-10-23 | 第3代 Core，Ivy Bridge | iMac Late2012；同稿也公布 Mac mini Core i 配置 | iMac21.5：**11月**；27：**12月**；mini具体交付日未独立核 | 不把 iMac 的10月公布直接写成10月上市；mini可加为并行产品但不能据此猜首销日 | [同一原稿列两种尺寸与mini][di05] |
| AD21 | 2013-09-24 | 第4代 Core，Haswell | iMac Late2013；2014 mini 为后续采用 | 当日 shipping | 原文明确第四代；PCIe存储与CPU换代分开记录 | [原稿][di06] |
| AD22 | 2015-10-13 | 第5代 Core，Broadwell | **21.5英寸 Retina4K iMac** | 当日 available | 与同日27英寸机型不同代；不可全体写成Skylake | [同稿明确5代/6代分别所属尺寸][di07] |
| AD23 | 2015-10-13 | 第6代 Core，Skylake | **27英寸 Retina5K iMac** | 当日 available | 和AD22并列同日，不写成年度单一CPU代际 | [同稿][di07] |
| AD24 | 2017-06-05 | 第7代 Core，Kaby Lake | iMac 2017 | 当日可订；**06-07 Apple Store零售** | 原文直接写Kaby Lake；排除同日预览的Xeon iMac Pro | [原稿][di08] |
| AD25 | 2018-10-30 | 第8代 Core，Coffee Lake | Mac mini 2018，四核/六核；后续2019iMac 8/9代可作复用注 | 当日可订；**11-07零售** | 2018mini已是桌面采用，不必等2019iMac；2020mini容量调整不是新CPU架构 | [mini原稿][di09] |
| AD26 | 2020-08-04 | 第10代 Core，Comet Lake | 27英寸 iMac 2020，最多10核 | 当日可订；**同周开始送达/零售**，不编具体日 | 不含仍在售21.5英寸旧架构；不收Xeon iMac Pro | [原稿][di10] |

## Apple silicon：按桌面采用日记录

| ID | Apple 桌面公布日期 | 芯片家族 | 桌面产品 | 上市日期 / 截止状态 | 需要避免的日期错误 | 原始来源 |
|---|---|---|---|---|---|---|
| AD27 | 2020-11-10 | M1 | Mac mini；iMac为2021后续采用 | 2020-11-17；已上市 | 同日虽有笔记本，但本卡锚点是mini | [发布与11-17交付说明][m01b] |
| AD28 | 2022-03-08 | M1 Max / M1 Ultra | 首代 Mac Studio | 2022-03-18；已上市 | **M1Max桌面采用不是2021笔记本首发**；M1Pro未找到本范围独立采用 | [Studio原稿][dm01] |
| AD29 | 2023-01-17 | M2 / M2 Pro | Mac mini | 2023-01-24；已上市 | **M2桌面采用不是2022-06笔记本首发** | [mini原稿][dm02] |
| AD30 | 2023-06-05 | M2 Max / M2 Ultra | Mac Studio | 2023-06-13；已上市 | **M2Max桌面采用不是2023-01笔记本首发**；原稿同时写MacPro，但本卡仅取Studio部分 | [Studio原稿][dm03] |
| AD31 | 2023-10-30 | M3 | 24英寸 iMac | 2023-11-07；已上市 | 同日M3Pro/Max发布但用于笔记本，**不放进桌面卡** | [iMac原稿][dm04] |
| AD32 | 2024-10-28 | M4 | 24英寸 iMac | 2024-11-08；已上市 | **不是2024-05 iPad首发**；也比10-29mini公布早一天 | [iMac原稿][dm05] |
| AD33 | 2024-10-29 | M4 / M4 Pro | Mac mini | 2024-11-08；已上市 | **M4Pro已于10-29随mini公布，不要取10-30芯片综述稿** | [mini原稿][m09] |
| AD34 | 2025-03-05 | M4 Max / M3 Ultra | Mac Studio | 2025-03-12；已上市 | **M4Max桌面采用不是2024-10笔记本首发**；M3Ultra晚于M4 | [Studio原稿][m11b] |
| AD35 | 2026-08-25 | M6 / M5 Pro | Mac mini | 2026-09-22；已上市 | **M5Pro桌面采用不是2026-03笔记本首发**；M6先用于mini，10月iMac是后续采用 | [mini公布][m15]；[实际上市][m14b] |
| AD36 | 2026-08-25 | M5 Ultra | Mac Studio | 2026-09-22；已上市 | 芯片发布原稿明确MacStudio；不据此把M5基础型加入桌面 | [芯片/Studio公布][m14]；[实际上市][m14b] |
| AD37 | **2026-09-22（已核实上市事件；更早公布日待补）** | M5 Max | Mac Studio | 2026-09-22；已上市 | 该日官方更新明确M5Max/M5Ultra两种配置。**8-25是否已同步公布M5Max未在本轮独立原稿中补证，不冒充芯片首发日** | [实际上市更新][m14b] |
| AD38 | 2026-10-27 | M6 | 24英寸 iMac | **2026-11-06计划上市；截至10-28待上市**；10-28开放预订 | 与8月mini复用同一家族；不混入同日M6笔记本，也不将计划上市写成已交付 | [iMac原稿][dm06] |

## 不应自动补入桌面时间轴的型号

- **M1 Pro、M3 Pro、独立 M3 Max、M4 Ultra、M5 基础型**：本轮没有取得这些命名在本范围桌面整机独立采用的证据。M3 Ultra 内部用M3Max die不等于销售M3Max配置MacStudio。
- **M5基础型**：2025-10已知MacBookPro/iPadPro/VisionPro，不据此插入桌面列；2026桌面已核实的是M5Pro/M5Max/M5Ultra与M6。
- **A18 Pro MacBook Neo、A系列iPad、S系列Watch/HomePod、AppleTV**：均不属于本次桌面整机范围。
- **Xeon Mac Pro / iMac Pro、Xserve**：不收；不能因名字带iMac就把Xeon工作站并入普通iMac。
- 老产品表仅到年/月时，HTML显示该精度；排序可以用内部数值键，但不得向读者展示臆造的01-01日期。

## 来源登记

下列 di01–di10、dm01–dm05 为本轮新增的15份官方原稿；其他为此前研究已读取的来源。dm06为此前已检索的2026-10 iMac原稿，在本轮重读确认待上市状态。

[h01]: https://archive.computerhistory.org/resources/text/Apple/Apple.AppleI.1976.102646518.pdf
[h02]: https://apple2history.org/dl/Apple_II_Redbook.pdf
[h03]: https://www.apple3.org/Documents/Manuals/a3sosrm.pdf
[h03b]: https://fsck.technology/documentation/Apple/Apple%20Spec%20PDFs/Applespec03/Systems/Apple%20II/Apple%20III.pdf
[h04]: https://manuals.plus/m/2d280ce2e9f9e91d27b3a5ded59a2ab8ec4b28f338f1d32e32bda41fcb1a590a.pdf
[h07]: https://support.apple.com/en-la/112190
[h05]: https://downloads.reactivemicro.com/Apple%20II%20Items/Documentation/Manuals/IIgs/IIgs%20Hardware%20Reference.pdf
[h05b]: https://archive.computerhistory.org/resources/access/text/2019/04/102779994-05-09-acc.pdf
[h08]: https://support.apple.com/en-euro/112188
[h09]: https://support.apple.com/en-afri/112189
[h10]: https://support.apple.com/en-il/112219
[h11]: https://support.apple.com/en-sa/112101
[h12]: https://support.apple.com/en-ge/112109
[h12b]: https://support.apple.com/en-us/112053
[h13]: https://support.apple.com/en-am/112279
[h14]: https://support.apple.com/en-ph/112296
[h14b]: https://www.apple.com/newsroom/2000/07/19Apple-Debuts-New-Power-Mac-G4s-with-Dual-Processors/
[h15]: https://www.apple.com/ca/newsroom/2003/06/23Apple-Unleashes-the-Worlds-Fastest-Personal-Computer-the-Power-Mac-G5/
[h15b]: https://www.apple.com/uk/newsroom/archive/?page=178
[h15c]: https://www.apple.com/newsroom/2005/10/19Apple-Introduces-Power-Mac-G5-Quad-Power-Mac-G5-Dual/
[h16b]: https://www.apple.com/newsroom/2006/01/10Apple-Unveils-New-iMac-with-Intel-Core-Duo-Processor/
[di01]: https://www.apple.com/newsroom/2006/09/06Apple-iMac-Line-Now-Features-Intel-Core-2-Duo-Processors-In-Every-Model/
[di02]: https://www.apple.com/newsroom/2009/10/20Apple-Unveils-New-iMac-With-21-5-and-27-inch-Displays/
[di03]: https://www.apple.com/newsroom/2010/07/27Apple-Updates-iMac-Line/
[di04]: https://www.apple.com/newsroom/2011/05/03Apple-Announces-New-iMac-With-Next-Generation-Quad-Core-Processors-Graphics-Thunderbolt-I-O-Technology/
[di05]: https://www.apple.com/newsroom/2012/10/23All-New-iMac-Features-Stunning-Design-Brilliant-Display-Faster-Performance/
[di06]: https://www.apple.com/newsroom/2013/09/24Apple-Updates-iMac/
[di07]: https://www.apple.com/newsroom/2015/10/13Apple-Updates-iMac-Family-with-Stunning-New-Retina-Displays/
[di08]: https://www.apple.com/ca/newsroom/2017/06/imac-receives-major-update-featuring-more-powerful-graphics-faster-processors-thunderbolt-3-brighter-displays/
[di09]: https://www.apple.com/ca/newsroom/2018/10/new-mac-mini-packs-huge-punch/
[di10]: https://www.apple.com/newsroom/2020/08/27-inch-imac-gets-a-major-update/
[m01b]: https://www.apple.com/newsroom/2020/11/introducing-the-next-generation-of-mac/
[dm01]: https://www.apple.com/newsroom/2022/03/apple-unveils-all-new-mac-studio-and-studio-display/
[dm02]: https://www.apple.com/newsroom/2023/01/apple-introduces-new-mac-mini-with-m2-and-m2-pro-more-powerful-capable-and-versatile-than-ever/
[dm03]: https://www.apple.com/newsroom/2023/06/apple-unveils-new-mac-studio-and-brings-apple-silicon-to-mac-pro/
[dm04]: https://www.apple.com/newsroom/2023/10/apple-supercharges-24-inch-imac-with-new-m3-chip/
[dm05]: https://www.apple.com/newsroom/2024/10/apple-introduces-new-imac-supercharged-by-m4-and-apple-intelligence/
[m09]: https://www.apple.com/uk/newsroom/2024/10/apples-new-mac-mini-is-more-mighty-more-mini-and-built-for-apple-intelligence/
[m11b]: https://www.apple.com/newsroom/2025/03/apple-unveils-new-mac-studio-the-most-powerful-mac-ever/
[m15]: https://www.apple.com/newsroom/2026/08/apple-unveils-a-more-powerful-mac-mini-featuring-the-all-new-m6-and-m5-pro/
[m14b]: https://www.apple.com/newsroom/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/
[m14]: https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/
[dm06]: https://www.apple.com/newsroom/2026/10/apple-unveils-new-imac-with-m6/

*作者：[AI-Authored Tech Chronicles]*
*系列：《CPU 编年史》Apple 主流桌面采用证据*
*分析基于：Apple Newsroom 产品公布与上市原稿 + Apple 官方技术规格及原版手册，资料读取于 2026-10-28*
