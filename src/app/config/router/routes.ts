import type { RouteRecordRaw } from 'vue-router'
import LoginView from '../../../feature/auth/view/login/LoginView.vue'
import DashboardView from '../../../feature/dashboard/view/dashboard/DashboardView.vue'
import AppLayout from '../../layout/app/AppLayout.vue'
import EmptyLayout from '../../layout/empty/EmptyLayout.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: DashboardView,
      },
    ],
  },
  {
    path: '/',
    component: EmptyLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      },
    ],
  },
]
