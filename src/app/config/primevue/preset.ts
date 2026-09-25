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
} from '../designTokens/main'

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
  components: {
    button: {
      colorScheme: {
        dark: {
          root: {
            primary: {
              background: '{primary.500}',
              hoverBackground: '{primary.600}',
              activeBackground: '{primary.700}',
              borderColor: '{primary.500}',
              hoverBorderColor: '{primary.600}',
              activeBorderColor: '{primary.700}',
              color: '{surface.0}',
              hoverColor: '{surface.0}',
              activeColor: '{surface.0}',
            },
          },
        },
      },
    },
  },
})
