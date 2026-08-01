---
name: create-component
description: 'Audit existing components, enforce project architecture layer boundaries, quantize design tokens, and create or extend Vue components and co-located view/layout sections.'
---

# 1. Component Classification & Directory Placement

| Type          | Pattern                     | Location Pattern                                       | Reusability    | Description                                                                                      |
| :------------ | :-------------------------- | :----------------------------------------------------- | :------------- | :----------------------------------------------------------------------------------------------- |
| **Layout**    | `*Layout.vue`               | `src/app/layout/<layoutSlug>/`                         | Shell wrapper  | Master layout containers (`AppLayout.vue`, `EmptyLayout.vue`).                                   |
| **View**      | `*View.vue`                 | `src/feature/*/view/<viewSlug>/`                       | Route page     | Route container pages (`DashboardView.vue`, `LoginView.vue`).                                    |
| **Section**   | `*Section.vue`              | Co-located with `*View.vue` or `*Layout.vue`           | **Single-use** | Dedicated section component co-located in the view/layout subfolder without a `section/` folder. |
| **Component** | `*Form.vue`<br/>`*Card.vue` | `src/shared/component/`<br/>`src/feature/*/component/` | **Multi-use**  | Reusable UI component shared across views/features (`LoginForm.vue`, `StatCard.vue`).            |

---

# 2. Audit & Deduplicate Before Creating

1. **Check Reusability:**
   - Multi-use shared components $\rightarrow$ `src/shared/component/` or `src/feature/<featureName>/component/`.
   - Single-use sections $\rightarrow$ Co-locate `*Section.vue` directly in the view's subfolder (`src/feature/<featureName>/view/<viewSlug>/`).
2. **Prevent Duplication:** Check existing components to avoid rebuilding 80%+ similar components.

---

# 3. Layer Boundary & Verification

1. **Format Check:** `pnpm format`
2. **Lint & Boundary Check:** `pnpm lint`
3. **Build Verification:** `pnpm build` (`vue-tsc -b && vite build`)
