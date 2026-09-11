# 03 — 知乎外链安全直达

**Parent:** `.scratch/direct-link/spec.md`

**What to build:** 在知乎来源页和 `link.zhihu.com` 中转页应用同一安全契约及知乎分站开关，并在公开站点限制出现时保存可核对的真实结果。

**Blocked by:** 02 — 掘金外链安全直达。

**Status:** in-review

**Required skills:** `chrome-extensions`, `implement`, `tdd`, `diagnosing-bugs`（仅真实失败时）, `code-review`, Chrome DevTools MCP

- [x] AC-04 知乎适配器、来源决策和设置边界完成。
- [x] 真实 Chrome 访问已核实中转 URL，记录最终 URL 或外部站点限制。

**Evidence:** `.extension-launch/evidence/ticket-03/acceptance.json`（真实 Chrome DevTools MCP；有效目标直达、分站关闭、重开持久化与未知参数保留）。
