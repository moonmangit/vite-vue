<script setup lang="ts" generic="T extends string | null">
import PrimeInputText from 'primevue/inputtext'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

type AppControlSize = 'small' | 'medium' | 'large'

const props = withDefaults(
  defineProps<{
    modelValue?: T
    size?: AppControlSize
    invalid?: boolean
    disabled?: boolean
    readonly?: boolean
    fluid?: boolean
  }>(),
  { size: 'medium', invalid: false, disabled: false, readonly: false, fluid: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
}>()
</script>

<template>
  <PrimeInputText
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :size="props.size === 'medium' ? undefined : props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :fluid="props.fluid"
    @update:model-value="emit('update:modelValue', ($event ?? null) as T)"
  />
</template>
