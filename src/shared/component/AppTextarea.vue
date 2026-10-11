<script setup lang="ts" generic="T extends string | null">
import PrimeTextarea from 'primevue/textarea'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: T
    rows?: number
    autoResize?: boolean
    invalid?: boolean
    disabled?: boolean
    readonly?: boolean
    fluid?: boolean
  }>(),
  { rows: 2, autoResize: false, invalid: false, disabled: false, readonly: false, fluid: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
}>()
</script>

<template>
  <PrimeTextarea
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :rows="props.rows"
    :auto-resize="props.autoResize"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :fluid="props.fluid"
    @update:model-value="emit('update:modelValue', ($event ?? null) as T)"
  />
</template>
