# Ticket 04 Chrome DevTools MCP 原始验收记录

- 日期：2026-09-12
- 自动化：独立 `chrome-devtools-mcp`，Headless Chrome 153.0.0.0
- 冻结构建：`.extension-launch/candidates/ticket-04`
- 扩展 ID：`depjpmobfacoapjmjpdgmifhejhdihmf`

## 工具调用与可观察结果

1. `install_extension` 从冻结目录安装；`list_extensions` 显示“外链直达”0.1.0 Enabled。popup 内读取的运行时清单保存在 `runtime-environment.json`。
2. CSDN 开关开启时访问已核实 `link.csdn.net/?target=...`，最终页面为 `https://example.com/direct-link-ticket-04?case=csdn`；证据为 `csdn-direct.txt`、`csdn-direct.png`。
3. `trigger_extension_action` 后等待并重新 `list_pages`，从原生 action 打开 popup page 19；`popup-initial.txt` 显示四个真实开关。
4. 关闭 CSDN 开关后访问有效中转，最终地址保留在 `link.csdn.net`，页面显示 CSDN 安全中心；证据为 `csdn-disabled.txt`、`csdn-disabled.png`。
5. 关闭 popup 后再次触发 action，重新枚举得到新 page 20。`popup-reopen-disabled.txt` 显示 CSDN 开关仍关闭；随后恢复开启。
6. 在真实 `https://www.csdn.net/` 文档中插入一个带已核实中转地址的可见锚点，等待扩展自身的 MutationObserver。`dynamic-anchor-enabled.json` 显示同一 connected 元素被改为 HTTPS 目标。通过真实 popup 关闭 CSDN 后，`dynamic-anchor-restored.json` 显示同一元素不重载即恢复原中转地址。
7. 恢复 CSDN 开关后访问 `target=javascript:alert(1)`。最终地址仍为 `link.csdn.net`，没有执行恶意协议；证据为 `csdn-unsafe-preserved.txt`。

## 外部页面行为

CSDN 开关关闭或目标被拒绝时，公开站点显示其安全中心。验收只据浏览器最终 URL 和页面快照判断插件是否保持原行为，不把站点内容本身当成插件生成结果。
