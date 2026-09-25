---
name: create-view
description: 'Create feature route pages at views/<view-name>/main.vue with view-owned supporting code and feature-owned route/navigation configuration.'
---

# View placement

Every route view lives at `src/feature/<feature-name>/views/<view-name>/main.vue`:

```txt
src/feature/dashboard/
├── route.config.ts
├── navigation.config.ts
└── views/
    └── dashboard/
        ├── main.vue
        ├── section/       # single-view sections
        ├── i18n/          # view-only translations
        ├── lib/           # view-only helpers
        ├── asset/         # view-only assets
        ├── composable/    # view-only composables
        ├── store/         # view-only state
        └── service/       # view-only services
```

Create only supporting folders needed by that view. Put multi-view feature code in the feature root. Shared UI used across app/features belongs in `src/shared/component/`.

# Routing and navigation

- Declare route records in the owning feature's `route.config.ts`.
- Declare menu entries in the owning feature's `navigation.config.ts`.
- App router/layout composition imports these declarations; do not register feature pages directly in a central route table or hardcode feature navigation in an app layout.
- Feature views may import only their feature and `src/shared/*`, never app or other features.

# Layouts and sections

App layouts remain under `src/app/layout/<layout-name>/`. Keep layout-only sections with that layout. View-only sections belong in the view's `section/` support folder.

# Verify

Run `pnpm check:architecture`, `pnpm lint`, and `pnpm build`.
