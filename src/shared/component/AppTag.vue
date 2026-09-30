<script setup lang="ts">
import PrimeTag from 'primevue/tag'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

type AppTagTone = 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast'

const props = withDefaults(
  defineProps<{
    value?: string | number
    tone?: AppTagTone
    icon?: string
    rounded?: boolean
  }>(),
  { tone: 'secondary', rounded: false },
)

const severityMap: Record<AppTagTone, string> = {
  secondary: 'secondary',
  success: 'success',
  info: 'info',
  warning: 'warn',
  danger: 'danger',
  help: 'help',
  contrast: 'contrast',
}
</script>

<template>
  <PrimeTag
    v-bind="appComponentAttrs($attrs)"
    :value="props.value"
    :severity="severityMap[props.tone]"
    :icon="props.icon"
    :rounded="props.rounded"
  >
    <slot />
  </PrimeTag>
</template>
