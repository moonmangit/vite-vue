<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StatCard from '../../../../../shared/component/StatCard.vue'
import StatusBadge from '../../../../../shared/component/StatusBadge.vue'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="space-y-5">
    <header>
      <h2 class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.card.title') }}
      </h2>
      <p class="mt-1 app-text-sm app-text-muted">
        {{ t('features.dev.card.description') }}
      </p>
    </header>

    <div class="grid gap-4 lg:grid-cols-2">
      <AppCard>
        <template #title>{{ t('features.dev.card.basic') }}</template>
        <template #content>
          <p class="m-0 app-text-sm app-text-muted">
            {{ t('features.dev.card.basicContent') }}
          </p>
        </template>
      </AppCard>

      <AppCard>
        <template #title>{{ t('features.dev.card.withHeader') }}</template>
        <template #subtitle>
          <span class="inline-flex items-center gap-2">
            {{ t('features.dev.card.systemStatus') }}
            <StatusBadge status="active" />
          </span>
        </template>
        <template #content>
          <p class="m-0 app-text-sm app-text-muted">
            {{ t('features.dev.card.headerContent') }}
          </p>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <AppButton
              :label="t('features.dev.card.footerAction')"
              size="small"
              appearance="outlined"
            />
          </div>
        </template>
      </AppCard>
    </div>

    <section class="space-y-3">
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.card.shared') }}
      </h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <StatCard
          :title="t('features.dev.card.systemStatus')"
          value="99.98%"
          trend="+0.12%"
          trend-type="up"
          icon="pi pi-shield"
          :subtitle="t('features.dev.card.allSystemsNormal')"
        />
        <StatCard
          :title="t('features.dev.card.status')"
          :value="t('features.dev.badge.active')"
          badge-text="LIVE"
          :subtitle="t('features.dev.card.allSystemsNormal')"
        />
      </div>
    </section>
  </div>
</template>
