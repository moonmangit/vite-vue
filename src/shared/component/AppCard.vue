<script setup lang="ts">
import PrimeCard from 'primevue/card'
import { appComponentAttrs } from '../lib/appComponentAttrs'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <PrimeCard v-bind="appComponentAttrs($attrs)">
    <template v-if="$slots.header" #header><slot name="header" /></template>
    <template v-if="$slots.title" #title><slot name="title" /></template>
    <template v-if="$slots.subtitle" #subtitle><slot name="subtitle" /></template>
    <template v-if="$slots.content || $slots.default" #content>
      <slot name="content"><slot /></slot>
    </template>
    <template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </PrimeCard>
</template>
