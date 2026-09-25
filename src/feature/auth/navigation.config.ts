import type { NavigationGroup } from '../../shared/navigation/main'

export const authNavigation: NavigationGroup[] = [
  {
    titleKey: 'nav.groups.app',
    items: [
      {
        id: 'login-view',
        labelKey: 'nav.loginView',
        icon: 'pi pi-lock',
        to: '/login',
      },
    ],
  },
]
