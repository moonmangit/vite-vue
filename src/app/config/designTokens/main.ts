import { designTokens } from './palettes'

export * from './palettes'

const designTokenEntries = Object.entries(designTokens)

function toCssVariables(prefix: string, palette: Record<string, string>) {
  return Object.entries(palette)
    .map(([shade, value]) => `--${prefix}-${shade}: ${value};`)
    .join('\n')
}

export function createDesignTokenCss() {
  return `:root {
${designTokenEntries.map(([name, palette]) => toCssVariables(`brand-${name}`, palette)).join('\n')}
}`
}

export function installDesignTokens() {
  const styleId = 'app-design-tokens'
  const existingStyle = document.getElementById(styleId)

  if (existingStyle) {
    existingStyle.textContent = createDesignTokenCss()
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = createDesignTokenCss()
  document.head.append(style)
}
