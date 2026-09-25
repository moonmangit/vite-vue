<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
</script>

<template>
  <div class="space-y-5">
    <header>
      <h2 class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.typography.title') }}
      </h2>
      <p class="app-text-sm app-text-muted mt-1">
        {{ t('features.dev.typography.description') }}
      </p>
    </header>

    <section
      class="space-y-4 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-md app-text-normal font-semibold">
        {{ t('features.dev.typography.sizes') }}
      </h3>
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
    </section>

    <section
      class="space-y-4 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-md app-text-normal font-semibold">
        {{ t('features.dev.typography.tones') }}
      </h3>
      <p class="app-text-md app-text-normal">{{ t('features.dev.typography.normal') }}</p>
      <p class="app-text-md app-text-muted">{{ t('features.dev.typography.muted') }}</p>
      <p class="app-text-md app-text-disabled">{{ t('features.dev.typography.disabled') }}</p>
    </section>

    <section
      class="space-y-4 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-md app-text-normal font-semibold">
        {{ t('features.dev.typography.customSizes') }}
      </h3>
      <p class="app-text-md app-text-normal" style="--app-font-size: 18px">
        {{ t('features.dev.typography.pixels') }}
      </p>
      <p class="app-text-md app-text-normal" style="--app-font-size: 1.125rem">
        {{ t('features.dev.typography.rems') }}
      </p>
      <p class="app-text-md app-text-normal" style="--app-font-size: 1.1em">
        {{ t('features.dev.typography.ems') }}
      </p>
    </section>

    <section
      class="space-y-3 rounded-xl border border-slate-200 bg-white p-4 app-dark:border-zinc-800 app-dark:bg-zinc-900"
    >
      <h3 class="app-text-md app-text-normal font-semibold">
        {{ t('features.dev.typography.semanticColors') }}
      </h3>
      <p class="app-text-sm text-primary-600">{{ t('features.dev.typography.primary') }}</p>
      <p class="app-text-sm text-emerald-600 app-dark:text-emerald-400">
        {{ t('features.dev.typography.status') }}
      </p>
    </section>
  </div>
</template>
