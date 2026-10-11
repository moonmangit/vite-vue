<script setup lang="ts">
import PrimeCard from 'primevue/card'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    variant?: 'blank' | 'full'
  }>(),
  { variant: 'blank' },
)
</script>

<template>
  <PrimeCard
    class="app-card"
    :class="`app-card--${props.variant}`"
    v-bind="appComponentAttrs($attrs)"
  >
    <template v-if="$slots.header" #header><slot name="header" /></template>
    <template v-if="$slots.title || $slots['header-icon']" #title>
      <div class="app-card__title-row">
        <slot name="title" />
        <slot name="header-icon" />
      </div>
    </template>
    <template v-if="$slots.subtitle" #subtitle><slot name="subtitle" /></template>
    <template v-if="$slots.content || $slots.default" #content>
      <slot name="content"><slot /></slot>
    </template>
    <template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </PrimeCard>
</template>
