<script setup lang="ts">
import type { NavigationGroup } from '../../../shared/navigation/main'
import AppButton from '../../../shared/component/AppButton.vue'
import SidebarNavItemSection from './SidebarNavItemSection.vue'

defineProps<{
  isSidebarCollapsed: boolean
  sidebarGroups: NavigationGroup[]
}>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
}>()
</script>

<template>
  <aside
    class="relative z-30 flex h-full shrink-0 flex-col border-r app-surface-border app-surface transition-all duration-300 shadow-xs"
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
          class="block px-2 mb-2 app-text-sm app-text-disabled font-bold uppercase tracking-wider select-none"
        >
          {{ $t(group.titleKey) }}
        </span>

        <!-- Group Divider Line (Minimized Mode - except for first group index 0) -->
        <div
          v-else-if="index > 0"
          class="my-2.5 border-t app-surface-border mx-1.5 transition-colors"
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
      class="h-12 shrink-0 border-t app-surface-border p-3 flex items-center justify-between app-text-sm app-text-muted"
    >
      <span v-if="!isSidebarCollapsed" class="font-mono app-text-sm font-medium">
        v2.4.0 • Enterprise
      </span>
      <AppButton
        :icon="isSidebarCollapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'"
        tone="secondary"
        size="small"
        appearance="text"
        class="p-1 app-text-sm app-text-muted app-hover-text-normal"
        title="Toggle Sidebar"
        @click="emit('toggleSidebar')"
      />
    </div>
  </aside>
</template>
