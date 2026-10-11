<script setup lang="ts">
import PrimeDialog from 'primevue/dialog'
import { appComponentAttrs } from '../lib/appComponentAttrs'
import type { StyleValue } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    header?: string
    modal?: boolean
    style?: StyleValue
    width?: string
    breakpoints?: Record<string, string>
    closable?: boolean
    closeOnEscape?: boolean
    dismissableMask?: boolean
    maximizable?: boolean
    draggable?: boolean
  }>(),
  {
    modal: true,
    closable: true,
    closeOnEscape: true,
    dismissableMask: false,
    maximizable: false,
    draggable: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <PrimeDialog
    v-bind="appComponentAttrs($attrs)"
    :visible="props.modelValue"
    :header="props.header"
    :modal="props.modal"
    :style="[props.style, props.width ? { width: props.width } : undefined]"
    :breakpoints="props.breakpoints"
    :closable="props.closable"
    :close-on-escape="props.closeOnEscape"
    :dismissable-mask="props.dismissableMask"
    :maximizable="props.maximizable"
    :draggable="props.draggable"
    @update:visible="emit('update:modelValue', $event)"
  >
    <template v-if="$slots.header" #header><slot name="header" /></template>
    <slot />
    <template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </PrimeDialog>
</template>
