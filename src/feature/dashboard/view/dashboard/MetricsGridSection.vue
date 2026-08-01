<script setup lang="ts">
import StatCard from '../../../../shared/component/StatCard.vue'
import type { MetricItem } from '../../lib/dashboardData'

defineProps<{
  metrics: MetricItem[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard
      v-for="metric in metrics"
      :key="metric.title"
      :title="metric.title"
      :value="metric.value"
      :trend="metric.trend"
      :trend-type="metric.trendType"
      :subtitle="metric.subtitle"
      :icon="metric.icon"
    />
  </div>
</template>
