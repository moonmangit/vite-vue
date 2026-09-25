---
name: refactor-view
description: 'Refactor Vue views and layouts while preserving behavior and keeping support code inside its owning view or layout.'
---

# Ownership-preserving decomposition

- Feature page entry points stay at `src/feature/<feature>/views/<view>/main.vue`.
- Sections used only by that view go in its `section/` folder.
- Helpers, translations, assets, composables, stores, and services used only by one view stay under that view.
- Promote support code to the feature root only when it has multiple feature-view consumers; promote it to shared only when app/features both need it.
- Layout-only sections and support code remain under `src/app/layout/<layout>/`.
- Keep feature routes and navigation in their feature configs; app layout/router files only compose those declarations.

Preserve props, emits, reactive ownership, side-effect ordering, and runtime behavior. Move one ownership boundary at a time and avoid unrelated changes.

# Verify

Run `pnpm check:architecture`, `pnpm lint`, and `pnpm build`.
