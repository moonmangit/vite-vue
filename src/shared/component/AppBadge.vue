<script setup lang="ts">
import PrimeBadge from 'primevue/badge'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

type AppBadgeTone = 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'contrast'

const props = withDefaults(
  defineProps<{
    value?: string | number
    tone?: AppBadgeTone
    size?: 'normal' | 'large' | 'xlarge'
  }>(),
  { tone: 'info', size: 'normal' },
)

const severityMap: Record<AppBadgeTone, string> = {
  secondary: 'secondary',
  success: 'success',
  info: 'info',
  warning: 'warn',
  danger: 'danger',
  contrast: 'contrast',
}
</script>

<template>
  <PrimeBadge
    v-bind="appComponentAttrs($attrs)"
    :value="props.value"
    :severity="severityMap[props.tone]"
    :size="props.size === 'normal' ? undefined : props.size"
  />
</template>
