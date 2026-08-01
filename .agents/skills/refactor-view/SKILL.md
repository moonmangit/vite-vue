---
name: refactor-view
description: 'Decompose bloated Vue view and layout files using co-located single-use Section components (*Section.vue) without creating separate section folders.'
---

# 1. Decomposition Strategy with Co-located Sections

When a layout or view file grows too long (~150-200 lines) or accumulates multi-step template blocks, extract single-use section components (`*Section.vue`) into the **same directory** alongside the parent file:

### A. Layout Decomposition Pattern

- `src/app/layout/app/AppLayout.vue`
- `src/app/layout/app/TopNavSection.vue`
- `src/app/layout/app/SidebarNavSection.vue`
- `src/app/layout/app/SidebarNavItemSection.vue`

### B. View Decomposition Pattern

- `src/feature/dashboard/view/dashboard/DashboardView.vue`
- `src/feature/dashboard/view/dashboard/DashboardHeaderSection.vue`
- `src/feature/dashboard/view/dashboard/MetricsGridSection.vue`
- `src/feature/dashboard/view/dashboard/AnalyticsChartSection.vue`
- `src/feature/dashboard/view/dashboard/RecentActivitySection.vue`

---

# 2. Refactoring Rules

1. **No `section/` Folders:** Co-locate section components (`*Section.vue`) in the exact same view or layout subfolder as the main `*View.vue` or `*Layout.vue` file.
2. **Prop & Emit Binding:** Pass required reactive state down via typed `defineProps` and communicate user actions back via `defineEmits`.
3. **Thin Views:** The parent `*View.vue` or `*Layout.vue` acts purely as an orchestrator (~30-60 lines).

---

# 3. Verification Checklist

1. **Format:** `pnpm format`
2. **Lint & Boundaries:** `pnpm lint` (0 ESLint or boundary violations)
3. **Build:** `pnpm build` (`vue-tsc -b && vite build`)
