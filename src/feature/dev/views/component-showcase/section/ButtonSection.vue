<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'

const { t } = useI18n({ useScope: 'global' })
const isLoading = ref(false)
</script>

<template>
  <div class="space-y-5">
    <header>
      <h2 class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.button.title') }}
      </h2>
      <p class="mt-1 app-text-sm app-text-muted">
        {{ t('features.dev.button.description') }}
      </p>
    </header>

    <section
      class="space-y-3 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.button.severities') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <AppButton :label="t('features.dev.button.primary')" />
        <AppButton :label="t('features.dev.button.secondary')" tone="secondary" />
        <AppButton :label="t('features.dev.button.success')" tone="success" />
        <AppButton :label="t('features.dev.button.info')" tone="info" />
        <AppButton :label="t('features.dev.button.warn')" tone="warning" />
        <AppButton :label="t('features.dev.button.danger')" tone="danger" />
        <AppButton :label="t('features.dev.button.contrast')" tone="contrast" />
      </div>
    </section>

    <section
      class="space-y-3 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.button.styles') }}
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <AppButton :label="t('features.dev.button.outlined')" appearance="outlined" />
        <AppButton :label="t('features.dev.button.text')" appearance="text" />
        <AppButton :label="t('features.dev.button.link')" appearance="link" />
        <AppButton :label="t('features.dev.button.primary')" raised rounded />
      </div>
    </section>

    <section
      class="space-y-3 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.button.icons') }}
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <AppButton icon="pi pi-save" :label="t('features.dev.button.iconLeft')" />
        <AppButton
          icon="pi pi-arrow-right"
          icon-position="right"
          :label="t('features.dev.button.iconRight')"
        />
        <AppButton icon="pi pi-check" rounded :aria-label="t('features.dev.button.confirm')" />
        <AppButton :label="t('features.dev.button.small')" size="small" />
        <AppButton :label="t('features.dev.button.normal')" />
        <AppButton :label="t('features.dev.button.large')" size="large" />
      </div>
    </section>

    <section
      class="space-y-3 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.button.states') }}
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <AppButton
          :label="t('features.dev.button.loading')"
          icon="pi pi-sync"
          :loading="isLoading"
        />
        <AppButton
          :label="t('features.dev.button.toggleLoading')"
          tone="secondary"
          appearance="outlined"
          @click="isLoading = !isLoading"
        />
        <AppButton :label="t('features.dev.button.disabled')" disabled />
      </div>
    </section>
  </div>
</template>
