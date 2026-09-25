---
name: configure-primevue
description: 'Configure the app-wide PrimeVue theme and plugin in the app configuration module while keeping feature and shared layers independent of app setup.'
---

# PrimeVue ownership

The project uses PrimeVue v4 styled mode with `@primeuix/themes` Aura and Tailwind CSS v4. App-wide installation belongs in `src/app/config/primevue/main.ts`; the theme preset stays in `src/app/config/primevue/preset.ts` and design tokens are owned by `src/app/config/designTokens/`.

Every app configuration module exports through its required `main.ts`. Keep preset support files beside the owning config; do not put third-party app setup in feature or shared modules.

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

Prefer preset tokens and Tailwind utilities over broad custom CSS. Preserve `.app-dark` behavior. Shared and feature modules may consume PrimeVue components but must not import the app configuration.

# Verify

Run `pnpm check:architecture`, `pnpm lint`, and `pnpm build`.
