# ApexAdmin Vue 3 Starter Template

Modern, scalable Vue 3 + Vite + TypeScript starter template built with PrimeVue v4, Tailwind CSS v4, Vue Router, Pinia, and Vue I18n.

## Project Architecture

The codebase follows a strict **Layered Architecture (`app`, `feature`, `shared`)**. Shared modules are reusable by both app and feature code; ESLint enforces import boundaries, and an architecture checker verifies required entry points:

```txt
src/
├── app/                      # Application shell, router config, layouts, and global plugins
│   ├── App.vue
│   ├── config/               # Each configuration module exports through main.ts
│   └── layout/               # Layout containers & co-located layout sections
│       ├── app/              # AppLayout.vue, TopNavSection.vue, SidebarNavSection.vue
│       └── empty/            # EmptyLayout.vue
├── feature/                  # Feature-owned modules (auth, dashboard, etc.)
│   └── <featureName>/
│       ├── route.config.ts
│       ├── navigation.config.ts
│       ├── component/        # Feature reusable components (e.g. LoginForm.vue)
│       ├── lib/              # Feature helpers and data builders
│       ├── store/            # Feature Pinia stores
│       └── views/<view>/          # main.vue plus optional view-owned support folders
└── shared/                   # Cross-feature reusable utilities & UI
    ├── <system>/main.ts      # Shared system public entry point
    ├── asset/                # Shared static assets
    ├── component/            # Shared App* UI facades and reusable components
    ├── composable/           # Shared Vue composables
    └── lib/                  # Shared utilities & service wrappers
        └── service/          # Predefined typed API wrappers (e.g. service/auth/post.loginWithUsername.ts)
```

---

## Architectural Conventions

### 1. Layout, View, Section Pattern

- **Layout (`*Layout.vue`)**: Master layout shell (`src/app/layout/app/AppLayout.vue`, `src/app/layout/empty/EmptyLayout.vue`).
- **View (`main.vue`)**: Route page entry point (`src/feature/dashboard/views/dashboard/main.vue`).
- View-only components, sections, translations, services, helpers, assets, composables, and stores start inside that view; create only folders with real files.
- During refactoring, extract feature-level common assets when at least two views clearly share the same behavior-safe responsibility; check for an existing feature asset before creating one.
- **Section**: View-only sections live under that view's `section/`; layout-only sections stay with the layout.
- **Component (`*Form.vue`, `*Card.vue`)**: Multi-use reusable UI components (`src/shared/component/StatCard.vue`, `src/feature/auth/component/LoginForm.vue`).
- **UI facade (`App*.vue`)**: Use shared facades for PrimeVue/Apex widgets; consumers should not import those vendor components directly.

### 2. Predefined Service Wrappers (`src/shared/lib/service/`)

- HTTP requests are encapsulated in typed endpoint wrapper services under `src/shared/lib/service/<domain>/`.
- Naming format: `<method>.<operationName>.ts` (e.g. `post.loginWithUsername.ts`, `get.loginWithGoogleAuth.ts`, `post.logout.ts`).

### 3. Layered en/th translations

- App messages live under `src/app/config/i18n/locales/`; shared messages under `src/shared/i18n/` or the owning shared system; feature messages under `src/feature/<name>/i18n/`.
- The app composer mounts app keys at the root, shared keys under `shared.*`, and feature keys under `features.<feature>.*`.
- en/th message trees are deep-merged with duplicate-key rejection and locale-shape validation, so one owner cannot silently override another.

### 4. Global typography

- Use `app-text-xs` through `app-text-3xl` for the named size scale and `app-text-normal`, `app-text-muted`, or `app-text-disabled` for neutral text tones.
- Set a one-off size through `--app-font-size` on an element that has an `app-text-*` class (for example, `style="--app-font-size: 1.125rem"`). Keep semantic colors for links, statuses, validation, and brand accents.
- Aside navigation is deliberately limited to `app-text-sm` and `app-text-md`.
- `pnpm check:typography` validates the size/tone tokens and rejects raw Tailwind font-size classes and arbitrary font-size values.

### 5. Layer Import Boundaries

ESLint (`eslint-plugin-boundaries`) enforces strict import directions:

- `app` $\rightarrow$ `app`, `shared`, `feature`
- `feature` $\rightarrow$ same feature, `shared` (cross-feature imports forbidden)
- `shared` $\rightarrow$ `shared` only

---

## Agent Skills (`.agents/skills/`)

Custom skills guide standardized code generation and refactoring:

- **`manage-architecture`**: Manage and audit all app/shared/feature assets and their references.
- **`manage-component`**: Create, update, relocate, or remove shared/feature components.
- **`manage-feature`**: Manage feature modules, routes, navigation, and support code.
- **`manage-primevue`**: Manage app-wide PrimeVue setup and theme tokens.
- **`manage-service-wrapper`**: Manage typed HTTP endpoint wrappers and consumers.
- **`manage-typography`**: Maintain global typography sizes, tones, and custom-size overrides.
- **`manage-view`**: Manage feature pages, app layouts, sections, and view-owned support.

---

## Commands & Scripts

```sh
# Prepare the development environment
pnpm prepare:dev

# Start local development server
pnpm dev

# Format and lint fixes, then typography/convention checks and a production build
pnpm prepare:commit
# Husky runs the same command automatically before each commit

# Production build
pnpm build
```
