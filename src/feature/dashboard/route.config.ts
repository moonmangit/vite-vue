import type { RouteRecordRaw } from 'vue-router'
import DashboardView from './views/dashboard/main.vue'

export const dashboardRoutes: RouteRecordRaw[] = [
  { path: '', name: 'home', component: DashboardView },
  { path: 'analytics/realtime', name: 'realtime-metrics', component: DashboardView },
  { path: 'analytics/bigquery', name: 'bq-realtime-level3', component: DashboardView },
  { path: 'snowflake', name: 'snowflake-level3', component: DashboardView },
  { path: 'clickhouse', name: 'clickhouse-level3', component: DashboardView },
  { path: 'reports', name: 'historical-reports', component: DashboardView },
  { path: 'nodes/us-east', name: 'node-us-east-level3', component: DashboardView },
  { path: 'nodes/eu-west', name: 'node-eu-west-level3', component: DashboardView },
  { path: 'nodes/ap-south', name: 'node-ap-south-level3', component: DashboardView },
  { path: 'settings/general', name: 'general-settings', component: DashboardView },
  { path: 'settings/i18n', name: 'i18n-settings', component: DashboardView },
]
