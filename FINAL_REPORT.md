# 外链直达 0.1 最终报告

## 成品

- 可直接加载目录：`extension/`
- 本地 ZIP：`.extension-launch/release/external-link-direct-0.1.0.zip`
- 版本：0.1.0
- Manifest：Chrome MV3
- 技术栈：WXT 0.20.11、Vanilla TypeScript
- 候选指纹：`ff3eb54e3c1fce2b5a59a4c149c2350dd9850c0edb35db7200da6aef0adf6758`

`extension/` 来自 `scaffold-source/.output/chrome-mv3/` 的正式构建并经逐文件核对，不是开发服务器目录。最终 Chrome DevTools MCP 从该根目录安装，运行时扩展 ID 为 `baicapkmaepmibjbohgmbobdkigoocml`。

## 实现功能

- 只识别 `link.juejin.cn`、`link.zhihu.com`、`link.csdn.net` 的精确 `target` 契约。
- 在明确的掘金、知乎、CSDN 来源域预先还原外链；MutationObserver 只增量处理新增子树。
- 即使进入支持的中转页，也在 `document_start` 使用替换式导航直达有效 HTTP(S) 目标。
- 工具栏中文 popup 提供总开关及三个分站开关，设置保存在 `chrome.storage.local`。
- 关闭分站后，已改写的同一链接无需重载即可恢复原中转地址。
- 拒绝非 HTTP(S)、凭据、空值、未知参数、未知主机、同地址/嵌套循环、超过三层嵌套和超长输入。

## 已验证

- `npm test`：16/16 通过。
- `npm run compile`：通过。
- `npm run build`：通过，且输出与 `extension/` 一致。
- `npm audit --omit=dev`：0 vulnerabilities。
- `acceptance_gate.py check extension`：候选指纹匹配，最终报告见 `.extension-launch/evidence/final/gate-report-final.json`。
- `release_bundle.py check/pack extension`：零 warning；ZIP SHA-256 为 `06f404a31339b2be0e7ebff3d04997c97e32343b334c25aa58673f1e5f99c357`。
- 真实独立 Chrome：从 `extension/` 安装；触发原生 action；总开关和三个分站开关分别关闭、关闭 popup、以新 pageId 重开并保持；最终恢复全开。
- 三个真实中转 URL 均到达各自的 `example.com` 目标。
- 真实掘金文章中动态新增锚点被扩展处理，并在关闭掘金后对同一 connected 元素即时恢复。
- 未知 `url` 参数与 `javascript:` 目标在真实 Chrome 中保留中转行为。

真实浏览器总记录：`.extension-launch/evidence/final/raw-browser-record.md`；验收 JSON：`.extension-launch/evidence/final/acceptance.json`；截图和原始快照均在同目录。用户的浏览器选择原文已逐字复制到 `.extension-launch/evidence/final/browser-choice-user-decision.md`，环境字段明确为 `chrome-devtools-mcp`。

## 未验证与边界

- 没有测试或承诺未列出的平台、短链服务、任意重定向服务或未来改版参数。
- 不绕过 Chrome TLS、恶意网站警告、登录、支付或权限确认。
- 没有 Chrome Web Store 提交、审核或线上安装；没有远端、push 或商店付款动作。
- 公开站点页面可能随时改变；已核实契约的日期和基线见 `docs/research/redirect-mechanisms.md`。知乎未被插件处理时在受控环境会返回 566，证据如实保留；最终有效中转由扩展在 `document_start` 成功先行导航。

## Git 与审查

主要可恢复提交：

- `b610c8d` / `6a68886`：设置壳及审查修正
- `4d918dd` / `977de2e`：掘金适配及审查修正
- `869d392`：知乎适配
- `04319fe`：CSDN 适配
- `49efbf6`：最终 `extension/`、真实验收和本地发布包
- `8962115`：最终审查整改、三分站重开持久化证据和 FINAL_REPORT

每票 Standards/Spec 双轴记录位于 `docs/reviews/`。最终初审发现报告、审查状态和分站重开证据缺口，整改后 correction Standards/Spec 均 PASS；完整结论见 `docs/reviews/final.md`。

## 安装

操作见 `使用说明.md`：在 `chrome://extensions/` 打开开发者模式，选择“加载已解压的扩展程序”，加载本项目根目录的 `extension/`。
