<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import Toast from 'primevue/toast'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView, useRouter } from 'vue-router'
import { setAppLocale, type Locale } from '../../../app/config/i18n'
import { useAuthStore } from '../../../feature/auth/store/auth'
import SidebarNavSection from './SidebarNavSection.vue'
import TopNavSection from './TopNavSection.vue'

const router = useRouter()
const { locale } = useI18n()
const authStore = useAuthStore()

const isSidebarCollapsed = ref(false)

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'ไทย', value: 'th' },
]

const sidebarGroups = [
  {
    titleKey: 'nav.groups.core',
    items: [
      { labelKey: 'nav.dashboard', icon: 'pi pi-th-large', to: '/', badge: 'LIVE' },
      { labelKey: 'nav.analytics', icon: 'pi pi-chart-line', to: '/' },
    ],
  },
  {
    titleKey: 'nav.groups.system',
    items: [
      { labelKey: 'nav.clusterNodes', icon: 'pi pi-server', to: '/' },
      { labelKey: 'nav.securityAudit', icon: 'pi pi-shield', to: '/' },
      { labelKey: 'nav.databaseLog', icon: 'pi pi-database', to: '/' },
    ],
  },
  {
    titleKey: 'nav.groups.app',
    items: [
      { labelKey: 'nav.loginView', icon: 'pi pi-lock', to: '/login' },
      { labelKey: 'nav.systemSettings', icon: 'pi pi-cog', to: '/' },
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
