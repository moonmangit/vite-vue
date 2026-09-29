<script setup lang="ts">
import AppCard from './AppCard.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    lines?: number
    variant?: 'blank' | 'full'
    showFooter?: boolean
    label?: string
  }>(),
  { lines: 3, variant: 'blank', showFooter: false, label: 'Loading card' },
)
</script>

<template>
  <AppCard
    v-bind="$attrs"
    :variant="props.variant"
    role="status"
    :aria-label="props.label"
    aria-busy="true"
  >
    <template v-if="props.variant === 'full'" #title>
      <span class="app-card-skeleton__block app-card-skeleton__title" aria-hidden="true" />
    </template>
    <template v-if="props.variant === 'full'" #subtitle>
      <span class="app-card-skeleton__block app-card-skeleton__subtitle" aria-hidden="true" />
    </template>
    <template #content>
      <div class="app-card-skeleton" aria-hidden="true">
        <span
          v-for="line in Math.max(1, Math.floor(props.lines))"
          :key="line"
          class="app-card-skeleton__block app-card-skeleton__line"
          :class="{ 'app-card-skeleton__line--short': line === props.lines }"
        />
      </div>
    </template>
    <template v-if="props.showFooter" #footer>
      <span class="app-card-skeleton__block app-card-skeleton__footer" aria-hidden="true" />
    </template>
  </AppCard>
</template>

<style scoped>
.app-card-skeleton {
  display: grid;
  gap: 0.75rem;
}

.app-card-skeleton__block {
  display: block;
  border-radius: 0.375rem;
  background-color: var(--app-surface-border-color);
  animation: app-card-skeleton-pulse 1.5s ease-in-out infinite;
}

.app-card-skeleton__title {
  width: 38%;
  height: 1.25rem;
}

.app-card-skeleton__subtitle {
  width: 58%;
  height: 1rem;
}

.app-card-skeleton__line {
  width: 100%;
  height: 0.875rem;
}

.app-card-skeleton__line--short {
  width: 68%;
}

.app-card-skeleton__footer {
  width: 5rem;
  height: 2rem;
  margin-left: auto;
}

@keyframes app-card-skeleton-pulse {
  50% {
    opacity: 0.45;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-card-skeleton__block {
    animation: none;
  }
}
</style>
