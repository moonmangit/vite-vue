<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
</script>

<template>
  <section id="typography" class="space-y-8" aria-labelledby="typography-title">
    <header class="space-y-1">
      <h2 id="typography-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.typography.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.typography.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle id="typography-size" :title="t('features.dev.typography.sizes')">
        <div class="space-y-3">
          <p
            v-for="size in sizes"
            :key="size"
            :class="[`app-text-${size}`, 'app-text-normal', 'leading-normal']"
          >
            <code class="app-text-xs app-text-muted mr-3">{{ `app-text-${size}` }}</code>
            {{ t('features.dev.typography.sample') }}
          </p>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="typography-tone" :title="t('features.dev.typography.tones')">
        <div class="space-y-3">
          <p class="m-0 app-text-md app-text-normal">{{ t('features.dev.typography.normal') }}</p>
          <p class="m-0 app-text-md app-text-muted">{{ t('features.dev.typography.muted') }}</p>
          <p class="m-0 app-text-md app-text-disabled">
            {{ t('features.dev.typography.disabled') }}
          </p>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="typography-custom" :title="t('features.dev.typography.customSizes')">
        <div class="space-y-3">
          <p class="m-0 app-text-md app-text-normal" style="--app-font-size: 18px">
            {{ t('features.dev.typography.pixels') }}
          </p>
          <p class="m-0 app-text-md app-text-normal" style="--app-font-size: 1.125rem">
            {{ t('features.dev.typography.rems') }}
          </p>
          <p class="m-0 app-text-md app-text-normal" style="--app-font-size: 1.1em">
            {{ t('features.dev.typography.ems') }}
          </p>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="typography-color" :title="t('features.dev.typography.semanticColors')">
        <div class="flex flex-wrap gap-4">
          <p class="m-0 app-text-sm text-primary-600">{{ t('features.dev.typography.primary') }}</p>
          <p class="m-0 app-text-sm text-emerald-600 app-dark:text-emerald-400">
            {{ t('features.dev.typography.status') }}
          </p>
        </div>
      </ShowcaseArticle>
    </div>
  </section>
</template>
