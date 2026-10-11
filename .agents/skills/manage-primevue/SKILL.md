---
name: manage-primevue
description: 'Create, update, or remove app-wide PrimeVue configuration while keeping theme setup in its app config owner.'
---

# PrimeVue ownership

The project uses PrimeVue v4 styled mode with `@primeuix/themes` Aura and Tailwind CSS v4. App-wide installation lives in `src/app/config/primevue/main.ts`; its preset is `preset.ts`, and design tokens belong to `src/app/config/designTokens/`. Every app config module exposes its entry point through `main.ts`.

Application and feature code uses the constrained `App*` facades in `src/shared/component/` rather than importing PrimeVue UI components directly. Update the facade API when an additional project-approved use case is needed; keep vendor component imports inside the facade. Toast rendering/service internals remain in the shared toast system.

# Lifecycle workflow

- **Create:** Put installation, plugin registration, and theme setup in the appropriate app config module. Keep config-only support files beside that module. Do not put app configuration in shared or feature code.
- **Update:** Trace preset tokens, component theme overrides, install order, CSS imports, dark-mode selector, and all config exports. Preserve `.app-dark` behavior and update relevant consumers together.
- **Remove:** Search imports and app setup for the config, tokens, CSS, and plugin before deleting. Remove its export/registration and only remove design tokens no longer consumed.
- App and feature modules consume the constrained shared `App*` facades; they do not import PrimeVue UI components or app config. Direct PrimeVue UI imports belong inside the matching facade, with setup imports in app config and toast service imports inside the toast system.

```ts
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { primaryPalette, surfacePalette } from '../designTokens/main'

export const AppPreset = definePreset(Aura, {
  semantic: {
    primary: primaryPalette,
    surface: surfacePalette,
  },
})
```

# Verify

Run `pnpm check:convention:app`, `pnpm lint`, and `pnpm build` after config changes.
