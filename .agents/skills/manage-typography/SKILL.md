---
name: manage-typography
description: 'Create, update, or migrate global typography tokens, tones, and CSS-variable font-size overrides across the project.'
---

# Global text conventions

Typography is provided by global classes in `src/style.css`; do not add an AppText component or use raw Tailwind font-size classes.

| Size class     | Default size |
| -------------- | -----------: |
| `app-text-xs`  |    `0.75rem` |
| `app-text-sm`  |   `0.875rem` |
| `app-text-md`  |       `1rem` |
| `app-text-lg`  |   `1.125rem` |
| `app-text-xl`  |    `1.25rem` |
| `app-text-2xl` |     `1.5rem` |
| `app-text-3xl` |   `1.875rem` |

Use one optional tone class: `app-text-normal`, `app-text-muted`, or `app-text-disabled`. Tones adapt to light/dark mode. Disabled tone only changes appearance, not control behavior. Preserve semantic colors for links, validation, status, and brand emphasis.

Aside navigation is intentionally restricted to `app-text-sm` and `app-text-md`; do not use custom size overrides or other size tokens there.

# Custom size

Use a named class, then override its size with `--app-font-size` inline. CSS lengths in px, rem, and em are supported; do not use Tailwind arbitrary font-size classes.

```vue
<p class="app-text-md app-text-muted" style="--app-font-size: 18px">Pixel size</p>
<p class="app-text-lg" style="--app-font-size: 1.125rem">Rem size</p>
<p class="app-text-md" style="--app-font-size: 1.1em">Em size</p>
```

# Lifecycle workflow

- **Create/update:** Apply a size class to text and text-like icon glyphs; add a tone for neutral hierarchy. Keep font weight, alignment, and semantic color independent.
- **Migrate:** Replace raw Tailwind font-size tokens and arbitrary `text-[...]` sizes in app, feature, shared, and facade components. For existing non-standard sizes, retain the closest named class and set `--app-font-size` to preserve the intended size.
- **Remove:** Remove unused typography tokens/classes only after checking all source usages and the dev Typography showcase.
- Keep the dev Typography showcase aligned with all sizes, tones, CSS-variable examples, and en/th messages.

# Verify

Run `pnpm check:typography`, `pnpm check:all`, and `pnpm build` after typography changes.
