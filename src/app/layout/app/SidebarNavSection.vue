<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { NavigationGroup } from '../../../shared/navigation/main'
import type { NavigationItem } from '../../../shared/navigation/main'
import AppButton from '../../../shared/component/AppButton.vue'
import AppTag from '../../../shared/component/AppTag.vue'
import SidebarNavItemSection from './SidebarNavItemSection.vue'

const props = defineProps<{
  isSidebarCollapsed: boolean
  sidebarGroups: NavigationGroup[]
}>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
  (e: 'flyoutActiveChange', isActive: boolean): void
}>()

const sidebarElement = ref<HTMLElement | null>(null)
const flyoutContent = ref<HTMLElement | null>(null)
const activeFlyoutItem = ref<NavigationItem | null>(null)
const flyoutAnchor = ref<HTMLElement | null>(null)
const flyoutTop = ref(0)
const flyoutWidth = ref<number | null>(null)
const flyoutHeight = ref<number | null>(null)
let measurementId = 0

const isFlyoutActive = computed(() => props.isSidebarCollapsed && activeFlyoutItem.value !== null)

const flyoutStyle = computed(() => ({
  top: `${flyoutTop.value}px`,
  width: flyoutWidth.value === null ? undefined : `${flyoutWidth.value}px`,
  height: flyoutHeight.value === null ? undefined : `${flyoutHeight.value}px`,
}))

function badgeTone(severity: NonNullable<NavigationItem['badge']>['severity']) {
  return severity === 'warn' ? 'warning' : severity || 'info'
}

async function activateFlyout(item: NavigationItem, anchor: HTMLElement) {
  activeFlyoutItem.value = item
  flyoutAnchor.value = anchor
  const currentMeasurementId = ++measurementId

  await nextTick()
  if (currentMeasurementId !== measurementId || !flyoutContent.value) return

  syncFlyoutSize(flyoutContent.value)
}

function syncFlyoutSize(content: HTMLElement) {
  const { width, height } = content.getBoundingClientRect()
  flyoutWidth.value = width
  flyoutHeight.value = height
  updateFlyoutPosition()
}

watch(isFlyoutActive, (isActive) => emit('flyoutActiveChange', isActive))

function updateFlyoutPosition() {
  if (!sidebarElement.value || !flyoutAnchor.value) return

  const sidebarRect = sidebarElement.value.getBoundingClientRect()
  const anchorRect = flyoutAnchor.value.getBoundingClientRect()
  const maxTop = Math.max(8, sidebarElement.value.clientHeight - (flyoutHeight.value ?? 0) - 8)
  flyoutTop.value = Math.max(8, Math.min(anchorRect.top - sidebarRect.top, maxTop))
}

function closeFlyout() {
  const sidebar = sidebarElement.value
  if (
    sidebar?.matches(':hover') ||
    (sidebar && document.activeElement instanceof Node && sidebar.contains(document.activeElement))
  ) {
    return
  }

  activeFlyoutItem.value = null
  flyoutAnchor.value = null
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget
  if (nextTarget instanceof Node && sidebarElement.value?.contains(nextTarget)) return

  requestAnimationFrame(closeFlyout)
}

watch(
  flyoutContent,
  (content, _, onCleanup) => {
    if (!content) return

    const observer = new ResizeObserver(() => {
      syncFlyoutSize(content)
    })

    observer.observe(content)
    onCleanup(() => observer.disconnect())
  },
  { flush: 'post' },
)

watch(
  () => props.isSidebarCollapsed,
  (collapsed) => {
    if (!collapsed) {
      activeFlyoutItem.value = null
      flyoutAnchor.value = null
    }
  },
)
</script>

<template>
  <aside
    ref="sidebarElement"
    class="relative z-30 flex h-full shrink-0 flex-col border-r app-surface-border app-surface transition-all duration-300 shadow-xs"
    :class="isSidebarCollapsed ? 'w-16 overflow-visible' : 'w-64 overflow-hidden'"
    @mouseleave="closeFlyout"
    @focusout="handleFocusOut"
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
            @activate-flyout="activateFlyout"
          />
        </nav>
      </div>
    </div>

    <!-- Shared minimized-sidebar flyout: its content and bounds transition in place. -->
    <div
      v-if="isSidebarCollapsed && activeFlyoutItem"
      class="absolute left-full z-50 pl-2.5 transition-[top] duration-200 ease-out motion-reduce:transition-none before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-4 before:content-['']"
      :style="{ top: flyoutStyle.top }"
    >
      <div
        class="overflow-hidden rounded-xl transition-[width,height] duration-75 ease-out motion-reduce:transition-none"
        :style="{ width: flyoutStyle.width, height: flyoutStyle.height }"
      >
        <div
          ref="flyoutContent"
          class="relative box-border w-max min-w-56 max-w-72 rounded-xl border border-surface-200/90 bg-surface-0/95 p-3 shadow-xl backdrop-blur-md app-dark:border-surface-700 app-dark:bg-surface-900/95"
        >
          <template v-if="activeFlyoutItem.children?.length">
            <div
              class="flex items-center justify-between gap-2 border-b border-surface-100 pb-2 app-dark:border-surface-800/80"
            >
              <div class="flex min-w-0 items-center gap-2">
                <i
                  v-if="activeFlyoutItem.icon"
                  :class="[
                    activeFlyoutItem.icon,
                    'app-text-sm text-primary-600 app-dark:text-primary-400',
                  ]"
                />
                <span class="app-text-sm app-text-normal truncate font-bold">
                  {{
                    activeFlyoutItem.labelKey
                      ? $t(activeFlyoutItem.labelKey)
                      : activeFlyoutItem.label
                  }}
                </span>
              </div>
              <AppTag
                v-if="activeFlyoutItem.badge"
                :value="activeFlyoutItem.badge.value"
                :tone="badgeTone(activeFlyoutItem.badge.severity)"
                class="app-text-sm rounded-md px-1.5 py-0 font-mono font-bold uppercase leading-none shadow-2xs"
              />
            </div>

            <div class="mt-2 space-y-1">
              <SidebarNavItemSection
                v-for="child in activeFlyoutItem.children"
                :key="child.id"
                :item="child"
                :is-sidebar-collapsed="false"
                :depth="1"
              />
            </div>
          </template>
          <SidebarNavItemSection
            v-else-if="activeFlyoutItem.to"
            :item="activeFlyoutItem"
            :is-sidebar-collapsed="false"
            :depth="1"
          />
        </div>
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
