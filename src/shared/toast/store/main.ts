import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastSeverity =
  'success' | 'info' | 'warning' | 'danger' | 'warn' | 'error' | 'contrast' | 'secondary'

export type ToastDisplaySeverity =
  'success' | 'info' | 'warning' | 'danger' | 'contrast' | 'secondary'

export interface ToastOptions {
  id?: string
  severity?: ToastSeverity
  title?: string
  message?: string
  summary?: string
  description?: string
  detail?: string
  duration?: number | false
  life?: number
  sticky?: boolean
  closable?: boolean
  group?: string
  data?: unknown
}

export interface ToastItem {
  id: string
  severity: ToastDisplaySeverity
  title: string
  description?: string
  duration: number | false
  sticky: boolean
  closable: boolean
  group?: string
  data?: unknown
}

export const MAX_VISIBLE_TOASTS = 3

let nextToastId = 0

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastItem[]>([])
  const queue = ref<ToastItem[]>([])

  function show(options: Omit<ToastItem, 'id'> & { id?: string }) {
    const toastItem: ToastItem = {
      ...options,
      id: options.id || `toast-${Date.now()}-${++nextToastId}`,
    }

    if (toasts.value.length < MAX_VISIBLE_TOASTS) {
      toasts.value.unshift(toastItem)
    } else {
      queue.value.push(toastItem)
    }

    return toastItem.id
  }

  function dismiss(id: string) {
    const visibleIndex = toasts.value.findIndex((item) => item.id === id)
    if (visibleIndex !== -1) {
      const nextToasts = toasts.value.filter((_, index) => index !== visibleIndex)
      const nextQueue = [...queue.value]
      const nextToast = nextQueue.shift()

      if (nextToast) nextToasts.unshift(nextToast)

      toasts.value = nextToasts
      if (nextToast) queue.value = nextQueue
      return
    }

    const queuedIndex = queue.value.findIndex((item) => item.id === id)
    if (queuedIndex !== -1) queue.value = queue.value.filter((_, index) => index !== queuedIndex)
  }

  function clear() {
    toasts.value = []
    queue.value = []
  }

  function removeGroup(group: string) {
    const nextToasts = toasts.value.filter((item) => item.group !== group)
    const nextQueue = queue.value.filter((item) => item.group !== group)

    while (nextToasts.length < MAX_VISIBLE_TOASTS && nextQueue.length > 0) {
      const nextToast = nextQueue.shift()
      if (nextToast) nextToasts.unshift(nextToast)
    }

    toasts.value = nextToasts
    queue.value = nextQueue
  }

  return { toasts, queue, show, dismiss, clear, removeGroup }
})
