# AI 编程最佳实践（二）：gstack 源码解析与 Superpowers 工作流

> 本文逐 skill 拆解 Garry Tan 的 [gstack](https://github.com/garrytan/gstack) 源码，同时配合 Anthropic 官方 [superpowers-lab skills](https://github.com/anthropics/claude-code-skills/tree/main/superpowers-lab) 讲解它们背后的核心设计。

---

## 一、gstack 是什么

gstack 是 Garry Tan（Y Combinator CEO）公开的个人 Claude Code 工作流配置，包含 **21 个 skill（自定义斜杠命令）**，覆盖从规划、评审、QA 到发布的完整研发生命周期。

所有代码开源在 GitHub，核心文件结构：

```
gstack/
├── review/SKILL.md          # /review — 工程评审
├── plan-ceo-review/SKILL.md # /plan-ceo-review — CEO视角评审
├── plan-eng-review/SKILL.md # /plan-eng-review — 工程深度评审
├── qa/SKILL.md              # /qa — 测试+修复
├── qa-only/SKILL.md         # /qa-only — 只测试，不修
├── ship/SKILL.md            # /ship — 完整发布流程
├── retro/SKILL.md           # /retro — 经验复盘
├── browse/SKILL.md          # /browse — 浏览器操控
├── guard/SKILL.md           # /guard — 双重安全模式
├── careful/SKILL.md         # /careful — 危险命令拦截
├── investigate/SKILL.md     # /investigate — 问题诊断
├── autoplan/SKILL.md        # /autoplan — 自动生成计划
├── office-hours/SKILL.md    # /office-hours — 架构咨询
├── canary/SKILL.md          # /canary — 灰度发布
├── freeze/SKILL.md          # /freeze — 锁定目录边界
├── design-review/SKILL.md   # /design-review — 设计评审
├── design-shotgun/SKILL.md  # /design-shotgun — 多方案设计
└── ...
```

安装与配置：

```bash
# 全局安装
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# 项目级安装
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
cd .claude/skills/gstack && ./setup
```

---

## 二、核心 Skill 逐一拆解（附源码）

gstack 的每个 skill 是一个 `SKILL.md` 文件，包含 YAML frontmatter（定义元信息与 hook）和 Markdown 主体（具体执行指令）。以下逐一分析。

---

### 2.1 `/review` — 评审就绪仪表盘

**设计意图**：统一管理所有评审的状态，类似一个"能否发布"的控制面板。它本身不执行评审，而是读取其他 skill 写入的 JSONL 评审日志，展示当前进度与清仓状态。

**Frontmatter（元信息段）**：

```yaml
---
name: review
preamble-tier: 4
version: 1.0.0
description: |
  Shows the Review Readiness Dashboard: which reviews have been run,
  which are stale, and whether the branch is cleared to ship.
  Use when you want to know if the branch is ready to land.
---
```

`preamble-tier: 4` 是 gstack 自定义的"上下文膨胀等级"，值越高表示该 skill 向 Claude 系统提示注入的信息越多。`/review` 用 4 级是因为它需要读取大量历史评审数据。

**核心仪表盘格式（源码片段）**：

```markdown
## Review Readiness Dashboard

╔════════════════════════════════════════════════════════════════╗
║ BRANCH: feature/my-feature     REPO: myapp                    ║
╠════════════════════════════════════════════════════════════════╣
║ Eng Review          clean        2026-03-29   [COMMIT abc1234] ║
║ CEO Review          —            never run                     ║
║ Design Review       —            never run                     ║
║ Codex Review        clean        2026-03-28   [COMMIT abc1200] ║
╠════════════════════════════════════════════════════════════════╣
║ VERDICT: CLEARED — Eng Review passed                           ║
╚════════════════════════════════════════════════════════════════╝
```

**评审分级设计**：

```markdown
**Review tiers:**
- **Eng Review (required by default):** 唯一阻断发布的门控。覆盖架构、代码质量、
  测试、性能。可通过 `gstack-config set skip_eng_review true` 全局禁用。
- **CEO Review (optional):** 大产品/业务变更、新用户功能、范围决策时使用。
  Bug 修复、重构、基础设施变更可跳过。
- **Design Review (optional):** UI/UX 变更时使用，后端/基础设施/纯 Prompt 变更跳过。
- **Adversarial Review (automatic):** 按 diff 大小自动缩放。
  - < 50 行：跳过敌对评审
  - 50–199 行：跨模型（Codex）对抗评审
  - ≥ 200 行：Claude 结构化 + Codex 结构化 + Claude 对抗子代理 + Codex 对抗，共 4 轮
- **Outside Voice (optional):** 在 /plan-ceo-review 和 /plan-eng-review 完成后，
  提供来自不同 AI 模型的独立意见。从不阻断发布。
```

**Verdict（放行/拦截）判断逻辑**：

```markdown
**Verdict logic:**
- **CLEARED**: Eng Review 有 >= 1 条 7 天内记录，状态为 "clean"（或 skip_eng_review=true）
- **NOT CLEARED**: Eng Review 缺失、过期（> 7 天）、或有未解决问题
- CEO、Design、Codex 评审只展示，从不阻断
```

**陈旧检测（Staleness Detection）**——这是 gstack 的亮点设计：评审不仅看"有没有跑过"，还会对比当前 commit hash 与评审时的 commit hash：

```markdown
**Staleness detection:** After displaying the dashboard, check if any existing reviews
may be stale:
- Parse `---HEAD---` section from bash output to get current HEAD commit hash
- For each review entry with a `commit` field: compare against current HEAD.
  If different: `git rev-list --count STORED_COMMIT..HEAD` → 
  display "Note: {skill} review from {date} may be stale — {N} commits since review"
- For entries without `commit` field (legacy): display 
  "Note: {skill} review from {date} has no commit tracking — consider re-running"
```

---

### 2.2 `/plan-ceo-review` — CEO 视角评审

**设计意图**：模拟 CEO/产品负责人的视角，重点审查**业务范围合理性、产品策略对齐、功能范围蔓延**。它不是工程评审，而是在你动手之前确认"我们在做对的事情吗"。

**Frontmatter**：

```yaml
---
name: plan-ceo-review
preamble-tier: 3
version: 1.0.0
description: |
  CEO-perspective planning review. Reviews product strategy, feature scope,
  user impact, and business alignment before implementation.
  Run after writing a plan, before starting code.
---
```

**四种评审模式**：

gstack 的 plan-ceo-review 不是简单的"看一看"，而是根据计划类型切换到不同模式：

```markdown
## Modes

- **EXPAND**: 计划偏小 → 找出遗漏的高影响功能
- **HOLD**: 计划合理 → 确认范围，标记延后项
- **REDUCTION**: 计划偏大 → 剪掉不必要的复杂性
- **REFRAME**: 计划方向有问题 → 建议重新思考方法
```

**输出日志格式（写入 JSONL）**：

```bash
~/.claude/skills/gstack/bin/gstack-review-log '{
  "skill": "plan-ceo-review",
  "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
  "status": "clean",
  "mode": "HOLD",
  "scope_proposed": 3,
  "scope_accepted": 2,
  "scope_deferred": 1,
  "critical_gaps": 0,
  "unresolved": 0,
  "commit": "'$(git rev-parse --short HEAD)'"
}'
```

这条日志后续会被 `/review` 和 `/ship` 消费，是整个 gstack 评审追踪机制的核心。

---

### 2.3 `/plan-eng-review` — 工程深度评审

**设计意图**：这是 gstack 里**唯一阻断发布**的评审。它从架构视角检查计划的技术可行性、潜在坑点、测试策略，并强制要求在 `/ship` 之前至少通过一次。

**Frontmatter**：

```yaml
---
name: plan-eng-review
preamble-tier: 3
version: 1.0.0
description: |
  Engineering-perspective plan review. Covers architecture, code quality,
  tests, performance, and security. This is the gate that must be cleared
  before shipping. Required by default; can be skipped with gstack-config.
---
```

**评审产物格式（完整源码片段）**：

```markdown
## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | {runs} | {status} | {findings} |
| Codex Review | `/codex review` | Independent 2nd opinion | {runs} | {status} | {findings} |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | {runs} | {status} | {findings} |
| Design Review | `/plan-design-review` | UI/UX gaps | {runs} | {status} | {findings} |
```

**Review Chaining（评审链路自动建议）**：

这是一个关键细节——评审结束后，skill 会主动判断是否需要建议下一步评审：

```markdown
## Next Steps — Review Chaining

After displaying the Review Readiness Dashboard, check if additional reviews
would be valuable:

**Suggest /plan-design-review if UI changes exist and no design review has been run**
— detect from architecture review or any section touching frontend/CSS/views.

**Mention /plan-ceo-review if significant product change and no CEO review exists**
— soft suggestion only. Only suggest if the plan introduces new user-facing features,
changes product direction, or expands scope substantially.

**If no additional reviews needed**: state "All relevant reviews complete. Run /ship when ready."
```

---

### 2.4 `/qa` — 浏览器驱动的测试+修复循环

**设计意图**：`/qa` 是 gstack 最复杂的 skill，完整实现了"打开浏览器 → 系统性探索应用 → 发现 Bug → 修复 → 验证"的闭环。它明确禁止通过读源码来测试，要求全程像真实用户一样操作。

**六个执行阶段**：

```markdown
### Phase 1: Setup（初始化）
- 创建报告目录 `.gstack/qa-reports/`
- 检测 URL（本地/远端）、运行服务器（如需）

### Phase 2: Baseline（基线测量）
- 抓取全站链接（broken link 检测）
- 检查浏览器控制台错误（0错误=100分，10+错误=10分）
- 如有上次基线文件，进入回归模式

### Phase 3: Orient（应用画像）
- 抓取首页截图 + 无障碍树（Accessibility Tree）
- 识别框架（Next.js/Rails/WordPress/SPA）
- 提取核心导航路径

### Phase 4: Explore（系统探索）
for each page:
  - 截图（含注释）
  - 检查交互元素（按钮、链接、表单）
  - 测试边界情况（空值、无效输入）
  - 检查响应式（移动端/桌面端）

### Phase 5: Document（即时记录）
# 每发现一个问题立即记录，不要批量

### Phase 6: Wrap Up（汇总）
- 健康评分（Console 15% + Links 10% + Functional 20% + Accessibility 15% + ...)
- 写 baseline.json（供下次回归对比）
```

**关键规则（源码原文）**：

```markdown
## Important Rules

1. **Repro is everything.** Every issue needs at least one screenshot. No exceptions.
2. **Verify before documenting.** Retry the issue once to confirm it's reproducible.
3. **Never include credentials.** Write `[REDACTED]` for passwords in repro steps.
4. **Write incrementally.** Append each issue as found. Don't batch.
5. **Never read source code.** Test as a user, not a developer.
6. **Check console after every interaction.** JS errors that don't surface visually are still bugs.
7. **Test like a user.** Use realistic data. Walk through complete workflows.
8. **Depth over breadth.** 5-10 well-documented issues > 20 vague descriptions.
9. **Never delete output files.** Screenshots and reports accumulate — intentional.
10. **Use `snapshot -i` for SPAs.** Links command misses client-side routes.
11. **Show screenshots to the user.** After every screenshot command, Read the file
    so the user can see it inline. Without this, screenshots are invisible to user.
12. **Never refuse to use the browser.** Even if diff has no UI changes — backend changes
    affect app behavior. Always open the browser and test.
```

**健康评分权重表（完整）**：

```markdown
| Category      | Weight |
|---------------|--------|
| Console       | 15%    |
| Links         | 10%    |
| Visual        | 10%    |
| Functional    | 20%    |
| UX            | 15%    |
| Performance   | 10%    |
| Content       | 5%     |
| Accessibility | 15%    |
```

**为什么用 Accessibility Tree 而不是 DOM？**

`/qa` 使用 `$B snapshot -i`（Accessibility Tree 交互模式）而不是直接读 DOM，原因在 rule #10 里隐含说明：SPA 的导航元素往往不是 `<a>` 标签，通过无障碍树能找到所有可点击的按钮和菜单项，包括那些 `role="button"` 的 `<div>`。

---

### 2.5 `/qa-only` — 纯测试模式

与 `/qa` 的区别仅在于结尾规则 11-12：

```markdown
## Additional Rules (qa-only specific)

11. **Never fix bugs.** Find and document only. Do not read source code, edit files,
    or suggest fixes in the report. Your job is to report what's broken, not fix it.
    Use `/qa` for the test-fix-verify loop.
12. **No test framework detected?** Include in report summary: "No test framework
    detected. Run `/qa` to bootstrap one and enable regression test generation."
```

这体现了 gstack 的**角色分离哲学**：测试者的职责是发现问题，不是解决问题——避免在测试过程中因顺手修了 bug 导致测试路径偏移。

---

### 2.6 `/ship` — 完整发布流程（8 步）

**设计意图**：`/ship` 是 gstack 最核心的 skill，将测试、评审、版本管理、PR 创建、文档更新整合为一个不可分割的原子操作。用户输入 `/ship`，下一个看到的应该是 PR URL 和同步好的文档。

**8 步发布流程（完整源码结构）**：

```markdown
## Step 0: Platform Detection
检测 GitHub/GitLab，获取 base branch

## Step 1: Safety Gates
- 检查未提交变更（dirty working tree → 询问处理方式）
- 检查 Review Readiness Dashboard（Eng Review 必须 CLEARED）

## Step 2: Version Bump
- 读取 VERSION 文件（4位格式：MAJOR.MINOR.PATCH.BUILD）
- 展示 bump 选项：PATCH / MINOR / MAJOR / CUSTOM
- 写入新版本，更新 CHANGELOG.md

## Step 3: Tests
运行测试套件，必须全部通过

## Step 3.4: Coverage Gate
```bash
# AI评估覆盖率，输出覆盖率图（coverage diagram）
# >= target%: PASS，继续
# < target%: 询问是否补充测试（最多 2 轮）
# < minimum%: 询问是否 override（风险接受）
```

## Step 3.45: Plan Completion Audit
- 查找当前 branch 的 plan 文件
- 提取所有 actionable items（支持 checkbox、numbered list、文件规格等）
- 对照 diff 分类：DONE / PARTIAL / NOT DONE / CHANGED
- NOT DONE 项 → 询问用户是否跳过

## Step 3.5: Pre-landing Code Review
快速代码审查（非 plan-eng-review），聚焦：
- 死代码、console.log 残留
- 硬编码凭证
- 明显的性能问题

## Step 3.75: Greptile Comments
检查并回应 PR 上的 Greptile AI 评论

## Step 4-6: Commits
将变更拆分为原子提交（每个提交=一个逻辑变更单元）

## Step 6.5: Verification Gate (IRON LAW)
```markdown
**IRON LAW: NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.**

Before pushing, re-verify if code changed during Steps 4-6:

Rationalization prevention:
- "Should work now" → RUN IT.
- "I'm confident" → Confidence is not evidence.
- "I already tested earlier" → Code changed since then. Test again.
- "It's a trivial change" → Trivial changes break production.
```

## Step 7: Push
git push -u origin <branch-name>

## Step 8: Create PR/MR
包含：Summary / Test Coverage / Pre-Landing Review / Plan Completion / Verification Results

## Step 8.5: Auto-invoke /document-release（自动同步文档）
ship 完成后自动更新 README、ARCHITECTURE、CONTRIBUTING、CLAUDE.md 等文档

## Step 8.75: Persist ship metrics → ~/.gstack/projects/$SLUG/
记录 coverage_pct、plan_items_total 等指标，供 /retro 用于趋势分析
```

**Ship 的核心设计原则**（原文规则段）：

```markdown
## Important Rules

- **Never skip tests.** If tests fail, stop.
- **Never skip the pre-landing review.** If checklist.md is unreadable, stop.
- **Never force push.** Use regular `git push` only.
- **Never ask for trivial confirmations** (e.g., "ready to push?"). DO stop for:
  version bumps (MINOR/MAJOR), pre-landing review findings (ASK items).
- **Always use the 4-digit version format** from the VERSION file.
- **Split commits for bisectability** — each commit = one logical change.
- **Never push without fresh verification evidence.** If code changed after Step 3
  tests, re-run before pushing.
- **The goal is: user says `/ship`, next thing they see is PR URL + auto-synced docs.**
```

---

### 2.7 `/browse` — 持久化浏览器操控层

**设计意图**：gstack 的 `/browse` 不是临时开一个浏览器，而是维护一个**持久的 Chromium 进程**，在多个 skill 之间共享 cookies、tabs 和登录状态。`/qa`、`/design-review` 都通过 `$B <cmd>` 调用这个统一的浏览器层。

**完整命令参考表（源码原文）**：

```markdown
### Navigation
| Command | Description |
|---------|-------------|
| `goto <url>` | Navigate to URL |
| `links [--external] [--broken] [sel]` | List links on page |
| `back / forward / reload` | Navigation history |

### Interaction
| Command | Description |
|---------|-------------|
| `click <@ref\|selector\|text>` | Click element |
| `fill <@ref\|selector> <value>` | Set input value |
| `type <@ref\|selector> <text>` | Type character by character |
| `press <key>` | Keyboard shortcut |
| `select <@ref\|selector> <option>` | Dropdown selection |
| `upload <@ref\|selector> <file-path>` | Upload file |
| `scroll [<selector>] <up\|down\|px>` | Scroll page/element |
| `hover <@ref\|selector>` | Hover over element |
| `wait <ms>` | Wait milliseconds |

### Inspection
| Command | Description |
|---------|-------------|
| `console [--errors]` | Browser console output |
| `eval <file>` | Run JavaScript from file |
| `js <expr>` | Run JavaScript expression |
| `network [--clear]` | Network requests |
| `snapshot [flags]` | Accessibility tree with @e refs |
| `storage [set k v]` | Read/write localStorage |

### Visual
| Command | Description |
|---------|-------------|
| `screenshot [--viewport] [selector] [path]` | Save screenshot |
| `responsive [prefix]` | Screenshots at mobile/tablet/desktop |
| `pdf [path]` | Save as PDF |

### Tabs
| Command | Description |
|---------|-------------|
| `newtab [url]` | Open new tab |
| `tab <id>` / `tabs` | Switch / list tabs |
| `closetab [id]` | Close tab |

### Server
| Command | Description |
|---------|-------------|
| `connect` | Launch headed Chromium with Chrome extension |
| `handoff [message]` | Open visible Chrome for user takeover |
| `state save\|load <name>` | Save/load browser state (cookies + URLs) |
| `status` | Health check |
```

`snapshot -i`（仅显示交互元素）是 `/qa` 最常用的模式，它输出所有可点击的 `@e` 引用，如：
```
@e5 [button] "Submit"
@e12 [link] "Settings"
@e23 [textbox] "Search..."
```

---

### 2.8 `/guard` 与 `/careful` — 双层安全护栏

#### `/careful` — 危险命令预警

**核心机制**：通过 `hooks.PreToolUse` 在每个 Bash 命令执行前运行 `check-careful.sh`。

**Frontmatter（完整）**：

```yaml
---
name: careful
version: 0.1.0
description: |
  Safety guardrails for destructive commands. Warns before rm -rf, DROP TABLE,
  force-push, git reset --hard, kubectl delete, and similar destructive operations.
  User can override each warning. Use when touching prod, debugging live systems,
  or working in a shared environment.
allowed-tools:
  - Bash
  - Read
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/bin/check-careful.sh"
          statusMessage: "Checking for destructive commands..."
---
```

**受保护的命令模式（源码原文）**：

```markdown
| Pattern | Example | Risk |
|---------|---------|------|
| `rm -rf` / `rm -r` / `rm --recursive` | `rm -rf /var/data` | Recursive delete |
| `DROP TABLE` / `DROP DATABASE` | `DROP TABLE users;` | Data loss |
| `TRUNCATE` | `TRUNCATE orders;` | Data loss |
| `git push --force` / `-f` | `git push -f origin main` | History rewrite |
| `git reset --hard` | `git reset --hard HEAD~3` | Uncommitted work loss |
| `git checkout .` / `git restore .` | `git checkout .` | Uncommitted work loss |
| `kubectl delete` | `kubectl delete pod` | Production impact |
| `docker rm -f` / `docker system prune` | `docker system prune -a` | Container/image loss |

## Safe exceptions (allowed without warning):
- `rm -rf node_modules`, `.next`, `dist`, `__pycache__`, `.cache`, `build`, etc.
```

#### `/guard` — 组合安全模式（careful + freeze）

```yaml
---
name: guard
version: 0.1.0
description: |
  Full safety mode: destructive command warnings + directory-scoped edits.
  Combines /careful (warns before rm -rf, DROP TABLE, force-push, etc.) with
  /freeze (blocks edits outside a specified directory).
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/../careful/bin/check-careful.sh"
    - matcher: "Edit"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/../freeze/bin/check-freeze.sh"
    - matcher: "Write"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/../freeze/bin/check-freeze.sh"
---
```

`/guard` 的设计展示了 gstack 的**组合哲学**：通过引用兄弟 skill 的脚本（`${CLAUDE_SKILL_DIR}/../careful/bin/check-careful.sh`），避免代码重复，同时实现功能叠加。

---

### 2.9 `/design-review` — 10 阶段设计审查循环

**设计意图**：用浏览器打开应用，对设计质量进行打分（initial score），然后逐项修复设计问题，再次打分（final score），输出前后对比报告。

**10 阶段执行流程**：

```markdown
Phase 1: Setup           — 创建报告目录，记录 baseline 截图
Phase 2: Design Export   — 从 DESIGN.md 提取设计约束（如存在）
Phase 3: Audit           — 运行设计检查（AI Slop、视觉层级、排版、颜色、间距）
Phase 4: AI Slop Score   — 检测 7 类 AI 生成设计的常见缺陷
Phase 5: Accessibility   — 颜色对比度、ARIA 标签、键盘导航
Phase 6: Outside Voices  — Codex 独立审查 + Claude 子代理一致性检查
Phase 7: Triage          — 按 High/Medium/Polish 排序所有问题
Phase 8: Fix Loop        — 逐项修复（Locate → Fix → Commit → Re-test → Classify）
Phase 9: Final Audit     — 重新打分，对比 baseline
Phase 10: Report         — 写报告 + 更新 TODOS.md
```

**"AI Slop" 检测（7 类设计反模式）**：

```markdown
**Every design starts at 100% clean. Deduct for each AI slop indicator:**

- [ ] 过度使用卡片边框和阴影（每种组件类型 -10）
- [ ] 渐变滥用 — 当平面色就够时使用渐变（-10）
- [ ] 间距不一致 — 不同截面使用不同的间距模式（-10）
- [ ] 标题文本使用 bold 粗体，正文也用 bold（-10）
- [ ] 无处不在的悬停效果 — 每个元素都有 hover 动画（-10）
- [ ] 大量使用带颜色背景的图标（-10）
- [ ] 整洁但空洞的 Hero 区域 — 大量空白，没有真实内容预览（-10）
```

**Fix Loop 的自我调节机制（risk 计算）**：

```markdown
## 8f. Self-Regulation (STOP AND EVALUATE every 5 fixes)

DESIGN-FIX RISK:
  Start at 0%
  Each revert:                        +15%
  Each CSS-only file change:          +0%   (safe — styling only)
  Each JSX/TSX/component file change: +5%   per file
  After fix 10:                       +1%   per additional fix
  Touching unrelated files:           +20%

**If risk > 20%:** STOP. Show what you've done. Ask whether to continue.
**Hard cap: 30 fixes.** After 30 fixes, stop regardless of remaining findings.
```

---

## 三、gstack 的核心设计原则

分析完所有 skill 的源码，可以总结出 gstack 的 4 个底层设计原则：

### 原则 1：日志持久化 + 跨 skill 消费

所有评审结果都写入 `~/.gstack/projects/$SLUG/$BRANCH-reviews.jsonl`，格式：

```json
{"skill":"plan-eng-review","timestamp":"2026-03-29T12:00:00Z","status":"clean","issues_found":2,"critical_gaps":0,"commit":"abc1234"}
{"skill":"ship","timestamp":"2026-03-29T15:30:00Z","coverage_pct":87,"plan_items_total":8,"plan_items_done":7,"version":"1.2.3.4"}
```

`/review` 读这个文件展示状态，`/ship` 写这个文件记录指标，`/retro` 读这个文件分析趋势。**评审状态不存在 Claude 的上下文里，而是存在磁盘上**。

### 原则 2：Hook 机制实现无侵入式约束

`/careful`、`/freeze`、`/guard` 不需要 Claude "记住要小心"，而是通过 `hooks.PreToolUse` 在每个工具调用前注入 bash 检查脚本。这是真正的**编译时约束**，而不是**运行时自律**。

### 原则 3：模块组合而非重复实现

`/guard = /careful + /freeze`，通过引用兄弟 skill 的脚本实现，没有代码复制。`/ship` 在 Step 8.5 通过 `cat ${CLAUDE_SKILL_DIR}/../document-release/SKILL.md` 读取并执行 `/document-release` 的逻辑。

### 原则 4：铁律（Iron Law）防止自我欺骗

`/ship` 在 Step 6.5 有明确的"rationalization prevention"清单：

```markdown
- "Should work now" → RUN IT.
- "I'm confident" → Confidence is not evidence.
- "I already tested earlier" → Code changed since then. Test again.
- "It's a trivial change" → Trivial changes break production.
```

这类清单在 gstack 各 skill 里反复出现，本质是**将 AI 的常见自我欺骗路径显式列出并强制拦截**。

---

## 四、gstack 完整工作流

以下是 gstack 自身形成的端到端工作流，所有命令都是 gstack skill：

```
用户输入需求
    ↓
/office-hours         → 架构咨询，理解实现路径
    ↓
/autoplan             → 自动生成 plan 文件
    ↓
/plan-ceo-review      → CEO 视角：做对的事情吗？
    ↓
/plan-eng-review      → 工程视角：技术方案可行吗？（后续 /ship 的必要门控）
    ↓
实现代码              → 严格按 plan 执行
    ↓
/qa                   → 用户视角测试，发现+修复 Bug（依赖 /browse）
    ↓
/design-review        → 设计质量检查（UI 变更时使用）
    ↓
/review               → 检查评审仪表盘，确认所有评审 CLEARED
    ↓
/ship                 → 版本管理 + 测试 + Coverage Gate + PR + 文档自动同步
    ↓
/retro                → 经验总结，查看 metrics 趋势
```

> **gstack vs superpowers 的关系**：两者是独立的 skill 系统。gstack 是一套完整的研发流程工具链（规划→评审→测试→发布），superpowers 是 Anthropic 的 Claude Code skills 示例库，覆盖调试、架构、TDD 等单项能力模式。它们在"用 SKILL.md 约束 AI 行为"这一实现机制上相同，但面向的问题域不同，可以分别单独使用，也可以互补使用。

---

## 五、最小落地配置

如果只能选一个 skill 开始，选 `/ship`——它包含了最多的硬约束（测试必须通过、覆盖率检查、铁律验证）。

如果只能读一个 skill 的源码来理解 gstack 的设计哲学，读 `/qa`——它把"不读源码、只用浏览器"的用户视角原则执行到了极致，12 条规则每一条都在防止 AI 走捷径。

```bash
# 最小可用配置
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# 在 CLAUDE.md 加入
cat >> ~/.claude/CLAUDE.md << 'EOF'

## gstack
- Use /browse for all browser tasks (persistent session, shared cookies)
- /ship is the only way to push code — bypassing it is not allowed
- /plan-eng-review must be CLEARED before /ship will proceed
EOF
```

---

> **延伸阅读**：gstack 的全部源码在 https://github.com/garrytan/gstack ，每个 skill 的 SKILL.md 都是可直接阅读的 Markdown，建议在终端 `cat ~/.claude/skills/gstack/ship/SKILL.md | less` 通读一遍。
