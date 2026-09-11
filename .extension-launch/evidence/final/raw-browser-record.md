# 最终 extension/ 的 Chrome DevTools MCP 原始验收记录

- 日期：2026-09-12
- 自动化：本项目独立 `chrome-devtools-mcp`
- 浏览器：Headless Chrome 153.0.0.0
- 实际加载目录：`/Users/xiehuan/Desktop/浏览器插件/direct-link/extension`
- 扩展 ID：`baicapkmaepmibjbohgmbobdkigoocml`
- 版本：0.1.0

## 安装与原生入口

1. `uninstall_extension` 移除票 04 候选。
2. `install_extension` 只从根目录 `extension/` 安装，返回 ID `baicapkmaepmibjbohgmbobdkigoocml`。
3. `list_extensions` 返回“外链直达”v0.1.0 Enabled。
4. `trigger_extension_action` 后等待 900ms 并重新 `list_pages`，出现 popup page 22。`popup-initial.txt` 和 `popup-initial.png` 是原生入口的快照/截图；`runtime-environment.json` 是从该扩展上下文读取的 user agent、扩展 ID 与 manifest。

## 设置、关闭重开与持久化

1. 在 page 22 把总开关设为 false；同一真实 popup 立即显示“已暂停全部直达”，三个分站开关 disabled。
2. 关闭 popup 后访问有效掘金中转，页面停在原 `link.juejin.cn` 并显示掘金跳转提示：`master-off-juejin-preserved.txt`、`.png`。
3. 再次 action，等待并重新枚举得到新 popup page 23，没有复用旧 pageId。`popup-reopened-paused.txt`、`.png` 显示总开关仍关闭且状态为“已暂停全部直达”。随后恢复总开关。
4. 最后一次关闭/重开得到 page 25，`popup-final-all-enabled.txt` 显示总开关及三个分站均开启，作为交付后的本机最终状态。

## 三站有效中转

- 掘金：访问 `link.juejin.cn/?target=...final-juejin...`，工具返回最终 URL `https://example.com/final-juejin?source=e2e`；`juejin-direct.txt`。
- 知乎：访问 `link.zhihu.com/?target=...final-zhihu...`，工具返回最终 URL `https://example.com/final-zhihu?source=e2e`；`zhihu-direct.txt`。这也证明最终候选在 `document_start` 能先于当前公开站点 566 限制完成导航。
- CSDN：访问 `link.csdn.net/?target=...final-csdn...`，工具返回最终 URL `https://example.com/final-csdn?source=e2e`；`csdn-direct.txt`。

## 来源页动态处理与分站隔离

1. 重新加载真实公开掘金文章 `https://juejin.cn/post/7146791838970544135`，确保最终安装的内容脚本已注入。
2. 用真实页面 DOM 新增一个可见 `link.juejin.cn/?target=...` 锚点，等待扩展实际 MutationObserver。`dynamic-anchor-enabled.json` 显示同一 connected 元素变为 `https://example.com/final-dynamic?source=juejin`，截图为 `dynamic-anchor-enabled.png`。
3. 从原生 popup 只关闭掘金，未重载来源页；`dynamic-anchor-restored.json` 显示同一元素立即恢复原中转 href。
4. 掘金关闭期间访问有效知乎中转仍到达 `https://example.com/final-juejin-off-zhihu-on`，证据为 `juejin-off-zhihu-on.txt`。随后恢复掘金。

## 安全失败

- 总开关关闭时有效地址保留：`master-off-juejin-preserved.txt`。
- 未知参数 `?url=` 不被处理，地址保留在掘金中转页：`unknown-parameter-preserved.txt`。
- `target=javascript:alert(1)` 不执行，地址保留在 CSDN 安全中心：`unsafe-protocol-preserved.txt`。
- 凭据、空目标、同地址/已知中转循环、超过三层、超长目标和恶意来源主机由 16 个本地 fixture 中的共享解析器边界覆盖；这些静态结果只作为边界补充，不冒充真实浏览器 E2E。

所有真实交互均在用户指定的独立 Chrome DevTools MCP profile 中完成；没有访问日常 Chrome、没有注入假的 Chrome API、没有直接写扩展 storage。
