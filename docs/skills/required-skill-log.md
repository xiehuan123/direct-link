# 必需技能调用记录

| Skill | Source | Input | Execution evidence | Status |
| --- | --- | --- | --- | --- |
| `browser-extension-launch` | `.runtime/codex-home/skills/browser-extension-launch/SKILL.md` | BRIEF、本地交付、已选 Chrome DevTools MCP | 复杂工作流、逐票/最终真实验收、acceptance gate、release bundle 与本地成品 | executed |
| `setup-matt-pocock-skills` | `.runtime/codex-home/skills/setup-matt-pocock-skills/SKILL.md` | 无远端的新仓库；用户授权技术默认 | `AGENTS.md`、`docs/agents/*.md`、Local Markdown tracker | executed |
| `to-spec` | `.runtime/codex-home/skills/to-spec/SKILL.md` | BRIEF、浏览器决定、三站调研、测试缝 | `.scratch/direct-link/spec.md`（ready-for-agent） | executed |
| `to-tickets` | `.runtime/codex-home/skills/to-tickets/SKILL.md` | 已发布本地规格；纵向切片与依赖由编排决定 | `.scratch/direct-link/issues/01-05*.md` | executed |
| `extension-create` | `.runtime/codex-home/skills/extension-create/SKILL.md` | `direct-link`、Vanilla TS、popup/content/storage | WXT CLI 0.20.11 实际生成 `scaffold-source/`；Node 24 下依赖安装完成 | executed |
| `chrome-extensions` | `.runtime/codex-home/skills/chrome-extensions/SKILL.md` | MV3、popup、content scripts、storage、窄化 host 权限 | `scaffold-source/`、最终 `extension/`、真实 Chrome 安装/入口/内容脚本证据 | executed |
| `diagnosing-bugs` | `.runtime/codex-home/skills/diagnosing-bugs/SKILL.md` | WXT/Node 引擎和 npm 缓存安装失败 | 红信号、原因、隔离缓存/Node 24 修复及成功安装日志 | executed |
| `tdd` | `.runtime/codex-home/skills/tdd/SKILL.md` | 解析器及设置模型公开接口 | 各适配器 red/green；最终 16/16 fixtures 通过 | executed |
| `implement` | `.runtime/codex-home/skills/implement/SKILL.md` | 每张 ready-for-agent 子票 | 票 01 设置壳；票 02 掘金；票 03 知乎；票 04 CSDN；票 05 最终整合与本地包 | executed; tickets 01-05 |
| `code-review` | `.runtime/codex-home/skills/code-review/SKILL.md` | 每票固定 Git 基线、对应规格/票 | 逐票双审；最终初审 findings 整改后 correction Standards/Spec 均 PASS，见 `docs/reviews/final.md` | executed |

本轮对 setup/to-spec/to-tickets 中询问步骤的适配依据：用户明确要求所有 Local Markdown 技术默认、选票和拆分由开发会话决定，不向新手重复确认。读取证据与执行产物分开记录；`.runtime/` 不提交。
