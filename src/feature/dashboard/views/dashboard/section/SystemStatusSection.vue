<script setup lang="ts">
import AppCard from '../../../../../shared/component/AppCard.vue'
import AppProgressBar from '../../../../../shared/component/AppProgressBar.vue'

defineProps<{
  nodeCluster: Array<{ name: string; region: string; cpu: number; memory: number; status: string }>
}>()
</script>

<template>
  <AppCard class="h-full">
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-server app-text-sm text-primary-600" />
          <span class="app-text-xs app-text-normal font-bold uppercase tracking-wider">
            {{ $t('features.dashboard.systemStatus.title') }}
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
            <span class="app-text-xs app-text-normal font-bold">
              {{ node.name }}
            </span>
            <span
              class="app-text-custom app-text-muted uppercase tracking-wider font-mono"
              style="--app-font-size: 10px"
            >
              {{ node.region }}
            </span>
          </div>

          <div class="space-y-1.5">
            <div>
              <div
                class="flex justify-between app-text-custom app-text-muted mb-0.5"
                style="--app-font-size: 10px"
              >
                <span>{{ $t('features.dashboard.systemStatus.cpuLoad') }}</span>
                <span>{{ node.cpu }}%</span>
              </div>
              <AppProgressBar :value="node.cpu" :show-value="false" class="h-1.5" />
            </div>

            <div>
              <div
                class="flex justify-between app-text-custom app-text-muted mb-0.5"
                style="--app-font-size: 10px"
              >
                <span>{{ $t('features.dashboard.systemStatus.ramUsage') }}</span>
                <span>{{ node.memory }}%</span>
              </div>
              <AppProgressBar :value="node.memory" :show-value="false" class="h-1.5" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppCard>
</template>
