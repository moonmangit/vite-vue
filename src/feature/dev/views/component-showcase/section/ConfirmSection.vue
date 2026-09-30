<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import { useAppConfirm, type ConfirmVariant } from '../../../../../shared/confirm/main'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
const confirm = useAppConfirm()
const lastResult = ref('')

async function ask(variant: ConfirmVariant) {
  lastResult.value = ''
  const accepted = await confirm.ask(
    {
      header: t('features.dev.confirm.dialogHeader'),
      message: t('features.dev.confirm.question'),
      variant,
      acceptLabel: variant === 'danger' ? t('features.dev.confirm.delete') : undefined,
    },
    async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 500))
      lastResult.value = t('features.dev.confirm.accepted')
    },
  )

  if (!accepted) lastResult.value = t('features.dev.confirm.rejected')
}
</script>

<template>
  <section id="confirm-usage" class="space-y-8" aria-labelledby="confirm-usage-title">
    <header class="space-y-1">
      <h2 id="confirm-usage-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.confirm.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.confirm.description') }}</p>
    </header>

    <ShowcaseArticle id="confirm-variants" :title="t('features.dev.confirm.variants')">
      <p class="m-0 mb-4 app-text-sm app-text-muted">
        {{ t('features.dev.confirm.asyncDescription') }}
      </p>
      <div class="flex flex-wrap gap-3">
        <AppButton :label="t('features.dev.confirm.defaultAction')" @click="ask('default')" />
        <AppButton
          :label="t('features.dev.confirm.dangerAction')"
          tone="danger"
          @click="ask('danger')"
        />
      </div>
      <p v-if="lastResult" class="mb-0 mt-4 app-text-sm app-text-muted" role="status">
        {{ lastResult }}
      </p>
    </ShowcaseArticle>
  </section>
</template>
