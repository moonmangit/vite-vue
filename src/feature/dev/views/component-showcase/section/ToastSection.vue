<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import { useAppToastSystem } from '../../../../../shared/toast/main'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
const toast = useAppToastSystem()
const persistentToastId = ref<string>()

function showBurst() {
  for (let index = 1; index <= 5; index += 1) {
    toast.info(t('features.dev.toast.burstTitle', { index }), {
      description: t('features.dev.toast.burstDescription'),
      duration: 6000,
    })
  }
}

function showPersistentToast() {
  persistentToastId.value = toast.info(t('features.dev.toast.persistentTitle'), {
    description: t('features.dev.toast.persistentDescription'),
    duration: false,
  })
}

function dismissPersistentToast() {
  if (!persistentToastId.value) return
  toast.dismiss(persistentToastId.value)
  persistentToastId.value = undefined
}
</script>

<template>
  <ShowcaseArticle
    id="toast-notifications"
    :title="t('features.dev.toast.title')"
    :subtitle="t('features.dev.toast.description')"
    icon="pi pi-bell"
  >
    <div class="space-y-6">
      <div class="space-y-3">
        <h3 class="app-text-sm app-text-normal font-semibold">
          {{ t('features.dev.toast.severities') }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <AppButton
            :label="t('features.dev.toast.success')"
            tone="success"
            icon="pi pi-check"
            @click="
              toast.success(t('features.dev.toast.successTitle'), {
                description: t('features.dev.toast.successDescription'),
              })
            "
          />
          <AppButton
            :label="t('features.dev.toast.info')"
            tone="info"
            icon="pi pi-info-circle"
            @click="
              toast.info(t('features.dev.toast.infoTitle'), {
                description: t('features.dev.toast.infoDescription'),
              })
            "
          />
          <AppButton
            :label="t('features.dev.toast.warning')"
            tone="warning"
            icon="pi pi-exclamation-triangle"
            @click="
              toast.warning(t('features.dev.toast.warningTitle'), {
                description: t('features.dev.toast.warningDescription'),
              })
            "
          />
          <AppButton
            :label="t('features.dev.toast.danger')"
            tone="danger"
            icon="pi pi-times-circle"
            @click="
              toast.danger(t('features.dev.toast.dangerTitle'), {
                description: t('features.dev.toast.dangerDescription'),
              })
            "
          />
          <AppButton
            :label="t('features.dev.toast.legacyCall')"
            tone="secondary"
            icon="pi pi-history"
            @click="
              toast.success(
                t('features.dev.toast.legacyTitle'),
                t('features.dev.toast.legacyDescription'),
                { life: 6000 },
              )
            "
          />
        </div>
      </div>

      <div class="space-y-3 border-t app-surface-border pt-5">
        <h3 class="app-text-sm app-text-normal font-semibold">
          {{ t('features.dev.toast.queueAndLifetime') }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <AppButton
            :label="t('features.dev.toast.showBurst')"
            icon="pi pi-clone"
            @click="showBurst"
          />
          <AppButton
            :label="t('features.dev.toast.showPersistent')"
            tone="secondary"
            appearance="outlined"
            icon="pi pi-thumbtack"
            @click="showPersistentToast"
          />
          <AppButton
            :label="t('features.dev.toast.dismissPersistent')"
            tone="secondary"
            appearance="outlined"
            icon="pi pi-times"
            :disabled="!persistentToastId"
            @click="dismissPersistentToast"
          />
          <AppButton
            :label="t('features.dev.toast.clearAll')"
            tone="danger"
            appearance="text"
            icon="pi pi-trash"
            @click="toast.clear"
          />
        </div>
        <p class="m-0 app-text-xs app-text-muted">
          {{ t('features.dev.toast.queueHint') }}
        </p>
      </div>
    </div>
  </ShowcaseArticle>
</template>
