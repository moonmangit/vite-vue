<script setup lang="ts">
import PrimeButton from 'primevue/button'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

type AppButtonTone =
  'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast'
type AppButtonAppearance = 'solid' | 'outlined' | 'text' | 'link'
type AppControlSize = 'small' | 'medium' | 'large'

const props = withDefaults(
  defineProps<{
    label?: string
    tone?: AppButtonTone
    appearance?: AppButtonAppearance
    size?: AppControlSize
    icon?: string
    iconPosition?: 'left' | 'right' | 'top' | 'bottom'
    loading?: boolean
    disabled?: boolean
    rounded?: boolean
    raised?: boolean
    fluid?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    tone: 'primary',
    appearance: 'solid',
    size: 'medium',
    iconPosition: 'left',
    loading: false,
    disabled: false,
    rounded: false,
    raised: false,
    fluid: false,
    type: 'button',
  },
)

const severityMap: Record<AppButtonTone, string> = {
  primary: 'primary',
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
  <PrimeButton
    v-bind="appComponentAttrs($attrs)"
    :label="props.label"
    :severity="severityMap[props.tone]"
    :outlined="props.appearance === 'outlined'"
    :text="props.appearance === 'text'"
    :link="props.appearance === 'link'"
    :size="props.size === 'medium' ? undefined : props.size"
    :icon="props.icon"
    :icon-pos="props.iconPosition"
    :loading="props.loading"
    :disabled="props.disabled"
    :rounded="props.rounded"
    :raised="props.raised"
    :fluid="props.fluid"
    :type="props.type"
  >
    <slot />
  </PrimeButton>
</template>
