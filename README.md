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
│       └── views/<view>/main.vue
└── shared/                   # Cross-feature reusable utilities & UI
    ├── <system>/main.ts      # Shared system public entry point
    ├── asset/                # Shared static assets
    ├── component/            # Shared UI components (StatCard.vue, StatusBadge.vue)
    ├── composable/           # Shared Vue composables
    └── lib/                  # Shared utilities & service wrappers
        └── service/          # Predefined typed API wrappers (e.g. service/auth/post.loginWithUsername.ts)
```

---

## Architectural Conventions

### 1. Layout, View, Section Pattern

- **Layout (`*Layout.vue`)**: Master layout shell (`src/app/layout/app/AppLayout.vue`, `src/app/layout/empty/EmptyLayout.vue`).
- **View (`main.vue`)**: Route page entry point (`src/feature/dashboard/views/dashboard/main.vue`).
- **Section**: View-only sections live under that view's `section/`; layout-only sections stay with the layout.
- **Component (`*Form.vue`, `*Card.vue`)**: Multi-use reusable UI components (`src/shared/component/StatCard.vue`, `src/feature/auth/component/LoginForm.vue`).

### 2. Predefined Service Wrappers (`src/shared/lib/service/`)

- HTTP requests are encapsulated in typed endpoint wrapper services under `src/shared/lib/service/<domain>/`.
- Naming format: `<method>.<operationName>.ts` (e.g. `post.loginWithUsername.ts`, `get.loginWithGoogleAuth.ts`, `post.logout.ts`).

### 3. Layer Import Boundaries

ESLint (`eslint-plugin-boundaries`) enforces strict import directions:

- `app` $\rightarrow$ `app`, `shared`, `feature`
- `feature` $\rightarrow$ same feature, `shared` (cross-feature imports forbidden)
- `shared` $\rightarrow$ `shared` only

---

## Agent Skills (`.agents/skills/`)

Custom skills guide standardized code generation and refactoring:

- **`configure-primevue`**: Guide global PrimeVue theme presets & token customization.
- **`create-component`**: Scaffold shared or feature-owned UI components.
- **`create-feature`**: Scaffold new domain feature modules following singular folder conventions.
- **`create-service-wrapper`**: Scaffold typed HTTP API endpoint wrapper services (`<method>.<operationName>.ts`).
- **`create-view`**: Scaffold route container views and co-located section components.
- **`maintain-architecture`**: Audit and maintain app/feature/shared ownership and required entry points.
- **`refactor-view`**: Decompose long view/layout files into co-located single-use section components.

---

## Commands & Scripts

```sh
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Type check & lint codebase
pnpm lint

# Run all non-mutating checks (format, lint, convention)
pnpm check:all

# Run one convention section or all sections
pnpm check:convention:app
pnpm check:convention:shared
pnpm check:convention:feature
pnpm check:convention

# Check formatting / apply Prettier fixes
pnpm format:check
pnpm format:fix

# Check ESLint / apply ESLint fixes
pnpm lint
pnpm lint:fix

# Apply all fixes, then recheck conventions
pnpm fix:all

# Husky automatically runs pnpm fix:all before every commit

# Production build
pnpm build
```
