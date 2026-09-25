<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { appComponentAttrs } from '../lib/appComponentAttrs'
import type { AppChartOptions, AppChartSeries, AppChartType } from './AppChart.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    type: AppChartType
    options: AppChartOptions
    series: AppChartSeries
    width?: number | string
    height?: number | string
  }>(),
  { width: '100%', height: 300 },
)
</script>

<template>
  <VueApexCharts
    v-bind="appComponentAttrs($attrs)"
    :type="props.type"
    :options="props.options"
    :series="props.series"
    :width="props.width"
    :height="props.height"
  />
</template>
