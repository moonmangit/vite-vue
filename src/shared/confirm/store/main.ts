import type { ButtonProps } from 'primevue/button'
import type { ConfirmationOptions } from 'primevue/confirmationoptions'

export type ConfirmVariant = 'default' | 'info' | 'success' | 'warning' | 'danger'

export interface AppConfirmOptions {
  message: string
  header?: string
  variant?: ConfirmVariant
  acceptLabel?: string
  rejectLabel?: string
  acceptProps?: Partial<ButtonProps>
  rejectProps?: Partial<ButtonProps>
}

export interface ConfirmRequest {
  options: AppConfirmOptions
  onAccept?: () => unknown | Promise<unknown>
  resolve: (accepted: boolean) => void
  reject: (error: unknown) => void
  accepted: boolean
  settled: boolean
  onDialogHidden?: () => void
}

export const confirmQueue: ConfirmRequest[] = []
export let activeConfirm: ConfirmRequest | undefined

export function setActiveConfirm(request: ConfirmRequest | undefined) {
  activeConfirm = request
}

export function hasActiveConfirm() {
  return activeConfirm !== undefined
}

export function enqueueConfirm(request: ConfirmRequest) {
  confirmQueue.push(request)
}

export function dequeueConfirm() {
  return confirmQueue.shift()
}

export function onConfirmDialogAfterLeave() {
  activeConfirm?.onDialogHidden?.()
}

const variantPresentation: Record<ConfirmVariant, { icon: string; severity: string }> = {
  default: { icon: 'pi pi-question-circle', severity: 'primary' },
  info: { icon: 'pi pi-info-circle', severity: 'info' },
  success: { icon: 'pi pi-check-circle', severity: 'success' },
  warning: { icon: 'pi pi-exclamation-triangle', severity: 'warn' },
  danger: { icon: 'pi pi-exclamation-circle', severity: 'danger' },
}

export function getVariantPresentation(variant: ConfirmVariant = 'default') {
  return variantPresentation[variant]
}

export type PrimeConfirmOptions = ConfirmationOptions & { variant: ConfirmVariant }
