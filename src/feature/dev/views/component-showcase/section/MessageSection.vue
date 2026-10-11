<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppMessage from '../../../../../shared/component/AppMessage.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section id="message" class="space-y-8" aria-labelledby="message-title">
    <header class="space-y-1">
      <h2 id="message-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.message.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.message.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle id="message-severity" :title="t('features.dev.message.severities')">
        <div class="grid gap-3 md:grid-cols-2">
          <AppMessage severity="success">{{ t('features.dev.message.success') }}</AppMessage>
          <AppMessage severity="info">{{ t('features.dev.message.info') }}</AppMessage>
          <AppMessage severity="warn">{{ t('features.dev.message.warning') }}</AppMessage>
          <AppMessage severity="error">{{ t('features.dev.message.error') }}</AppMessage>
          <AppMessage severity="secondary">{{ t('features.dev.message.secondary') }}</AppMessage>
          <AppMessage severity="contrast">{{ t('features.dev.message.contrast') }}</AppMessage>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="message-appearance" :title="t('features.dev.message.variants')">
        <div class="grid gap-3 md:grid-cols-2">
          <div class="space-y-2">
            <span class="app-text-xs app-text-muted">{{ t('features.dev.message.simple') }}</span>
            <AppMessage severity="info" variant="simple">{{
              t('features.dev.message.info')
            }}</AppMessage>
          </div>
          <div class="space-y-2">
            <span class="app-text-xs app-text-muted">{{ t('features.dev.message.outlined') }}</span>
            <AppMessage severity="info" variant="outlined">{{
              t('features.dev.message.info')
            }}</AppMessage>
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="message-state" :title="t('features.dev.message.states')">
        <div class="grid gap-3 md:grid-cols-2">
          <div class="space-y-2">
            <span class="app-text-xs app-text-muted">{{ t('features.dev.message.small') }}</span>
            <AppMessage severity="success" size="small">{{
              t('features.dev.message.success')
            }}</AppMessage>
          </div>
          <div class="space-y-2">
            <span class="app-text-xs app-text-muted">{{ t('features.dev.message.large') }}</span>
            <AppMessage severity="warn" size="large">{{
              t('features.dev.message.warning')
            }}</AppMessage>
          </div>
          <div class="space-y-2">
            <span class="app-text-xs app-text-muted">{{ t('features.dev.message.closable') }}</span>
            <AppMessage severity="info" closable>{{ t('features.dev.message.info') }}</AppMessage>
          </div>
        </div>
      </ShowcaseArticle>
    </div>
  </section>
</template>
