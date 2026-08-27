# Ownership Transfer Policy

## 1. Single Canonical Owner Invariant
Each organization and project in Venture Hub OS has exactly one active canonical owner (`ownerUserId`). Multiple simultaneous owners or unowned entities are prohibited by domain validation.

## 2. Last Owner Protection
- An organization owner cannot be removed, suspended, or downgraded while remaining the sole owner.
- To relinquish ownership, the current owner or platform admin must execute `TransferOrganizationOwnership` or `TransferProjectOwnership`.
- The target user MUST satisfy two conditions:
  1. User must exist and have `UserProfile.status == ACTIVE`.
  2. User must be an active member of the target organization (`OrganizationMembership.status == ACTIVE`).
- Cross-tenant user ownership transfers are rejected fail-closed (`TARGET_USER_OUTSIDE_ORGANIZATION`).
