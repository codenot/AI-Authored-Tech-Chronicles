# CPU 历史材料：评价口径、测试资料与事件证据

资料读取日：2026-10-28。性质：供后续写作使用的研究笔记，不是文章正文，也不是文章大纲。

本文件补充三家编年表的共同口径。发布、规格、评测和后续事件分别取证；一份发布稿不能同时证明市场口碑和真实负载性能。

## 1. 一条历史记录应保留什么

| 字段 | 记录规则 |
| --- | --- |
| 厂商关系 | 区分设计者、制造者、授权者和整机采用者。Apple 采用 Motorola CPU 的记录不计为 Apple 自研芯片发布。 |
| 家族、架构、代号、型号 | 分列保存；同一营销代际可以包含多个架构，同一架构也可以跨多个营销代际。 |
| 市场 | 桌面、笔记本、服务器、工作站、嵌入式、手机/平板、可穿戴；定制 SoC 单列。 |
| 时间与精度 | 保存原始时间文字，以及“年/月/日/季度”精度。不将 Q2 改写为 6 月。 |
| 事件类型 | 架构披露、产品宣布、预售、上市、批量出货、整机可用、停产分别记录；同一芯片可以有多条事件。 |
| 规格 | 指令集、微架构、核/线程、频率、缓存、内存、封装/工艺、功耗口径；不同配置不能只用同一产品名合并。 |
| 价格 | 原始币种、地区、公布日期、计价对象（裸 CPU/整机）、批量/OEM/零售口径；当前二手价格不是发布价。 |
| 当时评价 | 保存评测日期、原文结论、负载和对照机型；“发布时评价”和多年后的回顾分别记录。 |
| 后续变化 | BIOS、微码、系统调度、编译器、漏洞缓解及返修事件；不要以今天的软件状态代替首发状态。 |
| 证据状态 | 已读原文、仅检索摘要、目录定位、待核实分别标注；资料缺失保留空值。 |

上表是本次材料的采集规则，并不表示每一代都已经取得所有字段。

## 2. 可直接复用的官方基准资料

| 来源 | 用途 | 评价时必须保留的限制 |
| --- | --- | --- |
| [Geekbench 历史版本与系统要求](https://www.geekbench.com/legacy/) | 判断旧系统可以运行哪个版本；核对跨版本可比性 | 官方明确不同大版本分数不能直接比较。旧 CPU 没有 GB6 分数不代表性能为零，也不应补估值。 |
| [Geekbench 5 CPU Workloads](https://www.geekbench.com/doc/geekbench5-cpu-workloads.pdf) | 追查 GB5 工作负载和计分基准 | 讨论 GB5 结果时引用 GB5 的定义，不能套用后来版本。 |
| [Geekbench 6.6 更新说明](https://www.geekbench.com/blog/2026/02/geekbench-66/) | 核查小版本之间的兼容范围 | 该说明明确 6.6 与 6.3、6.4、6.5 的分数可比；不要自行扩大到所有小版本。 |
| [Geekbench 7 发布说明](https://www.geekbench.com/blog/2026/07/geekbench-7/) | 记录 2026-07-23 的新大版本节点 | GB7 与历史 GB5/GB6 分列，不因来自同一个工具就直接串联。 |
| [Geekbench 7.1 更新说明](https://www.geekbench.com/blog/2026/09/geekbench-71/) | 记录截至本次读取日的版本变化 | 官方明确 7.1 CPU 分数与 7.0 可比，但 GPU 分数并非完全可比；CPU/GPU 的兼容性结论应分开。 |
| [Cinebench 技术说明](https://www.maxon.net/en/tech-info-cinebench) | 查当前测试负载、最低运行时长、内存及指令集要求 | 当前页面为 Cinebench 2026，分数重标定，不能与旧版混用；程序不测整机墙上功耗，单凭得分不能推出能效。 |
| [Cinebench 2024 发布说明](https://www.maxon.net/en/article/maxon-introduces-cinebench-2024) | 核对 2024 与 R23 的断点 | 官方明确 2024 分数不能直接与 R23 比较。 |
| [SPEC CPU2017 概览](https://www.spec.org/cpu2017/Docs/overview.html) | 理解速度/吞吐、整数/浮点、base/peak 的指标区分 | SPEC 同时测量 CPU、内存系统和编译器；并非脱离系统条件的芯片固有分数。 |
| [SPEC CPU2017 结果档案](https://www.spec.org/cpu2017/results/) | 查服务器提交结果与完整配置 | 阅读具体结果的插槽数、启用核心数、内存、编译选项和调优说明。 |
| [SPEC 历代 CPU 基准入口](https://www.spec.org/cpu/) | 找 CPU95、CPU2000、CPU2006 等历史资料 | 不同套件分列，避免用固定倍率换算。 |
| [SPEC CPU2026 概览](https://www.spec.org/cpu2026/docs/overview.html) | 补充截至本次读取日已经存在的新套件 | 官方文档单独解释 2017→2026 的迁移和指标，历史表不能默认所有新机器仍只用 CPU2017。 |
| [SPEC CPU2026 结果档案](https://www.spec.org/cpu2026/results/) | 查新套件的正式结果 | 不能与 CPU2017 得分直接拼表排名。 |

说明：测试工具作者是计分规则的一手来源；用户上传的结果仍是特定机器、特定环境的测量，不因托管在工具官方网站就自动成为受控对照实验。

## 3. 评价变化的可核查事件

这些事件用于补充“首发评测以外发生了什么”，不据此给整个品牌下总评。

| 时间 | 事件与可以确认的事实 | 一手证据 | 写作边界 |
| --- | --- | --- | --- |
| 1994-12-20 | Intel 宣布针对 Pentium 浮点除法缺陷按用户请求更换处理器。 | [Intel 当年 Form 8-K，附发布稿 Exhibit 99.1](https://www.intc.com/filings-reports/all-sec-filings/content/0000050863-94-000018/0000050863-94-000018.pdf) | 这是更换政策日期，不是缺陷首次发现日期；文中随机操作数概率是 Intel 当时的估计。 |
| 1995 | Cleve Moler 以亲历者身份记录 FDIV 事件、数学分析和 MATLAB 的规避处理。 | [MathWorks：A Tale of Two Numbers](https://www.mathworks.com/company/technical-articles/a-tale-of-two-numbers.html) | 该页面是论文入口；引用具体数学例子前继续读取全文，不能只从介绍页推导。 |
| 2018-01-03 公开；2017-06-01 向厂商报告 | Project Zero 公开推测执行侧信道研究，列出三类变体、具体实验 CPU 与 PoC 条件。 | [Jann Horn：Reading privileged memory with a side-channel](https://projectzero.google/2018/01/reading-privileged-memory-with-side.html) | 实验样本不是所有 Intel/AMD/Arm CPU 的统一受影响清单；报告日不等于公开日，也不能泛称各变体对所有架构相同。 |
| 2026-03-31 | Primate Labs 在 MSI Prestige 16 AI+ Panther Lake 笔记本对比 BOT 开关：GB6.3 单核 2955→3119、多核 16786→17705，均约 +5.5%；同文的 GB6.7 测试差异明显较小。 | [John Poole：Analyzing Geekbench 6 under Intel’s BOT](https://www.geekbench.com/blog/2026/03/analyzing-geekbench-6-under-intels-bot/) | 这是工具作者的特定版本受控测试，不是全产品线提升幅度；该文日期早于 6.7 正式发布，需保留所测版本状态。不能据此给厂商全部成绩统一扣除 5.5%。 |
| 2026-07-21，官方支持页复核日期 | Intel 支持页建议 Intel Default Settings，以及包含 0x12F 或更新微码的最新 BIOS，并列出符合资格型号的保修延长信息。 | [Intel 支持文章 000102331](https://www.intel.com/content/www/us/en/support/articles/000102331/processors.html) | 页面复核日不是 0x12F 首次发布时间；不把旧 0x12B 更新描述成截至本次读取日的最终建议。 |

AMD Phenom TLB erratum、Ryzen 首发 BIOS/调度变化，以及 Apple 各代软件兼容性，应在对应家族材料的证据足够时继续补充；这里不以二手记忆填入统一“影响百分比”。

待归档线索：[Intel 2024 年根因更新旧地址](https://community.intel.com/t5/Blogs/Tech-Innovation/Client/Intel-Core-13th-and-14th-Gen-Desktop-Instability-Root-Cause/post/1633239)仍有搜索摘要，但本次打开已重定向至 Intel 搜索页。其具体发布日期、老化机制及触发条件应取得原文归档后再逐项引用，不将摘要记为已读全文。

## 4. 如何摘录当时评价

建议将一条评价保存为下列结构：

```json
{
  "product": "精确型号及配置",
  "review_date": "原文发布日期",
  "measurement_date": null,
  "source_url": "原作者测试原文",
  "evidence_type": "独立实测 / 官方自测 / 用户样本",
  "baseline": "明确对照型号及配置",
  "workload": "应用名称、测试版本、场景及单位",
  "conditions": "整机、系统、BIOS、功耗、散热、内存和编译选项",
  "finding": "仅概括该负载得到的结果",
  "limits": "原文未公开的条件、样本数及不适用范围"
}
```

字段含义：`review_date` 与 `measurement_date` 分开，避免把发稿日当测试日；`evidence_type` 防止将厂商自测误写为独立评价；`baseline`、`workload` 与 `conditions` 约束百分比的适用范围。`null` 表示没有取得证据，不代表不存在。

## 5. 价格与“性价比”的材料边界

本轮首先建立家族时间线与原始来源，并未收齐所有家族的中国大陆首发价、OEM 合同价、整机售价和通胀调整值。后续讨论价格时，应保留当年发布稿的原币种及报价口径，再核对本地上市资料。Apple 整机起售价和 Intel/AMD 裸 CPU 建议价应分列；服务器的采购价格还应区分处理器、整机和软件授权费用。

不直接把“当时最快”“最佳游戏 CPU”“高能效”写入全年代通用结论。应写清楚该判断在哪一年、什么价格、何种软件和功耗限制下成立。
