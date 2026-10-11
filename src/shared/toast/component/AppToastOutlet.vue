<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToastStore } from '../store/main'
import AppToastItem from './AppToastItem.vue'

const toastStore = useToastStore()
const { t } = useI18n({ useScope: 'global' })
const isGroupHovered = ref(false)
const outletElement = ref<HTMLElement>()
const layoutAnimations = new WeakMap<HTMLElement, Animation>()
const motionDuration = 220
const motionEasing = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

function captureToastPositions() {
  const positions = new Map<string, DOMRect>()

  outletElement.value?.querySelectorAll<HTMLElement>('[data-toast-id]').forEach((element) => {
    const id = element.dataset.toastId
    if (id) positions.set(id, element.getBoundingClientRect())
  })

  return positions
}

function animateToastLayout(previousPositions: Map<string, DOMRect>) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const elements = new Map<string, HTMLElement>()
  outletElement.value?.querySelectorAll<HTMLElement>('[data-toast-id]').forEach((element) => {
    const id = element.dataset.toastId
    if (id) elements.set(id, element)
  })

  for (const toast of toastStore.toasts) {
    const element = elements.get(toast.id)
    const previous = previousPositions.get(toast.id)
    if (!element) continue

    if (!previous) {
      animateToastEnter(element)
      continue
    }

    const next = element.getBoundingClientRect()
    const offsetX = previous.left - next.left
    const offsetY = previous.top - next.top
    if (Math.abs(offsetX) < 1 && Math.abs(offsetY) < 1) continue

    layoutAnimations.get(element)?.cancel()
    const animation = element.animate(
      [{ translate: `${offsetX}px ${offsetY}px` }, { translate: '0px 0px' }],
      { duration: motionDuration, easing: motionEasing },
    )
    layoutAnimations.set(element, animation)
    animation.onfinish = () => {
      if (layoutAnimations.get(element) === animation) layoutAnimations.delete(element)
    }
  }
}

function animateToastEnter(element: Element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  element.animate(
    [
      { opacity: 0, translate: '0px -6px' },
      { opacity: 1, translate: '0px 0px' },
    ],
    { duration: motionDuration, easing: motionEasing },
  )
}

function onToastLeave(element: Element, done: () => void) {
  const toastElement = element as HTMLElement
  const list = outletElement.value?.querySelector<HTMLOListElement>('.app-toast-outlet__list')
  if (list) {
    const toastRect = toastElement.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    toastElement.classList.add('app-toast--leaving')
    toastElement.style.left = `${toastRect.left - listRect.left}px`
    toastElement.style.top = `${toastRect.top - listRect.top}px`
    toastElement.style.width = `${toastRect.width}px`
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    done()
    return
  }

  const animation = element.animate(
    [
      { opacity: 1, translate: '0px 0px' },
      { opacity: 0, translate: '0px -6px' },
    ],
    { duration: motionDuration, easing: motionEasing },
  )
  animation.onfinish = done
}

function setGroupHovered(isHovered: boolean) {
  if (isGroupHovered.value === isHovered) return
  const previousPositions = captureToastPositions()
  isGroupHovered.value = isHovered
  void nextTick().then(() => animateToastLayout(previousPositions))
}

function onPointerOver(event: PointerEvent) {
  if (event.target instanceof Element && event.target.closest('.app-toast__close')) return
  setGroupHovered(true)
}

function dismissToast(id: string) {
  const previousPositions = captureToastPositions()
  isGroupHovered.value = false
  toastStore.dismiss(id)
  void nextTick().then(() => animateToastLayout(previousPositions))
}

function onPointerMove(event: PointerEvent) {
  if (!isGroupHovered.value || !outletElement.value) return

  const bounds = outletElement.value.getBoundingClientRect()
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  ) {
    void setGroupHovered(false)
  }
}

onMounted(() => window.addEventListener('pointermove', onPointerMove, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  outletElement.value
    ?.querySelectorAll<HTMLElement>('.app-toast')
    .forEach((element) => layoutAnimations.get(element)?.cancel())
})
</script>

<template>
  <section
    ref="outletElement"
    class="app-toast-outlet"
    :aria-label="t('shared.toast.notifications')"
    @pointerover="onPointerOver"
  >
    <TransitionGroup
      name="app-toast"
      tag="ol"
      class="app-toast-outlet__list"
      :css="false"
      :class="{ 'app-toast-outlet__list--expanded': isGroupHovered }"
      @leave="onToastLeave"
    >
      <AppToastItem
        v-for="(toast, index) in toastStore.toasts"
        :key="toast.id"
        :data-toast-id="toast.id"
        :data-stack-index="index"
        :toast="toast"
        :group-hovered="isGroupHovered"
        @dismiss="dismissToast"
      />
    </TransitionGroup>
  </section>
</template>

<style scoped>
.app-toast-outlet {
  position: fixed;
  z-index: 1100;
  inset-block-start: max(1rem, env(safe-area-inset-top));
  inset-inline-start: 50%;
  inset-inline-end: auto;
  width: min(25rem, calc(100vw - 1.5rem));
  transform: translateX(-50%);
  pointer-events: none;
}

.app-toast-outlet__list {
  position: relative;
  min-height: 10rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-toast-outlet__list--expanded {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  min-height: 0;
}

@media (max-width: 480px) {
  .app-toast-outlet {
    inset-block-start: max(0.75rem, env(safe-area-inset-top));
  }
}
</style>
