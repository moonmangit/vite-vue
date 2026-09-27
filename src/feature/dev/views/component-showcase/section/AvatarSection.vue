<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppAvatar from '../../../../../shared/component/AppAvatar.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'
import avatarImage from '../../../../../shared/asset/hero.png'

const { t } = useI18n({ useScope: 'global' })
const sizes = ['small', 'normal', 'large', 'xlarge'] as const
</script>

<template>
  <section id="avatar" class="space-y-8" aria-labelledby="avatar-title">
    <header class="space-y-1">
      <h2 id="avatar-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.avatar.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.avatar.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle id="avatar-content" :title="t('features.dev.avatar.content')">
        <div class="flex flex-wrap items-center gap-6">
          <div class="grid justify-items-center gap-2">
            <AppAvatar
              :image="avatarImage"
              shape="circle"
              size="large"
              :aria-label="t('features.dev.avatar.image')"
            />
            <span class="app-text-xs app-text-muted">{{ t('features.dev.avatar.image') }}</span>
          </div>
          <div class="grid justify-items-center gap-2">
            <AppAvatar
              label="AM"
              shape="circle"
              size="large"
              :aria-label="t('features.dev.avatar.personName')"
            />
            <span class="app-text-xs app-text-muted">{{ t('features.dev.avatar.initials') }}</span>
          </div>
          <div class="grid justify-items-center gap-2">
            <AppAvatar
              icon="pi pi-user"
              shape="circle"
              size="large"
              :aria-label="t('features.dev.avatar.icon')"
            />
            <span class="app-text-xs app-text-muted">{{ t('features.dev.avatar.icon') }}</span>
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="avatar-shape" :title="t('features.dev.avatar.shapes')">
        <div class="flex flex-wrap items-center gap-6">
          <div class="grid justify-items-center gap-2">
            <AppAvatar
              label="AM"
              shape="circle"
              size="large"
              :aria-label="t('features.dev.avatar.circle')"
            />
            <span class="app-text-xs app-text-muted">{{ t('features.dev.avatar.circle') }}</span>
          </div>
          <div class="grid justify-items-center gap-2">
            <AppAvatar
              label="AM"
              shape="square"
              size="large"
              :aria-label="t('features.dev.avatar.square')"
            />
            <span class="app-text-xs app-text-muted">{{ t('features.dev.avatar.square') }}</span>
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="avatar-size" :title="t('features.dev.avatar.sizes')">
        <div class="flex flex-wrap items-end gap-6">
          <div v-for="size in sizes" :key="size" class="grid justify-items-center gap-2">
            <AppAvatar
              :label="size === 'normal' ? 'AM' : undefined"
              icon="pi pi-user"
              :size="size"
              shape="circle"
              :aria-label="t(`features.dev.variants.${size}`)"
            />
            <span class="app-text-xs app-text-muted">{{ t(`features.dev.variants.${size}`) }}</span>
          </div>
        </div>
      </ShowcaseArticle>
    </div>
  </section>
</template>
