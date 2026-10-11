const nativeAttributes = new Set([
  'accept',
  'alt',
  'autocomplete',
  'autofocus',
  'class',
  'for',
  'form',
  'href',
  'id',
  'inputmode',
  'maxlength',
  'minlength',
  'name',
  'pattern',
  'placeholder',
  'rel',
  'required',
  'role',
  'spellcheck',
  'style',
  'tabindex',
  'target',
  'title',
  'type',
])

export function appComponentAttrs(attrs: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(attrs).filter(([name]) => {
      return (
        nativeAttributes.has(name) ||
        name.startsWith('aria-') ||
        name.startsWith('data-') ||
        /^on[A-Z]/.test(name)
      )
    }),
  )
}
