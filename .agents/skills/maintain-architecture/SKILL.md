---
name: maintain-architecture
description: 'Audit and maintain the app, feature, and shared folder convention, including route/navigation ownership, shared-system entry points, and dependency boundaries.'
---

# Project convention

```txt
src/
├── main.ts
├── app/
│   ├── App.vue
│   ├── config/
│   │   ├── main.ts
│   │   └── <config-name>/main.ts
│   └── layout/<layout-name>/
├── shared/
│   ├── <system-name>/main.ts       # system use-case entry point
│   ├── component/                  # global shared components
│   ├── i18n/ section/ lib/ asset/ composable/ store/ service/
│   └── ...                         # support files stay with their owner
└── feature/<feature-name>/
    ├── route.config.ts
    ├── navigation.config.ts
    ├── views/<view-name>/main.vue
    ├── component/ i18n/ section/ lib/ asset/ composable/ store/ service/
    └── ...
```

`shared` is reusable by both app and features. Shared code must not import app or feature code. Features may import their own feature and shared only. The app composition layer may import feature route/navigation configs, but feature implementation must not leak into app-owned route/menu declarations.

# Maintenance workflow

1. Inspect the target feature/system and its consumers before moving code.
2. Place each file at the narrowest correct owner: view-only, feature-wide, shared-system, or global shared.
3. Give every app config module and shared system a `main.ts` entry point. A shared system entry exports its intended use case; keep system-only support files beneath that system.
4. Put every feature route and menu declaration in its `route.config.ts` and `navigation.config.ts`. Keep route/layout composition in app config.
5. Keep view entry files named `main.vue`; put view-only support under that view folder.
6. Run `pnpm check:convention:app`, `pnpm check:convention:shared`, and `pnpm check:convention:feature`; run `pnpm lint` and `pnpm build` after source moves or TypeScript changes. Use `pnpm check:all` for the full non-mutating check suite.
7. Update this convention and the related project skills/docs together if the architecture intentionally changes.

# Checker scope

`pnpm check:convention` (also available as `pnpm check:architecture`) verifies all app/config entry points, feature route/navigation configs, view `main.vue` files, and shared-system `main.ts` files. Pass `app`, `shared`, or `feature` to check one section. `pnpm lint` enforces import boundaries. `pnpm fix:all` applies Prettier and ESLint autofixes before rerunning convention checks. Fix the owner or export path rather than weakening checks to accommodate misplaced code.
