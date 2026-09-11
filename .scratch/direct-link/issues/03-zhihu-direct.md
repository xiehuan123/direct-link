# 03 — 知乎外链安全直达

**Parent:** `.scratch/direct-link/spec.md`

**What to build:** 在知乎来源页和 `link.zhihu.com` 中转页应用同一安全契约及知乎分站开关，并在公开站点限制出现时保存可核对的真实结果。

**Blocked by:** 02 — 掘金外链安全直达。

**Status:** blocked

**Required skills:** `chrome-extensions`, `implement`, `tdd`, `diagnosing-bugs`（仅真实失败时）, `code-review`, Chrome DevTools MCP

- [ ] AC-04 知乎适配器、来源决策和设置边界完成。
- [ ] 真实 Chrome 访问已核实中转 URL，记录最终 URL 或外部站点限制。
