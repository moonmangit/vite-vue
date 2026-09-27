<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppDialog from '../../../../../shared/component/AppDialog.vue'
import AppInputText from '../../../../../shared/component/AppInputText.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'

const { t } = useI18n({ useScope: 'global' })
const basicVisible = ref(false)
const basicFooterVisible = ref(false)
const formVisible = ref(false)
const confirmVisible = ref(false)
const maximizableVisible = ref(false)
const optionsVisible = ref(false)
const modelessVisible = ref(false)
const projectName = ref('')
const lastAction = ref('')

function variants(entries: [string, string][]) {
  return computed(() => entries.map(([value, labelKey]) => ({ value, label: t(labelKey) })))
}

const basicVariants = variants([
  ['plain', 'features.dev.variants.default'],
  ['footer', 'features.dev.variants.withFooter'],
])
function saveProject() {
  lastAction.value = t('features.dev.dialog.saved')
  projectName.value = ''
  formVisible.value = false
}

function deleteProject() {
  lastAction.value = t('features.dev.dialog.deleted')
  confirmVisible.value = false
}
</script>

<template>
  <section id="dialog" class="space-y-8" aria-labelledby="dialog-title">
    <header class="space-y-1">
      <h2 id="dialog-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.dialog.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.dialog.description') }}</p>
    </header>

    <p
      v-if="lastAction"
      role="status"
      class="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 app-text-sm text-emerald-800 app-dark:border-emerald-900 app-dark:bg-emerald-950/40 app-dark:text-emerald-300"
    >
      {{ lastAction }}
    </p>

    <div class="space-y-8">
      <ShowcaseArticle
        id="dialog-basic"
        :title="t('features.dev.dialog.basic')"
        :variants="basicVariants"
      >
        <template #plain>
          <p class="m-0 mb-4 app-text-sm app-text-muted">
            {{ t('features.dev.dialog.basicDescription') }}
          </p>
          <AppButton :label="t('features.dev.dialog.openBasic')" @click="basicVisible = true" />
        </template>
        <template #footer>
          <p class="m-0 mb-4 app-text-sm app-text-muted">
            {{ t('features.dev.dialog.basicDescription') }}
          </p>
          <AppButton
            :label="t('features.dev.variants.withFooter')"
            @click="basicFooterVisible = true"
          />
        </template>
      </ShowcaseArticle>

      <ShowcaseArticle id="dialog-form" :title="t('features.dev.dialog.form')">
        <p class="m-0 mb-4 app-text-sm app-text-muted">
          {{ t('features.dev.dialog.formDescription') }}
        </p>
        <AppButton :label="t('features.dev.dialog.openForm')" @click="formVisible = true" />
      </ShowcaseArticle>

      <ShowcaseArticle id="dialog-confirm" :title="t('features.dev.dialog.confirm')">
        <p class="m-0 mb-4 app-text-sm app-text-muted">
          {{ t('features.dev.dialog.confirmDescription') }}
        </p>
        <AppButton
          :label="t('features.dev.dialog.openConfirm')"
          tone="secondary"
          appearance="outlined"
          @click="confirmVisible = true"
        />
      </ShowcaseArticle>

      <ShowcaseArticle id="dialog-maximizable" :title="t('features.dev.dialog.maximizable')">
        <p class="m-0 mb-4 app-text-sm app-text-muted">
          {{ t('features.dev.dialog.maximizableDescription') }}
        </p>
        <AppButton
          :label="t('features.dev.dialog.openMaximizable')"
          tone="secondary"
          @click="maximizableVisible = true"
        />
      </ShowcaseArticle>

      <ShowcaseArticle id="dialog-options" :title="t('features.dev.dialog.options')">
        <p class="m-0 mb-4 app-text-sm app-text-muted">
          {{ t('features.dev.dialog.optionsDescription') }}
        </p>
        <div class="flex flex-wrap gap-3">
          <AppButton :label="t('features.dev.dialog.openOptions')" @click="optionsVisible = true" />
          <AppButton
            :label="t('features.dev.dialog.openModeless')"
            tone="secondary"
            appearance="outlined"
            @click="modelessVisible = true"
          />
        </div>
      </ShowcaseArticle>
    </div>

    <AppDialog
      v-model="basicVisible"
      :header="t('features.dev.dialog.basic')"
      width="32rem"
      :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
    >
      <p class="m-0 app-text-sm app-text-muted leading-6">
        {{ t('features.dev.dialog.basicContent') }}
      </p>
    </AppDialog>

    <AppDialog
      v-model="basicFooterVisible"
      :header="t('features.dev.dialog.basic')"
      width="32rem"
      :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
    >
      <p class="m-0 app-text-sm app-text-muted leading-6">
        {{ t('features.dev.dialog.basicContent') }}
      </p>
      <template #footer>
        <AppButton
          :label="t('features.dev.dialog.close')"
          tone="secondary"
          appearance="text"
          @click="basicFooterVisible = false"
        />
      </template>
    </AppDialog>

    <AppDialog
      v-model="formVisible"
      :header="t('features.dev.dialog.formHeader')"
      width="30rem"
      :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
    >
      <form class="space-y-2" @submit.prevent="saveProject">
        <label for="showcase-project-name" class="app-text-sm app-text-normal font-medium">
          {{ t('features.dev.dialog.projectName') }}
        </label>
        <AppInputText
          id="showcase-project-name"
          v-model="projectName"
          :placeholder="t('features.dev.dialog.projectPlaceholder')"
          autofocus
          fluid
        />
        <div class="flex justify-end gap-2 pt-3">
          <AppButton
            type="button"
            :label="t('features.dev.dialog.cancel')"
            tone="secondary"
            appearance="text"
            @click="formVisible = false"
          />
          <AppButton
            type="submit"
            :label="t('features.dev.dialog.save')"
            :disabled="!projectName.trim()"
          />
        </div>
      </form>
    </AppDialog>

    <AppDialog
      v-model="confirmVisible"
      :header="t('features.dev.dialog.confirmHeader')"
      width="28rem"
      :breakpoints="{ '640px': '95vw' }"
    >
      <p class="m-0 app-text-sm app-text-muted leading-6">
        {{ t('features.dev.dialog.confirmContent') }}
      </p>
      <template #footer>
        <AppButton
          :label="t('features.dev.dialog.cancel')"
          tone="secondary"
          appearance="text"
          @click="confirmVisible = false"
        />
        <AppButton :label="t('features.dev.dialog.delete')" tone="danger" @click="deleteProject" />
      </template>
    </AppDialog>

    <AppDialog
      v-model="maximizableVisible"
      maximizable
      :header="t('features.dev.dialog.maximizableHeader')"
      width="50rem"
      :breakpoints="{ '1199px': '75vw', '640px': '95vw' }"
    >
      <p class="m-0 app-text-sm app-text-muted leading-6">
        {{ t('features.dev.dialog.maximizableContent') }}
      </p>
    </AppDialog>

    <AppDialog
      v-model="optionsVisible"
      :header="t('features.dev.dialog.options')"
      width="32rem"
      :closable="false"
      :close-on-escape="false"
      dismissable-mask
      draggable
      :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
    >
      <p class="m-0 mb-4 app-text-sm app-text-muted leading-6">
        {{ t('features.dev.dialog.optionsDescription') }}
      </p>
      <AppButton :label="t('features.dev.dialog.closeOptions')" @click="optionsVisible = false" />
    </AppDialog>

    <AppDialog
      v-model="modelessVisible"
      :header="t('features.dev.dialog.modeless')"
      :modal="false"
      width="28rem"
      :breakpoints="{ '640px': '95vw' }"
    >
      <p class="m-0 app-text-sm app-text-muted leading-6">
        {{ t('features.dev.dialog.modelessContent') }}
      </p>
      <template #footer>
        <AppButton
          :label="t('features.dev.dialog.close')"
          tone="secondary"
          appearance="text"
          @click="modelessVisible = false"
        />
      </template>
    </AppDialog>
  </section>
</template>
