# 01 — 可持久化的工具栏设置壳

**Parent:** `.scratch/direct-link/spec.md`

**What to build:** 用户从工具栏打开“外链直达”，操作总开关和三个分站开关，关闭后重新打开仍看到相同选择；扩展同时具备最小、明确的三站权限和正式图标。

**Blocked by:** None — can start immediately.

**Status:** in-progress

**Required skills:** `chrome-extensions`, `implement`, `tdd`（存储模型公开边界）, `code-review`, Chrome DevTools MCP

- [ ] AC-01 当前构建真实安装且原生 action 可打开。
- [ ] AC-02 开关经 UI 操作并重开后持久化。
- [ ] Manifest V3 权限、入口和图标完整，构建/类型检查通过。
