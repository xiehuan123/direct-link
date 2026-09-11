# 外链直达 domain context

## Purpose

外链直达 removes a supported platform's own confirmation hop while preserving every unsupported or unsafe navigation unchanged.

## Glossary

- **来源页**: a supported Juejin, Zhihu, or CSDN content page containing links.
- **中转地址**: an HTTP(S) URL on one exact supported redirect host with its documented destination parameter.
- **目的地址**: the final, validated HTTP(S) URL obtained from a supported intermediary URL.
- **站点适配器**: the host-and-parameter contract for one platform.
- **保留原行为**: make no navigation and do not rewrite a link.
- **总开关**: the local setting gating every adapter.
- **分站开关**: the local setting gating one platform adapter.

## Invariants

- Only exact supported hosts and parameters can start resolution.
- Only `http:` and `https:` destination protocols are accepted.
- Invalid, oversized, looping, credential-bearing, or over-nested input preserves original behavior.
- Settings stay in `chrome.storage.local`; browsing history is never uploaded.
