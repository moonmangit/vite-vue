---
name: create-feature
description: 'Create feature modules that follow the project convention: owned routes and navigation, views/main.vue pages, local supporting code, and shared-only dependencies.'
---

# Feature structure

Create each domain under `src/feature/<feature-name>/`. Every feature must own its route and navigation declarations:

```txt
src/feature/<feature-name>/
├── route.config.ts
├── navigation.config.ts
├── views/
│   └── <view-name>/
│       ├── main.vue
│       ├── section/       # optional, view-only sections
│       ├── i18n/          # optional, view-only translations
│       ├── lib/           # optional, view-only helpers
│       ├── asset/         # optional, view-only assets
│       ├── composable/    # optional, view-only composables
│       ├── store/         # optional, view-only state
│       └── service/       # optional, view-only services
├── component/             # optional feature-wide UI
├── i18n/                  # optional feature-wide translations
├── lib/                   # optional feature-wide helpers
├── asset/                 # optional feature-wide assets
├── composable/            # optional feature-wide composables
├── store/                 # optional feature-wide state
└── service/               # optional feature-wide services
```

Only create support folders that have a real owner/use. Keep view-specific code inside its view folder; promote it to the feature root only when multiple views use it.

# Ownership and imports

- Feature code may import from its own feature and `src/shared/*`.
- Features must not import app code or another feature.
- Put reusable systems/components used by both app and features under `src/shared/`.
- The app composition layer may import feature `route.config.ts` and `navigation.config.ts` to register feature-owned declarations.
- Add shared feature-independent types under shared when both app and features need them.

# Integration

- Export route records from `route.config.ts`; app router config composes them under the appropriate app layout.
- Export navigation groups/items from `navigation.config.ts`; app layout composes them without owning feature menu details.
- Add new module categories only when needed and keep import boundaries intact.

# Verify

Run `pnpm check:architecture`, `pnpm lint`, and `pnpm build`.
