# 三类平台外链中转调研

核查日期：2026-09-11。

## 已核实契约

| 平台 | 精确中转主机 | 参数 | 当前独立 Chrome 观察 |
| --- | --- | --- | --- |
| 掘金 | `link.juejin.cn` | `target` | 显示“即将离开稀土掘金”和“继续访问” |
| 知乎 | `link.zhihu.com` | `target` | URL 契约仍可构造；当前受控环境收到站点安全策略 566 拦截 |
| CSDN | `link.csdn.net` | `target` | 显示“您即将离开CSDN”和“继续” |

代表性公开技术说明同时列出了这三个精确主机与 `target` 参数：<https://juejin.cn/post/7146791838970544135>。实现不据此扩展到其他站点，也不采用文章中的 Manifest V2 示例。

## 基线地址

- `https://link.juejin.cn/?target=https%3A%2F%2Fexample.com%2F`
- `https://link.zhihu.com/?target=https%3A%2F%2Fexample.com%2F`
- `https://link.csdn.net/?target=https%3A%2F%2Fexample.com%2F`

浏览器原始快照和截图保存在 `.extension-launch/evidence/research/`。知乎基线的站点限制会在最终真实验收中如实记录；扩展内容脚本若能在响应文档前运行并完成导航，则记录最终 URL，否则不得伪造通过。

## 安全范围

- 只识别上表三个精确主机及参数。
- 参数解析先采用 URL 标准的一次解码，仅在尚不能形成 URL 时有限继续解码。
- 支持跨已知适配器的嵌套，深度上限为 3，并用已见地址集合阻止循环。
- 拒绝非 HTTP(S)、用户名/密码、空目标、超长值、同地址和未知参数。
- 来源页只在明确的平台来源域运行，动态链接由受限 MutationObserver 增量处理。
