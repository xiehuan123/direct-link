# 02 — 掘金外链安全直达

**Parent:** `.scratch/direct-link/spec.md`

**What to build:** 在掘金来源页和 `link.juejin.cn` 中转页，只对安全有效的 `target` 目的地址直达；关闭掘金或总开关时保留原行为。

**Blocked by:** 01 — 可持久化的工具栏设置壳。

**Status:** ready-for-agent

**Required skills:** `chrome-extensions`, `implement`, `tdd`, `code-review`, Chrome DevTools MCP

- [ ] AC-03 掘金有效中转真实浏览器直达且开关有效。
- [ ] AC-06 共享解析器拒绝恶意、循环、未知和越界输入。
- [ ] AC-07 来源链接决策 fixture 覆盖静态与动态链接处理边界。
