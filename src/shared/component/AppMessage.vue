<script setup lang="ts">
import PrimeMessage from 'primevue/message'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    severity?: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
    size?: 'small' | 'large'
    variant?: 'simple' | 'outlined'
    closable?: boolean
  }>(),
  { severity: 'info', closable: false },
)
</script>

<template>
  <PrimeMessage
    v-bind="appComponentAttrs($attrs)"
    :severity="props.severity"
    :size="props.size"
    :variant="props.variant"
    :closable="props.closable"
  >
    <slot />
  </PrimeMessage>
</template>
