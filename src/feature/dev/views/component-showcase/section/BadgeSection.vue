<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StatusBadge from '../../../../../shared/component/StatusBadge.vue'
import AppBadge from '../../../../../shared/component/AppBadge.vue'
import AppTag from '../../../../../shared/component/AppTag.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="space-y-5">
    <header>
      <h2 class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.badge.title') }}
      </h2>
      <p class="mt-1 app-text-sm app-text-muted">
        {{ t('features.dev.badge.description') }}
      </p>
    </header>

    <AppCard variant="compact">
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.badge.severities') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <AppTag :value="t('features.dev.badge.info')" tone="info" />
        <AppTag :value="t('features.dev.badge.success')" tone="success" />
        <AppTag :value="t('features.dev.badge.warn')" tone="warning" />
        <AppTag :value="t('features.dev.badge.danger')" tone="danger" />
        <AppTag :value="t('features.dev.badge.secondary')" tone="secondary" />
        <AppTag :value="t('features.dev.badge.contrast')" tone="contrast" />
      </div>
    </AppCard>

    <AppCard variant="compact">
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.badge.numeric') }}
      </h3>
      <div class="flex flex-wrap items-center gap-8">
        <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
          {{ t('features.dev.badge.notifications') }}
          <AppBadge value="8" tone="danger" />
        </span>
        <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
          {{ t('features.dev.badge.active') }}
          <AppBadge tone="success" />
        </span>
        <span class="inline-flex items-center gap-2 app-text-sm app-text-normal">
          {{ t('features.dev.badge.pending') }}
          <AppBadge value="2" tone="warning" />
        </span>
      </div>
    </AppCard>

    <AppCard variant="compact">
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.badge.shared') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <StatusBadge status="active" />
        <StatusBadge status="pending" />
        <StatusBadge status="inactive" />
      </div>
    </AppCard>
  </div>
</template>
