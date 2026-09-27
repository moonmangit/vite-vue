<script setup lang="ts">
import type { DashboardQuickAction } from '../../../lib/dashboardData'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'

export interface QuickAction {
  key: DashboardQuickAction
  icon: string
}

defineProps<{
  actions: QuickAction[]
}>()

const emit = defineEmits<{
  (e: 'execute', action: DashboardQuickAction): void
}>()
</script>

<template>
  <AppCard variant="full">
    <template #content>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <i class="pi pi-bolt app-text-sm text-primary-600" />
          <span class="app-text-xs app-text-normal font-bold uppercase tracking-wider">
            {{ $t('features.dashboard.quickActions.title') }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <AppButton
            v-for="act in actions"
            :key="act.key"
            tone="secondary"
            size="small"
            class="flex flex-col items-center justify-center p-3 text-center transition hover:scale-[1.02]"
            @click="emit('execute', act.key)"
          >
            <i :class="[act.icon, 'app-text-lg mb-1 text-primary-600']" />
            <span class="app-text-xs app-text-normal font-bold">
              {{ $t(`features.dashboard.quickActions.${act.key}.label`) }}
            </span>
            <span class="app-text-custom app-text-muted font-normal" style="--app-font-size: 10px">
              {{ $t(`features.dashboard.quickActions.${act.key}.description`) }}
            </span>
          </AppButton>
        </div>
      </div>
    </template>
  </AppCard>
</template>
