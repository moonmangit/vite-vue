import type { RouteRecordRaw } from 'vue-router'
import { authRoutes } from '../../../feature/auth/route.config'
import { dashboardRoutes } from '../../../feature/dashboard/route.config'
import { devRoutes } from '../../../feature/dev/route.config'
import AppLayout from '../../layout/app/AppLayout.vue'
import EmptyLayout from '../../layout/empty/EmptyLayout.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [...dashboardRoutes, ...(import.meta.env.DEV ? devRoutes : [])],
  },
  {
    path: '/',
    component: EmptyLayout,
    children: authRoutes,
  },
]
