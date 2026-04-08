# 从模糊意图到可执行计划：四大 Agent 开发框架的意图理解与需求拆分机制对比

> **系列背景**：本文是《AI 编程最佳实践》第八篇。前七篇依次建立了从 AI 辅助开发概论、工具链选型、认知约束、团队工作流、知识复利（compound-engineering）到自改进 Agent 的完整工程认知体系。本篇视角横向展开：面对同一个核心问题——「如何阻止 Agent 在意图不清的情况下直接写代码」——四个影响力显著的开源框架给出了截然不同的工程答案。分析基于各框架真实 SKILL.md / AGENTS.md 源码，不做理论推演。

**分析对象：**
- [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) —「工程纪律优先」流派
- [`obra/superpowers`](https://github.com/obra/superpowers) — 「强制门控」流派
- [`garrytan/gstack`](https://github.com/garrytan/gstack) — 「YC Partner 诊断」流派
- [`Yeachan-Heo/oh-my-codex`](https://github.com/Yeachan-Heo/oh-my-codex) — 「歧义量化收敛」流派

---

## 一、 分析框架与信息来源

基于各框架真实 SKILL.md / AGENTS.md 源码，我们从以下核心维度提取了分析数据，拒绝脱离源码的纯理论推演：

| 框架 | 核心信息来源 | 意图层核心 Skill | 规划层核心 Skill |
|---|---|---|---|
| **agent-skills** | README + lifecycle | `idea-refine` | `spec-driven-development` |
| **superpowers** | README | `brainstorming` | `writing-plans` |
| **gstack** | SKILL.md + `office-hours/SKILL.md` | `office-hours` | `plan-eng-review` (强制) |
| **oh-my-codex** | AGENTS.md + `deep-interview` 源码 | `deep-interview` | `ralplan` |

---

## 二、 核心设计哲学对比

这四个框架都在解决同一个问题：**如何阻止 Agent 在意图不清的情况下直接写代码**。但它们的根本假设截然不同，这决定了它们后续所有 Skill 的设计走向：

| 框架 | 根本假设 | 防止 Vibe Coding 的路径 |
|---|---|---|
| **agent-skills** | Agent 会合理化（rationalize）而非真正思考 | 强制文档优先，用防合理化表约束行为序列 |
| **superpowers** | Agent 会跳过设计直接进入实现 | **HARD GATE**：无批准的设计文档则物理阻止执行 |
| **gstack** | 创始人/Builder 自己并不知道真正的问题 | 用 YC Partner 式强迫提问重构问题本质 |
| **oh-my-codex** | 模糊性是可量化的，可以数学化衡量 | **歧义评分（Ambiguity Score）**作为量化关门条件 |

---

## 三、问题的起点：Vibe Coding 的工程代价

先量化这个问题的规模。

一个典型的多 Agent 开发会话里，Agent 在缺乏清晰意图的情况下会做什么？它会**合理化（rationalize）**——选择最符合表面语义的实现方向，跳过边界情况，跳过不做清单，跳过「为什么要这样做」，直接生成代码。

这不是模型能力问题，而是结构问题：当输入侧没有足够的约束，模型会沿概率梯度流向最低阻力路径。四个框架的出发点是一致的——**在执行之前建立结构化的意图约束**。但它们给出的答案，在设计哲学、操作粒度、可量化程度上存在根本性差异。

---

## 四、agent-skills：工程纪律驱动的反合理化机制

### 设计假设

`agent-skills` 的核心假设是：Agent 的问题不在于「不会问问题」，而在于「会跳过质疑步骤」。解决路径是**用工程纪律约束 Agent 的行为序列**，而不是对话驱动的澄清。

### 意图层：`idea-refine` — 三段式发散/收敛

```
Phase 1 (Understand): 穷举可能的解读方式，识别隐藏假设
Phase 2 (Evaluate):   可行性过滤、风险识别
Phase 3 (Sharpen):    生成「Not Doing」列表 + 可量化成功标准
```

最有价值的产出不是方案本身，而是 **Out-of-Scope 列表**。这个设计迫使 Agent 从「要做什么」切换到「边界在哪里」——后者往往是更难回答、也更重要的问题。

框架内嵌了一张**反合理化表格（Anti-Rationalization Table）**，枚举了 Agent 的典型自我欺骗行为：

| 行为模式 | 被标记为 |
|----------|----------|
| 「先实现核心功能，后面再加验证」 | shortcut |
| 「用户可以通过文档理解这个行为」 | assumption |
| 「这个边界情况发生概率很低」 | rationalization |

### 规划层：`spec-driven-development` + `planning-and-task-breakdown`

门控流程是严格线性的：

```
Specify → Plan → Tasks → Implement
   ↑
  PRD 文档必须存在，才能进入下一阶段
```

`planning-and-task-breakdown` 的核心设计是**垂直切片（Vertical Slicing）**：每个任务单元必须产生端到端可测试的功能路径，而不是横向的技术层（「先写完所有 API，再写 UI」这种切法会被显式禁止）。

任务规模限制：

| 规模 | 时间估计 | 处理方式 |
|------|----------|----------|
| XS | < 30 min | 直接执行 |
| S | < 2 h | 直接执行 |
| M | < 4 h | 直接执行 |
| L | < 8 h | 标记风险，建议拆分 |
| XL | > 一天 | 必须拆分，阻止直接执行 |

### 产出文档

```
SPEC.md    — PRD（含验收标准，门控凭证）
TASKS.md   — 任务列表（XS-XL 分级）
```

文档路径由用户约定，框架本身不强制统一存储位置。

### 核心 Trade-off

`agent-skills` 是为**工程规范化**设计的，对快速迭代场景偏重。它不提供多 Agent 协作机制——单 Agent 模型，强约束，强纪律。

---

## 五、superpowers：HARD GATE 物理门控

### 设计假设

`superpowers` 的核心假设是：任何软性约束都会被 Agent 绕过，必须建立**物理阻断**——不是建议，是执行禁令。

### 意图层：`brainstorming` — Socratic 单问 + 视觉伴侣

`brainstorming/SKILL.md` 里的关键段落，直接引用源码：

```markdown
**HARD GATE:** Do NOT invoke any implementation skill, write any code,
scaffold any project, or take any implementation action. Your only
output is a design document.
```

这不是约定，是技能层面的执行禁令。在 `brainstorming` 完成之前，所有的 `implement`、`plan-task`、`ship` 等技能都无法被调用。

`brainstorming` 的独特机制是**视觉伴侣（Visual Companion）**：对于 UI/UX 相关任务，它会生成 wireframe 或原型草图，目的是把抽象文字意图转化为视觉锚点，消除「言语歧义」这个特定类别的模糊性。这是四个框架中唯一引入视觉媒介做意图消歧的。

### 规划层：`writing-plans` — 极端粒度化

`writing-plans` 的规划粒度是四个框架中最细的，有三条强约束：

**约束 1：每步 2-5 分钟**

不是「尽量细」，是有数字上界的硬性要求。超过这个粒度的步骤必须拆分。

**约束 2：No-Placeholder Policy（直接引自源码）**

```markdown
Every step must include actual code snippets or test cases.
"TODO: implement this" is explicitly forbidden.
```

禁止在计划里写占位符。每一步都必须包含真实可运行的代码片段或测试用例。这保证了计划文档本身就是「可直接执行的上下文投喂材料」，而不是需要二次解读的高层描述。

**约束 3：TDD 强制顺序**

测试步骤必须在实现步骤之前出现在计划中，且测试步骤要比实现步骤更具体。

### 产出文档

```
design-doc.md   — 设计方案（HARD GATE 的解锁凭证，存在即通过）
plan.md         — 执行计划（含真实代码片段，2-5 分钟/步粒度）
```

### 核心 Trade-off

HARD GATE 是四个框架中执行约束最强的，但强 TDD 依赖让它在非测试驱动的领域（ML 实验性工作、探索性分析）适配性差。视觉伴侣工具增加了环境复杂度，要求运行时支持图像生成能力。

---

## 六、gstack：YC Partner 级的意图重构

### 设计假设

`gstack` 的设计假设最激进：**用户自己往往不知道真正的问题是什么**。意图澄清不应当是「帮用户把需求说清楚」，而应当是「检验这个需求是否值得被解决」。

这一哲学背景直接体现在框架的 persona 设定——它模拟的不是产品经理，而是 YC 合伙人。

### 意图层：`office-hours` — 六个强迫性问题

`office-hours/SKILL.md`（v2.0.0）的核心是六个**必须逐一回答**的强迫性问题：

```
Q1: Demand Reality
「如果你的产品明天消失，谁会真的崩溃？给我具体行为，不是感受。」

Q2: Status Quo
「你的用户现在用什么破方法解决这个问题？那个方法的真实成本是多少？」

Q3: Desperate Specificity
「告诉我一个具体的人名、职位。他什么事情会让他被炒，什么事情让他升职？」

Q4: Narrowest Wedge
「最小版本是什么？这周就能有人为它付钱吗？」

Q5: Observation & Surprise
「你坐在旁边看别人用过它吗？他们做了什么出乎意料的事？」

Q6: Future-Fit
「3 年后，这个产品是变得更不可或缺，还是更边缘化？」
```

这六个问题按产品阶段路由，不是每次都全走：
- Pre-product → Q1, Q2, Q3
- Has users → Q2, Q4, Q5
- Has paying customers → Q4, Q5, Q6

### Anti-Sycophancy Rules：四个框架中最系统的反谄媚设计

`office-hours` 的源码里明确列出了**不能说的话**，以及对应的替代行为：

```markdown
## Anti-Sycophancy Rules

禁止在诊断阶段说：
× "That's an interesting approach"
  → 改成：直接表态，说你的立场
× "There are many ways to think about this"
  → 改成：选一种，说明什么证据会让你改变立场
× "You might want to consider..."
  → 改成："This is wrong because..." 或 "This works because..."
× "That could work"
  → 改成：说清楚「based on the evidence you have, will it work?
    What evidence is still missing?」
```

并配套了五种**强制重构范式**，每种都有 BAD/GOOD 对照：

```
Pattern 1: Vague market → force specificity

Founder: "I'm building an AI tool for developers"

BAD:  "That's a big market! Let's explore what kind of tool."

GOOD: "There are 10,000 AI developer tools right now.
      What specific task does a specific developer currently
      waste 2+ hours per week on, that your tool eliminates?
      Name the person."

---

Pattern 2: Social proof → demand test

Founder: "Everyone I've talked to loves the idea"

BAD:  "That's encouraging! Who specifically have you talked to?"

GOOD: "Loving an idea is free. Has anyone offered to pay?
      Has anyone asked when it ships? Has anyone gotten angry
      when your prototype broke? Love is not demand."

---

Pattern 3: Platform vision → wedge challenge

Founder: "We need to build the full platform before anyone can really use it"

BAD:  "What would a stripped-down version look like?"

GOOD: "That's a red flag. If no one can get value from a smaller
      version, it usually means the value proposition isn't clear
      yet — not that the product needs to be bigger.
      What's the one thing a user would pay for this week?"
```

### 规划层：多角色评审链

```
/office-hours   (意图验证，产出设计文档)
      ↓
/plan-ceo-review   (策略与范围)
      ↓
/plan-eng-review   (架构与测试，唯一强制节点)
      ↓
/plan-design-review (UI/UX，可选)
      ↓
/plan-devex-review  (开发者体验，可选)
```

`/autoplan` 是触发完整链条的快捷方式。每个评审节点执行完毕后，会向主计划文件追加结构化的 `GSTACK REVIEW REPORT` 表格：

```markdown
## GSTACK REVIEW REPORT
| Review         | Trigger            | Runs | Status    | Findings          |
|----------------|--------------------|------|-----------|-------------------|
| CEO Review     | /plan-ceo-review   | 1    | ✅ PASS   | Scope confirmed   |
| Eng Review     | /plan-eng-review   | 1    | ⚠️ CONCERNS | Missing test plan |
| Design Review  | /plan-design-review| 0    | —         | —                 |
| DX Review      | /plan-devex-review | 0    | —         | —                 |

**VERDICT:** INCOMPLETE — /plan-eng-review has open concerns.
```

### 产出文档

```
~/.gstack/projects/{SLUG}/{timestamp}-design-{name}.md — 设计文档
plan.md （含累积追加的 GSTACK REVIEW REPORT）

# 跨会话持久化（本地，不上传）
~/.gstack/analytics/skill-usage.jsonl   — 技能使用记录
~/.gstack/analytics/eureka.jsonl        — 第一性原理发现日志
~/.gstack/projects/{SLUG}/learnings.jsonl — 跨会话学习积累
~/.gstack/projects/{SLUG}/timeline.jsonl  — 会话时间线
~/.gstack/projects/{SLUG}/checkpoints/   — 进度快照
```

gstack 是四个框架中产出文档最多、跨会话持久化体系最完整的。它有一套 `learnings.jsonl` 机制，把每次会话的「有价值发现」写入本地数据库，下次相关任务开始时自动检索并注入上下文。

### 核心 Trade-off

gstack 的意图验证是四个框架中最深刻的——但代价是运营复杂度最高。SKILL.md 的 preamble 包含大量 shell 脚本（版本检查、遥测上报、学习日志、会话时间线），第一次使用有较高的环境配置门槛。YC Partner 的语气对所有项目类型并不自然，对内部工具或纯技术探索性工作的适配性较差。

---

## 七、oh-my-codex：把「模糊性」数学化

### 设计假设

`oh-my-codex` 的核心假设是：模糊性（ambiguity）是可以量化的。不需要主观判断「需求是否足够清楚」，有一个评分公式，有一个阈值，阈值达到了就解锁下一阶段。

### 意图层：`deep-interview` — 歧义评分驱动的苏格拉底循环

这是四个框架中意图理解机制最完整的设计。

**核心：带权歧义评分公式**

Greenfield 项目：
```
ambiguity = 1 - (
  intent_clarity   × 0.30 +
  outcome_clarity  × 0.25 +
  scope_clarity    × 0.20 +
  constraint_clarity × 0.15 +
  success_clarity  × 0.10
)
```

Brownfield 项目（额外加入代码库理解度维度）：
```
ambiguity = 1 - (
  intent_clarity   × 0.25 +
  outcome_clarity  × 0.20 +
  scope_clarity    × 0.20 +
  constraint_clarity × 0.15 +
  success_clarity  × 0.10 +
  context_clarity  × 0.10
)
```

评分结果直接决定何时可以停止提问：

| 模式 | 目标阈值 | 最多轮数 |
|------|----------|----------|
| `--quick` | ≤ 0.30 | 5 轮 |
| `--standard`（默认） | ≤ 0.20 | 12 轮 |
| `--deep` | ≤ 0.15 | 20 轮 |

每轮提问结束后，系统会打印加权维度明细和下一个目标维度：

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
  Non-goals:         ❌ NOT YET EXPLICIT
  Decision Boundaries: ❌ NOT YET EXPLICIT
  Pressure pass:     ❌ NOT COMPLETE

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

这三种模式在 `deep-interview` 中被显式追踪，防止重复使用同一种挑战方式让用户产生疲劳适应。

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
Non-goals        — 「明确不做什么」必须被显式写出
Decision Boundaries — 「Agent 可以自决的边界」必须被明确
```

这两个门禁的设计理由是：缺少这两个维度，下游执行 Agent 会在边界情况下自行填充假设，产生隐性的范围蔓延。

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

`Architect` 和 `Critic` 必须顺序执行（源码注释：`Do NOT issue both agent calls in the same parallel batch`），这是为了防止 Critic 在没有看到 Architect 评审结果的情况下独立给出结论，导致两个观点之间缺少张力。

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

两个文件缺一阻止执行——这个「双文件配套」要求是 oh-my-codex 最有特色的门控设计之一。

门控的触发逻辑（从 `ralplan/SKILL.md` 直接引用）：

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
  ❌ ultrawork make it better
```

门控自动通过的信号（只需满足其中一个）：

| 信号类型 | 示例 |
|----------|------|
| 文件路径 | `ralph fix src/hooks/bridge.ts` |
| Issue 号 | `ralph implement #42` |
| 具名函数 | `ralph fix processKeywordDetector` |
| 编号步骤 | `ralph do:\n1. Add X\n2. Test Y` |
| 错误引用 | `ralph fix TypeError in auth` |
| 显式绕过 | `force: ralph do it` |

### 产出文档

```
# 意图层（deep-interview）
.omx/context/{slug}-{timestamp}.md      — 预检上下文快照（Phase 0）
.omx/interviews/{slug}-{timestamp}.md   — 完整访谈记录
.omx/specs/deep-interview-{slug}.md     — 执行就绪规格文档

# 规划层（ralplan）
.omx/plans/prd-{slug}.md                — PRD（解锁执行的必需文件之一）
.omx/plans/test-spec-{slug}.md          — 测试规格（解锁执行的必需文件之一）

# 运行时（可恢复）
.omx/state/                             — 模式状态（支持中断恢复）
.omx/notepad.md                         — 会话便签
.omx/project-memory.json               — 跨会话记忆
```

### 核心 Trade-off

量化歧义是 oh-my-codex 最有工程严谨性的设计，但权重本身（intent 0.30，outcome 0.25 等）是人工先验，不同领域可能需要调整。框架对 Codex CLI 的原生工具（`request_user_input`、`state_write`、`state_read`）有强依赖，迁移到其他运行时环境有成本。

---

## 八、横向对比：设计分水岭

### 6.1 根本性的设计分歧：歧义如何被「关门」

| 框架 | 关门条件 | 本质 |
|------|----------|------|
| **agent-skills** | SPEC.md 文档是否存在 | 二元门控（文档存在 = 通过） |
| **superpowers** | design-doc.md 是否经批准（HARD GATE） | 二元门控（最强物理阻断） |
| **gstack** | 是否通过 YC Partner 的 6 个批判性问题 | 角色化重构（检验问题值不值得解决） |
| **oh-my-codex** | Ambiguity Score ≤ 阈值，且双 Readiness Gate 满足 | 量化收敛（唯一数学化方案） |

前两者是**定性的存在性判断**，简单、确定、容易实现；
gstack 是**定性的价值判断**，依赖 LLM 的角色扮演质量；
oh-my-codex 是**定量的收敛判断**，透明、可追踪，但需要人工预设权重。

### 6.2 意图理解层对比

| 维度 | agent-skills | superpowers | gstack | oh-my-codex |
|------|-------------|-------------|--------|-------------|
| **主要隐喻** | 工程纪律 | 物理门控 | YC Office Hours | 歧义量化收敛 |
| **提问机制** | 三段式模板 | Socratic 单问 | 强制挑战问题（Anti-Sycoph.） | 加权维度评分 + 压力测试 |
| **假设压力测试** | 反合理化表格 | 隐含（Socratic 循环） | 显式对抗范例（5 种 Pattern） | 显式 Challenge Modes（3 种）|
| **视觉辅助** | ❌ | ✅（Visual Companion） | ❌ | ❌ |
| **中止条件** | 文档完整（定性） | HARD GATE 解除（定性） | 设计文档生成（定性） | Score ≤ threshold（定量）|
| **进度可见性** | 低 | 低 | 低 | 高（每轮打印维度明细） |

### 6.3 规划层对比

| 维度 | agent-skills | superpowers | gstack | oh-my-codex |
|------|-------------|-------------|--------|-------------|
| **任务粒度** | XS-XL 规模分级 | 2-5 分钟/步（最细） | Sprint/泳道并行 | 由执行模式决定 |
| **切分策略** | 垂直切片（功能路径优先）| TDD 驱动（先测试后实现）| 并行评审链 | PRD + Test Spec 双轨配套 |
| **代码/测试要求** | 无 | 每步必须含真实代码片段 | 无 | test-spec 必须独立成文件 |
| **多 Agent 协作** | ❌ | 有（子 Agent 执行） | ✅（CEO + Eng + Design 评审）| ✅（Planner + Architect + Critic）|
| **必须 Review 节点** | 无 | 无 | `/plan-eng-review`（强制） | Critic（强制，且顺序执行）|

### 6.4 产出文档对比

| 框架 | 意图层文档 | 规划层文档 | 跨会话持久化 |
|------|-----------|-----------|------------|
| **agent-skills** | 对话内嵌 | `SPEC.md` + `TASKS.md` | ❌ |
| **superpowers** | `design-doc.md` | `plan.md`（含代码片段）| ❌ |
| **gstack** | `~/.gstack/…/design-*.md` | `plan.md` + Review 台账表 | ✅ learnings + timeline |
| **oh-my-codex** | `.omx/context/` + `.omx/specs/` | `.omx/plans/prd-*` + `test-spec-*` | ✅ state + memory |

文档的作用定位也有本质差异：
- agent-skills / superpowers：文档是**门控凭证**（存在即通过）
- gstack：文档是**评审台账**（每次评审追加写入、累积）
- oh-my-codex：文档是**流水线 Handoff 合约**（下游 Agent 必须读取，且双文件缺一不可）

---

## 九、三代「执行门控」的演化路径

回看这四个框架，它们代表了「从意图到执行」门控机制的三个演化阶段：

**第一代：存在性门控**（agent-skills、superpowers）

门控条件是文档的存在与否——二元判断，简单、确定、工程实现成本低。缺点是无法区分「文档存在但内容浮浅」和「文档存在且边界清晰」。

**第二代：价值判断门控**（gstack）

门控条件是能否通过角色化的价值诊断——超越了「需求是否清楚」，直接问「这个需求是否值得被解决」。gstack 的 office-hours 是唯一在意图层引入产品价值验证的框架。代价是对 LLM 角色扮演质量的强依赖。

**第三代：量化收敛门控**（oh-my-codex）

门控条件是一个公开的数学评分——透明、可追踪、可配置。进度在每轮问答后实时显示，用户和 Agent 都知道「还差多少」。这是四个框架中对「模糊性」定义最工程化的尝试。

三代之间不存在谁淘汰谁的关系，而是**不同场景下的不同选择**：存在性门控足够轻量，价值判断门控适合早期方向验证，量化收敛门控适合长周期复杂项目。

---

## 十、选型建议

| 场景 | 推荐框架 | 核心理由 |
|------|----------|----------|
| 企业工程团队规范化推广 | **agent-skills** | 生命周期对齐，文档驱动文化兼容，易于团队培训 |
| 严格 TDD 的后端服务开发 | **superpowers** | HARD GATE + No-Placeholder 执行纪律最强 |
| 产品方向验证 / 创业早期 | **gstack** | office-hours 的 YC 诊断是意图层最深的探索 |
| 需求不明确的长周期复杂项目 | **oh-my-codex** | 量化进度透明，收敛可追踪，中断可恢复 |
| 轻量实验 / 快速原型 | 任意框架均有 bypass | 所有框架都支持显式跳过门控（`force:` / `--quick`）|

---

## 十一、工程本质

这四个框架解决的是同一个问题的不同侧面：**在 AI 工具大规模介入软件开发过程中，如何防止「执行速度」超过「意图清晰度」**。

传统软件开发中，人类工程师之间的需求对齐靠的是社会成本（会议、文档、代码 Review）来约束速度。Agent 的执行速度消除了这个摩擦，但同时也消除了摩擦带来的强制对齐效果。

这四个框架本质上是在重建这个约束——用代码的方式，把原本依赖社会成本的流程，编码成 Agent 无法绕过的结构化障碍。

从「文档是否存在」到「歧义评分是否低于阈值」，这个演化方向是清晰的：把主观判断转化为可量化的工程指标，把软性约定转化为物理执行门控。这和传统软件工程里从「人工代码 Review」到「CI/CD 自动拦截」的演化路径，在结构上完全同构。

---

*作者：[AI-Authored Tech Chronicles]*
*系列：《AI 编程最佳实践》第八篇*
*分析基于：agent-skills（addyosmani/agent-skills main 分支）、superpowers（obra/superpowers main 分支）、gstack v1.1.0（office-hours/SKILL.md v2.0.0）、oh-my-codex（Yeachan-Heo/oh-my-codex main 分支，deep-interview + ralplan），资料读取于 2026-04-08*
