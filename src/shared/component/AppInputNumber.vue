<script setup lang="ts">
import PrimeInputNumber from 'primevue/inputnumber'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

type AppControlSize = 'small' | 'medium' | 'large'

const props = withDefaults(
  defineProps<{
    modelValue?: number | null
    inputId?: string
    mode?: 'decimal' | 'currency'
    currency?: string
    locale?: string
    min?: number
    max?: number
    step?: number
    minFractionDigits?: number
    maxFractionDigits?: number
    showButtons?: boolean
    size?: AppControlSize
    invalid?: boolean
    disabled?: boolean
    readonly?: boolean
    fluid?: boolean
  }>(),
  {
    mode: 'decimal',
    showButtons: false,
    size: 'medium',
    invalid: false,
    disabled: false,
    readonly: false,
    fluid: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: number | null): void
}>()
</script>

<template>
  <PrimeInputNumber
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :input-id="props.inputId"
    :mode="props.mode"
    :currency="props.currency"
    :locale="props.locale"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :min-fraction-digits="props.minFractionDigits"
    :max-fraction-digits="props.maxFractionDigits"
    :show-buttons="props.showButtons"
    :size="props.size === 'medium' ? undefined : props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :fluid="props.fluid"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
