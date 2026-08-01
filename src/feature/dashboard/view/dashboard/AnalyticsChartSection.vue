<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'

defineProps<{
  throughputSeries: number[]
}>()
</script>

<template>
  <Card class="h-full">
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-chart-line text-primary-600 text-sm" />
          <span
            class="text-xs font-bold uppercase tracking-wider text-slate-700 app-dark:text-zinc-300"
          >
            Realtime System Throughput (req/sec)
          </span>
        </div>

        <div class="flex items-center gap-1">
          <Button icon="pi pi-ellipsis-v" severity="secondary" size="small" text class="p-1" />
        </div>
      </div>
    </template>

    <template #content>
      <div class="mt-2 space-y-4">
        <!-- SVG Sparkline Bar Visualization -->
        <div
          class="flex items-end justify-between gap-1 h-36 pt-4 border-b border-slate-100 app-dark:border-zinc-800"
        >
          <div
            v-for="(val, idx) in throughputSeries"
            :key="idx"
            class="group relative flex-1 flex flex-col items-center"
          >
            <!-- Tooltip -->
            <div
              class="absolute -top-7 hidden rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-white group-hover:block app-dark:bg-zinc-100 app-dark:text-zinc-900"
            >
              {{ val }} k/s
            </div>

            <!-- Bar -->
            <div
              class="w-full rounded-t transition-all duration-300 group-hover:bg-primary-500"
              :class="
                idx === throughputSeries.length - 1
                  ? 'bg-primary-600'
                  : 'bg-primary-200 app-dark:bg-primary-900/50'
              "
              :style="{ height: `${(val / 1500) * 100}%` }"
            />
          </div>
        </div>

        <div
          class="flex items-center justify-between text-[11px] text-slate-400 app-dark:text-zinc-500"
        >
          <span>00:00 UTC</span>
          <span>06:00 UTC</span>
          <span>12:00 UTC</span>
          <span>18:00 UTC</span>
          <span>Now (24:00)</span>
        </div>
      </div>
    </template>
  </Card>
</template>
