<script setup lang="ts" generic="T extends boolean | Array<string | number>">
import PrimeCheckbox from 'primevue/checkbox'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: T
    value?: string | number
    binary?: boolean
    inputId?: string
    name?: string
    size?: 'small' | 'large'
    invalid?: boolean
    disabled?: boolean
    readonly?: boolean
    indeterminate?: boolean
  }>(),
  { binary: false, invalid: false, disabled: false, readonly: false, indeterminate: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
}>()
</script>

<template>
  <PrimeCheckbox
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :value="props.value"
    :binary="props.binary"
    :input-id="props.inputId"
    :name="props.name"
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :indeterminate="props.indeterminate"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
