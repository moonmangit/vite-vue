---
name: manage-component
description: 'Create, update, relocate, or remove UI components and sections while checking ownership, consumers, and architecture boundaries.'
---

# Choose ownership by consumers

| Asset                      | Placement                                       | Owner scope                   |
| -------------------------- | ----------------------------------------------- | ----------------------------- |
| App UI facade (`App*.vue`) | `src/shared/component/`                         | Standardized PrimeVue/Apex UI |
| Global reusable component  | `src/shared/component/`                         | App and/or multiple features  |
| Feature reusable component | `src/feature/<feature>/component/`              | Common use across 2+ views    |
| View-only component        | `src/feature/<feature>/views/<view>/component/` | One view                      |
| View-only section          | `src/feature/<feature>/views/<view>/section/`   | One view                      |
| Layout-only section        | `src/app/layout/<layout>/`                      | One app layout                |
| Route page                 | `src/feature/<feature>/views/<view>/main.vue`   | One feature route             |

# Lifecycle workflow

- **Use wrappers:** Application components consume `App*` facades from `src/shared/component/`; do not import PrimeVue UI components or VueApexCharts directly. Facades expose approved project props/variants and forward styling/accessibility attributes and intentionally supported slots.
- **Typography:** Use global `app-text-*` size and tone classes for component text. Custom sizes use `--app-font-size`; do not use raw Tailwind font-size or arbitrary size classes.
- **Create:** Check the current view, feature component folder, and shared components for an exact fit. Otherwise put a single-view component under that view's `component/`; keep single-view sections under `section/`.
- **Update or relocate:** Inspect all imports, props, emits, styles, and behavior. When 2+ views clearly share the same behavior-safe component, reuse an existing feature component or extract one into the feature's `component/`. Update all consumers and preserve boundaries.
- **Remove:** Find all import/template references before deleting. Remove stale exports, styles, tests, and empty placeholder directories. Preserve a component while any consumer still relies on it.
- Keep feature route/menu content in its feature config; app layout renders composed navigation and should not own feature-specific UI data.

For new vendor UI usage, extend the matching `App*` facade when it represents a project-wide approved use case. Keep raw vendor imports inside facade implementations, app setup, or the owning shared system's implementation.

# Verify

Run `pnpm check:convention:shared` or `pnpm check:convention:feature` for the affected owner, then `pnpm lint` and `pnpm build` after source changes.
