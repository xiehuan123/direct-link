# 外链直达：复杂项目规格入口

本文件仅为 `browser-extension-launch` 的调度索引，不是第二份规格。

- 权威规格：`.scratch/direct-link/spec.md`
- 正式本地主票：同上，状态 `ready-for-agent`
- 独立子票：`.scratch/direct-link/issues/01-05*.md`
- 技能执行记录：`docs/skills/required-skill-log.md`
- 源码：`scaffold-source/`
- 最终加载目录：`extension/`
- 真实浏览器验收：`.extension-launch/evidence/final/acceptance.json`
- 本地发布包：`.extension-launch/release/external-link-direct-0.1.0.zip`

复杂度理由是三个站点适配器、共享安全解码、来源页改写、中转页自动跳转、设置持久化与跨上下文真实验收存在依赖。项目已真实执行 setup → to-spec → to-tickets → implement 流程；默认 Playwright 已按用户明确决定替换为独立 Chrome DevTools MCP。商店发布、远端和 push 不在本次范围。
