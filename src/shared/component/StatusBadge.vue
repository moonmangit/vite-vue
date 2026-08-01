<script setup lang="ts">
import Tag from 'primevue/tag'

defineProps<{
  status: 'active' | 'pending' | 'warning' | 'error' | 'success' | 'inactive'
  label?: string
}>()

const severityMap: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
  active: 'success',
  success: 'success',
  pending: 'warn',
  warning: 'warn',
  error: 'danger',
  inactive: 'secondary',
}
</script>

<template>
  <Tag
    :value="label || status.toUpperCase()"
    :severity="severityMap[status] || 'secondary'"
    class="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5"
  />
</template>
