import type { RouteRecordRaw } from 'vue-router'
import LoginView from './views/login/main.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'login',
    component: LoginView,
  },
]
