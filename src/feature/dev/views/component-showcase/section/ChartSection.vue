<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppChart from '../../../../../shared/component/AppChart.vue'
import type { AppChartOptions } from '../../../../../shared/component/AppChart.types'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

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
const chartVariants = computed(() => [
  { value: 'area', label: t('features.dev.chart.area') },
  { value: 'line', label: t('features.dev.chart.line') },
  { value: 'bar', label: t('features.dev.chart.bar') },
  { value: 'donut', label: t('features.dev.chart.donut') },
])

const areaOptions = computed<AppChartOptions>(() => ({
  chart: { type: 'area', toolbar: { show: false }, animations: { enabled: false } },
  colors: ['#6366f1'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { categories: categories.value },
  legend: { show: false },
}))
const lineOptions = computed<AppChartOptions>(() => ({
  chart: { type: 'line', toolbar: { show: false }, animations: { enabled: false } },
  colors: ['#14b8a6'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: { categories: categories.value },
  legend: { show: false },
}))
const barOptions = computed<AppChartOptions>(() => ({
  chart: { type: 'bar', toolbar: { show: false }, animations: { enabled: false } },
  colors: ['#f59e0b'],
  plotOptions: { bar: { borderRadius: 4, columnWidth: '48%' } },
  dataLabels: { enabled: false },
  xaxis: { categories: categories.value },
  legend: { show: false },
}))
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
const areaSeries = computed(() => [
  { name: t('features.dev.chart.throughput'), data: [32, 45, 38, 58, 52, 71, 64] },
])
const lineSeries = computed(() => [
  { name: t('features.dev.chart.latency'), data: [28, 24, 31, 20, 25, 18, 22] },
])
const barSeries = computed(() => [
  { name: t('features.dev.chart.throughput'), data: [18, 25, 22, 33, 29, 40, 36] },
])
const donutSeries = [72, 20, 8]
</script>

<template>
  <section id="chart" class="space-y-8" aria-labelledby="chart-title">
    <header class="space-y-1">
      <h2 id="chart-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.chart.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.chart.description') }}</p>
    </header>

    <ShowcaseArticle
      id="chart-types"
      :title="t('features.dev.chart.types')"
      :variants="chartVariants"
    >
      <template #area
        ><AppChart type="area" height="280" :options="areaOptions" :series="areaSeries"
      /></template>
      <template #line
        ><AppChart type="line" height="280" :options="lineOptions" :series="lineSeries"
      /></template>
      <template #bar
        ><AppChart type="bar" height="280" :options="barOptions" :series="barSeries"
      /></template>
      <template #donut
        ><AppChart type="donut" height="280" :options="donutOptions" :series="donutSeries"
      /></template>
    </ShowcaseArticle>
  </section>
</template>
