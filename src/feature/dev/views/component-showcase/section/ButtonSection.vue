<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
const isLoading = ref(true)
const submitted = ref(false)

function submitDemo() {
  submitted.value = true
}

function resetDemo() {
  submitted.value = false
}

function variants(entries: [string, string][]) {
  return computed(() => entries.map(([value, labelKey]) => ({ value, label: t(labelKey) })))
}

const styleVariants = variants([
  ['solid', 'features.dev.variants.default'],
  ['outlined', 'features.dev.button.outlined'],
  ['text', 'features.dev.button.text'],
  ['link', 'features.dev.button.link'],
  ['raised', 'features.dev.variants.raised'],
])
</script>

<template>
  <section id="button" class="space-y-8" aria-labelledby="button-title">
    <header class="space-y-1">
      <h2 id="button-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.button.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.button.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle id="button-severity" :title="t('features.dev.button.severities')">
        <div class="flex flex-wrap gap-3">
          <AppButton :label="t('features.dev.button.primary')" />
          <AppButton :label="t('features.dev.button.secondary')" tone="secondary" />
          <AppButton :label="t('features.dev.button.success')" tone="success" />
          <AppButton :label="t('features.dev.button.info')" tone="info" />
          <AppButton :label="t('features.dev.button.warn')" tone="warning" />
          <AppButton :label="t('features.dev.button.danger')" tone="danger" />
          <AppButton :label="t('features.dev.button.help')" tone="help" />
          <AppButton :label="t('features.dev.button.contrast')" tone="contrast" />
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle
        id="button-style"
        :title="t('features.dev.button.styles')"
        :variants="styleVariants"
      >
        <template #solid><AppButton :label="t('features.dev.button.primary')" /></template>
        <template #outlined
          ><AppButton :label="t('features.dev.button.outlined')" appearance="outlined"
        /></template>
        <template #text
          ><AppButton :label="t('features.dev.button.text')" appearance="text"
        /></template>
        <template #link
          ><AppButton :label="t('features.dev.button.link')" appearance="link"
        /></template>
        <template #raised
          ><AppButton :label="t('features.dev.button.primary')" raised rounded
        /></template>
      </ShowcaseArticle>

      <ShowcaseArticle id="button-icon" :title="t('features.dev.button.iconVariants')">
        <div class="flex flex-wrap items-center gap-3">
          <AppButton icon="pi pi-save" :label="t('features.dev.button.iconLeft')" />
          <AppButton
            icon="pi pi-arrow-right"
            icon-position="right"
            :label="t('features.dev.button.iconRight')"
          />
          <AppButton
            icon="pi pi-angle-up"
            icon-position="top"
            :label="t('features.dev.button.iconTop')"
          />
          <AppButton
            icon="pi pi-angle-down"
            icon-position="bottom"
            :label="t('features.dev.button.iconBottom')"
          />
          <AppButton icon="pi pi-check" rounded :aria-label="t('features.dev.button.confirm')" />
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="button-size" :title="t('features.dev.button.sizeVariants')">
        <div class="flex flex-wrap items-center gap-3">
          <AppButton :label="t('features.dev.button.small')" size="small" />
          <AppButton :label="t('features.dev.button.normal')" />
          <AppButton :label="t('features.dev.button.large')" size="large" />
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="button-layout" :title="t('features.dev.button.layout')">
        <AppButton :label="t('features.dev.button.fluid')" fluid />
      </ShowcaseArticle>

      <ShowcaseArticle id="button-state" :title="t('features.dev.button.states')">
        <div class="flex flex-wrap items-center gap-3">
          <AppButton :label="t('features.dev.variants.enabled')" />
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
        <form
          class="mt-4 flex flex-wrap items-center gap-3"
          @submit.prevent="submitDemo"
          @reset="resetDemo"
        >
          <AppButton type="submit" :label="t('features.dev.button.submit')" />
          <AppButton
            type="reset"
            :label="t('features.dev.button.reset')"
            tone="secondary"
            appearance="outlined"
          />
          <span v-if="submitted" role="status" class="app-text-sm app-text-muted">
            {{ t('features.dev.button.submitted') }}
          </span>
        </form>
      </ShowcaseArticle>
    </div>
  </section>
</template>
