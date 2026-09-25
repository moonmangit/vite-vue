<script setup lang="ts" generic="T extends string | null">
import PrimeSelect from 'primevue/select'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: T
    inputId?: string
    options?: unknown[]
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    size?: 'small' | 'medium' | 'large'
    invalid?: boolean
    disabled?: boolean
    fluid?: boolean
    filter?: boolean
    showClear?: boolean
  }>(),
  {
    options: () => [],
    size: 'medium',
    invalid: false,
    disabled: false,
    fluid: false,
    filter: false,
    showClear: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
}>()
</script>

<template>
  <PrimeSelect
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :input-id="props.inputId"
    :options="props.options"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :placeholder="props.placeholder"
    :size="props.size === 'medium' ? undefined : props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :fluid="props.fluid"
    :filter="props.filter"
    :show-clear="props.showClear"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
