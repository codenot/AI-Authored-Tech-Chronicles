# AI 编程最佳实践（二）：gstack 源码解析：把 Claude Code 变成一支工程团队

> 本文重新阅读 Garry Tan 的 [gstack](https://github.com/garrytan/gstack) 当前源码与 `SKILL.md`，不再按文件逐个罗列，而是按研发生命周期给 skill 分类：每个 skill 负责什么、什么时候该用、它在源码里靠什么机制生效。

---

## 一、先看结论：gstack 不是一堆命令，而是一套研发操作系统

gstack 的 README 对它自己的定位很直接：它把 Claude Code 变成一个虚拟工程团队。当前版本的核心描述是：**23 个 specialists，加上 8 个 power tools**。这些能力全部以 slash command / skill 的形式安装到 AI 编程环境里。

这句话容易被误解成“命令越多越强”。但读完源码后会发现，gstack 真正强的地方不是命令数量，而是它把一次软件研发拆成了几个明确阶段：

```text
Think -> Plan -> Build -> Review -> Test -> Ship -> Deploy -> Reflect
```

每个阶段都有一个或多个 skill 接管，而且 skill 之间不是孤立的：

- `/office-hours` 写出的设计文档会被后续 plan review 读取。
- `/plan-eng-review` 生成测试计划，后续 `/qa` 和 `/ship` 会消费。
- `/review`、`/plan-*review`、`/ship` 都会把结果写入 `~/.gstack/projects/` 下的 JSONL 日志。
- `/browse` 提供长期运行的 Chromium 浏览器，供 `/qa`、`/design-review`、`/canary` 等视觉/交互类 skill 复用。
- `/careful`、`/freeze`、`/guard` 不是靠“提醒 AI 小心”，而是通过 hooks 在工具调用前拦截危险操作。

所以 gstack 的本质不是 prompt collection，而是一个 **有状态、有工具、有门禁、有复盘的 AI 工程 harness**。

---

## 二、源码结构：为什么说“核心都是 Markdown，难点在浏览器”

gstack 仓库的关键结构可以分成五层：

```text
gstack/
├── SKILL.md                    # 顶层 gstack skill，包含公共 preamble 和路由规则
├── */SKILL.md                  # 各个 slash command 的行为说明
├── */SKILL.md.tmpl             # 部分 skill 的模板，构建时生成 SKILL.md
├── bin/                        # 配置、日志、review、team mode、升级等脚本
├── browse/                     # 持久化浏览器 CLI / daemon / Chromium 控制层
├── hosts/                      # Claude、Codex、Cursor、OpenCode 等宿主适配
└── docs/skills.md              # 每个 skill 的深度说明
```

`ARCHITECTURE.md` 里有一句很关键：**browser is the hard part, everything else is Markdown**。

原因是普通 skill 只是 Markdown 指令，真正改变能力边界的是浏览器层。gstack 的浏览器不是每次临时启动一个 Playwright，而是一个长期运行的 Chromium daemon：

```text
Claude Code
  -> $B snapshot -i
  -> browse CLI
  -> localhost HTTP
  -> Bun server
  -> Chromium via CDP
```

首次调用启动浏览器，之后每次命令只走本地 HTTP，通常 100-200ms。这样 `/qa` 才能像真实用户一样连续点击、截图、看 console、保留 cookies 和 tabs。

---

## 三、技能分类总览：每个 skill 应该什么时候用

下面这张表是读源码后最实用的索引。不要按“我想试哪个命令”来选，而要按“我现在处在研发的哪个阶段”来选。

| 阶段 | Skill | 什么时候用 |
| --- | --- | --- |
| 想清楚产品 | `/office-hours` | 需求还模糊、用户只说了一个功能名、你想先确认真正的问题是什么 |
| 自动产出计划 | `/autoplan` | 想一键生成并 review 完计划，不想手动串 CEO/Design/Eng/DX review |
| 产品/范围评审 | `/plan-ceo-review` | 写代码前，担心需求方向错、范围太小、范围太大、没有抓住用户真正痛点 |
| 工程方案评审 | `/plan-eng-review` | 实现前确认架构、数据流、边界条件、测试矩阵；这是最重要的工程门禁 |
| 设计计划评审 | `/plan-design-review` | UI 还没实现，但计划里需要明确空状态、加载态、移动端、视觉层级 |
| 开发者体验计划评审 | `/plan-devex-review` | 做 API、SDK、CLI、文档、集成流程前，先检查开发者上手路径 |
| 代码评审 | `/review` | 分支已有改动后，找 CI 不一定能发现的 bug、遗漏、复杂度问题 |
| 调试 | `/investigate` | 线上/本地问题原因不明，必须先查根因，不能靠猜测连续修 |
| 安全审计 | `/cso` | 认证、授权、支付、数据访问、外部输入、上线前安全检查 |
| 浏览器测试并修复 | `/qa` | 有 URL 或本地应用，需要真实浏览器跑完整用户路径，发现问题后直接修 |
| 只报告 QA 问题 | `/qa-only` | 你只想要 bug report，不希望 AI 读源码或修改代码 |
| 设计实机审查 | `/design-review` | UI 已经实现，需要浏览器截图、AI slop 检查、修复视觉问题 |
| 开发者体验实测 | `/devex-review` | 文档/SDK/CLI 已实现，要像新开发者一样实际跑 getting started |
| 多方案视觉探索 | `/design-shotgun` | 还没有确定视觉方向，想一次生成 4-6 个 mockup 变体并比较 |
| 设计系统咨询 | `/design-consultation` | 从零建立产品视觉系统、品牌方向、组件语言 |
| Mockup 转 HTML | `/design-html` | 已经选定 mockup 或方向，要生成可运行、可适配的 HTML/CSS |
| 性能基线 | `/benchmark` | 想记录页面加载、Core Web Vitals、资源体积，并和后续 PR 对比 |
| 发布 PR | `/ship` | 代码准备进入 PR，要求同步 main、跑测试、覆盖率审计、review、推送、开 PR |
| 合并部署 | `/land-and-deploy` | PR 已批准，要合并、等 CI、部署、验证生产健康 |
| 灰度/上线监控 | `/canary` | 部署后观察 console error、性能退化、页面失败 |
| 文档同步 | `/document-release` | 功能已发，README、ARCHITECTURE、CONTRIBUTING 等可能过期 |
| 复盘 | `/retro` | 一周/一段时间后看交付趋势、测试健康、团队协作和改进点 |
| 浏览器能力 | `/browse` | 需要打开网页、截图、点按钮、读 console、看网络请求时的底层能力 |
| 导入登录态 | `/setup-browser-cookies` | QA 需要登录态，不想手工在无头浏览器里重新登录 |
| 打开可视化浏览器 | `/open-gstack-browser` | 想看见 AI 的浏览器操作，或使用带 sidebar 的 GStack Browser |
| 跨模型二审 | `/codex` | 需要 Codex 提供独立 code review、adversarial challenge 或开放咨询 |
| 危险命令保护 | `/careful` | 接近生产、数据库、集群、force push、删除命令前，要求 Bash 预检查 |
| 编辑范围锁定 | `/freeze` | 调试一个目录时，防止 AI 顺手改到无关模块 |
| 完整安全模式 | `/guard` | 同时需要危险命令预警和目录编辑边界 |
| 解除编辑锁 | `/unfreeze` | `/freeze` 或 `/guard` 后恢复正常编辑范围 |
| 部署配置 | `/setup-deploy` | 第一次使用 `/land-and-deploy` 前，检测平台、生产 URL、部署命令 |
| 记忆管理 | `/learn` | 查看、搜索、修剪、导出 gstack 学到的项目偏好和坑点 |
| 升级 | `/gstack-upgrade` | 更新 gstack，自检全局/本地安装，展示 changelog |

---

## 四、第一类：想清楚要做什么

### `/office-hours`：先问“你真正要解决什么痛”

`/office-hours` 是 gstack 推荐的起点。它不是需求整理器，而是 YC office hours 角色：用户说一个功能，它会追问具体痛点、用户是谁、现在怎么解决、为什么现在需要做。

什么时候用：

- 需求只有一句话，例如“做一个日报 app”。
- 你怀疑用户说的是解决方案，不是真问题。
- 你想在写代码前得到一份可传递给后续 review 的设计文档。

源码里的关键设计是两种模式：

- **Startup mode**：适合创业产品，问题更尖锐，围绕真实需求、窄切入口、惊喜发现。
- **Builder mode**：适合 side project、hackathon、学习项目，更鼓励探索和趣味。

它结束时会把设计文档写入 `~/.gstack/projects/`，后续 `/plan-ceo-review` 和 `/plan-eng-review` 会读取这个产物。这里体现了 gstack 的第一条主线：**不要让好讨论只停留在上下文窗口里，要落到磁盘 artifact。**

### `/autoplan`：自动串起评审链

`/autoplan` 是计划阶段的流水线。它会自动运行 CEO、Design、Eng、DX 等评审逻辑，目标是一键产出“已经被挑战过”的计划。

什么时候用：

- 你想从需求直接到可执行 plan。
- 任务跨产品、设计、工程多个面向。
- 你不确定该先跑哪个 plan review。

它的价值不在“生成计划”，而在“生成计划后自动审计划”。这比直接让 AI 写 TODO 更可靠，因为它会把计划拿给不同角色反复质疑。

---

## 五、第二类：写代码前的计划评审

gstack 的 plan review 系列是最值得借鉴的部分。它把“开始实现之前应该想清楚的问题”拆成四种角色。

### `/plan-ceo-review`：产品方向和范围

什么时候用：

- 新功能会影响用户体验或业务方向。
- 你担心计划太保守，只是在实现表层需求。
- 你担心计划太大，需要砍掉不必要范围。

源码里把它分成四种模式：

| 模式 | 含义 |
| --- | --- |
| SCOPE EXPANSION | 计划太小，提出更有野心的版本 |
| SELECTIVE EXPANSION | 保持当前计划，但逐项提出可选增强 |
| HOLD SCOPE | 当前范围合理，只做严谨评审 |
| SCOPE REDUCTION | 当前范围过大，找最小可行版本 |

这个 skill 不是问“怎么实现”，而是问“这个产品到底应该是什么”。它适合在产品方向还没锁定时使用。

### `/plan-eng-review`：工程脊柱

什么时候用：

- 计划已经有方向，但架构还没落稳。
- 涉及数据流、状态机、后台任务、权限、性能、测试策略。
- 你希望在实现前暴露隐藏假设。

它要求模型画系统图、数据流图、状态图、测试矩阵。这个要求很关键：LLM 写文字时容易含糊，但画图会迫使它交代边界和流向。

`/plan-eng-review` 还会把测试计划 artifact 写到 `~/.gstack/projects/`。后续 `/qa` 和 `/ship` 可以读取，所以工程评审不是一次性的建议，而是进入后续测试和发布门禁。

### `/plan-design-review`：在 UI 实现前补齐状态

什么时候用：

- 计划里有 UI，但没有说清楚页面怎么长。
- 你还没实现，希望在便宜的时候修正设计缺口。
- 需要明确 loading、empty、error、mobile、accessibility、AI slop 风险。

源码里它会对信息架构、交互状态、用户旅程、设计系统、一致性、响应式与可访问性做多轮检查，并使用 STOP + AskUserQuestion 模式逐项让用户做真正的设计决策。

这类设计 review 最适合放在实现前，因为那时改一句 plan 就能避免后面改几十个组件。

### `/plan-devex-review`：开发者体验的计划评审

什么时候用：

- 你做的是 API、SDK、CLI、文档、插件、集成流程。
- 成功标准不是“功能存在”，而是“新开发者多久能跑通”。
- 你想评估 TTHW（time to hello world）、错误信息、示例代码、认证步骤。

它和 `/plan-design-review` 是对称的：一个关心终端用户看见什么，一个关心开发者如何上手。

---

## 六、第三类：实现后的 review、调试和安全

### `/review`：Staff Engineer，而不是格式检查器

什么时候用：

- 分支已经有 diff。
- CI 通过但你担心生产 bug。
- 想查 completeness gap、边界条件、过度复杂、遗漏测试。

旧稿把 `/review` 主要写成“仪表盘”。当前源码里 `/review` 已经更像 staff engineer code review：它会看 diff、运行 specialist review、自动修 obvious issue，把需要人决定的项标成 ASK。

它还会写 review 日志，例如：

```bash
gstack-review-log '{
  "skill":"review",
  "status":"STATUS",
  "issues_found":N,
  "critical":N,
  "quality_score":SCORE,
  "commit":"COMMIT"
}'
```

这些日志会被 `/ship` 读取。也就是说，review 结果不是“这次对话里 AI 说过”，而是一个可查询的工程状态。

### `/investigate`：调试时禁止猜修

什么时候用：

- 你不知道 bug 根因。
- AI 已经修了几次都没好。
- 问题涉及数据流、异步、权限、缓存、环境差异。

`/investigate` 的核心是“no fixes without investigation”。它强制先复现、收集证据、列假设、验证假设，再改代码。连续失败后要停下来质疑最初假设，而不是继续换补丁。

这是 gstack 对 AI 常见调试失败模式的正面约束：AI 很容易把“我想到一个可能原因”误当成“我知道根因”。

### `/cso`：安全角色独立出来

什么时候用：

- 涉及登录、权限、支付、文件上传、外部输入、数据隔离。
- 上线前做安全专项检查。
- 你想让模型按 OWASP Top 10 和 STRIDE 方式思考。

把安全做成单独 skill 的意义是：安全不是 code review 的一个小 checklist，而是一种不同的威胁建模视角。

### `/codex`：跨模型第二意见

什么时候用：

- diff 风险高，需要独立模型挑战 Claude 的判断。
- 想做 adversarial review。
- 想让 Codex 作为外部 reviewer 给 pass/fail gate。

跨模型 review 的价值不是“哪个模型更聪明”，而是降低同一个模型在同一上下文里自洽犯错的概率。

---

## 七、第四类：浏览器、QA、设计实测

### `/browse`：gstack 的眼睛

什么时候用：

- 需要打开 URL、截图、点击、填表、读 console、看 network。
- 需要复用登录态、tab 和 localStorage。
- 其他 skill 需要真实浏览器能力。

`/browse` 的命令按源码大致分成几类：

| 类别 | 代表命令 | 用途 |
| --- | --- | --- |
| Navigation | `goto`, `back`, `reload`, `links` | 页面跳转和链接扫描 |
| Interaction | `click`, `fill`, `type`, `press`, `select`, `upload`, `hover` | 像用户一样操作页面 |
| Inspection | `snapshot`, `console`, `network`, `storage`, `js` | 读无障碍树、console、请求、本地存储 |
| Visual | `screenshot`, `responsive`, `pdf` | 视觉证据和响应式检查 |
| Tabs/State | `newtab`, `tab`, `state save/load` | 管理多 tab 和会话状态 |

它最重要的设计是 ref system：`snapshot -i` 从 accessibility tree 生成 `@e1`、`@e2` 这样的引用，后续 `click @e1` 通过 Playwright locator 找元素。这样避免了让 AI 手写脆弱 CSS selector。

### `/qa`：测试、修复、回归测试闭环

什么时候用：

- 有可访问 URL 或本地 app。
- 你希望 AI 像真实用户一样跑流程。
- 发现 bug 后允许它修复，并写回归测试。

`/qa` 的源码流程已经扩展成 11 个阶段：初始化、认证、定向、探索、记录、总结、triage、fix loop、final QA、报告、更新 TODO。

它最重要的规则是：

```text
Repro is everything. Every issue needs at least one screenshot.
Never read source code. Test as a user, not a developer.
Show screenshots to the user.
```

这三条规则非常关键。AI 写测试时最容易偷懒：直接读源码、猜页面结构、跳过截图证据。`/qa` 反过来要求它先做用户，再做程序员。

### `/qa-only`：测试者和修复者分离

什么时候用：

- 你只要独立 bug report。
- 不希望测试过程中修改代码。
- 需要把发现问题和修复问题分给不同人/不同 agent。

`/qa-only` 与 `/qa` 最大区别是禁止修复。这个设计很朴素但重要：测试者一边测一边修，很容易改变测试路径，也容易把未复现的问题“顺手修掉”。

### `/design-review`：实现后的设计审查

什么时候用：

- UI 已经做出来，需要看真实页面。
- 想抓 AI slop：过度卡片、阴影、渐变、空洞 hero、hover 滥用。
- 想做 before/after 截图和原子修复。

它和 `/plan-design-review` 的区别是阶段：

- `/plan-design-review` 在写代码前改计划。
- `/design-review` 在实现后打开浏览器审真实页面并修代码。

### `/devex-review`：真实跑一次开发者上手路径

什么时候用：

- 你发布 API、SDK、CLI、插件或开发文档。
- 你想知道一个新开发者是否能照 README 跑通。
- 你想把计划阶段的 DX 分数和真实体验对照。

这类 review 很容易被忽略，因为它不是终端用户 UI。但对 developer tool 来说，DX 就是产品体验。

### `/design-shotgun`、`/design-consultation`、`/design-html`

这三个 skill 属于设计生产链：

| Skill | 什么时候用 |
| --- | --- |
| `/design-consultation` | 从零讨论设计系统、品牌方向、视觉语言 |
| `/design-shotgun` | 需要多个视觉方案并排比较，而不是一次只让 AI 猜一个 |
| `/design-html` | 已经选定 mockup 或方向，要生成可运行、可适配的 HTML/CSS |

它们体现了 gstack 的另一个思想：设计不是“让 AI 输出一张图”，而是“探索 -> 选择 -> 落地”的流水线。

---

## 八、第五类：发布、部署和生产验证

### `/ship`：发布工程师

什么时候用：

- 准备把分支变成 PR。
- 需要同步 main、跑测试、覆盖率审计、计划完成度审计、review、push、开 PR。
- 不想依赖 AI 自我声明“应该可以发”。

`/ship` 是 gstack 最重的 skill。当前源码已经不是旧稿里的 8 步，而是包含更多发布门禁：

```text
Step 0   Detect platform and base branch
Step 1   Pre-flight
Step 3   Merge base branch before tests
Step 4   Test framework bootstrap
Step 5   Run tests
Step 7   Test coverage audit
Step 8   Plan completion audit
Step 8.1 Plan verification
Step 8.2 Scope drift detection
Step 9   Pre-landing review
Step 10  Greptile comments if PR exists
Step 12+ Version / changelog / commit / push / PR body
Step 20  Metrics persistence
```

它的规则比普通“开 PR 命令”强很多：

- 不因为之前跑过 `/ship` 就跳过验证步骤。
- 测试失败要停。
- 覆盖率不足要补测试或让用户显式接受风险。
- 计划中未完成的项不能默默丢掉。
- review 结果要写入 PR body。

这里的核心不是自动化，而是 **把发布前容易被人和 AI 省略的检查变成默认路径**。

### `/land-and-deploy`：从 approved PR 到生产验证

什么时候用：

- PR 已经过 review。
- 你想让 AI 合并、等待 CI、触发部署、检查生产健康。
- 发布不是到“PR merged”结束，而是到“线上可用”结束。

它是 `/ship` 的后半程补齐：`/ship` 管开 PR，`/land-and-deploy` 管合并后的真实落地。

### `/canary`：上线后继续看

什么时候用：

- 刚部署完，需要观察生产页面。
- 想监控 console error、性能、页面失败。
- 希望用浏览器持续访问关键路径。

`/canary` 依赖 `/browse`，它把“部署后看一眼”变成一个有步骤的监控循环。

### `/benchmark`：性能不是感觉

什么时候用：

- 改动可能影响页面加载。
- 想记录 Core Web Vitals 和资源体积。
- 想让后续 PR 能和基线对比。

这是 gstack 里偏工程仪表盘的一类 skill：它把性能结论从“我觉得变快/变慢”变成可比较的数据。

### `/document-release`：防止文档腐烂

什么时候用：

- 功能已经发出，README 或架构文档可能跟不上。
- `/ship` 之后需要同步 docs。
- 用户文档、贡献指南、CLAUDE/AGENTS 规则需要更新。

它解决的是 AI 编程里很常见的问题：代码改得快，文档过期得更快。

---

## 九、第六类：安全护栏和会话级工具

### `/careful`、`/freeze`、`/guard`

这三个 skill 是 gstack 最“工程化”的部分，因为它们不是提示词，而是 hook。

`/careful` 的 frontmatter 注册了 Bash 的 `PreToolUse` hook：

```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/bin/check-careful.sh"
```

它会拦截：

- `rm -rf`
- `DROP TABLE` / `DROP DATABASE`
- `TRUNCATE`
- `git push --force`
- `git reset --hard`
- `kubectl delete`
- `docker rm -f` / `docker system prune`

`/freeze` 注册 Edit/Write 的 `PreToolUse` hook，要求所有编辑都在指定目录下。`/guard` 则组合两者：危险 Bash 预警 + 编辑范围锁定。

什么时候用：

- `/careful`：碰生产、数据库、集群、危险 git 命令时。
- `/freeze`：只允许改某个模块，防止 AI 扩散修改。
- `/guard`：线上调试或高风险修复，同时需要两种保护。

这里最值得学的是：**重要约束不要只写进提示词，要尽量放到工具调用边界上。**

### `/setup-browser-cookies`、`/open-gstack-browser`、`/setup-deploy`、`/learn`、`/gstack-upgrade`

这些不是研发阶段本身，而是让工作流可持续运转的基础设施：

| Skill | 作用 |
| --- | --- |
| `/setup-browser-cookies` | 把真实浏览器 cookies 导入测试浏览器，支持登录态 QA |
| `/open-gstack-browser` | 打开可视化 GStack Browser，让用户能观察 AI 操作 |
| `/setup-deploy` | 为 `/land-and-deploy` 保存生产 URL、部署命令、平台信息 |
| `/learn` | 管理项目级 learnings，让偏好和坑点跨会话保留 |
| `/gstack-upgrade` | 检测安装方式、升级版本、运行迁移、展示变更 |

---

## 十、gstack 的三条底层机制

### 1. Preamble：每个 skill 先建立运行环境

顶层 `SKILL.md` 的 preamble 会读取大量运行状态：

- 当前 branch。
- 是否开启 proactive。
- skill 是否使用 `/gstack-` 前缀。
- repo mode。
- telemetry 状态。
- writing style。
- learnings 数量。
- checkpoint mode。
- 是否存在 routing rules。

这说明 gstack 不把 skill 当成静态提示词。每次运行前，它都会先读取本地状态，再决定行为。

### 2. JSONL：把对话里的判断变成可查询历史

gstack 的 review、ship、retro、learn 都依赖 JSONL。典型路径是：

```text
~/.gstack/projects/$SLUG/
  reviews.jsonl
  learnings.jsonl
  test-plans/
  design-docs/
```

这样做有三个好处：

- 跨上下文窗口：AI 不需要记得上次评审结果。
- 可复盘：`/retro` 能读取历史趋势。
- 可门禁：`/ship` 能检查 review、coverage、plan completion，而不是相信口头承诺。

### 3. 模板生成：共享方法论，减少文档漂移

`ARCHITECTURE.md` 描述了 `SKILL.md.tmpl -> gen-skill-docs.ts -> SKILL.md` 的生成链。模板中的占位符会从源码元数据生成，例如：

| Placeholder | 来源 | 生成内容 |
| --- | --- | --- |
| `{{COMMAND_REFERENCE}}` | `commands.ts` | 浏览器命令表 |
| `{{QA_METHODOLOGY}}` | `gen-skill-docs.ts` | `/qa` 和 `/qa-only` 共用 QA 方法论 |
| `{{DESIGN_METHODOLOGY}}` | `gen-skill-docs.ts` | 设计评审方法论 |
| `{{REVIEW_DASHBOARD}}` | `gen-skill-docs.ts` | review readiness dashboard |
| `{{TEST_BOOTSTRAP}}` | `gen-skill-docs.ts` | 测试框架检测和引导 |

这说明 gstack 不是手写一堆互相复制的 Markdown，而是在逐步把重复流程抽成共享模板。

---

## 十一、实际使用路线：别一次性全上

如果你只是想试 gstack，不建议从 30 个命令开始背。按阶段选就够了。

### 最小闭环

```text
/office-hours
  -> /plan-eng-review
  -> 实现
  -> /review
  -> /qa
  -> /ship
```

这条链路覆盖：想清楚、工程评审、代码审查、真实浏览器测试、发布门禁。

### 做产品功能

```text
/office-hours
  -> /plan-ceo-review
  -> /plan-design-review
  -> /plan-eng-review
  -> 实现
  -> /design-review
  -> /qa
  -> /ship
```

适合用户可见功能，尤其是 UI 产品。

### 做开发者工具

```text
/office-hours
  -> /plan-devex-review
  -> /plan-eng-review
  -> 实现
  -> /devex-review
  -> /benchmark
  -> /ship
```

适合 API、SDK、CLI、插件、文档站。

### 做高风险修复

```text
/guard
  -> /investigate
  -> 修复
  -> /review
  -> /qa 或 /canary
  -> /ship
```

适合线上问题、生产数据、权限相关修复。

---

## 十二、gstack 最值得借鉴的不是命令，而是分类思想

读完源码后，我觉得 gstack 对团队最有价值的不是“照搬 Garry Tan 的所有 skill”，而是这套分类方式：

- 产品问题交给产品角色质疑。
- 工程问题交给工程角色画图和建测试矩阵。
- UI 问题分成计划前和实现后两个阶段。
- QA 必须用真实浏览器，而不是读源码假装测试。
- 发布必须有门禁、证据和 PR body。
- 危险操作必须在工具调用层拦截。
- 复盘和 learnings 必须持久化。

这比“写一个万能 CLAUDE.md”更接近真实软件工程。因为真实工程不是一次回答，而是一条工作流；不是一个聪明模型，而是一组互相制衡的角色；不是让 AI 更自由，而是给 AI 更清晰的轨道。

---

> **参考来源**：`garrytan/gstack` main 分支，重点阅读 `README.md`、`docs/skills.md`、`ARCHITECTURE.md`、顶层 `SKILL.md`、`office-hours/SKILL.md`、`plan-*review/SKILL.md`、`review/SKILL.md`、`qa/SKILL.md`、`ship/SKILL.md`、`browse/SKILL.md`、`careful/freeze/guard/SKILL.md`。源码读取于 2026-04-25。

---

*作者：[AI-Authored Tech Chronicles]*
*系列：《AI 编程最佳实践》第二篇*
