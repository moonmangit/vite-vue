# Implementation Guideline

This project uses a feature-oriented Vue 3 + Vite structure. Keep code in its owning layer and preserve the dependency direction: `shared` is consumable by both `app` and `feature`; features depend on shared and their own modules; app composes the feature modules.

## App configuration

```txt
src/app/
├── App.vue
├── config/
│   ├── main.ts
│   ├── i18n/main.ts
│   ├── pinia/main.ts
│   ├── primevue/main.ts
│   └── router/main.ts
└── layout/<layout-name>/
```

Every config module has a required `main.ts`. Keep third-party setup and its support files inside the relevant config folder. `src/app/config/router/` composes routes exported from feature `route.config.ts` files and applies app layouts.

## Shared layer

```txt
src/shared/
├── <system-name>/
│   ├── main.ts              # required public use-case entry point
│   ├── composable/          # optional system-only support
│   ├── store/
│   ├── service/
│   └── ...
├── component/               # globally reusable UI
├── lib/service/             # generic typed endpoint wrappers
└── ...                      # optional global shared categories
```

Shared systems such as toast own their supporting stores, composables, services, translations, assets, and sections. Export supported use cases through the system `main.ts`. Shared code must not import from app or feature.

## Feature layer

```txt
src/feature/<feature-name>/
├── route.config.ts
├── navigation.config.ts
├── views/<view-name>/
│   ├── main.vue
│   ├── section/             # optional view-only sections
│   ├── i18n/ lib/ asset/ composable/ store/ service/
│   └── ...
├── component/ i18n/ section/ lib/ asset/ composable/ store/ service/
└── ...
```

Every feature owns its route and navigation declarations. The app router and layout import those declarations to compose the application. Features may use shared code and their own modules, but must not import app or other features. Keep view-only support inside the view; promote it to feature scope only when reused across views.

## Placement rules

| Kind                       | Placement                                               |
| -------------------------- | ------------------------------------------------------- |
| App layout                 | `src/app/layout/<layout-name>/`                         |
| Feature page               | `src/feature/<feature>/views/<view>/main.vue`           |
| View-only section          | `src/feature/<feature>/views/<view>/section/`           |
| Feature reusable component | `src/feature/<feature>/component/`                      |
| Global shared component    | `src/shared/component/`                                 |
| Shared system              | `src/shared/<system>/main.ts` plus system-owned support |

## Verification

ESLint enforces app/feature/shared import boundaries. The architecture checker verifies required module entry points and feature configs:

```sh
pnpm check:architecture
pnpm lint
pnpm build
```
