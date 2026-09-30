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

## Shared UI facades

Application and feature code consumes standardized UI from `src/shared/component/App*.vue` (for example `AppButton`, `AppInputText`, `AppDialog`, `AppTabs`, and `AppChart`). Facades expose only the props/variants used by project-approved patterns, while forwarding styling/accessibility attributes and supported slots. Keep direct PrimeVue/Apex wrapper imports inside these facades; keep PrimeVue installation in app config and toast service/rendering inside the toast system.

## Feature layer

```txt
src/feature/<feature-name>/
├── route.config.ts
├── navigation.config.ts
├── views/<view-name>/
│   ├── main.vue
│   ├── component/           # optional view-only components
│   ├── section/             # optional view-only sections
│   ├── i18n/ lib/ asset/ composable/ store/ service/
│   └── ...
├── component/ i18n/ section/ lib/ asset/ composable/ store/ service/
└── ...
```

Every feature owns its route and navigation declarations. The app router and layout import those declarations to compose the application. Features may use shared code and their own modules, but must not import app or other features.

### View-first asset workflow

- Before adding a view asset, inspect that view, its feature-level categories, and shared for an exact existing fit. Reuse a direct match; otherwise keep view-specific `component/`, `section/`, `i18n/`, `service/`, `lib/`, `asset/`, `composable/`, or `store/` support inside the view.
- Create only support folders needed for actual files; do not scaffold empty folders.
- During feature refactoring, compare views by responsibility and behavior. When at least two views clearly share the same behavior-safe use case/component/service, check for an existing feature-level equivalent or extract the common implementation into the matching feature category. Keep view-specific data and presentation in each view.
- Do not promote superficial similarities or change behavior/API solely to force reuse; leave unclear candidates view-local.

## Layered en/th translations

- App shell messages live in `src/app/config/i18n/locales/{en,th}.ts`.
- Global shared messages live in `src/shared/i18n/{en,th}.ts`; shared-system messages live beneath that system, such as `src/shared/toast/i18n/{en,th}.ts`.
- Feature messages live in `src/feature/<feature>/i18n/{en,th}.ts`.
- App owns its root message keys, shared messages are mounted under `shared.*`, and feature messages are mounted under `features.<feature>.*`.
- Register each owner/module in both locale lists in `src/app/config/i18n/main.ts`. The composer merges nested trees, rejects duplicate leaf keys, and validates matching en/th key shapes.
- Put a key with its owner; never overwrite another layer's message to change its text. Update both locale files and all consumers together.

## Global typography

Use `app-text-xs`, `app-text-sm`, `app-text-md`, `app-text-lg`, `app-text-xl`, `app-text-2xl`, or `app-text-3xl` for font size, and `app-text-normal`, `app-text-muted`, or `app-text-disabled` for neutral text roles. These utilities adapt to light/dark mode. Keep semantic colors for links, errors, statuses, and brand accents. A one-off size is set with `style="--app-font-size: 18px"` on an element with an `app-text-*` class; rem and em values are also supported. Do not use raw Tailwind font-size classes or arbitrary font-size values.

Aside navigation uses only `app-text-sm` and `app-text-md`, without per-item custom-size overrides.

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
