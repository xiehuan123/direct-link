# Chrome DevTools MCP raw operation record — ticket 02 review correction

- Uninstalled prior project candidate ID `mmifahddlpjpgpeakmcdjgikmfdiokii` and installed frozen `ticket-02-r2`; result ID `jepekhngeckmnnkgjmdkdhomogikcemi`.
- Reloaded real Juejin article `https://juejin.cn/post/7146791838970544135` so the corrected current content script registered.
- In the real page DOM, appended anchor `#direct-link-dynamic-fixture` with Juejin intermediary href. After 250 ms, Chrome DevTools MCP read its href as `https://example.com/dynamic-fixture`.
- Triggered the native extension action, switched Juejin off, then read the same still-connected DOM anchor without page reload. Its href had returned to the exact original `https://link.juejin.cn/?target=...` intermediary.
- Restored Juejin, visited a valid real intermediary URL, and observed final `https://example.com/ticket-02-r2`.
- Opened native action, set master off, closed it, triggered action again and obtained new popup page 16. Snapshot recorded master off, site controls disabled, and `已暂停全部直达`; master was restored.
- Visited `target=javascript:alert(1)` with settings enabled; final URL remained `link.juejin.cn`.

No fake Chrome API or direct storage write was used. The test-only DOM anchor exercised the actually registered MutationObserver on a real supported source page.
