---
name: manage-feature
description: 'Create, update, move, or remove feature modules and audit their route, navigation, view, support-file, and import references.'
---

# Feature ownership

Each domain lives in `src/feature/<feature-name>/` and owns `route.config.ts`, `navigation.config.ts`, and its `views/`. App composition consumes feature route/navigation declarations. Feature implementation may import only its own feature and shared code.

```txt
src/feature/<feature-name>/
├── route.config.ts
├── navigation.config.ts
├── views/<view-name>/
│   ├── main.vue
│   ├── component/ i18n/ section/ lib/ asset/ composable/ store/ service/
│   └── ... # only view-owned support; create folders as needed
├── component/ i18n/ section/ lib/ asset/ composable/ store/ service/
└── ... # feature-owned support files
```

Create optional folders only when a real asset needs an owner. New view-specific support starts in that view folder after checking for an exact existing feature/shared match. Feature-root support is for an existing or newly extracted common use case with multiple view consumers. Code used by app and features belongs under shared.

# Lifecycle workflow

- **Create:** Add route and navigation configs and at least one `views/<view>/main.vue`. Keep new view-specific state, services, translations, helpers, assets, and components local to the view unless an exact existing feature/shared asset fits.
- **Update or move:** Trace imports, route names/paths, navigation ids/targets, translations, and consumers. Update each reference in the same change. Promote view assets only when at least two views clearly share the same behavior-safe responsibility; check for an existing feature-level equivalent before extracting.
- **Remove:** Search all imports and route/menu references first. Remove the feature's router/menu contributions, owned views/support files, and now-empty folders. Do not delete shared assets or services still used elsewhere.
- Preserve the layer boundary: no imports from app or another feature. Shared code stays independent from features.

# Verification

Run `pnpm check:convention:feature`, `pnpm lint`, and `pnpm build` after source changes. Run `pnpm check:all` for the complete non-mutating suite.
