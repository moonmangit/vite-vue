<script setup lang="ts">
import Tag from 'primevue/tag'

defineProps<{
  title: string
  value: string | number
  trend?: string
  trendType?: 'up' | 'down' | 'neutral'
  icon?: string
  subtitle?: string
  badgeText?: string
}>()
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md app-dark:border-zinc-800 app-dark:bg-zinc-900/80"
  >
    <div class="flex items-center justify-between gap-2 mb-2">
      <span
        class="text-xs font-semibold uppercase tracking-wider text-slate-500 app-dark:text-zinc-400"
      >
        {{ title }}
      </span>
      <div
        v-if="icon"
        class="grid size-8 place-items-center rounded-lg bg-slate-100 text-slate-600 app-dark:bg-zinc-800 app-dark:text-zinc-300"
      >
        <i :class="['text-xs', icon]" aria-hidden="true" />
      </div>
      <Tag v-else-if="badgeText" :value="badgeText" severity="secondary" class="text-[10px]" />
    </div>

    <div class="flex items-baseline justify-between gap-2">
      <span class="text-2xl font-black tracking-tight text-slate-900 app-dark:text-white">
        {{ value }}
      </span>

      <span
        v-if="trend"
        class="inline-flex items-center gap-1 text-xs font-bold"
        :class="{
          'text-emerald-600 app-dark:text-emerald-400': trendType === 'up',
          'text-rose-600 app-dark:text-rose-400': trendType === 'down',
          'text-slate-500 app-dark:text-zinc-400': !trendType || trendType === 'neutral',
        }"
      >
        <i
          v-if="trendType"
          :class="[
            'text-[10px]',
            trendType === 'up'
              ? 'pi pi-arrow-up-right'
              : trendType === 'down'
                ? 'pi pi-arrow-down-right'
                : 'pi pi-minus',
          ]"
        />
        {{ trend }}
      </span>
    </div>

    <p v-if="subtitle" class="mt-1 text-[11px] text-slate-400 app-dark:text-zinc-500">
      {{ subtitle }}
    </p>
  </div>
</template>
