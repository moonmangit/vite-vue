<script setup lang="ts">
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import PrimeToast from 'primevue/toast'
import { appComponentAttrs } from '../../lib/appComponentAttrs'
import { useToastStore } from '../store/main'

defineOptions({ inheritAttrs: false })

const primeToast = useToast()
const toastStore = useToastStore()

watch(
  () => toastStore.queue.length,
  () => {
    while (toastStore.queue.length > 0) {
      const item = toastStore.dequeue()
      if (item) {
        primeToast.add({
          severity: item.severity || 'info',
          summary: item.summary,
          detail: item.detail,
          life: item.sticky ? undefined : item.life,
          closable: item.closable,
          group: item.group,
        })
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <PrimeToast v-bind="appComponentAttrs($attrs)" />
</template>
