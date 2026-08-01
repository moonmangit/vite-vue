---
name: configure-primevue
description: 'Configure PrimeVue components via TypeScript theme presets (definePreset) in src/app/config/primevue/preset.ts.'
---

# 1. PrimeVue Base Configuration Architecture

This project uses **PrimeVue v4** in **Styled Mode** with `@primeuix/themes` (Aura preset) and **Tailwind CSS v4**.

Theme customization is handled via **TypeScript Theme Preset (`src/app/config/primevue/preset.ts`)**.

---

# 2. TypeScript Theme Preset (`src/app/config/primevue/preset.ts`)

Use `definePreset` inside `src/app/config/primevue/preset.ts` to customize semantic palettes and component design tokens:

```ts
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import {
  dangerPalette,
  helpPalette,
  infoPalette,
  primaryPalette,
  secondaryPalette,
  successPalette,
  surfacePalette,
  warningPalette,
} from '../designTokens'

export const AppPreset = definePreset(Aura, {
  semantic: {
    primary: primaryPalette,
    surface: surfacePalette,
    secondary: secondaryPalette,
    success: successPalette,
    info: infoPalette,
    warn: warningPalette,
    danger: dangerPalette,
    help: helpPalette,
  },
})
```

---

# 3. Modification Workflow & Best Practices

1. **Keep Configuration Clean:** Prefer base PrimeVue Aura preset design tokens and Tailwind utility classes over heavy custom CSS overrides.
2. **Preserve Dark Mode:** Ensure color adaptations support both light mode and dark mode (`.app-dark`).
3. **Verification Checklist:**
   - Format check: `pnpm format:check`
   - Lint check: `pnpm lint`
   - Build check: `pnpm build` (`vue-tsc -b && vite build`)
