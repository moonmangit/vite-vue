<script setup lang="ts">
import PrimeConfirmDialog from 'primevue/confirmdialog'
import { onConfirmDialogAfterLeave } from '../composable/useAppConfirm'
import type { ConfirmVariant, PrimeConfirmOptions } from '../store/main'

const iconTone: Record<ConfirmVariant, string> = {
  default: 'bg-primary-100 text-primary-700 app-dark:bg-primary-900/40 app-dark:text-primary-300',
  info: 'bg-blue-100 text-blue-700 app-dark:bg-blue-900/40 app-dark:text-blue-300',
  success: 'bg-emerald-100 text-emerald-700 app-dark:bg-emerald-900/40 app-dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 app-dark:bg-amber-900/40 app-dark:text-amber-300',
  danger: 'bg-red-100 text-red-700 app-dark:bg-red-900/40 app-dark:text-red-300',
}
</script>

<template>
  <PrimeConfirmDialog :pt="{ transition: { onAfterLeave: onConfirmDialogAfterLeave } }">
    <template #message="{ message }">
      <div class="flex items-center gap-3">
        <span
          class="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full"
          :class="iconTone[(message as PrimeConfirmOptions).variant]"
          aria-hidden="true"
        >
          <i :class="(message as PrimeConfirmOptions).icon" />
        </span>
        <p class="m-0 app-text-sm app-text-normal leading-6">{{ message.message }}</p>
      </div>
    </template>
  </PrimeConfirmDialog>
</template>
