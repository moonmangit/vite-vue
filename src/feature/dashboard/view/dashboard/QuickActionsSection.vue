<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'

export interface QuickAction {
  label: string
  description: string
  icon: string
}

defineProps<{
  actions: QuickAction[]
}>()

const emit = defineEmits<{
  (e: 'execute', actionLabel: string): void
}>()
</script>

<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-bolt text-primary-600 text-sm" />
        <span
          class="text-xs font-bold uppercase tracking-wider text-slate-700 app-dark:text-zinc-300"
        >
          Quick Operations
        </span>
      </div>
    </template>

    <template #content>
      <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button
          v-for="act in actions"
          :key="act.label"
          severity="secondary"
          size="small"
          class="flex flex-col items-center justify-center p-3 text-center transition hover:scale-[1.02]"
          @click="emit('execute', act.label)"
        >
          <i :class="[act.icon, 'text-lg mb-1 text-primary-600']" />
          <span class="text-xs font-bold text-slate-800 app-dark:text-zinc-200">
            {{ act.label }}
          </span>
          <span class="text-[10px] text-slate-400 app-dark:text-zinc-500 font-normal">
            {{ act.description }}
          </span>
        </Button>
      </div>
    </template>
  </Card>
</template>
