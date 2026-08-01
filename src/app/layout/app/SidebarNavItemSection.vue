<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Tag from 'primevue/tag'
import { RouterLink, useRoute } from 'vue-router'

export interface NavItemBadge {
  value: string | number
  severity?: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'
  pulse?: boolean
}

export interface NavItem {
  id: string
  labelKey?: string
  label?: string
  icon?: string
  to?: string
  badge?: NavItemBadge
  statusState?: 'normal' | 'muted' | 'loading' | 'notify'
  children?: NavItem[]
  expanded?: boolean
}

const props = withDefaults(
  defineProps<{
    item: NavItem
    isSidebarCollapsed: boolean
    depth?: number
  }>(),
  {
    depth: 0,
  },
)

const route = useRoute()

const hasChildren = computed(() => Boolean(props.item.children && props.item.children.length > 0))

// Active ONLY for current page leaf links (parent groups are not active links themselves)
const isActive = computed(() => {
  if (hasChildren.value) return false
  if (!props.item.to || props.item.to === '#') return false
  if (props.item.to === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(props.item.to)
})

// Check if any descendant child (Level 2, Level 3, etc.) matches current route
const hasActiveChild = computed((): boolean => {
  if (!props.item.children || props.item.children.length === 0) return false

  function checkChild(childrenList: NavItem[]): boolean {
    return childrenList.some((child) => {
      if (child.children && child.children.length > 0) {
        return checkChild(child.children)
      }
      if (!child.to || child.to === '#') return false
      if (child.to === '/') {
        return route.path === '/'
      }
      return route.path.startsWith(child.to)
    })
  }

  return checkChild(props.item.children)
})

const isExpanded = ref(props.item.expanded ?? hasActiveChild.value)

// Auto-expand folder when a child item becomes active
watch(
  hasActiveChild,
  (active) => {
    if (active) {
      isExpanded.value = true
    }
  },
  { immediate: true },
)

function toggleExpand(e: Event) {
  if (props.item.statusState === 'muted' || props.item.statusState === 'loading') {
    e.preventDefault()
    return
  }
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<template>
  <div class="relative w-full" :class="isSidebarCollapsed && depth === 0 ? 'group/flyout' : ''">
    <!-- Main Item Header Link / Button -->
    <component
      :is="item.to && !hasChildren ? RouterLink : 'div'"
      :to="item.to && !hasChildren ? item.to : undefined"
      role="button"
      :tabindex="item.statusState === 'muted' ? -1 : 0"
      class="group relative flex h-9 shrink-0 items-center justify-between rounded-lg px-2.5 text-xs font-semibold select-none transition-all duration-150 cursor-pointer"
      :class="[
        // Muted / Disabled state
        item.statusState === 'muted'
          ? 'opacity-40 cursor-not-allowed pointer-events-none select-none text-slate-400 app-dark:text-zinc-500'
          : '',

        // Loading state
        item.statusState === 'loading'
          ? 'animate-pulse text-slate-400 app-dark:text-zinc-400 bg-slate-100/60 app-dark:bg-zinc-900/60'
          : '',

        // Active State (Current Page Only) vs Parent Containing Active Child
        isActive
          ? 'bg-primary-50 text-primary-700 font-bold shadow-2xs app-dark:bg-primary-600 app-dark:text-white app-dark:shadow-xs'
          : hasActiveChild
            ? 'text-slate-900 font-bold bg-slate-100/70 app-dark:text-zinc-100 app-dark:bg-zinc-900/70'
            : item.statusState !== 'muted' && item.statusState !== 'loading'
              ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 app-dark:text-zinc-300 app-dark:hover:bg-zinc-900 app-dark:hover:text-white'
              : '',
      ]"
      @click="toggleExpand"
    >
      <div
        class="flex h-full items-center gap-2.5 min-w-0 flex-1"
        :class="isSidebarCollapsed && depth === 0 ? 'justify-center' : ''"
      >
        <!-- Icon & Notification Indicator Container (Fixed size h-5 w-5) -->
        <div class="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <i
            v-if="item.statusState === 'loading'"
            class="pi pi-spin pi-spinner text-sm text-primary-600 app-dark:text-primary-400"
          />
          <i
            v-else-if="item.icon"
            :class="[
              item.icon,
              'text-sm transition-transform duration-150 group-hover:scale-105',
              isActive
                ? 'text-primary-600 app-dark:text-white'
                : hasActiveChild
                  ? 'text-primary-600 app-dark:text-primary-400'
                  : 'text-slate-400 app-dark:text-zinc-400 group-hover:text-slate-700 group-hover:app-dark:text-zinc-200',
            ]"
          />

          <!-- Notification Dot / Pulse -->
          <span
            v-if="item.statusState === 'notify' || item.badge?.pulse"
            class="absolute -top-0.5 -right-0.5 flex h-2 w-2"
          >
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"
            />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
        </div>

        <!-- Label -->
        <span
          v-if="!isSidebarCollapsed"
          class="truncate text-xs tracking-tight leading-none"
          :class="isActive ? 'text-primary-700 app-dark:text-white font-bold' : ''"
        >
          {{ item.labelKey ? $t(item.labelKey) : item.label }}
        </span>
      </div>

      <!-- Right Side Indicators (Badge / Chevron / Loading Spinner) Container (Fixed h-5) -->
      <div v-if="!isSidebarCollapsed" class="flex h-5 items-center gap-1.5 shrink-0 ml-1.5">
        <!-- Badge Tag -->
        <Tag
          v-if="item.badge"
          :value="item.badge.value"
          :severity="item.badge.severity || 'info'"
          class="text-[9px] px-1.5 py-0 font-mono font-bold uppercase rounded-md shadow-2xs leading-none"
        />

        <!-- Muted indicator -->
        <span
          v-if="item.statusState === 'muted'"
          class="text-[9px] font-mono uppercase text-slate-400 app-dark:text-zinc-500 leading-none"
        >
          OFF
        </span>

        <!-- Chevron Toggle Icon for Parent Items -->
        <i
          v-if="hasChildren"
          class="pi pi-chevron-right text-[10px] text-slate-400 transition-transform duration-300 app-dark:text-zinc-400"
          :class="isExpanded ? 'rotate-90 text-primary-600 app-dark:text-primary-300' : ''"
        />
      </div>
    </component>

    <!-- FLOATING OVERFLOW POPPER / FLYOUT PANEL (For Minimized/Collapsed Sidebar Mode - Zero-gap hit bridge) -->
    <div
      v-if="isSidebarCollapsed && depth === 0"
      class="absolute left-full top-0 pl-2.5 z-50 transition-all duration-200 opacity-0 pointer-events-none -translate-x-1 group-hover/flyout:opacity-100 group-hover/flyout:pointer-events-auto group-hover/flyout:translate-x-0"
    >
      <div
        class="relative min-w-56 max-w-72 rounded-xl border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md app-dark:border-zinc-800 app-dark:bg-zinc-900/95 before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-4 before:content-['']"
      >
        <!-- Flyout Header Title -->
        <div
          class="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 app-dark:border-zinc-800/80"
        >
          <div class="flex items-center gap-2 min-w-0">
            <i
              v-if="item.icon"
              :class="[item.icon, 'text-sm text-primary-600 app-dark:text-primary-400']"
            />
            <span class="text-xs font-bold text-slate-800 app-dark:text-zinc-100 truncate">
              {{ item.labelKey ? $t(item.labelKey) : item.label }}
            </span>
          </div>
          <Tag
            v-if="item.badge"
            :value="item.badge.value"
            :severity="item.badge.severity || 'info'"
            class="text-[9px] px-1.5 py-0 font-mono font-bold uppercase rounded-md shadow-2xs leading-none"
          />
        </div>

        <!-- Flyout Body: Children Nested Navigation Structure -->
        <div v-if="hasChildren" class="mt-2 space-y-1">
          <SidebarNavItemSection
            v-for="child in item.children"
            :key="child.id"
            :item="child"
            :is-sidebar-collapsed="false"
            :depth="1"
          />
        </div>
        <div v-else-if="item.to" class="mt-2 text-[11px] text-slate-500 app-dark:text-zinc-400">
          <RouterLink
            :to="item.to"
            class="inline-flex items-center gap-1.5 text-primary-600 font-medium hover:underline app-dark:text-primary-400"
          >
            <span>Open {{ item.labelKey ? $t(item.labelKey) : item.label }}</span>
            <i class="pi pi-arrow-right text-[10px]" />
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- CSS Grid Auto-Height Expansion Container (For Expanded Sidebar Mode) -->
    <div
      v-if="hasChildren && !isSidebarCollapsed"
      class="grid transition-all duration-300 ease-in-out"
      :class="isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'"
    >
      <div class="overflow-hidden">
        <!-- Nested Vertical Guideline Container -->
        <div
          class="ml-3.5 pl-2 border-l transition-colors duration-200 space-y-1 my-1"
          :class="
            hasActiveChild
              ? 'border-primary-300/70 app-dark:border-primary-500/40'
              : 'border-slate-200/60 app-dark:border-zinc-800/60'
          "
        >
          <SidebarNavItemSection
            v-for="child in item.children"
            :key="child.id"
            :item="child"
            :is-sidebar-collapsed="isSidebarCollapsed"
            :depth="depth + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
