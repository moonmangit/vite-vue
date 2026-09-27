<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { mockChartSeries, type ChartSeriesData } from '../../../lib/dashboardData'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'
import AppChart from '../../../../../shared/component/AppChart.vue'
import type { AppChartOptions } from '../../../../../shared/component/AppChart.types'

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
const { t } = useI18n({ useScope: 'global' })

const metricConfigs = {
  throughput: {
    labelKey: 'features.dashboard.chart.throughput',
    unit: 'req/sec',
    icon: 'pi pi-chart-line',
    colors: ['#4f46e5', '#818cf8'],
    colorName: 'indigo',
  },
  latency: {
    labelKey: 'features.dashboard.chart.latency',
    unit: 'ms',
    icon: 'pi pi-clock',
    colors: ['#f59e0b', '#fbbf24'],
    colorName: 'amber',
  },
  errors: {
    labelKey: 'features.dashboard.chart.errorRate',
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
    name: t(metricConfigs[activeMetric.value].labelKey),
    data: activeSeriesValues.value,
  },
])

const chartOptions = computed<AppChartOptions>(() => {
  const currentConfig = metricConfigs[activeMetric.value]
  return {
    chart: {
      type: 'area' as const,
      height: 280,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Noto Sans Thai',
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
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 10, right: 10, bottom: 0, left: 10 },
    },
    xaxis: {
      categories: chartCategories.value,
      labels: {
        style: {
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
      strokeWidth: 2,
      hover: { size: 6 },
    },
  }
})
</script>

<template>
  <AppCard variant="full" class="h-full">
    <template #content>
      <div class="space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <!-- Header Left: Icon & Metric Title -->
          <div class="flex items-center gap-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 app-dark:bg-indigo-950/60 app-dark:text-indigo-400"
            >
              <i :class="metricConfigs[activeMetric].icon" class="app-text-sm" />
            </div>
            <div>
              <h3 class="app-text-sm app-text-normal font-bold tracking-tight">
                {{ t(metricConfigs[activeMetric].labelKey) }}
              </h3>
              <p class="app-text-custom app-text-muted font-normal" style="--app-font-size: 11px">
                {{ $t('features.dashboard.chart.description') }}
              </p>
            </div>
          </div>

          <!-- Header Right: Metric Selector & Actions -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Metric Tab Pills -->
            <div
              class="flex items-center rounded-lg bg-surface-100 p-0.5 app-text-xs font-medium app-dark:bg-surface-800/80"
            >
              <button
                v-for="(config, key) in metricConfigs"
                :key="key"
                type="button"
                class="rounded-md px-2.5 py-1 transition-all duration-200"
                :class="
                  activeMetric === key
                    ? 'bg-surface-0 app-text-normal shadow-xs font-semibold app-dark:bg-surface-700'
                    : 'app-text-muted app-hover-text-normal'
                "
                @click="activeMetric = key as MetricType"
              >
                {{ config.unit }}
              </button>
            </div>

            <!-- Timeframe Pills -->
            <div
              class="hidden sm:flex items-center rounded-lg bg-surface-100 p-0.5 app-text-xs font-medium app-dark:bg-surface-800/80"
            >
              <button
                v-for="tf in ['24h', '7d', '30d'] as TimeframeType[]"
                :key="tf"
                type="button"
                class="rounded-md px-2 py-1 uppercase transition-all duration-200"
                :class="
                  activeTimeframe === tf
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'app-text-muted app-hover-text-normal'
                "
                @click="activeTimeframe = tf"
              >
                {{ tf }}
              </button>
            </div>

            <AppButton
              icon="pi pi-ellipsis-v"
              tone="secondary"
              size="small"
              appearance="text"
              class="p-1"
            />
          </div>
        </div>

        <!-- Recharts / ApexCharts Main Area Chart -->
        <AppChart
          type="area"
          height="280"
          :options="chartOptions"
          :series="series"
          class="w-full min-h-[280px]"
        />

        <!-- Summary Footer Bar -->
        <div
          class="mt-2 flex flex-wrap items-center justify-between border-t border-surface-100 pt-3 app-text-xs app-text-muted app-dark:border-surface-800"
        >
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              {{ $t('features.dashboard.chart.liveActive') }}
            </span>
            <span class="hidden sm:inline">{{ $t('features.dashboard.chart.interval') }}</span>
          </div>

          <div class="flex items-center gap-3 font-medium">
            <span
              >{{ $t('features.dashboard.chart.peak') }}: 1,480
              {{ metricConfigs[activeMetric].unit }}</span
            >
            <span>•</span>
            <span
              >{{ $t('features.dashboard.chart.average') }}: 965
              {{ metricConfigs[activeMetric].unit }}</span
            >
          </div>
        </div>
      </div>
    </template>
  </AppCard>
</template>
