# 外链直达：复杂项目规格入口

本文件仅为调度索引，不是另一份权威规格。尚未执行 to-spec，也未发布主票或创建独立模块工单。

- 需求来源：在掘金、知乎、CSDN来源页还原已核实外链，并在中转页自动直达；提供本地保存的总开关和分站开关。
- 复杂度理由：三个网站适配器、共享安全解码、来源页改写、中转页自动跳转、设置持久化与跨上下文真实验收形成多个有依赖的纵向功能。
- 本次交付目标：在本机使用（local；provided）
- 正式规格：待 to-spec 生成 .scratch/<feature>/spec.md 后填入实际路径。
- 正式主票：待 to-spec 发布后记录实际路径/链接和发布证据。
- 子票：待 to-tickets 生成后记录 issues/*.md 的实际路径和模块所有权。

先使用 setup-matt-pocock-skills 完成首次/缺失配置，再执行 to-spec → 发布正式主票 → to-tickets → implement。
默认沿用这些 skills 的 Local Markdown 工作流，由主执行者自行做技术判断和拆分；更新 state.workflow.authoritative_artifacts 指向实际产物。
tasks/T-*.md 仅跟踪阶段依赖和验收证据，实施范围与验收标准以正式规格和子票为准。外部反馈或旧票需要分流时才使用 triage。
每票必须使用 code-review，并通过 Playwright MCP 实际加载插件完成端到端验证；发现问题必须使用 diagnosing-bugs。
