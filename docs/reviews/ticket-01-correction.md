# Ticket 01 correction review

Fixed point: `b610c8d`

Reviewed commit: `6a68886`

## Standards

No hard violations remained. One judgement call remained: derive the popup setting ID list from the centralized platform ID constant.

## Spec

The permission and switch-operation gaps were closed. One medium defect remained: after reopening with master off, the controls were correctly persisted but the status text incorrectly said “已启用”.

## Disposition

Both remaining findings were corrected immediately after the review. Ticket 01 returned to `in-progress` until the corrected popup is exercised from the native action in the next frozen candidate.
