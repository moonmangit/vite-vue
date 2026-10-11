<script setup lang="ts">
import PrimeProgressBar from 'primevue/progressbar'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    value: number
    showValue?: boolean
    mode?: 'determinate' | 'indeterminate'
  }>(),
  { showValue: true, mode: 'determinate' },
)
</script>

<template>
  <PrimeProgressBar
    v-bind="appComponentAttrs($attrs)"
    :value="props.value"
    :show-value="props.showValue"
    :mode="props.mode"
  >
    <slot />
  </PrimeProgressBar>
</template>
