<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StatusBadge from '../../../../../shared/component/StatusBadge.vue'
import AppBadge from '../../../../../shared/component/AppBadge.vue'
import AppTag from '../../../../../shared/component/AppTag.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })

function variants(entries: [string, string][]) {
  return computed(() => entries.map(([value, labelKey]) => ({ value, label: t(labelKey) })))
}

const numericVariants = variants([
  ['count', 'features.dev.variants.count'],
  ['dot', 'features.dev.variants.dot'],
])
</script>

<template>
  <section id="badge" class="space-y-8" aria-labelledby="badge-title">
    <header class="space-y-1">
      <h2 id="badge-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.badge.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.badge.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle id="badge-severity" :title="t('features.dev.badge.severities')">
        <div class="flex flex-wrap gap-2">
          <AppTag :value="t('features.dev.badge.info')" tone="info" />
          <AppTag :value="t('features.dev.badge.success')" tone="success" />
          <AppTag :value="t('features.dev.badge.warn')" tone="warning" />
          <AppTag :value="t('features.dev.badge.danger')" tone="danger" />
          <AppTag :value="t('features.dev.badge.secondary')" tone="secondary" />
          <AppTag :value="t('features.dev.badge.help')" tone="help" />
          <AppTag :value="t('features.dev.badge.contrast')" tone="contrast" />
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle
        id="badge-numeric"
        :title="t('features.dev.badge.numeric')"
        :variants="numericVariants"
      >
        <template #count>
          <div class="space-y-4">
            <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
              {{ t('features.dev.badge.notifications') }} <AppBadge value="8" tone="danger" />
            </span>
            <div class="flex flex-wrap gap-4">
              <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
                {{ t('features.dev.badge.info') }} <AppBadge value="1" tone="info" />
              </span>
              <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
                {{ t('features.dev.badge.success') }} <AppBadge value="2" tone="success" />
              </span>
              <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
                {{ t('features.dev.badge.warn') }} <AppBadge value="3" tone="warning" />
              </span>
              <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
                {{ t('features.dev.badge.secondary') }} <AppBadge value="4" tone="secondary" />
              </span>
              <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
                {{ t('features.dev.badge.contrast') }} <AppBadge value="5" tone="contrast" />
              </span>
            </div>
          </div>
        </template>
        <template #dot>
          <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
            {{ t('features.dev.badge.active') }} <AppBadge tone="success" />
          </span>
        </template>
      </ShowcaseArticle>

      <ShowcaseArticle id="badge-sizes" :title="t('features.dev.badge.sizes')">
        <div class="flex flex-wrap items-center gap-6">
          <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
            {{ t('features.dev.badge.normalSize') }} <AppBadge value="8" size="normal" />
          </span>
          <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
            {{ t('features.dev.badge.largeSize') }} <AppBadge value="8" size="large" />
          </span>
          <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
            {{ t('features.dev.badge.extraLargeSize') }} <AppBadge value="8" size="xlarge" />
          </span>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="badge-tag-appearance" :title="t('features.dev.badge.tagAppearance')">
        <div class="flex flex-wrap items-center gap-3">
          <AppTag :value="t('features.dev.badge.withIcon')" icon="pi pi-check" tone="success" />
          <AppTag :value="t('features.dev.badge.rounded')" icon="pi pi-bolt" tone="info" rounded />
          <AppTag tone="warning">{{ t('features.dev.badge.pending') }}</AppTag>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="badge-status" :title="t('features.dev.badge.shared')">
        <div class="flex flex-wrap gap-3">
          <StatusBadge status="active" />
          <StatusBadge status="pending" />
          <StatusBadge status="warning" />
          <StatusBadge status="error" />
          <StatusBadge status="success" />
          <StatusBadge status="inactive" />
        </div>
      </ShowcaseArticle>
    </div>
  </section>
</template>
