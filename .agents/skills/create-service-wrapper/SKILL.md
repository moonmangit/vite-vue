---
name: create-service-wrapper
description: 'Scaffold, organize, and create predefined typed HTTP API endpoint wrapper services in src/shared/lib/service/<domain>/ following <method>.<operationName>.ts conventions.'
---

# 1. Architectural Role & Placement

Endpoint wrapper services encapsulate individual backend API endpoints. They provide strongly-typed Request and Response TypeScript interfaces and execute HTTP requests through the shared client.

- **Directory Placement:** `src/shared/lib/service/<domain>/` (e.g. `src/shared/lib/service/auth/`, `src/shared/lib/service/user/`, `src/shared/lib/service/dashboard/`).
- **File Naming Pattern:** `<method>.<operationName>.ts`
  - `post.loginWithUsername.ts`
  - `get.loginWithGoogleAuth.ts`
  - `post.logout.ts`
  - `get.fetchMetrics.ts`
  - `put.updateProfile.ts`
  - `delete.removeUser.ts`

---

# 2. File Template & Content Standards

Every endpoint wrapper file must adhere to the following structure:

```ts
import { http } from '../http'

// 1. Typed Request Interface (if payload or query params required)
export interface <OperationName>Request {
  // request properties...
}

// 2. Typed Response Interface
export interface <OperationName>Response {
  // response properties...
}

// 3. Typed Service Wrapper Function
export async function <method><OperationName>(
  data?: <OperationName>Request,
): Promise<<OperationName>Response> {
  return http.<method><<OperationName>Response>('/api/<domain>/<path>', data)
}
```

---

# 3. Naming Rules Summary

1. **HTTP Method Prefix in Filename:** Lowercase method name followed by a dot (`get.`, `post.`, `put.`, `patch.`, `delete.`).
2. **Operation Name in Filename:** camelCase descriptive action name (e.g. `loginWithUsername.ts`, `fetchUserList.ts`).
3. **Exported Function Name:** `<method><PascalCaseOperationName>` (e.g. `postLoginWithUsername`, `getLoginWithGoogleAuth`).
4. **Interface Names:** `<PascalCaseOperationName>Request` and `<PascalCaseOperationName>Response`.

---

# 4. Layer Boundaries & Import Rules

- Service wrappers reside in `src/shared/lib/service/` (`shared` architectural layer).
- Service wrappers MUST ONLY import from `src/shared/*` (e.g. `import { http } from '../http'`).
- Feature stores (`src/feature/*/store/`), composables, and components can import service wrappers from `src/shared/lib/service/<domain>/<method>.<operationName>`.

---

# 5. Verification Checklist

1. **Format Check:** `pnpm format`
2. **Lint & Boundary Check:** `pnpm lint`
3. **Build Check:** `pnpm build` (`vue-tsc -b && vite build`)
