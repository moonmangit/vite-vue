# ApexAdmin Vue 3 Starter Template

Modern, scalable Vue 3 + Vite + TypeScript starter template built with PrimeVue v4, Tailwind CSS v4, Vue Router, Pinia, and Vue I18n.

## Project Architecture

The codebase follows a strict **Layered Architecture (`app`, `feature`, `shared`)** with singular folder naming and enforced ESLint boundary rules:

```txt
src/
├── app/                      # Application shell, router config, layouts, and global plugins
│   ├── config/               # Modularized app configurations (designTokens, i18n, pinia, primevue, router)
│   └── layout/               # Layout containers & co-located layout sections
│       ├── app/              # AppLayout.vue, TopNavSection.vue, SidebarNavSection.vue
│       └── empty/            # EmptyLayout.vue
├── feature/                  # Feature-owned modules (auth, dashboard, etc.)
│   └── <featureName>/
│       ├── component/        # Feature reusable components (e.g. LoginForm.vue)
│       ├── lib/              # Feature helpers and data builders
│       ├── store/            # Feature Pinia stores
│       └── view/             # Route views with co-located sections
│           └── <viewSlug>/   # e.g. view/dashboard/DashboardView.vue, DashboardHeaderSection.vue
└── shared/                   # Cross-feature reusable utilities & UI
    ├── assets/               # Shared static assets
    ├── component/            # Shared UI components (StatCard.vue, StatusBadge.vue)
    ├── composable/           # Shared Vue composables
    └── lib/                  # Shared utilities & service wrappers
        └── service/          # Predefined typed API wrappers (e.g. service/auth/post.loginWithUsername.ts)
```

---

## Architectural Conventions

### 1. **Layout, **View, **Section Pattern

- **Layout (`*Layout.vue`)**: Master layout shell (`src/app/layout/app/AppLayout.vue`, `src/app/layout/empty/EmptyLayout.vue`).
- **View (`*View.vue`)**: Top-level route container pages (`src/feature/dashboard/view/dashboard/DashboardView.vue`).
- **Section (`*Section.vue`)**: Single-use section components co-located in the exact same view or layout subfolder (`src/feature/dashboard/view/dashboard/MetricsGridSection.vue`).
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

# Format code with Prettier
pnpm format

# Production build
pnpm build
```
