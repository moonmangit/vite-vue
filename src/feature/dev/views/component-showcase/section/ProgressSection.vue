<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppProgressBar from '../../../../../shared/component/AppProgressBar.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
const modeVariants = computed(() => [
  { value: 'determinate', label: t('features.dev.progress.determinate') },
  { value: 'indeterminate', label: t('features.dev.progress.indeterminate') },
])
</script>

<template>
  <section id="progress" class="space-y-8" aria-labelledby="progress-title">
    <header class="space-y-1">
      <h2 id="progress-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.progress.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.progress.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle
        id="progress-mode"
        :title="t('features.dev.progress.modes')"
        :variants="modeVariants"
      >
        <template #determinate>
          <div class="space-y-4">
            <AppProgressBar :value="72" />
            <AppProgressBar :value="0" />
            <AppProgressBar :value="100" />
          </div>
        </template>
        <template #indeterminate>
          <AppProgressBar :value="0" mode="indeterminate" />
        </template>
      </ShowcaseArticle>

      <ShowcaseArticle id="progress-values" :title="t('features.dev.progress.values')">
        <div class="space-y-4">
          <AppProgressBar :value="35" />
          <div class="space-y-2">
            <span class="app-text-xs app-text-muted">{{
              t('features.dev.progress.hiddenValue')
            }}</span>
            <AppProgressBar :value="58" :show-value="false" />
          </div>
          <div class="space-y-2">
            <span class="app-text-xs app-text-muted">{{ t('features.dev.progress.loading') }}</span>
            <AppProgressBar :value="42" mode="indeterminate" />
          </div>
        </div>
      </ShowcaseArticle>
    </div>
  </section>
</template>
