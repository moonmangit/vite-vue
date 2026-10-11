<script setup lang="ts">
import PrimeToggleSwitch from 'primevue/toggleswitch'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    inputId?: string
    disabled?: boolean
    readonly?: boolean
    invalid?: boolean
  }>(),
  { modelValue: false, disabled: false, readonly: false, invalid: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <PrimeToggleSwitch
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :input-id="props.inputId"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :invalid="props.invalid"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
