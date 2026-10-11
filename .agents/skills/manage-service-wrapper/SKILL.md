---
name: manage-service-wrapper
description: 'Create, update, relocate, or remove typed HTTP service wrappers and keep their shared or feature ownership and consumers correct.'
---

# Placement and lifecycle

Generic endpoint wrappers used across features belong in `src/shared/lib/service/<domain>/`. A service used by only one view starts in `src/feature/<feature>/views/<view>/service/`; promote it to `src/feature/<feature>/service/` when at least two views clearly share the same behavior-safe operation. Before creating or promoting, search the view, feature, and shared service owners for an exact fit. Shared systems with an application use case expose it through `<system>/main.ts`; generic endpoint files remain in the shared `lib/service/` category.

- **Create:** Use `<method>.<operationName>.ts`, define request/response types beside the endpoint, and call the shared HTTP client. Reuse an exact existing wrapper; otherwise keep view-only service logic inside that view. Reuse established client/error handling.
- **Update or relocate:** Search all callers and type imports. Preserve endpoint method, payload shape, response semantics, and error behavior unless the requested change requires otherwise. Consolidate duplicate view services at feature scope only for clear 2+ view reuse, then update callers atomically.
- **Remove:** Search calls and exported types first. Delete only when no consumers remain; clean up unused domain folders without retaining empty placeholders.

```ts
import { http } from '../http'

export interface <OperationName>Request {
  // request properties
}

export interface <OperationName>Response {
  // response properties
}

export async function post<OperationName>(
  data: <OperationName>Request,
): Promise<<OperationName>Response> {
  return http.post<<OperationName>Response>('/api/<domain>/<path>', data)
}
```

Shared services may import shared modules and dependencies only. Features can consume shared services or their own feature services; cross-feature imports are forbidden.

# Verify

Run the relevant `pnpm check:convention:*` command, `pnpm lint`, and `pnpm build` after source changes.
