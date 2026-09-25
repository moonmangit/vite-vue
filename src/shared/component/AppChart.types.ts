import type { ApexOptions } from 'apexcharts'

export type AppChartType = 'area' | 'bar' | 'donut' | 'line' | 'pie'
export type AppChartOptions = ApexOptions
export type AppChartSeries = NonNullable<ApexOptions['series']>
