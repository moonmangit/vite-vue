import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary'

export interface ToastOptions {
  id?: string
  severity?: ToastSeverity
  summary?: string
  detail?: string
  life?: number
  sticky?: boolean
  closable?: boolean
  group?: string
  data?: unknown
}

export const useToastStore = defineStore('toast', () => {
  const queue = ref<ToastOptions[]>([])

  function show(options: ToastOptions) {
    const toastItem: ToastOptions = {
      id: options.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      severity: options.severity || 'info',
      summary: options.summary,
      detail: options.detail,
      life: options.life,
      sticky: options.sticky,
      closable: options.closable ?? true,
      group: options.group,
      data: options.data,
    }
    queue.value.push(toastItem)
  }

  function success(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'success',
      summary: summary || 'Success',
      detail,
      life: options?.life ?? 3000,
      ...options,
    })
  }

  function info(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'info',
      summary: summary || 'Information',
      detail,
      life: options?.life ?? 3500,
      ...options,
    })
  }

  function warning(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'warn',
      summary: summary || 'Warning',
      detail,
      life: options?.life ?? 4500,
      ...options,
    })
  }

  function error(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'error',
      summary: summary || 'Error',
      detail,
      life: options?.life ?? 6000,
      ...options,
    })
  }

  function dequeue(): ToastOptions | undefined {
    return queue.value.shift()
  }

  function clear() {
    queue.value = []
  }

  return {
    queue,
    show,
    success,
    info,
    warning,
    warn: warning,
    error,
    dequeue,
    clear,
  }
})
