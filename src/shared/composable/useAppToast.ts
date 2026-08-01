import { useToast } from 'primevue/usetoast'
import { useToastStore, type ToastOptions, type ToastSeverity } from '../store/toast'

export function useAppToast() {
  let primeToast: ReturnType<typeof useToast> | null = null
  try {
    primeToast = useToast()
  } catch {
    primeToast = null
  }

  const toastStore = useToastStore()

  function show(options: ToastOptions) {
    const defaultLife: Record<ToastSeverity, number> = {
      success: 3000,
      info: 3500,
      warn: 4500,
      error: 6000,
      contrast: 3500,
      secondary: 3500,
    }

    const severity = options.severity || 'info'
    const payload = {
      severity,
      summary: options.summary,
      detail: options.detail,
      life: options.life ?? defaultLife[severity],
      sticky: options.sticky,
      closable: options.closable ?? true,
      group: options.group,
      data: options.data,
    }

    if (primeToast) {
      primeToast.add(payload)
    } else {
      toastStore.show(payload)
    }
  }

  function success(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'success',
      summary: summary || 'Success',
      detail,
      ...options,
    })
  }

  function info(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'info',
      summary: summary || 'Information',
      detail,
      ...options,
    })
  }

  function warning(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'warn',
      summary: summary || 'Warning',
      detail,
      ...options,
    })
  }

  function error(summary: string, detail?: string, options?: Partial<ToastOptions>) {
    show({
      severity: 'error',
      summary: summary || 'Error Occurred',
      detail,
      ...options,
    })
  }

  function removeGroup(group: string) {
    if (primeToast) {
      primeToast.removeGroup(group)
    }
  }

  function removeAllGroups() {
    if (primeToast) {
      primeToast.removeAllGroups()
    }
    toastStore.clear()
  }

  return {
    show,
    success,
    info,
    warning,
    warn: warning,
    error,
    removeGroup,
    removeAllGroups,
    toastStore,
  }
}
