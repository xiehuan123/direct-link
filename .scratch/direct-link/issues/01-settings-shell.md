# 01 — 可持久化的工具栏设置壳

**Parent:** `.scratch/direct-link/spec.md`

**What to build:** 用户从工具栏打开“外链直达”，操作总开关和三个分站开关，关闭后重新打开仍看到相同选择；扩展同时具备最小、明确的三站权限和正式图标。

**Blocked by:** None — can start immediately.

**Status:** completed

**Required skills:** `chrome-extensions`, `implement`, `tdd`（存储模型公开边界）, `code-review`, Chrome DevTools MCP

- [x] AC-01 当前构建真实安装且原生 action 可打开。
- [x] AC-02 开关经 UI 操作并重开后持久化。
- [x] Manifest V3 权限、入口和图标完整，构建/类型检查通过。

## Completion evidence

- Corrected candidate: `.extension-launch/candidates/ticket-01-r2`
- Acceptance: `.extension-launch/evidence/ticket-01-r2/acceptance.json`
- Gate: `.extension-launch/evidence/ticket-01-r2/gate-report.json` (`gate_passed: true`)
- Initial review: `docs/reviews/ticket-01-initial.md`; all hard/spec findings corrected.
- TDD: `node --experimental-strip-types --test tests/settings.test.ts` — 3/3 passed.
- Production build: WXT 0.20.11 on Node 24.19.0.
- Correction recheck: ticket 02 candidate native-action reopen shows master off with `已暂停全部直达`; `.extension-launch/evidence/ticket-02/popup-reopened-paused.txt`.
- Correction review: `docs/reviews/ticket-01-correction.md`; both remaining findings resolved.
