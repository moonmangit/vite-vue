<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ToastItem } from '../store/main'

const props = defineProps<{ toast: ToastItem; groupHovered: boolean }>()
const emit = defineEmits<{ dismiss: [id: string] }>()
const { t } = useI18n({ useScope: 'global' })

const iconBySeverity = {
  success: 'pi-check-circle',
  info: 'pi-info-circle',
  warning: 'pi-exclamation-triangle',
  danger: 'pi-times-circle',
  contrast: 'pi-bell',
  secondary: 'pi-bell',
} as const

const icon = computed(() => iconBySeverity[props.toast.severity] ?? 'pi-info-circle')
const duration = computed(() => (props.toast.duration === false ? null : props.toast.duration))
const timeLeft = ref(duration.value ?? 0)
const progress = computed(() => {
  if (duration.value === null || duration.value <= 0) return 0
  return Math.min(100, Math.max(0, (timeLeft.value / duration.value) * 100))
})

let timeout: ReturnType<typeof setTimeout> | undefined
let ticker: ReturnType<typeof setInterval> | undefined
let startedAt = 0
let focused = false

function stopTimer() {
  if (timeout) clearTimeout(timeout)
  if (ticker) clearInterval(ticker)
  timeout = undefined
  ticker = undefined
}

function startTimer() {
  stopTimer()
  if (duration.value === null || timeLeft.value <= 0 || props.groupHovered || focused) return

  startedAt = Date.now()
  timeout = setTimeout(() => emit('dismiss', props.toast.id), timeLeft.value)
  ticker = setInterval(() => {
    timeLeft.value = Math.max(0, timeLeft.value - (Date.now() - startedAt))
    startedAt = Date.now()
  }, 40)
}

function pauseTimer() {
  if (timeout) {
    timeLeft.value = Math.max(0, timeLeft.value - (Date.now() - startedAt))
  }
  stopTimer()
}

function onFocusIn() {
  focused = true
  pauseTimer()
}

function onFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget
  if (
    nextTarget instanceof Node &&
    event.currentTarget instanceof Node &&
    event.currentTarget.contains(nextTarget)
  ) {
    return
  }
  focused = false
  startTimer()
}

function dismiss() {
  emit('dismiss', props.toast.id)
}

onMounted(startTimer)
onBeforeUnmount(stopTimer)

watch(
  () => props.groupHovered,
  (isHovered) => (isHovered ? pauseTimer() : startTimer()),
)
</script>

<template>
  <li
    class="app-toast"
    :class="[`app-toast--${toast.severity}`, { 'app-toast--group-hovered': groupHovered }]"
    :role="toast.severity === 'danger' ? 'alert' : 'status'"
    :aria-live="toast.severity === 'danger' ? 'assertive' : 'polite'"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <span class="app-toast__icon" aria-hidden="true">
      <i class="pi" :class="icon" />
    </span>

    <div class="app-toast__content">
      <p class="app-toast__title app-text-sm">{{ toast.title }}</p>
      <p v-if="toast.description" class="app-toast__description app-text-sm">
        {{ toast.description }}
      </p>
    </div>

    <button
      v-if="toast.closable"
      class="app-toast__close"
      type="button"
      :aria-label="t('shared.toast.dismiss')"
      @click="dismiss"
    >
      <i class="pi pi-times" aria-hidden="true" />
    </button>

    <div
      v-if="duration !== null"
      class="app-toast__progress-track"
      role="progressbar"
      :aria-label="t('shared.toast.timeRemaining')"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuenow="Math.round(progress)"
    >
      <span class="app-toast__progress" :style="{ transform: `scaleX(${progress / 100})` }" />
    </div>
  </li>
</template>

<style scoped>
.app-toast {
  --toast-offset: 0rem;
  --toast-y-offset: 0rem;
  --toast-accent: var(--brand-primary-500);
  --toast-tint: color-mix(in srgb, var(--toast-accent) 10%, var(--app-surface-color));
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 50%;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  padding: 1rem 0.875rem 1.125rem;
  overflow: hidden;
  border: 1px solid var(--app-surface-border-color);
  border-radius: 0.875rem;
  background: var(--app-surface-color);
  color: var(--app-tone-normal);
  box-shadow: 0 10px 28px rgb(15 23 42 / 0.16);
  transform: translate(calc(-50% + var(--toast-offset)), var(--toast-y-offset));
  z-index: 1;
  pointer-events: auto;
}

.app-toast[data-stack-index='0'] {
  z-index: 3;
}

.app-toast[data-stack-index='1'] {
  --toast-y-offset: 1.25rem;
  z-index: 2;
}

.app-toast[data-stack-index='2'] {
  --toast-y-offset: 2.5rem;
  z-index: 1;
}

.app-toast:only-child {
  z-index: 3;
}

.app-toast--group-hovered {
  position: relative;
  inset: auto;
  transform: none;
}

.app-toast--leaving {
  position: absolute;
  inset: auto;
  transform: none;
  z-index: 0;
  pointer-events: none;
}

.app-dark .app-toast {
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.38);
}

.app-toast--success {
  --toast-accent: var(--brand-success-600);
}

.app-toast--info {
  --toast-accent: var(--brand-info-600);
}

.app-toast--warning {
  --toast-accent: var(--brand-warning-600);
}

.app-toast--danger {
  --toast-accent: var(--brand-danger-600);
}

.app-toast__icon {
  display: grid;
  flex: 0 0 2rem;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 0.625rem;
  background: var(--toast-tint);
  color: var(--toast-accent);
}

.app-toast__content {
  flex: 1;
  min-width: 0;
  padding-block: 0.125rem;
}

.app-toast__title,
.app-toast__description {
  margin: 0;
  overflow-wrap: anywhere;
}

.app-toast__title {
  font-weight: 650;
}

.app-toast__description {
  margin-top: 0.25rem;
  color: var(--app-tone-muted);
  line-height: 1.4;
}

.app-toast__close {
  display: grid;
  flex: 0 0 2rem;
  width: 2rem;
  height: 2rem;
  margin: -0.125rem -0.25rem 0 0;
  place-items: center;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--app-tone-muted);
  cursor: pointer;
}

.app-toast__close:hover {
  background: var(--toast-tint);
  color: var(--toast-accent);
}

.app-toast__close:focus-visible {
  outline: 2px solid var(--toast-accent);
  outline-offset: 2px;
}

.app-toast__progress-track {
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  height: 3px;
  overflow: hidden;
  background: color-mix(in srgb, var(--toast-accent) 12%, transparent);
}

.app-toast__progress {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--toast-accent);
  transform-origin: left;
  transition: transform 70ms linear;
}
</style>
