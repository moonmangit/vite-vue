---
name: manage-view
description: 'Create, update, refactor, relocate, or remove feature pages, layouts, and their owned sections/support files while preserving behavior and registrations.'
---

# Ownership and placement

- Feature route entry: `src/feature/<feature>/views/<view>/main.vue`.
- View-only sections, translations, helpers, assets, components, composables, stores, and services belong under that view in `section/`, `i18n/`, `lib/`, `asset/`, `component/`, `composable/`, `store/`, and `service/` as needed.
- Create only folders needed by real view-owned files. Do not scaffold empty support folders.
- Feature-wide assets/components/support belong at the feature root only when they have real consumers in multiple views.
- App layouts live in `src/app/layout/<layout>/`; layout-only sections/support stay with that layout.
- App-and-feature or cross-feature reusable UI belongs in global `src/shared/component/` according to consumers.

# Lifecycle workflow

- **Create:** Inspect this view, the feature root, and shared modules for an existing exact fit before adding an asset. Reuse a matching asset; otherwise create view-specific i18n, service, component, section, helper, asset, composable, or store under this view. Add its route and navigation to the owning feature configs; let app router/layout compose them.
- **Update:** Trace routes, navigation ids/targets, imports, props/emits, styles, localization, services, and side effects. Preserve behavior and ordering.
- **Refactor:** Compare sibling views by responsibility and behavior. When at least two views clearly need the same use case/component/service, check for an existing feature-level equivalent; reuse it or consolidate the common implementation under the feature's matching category. Keep view-specific data and presentation local. Update all callers atomically.
- **Relocate:** Move a page/support file only after identifying every import and ownership change. Update route/navigation declarations, locale registrations, and all imports in the same change.
- **Remove:** Confirm route and navigation references, dynamic links, imports, translations, assets, and tests. Remove stale registrations and unused view-local support, then prune empty folders. Do not remove feature/shared code with other consumers.

If similarity is superficial or extraction would alter behavior/API unnecessarily, keep the assets view-local and report the candidate instead of forcing consolidation.

Feature code may import only its feature and shared modules, never app or other features. Shared code stays independent from app and features.

# Verify

Run `pnpm check:convention:feature` for feature page changes, `pnpm check:convention:app` for layout changes, then `pnpm lint` and `pnpm build` after source changes.
