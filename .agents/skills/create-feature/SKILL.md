---
name: create-feature
description: 'Scaffold, organize, and place new features within project domain boundaries while enforcing layered architecture, singular folder conventions, co-located view subfolders, and ESLint boundary rules.'
---

# 1. Standard Feature Directory Structure

Every feature under `src/feature/<featureName>/` follows singular directory names, with views housed inside specific view subfolders alongside their co-located section components:

```txt
src/feature/<featureName>/
├── component/        # Reusable domain UI components (e.g. LoginForm.vue)
├── lib/              # Domain services, API calls, helpers (e.g. dashboardData.ts)
├── store/            # Feature Pinia state management (e.g. auth.ts)
├── view/             # Route page subfolders
│   ├── login/
│   │   ├── LoginView.vue
│   │   └── WelcomeSection.vue
│   └── dashboard/
│       ├── DashboardView.vue
│       ├── DashboardHeaderSection.vue
│       └── MetricsGridSection.vue
└── assets/           # Feature static media (optional)
```

> ⚠️ **CRITICAL:** Always use singular directory names (`component`, `lib`, `store`, `view`). Do NOT create separate `section/` folders; co-locate `*Section.vue` files directly inside their view subfolder.

---

# 2. Layer Boundary Rules

| Layer                                 | Can Import From                                                | MUST NOT Import From                                   |
| :------------------------------------ | :------------------------------------------------------------- | :----------------------------------------------------- |
| **`feature` (`src/feature/<name>/`)** | `src/shared/*` and own feature (`../component/*`, `./*`, etc.) | `src/app/*` or other features (`src/feature/<other>/`) |
| **`shared` (`src/shared/`)**          | `src/shared/*` only                                            | `src/app/*` or any `src/feature/*`                     |
| **`app` (`src/app/`)**                | `src/app/*`, `src/shared/*`, `src/feature/*`                   | None                                                   |

---

# 3. Verification Checklist

1. **Format Code:** `pnpm format`
2. **Lint & Boundary Verification:** `pnpm lint`
3. **Build Check:** `pnpm build` (`vue-tsc -b && vite build`)
