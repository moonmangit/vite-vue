<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ApexOptions } from 'apexcharts'
import Button from 'primevue/button'
import Card from 'primevue/card'
import VueApexCharts from 'vue3-apexcharts'
import { mockChartSeries, type ChartSeriesData } from '../../lib/dashboardData'

const props = withDefaults(
  defineProps<{
    throughputSeries?: number[]
    seriesData?: ChartSeriesData[]
  }>(),
  {
    throughputSeries: () => [420, 680, 950, 1240, 1100, 1380, 1420, 1290, 1350, 1480],
    seriesData: () => mockChartSeries,
  },
)

type MetricType = 'throughput' | 'latency' | 'errors'
type TimeframeType = '24h' | '7d' | '30d'

const activeMetric = ref<MetricType>('throughput')
const activeTimeframe = ref<TimeframeType>('24h')

const metricConfigs = {
  throughput: {
    label: 'Realtime System Throughput',
    unit: 'req/sec',
    icon: 'pi pi-chart-line',
    colors: ['#4f46e5', '#818cf8'],
    colorName: 'indigo',
  },
  latency: {
    label: 'Average Latency',
    unit: 'ms',
    icon: 'pi pi-clock',
    colors: ['#f59e0b', '#fbbf24'],
    colorName: 'amber',
  },
  errors: {
    label: 'Error Rate',
    unit: '%',
    icon: 'pi pi-exclamation-triangle',
    colors: ['#ef4444', '#f87171'],
    colorName: 'rose',
  },
}

const chartCategories = computed(() => props.seriesData.map((item) => item.time))

const activeSeriesValues = computed(() => {
  if (activeMetric.value === 'throughput') {
    return props.seriesData.map((item) => item.throughput)
  }
  if (activeMetric.value === 'latency') {
    return props.seriesData.map((item) => item.latency)
  }
  return props.seriesData.map((item) => item.errors)
})

const series = computed(() => [
  {
    name: metricConfigs[activeMetric.value].label,
    data: activeSeriesValues.value,
  },
])

const chartOptions = computed<ApexOptions>(() => {
  const currentConfig = metricConfigs[activeMetric.value]
  return {
    chart: {
      type: 'area' as const,
      height: 280,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Google Sans, Inter, sans-serif',
      sparkline: { enabled: false },
      background: 'transparent',
    },
    colors: currentConfig.colors,
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2.5,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.15)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 10, right: 10, bottom: 0, left: 10 },
    },
    xaxis: {
      categories: chartCategories.value,
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '11px',
          fontWeight: 500,
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '11px',
          fontWeight: 500,
        },
        formatter: (val: number) => `${val.toLocaleString()} ${currentConfig.unit}`,
      },
    },
    tooltip: {
      theme: 'dark',
      x: { show: true },
      y: {
        formatter: (val: number) => `${val.toLocaleString()} ${currentConfig.unit}`,
      },
      marker: { show: true },
    },
    markers: {
      size: 4,
      colors: currentConfig.colors,
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: { size: 6 },
    },
  }
})
</script>

<template>
  <Card class="h-full border border-slate-200/80 shadow-xs app-dark:border-zinc-800">
    <template #title>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <!-- Header Left: Icon & Metric Title -->
        <div class="flex items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 app-dark:bg-indigo-950/60 app-dark:text-indigo-400"
          >
            <i :class="metricConfigs[activeMetric].icon" class="text-sm" />
          </div>
          <div>
            <h3 class="text-sm font-bold tracking-tight text-slate-800 app-dark:text-zinc-100">
              {{ metricConfigs[activeMetric].label }}
            </h3>
            <p class="text-[11px] font-normal text-slate-500 app-dark:text-zinc-400">
              Interactive telemetry analytics powered by ApexCharts
            </p>
          </div>
        </div>

        <!-- Header Right: Metric Selector & Actions -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Metric Tab Pills -->
          <div
            class="flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-medium app-dark:bg-zinc-800/80"
          >
            <button
              v-for="(config, key) in metricConfigs"
              :key="key"
              type="button"
              class="rounded-md px-2.5 py-1 transition-all duration-200"
              :class="
                activeMetric === key
                  ? 'bg-white text-slate-900 shadow-xs font-semibold app-dark:bg-zinc-700 app-dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 app-dark:text-zinc-400 app-dark:hover:text-zinc-200'
              "
              @click="activeMetric = key as MetricType"
            >
              {{ config.unit }}
            </button>
          </div>

          <!-- Timeframe Pills -->
          <div
            class="hidden sm:flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-medium app-dark:bg-zinc-800/80"
          >
            <button
              v-for="tf in ['24h', '7d', '30d'] as TimeframeType[]"
              :key="tf"
              type="button"
              class="rounded-md px-2 py-1 uppercase transition-all duration-200"
              :class="
                activeTimeframe === tf
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 app-dark:text-zinc-400 app-dark:hover:text-zinc-200'
              "
              @click="activeTimeframe = tf"
            >
              {{ tf }}
            </button>
          </div>

          <Button icon="pi pi-ellipsis-v" severity="secondary" size="small" text class="p-1" />
        </div>
      </div>
    </template>

    <template #content>
      <div class="mt-3">
        <!-- Recharts / ApexCharts Main Area Chart -->
        <VueApexCharts
          type="area"
          height="280"
          :options="chartOptions"
          :series="series"
          class="w-full min-h-[280px]"
        />

        <!-- Summary Footer Bar -->
        <div
          class="mt-2 flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 app-dark:border-zinc-800 app-dark:text-zinc-400"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              Live Stream Active
            </span>
            <span class="hidden sm:inline">Interval: 2-Hour Aggregation</span>
          </div>

          <div class="flex items-center gap-3 font-medium">
            <span>Peak: 1,480 {{ metricConfigs[activeMetric].unit }}</span>
            <span>•</span>
            <span>Avg: 965 {{ metricConfigs[activeMetric].unit }}</span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
