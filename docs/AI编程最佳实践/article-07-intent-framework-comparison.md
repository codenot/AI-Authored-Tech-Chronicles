# 从模糊意图到可执行计划：五大 Agent 框架的意图理解与需求拆分机制对比

> **系列背景**：本文是《AI 编程最佳实践》第七篇。前六篇依次建立了从 AI 辅助开发概论、工具链选型、认知约束、团队工作流到知识复利与团队框架化落地的完整工程认知体系。本篇视角横向展开：面对同一个核心问题——「如何阻止 Agent 在意图不清的情况下直接写代码」——五个影响力显著的开源框架给出了截然不同的工程答案。分析基于各框架真实 SKILL.md / AGENTS.md 源码，不做理论推演。

**分析对象：**

- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — 「工程纪律优先」流派
- [obra/superpowers](https://github.com/obra/superpowers) — 「强制门控」流派
- [garrytan/gstack](https://github.com/garrytan/gstack) — 「YC Partner 诊断」流派
- [Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) — 「歧义量化收敛」流派
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — 「知识复利循环」流派

---

## 一、问题的起点：Vibe Coding 的工程代价

一个典型的多 Agent 开发会话里，Agent 在缺乏清晰意图的情况下会做什么？它会**合理化（rationalize）**——选择最符合表面语义的实现方向，跳过边界情况，跳过不做清单，跳过「为什么要这样做」，直接生成代码。

这不是模型能力问题，而是结构问题：当输入侧没有足够的约束，模型会沿概率梯度流向最低阻力路径。五个框架的出发点是一致的——**在执行之前建立结构化的意图约束**。但它们给出的答案，在设计哲学、操作粒度、可量化程度上存在根本性差异。

---

## 二、全局视角：五个框架的设计坐标系

在进入每个框架的机制细节之前，先给出完整的对比矩阵。这五张表是后续各章的索引地图。

### 2.1 信息来源与分析基准

分析严格基于各框架的公开源码，不做推断性延伸：


| 框架                       | 核心信息来源                                                                                                           | 意图层核心 Skill      | 规划层核心 Skill                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------- |
| **agent-skills**         | README + `idea-refine` / `spec-driven-development` / `planning-and-task-breakdown` + `spec` / `plan` 命令          | `idea-refine`    | `spec-driven-development` + `planning-and-task-breakdown` |
| **superpowers**          | README + `brainstorming` / `writing-plans` + `visual-companion`                                                  | `brainstorming`  | `writing-plans`                                           |
| **gstack**               | `office-hours` + `plan-ceo-review` / `plan-design-review` / `plan-eng-review` / `plan-devex-review` + `autoplan` | `office-hours`   | `plan-*-review` 多角色评审链                                    |
| **oh-my-codex**          | AGENTS.md + `deep-interview/SKILL.md` + `ralplan`                                                                | `deep-interview` | `ralplan`                                                 |
| **compound-engineering** | `ce-brainstorm/SKILL.md` + `ce-plan/SKILL.md`                                                                    | `ce:brainstorm`  | `ce:plan`                                                 |


### 2.2 根本设计哲学

五个框架都在解决同一个问题，但**根本假设截然不同**，这决定了它们所有设计决策的走向：


| 框架                       | 根本假设                          | 防止 Vibe Coding 的核心路径                                  |
| ------------------------ | ----------------------------- | ----------------------------------------------------- |
| **agent-skills**         | Agent 会合理化（rationalize）而非真正思考 | 强制文档优先，用防合理化检查表约束行为序列                                 |
| **superpowers**          | 任何软性约束都会被 Agent 绕过            | **HARD GATE**：无批准设计文档则物理阻断一切执行指令                      |
| **gstack**               | 用户自己往往不知道真正的问题是什么             | YC Partner 式强制诊断，检验需求是否值得被解决                          |
| **oh-my-codex**          | 模糊性是可量化的，可以数学化衡量              | **歧义评分（Ambiguity Score）**作为量化关门条件                     |
| **compound-engineering** | 工程知识应随每次迭代自我积累                | **复利循环**：Brainstorm → Plan → Work → Review → Compound |


### 2.3 意图理解层横向对比


| 维度         | agent-skills            | superpowers         | gstack                         | oh-my-codex       | compound-eng              |
| ---------- | ----------------------- | ------------------- | ------------------------------ | ----------------- | ------------------------- |
| **核心隐喻**   | 工程纪律                    | 物理门控                | YC Office Hours                | 歧义量化收敛            | 知识复利循环                    |
| **提问机制**   | 三阶段 ideation 收敛         | Socratic 单问         | 阶段路由的 forcing questions        | 加权维度评分驱动          | 规模自适应分级                   |
| **假设压力测试** | 反合理化检查表                 | 隐含于 Socratic 循环     | 五种显式对抗范例                       | 三种 Challenge Mode | Product Pressure Test（三级） |
| **可短路**    | ❌                       | ❌                   | ⚠️（smart-skip / escape hatch）  | ✅（`--quick` 模式）   | ✅（清晰需求自动跳过）               |
| **视觉辅助**   | ❌                       | ✅（Visual Companion） | ❌                              | ❌                 | ❌                         |
| **进度可见性**  | 低                       | 低                   | 低                              | 高（每轮打印维度明细）       | 中（规模分级提示）                 |
| **关门条件**   | one-pager / spec 完整（定性） | HARD GATE 解除（定性）    | 诊断问题与 premise challenge 通过（定性） | Score ≤ 阈值（定量）    | 规模评估通过（弹性）                |


### 2.4 规划层横向对比


| 维度               | agent-skills                 | superpowers    | gstack                                         | oh-my-codex                     | compound-eng               |
| ---------------- | ---------------------------- | -------------- | ---------------------------------------------- | ------------------------------- | -------------------------- |
| **任务粒度**         | XS-XL / 1-8+ 文件              | 2-5 分钟/步（最细）   | 按角色评审相位推进                                      | 由执行模式决定                         | Implementation Units（语义切片） |
| **切分策略**         | 垂直切片（功能路径优先）                 | TDD 驱动（先测试后实现） | 多角色规划评审链                                       | PRD + Test Spec 双轨配套            | 自适应类型分流（三级）                |
| **代码/测试要求**      | Acceptance + Verification 必填 | 每步必须含真实代码片段    | Failure modes / tests / observability / DX 显式化 | test-spec 必须独立成文件               | 每个实现单元必须含测试场景列表            |
| **多 Agent 协作**   | ❌                            | 有（子 Agent 执行）  | ✅（多评审 skill + dual voices）                     | ✅（Planner + Architect + Critic） | ✅（50+ 专职 Review Agent）     |
| **必须 Review 节点** | 无                            | 无              | Eng Review（默认必需）                               | Critic（强制且顺序执行）                 | Document Review（强制自动触发）    |


### 2.5 产出文档与知识积累


| 框架                       | 意图层文档                                | 规划层文档                                         | 跨会话持久化                 | 知识复利机制                    |
| ------------------------ | ------------------------------------ | --------------------------------------------- | ---------------------- | ------------------------- |
| **agent-skills**         | `docs/ideas/[idea-name].md`（可选保存）    | `SPEC.md` + `tasks/plan.md` + `tasks/todo.md` | ❌                      | ❌                         |
| **superpowers**          | `docs/superpowers/specs/*-design.md` | `docs/superpowers/plans/*.md`                 | ❌                      | ❌                         |
| **gstack**               | `~/.gstack/…/design-*.md`            | `plan.md` + `GSTACK REVIEW REPORT` 台账         | ✅ learnings + timeline | ✅ learnings 累积            |
| **oh-my-codex**          | `.omx/context/` + `.omx/specs/`      | `.omx/plans/prd-`* + `test-spec-`*            | ✅ state + memory       | ❌                         |
| **compound-engineering** | `docs/brainstorms/*-requirements.md` | `docs/plans/*-plan.md`                        | ✅ Session History      | ✅ `docs/solutions/`（自动检索） |


文档的作用定位有本质差异：

- **agent-skills / superpowers**：文档是**门控凭证**（存在即通过）
- **gstack**：文档是**评审台账**（每次评审追加写入、累积）
- **oh-my-codex**：文档是**流水线 Handoff 合约**（下游 Agent 必须读取，双文件缺一阻止执行）
- **compound-engineering**：文档是**知识资产**（`/ce:compound` 积累到 `docs/solutions/`，由 `learnings-researcher` 自动检索）

---

## 三、四代「执行门控」的演化路径

五个框架并非平行的同代方案，而是代表了「从意图到执行」门控机制的四个演化阶段。理解这个分类，是读懂后续每个框架深层设计决策的前提。

**第一代：存在性门控**（agent-skills、superpowers）

门控条件是文档的存在与否——二元判断，简单、确定、工程实现成本低。缺点是无法区分「文档存在但内容浮浅」和「文档存在且边界清晰」。superpowers 通过 HARD GATE 将存在性门控推到了理论上限：不只是检查文档，而是在文档未批准前物理阻断所有执行技能的调用。

**第二代：价值判断门控**（gstack）

门控条件是能否通过角色化的价值诊断——超越了「需求是否清楚」，直接问「这个需求是否值得被解决」。gstack 的 `office-hours` 是唯一在意图层引入产品价值验证的框架，代价是对 LLM 角色扮演质量的强依赖。

**第三代：量化收敛门控**（oh-my-codex）

门控条件是一个公开的数学评分——透明、可追踪、可配置。进度在每轮问答后实时显示，用户和 Agent 都知道「还差多少」。这是五个框架中对「模糊性」定义最工程化的尝试。

**第四代：复利循环门控**（compound-engineering）

门控机制不再是单次执行前的检查点，而是嵌入到完整工作循环的自我强化机制。每次循环积累的知识通过 `/ce:compound` 结构化入库，下次同类任务开始前由 `learnings-researcher` 自动检索注入——门控的起点质量随工作次数单调提升。

四代之间不存在谁淘汰谁的关系，而是面向不同场景维度的不同权衡。

---

## 四、agent-skills：工程纪律驱动的反合理化机制

> 信息来源：[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — `skills/idea-refine/SKILL.md` + `skills/spec-driven-development/SKILL.md` + `skills/planning-and-task-breakdown/SKILL.md` + `.claude/commands/spec.md` + `.claude/commands/plan.md`（main 分支），读取于 2026-04-22

### 设计假设

`agent-skills` 的核心假设是：Agent 的问题不在于「不会问问题」，而在于「会跳过质疑步骤」。解决路径是**用工程纪律约束 Agent 的行为序列**，而不是对话驱动的澄清。

### 意图层：`idea-refine` — 用结构化发散/收敛逼出真正可建的想法

最新 `idea-refine` 的重点，不是“帮用户多想几个方向”，而是把 ideation 做成一个有明确产物的收敛过程。源码把它拆成三个阶段：

```
Phase 1: Understand & Expand
Phase 2: Evaluate & Converge
Phase 3: Sharpen & Ship
```

翻成工程语义，就是：

- 先把原始想法展开：重述问题、补 3-5 个关键问题、生成 5-8 个变体
- 再把这些变体收敛：按用户价值、可行性、差异化做压力测试
- 最后输出 one-pager：把推荐方向、假设、MVP 边界、不做事项都写清楚

它最有代表性的设计，不是“发散”本身，而是**强制显式写出假设与不做事项**。源码给出的最终文档模板里，除了 `Problem Statement`、`Recommended Direction`、`MVP Scope`，还必须有：

- `Key Assumptions to Validate`
- `Not Doing (and Why)`
- `Open Questions`

这里最有价值的其实是 `Not Doing`。  
`agent-skills` 的思路不是帮 agent 想出更多功能，而是通过**刻意删减**来防止范围悄悄膨胀。

它还有一个很鲜明的风格：不是 yes-machine。源码明确要求要**诚实指出弱想法的问题**，而不是机械支持用户原始设想。这让 `idea-refine` 更像一个工程化的概念压缩器，而不是创意陪聊器。

### 规划层：`spec-driven-development` + `planning-and-task-breakdown`

`agent-skills` 的 planning 不是单独一份 plan，而是一条从 spec 到 tasks 的线性纪律链。README 里把总流程概括为：

```text
DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP
```

放到本文关注的前两步，就是：

```text
idea-refine → spec-driven-development → planning-and-task-breakdown
```

#### 4.1 `spec-driven-development`：先把“猜”变成共享真相

这个 skill 的核心思想，是：**没有 spec 的代码，本质上就是猜。**  
它要求在写任何代码之前，先写一份结构化规格，把“我们做什么、为什么做、怎么算完成”固定下来。

它要求 spec 至少覆盖六个区域：

1. Objective
2. Commands
3. Project Structure
4. Code Style
5. Testing Strategy
6. Boundaries

其中最能体现设计思想的是两个点。

**第一，假设必须先摊开。**  
源码要求在写 spec 之前，先列出 `ASSUMPTIONS I'M MAKING`。例如：这是 Web 应用还是原生应用？认证是 cookie 还是 JWT？数据库是不是 PostgreSQL？这些都不能让 agent 默默脑补。

**第二，把模糊要求改写成 success criteria。**  
源码举的典型例子是：“让 dashboard 更快”这种模糊要求，必须被重写成可验证指标，比如 LCP、数据加载时间、CLS。  
也就是说，`spec-driven-development` 的本质，是把自然语言要求转成**可验证的工程契约**。

#### 4.2 `planning-and-task-breakdown`：把 spec 切成可验证的垂直切片

这个 skill 的核心思想，是：好计划不是把工作罗列出来，而是把工作切成**单次可实现、可测试、可校验**的任务单元。

它的规划步骤很清楚：

1. 先进入只读 planning mode
2. 画 dependency graph
3. 按垂直切片拆任务
4. 给每个任务写 acceptance criteria / verification / dependencies / touched files
5. 在阶段之间放 checkpoint

它最关键的设计是**Vertical Slicing**。源码明确给了 bad vs good 对照：

- 坏切法：先做完全部数据库，再做全部 API，再做全部 UI
- 好切法：每个 task 都是一条完整功能路径，比如注册、登录、创建任务、查看任务列表

也就是说，它不是按技术层拆，而是按**用户可感知的端到端能力**拆。

另一个重要约束，是任务尺寸。当前版本不再像旧说法那样用时间估算，而是用文件数和复杂度校准：


| 规模  | 文件数 | 含义       |
| --- | --- | -------- |
| XS  | 1   | 单函数或配置改动 |
| S   | 1-2 | 单组件或单接口  |
| M   | 3-5 | 一条完整功能切片 |
| L   | 5-8 | 需要继续拆分   |
| XL  | 8+  | 过大，必须继续拆 |


它还给出了一条很实用的判断：**如果任务标题里已经出现 “and”，大概率其实是两个任务。**

### 产出文档

```
docs/ideas/[idea-name].md
  — `idea-refine` 的一页纸成果；在用户确认后保存，包含 Problem Statement、Recommended Direction、Key Assumptions、MVP Scope、Not Doing。

SPEC.md
  — `/spec` 命令默认把规格文档保存到项目根目录 `SPEC.md`。`spec-driven-development` 本身只要求“规格必须落到仓库文件中”，命令层把这个默认位置具体化了。

tasks/plan.md
  — `/plan` 命令默认写出的实现计划，承接 `SPEC.md`，包含架构决策、分阶段任务、风险与 checkpoint。

tasks/todo.md
  — `/plan` 命令默认写出的任务清单，服务于后续实现阶段的执行与跟踪。
```

### 核心 Trade-off

`agent-skills` 的优势在于：它把“工程纪律”编码得非常干净。它不是靠角色扮演或复杂编排来提高质量，而是靠**显式假设、显式边界、显式切片、显式验证**来减少 agent 自行脑补的空间。代价是：它的意图层和规划层都偏“文档纪律化”，对需要强交互、强评审博弈或多角色挑战的场景，不如 `gstack`、`oh-my-codex` 那么立体。它更像一套单 Agent 的高标准工程工作流，而不是一个多角色协同系统。

---

## 五、superpowers：HARD GATE 物理门控

> 信息来源：[obra/superpowers](https://github.com/obra/superpowers) — `skills/brainstorming/SKILL.md` + `skills/writing-plans/SKILL.md` + `skills/brainstorming/visual-companion.md`（main 分支），读取于 2026-04-22

### 设计假设

`superpowers` 的核心假设是：任何软性约束都会被 Agent 绕过，必须建立**物理阻断**——不是建议，是执行禁令。

### 意图层：`brainstorming` — 把“设计”做成不可跳过的前置门禁

`brainstorming` 的设计思想，远不只是“Socratic 问几个问题”。它真正的核心，是把**一切创造性工作都强制拉回到设计阶段**。源码开头就写得非常死：

> 在完成设计并获得用户批准之前，**不得调用任何实现类 skill，不得写代码，不得搭脚手架，不得采取任何实现动作**。  
> 这条规则适用于**每一个项目**，不管它看起来多么简单。

这就是 superpowers 的第一原则：**没有经过批准的设计，就不存在合法实现**。

它甚至专门写了一个反模式标题：**“这个需求太简单，不需要设计”**。  
源码的判断很明确：最简单的任务，恰恰最容易因为未经检查的假设而浪费工作。设计可以很短，但不能没有。

从流程上看，`brainstorming` 不是单一问答，而是一套完整设计流水线：

1. 先看项目上下文：文件、文档、最近提交
2. 如果涉及视觉问题，先单独发一条消息征求是否启用 **Visual Companion**
3. 一次只问一个问题，逐步澄清目的、约束、成功标准
4. 提出 2-3 条可行路径，并给出推荐
5. 分段展示设计，逐段征求确认
6. 写出 `design doc`
7. 做一次 spec 自检：占位符、矛盾、歧义、范围过大
8. 强制用户审阅 written spec
9. 只有用户批准后，才切换到 `writing-plans`

这意味着 `brainstorming` 的产物不是“对话更清楚了”，而是一份被审阅过的、可以进入 planning 的正式规格文档。

它还有两个很能体现设计哲学的细节。

**第一，强制“先选方案，再谈实现”。**  
源码要求永远给出 2-3 种 approach，而且要带 trade-off 和推荐理由。也就是说，它默认反对“边问边收敛到单一路径”的偷懒方式，而是强制让用户看到备选路径，先做方向判断。

**第二，视觉伴侣不是展示功能，而是消歧工具。**  
`visual-companion.md` 写得很清楚：只有当“看见”比“读到”更容易理解时，才用浏览器；而且视觉伴侣的启用必须是**单独一条消息**征求同意，不能夹在别的问题里。这背后的思想很克制：视觉不是装饰，而是为了处理布局、层级、原型、对比图这些文本天然表达不好的问题。

因此，`brainstorming` 的完整设计思想可以概括为一句话：  
**先把模糊想法压成被用户批准的设计文档，再允许系统进入实现世界。**

### 规划层：`writing-plans` — 把实现计划写到“低判断力工程师也不容易做错”

如果说 `brainstorming` 是设计门禁，那么 `writing-plans` 就是在把“已批准设计”翻译成**几乎无法误解的执行脚本**。它的开场假设非常尖锐，源码原意可以直接翻成：

> 写计划时，假设执行者对代码库几乎没有上下文，品味也不太可靠。  
> 你要把他需要知道的东西全部写清楚：改哪些文件、写什么代码、怎么测试、该查哪些文档。

这句话其实定义了它的全部风格：不是写给成熟工程师的“概要计划”，而是写给一个**会执行、但不会自主补全判断**的代理。

`writing-plans` 的设计思想有四个关键点。

**第一，先锁文件结构，再拆任务。**  
源码要求在列任务前，先明确每个文件要创建还是修改、它承担什么职责、文件边界怎么划。也就是说，在 superpowers 里，task decomposition 不是从功能点开始，而是从**责任划分**开始。

**第二，粒度极端细。**  
它要求每一步都是一个 2-5 分钟动作，例如：

- 写一个失败测试
- 跑它，确认失败
- 写最小实现
- 再跑，确认通过
- 提交

这和多数“任务列表”框架完全不同。它不是把任务拆到“半天一个 ticket”，而是拆到 agent 几乎不需要再思考切分策略。

**第三，计划里必须直接包含可执行内容。**  
源码里最核心的一条禁令是：

> 每一步都必须给出**真实代码**或**真实测试用例**。  
> “TODO: implement this” 之类的占位符被明确禁止。

这意味着 `writing-plans` 不是传统意义上的项目计划，而更像“带代码骨架的执行蓝图”。  
路径、代码片段、测试、命令、预期输出，都要求写在计划里。

**第四，TDD 不是原则，而是计划顺序本身。**  
它在 step granularity 示例里把顺序写死成：

1. 先写失败测试
2. 跑失败
3. 再写最小实现
4. 跑通过
5. 提交

也就是说，TDD 不只是 implementation 期间再提醒一次，而是已经预先嵌进了计划文档结构。

这就是 `writing-plans` 最有代表性的地方：  
它不是“把工作拆细”，而是把工作拆成一系列**顺序、内容、验证方式都已经写死的原子动作**。这让计划本身就成为下一阶段 agent 的上下文喂料，而不是还需要再次理解的抽象文档。

### superpowers 的真正特色：把“设计文档”和“执行计划”都变成硬门禁产物

很多框架也有意图层，也有规划层，但 superpowers 最鲜明的地方在于：**两个阶段都被做成了不可跳过的硬门禁**。

- `brainstorming` 负责产出被批准的规格文档
- `writing-plans` 负责产出可执行计划
- 两者之间有明确的用户审阅与批准节点
- 只有前一份文档被接受，后一阶段才允许发生

因此，superpowers 不是单纯“更强调设计”，而是把“先有批准设计，再有批准计划，再有实现”写进了技能系统本身。

### 产出文档

```
docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md
  — `brainstorming` 写出的规格文档；默认保存位置。源码也注明：如果用户对文档目录有明确偏好，可以覆盖这个默认路径。

docs/superpowers/plans/YYYY-MM-DD-<topic>.md
  — `writing-plans` 写出的执行计划；默认保存位置。同样允许被用户指定的路径覆盖。
```

### 核心 Trade-off

HARD GATE 让 superpowers 成为五个框架中**最不允许“先做再说”**的一套系统，这也是它最大的优点和代价。优点是：设计与计划质量都被显式固化，agent 很难在意图未定时直接冲进实现。代价是：流程偏重、文档成本高、对 TDD 和超细粒度计划依赖很强，在探索性实验、快速试错或弱测试场景下会显得笨重。视觉伴侣还额外引入了浏览器与图像生成环境的复杂度。

---

## 六、gstack：YC Partner 级的意图重构

> 信息来源：[garrytan/gstack](https://github.com/garrytan/gstack) — `office-hours/SKILL.md` + `plan-ceo-review/SKILL.md` + `plan-design-review/SKILL.md` + `plan-eng-review/SKILL.md` + `plan-devex-review/SKILL.md` + `autoplan/SKILL.md`（main 分支），读取于 2026-04-22

### 设计假设

`gstack` 的设计假设最激进：**用户自己往往不知道真正的问题是什么**。意图澄清不应当是「帮用户把需求说清楚」，而应当是「检验这个需求是否值得被解决」。

这一哲学体现在它的角色设定：`/office-hours` 默认按 YC Partner 风格做“高压诊断”。但最新版本也加入了 **Builder Mode**（面向 side project / hackathon / 研究型探索），在“商业验证强度”和“创意激发强度”之间做了显式分流。

### 意图层：`office-hours` — 高压诊断，而不是温和澄清

`office-hours/SKILL.md`（当前 main 分支仍为 `version: 2.0.0`）的核心思想不是“帮用户把需求说完整”，而是“逼用户暴露问题、证据与真实边界”。源码把这种姿态写得非常直白：**直接到让人不舒服的程度；第一遍回答通常只是打磨过的表层答案，真正的答案往往要追问到第二轮、第三轮才会出来。**

这也是它和其他框架最大的区别之一。其他框架多半把意图层设计成“收集信息”，而 gstack 把意图层设计成“诊断误判”。

`office-hours` 的六个 forcing questions，按源码语义翻成中文后，大致是这六类：

```
Q1 真实需求：
如果你的产品明天消失，谁会真的痛？不要说“感兴趣”，要说“会受影响”。

Q2 现有替代：
你的用户现在到底用什么笨办法在解决这个问题？这个笨办法的真实成本是什么？

Q3 极度具体：
说出那个最需要它的人。他是谁？做什么？什么会让他升职，什么会让他出问题？

Q4 最窄切口：
最小、最窄、这周就可能有人付钱的版本是什么？

Q5 观察与意外：
你有没有真正坐在旁边看过用户使用它？他们有哪些行为让你意外？

Q6 未来适配：
三年后，如果世界变了，这个产品会更不可或缺，还是更边缘？
```

它并不是每次都强行六问到底，而是按阶段路由：

- 还没有用户：重点问真实需求、现有替代、目标人群
- 已经有用户：重点问现有替代、最窄切口、真实观察
- 已经有付费用户：重点问最窄切口、真实观察、未来适配
- 纯工程/基础设施任务：只保留“现有替代”和“最窄切口”

这背后的设计很聪明：它并不迷信完整问卷，而是根据任务成熟度动态调整追问强度。

源码里还有一整段 `Anti-Sycophancy Rules`，本质上是在反“AI 讨好式回应”。它禁止的不是某几个句子，而是一整套模糊表达方式。翻成中文，就是：

> 不要说“这想法挺有意思”；要直接给立场。  
> 不要说“这个问题有很多种思考方式”；要明确说你现在站哪一边。  
> 不要说“你也许可以考虑……”；要明确说“这为什么不对”或者“这为什么成立”。  
> 不要说“这可能行”；要说“基于现有证据，我判断它行/不行，还缺什么证据”。

它还配了五种典型“拆穿幻觉”的追问范式，源码里的例子都很有代表性，翻成中文大致是：

- **市场太泛**：不要接受“我要做面向开发者的 AI 工具”，而要追问“到底替谁省掉每周 2 小时以上的哪件事”
- **社交赞美当需求**：不要接受“大家都觉得这个想法很好”，而要追问“有没有人付钱、催上线、因为原型坏掉而生气”
- **平台幻想**：不要接受“先把完整平台做出来”，而要追问“这周就可能被买单的那个最小切口是什么”
- **增长数据冒充战略**：不要接受“市场每年增长 20%”，而要追问“你的独特判断是什么”
- **模糊词替代设计**：不要接受“让 onboarding 更顺滑”，而要追问“到底哪一步掉人、掉多少、你看过真实使用吗”

最新版本还补了三个“弹性阀”：

- **Smart-skip**：如果前面回答已经覆盖后面问题，就跳过
- **Escape hatch**：如果用户明显不耐烦，只再问 1-2 个关键问题就进入下一阶段
- **Intrapreneurship adaptation**：把创业语境问题改写成企业内部创新语境，比如 sponsor、组织重组、内部推进阻力

换句话说，`office-hours` 不是一个“提问模板”，而是一个**高压问题诊断器**。它的意图设计核心不是归纳需求，而是先摧毁模糊表达，再逼出真实问题。

### 规划评审层：gstack 最有辨识度的设计特色

如果说 `office-hours` 负责把“问题说真”，那么 gstack 后面的这组 review skill 负责把“意图守住”。这正是 gstack 和多数框架拉开距离的地方：它没有把 planning 理解成单份计划文档，而是把 planning 拆成一条**多角色评审链**。

类似的结构在 `oh-my-codex` 里也能看到雏形（Planner / Architect / Critic），但 gstack 把它进一步做成了现实组织角色：CEO、设计、工程、开发者体验。它不只是“让多个 Agent 看一下”，而是把每一类角色的思维方式编码成独立 skill。

#### 6.1 CEO Review：先审方向，再审范围

对应 skill：`plan-ceo-review/SKILL.md`

`plan-ceo-review` 的核心思想，是把“计划评审”先提升到“方向评审”。它不是默认接受当前方案，而是先做一轮系统性的 premise challenge：这是不是对的问题？有没有更直接的路径？如果什么都不做会怎样？一年之后的理想状态是什么？当前计划是在靠近那个理想状态，还是在制造未来债务？

它最特别的设计，是把 review 显式做成四种模式，而不是隐含在审稿人脑子里：

> - **Scope Expansion**：主动扩大范围，寻找 10 倍价值、2 倍代价的版本  
> - **Selective Expansion**：保持当前范围为基线，但把值得扩的点逐一拿出来让用户挑  
> - **Hold Scope**：范围不动，只把方案打磨到足够稳  
> - **Scope Reduction**：像外科手术一样砍范围，只保留最小可交付价值

这种设计的关键，不是“给你四个选项”这么简单，而是把**范围决策前置**。源码明确要求：任何范围变化都必须由用户显式选择，不能默默加，也不能默默减。这让 CEO Review 变成了一层真正的“范围治理”。

它还有几个非常强的底层原则：

- **零静默失败**：任何失败都必须可见
- **每个错误都要有名字**：不能泛泛写“处理错误”
- **每条数据流都有影子路径**：除了 happy path，还要追 `nil`、空值、上游错误
- **图是必需品**：复杂流、状态机、决策树都要画出来
- **延后事项必须写入台账**：否则等于没决定

所以 `plan-ceo-review` 的本质，不是“产品经理 review 一下”，而是先决定这件事该做成多大、以什么野心做、哪些东西必须现在面对。

#### 6.2 Design Review：把交互意图具体化到无法偷懒

对应 skill：`plan-design-review/SKILL.md`

`plan-design-review` 的核心思想，是把“设计”从审美讨论，变成**可执行规格审查**。它的默认假设是：如果设计决策不够具体，工程实现时一定会退化成模板化输出。

它最有代表性的机制有三层：

第一层是**先评分，再补齐**。  
源码要求先给整体设计完整度打 0-10 分，然后不是停在“7 分还不错”，而是要明确说明：对这个计划来说，10 分长什么样；接着直接把缺失的设计决策补进计划里。

第二层是**Mockup 优先**。  
如果设计工具可用，而且计划里有 UI 范围，它默认先生成真实 mockup，再做后续评审。源码把这个要求写得非常重：没有视觉稿，纯文本描述不算真正的设计 review。

第三层是**反 AI Slop**。  
它专门有一整套 `AI Slop Risk` 检查，核心不是“风格好不好看”，而是“是不是又掉进了千篇一律的 AI SaaS 模板”。例如：

- 三栏 feature grid
- 图标套彩色圆圈
- “clean modern UI” 这种没有任何约束力的空话
- 把所有东西做成卡片
- 用泛化 hero 文案替代真正的品牌/行动设计

它的 7 个评审 pass 也都非常具体：信息架构、交互状态、情绪曲线、AI Slop 风险、设计系统一致性、响应式与无障碍、未决设计问题。  
这说明它的设计哲学是：**设计不是修辞，而是把“用户到底看到什么、在什么状态下看到、为什么这样看到”写到工程无法误读为止。**

#### 6.3 Eng Review：把意图压成工程门禁

对应 skill：`plan-eng-review/SKILL.md`

`plan-eng-review` 是 gstack 规划评审层里最硬的一层。源码对它的定位几乎没有模糊空间：**这是默认必需的唯一放行门禁**。CEO、Design、DX 都重要，但默认不阻断放行；Eng Review 才是真正决定“能不能往下走”的那一层。

它的核心思想，是把产品与体验层面已经确定的意图，压缩成一组不可回避的工程约束：

- 失败模式必须显式枚举
- 错误链路和补救路径必须命名
- 数据流既要看 happy path，也要看影子路径
- 可观测性、安全、回滚、部署部分失败都属于计划范围，不是上线后再补

源码里的几条原则几乎可以直接当工程宪法读：

> 所有静默失败都是严重缺陷。  
> 每个错误都必须说清楚：谁触发、谁捕获、用户看到什么、有没有测试。  
> 每个复杂流都必须有图。  
> 观测性和安全性不是附加项，而是范围的一部分。

这解释了为什么 gstack 要把 Eng Review 设成默认门禁：它不是在优化“代码风格”，而是在防止产品意图经过实现后变成不稳定系统。

#### 6.4 DX Review：把开发者是否愿意继续用，当成前置问题

对应 skill：`plan-devex-review/SKILL.md`

`plan-devex-review` 的核心思想，是把开发者体验从“附属文档质量”提升为“产品采用门槛”。  
源码一开始就把立场写得很重：它的目标不是给 plan 打分，而是让 plan 最终产出一个**值得开发者谈论和传播的体验**；分数只是结果，不是过程。

它的设计比一般 DX review 深很多，因为它不是直接评分，而是先做一整套“证据收集”：

1. **确认开发者画像**
  先问：目标开发者到底是谁？是 YC 创业者、平台工程师、前端开发者、后端 API 集成者，还是学生？
2. **写一段第一人称体验叙事**
  不是抽象分析，而是代入这个开发者，从 README、CLI help、docs 的真实路径走一遍，写出“他现在会看到什么、卡在哪里、感觉如何”。
3. **做竞争基准和 TTHW 比较**
  把自己的计划和 Stripe、Vercel、Firebase、Docker 这类标杆放在一起看，问 time-to-hello-world 要落在哪一档。
4. **定义 magical moment**
  不只是“能用”，而是“哪一刻让开发者从怀疑转为相信”。这个 moment 应该如何交付：浏览器 playground、copy-paste demo、视频、还是 guided tutorial。

在这套调查之后，才进入三种模式：

> - **DX Expansion**：把 DX 做成竞争优势  
> - **DX Polish**：不扩范围，但把每个触点打磨到足够稳  
> - **DX Triage**：只修那些会阻断采用的关键缺陷

它的真正独特之处在于：**先做同理心与旅程调查，再做评分**。这和普通 checklist 式 DX review 很不一样。它不是问“文档够不够”，而是问“开发者在第 2 分钟为什么放弃，在第 5 分钟为什么爱上你”。

#### 6.5 Final Approval Gate：把多角色意见收束成放行条件

这一层的作用，是把前面的分角色结论收束成一个统一放行判断。  
它通过 `GSTACK REVIEW REPORT` 和 readiness 判定，把“各自有道理”的多角色意见，压缩成一个可以继续执行、暂停修改或回退重审的状态。

这一步非常关键，因为多角色 review 最容易出的问题，就是每个人都提了一点意见，但没有一个统一的结束条件。gstack 在这里把“什么时候算评审完成”做成了显式状态机。

#### 6.6 `/autoplan`：把评审链编排成流水线

在这套体系里，`/autoplan` 的角色非常明确：它不是评审哲学本身，而是编排器。  
源码要求各阶段严格按 `CEO → Design → Eng → DX` 顺序执行，前一阶段没完成，后一阶段不得开始，也不能并行。这样做的目的，是让每一层 review 都建立在前一层已经澄清过的结论之上。

因此，gstack 的真正特色不是“有一个 `/autoplan` 命令”，而是**把规划阶段产品化成了一条多角色评审链**：  
先由 `office-hours` 逼出真实问题，再由 CEO、Design、Eng、DX 四类角色分别检验“这个意图是否还活着”，最后才进入执行。

```markdown
## GSTACK REVIEW REPORT
| Review        | Trigger             | Why                           | Runs | Status | Findings |
|---------------|---------------------|-------------------------------|------|--------|----------|
| CEO Review    | /plan-ceo-review    | Scope & strategy              | ...  | ...    | ...      |
| Codex Review  | /codex review       | Independent 2nd opinion       | ...  | ...    | ...      |
| Eng Review    | /plan-eng-review    | Architecture & tests (required)| ... | ...    | ...      |
| Design Review | /plan-design-review | UI/UX gaps                    | ...  | ...    | ...      |
| DX Review     | /plan-devex-review  | Developer experience gaps     | ...  | ...    | ...      |
```

### 产出文档

```
~/.gstack/projects/{SLUG}/{timestamp}-design-{name}.md — 设计文档
plan.md （含累积追加的 GSTACK REVIEW REPORT）

# 跨会话持久化（本地，不上传）
~/.gstack/analytics/skill-usage.jsonl    — 技能使用记录
~/.gstack/analytics/eureka.jsonl         — 第一性原理发现日志
~/.gstack/analytics/reviews.jsonl        — 评审与门禁日志（用于 readiness 判断）
~/.gstack/projects/{SLUG}/learnings.jsonl — 跨会话学习积累
~/.gstack/projects/{SLUG}/timeline.jsonl  — 会话时间线
~/.gstack/projects/{SLUG}/checkpoints/   — 进度快照
```

gstack 是五个框架中产出文档最多、跨会话持久化体系最完整的。它的 `learnings.jsonl` 机制把每次会话的「有价值发现」写入本地数据库，下次相关任务开始时自动检索并注入上下文。

### 核心 Trade-off

最新 gstack 的优点是“诊断深度 + 评审深度 + 经验沉淀”三位一体，但代价也更明显：流程复杂度和运行成本进一步上升。`/autoplan` 的多相位评审、双模型 outside voices、文档化门禁都提升了可靠性，同时也提高了首次接入门槛。YC Partner 风格虽然强力，但在纯技术修复或轻量内部任务上，若不切换到合适模式，容易出现“过度诊断”。

---

## 七、oh-my-codex：把「模糊性」数学化

### 设计假设

`oh-my-codex` 的核心假设是：模糊性（ambiguity）是可以量化的。不需要主观判断「需求是否足够清楚」，一个评分公式、一个阈值，阈值达到了就解锁下一阶段。

### 意图层：`deep-interview` — 歧义评分驱动的苏格拉底循环

**核心：带权歧义评分公式**

Greenfield 项目：

```
ambiguity = 1 - (
  intent_clarity    × 0.30 +
  outcome_clarity   × 0.25 +
  scope_clarity     × 0.20 +
  constraint_clarity× 0.15 +
  success_clarity   × 0.10
)
```

Brownfield 项目（额外加入代码库理解度维度）：

```
ambiguity = 1 - (
  intent_clarity    × 0.25 +
  outcome_clarity   × 0.20 +
  scope_clarity     × 0.20 +
  constraint_clarity× 0.15 +
  success_clarity   × 0.10 +
  context_clarity   × 0.10
)
```

评分结果直接决定何时可以停止提问：


| 模式               | 目标阈值   | 最多轮数 |
| ---------------- | ------ | ---- |
| `--quick`        | ≤ 0.30 | 5 轮  |
| `--standard`（默认） | ≤ 0.20 | 12 轮 |
| `--deep`         | ≤ 0.15 | 20 轮 |


每轮提问结束后，系统打印加权维度明细和下一个目标维度：

```
Round 4 | Target: scope_clarity | Ambiguity: 34%

[Clarity Breakdown]
  intent_clarity:      0.85  (weight 0.30, contribution: 0.255)
  outcome_clarity:     0.70  (weight 0.25, contribution: 0.175)
  scope_clarity:       0.30  (weight 0.20, contribution: 0.060)  ← weakest
  constraint_clarity:  0.75  (weight 0.15, contribution: 0.112)
  success_clarity:     0.60  (weight 0.10, contribution: 0.060)

Current ambiguity: 0.338  |  Standard threshold: 0.20  |  Gap: 0.138

[Readiness Gates]
  Non-goals:           ❌ NOT YET EXPLICIT
  Decision Boundaries: ❌ NOT YET EXPLICIT
  Pressure pass:       ❌ NOT COMPLETE

Next question target: scope_clarity
```

**三阶段压力测试（Challenge Modes）**

当歧义评分连续 3 轮变化 < ±0.05（陷入停滞）时，自动激活：

```
Contrarian   (第 2 轮+，或发现未测试假设时)
  动作：直接挑战核心假设，要求提供反例或边界证据

Simplifier   (第 4 轮+，或范围扩张速度快于目标清晰度)
  动作：追问「最小版本是什么？如果预算只有 1/10，做什么？」

Ontologist   (第 5 轮+，且 ambiguity > 0.25)
  动作：重构本质，停止讨论症状——「你实际上在解决的是什么？」
```

三种模式在 `deep-interview` 中被显式追踪，防止重复使用同一种挑战方式让用户产生疲劳适应。

**强制预检（Phase 0: Preflight Context Intake）**

在问任何问题之前，系统必须先写入一个上下文快照：

```json
// .omx/context/{slug}-20260409T004500Z.md
{
  "task_statement": "...",
  "desired_outcome": "...",
  "stated_solution": "用户提出的初始方案",
  "probable_intent_hypothesis": "为什么用户可能想要这个（AI 推断）",
  "known_facts_evidence": [],
  "constraints": [],
  "unknowns_open_questions": [],
  "decision_boundary_unknowns": [],
  "likely_codebase_touchpoints": []
}
```

这个文件是所有后续 Agent（`ralplan`、`ralph`、`team`）的**共享合约**——它们读取这个文件作为需求来源，而不是从对话历史重新推断。

**两个强制门禁（Readiness Gates）**

即使加权歧义评分已经低于阈值，只要以下两项未明确，循环也不会结束：

```
Non-goals          — 「明确不做什么」必须被显式写出
Decision Boundaries — 「Agent 可以自决的边界」必须被明确
```

缺少这两个维度，下游执行 Agent 会在边界情况下自行填充假设，产生隐性的范围蔓延。

### 规划层：`ralplan` — 三 Agent 共识循环

`ralplan` 是 `$plan --consensus` 的快捷方式，触发一个三角对话：

```
Planner   → 生成初始方案 + RALPLAN-DR 结构化摘要
              ├── Principles (3-5 条，这个方案的设计原则)
              ├── Decision Drivers (top 3，影响方向的关键因素)
              └── Viable Options (≥2，含约束范围内的 pros/cons)

Architect → 依次提供（必须顺序完成，不能并行）：
              ├── 最强 steelman 反驳论点（antithesis）
              ├── 至少 1 个真实的 tradeoff 张力
              └── 可能的合题（synthesis）

Critic    → 验收，检查以下全部：
              ├── 原则-选项一致性（选项是否遵循 Principles）
              ├── 备选方案是否被公平评估
              ├── 风险缓解是否有具体措施
              ├── 验收标准是否可测试
              └── 验证步骤是否具体
```

`Architect` 和 `Critic` 必须顺序执行（源码注释：`Do NOT issue both agent calls in the same parallel batch`），目的是确保 Critic 看到 Architect 的评审结果后再给出结论，保留两个观点之间的张力。

**执行门控（Planning Gate）**

`ralplan` 对下游 `ralph`（持续执行模式）和 `autopilot` 有明确的接收条件：

```
Planning is complete ONLY after both artifacts exist:
  .omx/plans/prd-{slug}.md
  .omx/plans/test-spec-{slug}.md

Until BOTH exist:
  DO NOT begin implementation
  DO NOT execute implementation-focused tools
```

「双文件配套」是 oh-my-codex 最有特色的门控设计，两个文件缺一则阻止执行：

```markdown
### Good vs Bad Prompts

Passes the gate (specific enough):
  ✅ ralph fix the null check in src/hooks/bridge.ts:326
  ✅ autopilot implement issue #42
  ✅ team add validation to function processKeywordDetector

Gated — redirected to ralplan (needs scoping first):
  ❌ ralph fix this
  ❌ autopilot build the app
  ❌ team improve performance
  ❌ ralph add authentication
```

### 产出文档

```
# 意图层（deep-interview）
.omx/context/{slug}-{timestamp}.md      — 预检上下文快照（Phase 0）
.omx/interviews/{slug}-{timestamp}.md   — 完整访谈记录
.omx/specs/deep-interview-{slug}.md     — 执行就绪规格文档

# 规划层（ralplan）
.omx/plans/prd-{slug}.md               — PRD（解锁执行的必需文件之一）
.omx/plans/test-spec-{slug}.md         — 测试规格（解锁执行的必需文件之一）

# 运行时（可恢复）
.omx/state/                            — 模式状态（支持中断恢复）
.omx/notepad.md                        — 会话便签
.omx/project-memory.json              — 跨会话记忆
```

### 核心 Trade-off

量化歧义是 oh-my-codex 最有工程严谨性的设计，但权重本身（intent 0.30，outcome 0.25 等）是人工先验，不同领域可能需要重新标定。框架对 Codex CLI 的原生工具（`request_user_input`、`state_write`、`state_read`）有强依赖，迁移到其他运行时环境有适配成本。

---

## 八、compound-engineering-plugin：知识复利循环

> 信息来源：[EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — `ce-brainstorm/SKILL.md` + `ce-plan/SKILL.md`，读取于 2026-04-22

### 8.1 设计理念与核心思想

这一套框架的起点，不是“如何把单次任务做对”，而是“如何让下一次任务变得更容易”。它在 `ce-brainstorm/SKILL.md` 里把定位写得很清楚：头脑风暴回答的是 **WHAT**（做什么），`/ce-plan` 回答的是 **HOW**（怎么做），并且要求产物是能被后续阶段持续复用的**耐久文档**，而不是一次性对话记录。

结合 `ce-plan/SKILL.md` 的原则，Compound 的核心思想可以概括为三点（以下均为源码语义直译）：

> 1. “如果 `ce-brainstorm` 已产出需求文档，规划必须以它为真相来源，而不是重新发明行为定义。”
> 2. “规划阶段产出的是决策，不是代码。”
> 3. “在结构化计划之前，先研究代码库、组织经验和外部参考。”

这三条合在一起，实际上定义了它的方法论：**先把产品语义固化，再把技术决策结构化，再把知识沉淀可复用化**。因此它不是单次门控系统，而是一个“文档驱动 + 研究驱动 + 复利驱动”的长期工程系统。

### 8.2 意图层：`ce:brainstorm` — 规模自适应的三级分流

`ce:brainstorm` 的意图层不是固定问卷，而是“先判定是否值得深聊，再决定深聊到什么程度”的路由器。其关键不是提问数量，而是**分流策略**：

**第一步：先判断是否要进入完整 brainstorm**

源码把“可直接跳过深度澄清”的条件写成了四个清晰信号（中文直译）：

> - 已给出具体验收标准  
> - 已指定要遵循的现有模式  
> - 已描述明确的期望行为  
> - 作用范围受限且边界清楚

如果满足，`ce:brainstorm` 会“保持交互简短”，并直接跳过深挖阶段（跳过 1.1/1.2，进入 1.3 或文档阶段）。这和 superpowers 的强制深挖不同，它允许“清晰需求快速通行”。

**第二步：按任务规模施加不同强度的产品压力测试**

源码在 `Product Pressure Test` 里明确区分 `Lightweight / Standard / Deep` 三档，且问题强度逐级上升：

> - 轻量：是否真在解决用户问题？是否重复造轮子？有无近零成本替代？  
> - 标准：这是根因还是症状？若不做会怎样？当前最高杠杆动作是什么？  
> - 深度：除标准问题外，再追问“6-12 个月的持久能力”与“是否只是局部补丁”

这意味着它在意图层不是“一律高压审问”，而是把认知成本按任务价值分配，这一点在实际团队里更可持续。

**第三步：文档先过审，再交接下一阶段**

`ce-brainstorm` 在文档阶段还有一个硬动作：当需求文档创建或更新后，先运行 `document-review`，再展示下一步选项；若存在残余 P0/P1，先提示再决定是否继续。这相当于把“意图质量检查”内置成流水线节点，而不是可选建议。

### 8.3 规划层：`ce:plan` — 需求文档作为唯一信源

`ce:plan` 的核心不是“把任务拆细”，而是把上游语义约束转译成可执行的工程决策结构。源码中最关键的三个约束（中文直译）是：

> 1. “使用需求作为真相来源”
> 2. “产出决策，而不是代码”
> 3. “先研究，再定型”

对应到具体行为，它有四个非常“工程化”的规划动作：

**A. 来源优先（Origin-first）**

它会先在 `docs/brainstorms/` 搜索 `*-requirements.md`，找到相关文档后将其作为 origin 输入，并要求保留：问题框架、需求与成功标准、范围边界、关键决策、依赖假设、未决问题。也就是说，规划层默认不能“重写产品定义”。

**B. 研究优先（Research-first）**

在结构化计划前，先并行调用仓库研究、历史经验（`docs/solutions/`）、必要时外部文档研究，再整合成 planning context。`ce-plan` 强调：先看已有模式和已知坑，再谈新设计。

**C. 单元化落地（Implementation Units）**

它要求把计划拆成可原子落地的实现单元（U-ID 稳定编号），每个单元必须包含：目标、需求映射、依赖、文件路径、方法、参考模式、测试场景、验证标准。这里的重点是“单元可执行 + 可追踪”，而不是“步骤越细越好”。

**D. 计划与执行强隔离**

源码明文要求：`ce-plan` 不实现代码、不跑测试、不做运行时验证；这些属于 `ce-work`。这条边界很关键，它防止“边规划边实现”导致的计划漂移。

### 8.4 与众不同之处：Compound（复利）循环体系

如果只看 `ce:brainstorm` 与 `ce:plan`，你会觉得它只是“更强调文档与研究”的框架；它真正和其他框架拉开差距的，是**把经验沉淀做成默认路径，而不是事后美德**。

完整循环是：

```text
Brainstorm → Plan → Work → Review → Compound → 下一轮 Brainstorm/Plan
```

其中 `Compound` 阶段会把本轮产出的可复用结论写入 `docs/solutions/`。而在下一轮 `ce-plan` 的 Phase 1，本地研究步骤又会显式检索这些 institutional learnings。于是形成闭环：

1. 本轮决策被结构化存档
2. 下轮规划被自动注入历史经验
3. 团队对同类问题不再从零推理

这就是它最“与众不同”的地方：它把“知识复用”从可选项变成流程内生机制。前面四个框架更多是在优化“这一次别做错”，Compound 则额外优化“下一次更快更稳”。

### 8.5 产出文档

```text
docs/brainstorms/*-requirements.md  — 需求文档（意图层产出，承上启下的合约）
docs/plans/*-plan.md                — 执行计划（规划层产出，不包含具体代码，只包含策略）
docs/solutions/                     — 知识积累库（/ce:compound 动作写入的核心资产池，供后续自动检索）
```

### 8.6 核心 Trade-off

这种极度重视知识复利的设计前提是**针对同一仓库的长期持续运转**。对于一次性任务、或少于 5 次工作循环的短期试验性项目，维护 `docs/solutions/` 及其相关上下文配置的需求成本难以带来显著收益。此外，当前版本（v2.63）在执行依赖上与特定 CLI 环境（Claude Code）存在深度绑定，跨平台转移会有一定的适配维护门槛。

---

## 九、选型建议


| 场景             | 推荐框架                                   | 核心理由                                  |
| -------------- | -------------------------------------- | ------------------------------------- |
| 企业工程团队规范化推广    | **agent-skills**                       | 生命周期对齐，文档驱动文化兼容，易于团队培训                |
| 严格 TDD 的后端服务开发 | **superpowers**                        | HARD GATE + No-Placeholder 执行纪律最强     |
| 产品方向验证 / 创业早期  | **gstack**                             | office-hours 的 YC 诊断是意图层最深的探索         |
| 需求不明确的长周期复杂项目  | **oh-my-codex**                        | 量化进度透明，收敛可追踪，中断可恢复                    |
| 长期跟踪、知识积累的团队项目 | **compound-engineering**               | Compound 循环将知识积累转化为内生执行优势             |
| 轻量实验 / 快速原型    | **compound-engineering / oh-my-codex** | 一个支持清晰需求短路，一个提供 `--quick` 模式，前置门控弹性更高 |


---

## 十、工程本质

五个框架解决的是同一个问题的不同侧面：**在 AI 工具大规模介入软件开发过程中，如何防止「执行速度」超过「意图清晰度」**。

传统软件开发中，人类工程师之间的需求对齐靠的是社会成本（会议、文档、代码 Review）来约束执行速度。Agent 的执行速度消除了这个摩擦，但同时也消除了摩擦带来的强制对齐效果。

五个框架本质上是在重建这个约束——用代码的方式，把原本依赖社会成本的流程，编码成 Agent 无法绕过的结构化障碍。

从「文档是否存在」到「歧义评分是否低于阈值」，再到「本次解决的问题是否已积累入库」，这个演化方向是清晰的：把主观判断转化为可量化的工程指标，把软性约定转化为物理执行门控，把单次执行的质量提升转化为跨会话的知识复利。这和传统软件工程里从「人工代码 Review」到「CI/CD 自动拦截」的演化路径，在结构上完全同构。

---

*作者：[AI-Authored Tech Chronicles]*
*系列：《AI 编程最佳实践》第七篇*
*分析基于：agent-skills（addyosmani/agent-skills main 分支，idea-refine + spec-driven-development + planning-and-task-breakdown + spec/plan commands）、superpowers（obra/superpowers main 分支，brainstorming + writing-plans + visual-companion）、gstack（garrytan/gstack main 分支，office-hours + plan-ceo/design/eng/devex-review + autoplan）、oh-my-codex（Yeachan-Heo/oh-my-codex main 分支，deep-interview + ralplan）、compound-engineering-plugin v2.63（EveryInc/compound-engineering-plugin，ce-brainstorm/SKILL.md + ce-plan/SKILL.md），资料读取于 2026-04-22*