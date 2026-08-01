<script setup lang="ts">
import { useDark, useStorage, useToggle } from '@vueuse/core'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView, useRouter } from 'vue-router'
import { setAppLocale, type Locale } from '../../../app/config/i18n'
import { useAuthStore } from '../../../feature/auth/store/auth'
import { useToastStore } from '../../../shared/store/toast'
import SidebarNavSection, { type SidebarGroup } from './SidebarNavSection.vue'
import TopNavSection from './TopNavSection.vue'

const router = useRouter()
const { locale } = useI18n()
const authStore = useAuthStore()

const primeToast = useToast()
const toastStore = useToastStore()

// Watch Pinia Toast Store queue and flush to PrimeVue ToastService
watch(
  () => toastStore.queue.length,
  () => {
    while (toastStore.queue.length > 0) {
      const item = toastStore.dequeue()
      if (item) {
        primeToast.add({
          severity: item.severity || 'info',
          summary: item.summary,
          detail: item.detail,
          // When sticky is true, omit `life` so the toast stays until dismissed
          life: item.sticky ? undefined : item.life,
          closable: item.closable,
          group: item.group,
        })
      }
    }
  },
  { immediate: true },
)

const isSidebarCollapsed = useStorage('app_sidebar_collapsed', false)

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'ไทย', value: 'th' },
]

const sidebarGroups: SidebarGroup[] = [
  {
    titleKey: 'nav.groups.core',
    items: [
      {
        id: 'dashboard',
        labelKey: 'nav.dashboard',
        icon: 'pi pi-th-large',
        to: '/',
        statusState: 'notify',
        badge: { value: 'LIVE', severity: 'success', pulse: true },
      },
      {
        id: 'analytics-parent',
        labelKey: 'nav.analytics',
        icon: 'pi pi-chart-line',
        children: [
          {
            id: 'realtime-metrics',
            label: 'Realtime Telemetry',
            icon: 'pi pi-bolt',
            to: '/',
          },
          {
            id: 'data-warehousing-level2',
            label: 'Data Warehousing',
            icon: 'pi pi-database',
            statusState: 'notify',
            children: [
              {
                id: 'bq-realtime-level3',
                label: 'BigQuery Stream',
                icon: 'pi pi-cloud',
                to: '/',
                badge: { value: '99.9%', severity: 'success' },
              },
              {
                id: 'snowflake-level3',
                label: 'Snowflake Storage',
                icon: 'pi pi-box',
                to: '/snowflake',
                statusState: 'muted',
              },
              {
                id: 'clickhouse-level3',
                label: 'ClickHouse Sync',
                icon: 'pi pi-sync',
                to: '/clickhouse',
                statusState: 'loading',
              },
            ],
          },
          {
            id: 'historical-reports',
            label: 'Historical Reports',
            icon: 'pi pi-file',
            to: '/reports',
            statusState: 'muted',
          },
        ],
      },
    ],
  },
  {
    titleKey: 'nav.groups.system',
    items: [
      {
        id: 'cluster-nodes-level1',
        labelKey: 'nav.clusterNodes',
        icon: 'pi pi-server',
        children: [
          {
            id: 'k8s-regional-level2',
            label: 'Kubernetes Pods',
            icon: 'pi pi-box',
            children: [
              {
                id: 'node-us-east-level3',
                label: 'US-East (Prod Cluster)',
                icon: 'pi pi-globe',
                to: '/',
              },
              {
                id: 'node-eu-west-level3',
                label: 'EU-West (Staging Cluster)',
                icon: 'pi pi-globe',
                to: '/',
                badge: { value: 'WARN', severity: 'warn' },
              },
              {
                id: 'node-ap-south-level3',
                label: 'AP-South (Dev Cluster)',
                icon: 'pi pi-globe',
                to: '/',
              },
            ],
          },
        ],
      },
      {
        id: 'security-audit',
        labelKey: 'nav.securityAudit',
        icon: 'pi pi-shield',
        statusState: 'notify',
        badge: { value: '3 Alerts', severity: 'danger', pulse: true },
      },
    ],
  },
  {
    titleKey: 'nav.groups.app',
    items: [
      {
        id: 'login-view',
        labelKey: 'nav.loginView',
        icon: 'pi pi-lock',
        to: '/login',
      },
      {
        id: 'system-settings',
        labelKey: 'nav.systemSettings',
        icon: 'pi pi-cog',
        children: [
          {
            id: 'general-settings',
            label: 'General Preferences',
            icon: 'pi pi-sliders-h',
            to: '/',
          },
          {
            id: 'i18n-settings',
            label: 'Language & Locale',
            icon: 'pi pi-language',
            to: '/',
          },
        ],
      },
    ],
  },
]

const isDark = useDark({
  selector: 'html',
  valueDark: 'app-dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

watch(
  locale,
  (value) => {
    setAppLocale(value as Locale)
  },
  { immediate: true },
)
</script>

<template>
  <Toast />

  <div
    class="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 text-slate-950 transition-colors app-dark:bg-zinc-950 app-dark:text-zinc-50"
  >
    <!-- Layout Section: Top Navigation Bar -->
    <TopNavSection
      :locale="locale"
      :language-options="languageOptions"
      :is-dark="isDark"
      :user="authStore.user"
      @toggle-sidebar="toggleSidebar"
      @toggle-dark="toggleDark()"
      @logout="handleLogout"
      @update:locale="(val) => (locale = val)"
    />

    <!-- Body Layout Container -->
    <div class="flex flex-1 min-h-0 w-full overflow-hidden">
      <!-- Layout Section: Left Sidebar Navigation -->
      <SidebarNavSection
        :is-sidebar-collapsed="isSidebarCollapsed"
        :sidebar-groups="sidebarGroups"
        @toggle-sidebar="toggleSidebar"
      />

      <!-- Main RouterView Area -->
      <main
        class="flex-1 h-full min-w-0 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 app-dark:bg-zinc-950/50"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>
