<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'
import AppDialog from '../../../../../shared/component/AppDialog.vue'
import AppInputText from '../../../../../shared/component/AppInputText.vue'

const { t } = useI18n({ useScope: 'global' })
const basicVisible = ref(false)
const formVisible = ref(false)
const confirmVisible = ref(false)
const maximizableVisible = ref(false)
const projectName = ref('')
const lastAction = ref('')

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
  <div class="space-y-5">
    <header>
      <h2 class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.dialog.title') }}
      </h2>
      <p class="mt-1 app-text-sm app-text-muted">
        {{ t('features.dev.dialog.description') }}
      </p>
    </header>

    <p
      v-if="lastAction"
      role="status"
      class="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 app-text-sm text-emerald-800 app-dark:border-emerald-900 app-dark:bg-emerald-950/40 app-dark:text-emerald-300"
    >
      {{ lastAction }}
    </p>

    <div class="grid gap-4 md:grid-cols-2">
      <AppCard variant="compact">
        <div>
          <h3 class="app-text-sm app-text-normal font-semibold">
            {{ t('features.dev.dialog.basic') }}
          </h3>
          <p class="mt-1 app-text-sm app-text-muted">
            {{ t('features.dev.dialog.basicDescription') }}
          </p>
        </div>
        <AppButton :label="t('features.dev.dialog.openBasic')" @click="basicVisible = true" />
      </AppCard>

      <AppCard variant="compact">
        <div>
          <h3 class="app-text-sm app-text-normal font-semibold">
            {{ t('features.dev.dialog.form') }}
          </h3>
          <p class="mt-1 app-text-sm app-text-muted">
            {{ t('features.dev.dialog.formDescription') }}
          </p>
        </div>
        <AppButton :label="t('features.dev.dialog.openForm')" @click="formVisible = true" />
      </AppCard>

      <AppCard variant="compact">
        <div>
          <h3 class="app-text-sm app-text-normal font-semibold">
            {{ t('features.dev.dialog.confirm') }}
          </h3>
          <p class="mt-1 app-text-sm app-text-muted">
            {{ t('features.dev.dialog.confirmDescription') }}
          </p>
        </div>
        <AppButton
          :label="t('features.dev.dialog.openConfirm')"
          tone="danger"
          appearance="outlined"
          @click="confirmVisible = true"
        />
      </AppCard>

      <AppCard variant="compact">
        <div>
          <h3 class="app-text-sm app-text-normal font-semibold">
            {{ t('features.dev.dialog.maximizable') }}
          </h3>
          <p class="mt-1 app-text-sm app-text-muted">
            {{ t('features.dev.dialog.maximizableDescription') }}
          </p>
        </div>
        <AppButton
          :label="t('features.dev.dialog.openMaximizable')"
          tone="secondary"
          @click="maximizableVisible = true"
        />
      </AppCard>
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
      <template #footer>
        <AppButton
          :label="t('features.dev.dialog.close')"
          tone="secondary"
          appearance="text"
          @click="basicVisible = false"
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
  </div>
</template>
