---
name: create-service-wrapper
description: 'Create typed HTTP endpoint wrappers in the shared service library, preserving shared ownership and feature boundaries.'
---

# Placement and ownership

Cross-feature HTTP endpoint wrappers belong in `src/shared/lib/service/<domain>/` and use `<method>.<operationName>.ts` names. The shared HTTP client lives in `src/shared/lib/service/http.ts`. A service specific to one domain feature belongs under that feature's `service/` folder instead.

Shared systems that provide a use case have a root `main.ts` entry point. Keep endpoint wrapper modules in the shared `lib/service/` category; do not create a system wrapper when the service is only a generic endpoint function.

# Typed endpoint pattern

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

Keep request/response types close to their endpoint. Shared modules may import shared modules and dependencies only; they must not depend on app or feature code. Features consume shared wrappers without cross-feature imports.

# Verify

Run `pnpm check:architecture`, `pnpm lint`, and `pnpm build`.
