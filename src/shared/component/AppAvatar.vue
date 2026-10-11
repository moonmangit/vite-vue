<script setup lang="ts">
import PrimeAvatar from 'primevue/avatar'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    image?: string
    label?: string
    icon?: string
    shape?: 'circle' | 'square'
    size?: 'normal' | 'small' | 'large' | 'xlarge'
  }>(),
  { shape: 'square', size: 'normal' },
)
</script>

<template>
  <PrimeAvatar
    v-bind="appComponentAttrs($attrs)"
    :image="props.image"
    :label="props.label"
    :icon="props.icon"
    :shape="props.shape"
    :size="props.size === 'normal' ? undefined : props.size"
  >
    <slot />
  </PrimeAvatar>
</template>
