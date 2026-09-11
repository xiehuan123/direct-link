# 项目决定

按用户原话、已有记录或实际证据填写；区分用户已确认、AI 暂定、待决定。沉默不等于同意。

| 编号 | 要决定什么 | 答案 | 来源与日期 | 状态 | 影响规格/验收 | 替代旧决定 |
| --- | --- | --- | --- | --- | --- | --- |
| D-001 | 交付范围 | 仅本地可加载成品，不上架、不 push、不建远端 | 用户明确要求，2026-09-11 | confirmed | `extension/`、本地 ZIP、无商店动作 | 初始化的未决定分发状态 |
| D-002 | 浏览器自动化 | 独立 Chrome DevTools MCP | `run-inputs/browser-choice/user-decision.md` | confirmed and executed | 所有真实 E2E、截图、运行时清单 | 默认 Playwright MCP |
| D-003 | 技术栈 | WXT 0.20.11、Vanilla TypeScript、Manifest V3 | 复杂项目技术默认 | executed | `scaffold-source/`、锁文件、正式构建 | 无 |
| D-004 | 站点范围 | 只支持三个精确中转主机及 `target` 参数 | 调研和规格，2026-09-11 | executed | 适配器注册表和最小 host permissions | 宽泛全网重写（拒绝） |
| D-005 | 安全上限 | HTTP(S)、无凭据、目标 ≤8192 字符、最多三层已知中转、seen-set 防循环 | 正式规格 | executed | 解析器 fixtures 和安全失败 E2E | 无限制解码（拒绝） |

这些决定的真实性以规格、源码、浏览器证据和门禁报告为准，不以本表单独证明。
