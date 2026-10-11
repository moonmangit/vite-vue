<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShowcaseNavigationItem' })

type NavigationItem = {
  id: string
  label: string
  icon?: string
  target?: string
  children?: NavigationItem[]
}

const props = withDefaults(
  defineProps<{
    item: NavigationItem
    activeTarget: string
    expandedItems: string[]
    depth?: number
  }>(),
  { depth: 0 },
)

const emit = defineEmits<{
  toggle: [id: string]
  navigate: [target: string]
}>()

const hasChildren = computed(() => Boolean(props.item.children?.length))
const isExpanded = computed(() => props.expandedItems.includes(props.item.id))
</script>

<template>
  <li class="space-y-1">
    <button
      v-if="hasChildren"
      type="button"
      class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left app-text-sm app-text-normal hover:bg-surface-100 app-dark:hover:bg-surface-800"
      :class="depth === 0 ? 'font-semibold' : 'font-medium'"
      :aria-expanded="isExpanded"
      :aria-controls="`${item.id}-navigation`"
      @click="emit('toggle', item.id)"
    >
      <span class="inline-flex min-w-0 items-center gap-2">
        <span v-if="item.icon" class="inline-flex size-4 shrink-0 items-center justify-center">
          <i :class="[item.icon, 'app-text-xs app-text-muted']" aria-hidden="true" />
        </span>
        <span class="truncate">{{ item.label }}</span>
      </span>
      <i
        :class="isExpanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
        class="app-text-xs app-text-muted"
        aria-hidden="true"
      />
    </button>

    <a
      v-else-if="item.target"
      :href="`#${item.target}`"
      class="block min-w-0 rounded-lg px-2.5 py-2 app-text-sm transition-all duration-150"
      :class="
        activeTarget === item.target
          ? 'bg-primary-50 text-primary-700 font-bold shadow-2xs app-dark:bg-primary-600 app-dark:text-white app-dark:shadow-xs'
          : 'app-text-muted hover:bg-surface-100 app-hover-text-normal app-dark:hover:bg-surface-900'
      "
      :aria-current="activeTarget === item.target ? 'location' : undefined"
      @click.prevent="emit('navigate', item.target)"
    >
      <span class="block truncate leading-5">{{ item.label }}</span>
      <span
        class="grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-200 ease-out motion-reduce:transition-none"
        :class="
          activeTarget === item.target && item.label.length > 20
            ? 'mt-1 grid-rows-[1fr] opacity-100'
            : 'mt-0 grid-rows-[0fr] opacity-0'
        "
        :aria-hidden="!(activeTarget === item.target && item.label.length > 20)"
      >
        <span
          class="min-h-0 overflow-hidden whitespace-normal break-words app-text-xs app-text-muted font-normal leading-4"
        >
          {{ item.label }}
        </span>
      </span>
    </a>

    <div
      v-if="hasChildren"
      :id="`${item.id}-navigation`"
      class="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
      :class="isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      :aria-hidden="!isExpanded"
      :inert="!isExpanded"
    >
      <div class="min-h-0 overflow-hidden">
        <ul class="m-0 mt-1 ml-3 list-none space-y-0.5 border-l app-surface-border pl-2">
          <ShowcaseNavigationItem
            v-for="child in item.children"
            :key="child.id"
            :item="child"
            :depth="depth + 1"
            :active-target="activeTarget"
            :expanded-items="expandedItems"
            @toggle="emit('toggle', $event)"
            @navigate="emit('navigate', $event)"
          />
        </ul>
      </div>
    </div>
  </li>
</template>
