<script setup lang="ts">
import AppTag from './AppTag.vue'
import AppCard from './AppCard.vue'

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
  <AppCard variant="compact">
    <div class="flex items-center justify-between gap-2">
      <span class="app-text-xs app-text-muted font-semibold uppercase tracking-wider">
        {{ title }}
      </span>
      <div
        v-if="icon"
        class="grid size-8 place-items-center rounded-lg bg-surface-100 app-text-muted app-dark:bg-surface-800"
      >
        <i :class="['app-text-xs', icon]" aria-hidden="true" />
      </div>
      <AppTag
        v-else-if="badgeText"
        :value="badgeText"
        tone="secondary"
        class="app-text-custom"
        style="--app-font-size: 10px"
      />
    </div>

    <div class="flex items-baseline justify-between gap-2">
      <span class="app-text-2xl app-text-normal font-black tracking-tight">
        {{ value }}
      </span>

      <span
        v-if="trend"
        class="inline-flex items-center gap-1 app-text-xs font-bold"
        :class="{
          'text-emerald-600 app-dark:text-emerald-400': trendType === 'up',
          'text-rose-600 app-dark:text-rose-400': trendType === 'down',
          'app-text-muted': !trendType || trendType === 'neutral',
        }"
      >
        <i
          v-if="trendType"
          style="--app-font-size: 10px"
          :class="[
            'app-text-custom',
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

    <p v-if="subtitle" class="m-0 app-text-custom app-text-muted" style="--app-font-size: 11px">
      {{ subtitle }}
    </p>
  </AppCard>
</template>
