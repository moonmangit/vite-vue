import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useToastStore, type ToastOptions, type ToastSeverity } from '../store/main'

export function useAppToast() {
  const fallbackSummaries: Record<ToastSeverity, string> = {
    success: 'Success',
    info: 'Information',
    warn: 'Warning',
    error: 'Error',
    contrast: 'Notice',
    secondary: 'Notice',
  }
  let translate: ((key: string) => string) | undefined

  try {
    const { t } = useI18n({ useScope: 'global' })
    translate = (key) => t(key)
  } catch {
    translate = undefined
  }

  function defaultSummary(severity: ToastSeverity) {
    return translate?.(`shared.toast.${severity}`) ?? fallbackSummaries[severity]
  }

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
      summary: options.summary || defaultSummary(severity),
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

  function success(summary?: string, detail?: string, options?: Partial<ToastOptions>) {
    const severity = options?.severity ?? 'success'
    show({
      ...options,
      severity,
      summary: summary || options?.summary || defaultSummary(severity),
      detail: detail ?? options?.detail,
    })
  }

  function info(summary?: string, detail?: string, options?: Partial<ToastOptions>) {
    const severity = options?.severity ?? 'info'
    show({
      ...options,
      severity,
      summary: summary || options?.summary || defaultSummary(severity),
      detail: detail ?? options?.detail,
    })
  }

  function warning(summary?: string, detail?: string, options?: Partial<ToastOptions>) {
    const severity = options?.severity ?? 'warn'
    show({
      ...options,
      severity,
      summary: summary || options?.summary || defaultSummary(severity),
      detail: detail ?? options?.detail,
    })
  }

  function error(summary?: string, detail?: string, options?: Partial<ToastOptions>) {
    const severity = options?.severity ?? 'error'
    show({
      ...options,
      severity,
      summary: summary || options?.summary || defaultSummary(severity),
      detail: detail ?? options?.detail,
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
