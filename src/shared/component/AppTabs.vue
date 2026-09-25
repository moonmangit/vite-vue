<script setup lang="ts" generic="T extends string | number">
import PrimeTabs from 'primevue/tabs'
import PrimeTab from 'primevue/tab'
import PrimeTabList from 'primevue/tablist'
import PrimeTabPanel from 'primevue/tabpanel'
import PrimeTabPanels from 'primevue/tabpanels'
import { appComponentAttrs } from '../lib/appComponentAttrs'

export interface AppTabItem<T extends string | number = string | number> {
  value: T
  label: string
  icon?: string
  disabled?: boolean
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue: T
    items?: AppTabItem<T>[]
    scrollable?: boolean
  }>(),
  { items: () => [], scrollable: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
}>()

function updateValue(value: string | number) {
  emit('update:modelValue', value as T)
}
</script>

<template>
  <PrimeTabs
    v-bind="appComponentAttrs($attrs)"
    :value="props.modelValue"
    @update:value="updateValue"
  >
    <PrimeTabList :class="props.scrollable ? 'overflow-x-auto' : undefined">
      <PrimeTab
        v-for="item in props.items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
      >
        <slot name="tab" :item="item">
          <span class="inline-flex items-center gap-2 whitespace-nowrap">
            <i v-if="item.icon" :class="item.icon" aria-hidden="true" />
            {{ item.label }}
          </span>
        </slot>
      </PrimeTab>
    </PrimeTabList>
    <PrimeTabPanels>
      <PrimeTabPanel v-for="item in props.items" :key="item.value" :value="item.value">
        <slot :name="String(item.value)" :item="item" />
      </PrimeTabPanel>
    </PrimeTabPanels>
  </PrimeTabs>
</template>
