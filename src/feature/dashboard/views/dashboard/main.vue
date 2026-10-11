<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppToast } from '../../../../shared/toast/main'
import { mockActivities, mockChartSeries, mockMetrics, mockNodes } from '../../lib/dashboardData'
import type { DashboardQuickAction } from '../../lib/dashboardData'
import AnalyticsChartSection from './section/AnalyticsChartSection.vue'
import DashboardHeaderSection from './section/DashboardHeaderSection.vue'
import MetricsGridSection from './section/MetricsGridSection.vue'
import QuickActionsSection, { type QuickAction } from './section/QuickActionsSection.vue'
import RecentActivitySection from './section/RecentActivitySection.vue'
import SystemStatusSection from './section/SystemStatusSection.vue'

const toast = useAppToast()
const { t } = useI18n({ useScope: 'global' })

const throughputSeries = [420, 680, 950, 1240, 1100, 1380, 1420, 1290, 1350, 1480]

const localizedMetrics = computed(() =>
  mockMetrics.map((metric) => ({
    ...metric,
    title: t(metric.titleKey),
    subtitle: t(metric.subtitleKey),
  })),
)

const quickActions = [
  { key: 'purgeEdgeCache', icon: 'pi pi-trash' },
  { key: 'scalePods', icon: 'pi pi-sliders-h' },
  { key: 'databaseDump', icon: 'pi pi-database' },
  { key: 'rotateKeys', icon: 'pi pi-key' },
] satisfies QuickAction[]

function handleRefresh() {
  toast.success(undefined, t('features.dashboard.toast.syncedDetail'), { life: 2500 })
}

function handleExecuteAction(action: DashboardQuickAction) {
  const actionLabel = t(`features.dashboard.quickActions.${action}.label`)
  toast.info(undefined, t('features.dashboard.toast.actionExecuted', { action: actionLabel }), {
    life: 2500,
  })
}
</script>

<template>
  <section class="space-y-4">
    <!-- Co-located View Section: Top Header & Timeframe Bar -->
    <DashboardHeaderSection @refresh="handleRefresh" />

    <!-- Co-located View Section: KPI Metric Cards Grid -->
    <MetricsGridSection :metrics="localizedMetrics" />

    <!-- Main Grid Content -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <!-- Left Column (8 cols): Analytics Chart & Audit Activity Table Sections -->
      <div class="space-y-4 lg:col-span-8">
        <AnalyticsChartSection
          :throughput-series="throughputSeries"
          :series-data="mockChartSeries"
        />
        <RecentActivitySection :audit-logs="mockActivities" />
      </div>

      <!-- Right Column (4 cols): Telemetry & Quick Operations Sections -->
      <div class="space-y-4 lg:col-span-4">
        <SystemStatusSection :node-cluster="mockNodes" />
        <QuickActionsSection :actions="quickActions" @execute="handleExecuteAction" />
      </div>
    </div>
  </section>
</template>
