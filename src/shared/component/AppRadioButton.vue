<script setup lang="ts" generic="T extends string | number | boolean">
import PrimeRadioButton from 'primevue/radiobutton'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: T
    value: T
    inputId?: string
    name?: string
    size?: 'small' | 'large'
    invalid?: boolean
    disabled?: boolean
  }>(),
  { invalid: false, disabled: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
}>()
</script>

<template>
  <PrimeRadioButton
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :value="props.value"
    :input-id="props.inputId"
    :name="props.name"
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
