<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppCard from '../../../../../shared/component/AppCard.vue'
import AppChart from '../../../../../shared/component/AppChart.vue'
import type { AppChartOptions } from '../../../../../shared/component/AppChart.types'

const { t } = useI18n({ useScope: 'global' })
const categories = computed(() => [
  t('features.dev.chart.monday'),
  t('features.dev.chart.tuesday'),
  t('features.dev.chart.wednesday'),
  t('features.dev.chart.thursday'),
  t('features.dev.chart.friday'),
  t('features.dev.chart.saturday'),
  t('features.dev.chart.sunday'),
])

const areaOptions = computed<AppChartOptions>(() => ({
  chart: { type: 'area', toolbar: { show: false }, animations: { enabled: false } },
  colors: ['#6366f1'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { categories: categories.value },
  legend: { show: false },
}))
const areaSeries = computed(() => [
  { name: t('features.dev.chart.throughput'), data: [32, 45, 38, 58, 52, 71, 64] },
])

const lineOptions = computed<AppChartOptions>(() => ({
  chart: { type: 'line', toolbar: { show: false }, animations: { enabled: false } },
  colors: ['#14b8a6'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: { categories: categories.value },
  legend: { show: false },
}))
const lineSeries = computed(() => [
  { name: t('features.dev.chart.latency'), data: [28, 24, 31, 20, 25, 18, 22] },
])

const barOptions = computed<AppChartOptions>(() => ({
  chart: { type: 'bar', toolbar: { show: false }, animations: { enabled: false } },
  colors: ['#f59e0b'],
  plotOptions: { bar: { borderRadius: 4, columnWidth: '48%' } },
  dataLabels: { enabled: false },
  xaxis: { categories: categories.value },
  legend: { show: false },
}))
const barSeries = computed(() => [
  { name: t('features.dev.chart.throughput'), data: [18, 25, 22, 33, 29, 40, 36] },
])

const donutOptions = computed<AppChartOptions>(() => ({
  chart: { type: 'donut', animations: { enabled: false } },
  labels: [
    t('features.dev.chart.healthy'),
    t('features.dev.chart.warning'),
    t('features.dev.chart.unavailable'),
  ],
  colors: ['#10b981', '#f59e0b', '#ef4444'],
  legend: { position: 'bottom' },
  dataLabels: { enabled: false },
  plotOptions: { pie: { donut: { size: '62%' } } },
}))
const donutSeries = [72, 20, 8]
</script>

<template>
  <div class="space-y-5">
    <header>
      <h2 class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.chart.title') }}
      </h2>
      <p class="mt-1 app-text-sm app-text-muted">
        {{ t('features.dev.chart.description') }}
      </p>
    </header>

    <div class="grid gap-4 xl:grid-cols-2">
      <AppCard>
        <template #title>{{ t('features.dev.chart.area') }}</template>
        <template #content>
          <AppChart type="area" height="230" :options="areaOptions" :series="areaSeries" />
        </template>
      </AppCard>
      <AppCard>
        <template #title>{{ t('features.dev.chart.line') }}</template>
        <template #content>
          <AppChart type="line" height="230" :options="lineOptions" :series="lineSeries" />
        </template>
      </AppCard>
      <AppCard>
        <template #title>{{ t('features.dev.chart.bar') }}</template>
        <template #content>
          <AppChart type="bar" height="230" :options="barOptions" :series="barSeries" />
        </template>
      </AppCard>
      <AppCard>
        <template #title>{{ t('features.dev.chart.donut') }}</template>
        <template #content>
          <AppChart type="donut" height="230" :options="donutOptions" :series="donutSeries" />
        </template>
      </AppCard>
    </div>
  </div>
</template>
