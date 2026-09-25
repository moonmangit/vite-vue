---
name: create-component
description: 'Audit ownership and create Vue components in shared or feature scope while following app-feature-shared dependency boundaries.'
---

# Choose the owner first

| Component                  | Placement                                     | Use                                   |
| -------------------------- | --------------------------------------------- | ------------------------------------- |
| Shared reusable component  | `src/shared/component/`                       | Used by app and/or multiple features  |
| Feature reusable component | `src/feature/<feature>/component/`            | Used by multiple views in one feature |
| View-only section          | `src/feature/<feature>/views/<view>/section/` | Used only by one view                 |
| Layout-only section        | `src/app/layout/<layout>/`                    | Used only by one app layout           |
| Route page                 | `src/feature/<feature>/views/<view>/main.vue` | Feature route content                 |

Before creating a component, inspect existing components and use the narrowest owner that accurately matches its consumers. Shared code must not import app or feature code. Features may import shared and their own feature only; app composition can import app, shared, and feature declarations.

# Feature integration

Feature pages and their menu/route declarations belong to the owning feature. Put routes in `route.config.ts`, navigation in `navigation.config.ts`, and let the app compose those configs. Do not move feature-only display behavior into app layout components.

# Verification

Run `pnpm check:architecture`, `pnpm lint`, and `pnpm build`.
