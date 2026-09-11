# 外链直达

一个本地 Chrome Manifest V3 扩展：在掘金、知乎、CSDN 的来源页还原已经核实的外链，并在三个站点自己的外链中转页自动前往安全的 HTTP(S) 目标。

可直接加载的成品目录是 [`extension/`](extension/)。安装和开关操作见 [`使用说明.md`](使用说明.md)。

## 支持范围

| 平台 | 中转主机 | 目标参数 | 来源主机 |
| --- | --- | --- | --- |
| 掘金 | `link.juejin.cn` | `target` | `juejin.cn` |
| 知乎 | `link.zhihu.com` | `target` | `www.zhihu.com`、`zhuanlan.zhihu.com` |
| CSDN | `link.csdn.net` | `target` | `blog.csdn.net`、`www.csdn.net` |

只接受绝对 `http:`/`https:` 目标；拒绝凭据、空值、恶意协议、同地址循环、未知参数、超过三层的嵌套和超长输入。插件不绕过 Chrome 的 TLS/恶意网站警告，也不处理登录、支付或权限确认。

## 源码与构建

源码及锁文件位于 `scaffold-source/`，技术栈为 WXT 0.20.11、Vanilla TypeScript、Manifest V3。

```sh
cd scaffold-source
npm ci
npm test
npm run compile
npm run build
```

正式输出在 `scaffold-source/.output/chrome-mv3/`。交付时该目录的文件被逐项复制并核对到根目录 `extension/`；`extension/` 不是开发服务器输出。

本项目只做本地交付，没有远端、没有 `git push`，也没有商店发布操作。
