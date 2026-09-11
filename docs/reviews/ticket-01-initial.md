# Ticket 01 initial two-axis review

Fixed point: `96275cd912ed496b042fc9f99a715bbd3b8ed817`

Reviewed commit: `b610c8d`

Diff: `git diff 96275cd...b610c8d`

## Standards

1. Hard: tickets 02–05 used `ready-for-agent` despite unmet `Blocked by` dependencies; this conflicted with the local label meaning “fully specified and implementable”.
2. Judgement: platform IDs/settings/UI repeated the same three-field group, creating possible Data Clumps / Shotgun Surgery.
3. Judgement: scaffolded Firefox scripts were speculative because the project is Chrome-only.

## Spec

1. High: ticket 01 promised explicit three-site permissions, but the first manifest had only `storage`.
2. Medium: browser evidence operated only the Zhihu switch, not master and all site switches.
3. Low: tests did not exercise master/per-site gating.

Disposition: all hard/spec findings are fixed in the ticket 01 correction. Platform IDs are centralized; static markup remains explicit for accessibility and a fixed three-site scope.
