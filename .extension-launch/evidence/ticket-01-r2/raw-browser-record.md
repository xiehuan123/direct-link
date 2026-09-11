# Chrome DevTools MCP raw operation record — ticket 01 correction

- Uninstalled this project's prior ticket-01 extension ID `cmhbeofehlachihaemmpbpailbhoilgc`.
- Installed `/Users/xiehuan/Desktop/浏览器插件/direct-link/.extension-launch/candidates/ticket-01-r2`; result: `Extension installed. Id: dngjcnolbpkfieojolidciegpkgkbini`.
- `list_extensions`: `id=dngjcnolbpkfieojolidciegpkgkbini "外链直达" v0.1.0 Enabled`.
- Triggered the extension action and obtained popup page 4.
- `fill_form` set Juejin, Zhihu, and CSDN switches to false; all three were observed unchecked and status read `设置已保存`.
- `fill` set the master switch to false; it was observed unchecked, all three site switches were disabled, and status read `已暂停全部直达`.
- Closed popup page 4, triggered the action again, and obtained new popup page 5.
- The reopened snapshot observed master and all three site switches still off; all site controls remained disabled.
- Restored master and all three site switches to true through the real form for subsequent adapter tests; status read `设置已保存`.

All referenced snapshots, screenshots and runtime output were written directly by Chrome DevTools MCP.
