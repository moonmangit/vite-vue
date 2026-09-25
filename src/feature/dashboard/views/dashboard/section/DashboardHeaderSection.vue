<script setup lang="ts">
import Button from 'primevue/button'
import Select from 'primevue/select'
import Tag from 'primevue/tag'
import { ref } from 'vue'

const timeframe = ref('24h')
const timeframeOptions = [
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
]

const emit = defineEmits<{
  (e: 'refresh'): void
}>()
</script>

<template>
  <div
    class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 app-dark:border-zinc-800"
  >
    <div>
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-black tracking-tight text-slate-900 app-dark:text-white">
          {{ $t('app.title') }}
        </h1>
        <Tag value="LIVE" severity="success" class="text-[10px] px-1.5 py-0.5 animate-pulse" />
      </div>
      <p class="text-xs text-slate-500 app-dark:text-zinc-400">
        {{ $t('app.subtitle') }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <Select
        v-model="timeframe"
        :options="timeframeOptions"
        option-label="label"
        option-value="value"
        size="small"
        class="w-36"
        aria-label="Timeframe"
      />

      <Button
        icon="pi pi-refresh"
        :label="$t('actions.sync')"
        severity="secondary"
        size="small"
        class="text-xs"
        @click="emit('refresh')"
      />

      <Button
        icon="pi pi-download"
        :label="$t('actions.report')"
        severity="primary"
        size="small"
        class="text-xs font-semibold"
      />
    </div>
  </div>
</template>
