export const primaryPalette = {
  '50': 'oklch(94.70% 0.022 272.06)',
  '100': 'oklch(89.32% 0.046 270.44)',
  '200': 'oklch(78.66% 0.093 269.95)',
  '300': 'oklch(68.15% 0.145 268.34)',
  '400': 'oklch(58.26% 0.197 266.21)',
  '500': 'oklch(49.77% 0.242 264.30)',
  '600': 'oklch(42.52% 0.203 264.33)',
  '700': 'oklch(34.87% 0.161 264.53)',
  '800': 'oklch(26.82% 0.115 264.97)',
  '900': 'oklch(18.23% 0.067 264.39)',
  '950': 'oklch(15.36% 0.051 264.34)',
} as const

export const surfacePalette = {
  0: '#ffffff',
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
} as const

export const secondaryPalette = surfacePalette

export const successPalette = {
  '50': '#ecfdf5',
  '100': '#d1fae5',
  '200': '#a7f3d0',
  '300': '#6ee7b7',
  '400': '#34d399',
  '500': '#10b981',
  '600': '#059669',
  '700': '#047857',
  '800': '#065f46',
  '900': '#064e3b',
  '950': '#022c22',
} as const

export const infoPalette = {
  '50': '#f0f9ff',
  '100': '#e0f2fe',
  '200': '#bae6fd',
  '300': '#7dd3fc',
  '400': '#38bdf8',
  '500': '#0ea5e9',
  '600': '#0284c7',
  '700': '#0369a1',
  '800': '#075985',
  '900': '#0c4a6e',
  '950': '#082f49',
} as const

export const warningPalette = {
  '50': '#fff7ed',
  '100': '#ffedd5',
  '200': '#fed7aa',
  '300': '#fdba74',
  '400': '#fb923c',
  '500': '#f97316',
  '600': '#ea580c',
  '700': '#c2410c',
  '800': '#9a3412',
  '900': '#7c2d12',
  '950': '#431407',
} as const

export const dangerPalette = {
  '50': '#fef2f2',
  '100': '#fee2e2',
  '200': '#fecaca',
  '300': '#fca5a5',
  '400': '#f87171',
  '500': '#ef4444',
  '600': '#dc2626',
  '700': '#b91c1c',
  '800': '#991b1b',
  '900': '#7f1d1d',
  '950': '#450a0a',
} as const

export const helpPalette = {
  '50': '#faf5ff',
  '100': '#f3e8ff',
  '200': '#e9d5ff',
  '300': '#d8b4fe',
  '400': '#c084fc',
  '500': '#a855f7',
  '600': '#9333ea',
  '700': '#7e22ce',
  '800': '#6b21a8',
  '900': '#581c87',
  '950': '#3b0764',
} as const

export const designTokens = {
  primary: primaryPalette,
  success: successPalette,
  info: infoPalette,
  warning: warningPalette,
  danger: dangerPalette,
  help: helpPalette,
} as const
