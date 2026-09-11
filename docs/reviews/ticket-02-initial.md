# Ticket 02 initial two-axis review

Fixed point: `6a68886`

Reviewed commit: `4d918dd`

## Standards

No hard violations. Judgement call: site match strings were duplicated between the adapter contract and both content-script entrypoints.

## Spec

1. High: disabling a source adapter did not restore href values already rewritten in the current page.
2. Medium: dynamic-node handling was implemented but not exercised by a fixture or E2E.
3. Low: the 8192-character limit lacked a test fixture.

## Disposition

- `SourceLinkRewriter` remembers and restores original intermediaries on setting changes.
- Exact content-script match arrays derive from the adapter registry.
- Added oversized-input and dynamic/restoration behavior tests (suite 11/11).
- Real Chrome on a Juejin article inserted a new DOM anchor, observed MutationObserver rewrite, then toggled Juejin off and observed immediate restoration without reload.
- Corrected candidate gate: `.extension-launch/evidence/ticket-02-r2/gate-report.json`.
