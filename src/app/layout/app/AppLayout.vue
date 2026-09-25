<script setup lang="ts">
import { useDark, useStorage, useToggle } from '@vueuse/core'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView, useRouter } from 'vue-router'
import { setAppLocale, type Locale } from '../../../app/config/i18n/main'
import { useAuthStore } from '../../../feature/auth/store/auth'
import { authNavigation } from '../../../feature/auth/navigation.config'
import { dashboardNavigation } from '../../../feature/dashboard/navigation.config'
import type { NavigationGroup } from '../../../shared/navigation/main'
import { useToastStore } from '../../../shared/toast/main'
import SidebarNavSection from './SidebarNavSection.vue'
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

const sidebarGroups = mergeNavigationGroups([
  ...dashboardNavigation.slice(0, 2),
  ...authNavigation,
  ...dashboardNavigation.slice(2),
])

function mergeNavigationGroups(groups: NavigationGroup[]): NavigationGroup[] {
  const mergedGroups: NavigationGroup[] = []

  for (const group of groups) {
    const existingGroup = mergedGroups.find((item) => item.titleKey === group.titleKey)
    if (existingGroup) {
      existingGroup.items.push(...group.items)
    } else {
      mergedGroups.push({ ...group, items: [...group.items] })
    }
  }

  return mergedGroups
}

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
