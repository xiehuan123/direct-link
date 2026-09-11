# Ticket 03 Chrome DevTools MCP 原始验收记录

- 日期：2026-09-12
- 自动化：独立 `chrome-devtools-mcp`，Headless Chrome 153.0.0.0
- 冻结构建：`.extension-launch/candidates/ticket-03`
- 扩展 ID：`oilphoibbjjenebmfeimmpankhcnjalk`

## 工具调用与可观察结果

1. `install_extension` 从冻结目录安装，随后 `list_extensions` 与扩展页运行时清单确认启用、版本为 0.1.0；完整清单保存在 `runtime-environment.json`。
2. 在分站开关启用时，`navigate_page` 访问 `https://link.zhihu.com/?target=https%3A%2F%2Fexample.com%2Fdirect-link-ticket-03%3Fcase%3Dzhihu`。页面最终地址为 `https://example.com/direct-link-ticket-03?case=zhihu`；快照、截图分别是 `zhihu-direct.txt`、`zhihu-direct.png`。
3. `trigger_extension_action` 真实触发工具栏入口，等待后重新 `list_pages` 得到 popup page 17。`popup-initial.txt` 显示总开关与三个分站开关。
4. 在 popup 中把“知乎”开关设为关闭，关闭该 popup，再访问带有效 `target` 的知乎中转 URL。页面停留在原 `link.zhihu.com` 地址并显示站点自身的“请求已被拦截”；证据是 `zhihu-disabled.txt`、`zhihu-disabled.png`。
5. 再次 `trigger_extension_action`，等待并重新 `list_pages` 得到新的 popup page 18，而非复用旧 pageId。`popup-reopen-disabled.txt` 显示知乎开关仍未勾选，证明 `chrome.storage.local` 持久化。随后恢复知乎开关为开启。
6. 在开关开启时访问未知参数 `?url=...`。页面仍停留在 `link.zhihu.com` 并由站点显示拦截页，没有跳到目标；证据是 `zhihu-unknown-parameter.txt`、`zhihu-unknown-parameter.png`。

## 外部限制

知乎中转页在未被插件处理（分站关闭或参数未知）时由站点返回 566/“请求已被拦截”。这是公开站点的真实响应，不是插件报错；本记录只把可直接观察到的 URL 与页面状态记为通过，不把受限页面伪报成站点业务页成功。
