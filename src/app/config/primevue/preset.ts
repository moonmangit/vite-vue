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
