<script setup lang="ts" generic="T extends string | number">
import PrimeMultiSelect from 'primevue/multiselect'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: T[]
    inputId?: string
    options?: unknown[]
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    display?: 'comma' | 'chip'
    maxSelectedLabels?: number
    size?: 'small' | 'medium' | 'large'
    invalid?: boolean
    disabled?: boolean
    fluid?: boolean
    filter?: boolean
  }>(),
  {
    modelValue: () => [],
    options: () => [],
    display: 'comma',
    size: 'medium',
    invalid: false,
    disabled: false,
    fluid: false,
    filter: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T[]): void
}>()
</script>

<template>
  <PrimeMultiSelect
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :input-id="props.inputId"
    :options="props.options"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :placeholder="props.placeholder"
    :display="props.display"
    :max-selected-labels="props.maxSelectedLabels"
    :size="props.size === 'medium' ? undefined : props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :fluid="props.fluid"
    :filter="props.filter"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
