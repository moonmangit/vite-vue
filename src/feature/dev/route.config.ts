import type { RouteRecordRaw } from 'vue-router'

export const devRoutes: RouteRecordRaw[] = [
  {
    path: 'dev/components',
    name: 'dev-component-showcase',
    component: () => import('./views/component-showcase/main.vue'),
  },
]
