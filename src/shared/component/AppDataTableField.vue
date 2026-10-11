<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DataTableFieldFormat } from './dataTable.types'

const props = withDefaults(
  defineProps<{
    value: unknown
    format: Exclude<DataTableFieldFormat, 'custom'>
    currency?: string
  }>(),
  { currency: 'USD' },
)

const { locale } = useI18n({ useScope: 'global' })

const textValue = computed(() => (props.value == null ? '—' : String(props.value)))
const numericValue = computed(() => {
  if (typeof props.value === 'number') return Number.isFinite(props.value) ? props.value : null
  if (typeof props.value !== 'string' || props.value.trim() === '') return null

  const value = Number(props.value)
  return Number.isFinite(value) ? value : null
})
const dateValue = computed(() => {
  if (props.value instanceof Date) return Number.isNaN(props.value.getTime()) ? null : props.value
  if (typeof props.value !== 'string' && typeof props.value !== 'number') return null
  if (typeof props.value === 'string' && props.value.trim() === '') return null

  const date = new Date(props.value)
  return Number.isNaN(date.getTime()) ? null : date
})

const formattedNumber = computed(() =>
  numericValue.value === null
    ? '—'
    : new Intl.NumberFormat(locale.value).format(numericValue.value),
)
const formattedCurrency = computed(() => {
  if (numericValue.value === null) return '—'

  try {
    return new Intl.NumberFormat(locale.value, {
      style: 'currency',
      currency: props.currency,
    }).format(numericValue.value)
  } catch {
    return formattedNumber.value
  }
})
const formattedDateTime = computed(() =>
  dateValue.value
    ? new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium', timeStyle: 'short' }).format(
        dateValue.value,
      )
    : '—',
)
const formattedDate = computed(() =>
  dateValue.value
    ? new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' }).format(dateValue.value)
    : '—',
)
const formattedTime = computed(() =>
  dateValue.value
    ? new Intl.DateTimeFormat(locale.value, { timeStyle: 'short' }).format(dateValue.value)
    : '—',
)
const relativeAge = computed(() => {
  if (!dateValue.value) return ''

  const difference = dateValue.value.getTime() - Date.now()
  const units = [
    ['year', 365 * 24 * 60 * 60 * 1000],
    ['month', 30 * 24 * 60 * 60 * 1000],
    ['week', 7 * 24 * 60 * 60 * 1000],
    ['day', 24 * 60 * 60 * 1000],
    ['hour', 60 * 60 * 1000],
    ['minute', 60 * 1000],
    ['second', 1000],
  ] as const
  const [unit, duration] = units.find(
    ([, unitDuration]) => Math.abs(difference) >= unitDuration,
  ) ?? ['second', 1000]

  return new Intl.RelativeTimeFormat(locale.value, { numeric: 'always' }).format(
    Math.round(difference / duration),
    unit,
  )
})
</script>

<template>
  <span v-if="format === 'text'" class="app-data-table-field" :title="textValue">{{
    textValue
  }}</span>
  <span
    v-else-if="format === 'long-text'"
    class="app-data-table-field app-data-table-field--long-text"
    :title="textValue"
    >{{ textValue }}</span
  >
  <span v-else-if="format === 'number'" class="app-data-table-field tabular-nums">
    {{ formattedNumber }}
  </span>
  <span v-else-if="format === 'currency'" class="app-data-table-field tabular-nums">
    {{ formattedCurrency }}
  </span>
  <time
    v-else-if="format === 'date-time' && dateValue"
    class="app-data-table-field"
    :datetime="dateValue.toISOString()"
  >
    {{ formattedDateTime }}
  </time>
  <time
    v-else-if="format === 'timestamp' && dateValue"
    class="app-data-table-field app-data-table-field--timestamp"
    :datetime="dateValue.toISOString()"
    :title="formattedDateTime"
  >
    <span>{{ formattedDate }}</span>
    <span class="app-text-xs app-text-muted">{{ formattedTime }} · {{ relativeAge }}</span>
  </time>
  <span v-else class="app-data-table-field">—</span>
</template>

<style scoped>
.app-data-table-field--long-text {
  display: -webkit-box;
  max-width: 20rem;
  overflow: hidden;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.app-data-table-field--timestamp {
  white-space: normal;
}

.app-data-table-field--timestamp span {
  display: block;
}
</style>
