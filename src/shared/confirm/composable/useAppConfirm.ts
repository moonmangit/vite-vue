import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'
import {
  dequeueConfirm,
  enqueueConfirm,
  getVariantPresentation,
  hasActiveConfirm,
  onConfirmDialogAfterLeave,
  setActiveConfirm,
  type AppConfirmOptions,
  type ConfirmRequest,
  type PrimeConfirmOptions,
} from '../store/main'

function settle(request: ConfirmRequest, accepted: boolean) {
  if (request.settled) return
  request.settled = true
  request.resolve(accepted)
}

function settleWithError(request: ConfirmRequest, error: unknown) {
  if (request.settled) return
  request.settled = true
  request.reject(error)
}

export function useAppConfirm() {
  const confirmation = useConfirm()
  const { t } = useI18n({ useScope: 'global' })

  function showNext() {
    const request = dequeueConfirm()
    if (!request) {
      setActiveConfirm(undefined)
      return
    }

    setActiveConfirm(request)
    request.onDialogHidden = () => {
      setActiveConfirm(undefined)
      showNext()
    }
    const { options } = request
    const variant = options.variant ?? 'default'
    const presentation = getVariantPresentation(variant)
    const confirmationOptions: PrimeConfirmOptions = {
      header: options.header ?? t('shared.confirm.header'),
      message: options.message,
      icon: presentation.icon,
      acceptLabel: options.acceptLabel ?? t('shared.confirm.accept'),
      rejectLabel: options.rejectLabel ?? t('shared.confirm.reject'),
      defaultFocus: 'reject',
      acceptProps: {
        severity: presentation.severity,
        size: 'small',
        style: { minWidth: '4.5rem' },
        ...options.acceptProps,
      },
      rejectProps: {
        severity: 'secondary',
        text: true,
        size: 'small',
        style: { minWidth: '4.5rem' },
        ...options.rejectProps,
      },
      variant,
      accept: () => {
        if (request.accepted || request.settled) return
        request.accepted = true
        void Promise.resolve()
          .then(() => request.onAccept?.())
          .then(
            () => settle(request, true),
            (error: unknown) => settleWithError(request, error),
          )
      },
      reject: () => settle(request, false),
      onHide: () => {
        if (!request.accepted) settle(request, false)
      },
    }

    confirmation.require(confirmationOptions)
  }

  function ask(options: AppConfirmOptions, onAccept?: () => unknown | Promise<unknown>) {
    return new Promise<boolean>((resolve, reject) => {
      enqueueConfirm({ options, onAccept, resolve, reject, accepted: false, settled: false })
      if (!hasActiveConfirm()) showNext()
    })
  }

  return { ask }
}

export { onConfirmDialogAfterLeave }
