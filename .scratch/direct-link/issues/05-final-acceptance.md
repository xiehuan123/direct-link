# 05 — 三站整合候选与独立验收

**Parent:** `.scratch/direct-link/spec.md`

**What to build:** 生成固定的最终 `extension/` 候选，跨设置、三站成功/失败边界和重开持久化执行独立真实验收，并整理中文说明及本地交付包。

**Blocked by:** 03 — 知乎外链安全直达；04 — CSDN 外链安全直达。

**Status:** ready-for-agent

**Required skills:** `chrome-extensions`, `implement`, `diagnosing-bugs`（仅真实失败时）, `code-review`, Chrome DevTools MCP, `browser-extension-launch` acceptance/release tools

- [ ] AC-01 至 AC-07 在当前候选上有真实或明确边界证据。
- [ ] AC-08 指纹、release bundle、最终双轴审查和 acceptance gate 对应同一 `extension/`。
- [ ] 中文使用说明、技能调用记录和 FINAL_REPORT 完整。
