<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { mockActivities, mockMetrics, mockNodes } from '../../lib/dashboardData'
import AnalyticsChartSection from './AnalyticsChartSection.vue'
import DashboardHeaderSection from './DashboardHeaderSection.vue'
import MetricsGridSection from './MetricsGridSection.vue'
import QuickActionsSection from './QuickActionsSection.vue'
import RecentActivitySection from './RecentActivitySection.vue'
import SystemStatusSection from './SystemStatusSection.vue'

const toast = useToast()

const throughputSeries = [420, 680, 950, 1240, 1100, 1380, 1420, 1290, 1350, 1480]

const quickActions = [
  { label: 'Purge Edge Cache', description: 'Invalidate CDN', icon: 'pi pi-trash' },
  { label: 'Scale Pods', description: 'Auto-scale k8s', icon: 'pi pi-sliders-h' },
  { label: 'DB Dump', description: 'Trigger snapshot', icon: 'pi pi-database' },
  { label: 'Rotate Keys', description: 'Vault secrets', icon: 'pi pi-key' },
]

function handleRefresh() {
  toast.add({
    severity: 'success',
    summary: 'Data Synchronized',
    detail: 'Dashboard metrics and node telemetry updated.',
    life: 2500,
  })
}

function handleExecuteAction(actionLabel: string) {
  toast.add({
    severity: 'info',
    summary: 'Operation Triggered',
    detail: `Executed action: ${actionLabel}`,
    life: 2500,
  })
}
</script>

<template>
  <section class="space-y-4">
    <!-- Co-located View Section: Top Header & Timeframe Bar -->
    <DashboardHeaderSection @refresh="handleRefresh" />

    <!-- Co-located View Section: KPI Metric Cards Grid -->
    <MetricsGridSection :metrics="mockMetrics" />

    <!-- Main Grid Content -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <!-- Left Column (8 cols): Analytics Chart & Audit Activity Table Sections -->
      <div class="space-y-4 lg:col-span-8">
        <AnalyticsChartSection :throughput-series="throughputSeries" />
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
