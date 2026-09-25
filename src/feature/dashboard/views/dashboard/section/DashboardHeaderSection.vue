<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppSelect from '../../../../../shared/component/AppSelect.vue'
import AppTag from '../../../../../shared/component/AppTag.vue'

const timeframe = ref('24h')
const { t } = useI18n({ useScope: 'global' })
const timeframeOptions = computed(() => [
  { label: t('features.dashboard.timeframe.last24Hours'), value: '24h' },
  { label: t('features.dashboard.timeframe.last7Days'), value: '7d' },
  { label: t('features.dashboard.timeframe.last30Days'), value: '30d' },
])

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
        <h1 class="app-text-xl app-text-normal font-black tracking-tight">
          {{ $t('features.dashboard.page.title') }}
        </h1>
        <AppTag
          value="LIVE"
          tone="success"
          class="app-text-custom px-1.5 py-0.5 animate-pulse"
          style="--app-font-size: 10px"
        />
      </div>
      <p class="app-text-xs app-text-muted">
        {{ $t('features.dashboard.page.subtitle') }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <AppSelect
        v-model="timeframe"
        :options="timeframeOptions"
        option-label="label"
        option-value="value"
        size="small"
        class="w-36"
        :aria-label="$t('features.dashboard.timeframe.ariaLabel')"
      />

      <AppButton
        icon="pi pi-refresh"
        :label="$t('features.dashboard.actions.sync')"
        tone="secondary"
        size="small"
        class="app-text-xs"
        @click="emit('refresh')"
      />

      <AppButton
        icon="pi pi-download"
        :label="$t('features.dashboard.actions.report')"
        tone="primary"
        size="small"
        class="app-text-xs font-semibold"
      />
    </div>
  </div>
</template>
