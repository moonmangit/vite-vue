<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppTag from './AppTag.vue'

const props = defineProps<{
  status: 'active' | 'pending' | 'warning' | 'error' | 'success' | 'inactive'
  label?: string
}>()

const { t } = useI18n({ useScope: 'global' })
const displayLabel = computed(() => props.label ?? t(`shared.status.${props.status}`))

const toneMap: Record<(typeof props)['status'], 'success' | 'warning' | 'danger' | 'secondary'> = {
  active: 'success',
  success: 'success',
  pending: 'warning',
  warning: 'warning',
  error: 'danger',
  inactive: 'secondary',
}
</script>

<template>
  <AppTag
    :value="displayLabel"
    :tone="toneMap[status]"
    class="app-text-custom font-semibold uppercase tracking-wider px-2 py-0.5"
    style="--app-font-size: 11px"
  />
</template>
