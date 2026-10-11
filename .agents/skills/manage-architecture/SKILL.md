---
name: manage-architecture
description: 'Create, update, move, remove, or audit any project asset while maintaining app, shared, and feature ownership conventions and references.'
---

# Complete asset inventory

```txt
src/
├── app/
│   ├── App.vue
│   ├── config/main.ts
│   ├── config/<name>/main.ts         # third-party/app configuration + local support
│   └── layout/<name>/                # project layouts and layout-owned support
├── shared/
│   ├── <system>/main.ts              # public use-case entry point
│   ├── component/App*.vue            # shared project UI facades
│   ├── component/                    # globally reusable components
│   ├── i18n/ section/ lib/ asset/
│   ├── composable/ store/ service/   # global categories where appropriate
│   └── ...                           # system support remains inside its system
└── feature/<name>/
    ├── route.config.ts
    ├── navigation.config.ts
    ├── views/<view>/main.vue
    ├── views/<view>/component/ i18n/ section/ lib/ asset/ composable/ store/ service/
    ├── component/ i18n/ section/ lib/ asset/ composable/ store/ service/
    └── ...                           # feature-wide support
```

All listed support folders are optional: create them only for real files with that owner. Never keep empty placeholder folders. Layouts live under `app/layout`; view pages live under feature `views/<view>/main.vue`; view-only components, sections, translations, helpers, assets, composables, stores, and services start with that view.

# Dependency and registration ownership

- `shared` can be imported by both app and features; shared may import shared and external dependencies only.
- A feature may import its own feature and shared; it may not import app or another feature.
- App is the composition layer and may import app, shared, and feature declarations.
- Each feature owns its routes and menu entries in `route.config.ts` and `navigation.config.ts`. App router/layout compose them.
- Each app config module has `main.ts`; each shared system has a `main.ts` that exports its supported use case.
- App and feature UI imports project `App*` facades from shared; PrimeVue/Apex component imports are confined to those facades, app PrimeVue setup, and toast-system internals. `AppTabs` and `AppChart` are project composites.
- Global shared categories are `component/`, `i18n/`, `section/`, `lib/`, `asset/`, `composable/`, `store/`, and `service/`. System-only support is nested under its system.
- App messages live in `app/config/i18n/locales/`; global shared messages live in `shared/i18n/`; system messages live in that system's `i18n/`; feature messages live in that feature's `i18n/`.
- Keep message ownership namespaced: app owns its root keys, shared uses `shared.*`, and features use `features.<feature>.*`. Add every module in both `en` and `th` to the app i18n composition list.
- The app i18n composer deep-merges disjoint module messages, throws on duplicate leaf keys, and checks that en/th module namespaces and key shapes match. Keep module keys unique; do not resolve collisions by overriding another module.
- Global typography is defined in `src/style.css` as `app-text-xs` through `app-text-3xl` and `app-text-normal`, `app-text-muted`, `app-text-disabled`. Use `--app-font-size` for custom px/rem/em sizes; preserve semantic colors.
- Aside navigation text is limited to `app-text-sm` and `app-text-md`; the typography checker enforces this.

# Lifecycle workflow

1. **Before create/update/move/remove:** inspect the owner, consumers, current imports, route/menu registrations, public exports, and related tests/docs.
2. **Create:** choose the narrowest scope that matches actual consumers and create required entry/config files. Avoid unused scaffolding.
3. **New view asset rule:** search the view, feature root, and shared layer for an exact existing fit. Reuse it when present; otherwise create view-specific support under that view and create only needed folders.
4. **Refactor/promotion rule:** compare sibling views. If at least two share the same behavior-safe use case/component/service, reuse an existing feature-level equivalent or extract one into the feature's matching support category. Leave ambiguous or superficial similarities view-local.
5. **Update or move:** trace and update every import/export, route name/path, navigation id/target, style, translation, asset URL, and public API reference in the same change. Preserve behavior and compatibility.
6. **Remove:** verify there are no remaining consumers; remove registrations and exports before deleting the implementation. Delete obsolete support files and prune empty folders. Keep shared assets/services if any consumer remains.
7. **Recheck coverage:** walk app configs/layouts; each feature's route, navigation, every view `main.vue`, view-local support, extracted feature-level support, shared systems/categories, import boundaries, and skill/docs references if architecture changed.
8. When adding/updating/removing translations, update the owning en/th pair, composition registration, and every key reference as one change. Keep both locale shapes aligned and verify switching locales.
9. Run `pnpm check:convention:app`, `pnpm check:convention:shared`, and `pnpm check:convention:feature`; run `pnpm check:typography` for typography changes and use `pnpm check:all` for the full verification suite. Run `pnpm build` after source/TypeScript changes.

# Available focused skills

- `manage-feature`: feature lifecycle and registration.
- `manage-view`: pages, layouts, sections, and view-owned support.
- `manage-component`: shared/feature components and sections.
- `manage-service-wrapper`: endpoint services and consumers.
- `manage-primevue`: app-level PrimeVue configuration.
- `manage-typography`: global text sizes, tones, and custom-size overrides.

The checker is `scripts/check-architecture.mjs`; it validates required entries, rejects empty or `.gitkeep`-only folders, and enforces App* facade imports for PrimeVue/Apex UI throughout app, shared, and feature source. `pnpm check:convention:<app|shared|feature>` selects an area. `pnpm fix:all` applies project formatting and lint fixes before convention validation. Do not weaken the checker or import boundaries to accept misplaced code.
