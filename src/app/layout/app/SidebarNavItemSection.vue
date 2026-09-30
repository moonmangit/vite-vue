<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { NavigationItem } from '../../../shared/navigation/main'

const props = withDefaults(
  defineProps<{
    item: NavigationItem
    isSidebarCollapsed: boolean
    depth?: number
  }>(),
  {
    depth: 0,
  },
)

const emit = defineEmits<{
  (event: 'activateFlyout', item: NavigationItem, anchor: HTMLElement): void
}>()

const route = useRoute()

const hasChildren = computed(() => Boolean(props.item.children && props.item.children.length > 0))

function badgeTone(severity: NonNullable<NavigationItem['badge']>['severity']) {
  return severity === 'warn' ? 'warning' : severity || 'info'
}

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

  function checkChild(childrenList: NavigationItem[]): boolean {
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

function activateFlyout(event: FocusEvent | MouseEvent) {
  if (props.isSidebarCollapsed && props.depth === 0) {
    emit('activateFlyout', props.item, event.currentTarget as HTMLElement)
  }
}
</script>

<template>
  <div class="relative w-full" @mouseenter="activateFlyout" @focusin="activateFlyout">
    <!-- Main Item Header Link / Button -->
    <component
      :is="item.to && !hasChildren ? RouterLink : 'div'"
      :to="item.to && !hasChildren ? item.to : undefined"
      :role="item.to && !hasChildren ? undefined : 'button'"
      :tabindex="item.statusState === 'muted' ? -1 : 0"
      class="group relative flex h-9 shrink-0 items-center justify-between rounded-lg px-2.5 app-text-sm font-semibold select-none transition-all duration-150 cursor-pointer"
      :class="[
        // Muted / Disabled state
        item.statusState === 'muted'
          ? 'opacity-40 cursor-not-allowed pointer-events-none select-none app-text-disabled'
          : '',

        // Loading state
        item.statusState === 'loading'
          ? 'animate-pulse app-text-muted bg-surface-100/60 app-dark:bg-surface-900/60'
          : '',

        // Active State (Current Page Only) vs Parent Containing Active Child
        isActive
          ? 'bg-primary-50 text-primary-700 font-bold shadow-2xs app-dark:bg-primary-600 app-dark:text-white app-dark:shadow-xs'
          : hasActiveChild
            ? 'app-text-normal font-bold bg-surface-100/70 app-dark:bg-surface-900/70'
            : item.statusState !== 'muted' && item.statusState !== 'loading'
              ? 'app-text-muted hover:bg-surface-100 app-hover-text-normal app-dark:hover:bg-surface-900'
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
            class="pi pi-spin pi-spinner app-text-sm text-primary-600 app-dark:text-primary-400"
          />
          <i
            v-else-if="item.icon"
            :class="[
              item.icon,
              'app-text-sm transition-transform duration-150 group-hover:scale-105',
              isActive
                ? 'text-primary-600 app-dark:text-white'
                : hasActiveChild
                  ? 'text-primary-600 app-dark:text-primary-400'
                  : 'app-text-muted app-group-hover-text-normal',
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
          class="truncate app-text-sm tracking-tight leading-none"
          :class="isActive ? 'text-primary-700 app-dark:text-white font-bold' : ''"
        >
          {{ item.labelKey ? $t(item.labelKey) : item.label }}
        </span>
      </div>

      <!-- Right Side Indicators (Badge / Chevron / Loading Spinner) Container (Fixed h-5) -->
      <div v-if="!isSidebarCollapsed" class="flex h-5 items-center gap-1.5 shrink-0 ml-1.5">
        <!-- Badge Tag -->
        <AppTag
          v-if="item.badge"
          :value="item.badge.value"
          :tone="badgeTone(item.badge.severity)"
          class="app-text-sm px-1.5 py-0 font-mono font-bold uppercase rounded-md shadow-2xs leading-none"
        />

        <!-- Muted indicator -->
        <span
          v-if="item.statusState === 'muted'"
          class="app-text-sm app-text-disabled font-mono uppercase leading-none"
        >
          {{ $t('shared.navigation.off') }}
        </span>

        <!-- Chevron Toggle Icon for Parent Items -->
        <i
          v-if="hasChildren"
          class="pi pi-chevron-right app-text-sm app-text-muted transition-transform duration-300"
          :class="isExpanded ? 'rotate-90 text-primary-600 app-dark:text-primary-300' : ''"
        />
      </div>
    </component>

    <!-- CSS Grid Auto-Height Expansion Container (For Expanded Sidebar Mode) -->
    <div
      v-if="hasChildren && !isSidebarCollapsed"
      class="grid transition-all duration-150 ease-in-out"
      :class="isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'"
    >
      <div class="overflow-hidden">
        <!-- Nested Vertical Guideline Container -->
        <div
          class="ml-3.5 pl-2 border-l border-surface-200 app-dark:border-surface-700 space-y-1 my-1"
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
