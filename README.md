# AI-Authored Tech Chronicles

纯静态工程博客。发布文件直接维护为 HTML、CSS、JavaScript 和图片，无需 VitePress 或其他构建框架。

## 目录

- `site/`：完整的网站发布目录。
- `site/index.html`：首页专题导航和最近更新。
- `site/<系列>/index.html`：系列阅读目录。
- `site/<系列>/*.html`：独立文章或专题页面。
- `site/assets/`：共用样式、增强脚本和图片。
- `site/ai-programming-practices/research/`：8 份原始 Markdown 研究资料，系列首页提供文件与下载入口。
- `templates/`：复制使用的文章与系列模板，不参与部署。
- `scripts/check_site.py`：本地链接、资源和锚点检查。

## 本地预览

在仓库根目录执行以下命令，直接托管现有文件，不生成页面：

```bash
python3 scripts/serve_site.py
```

打开 <http://127.0.0.1:8888/>。预览服务器为文本文件声明 UTF-8，Markdown 以纯文本显示，避免中文乱码。可用 `--port` 修改端口。检查本地链接：

```bash
python3 scripts/check_site.py
```

## 新增 HTML 文章

1. 将 `templates/article.html` 复制为 `site/<系列>/<文章名>.html`。新目录和文件名使用小写英文及连字符。
2. 直接填写正文、标题、摘要与真实资料日期，同步维护阅读路径及其锚点。
3. 普通文章引用 `base.css`、`article.css` 和可选的 `article.js`。宽表格放入 `.table-scroll` 容器，代码使用 `pre > code`。
4. 更新系列页、首页已发布数量和最近更新；有前后篇时补充相邻文章链接。
5. 作者、系列、来源三行斜体尾注作为文章最后一组可见内容。来源与日期使用实际信息。
6. 执行链接检查，在桌面和手机宽度下预览，并确认禁用 JavaScript 后仍可阅读与导航。

图解、对照表等专题可以保留自己的布局。引用 `assets/css/special.css` 并添加首页和系列返回入口，避免与普通文章样式混用。图片按系列放入 `site/assets/images/<系列>/`，不依赖外部图片服务。

新增系列时复制 `templates/series.html`，填写实际内容并在首页添加卡片。所有链接和正文都保留在 HTML 中，不依赖运行时加载导航或正文。

## 材料与历史地址

正文材料已整理为原生 HTML：AI 编程思想 3 篇、AI 编程最佳实践 8 篇、RTC 算法 8 篇、WebRTC ICE 3 篇、Git 工作流 1 篇、VPS/ASN 1 篇；已转换的 Markdown 不再保留。旧首页与 CPU 导航材料已并入现有导航页面。

当前仅保留 AI 编程最佳实践的 8 份原始 Markdown 研究资料，位于 `site/ai-programming-practices/research/`。系列首页只提供原文件与下载入口，不将资料渲染为 HTML。

AI 编程思想系列直接维护三篇 HTML 正文。流程、职责、认知路径、治理锚点和 Agent 交互图直接用 HTML/CSS 排版；异步状态图使用 `site/assets/images/ai-programming-philosophy/` 下的静态 SVG。三篇文章引用 `philosophy.css`，提供独立的章节版式、阅读路径、范式卡片和九步交互卡片；`philosophy.js` 仅增强阅读进度。正文与图解不依赖 Markdown、Mermaid 或其他运行时框架，发布时无需转换步骤。

RTC、ICE、Git 与 VPS/ASN 的 13 篇文章采用共用长文版式、阅读路径、HTML/CSS 概览图及静态 SVG，不依赖运行时 Markdown 或 Mermaid。正文代码与原始来源日期保留。

AI 编程最佳实践的 8 篇正式文章在 `site/ai-programming-practices/`，使用原生长文排版，图表为 HTML/CSS 或静态 SVG。8 份研究资料以原始 `.md` 文件存放在其 `research/` 子目录，系列首页仅列出资料和下载入口，不生成研究资料 HTML 页面。

原独立 HTML 页面保持公开路径；已转换文章直接使用对应 `.html` 地址。AI 编程最佳实践统一使用 `ai-programming-practices/`，旧中文目录及其历史入口已删除。

## 部署

推送到 `main` 或 `master`，或手动启动 GitHub Actions：

1. 拉取仓库并配置 Pages。
2. 使用 Python 标准库检查本地链接。
3. 上传整个 `site/` 目录。
4. 通过 `actions/deploy-pages` 发布到 GitHub Pages。

不安装 Node.js 依赖，不转换 Markdown，不生成网站，也不需要 `.nojekyll`。GitHub 仓库的 **Settings → Pages → Source** 应设置为 **GitHub Actions**。

普通页面使用相对路径以适配仓库子目录。`404.html` 可能在任意路径显示，因此其入口使用 `/AI-Authored-Tech-Chronicles/`；仓库改名或迁移到自定义域名根路径时，同步调整该文件和链接检查脚本中的项目路径。

RTC 第一篇于 2026-10-14 重构为面向专业流媒体人员的回顾：先统一延迟与带宽口径、介绍 BBR/GCC 与 RTCP/TWCC，再用逐包账本、反馈流程和队列曲线演示闭环，最后回顾主要算法家族及反馈机制编年史。`rtc-intro.css` 提供 8 幅原生图解的局部样式；示例脚本只复算观测与队列，源码说明固定到 WebRTC 提交，史料区分论文、草案与 RFC 节点。
