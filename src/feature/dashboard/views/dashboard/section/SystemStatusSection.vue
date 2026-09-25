<script setup lang="ts">
import Card from 'primevue/card'
import ProgressBar from 'primevue/progressbar'

defineProps<{
  nodeCluster: Array<{ name: string; region: string; cpu: number; memory: number; status: string }>
}>()
</script>

<template>
  <Card class="h-full">
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-server text-primary-600 text-sm" />
          <span
            class="text-xs font-bold uppercase tracking-wider text-slate-700 app-dark:text-zinc-300"
          >
            Cluster Telemetry
          </span>
        </div>
      </div>
    </template>

    <template #content>
      <div class="mt-2 space-y-4">
        <div
          v-for="node in nodeCluster"
          :key="node.name"
          class="rounded-lg border border-slate-100 p-2.5 app-dark:border-zinc-800/80 bg-slate-50/50 app-dark:bg-zinc-900/30"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold text-slate-900 app-dark:text-white">
              {{ node.name }}
            </span>
            <span
              class="text-[10px] uppercase tracking-wider font-mono text-slate-400 app-dark:text-zinc-500"
            >
              {{ node.region }}
            </span>
          </div>

          <div class="space-y-1.5">
            <div>
              <div
                class="flex justify-between text-[10px] text-slate-500 app-dark:text-zinc-400 mb-0.5"
              >
                <span>CPU Load</span>
                <span>{{ node.cpu }}%</span>
              </div>
              <ProgressBar :value="node.cpu" :show-value="false" class="h-1.5" />
            </div>

            <div>
              <div
                class="flex justify-between text-[10px] text-slate-500 app-dark:text-zinc-400 mb-0.5"
              >
                <span>RAM Usage</span>
                <span>{{ node.memory }}%</span>
              </div>
              <ProgressBar :value="node.memory" :show-value="false" class="h-1.5" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
