---
name: create-view
description: 'Initialize and scaffold page views and co-located view sections in the project following layered architecture boundaries, singular folder naming, design system rules, and co-located view subfolders.'
---

# 1. Architectural Classification & Directory Co-location

Views and Layouts are organized into dedicated subfolders where the primary component (`*View.vue` or `*Layout.vue`) and its single-use `*Section.vue` components live together without separate `section/` folders:

```txt
src/app/layout/
  app/
    AppLayout.vue
    TopNavSection.vue
    SidebarNavSection.vue
  empty/
    EmptyLayout.vue

src/feature/<featureName>/view/
  login/
    LoginView.vue
    WelcomeSection.vue
  dashboard/
    DashboardView.vue
    DashboardHeaderSection.vue
    MetricsGridSection.vue
```

---

# 2. Placement Guidelines

- **Feature Views (`src/feature/<featureName>/view/<viewSlug>/<ViewName>View.vue`):**
  - Place view files inside a dedicated subfolder under `view/` named in lowercase/kebab-case (e.g. `view/login/LoginView.vue`, `view/dashboard/DashboardView.vue`).
- **Co-located Sections (`src/feature/<featureName>/view/<viewSlug>/<SectionName>Section.vue`):**
  - When a view file grows too long (~150-200 lines), extract single-use section components named `*Section.vue` directly into the same view subfolder. Do NOT create a separate `section/` directory.

---

# 3. Layer Boundary Rules

- **Feature Views & Sections:** Can import from `src/shared/*` and local feature modules. MUST NOT import from `src/app/*` or other features.
- **App Views & Layout Sections:** Can import from `src/app/*`, `src/shared/*`, and `src/feature/*`.

---

# 4. Router Registration

Register the view component in `src/app/config/router/routes.ts` under appropriate layout children:

```ts
import DashboardView from '../../../feature/dashboard/view/dashboard/DashboardView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: DashboardView,
      },
    ],
  },
]
```

---

# 5. Verification Checklist

1. **Format Check:** `pnpm format`
2. **Lint & Boundary Check:** `pnpm lint`
3. **Build Check:** `pnpm build` (`vue-tsc -b && vite build`)
