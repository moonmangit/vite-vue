# Implementation Guideline

This project uses a feature-oriented Vue 3 + Vite structure. Application shell composition, reusable shared components/services, and domain feature modules are cleanly separated.

---

## Top-Level Source Layout

```txt
src/
├── main.ts                   # Vite entry point
├── style.css                 # Global CSS, Tailwind CSS v4, dark mode custom variant
├── app/                      # Application shell, router config, layout composition
│   ├── config/               # App configuration modules (designTokens, i18n, pinia, primevue, router)
│   └── layout/               # Layout containers & co-located layout sections
│       ├── app/              # AppLayout.vue, TopNavSection.vue, SidebarNavSection.vue
│       └── empty/            # EmptyLayout.vue
├── feature/                  # Domain-owned feature modules
│   └── <featureName>/
│       ├── component/        # Feature-owned reusable components (e.g. LoginForm.vue)
│       ├── lib/              # Feature domain services, helpers, data builders
│       ├── store/            # Feature Pinia state management
│       └── view/             # Route pages with co-located sections
│           └── <viewSlug>/   # e.g. view/dashboard/DashboardView.vue, DashboardHeaderSection.vue
└── shared/                   # Cross-feature reusable utilities & UI
    ├── assets/               # Shared static assets
    ├── component/            # Shared UI components (StatCard.vue, StatusBadge.vue)
    ├── composable/           # Shared Vue composables
    └── lib/                  # Shared utilities & service wrappers
        └── service/          # Predefined typed API wrappers (e.g. service/auth/post.loginWithUsername.ts)
```

---

## `src/app` Composition Layer

`app` contains application setup, routes, modularized configurations, and top-level layout shells.

```txt
src/app/
├── App.vue                   # Root Vue entry point rendering <RouterView />
├── config/                   # Modularized configuration files
│   ├── designTokens/         # Brand color palettes (primary, surface, etc.)
│   ├── i18n/                 # Vue I18n setup & locales (en, th)
│   ├── pinia/                # Pinia store instance
│   ├── primevue/             # PrimeVue installation & preset.ts
│   └── router/               # Vue Router instance & routes.ts
└── layout/                   # Layout containers & co-located layout sections
    ├── app/                  # AppLayout.vue, TopNavSection.vue, SidebarNavSection.vue
    └── empty/                # EmptyLayout.vue
```

---

## The Layout, View, Section Pattern

| Classification | Pattern                     | Placement                                              | Description                                                                                |
| :------------- | :-------------------------- | :----------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **Layout**     | `*Layout.vue`               | `src/app/layout/<layoutSlug>/`                         | Shell layout containers (`AppLayout.vue`, `EmptyLayout.vue`).                              |
| **View**       | `*View.vue`                 | `src/feature/*/view/<viewSlug>/`                       | Route page containers (`DashboardView.vue`, `LoginView.vue`).                              |
| **Section**    | `*Section.vue`              | Co-located inside view or layout subfolder             | Single-use section component co-located in the same subfolder without a `section/` folder. |
| **Component**  | `*Form.vue`<br/>`*Card.vue` | `src/shared/component/`<br/>`src/feature/*/component/` | Multi-use reusable UI components.                                                          |

---

## `src/shared` Reusable Layer

`shared` contains generic UI components, composables, and API wrapper services accessible by features.

### Typed Endpoint Service Wrappers (`src/shared/lib/service/`)

Endpoint wrappers encapsulate API calls and export typed `Request` and `Response` interfaces:

```txt
src/shared/lib/service/
├── http.ts                           # Centralized Axios client
└── auth/
    ├── post.loginWithUsername.ts      # Typed POST endpoint wrapper
    ├── get.loginWithGoogleAuth.ts     # Typed GET endpoint wrapper
    └── post.logout.ts                 # Typed POST logout wrapper
```

---

## Import Boundaries & Enforcement

ESLint (`eslint-plugin-boundaries`) enforces module boundary isolation:

```txt
app     -> app, shared, feature
feature -> same feature, shared
shared  -> shared
```

Run checks before pushing:

```sh
pnpm lint
pnpm format
pnpm build
```
