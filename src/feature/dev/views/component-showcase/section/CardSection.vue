<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StatCard from '../../../../../shared/component/StatCard.vue'
import StatusBadge from '../../../../../shared/component/StatusBadge.vue'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
const cardVariants = computed(() => [
  { value: 'blank', label: t('features.dev.variants.blank') },
  { value: 'full', label: t('features.dev.variants.full') },
])
</script>

<template>
  <section id="card" class="space-y-8" aria-labelledby="card-title">
    <header class="space-y-1">
      <h2 id="card-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.card.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.card.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle
        id="card-variants"
        :title="t('features.dev.card.variants')"
        :variants="cardVariants"
        :card="false"
      >
        <template #blank>
          <AppCard variant="blank">
            <p class="m-0 app-text-sm app-text-muted">{{ t('features.dev.card.basicContent') }}</p>
          </AppCard>
        </template>
        <template #full>
          <AppCard variant="full">
            <template #title>{{ t('features.dev.card.withHeader') }}</template>
            <template #header-icon>
              <i class="pi pi-chart-line app-text-muted" aria-hidden="true" />
            </template>
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
        </template>
      </ShowcaseArticle>

      <ShowcaseArticle id="card-stat" :title="t('features.dev.card.shared')" :card="false">
        <div class="grid gap-4 sm:grid-cols-2">
          <StatCard
            variant="full"
            :title="t('features.dev.card.systemStatus')"
            value="99.98%"
            trend="+0.12%"
            trend-type="up"
            icon="pi pi-shield"
            :subtitle="t('features.dev.card.allSystemsNormal')"
          />
          <StatCard
            variant="full"
            :title="t('features.dev.card.status')"
            :value="t('features.dev.badge.active')"
            :badge-text="t('features.dev.card.liveBadge')"
            :subtitle="t('features.dev.card.allSystemsNormal')"
          />
        </div>
      </ShowcaseArticle>
    </div>
  </section>
</template>
