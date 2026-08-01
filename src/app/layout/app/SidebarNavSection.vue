<script setup lang="ts">
import Button from 'primevue/button'
import SidebarNavItemSection, { type NavItem } from './SidebarNavItemSection.vue'

export interface SidebarGroup {
  titleKey: string
  items: NavItem[]
}

defineProps<{
  isSidebarCollapsed: boolean
  sidebarGroups: SidebarGroup[]
}>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
}>()
</script>

<template>
  <aside
    class="relative z-30 flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 app-dark:border-zinc-800/80 app-dark:bg-zinc-950 shadow-xs"
    :class="isSidebarCollapsed ? 'w-16 overflow-visible' : 'w-64 overflow-hidden'"
  >
    <!-- Navigation Links Group List (Internal Scroll) -->
    <div
      class="flex-1 px-2.5 py-4 space-y-5 custom-scrollbar"
      :class="isSidebarCollapsed ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden'"
    >
      <div v-for="(group, index) in sidebarGroups" :key="group.titleKey">
        <!-- Group Header Title (Expanded Mode) -->
        <span
          v-if="!isSidebarCollapsed"
          class="block px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 app-dark:text-zinc-500 select-none"
        >
          {{ $t(group.titleKey) }}
        </span>

        <!-- Group Divider Line (Minimized Mode - except for first group index 0) -->
        <div
          v-else-if="index > 0"
          class="my-2.5 border-t border-slate-200/80 app-dark:border-zinc-800/80 mx-1.5 transition-colors"
          :title="$t(group.titleKey)"
        />

        <nav class="space-y-1">
          <SidebarNavItemSection
            v-for="item in group.items"
            :key="item.id"
            :item="item"
            :is-sidebar-collapsed="isSidebarCollapsed"
          />
        </nav>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div
      class="h-12 shrink-0 border-t border-slate-200/90 p-3 app-dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-400 app-dark:text-zinc-500"
    >
      <span v-if="!isSidebarCollapsed" class="font-mono text-[10px] font-medium">
        v2.4.0 • Enterprise
      </span>
      <Button
        :icon="isSidebarCollapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'"
        severity="secondary"
        size="small"
        text
        class="p-1 text-slate-500 hover:text-slate-900 app-dark:text-zinc-400 app-dark:hover:text-white"
        title="Toggle Sidebar"
        @click="emit('toggleSidebar')"
      />
    </div>
  </aside>
</template>
