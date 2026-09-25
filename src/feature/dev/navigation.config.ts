import type { NavigationGroup } from '../../shared/navigation/main'

export const devNavigation: NavigationGroup[] = [
  {
    titleKey: 'features.dev.navigation.group',
    items: [
      {
        id: 'dev-component-showcase',
        labelKey: 'features.dev.navigation.components',
        icon: 'pi pi-box',
        to: '/dev/components',
      },
    ],
  },
]
