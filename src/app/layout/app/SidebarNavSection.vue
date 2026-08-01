<script setup lang="ts">
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { RouterLink, useRoute } from 'vue-router'

export interface SidebarGroup {
  titleKey: string
  items: Array<{
    labelKey: string
    icon: string
    to: string
    badge?: string
  }>
}

defineProps<{
  isSidebarCollapsed: boolean
  sidebarGroups: SidebarGroup[]
}>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const route = useRoute()
</script>

<template>
  <aside
    class="flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 app-dark:border-zinc-800 app-dark:bg-zinc-950 overflow-hidden"
    :class="isSidebarCollapsed ? 'w-16' : 'w-64'"
  >
    <!-- Navigation Links Group List (Internal Scroll) -->
    <div class="flex-1 overflow-y-auto px-3 py-4 space-y-5">
      <div v-for="group in sidebarGroups" :key="group.titleKey">
        <span
          v-if="!isSidebarCollapsed"
          class="block px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 app-dark:text-zinc-500"
        >
          {{ $t(group.titleKey) }}
        </span>

        <nav class="space-y-1">
          <RouterLink
            v-for="item in group.items"
            :key="item.labelKey"
            :to="item.to"
            class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold no-underline transition"
            :class="[
              route.path === item.to
                ? 'bg-primary-50 text-primary-700 app-dark:bg-primary-950/40 app-dark:text-primary-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 app-dark:text-zinc-400 app-dark:hover:bg-zinc-900 app-dark:hover:text-white',
            ]"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <i :class="[item.icon, 'text-sm flex-shrink-0']" />
              <span v-if="!isSidebarCollapsed" class="truncate">
                {{ $t(item.labelKey) }}
              </span>
            </div>

            <Tag
              v-if="item.badge && !isSidebarCollapsed"
              :value="item.badge"
              severity="success"
              class="text-[9px] px-1 py-0"
            />
          </RouterLink>
        </nav>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div
      class="h-12 shrink-0 border-t border-slate-200 p-3 app-dark:border-zinc-800 flex items-center justify-between text-[11px] text-slate-400 app-dark:text-zinc-500"
    >
      <span v-if="!isSidebarCollapsed" class="font-mono">v2.4.0 • Enterprise</span>
      <Button
        :icon="isSidebarCollapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'"
        severity="secondary"
        size="small"
        text
        class="p-1"
        title="Collapse Sidebar"
        @click="emit('toggleSidebar')"
      />
    </div>
  </aside>
</template>
