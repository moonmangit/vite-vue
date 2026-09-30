<script setup lang="ts" generic="T extends string | null">
import PrimePassword from 'primevue/password'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: T
    toggleMask?: boolean
    feedback?: boolean
    inputClass?: string
    inputStyle?: Record<string, string | number>
    invalid?: boolean
    disabled?: boolean
    fluid?: boolean
  }>(),
  { toggleMask: false, feedback: true, invalid: false, disabled: false, fluid: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
}>()
</script>

<template>
  <PrimePassword
    v-bind="appComponentAttrs($attrs)"
    :model-value="props.modelValue"
    :toggle-mask="props.toggleMask"
    :feedback="props.feedback"
    :input-class="props.inputClass"
    :input-style="props.inputStyle"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :fluid="props.fluid"
    @update:model-value="emit('update:modelValue', ($event ?? null) as T)"
  />
</template>
