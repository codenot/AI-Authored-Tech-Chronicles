# Compound Engineering Plugin 深度解析：让 AI 编程产生复利效应的工程体系

> **系列背景**：本文是《AI 编程最佳实践》第六篇。前三篇分别介绍了 AI 编程概论、gstack 研发流程工具链、obra/superpowers 认知约束系统。本篇聚焦 **EveryInc/compound-engineering-plugin**——一个试图从根本上解决 AI 辅助开发中「知识不复利」困局的工程体系。

---

## 一、问题的起点：传统 AI 编程的熵增陷阱

先描述一种大多数工程师都经历过的现实：

项目早期，用 Claude Code 或 Cursor 处理需求，速度极快。但随着代码库增长，情况开始变质：

- 每次新功能都要重新向 AI 解释项目规范，沟通成本恒为常数
- AI 在同类代码中重复出现同类错误，没有「上次犯过了」的记忆
- Review 后发现 bug，修了就过，没有沉淀；同类问题在三个月后的 PR 里再次出现
- Bug 修复后，解决方案只存在于 Slack 消息或某个工程师的脑子里

这不是工具的问题。这是一个**工程组织的知识管理问题**，用软件工程的语言说：**知识的边际成本始终不降**。

Compound Engineering 给出了一个系统性的答案。

---

## 二、核心哲学：让每次工程投入产生复利

**核心命题**：

> Each unit of engineering work should make subsequent units easier—not harder.

传统开发的方向是**线性甚至是递减的**：每增加一个功能，代码库的复杂度往往增加，后续改动的摩擦力也随之上升。10 年后的大型项目，团队花在「理解现有系统」上的时间，往往超过「写新代码」的时间。

Compound Engineering 的方向是**指数级的**：Bug 修复不只是消灭一个 bug，而是消灭整类 bug；代码 Review 不只是保证当次质量，而是把 Review 标准沉淀成可复用的 Agent；每一次解决问题，都往「系统性知识」的方向沉淀。

这个哲学的数学直觉来自复利公式。当每次工程迭代产生的「知识增量」能够被后续迭代消费时，迭代的初始成本就会系统性地下降。

---

## 三、主循环：Plan → Work → Review → Compound

Compound Engineering Plugin 的所有设计都围绕一个四步主循环：

```
Brainstorm → Plan → Work → Review → Compound → Repeat
                  ↑ Ideate (optional)
```

在实际使用中对应以下 slash command：

| 步骤 | 命令 | 角色定位 |
|------|------|----------|
| 构想 | `/ce:brainstorm` | 需求模糊时，先对齐方向 |
| 规划 | `/ce:plan` | 将功能描述转化为实现计划 |
| 执行 | `/ce:work` | Agent 按计划实现 |
| 评审 | `/ce:review` | 多 Agent 并行专项审查 |
| 沉淀 | `/ce:compound` | **最关键一步**：把本次解决的问题写入系统知识库 |

**前三步（Plan → Work → Review）完成的是一个功能。**
**第四步（Compound）构建的是一个持续生长的系统。**

Every 的工程规范中明确指出：前三步占工程师时间的约 80%，后两步（Work + Compound）约 20%。即**大部分时间应分配在思考和知识沉淀，而不是在键盘上敲代码**。

---

## 四、`/ce:plan`：三路并行研究 Agent 的内部机制

`/ce:plan` 是整个系统的核心入口之一。输入一段需求描述，它不直接生成代码，而是先跑完一套研究流程。

### 并行研究 Agent 编排

```
/ce:plan Add email notifications when users receive new comments
         ↓
  ┌─────────────────────────────────────────────────────┐
  │           三路研究 Agent 并行启动                    │
  ├─────────────────┬──────────────┬────────────────────┤
  │ repo-research   │ framework-   │ best-practices-    │
  │ -analyst        │ docs-        │ researcher         │
  │                 │ researcher   │                    │
  │ 扫描代码库结构  │ 查框架官方   │ 调研行业最佳实践   │
  │ 识别已有 email  │ 文档（Rails/ │ 查 email 通知的     │
  │ 相关 pattern    │ Next.js 等）  │ 标准实现方式        │
  └────────┬────────┴──────┬───────┴──────────┬─────────┘
           └───────────────┼──────────────────┘
                           ↓
              spec-flow-analyzer
              （分析用户流程及边界情况）
                           ↓
              生成结构化实现计划
              包含：受影响文件、实现步骤、验收标准
```

这个设计的关键在于**把「研究」和「实现」显式分离**。直接让 AI 写代码，它会根据训练数据的最常见模式生成代码；先做三方面的研究再生成计划，输出的是**针对当前代码库和框架版本的具体指令**，而不是泛化的模板。

### `ultrathink` 模式：40+ 并行研究 Agent

在 `plan` 命令中加入 `ultrathink` 关键字，会自动触发 `/deepen-plan`，启动超过 40 个并行研究 Agent，对原始计划进行深度验证和补充。适用于高风险变更（如数据库 Schema 迁移、认证模块重构）。

### Context7 MCP：实时框架文档注入

Plugin 内置了 Context7 MCP Server：

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "x-api-key": "${CONTEXT7_API_KEY:-}"
      }
    }
  }
}
```

这个 MCP 提供两个工具：
- `resolve-library-id`：将 `rails`、`next.js` 等名称解析为 Context7 的库 ID
- `get-library-docs`：获取特定版本的框架文档片段

支持 100+ 框架（Rails、React、Next.js、Vue、Django、Laravel 等）。

**工程意义**：LLM 的训练数据有截止时间，直接查询旧版 API 是 AI 辅助开发最常见的错误来源之一。Context7 解决了这个问题——`/ce:plan` 在生成计划时，引用的是**当前框架的实时文档**，而不是模型记忆中的可能过时的知识。

---

## 五、`/ce:review`：14 路专家 Agent 并行 Code Review

传统 Code Review 由一个或多个工程师串行执行，每个人的审查视角受限于其专业背景。`/ce:review` 将「多专家 Review」这件事系统化。

### 14 个专项 Agent 矩阵

```
/ce:review PR#123
     ↓
14 个 Review Agent 并行执行
     ↓
合并为单一优先级列表（P1/P2/P3）
```

**安全层**（security-sentinel）：
- 扫描 OWASP Top 10 漏洞
- 检查 SQL 注入、认证绕过、授权缺陷

**性能层**（performance-oracle）：
- 检测 N+1 查询
- 发现缺失索引、未命中缓存机会
- 识别算法复杂度瓶颈

**架构层**：
- `architecture-strategist`：评估系统设计决策、组件边界、依赖方向
- `pattern-recognition-specialist`：识别跨 changeset 的设计模式与反模式

**数据完整性层**：
- `data-integrity-guardian`：校验 migration、事务边界、referential integrity
- `data-migration-expert`：检查 ID 映射、回滚安全性、生产数据验证

**代码质量层**：
- `code-simplicity-reviewer`：强制 YAGNI 原则，标记不必要的复杂度
- `maintainability-reviewer`：耦合度、命名、死代码分析

**语言/框架专项层**：
- `kieran-rails-reviewer`：Rails 约定、Turbo Streams 模式、model/controller 职责分离
- `dhh-rails-reviewer`：37signals 风格：简洁优于抽象，Omakase 技术栈
- `kieran-typescript-reviewer`：类型安全、现代 ES 模式、简洁架构
- `julik-frontend-races-reviewer`：JavaScript 和 Stimulus 控制器的竞态条件检测

**部署层**：
- `deployment-verification-agent`：生成部署前检查清单、上线后验证步骤、回滚方案

**Agent-native 层**：
- `agent-native-reviewer`：验证功能对 AI Agent 的可访问性（不只是对人类）

### Review 输出格式

```
P1 - CRITICAL（必须修复）:
  [ ] SQL injection vulnerability in search query (security-sentinel)
  [ ] Missing transaction around user creation (data-integrity-guardian)

P2 - IMPORTANT（应当修复）:
  [ ] N+1 query in comments loading (performance-oracle)
  [ ] Controller doing business logic (kieran-rails-reviewer)

P3 - MINOR（可修复）:
  [ ] Unused variable (code-simplicity-reviewer)
  [ ] Could use guard clause (pattern-recognition-specialist)
```

### Review 后的自动化处置流程

```
/resolve_pr_parallel    ← 按 P1 → P2 顺序，并行修复各问题
/triage                 ← 人工逐条过滤：approve / skip / customize
/resolve_todo_parallel  ← 对 approved 的 todo 并行修复
```

`/resolve_pr_parallel` 的关键设计：每个 fix 在**独立隔离环境**中运行，不会相互干扰，但人工 Review 最终 fix 的责任仍保留。

---

## 六、`/ce:compound`：知识沉淀的工程化实现

这是整个系统**最关键也最容易被跳过**的一步。

### 内部机制：6 个并行 Agent

```
/ce:compound
     ↓
6 个 meta-Agent 并行分析本次工作
     ↓
┌────────────────────────────────────────────┐
│ context-analyzer     → 理解问题的本质       │
│ solution-extractor   → 提炼 what worked     │
│ related-docs-finder  → 链接已有知识         │
│ prevention-strategist→ 文档如何避免再犯     │
│ category-classifier  → YAML 标签，确保可检索│
│ documentation-writer → 格式化为标准 markdown│
└────────────────────────────────────────────┘
     ↓
生成带 YAML frontmatter 的 solution 文档
存入 docs/solutions/
```

### 输出格式示例

```markdown
---
title: "Fix N+1 query in comments loading"
category: performance
tags: [rails, activerecord, n+1, eager-loading]
date: 2026-03-30
confidence: high
---

## Problem
Comments 列表页在加载 1000 条评论时，产生 1001 条 SQL 查询...

## Solution
使用 `.includes(:author, :reactions)` 替换懒加载...

## Prevention
在 /ce:plan 阶段添加「检查 N+1 风险」作为验收标准之一...
```

**设计核心**：YAML frontmatter 不是装饰，是**检索接口**。后续 `/ce:plan` 触发 `learnings-researcher` Agent 时，会全文搜索 `docs/solutions/` 目录，通过 tags + category 定位相关历史解决方案，并将其注入到当前计划的上下文中。

这就是「复利」真正发生的位置：**过去解决的问题，自动成为未来问题的解法候选**。

### `/ce:compound-refresh`：防止知识腐烂

代码库在演化，三个月前的 solution 文档可能已经过时。`/ce:compound-refresh` 会定期检查 `docs/solutions/` 中的文档与当前代码库的匹配程度，对每条知识做出决策：keep / update / replace / archive。

---

## 七、文件系统即知识架构

Plugin 规定了固定的项目文件结构：

```
your-project/
├── CLAUDE.md                   # Agent 每次启动必读：规范、偏好、模式
├── docs/
│   ├── brainstorms/            # /ce:brainstorm 输出
│   ├── plans/                  # /ce:plan 输出
│   └── solutions/              # /ce:compound 沉淀的知识库
└── todos/                      # Review 找到的待处理项
    ├── 001-ready-p1-fix-auth.md
    └── 002-pending-p2-add-tests.md
```

### CLAUDE.md 的角色

`CLAUDE.md` 是**整个系统最重要的单一文件**。它在每次 Agent 启动时被自动读取，承载：

- 项目级规范（命名约定、代码风格、禁止的 pattern）
- Agent 行为偏好（哪些 reviewer 需要、哪些可以跳过）
- 历史犯错日志（防止同类问题再次出现）

实际使用中，工程师的工作习惯会直接影响 CLAUDE.md 的质量：每次 Review 发现新的问题类型，就把「如何避免」写进 CLAUDE.md；每次重构发现的设计原则，也写进去。

```markdown
# CLAUDE.md

## 规范
- 所有 ActiveRecord 查询必须检查 N+1：使用 Bullet gem 在开发环境中开启
- Controller action 不能直接调用外部 API，必须通过 Service Object

## 已知坑
- Turbo Streams 更新 DOM 时，不要直接操作 Stimulus target，容易产生竞态条件
- Redis cache key 必须包含版本号，避免类型变化导致的反序列化错误
```

---

## 八、`/lfg`：全自动管道，单命令到 PR

`/lfg`（Let's Fucking Go）是整个 pipeline 的组合命令：

```
/lfg Add dark mode toggle to settings page
    ↓
plan → deepen-plan → work → review → resolve findings → browser tests → feature video → compound
    ↓
生成 PR，等待人工合并
```

内部启动 **50+ 个 Agent**，覆盖从需求理解到 PR 描述生成的全链路。流程在等待 plan 审批后自动运行。

**限制**：这是 Beta 功能。`/lfg` 适合需求清晰、风险可控的功能；对于涉及复杂数据迁移或认证模块的变更，仍需手动逐步执行各阶段。

---

## 九、多平台支持：CLI 转换层的工程实现

Plugin 原生支持 Claude Code，但通过 Bun/TypeScript CLI 实现了对其他平台的格式转换：

```bash
# 安装到 OpenCode（将 Claude 插件格式转换为 opencode 格式）
bunx @every-env/compound-plugin install compound-engineering --to opencode

# 安装到 Codex
bunx @every-env/compound-plugin install compound-engineering --to codex

# 安装到 Gemini CLI
bunx @every-env/compound-plugin install compound-engineering --to gemini

# 安装到 GitHub Copilot
bunx @every-env/compound-plugin install compound-engineering --to copilot

# 自动检测已安装工具并全部安装
bunx @every-env/compound-plugin install compound-engineering --to all
```

各平台的配置路径映射：

| 平台 | 配置目标 | 备注 |
|------|----------|------|
| Claude Code | `.claude-plugin/` | 原生格式 |
| OpenCode | `~/.config/opencode/` | `.md` 格式 |
| Codex | `~/.codex/prompts`、`~/.codex/skills` | `ce:*`、`workflows:*` 命令 |
| Gemini CLI | `.gemini/` | `.toml` 格式，如 `commands/workflows/plan.toml` |
| GitHub Copilot | `.github/` | `.agent.md` 格式 |
| Windsurf | `~/.codeium/windsurf/`（全局）或 `.windsurf/`（项目级） | `mcp_config.json` |
| Cursor | `.cursor-plugin/` | 直接添加插件 |

**个人配置同步**：`bunx @every-env/compound-plugin sync` 可将 `~/.claude/` 下的个人 skills、commands 和 MCP 配置同步到所有已安装平台，skills 采用 **符号链接**而非复制，确保在 Claude Code 中的更改立即反映到其他工具。

---

## 十、与 gstack / superpowers 的对比定位

读过前几篇的工程师，可能会发问：这和 gstack、superpowers 有什么本质区别？

| 维度 | gstack | superpowers | compound-engineering |
|------|--------|-------------|----------------------|
| 核心问题 | 研发流程（做什么、顺序） | AI 认知约束（怎么想、避免错误） | 知识管理（每次工程投入能否产生复利） |
| 作用范围 | 单次任务的执行路径 | AI 行为的约束规则 | 跨会话、跨任务的知识积累 |
| 状态持久化 | 显式（metrics JSONL、review dashboard） | 隐式（TodoWrite checklist） | 显式（docs/solutions/*.md、CLAUDE.md） |
| 时间尺度 | 单次 PR | 单次会话 | 项目全生命周期 |
| 主要受益者 | 提升单次执行质量 | 防止 AI 犯常见错误 | 累计复利，后期收益显著 |

三者并不互斥——实际上，compound-engineering 本身也引用了 superpowers 中的 brainstorming 理念（先收敛需求再实现）。理想的组合是：

```
superpowers  ← 认知约束层：防止 AI 犯错
    +
gstack       ← 流程框架层：规定执行路径
    +
compound-eng ← 知识沉淀层：让积累产生复利
```

---

## 十一、Trade-offs：复利体系的代价

### 1. 冷启动成本真实存在

新项目启动的前几个 PR，`docs/solutions/` 是空的，`CLAUDE.md` 也几乎没有内容。此时 compound engineering 能提供的增益非常有限，而每次 `/ce:compound` 的时间开销却是真实的。

复利效应需要积累到一定规模才会显现。Every 团队的经验是，大约在 **20~30 次 Compound 迭代后**，`learnings-researcher` Agent 开始能稳定找到相关历史解决方案，节省的重复研究时间开始抵消积累成本。

### 2. `/ce:review` 的 Token 消耗不可忽视

14 路并行 Review Agent 同时启动，每个 Agent 都需要读取完整的 diff 和相关上下文。对于大型 PR（超过 500 行变更），单次 `/ce:review` 的 Token 消耗可能达到数十万。

实践中的折中方案：小 PR（< 100 行）直接跑完整 Review；大型变更考虑按域拆分 PR，或手动选择具体的 Review Agent（如只跑 `security-sentinel` 和 `data-integrity-guardian`）。

### 3. CLAUDE.md 的维护成本

CLAUDE.md 的价值与维护质量正相关。如果团队不保持持续更新，它会迅速过时，或者因为堆积太多低质量注释而降低 Agent 的读取信噪比。

这需要明确的工程纪律：每次 Review 发现新问题，必须指定一人负责将防范方案更新到 CLAUDE.md，而不是只改代码、不沉淀规律。

### 4. 知识孤岛风险

`docs/solutions/` 的可检索性依赖于 YAML frontmatter 中的 tags 质量。如果 `category-classifier` Agent 的分类不准确，或者不同工程师手动修改时没有遵循统一的 tag 体系，检索效果会退化。

建议定期运行 `/ce:compound-refresh`，并在 CLAUDE.md 中明确 tag 分类规范。

---

## 十二、工程采纳路径：5 阶段成熟度模型

Every 提供了一个直白的**AI 采纳阶梯**，帮助工程师识别当前所处位置，避免跳级带来的不适应：

| 阶段 | 特征 | 对应工作模式 |
|------|------|-------------|
| Stage 0 | 纯手工开发，不用 AI | 传统工程 |
| Stage 1 | 用 AI 作为查询工具，复制代码片段 | Chat-based assistance |
| Stage 2 | 允许 AI 直接读写文件，但逐行审查 | Agentic with line-by-line review |
| Stage 3 | Plan 先行，Agent 自主实现，PR 级别 Review | **复利开始积累** |
| Stage 4 | 描述结果，Agent 负责计划和实现 | 单机全自动 |
| Stage 5 | 云端并行多 Agent，多功能同步推进 | 指挥 Fleet |

**核心洞察**：大多数工程师卡在 Stage 2。他们信任 AI 读文件，但不信任 AI 自主运行，于是陷入「AI 速度 + 人工审查」的双重性能瓶颈。

进入 Stage 3 的关键不是技术门槛，而是**心智模型的切换**：从「监视 AI 每一步」转为「投资于计划和评审系统，信任 Agent 执行」。

---

## 十三、核心原则总结

Compound Engineering 背后有 8 条工程师「需要解除」的旧信念，以及与之对应的新原则：

| 旧信念（需要解除） | 新原则 |
|------------------|--------|
| 代码必须手写 | 谁打字（人/Agent）不重要，质量才是要求 |
| 每行都要人工审查 | 不信任输出时，加审查系统，而不是手工补偿 |
| 解决方案必须来自工程师 | 工程师的价值在于品味，而不是在于搜索 |
| 代码是核心产物 | 产生代码的系统，比任何单段代码更有价值 |
| 写代码是核心工作 | 规划、评审和教导系统，都算工程输出 |
| 初稿应该很好 | 初稿 95% 是垃圾，目标是让第三稿比第一稿来得更快 |
| 代码是自我表达 | 代码属于团队和产品，放下执念才能接受反馈 |
| 打字越多，学得越多 | 理解比肌肉记忆更重要，审查 10 次 AI 实现 > 手打 2 次 |

最根本的一条原则是：

> **Taste belongs in systems, not in review.**
>
> 把你的判断力编码进配置、Schema 和自动检查。如果你只是在 Review 里手动把关，那是不可扩展的。

---

*作者：[AI-Authored Tech Chronicles]*
*系列：《AI 编程最佳实践》第六篇*
*参考来源：EveryInc/compound-engineering-plugin（github.com/EveryInc/compound-engineering-plugin），every.to/chain-of-thought/compound-engineering，plugin README 读取于 2026-03-30，repo 版本 v2.59.0*
