import { useI18n } from 'vue-i18n'
import {
  useToastStore,
  type ToastDisplaySeverity,
  type ToastItem,
  type ToastOptions,
  type ToastSeverity,
} from '../store/main'

const defaultDurations: Record<ToastSeverity, number> = {
  success: 3000,
  info: 3500,
  warning: 4500,
  danger: 6000,
  warn: 4500,
  error: 6000,
  contrast: 3500,
  secondary: 3500,
}

const defaultTitles: Record<ToastSeverity, string> = {
  success: 'Success',
  info: 'Information',
  warning: 'Warning',
  danger: 'Error',
  warn: 'Warning',
  error: 'Error',
  contrast: 'Notice',
  secondary: 'Notice',
}

function canonicalSeverity(severity: ToastSeverity): ToastDisplaySeverity {
  if (severity === 'warn') return 'warning'
  if (severity === 'error') return 'danger'
  return severity
}

export function useAppToast() {
  let translate: ((key: string) => string) | undefined

  try {
    const { t } = useI18n({ useScope: 'global' })
    translate = (key) => t(key)
  } catch {
    translate = undefined
  }

  const toastStore = useToastStore()

  function defaultTitle(severity: ToastSeverity) {
    return translate?.(`shared.toast.${canonicalSeverity(severity)}`) ?? defaultTitles[severity]
  }

  function show(messageOrOptions: string | ToastOptions, options?: ToastOptions) {
    const input =
      typeof messageOrOptions === 'string'
        ? { ...options, message: messageOrOptions }
        : messageOrOptions
    const severity = input.severity ?? 'info'
    const requestedDuration = input.duration ?? input.life ?? defaultDurations[severity]
    const duration = requestedDuration === false ? false : Math.max(0, requestedDuration)
    const item: Omit<ToastItem, 'id'> & { id?: string } = {
      id: input.id,
      severity: canonicalSeverity(severity),
      title: input.title || input.summary || input.message || defaultTitle(severity),
      description: input.description ?? input.detail,
      duration: input.sticky || duration === 0 ? false : duration,
      sticky: input.sticky ?? (duration === false || duration === 0),
      closable: input.closable ?? true,
      group: input.group,
      data: input.data,
    }

    return toastStore.show(item)
  }

  function showAs(
    severity: ToastSeverity,
    summaryOrOptions?: string | ToastOptions,
    detailOrOptions?: string | ToastOptions,
    legacyOptions?: Partial<ToastOptions>,
  ) {
    let options: ToastOptions
    if (typeof detailOrOptions === 'string') {
      options = { ...legacyOptions, description: detailOrOptions }
    } else if (detailOrOptions) {
      options = detailOrOptions
    } else if (legacyOptions) {
      options = legacyOptions
    } else {
      options = {}
    }

    const summary = typeof summaryOrOptions === 'string' ? summaryOrOptions : undefined
    if (typeof summaryOrOptions === 'object' && summaryOrOptions !== null) {
      options = { ...summaryOrOptions, ...options }
    }

    return show({
      ...options,
      severity: options.severity ?? severity,
      title: summary ?? options.title ?? options.summary,
    })
  }

  function success(
    summaryOrOptions?: string | ToastOptions,
    detailOrOptions?: string | ToastOptions,
    options?: Partial<ToastOptions>,
  ) {
    return showAs('success', summaryOrOptions, detailOrOptions, options)
  }

  function info(
    summaryOrOptions?: string | ToastOptions,
    detailOrOptions?: string | ToastOptions,
    options?: Partial<ToastOptions>,
  ) {
    return showAs('info', summaryOrOptions, detailOrOptions, options)
  }

  function warning(
    summaryOrOptions?: string | ToastOptions,
    detailOrOptions?: string | ToastOptions,
    options?: Partial<ToastOptions>,
  ) {
    return showAs('warning', summaryOrOptions, detailOrOptions, options)
  }

  function danger(
    summaryOrOptions?: string | ToastOptions,
    detailOrOptions?: string | ToastOptions,
    options?: Partial<ToastOptions>,
  ) {
    return showAs('danger', summaryOrOptions, detailOrOptions, options)
  }

  function error(
    summaryOrOptions?: string | ToastOptions,
    detailOrOptions?: string | ToastOptions,
    options?: Partial<ToastOptions>,
  ) {
    return danger(summaryOrOptions, detailOrOptions, options)
  }

  function warn(
    summaryOrOptions?: string | ToastOptions,
    detailOrOptions?: string | ToastOptions,
    options?: Partial<ToastOptions>,
  ) {
    return warning(summaryOrOptions, detailOrOptions, options)
  }

  function dismiss(id: string) {
    toastStore.dismiss(id)
  }

  function clear() {
    toastStore.clear()
  }

  function removeGroup(group: string) {
    toastStore.removeGroup(group)
  }

  return {
    show,
    success,
    info,
    warning,
    warn,
    danger,
    error,
    dismiss,
    clear,
    removeGroup,
    removeAllGroups: clear,
    toastStore,
  }
}

export const useAppToastSystem = useAppToast
