<script setup lang="ts">
import { computed, onBeforeUnmount, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'
import AppCheckbox from '../../../../../shared/component/AppCheckbox.vue'
import AppFileUpload from '../../../../../shared/component/AppFileUpload.vue'
import AppInputNumber from '../../../../../shared/component/AppInputNumber.vue'
import AppInputText from '../../../../../shared/component/AppInputText.vue'
import AppMultiSelect from '../../../../../shared/component/AppMultiSelect.vue'
import AppPassword from '../../../../../shared/component/AppPassword.vue'
import AppRadioButton from '../../../../../shared/component/AppRadioButton.vue'
import AppSelect from '../../../../../shared/component/AppSelect.vue'
import AppTextarea from '../../../../../shared/component/AppTextarea.vue'
import AppToggleSwitch from '../../../../../shared/component/AppToggleSwitch.vue'

const { t, locale } = useI18n({ useScope: 'global' })
const form = reactive({
  name: '',
  email: 'invalid-email',
  password: '',
  description: '',
  environment: null as string | null,
  teams: [] as string[],
  search: '',
  quantity: 12 as number | null,
  amount: 1250 as number | null,
  notifications: true,
  permissions: ['read'] as string[],
  maintenanceMode: false,
  plan: 'growth',
})
const imagePreviews = new Map<File, string>()

const currencyLocale = computed(() => (locale.value === 'th' ? 'th-TH' : 'en-US'))
const environments = computed(() => [
  { label: t('features.dev.input.production'), value: 'production' },
  { label: t('features.dev.input.staging'), value: 'staging' },
  { label: t('features.dev.input.development'), value: 'development' },
])
const teams = computed(() => [
  { label: t('features.dev.input.teams.platform'), value: 'platform' },
  { label: t('features.dev.input.teams.design'), value: 'design' },
  { label: t('features.dev.input.teams.operations'), value: 'operations' },
])
const plans = [
  { labelKey: 'features.dev.input.starterPlan', value: 'starter' },
  { labelKey: 'features.dev.input.growthPlan', value: 'growth' },
  { labelKey: 'features.dev.input.enterprisePlan', value: 'enterprise' },
]

function rememberImagePreviews(event: { files: File[] }) {
  for (const file of event.files) {
    if (file.type.startsWith('image/') && !imagePreviews.has(file)) {
      imagePreviews.set(file, URL.createObjectURL(file))
    }
  }
}

function removeImage(file: File, index: number, removeFileCallback: (index: number) => void) {
  const preview = imagePreviews.get(file)
  if (preview) URL.revokeObjectURL(preview)
  imagePreviews.delete(file)
  removeFileCallback(index)
}

function clearImages(clearCallback: () => void) {
  for (const preview of imagePreviews.values()) URL.revokeObjectURL(preview)
  imagePreviews.clear()
  clearCallback()
}

onBeforeUnmount(() => {
  for (const preview of imagePreviews.values()) URL.revokeObjectURL(preview)
  imagePreviews.clear()
})
</script>

<template>
  <div class="space-y-5">
    <header>
      <h2 class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.input.title') }}
      </h2>
      <p class="mt-1 app-text-sm app-text-muted">
        {{ t('features.dev.input.description') }}
      </p>
    </header>

    <AppCard variant="compact">
      <h3 class="app-text-sm app-text-normal font-semibold">{{ t('features.dev.input.text') }}</h3>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div class="space-y-2">
          <label for="showcase-name" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.text') }}
          </label>
          <AppInputText
            id="showcase-name"
            v-model="form.name"
            :placeholder="t('features.dev.input.textPlaceholder')"
            fluid
          />
          <small class="app-text-sm app-text-muted">
            {{ t('features.dev.input.helperText') }}
          </small>
        </div>

        <div class="space-y-2">
          <label for="showcase-search" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.search') }}
          </label>
          <div class="relative">
            <AppInputText
              id="showcase-search"
              v-model="form.search"
              type="search"
              :placeholder="t('features.dev.input.searchPlaceholder')"
              class="!pl-9"
              fluid
            />
            <i
              class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 app-text-xs app-text-muted"
              aria-hidden="true"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label for="showcase-email" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.email') }}
          </label>
          <AppInputText
            id="showcase-email"
            v-model="form.email"
            type="email"
            :placeholder="t('features.dev.input.emailPlaceholder')"
            invalid
            fluid
          />
          <small class="app-text-sm text-red-600 app-dark:text-red-400">
            {{ t('features.dev.input.invalidHelp') }}
          </small>
        </div>

        <div class="space-y-2">
          <label for="showcase-password" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.password') }}
          </label>
          <AppPassword
            id="showcase-password"
            v-model="form.password"
            :placeholder="t('features.dev.input.passwordPlaceholder')"
            toggle-mask
            fluid
            :feedback="false"
          />
        </div>

        <div class="space-y-2">
          <label for="showcase-description" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.textarea') }}
          </label>
          <AppTextarea
            id="showcase-description"
            v-model="form.description"
            :placeholder="t('features.dev.input.textareaPlaceholder')"
            :rows="3"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <label class="app-text-sm app-text-normal font-medium">{{
            t('features.dev.input.disabled')
          }}</label>
          <AppInputText :model-value="t('features.dev.input.unavailable')" disabled fluid />
          <label for="showcase-readonly" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.readonly') }}
          </label>
          <AppInputText
            id="showcase-readonly"
            :value="t('features.dev.input.readonlyValue')"
            readonly
            fluid
          />
        </div>
      </div>
    </AppCard>

    <AppCard variant="compact">
      <div>
        <h3 class="app-text-sm app-text-normal font-semibold">
          {{ t('features.dev.input.number') }}
        </h3>
        <p class="mt-1 app-text-xs app-text-muted">
          {{ t('features.dev.input.numberHelp') }}
        </p>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <label for="showcase-number" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.number') }}
          </label>
          <AppInputNumber
            v-model="form.quantity"
            input-id="showcase-number"
            :min="0"
            :max="1000"
            show-buttons
            fluid
          />
        </div>
        <div class="space-y-2">
          <label for="showcase-currency" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.currency') }}
          </label>
          <AppInputNumber
            v-model="form.amount"
            input-id="showcase-currency"
            mode="currency"
            currency="USD"
            :locale="currencyLocale"
            :min-fraction-digits="2"
            fluid
          />
          <small class="app-text-sm app-text-muted">
            {{ t('features.dev.input.currencyHelp') }}
          </small>
        </div>
      </div>
    </AppCard>

    <AppCard variant="compact">
      <h3 class="app-text-sm app-text-normal font-semibold">
        {{ t('features.dev.input.select') }}
      </h3>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <label for="showcase-environment" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.singleSelect') }}
          </label>
          <AppSelect
            v-model="form.environment"
            input-id="showcase-environment"
            :options="environments"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.input.selectPlaceholder')"
            fluid
          />
        </div>
        <div class="space-y-2">
          <label for="showcase-teams" class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.input.multipleSelect') }}
          </label>
          <AppMultiSelect
            v-model="form.teams"
            input-id="showcase-teams"
            :options="teams"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.input.multiplePlaceholder')"
            display="chip"
            fluid
          />
        </div>
      </div>
    </AppCard>

    <section class="grid gap-4 md:grid-cols-2">
      <AppCard variant="compact">
        <div>
          <h3 class="app-text-sm app-text-normal font-semibold">
            {{ t('features.dev.input.checkbox') }}
          </h3>
          <p class="mt-1 app-text-xs app-text-muted">
            {{ t('features.dev.input.checkboxHelp') }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <AppCheckbox v-model="form.notifications" input-id="showcase-notifications" binary />
          <label for="showcase-notifications" class="app-text-sm app-text-normal">
            {{ t('features.dev.input.notifications') }}
          </label>
        </div>
        <div class="space-y-2">
          <span class="app-text-sm app-text-normal font-medium">{{
            t('features.dev.input.permissions')
          }}</span>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="permission in [
                { value: 'read', label: t('features.dev.input.readPermission') },
                { value: 'write', label: t('features.dev.input.writePermission') },
                { value: 'admin', label: t('features.dev.input.adminPermission') },
              ]"
              :key="permission.value"
              class="flex items-center gap-2"
            >
              <AppCheckbox
                v-model="form.permissions"
                :input-id="`permission-${permission.value}`"
                name="permissions"
                :value="permission.value"
              />
              <label :for="`permission-${permission.value}`" class="app-text-sm app-text-normal">
                {{ permission.label }}
              </label>
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard variant="compact">
        <div>
          <h3 class="app-text-sm app-text-normal font-semibold">
            {{ t('features.dev.input.switch') }}
          </h3>
          <p class="mt-1 app-text-xs app-text-muted">
            {{ t('features.dev.input.switchHelp') }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <AppToggleSwitch v-model="form.maintenanceMode" input-id="showcase-maintenance" />
          <label for="showcase-maintenance" class="app-text-sm app-text-normal">
            {{ t('features.dev.input.maintenanceMode') }}
          </label>
        </div>
      </AppCard>
    </section>

    <AppCard variant="compact">
      <h3 class="app-text-sm app-text-normal font-semibold">{{ t('features.dev.input.radio') }}</h3>
      <span class="app-text-sm app-text-normal font-medium">{{
        t('features.dev.input.plan')
      }}</span>
      <div class="flex flex-wrap gap-5">
        <div v-for="plan in plans" :key="plan.value" class="flex items-center gap-2">
          <AppRadioButton
            v-model="form.plan"
            :input-id="`plan-${plan.value}`"
            name="plan"
            :value="plan.value"
          />
          <label :for="`plan-${plan.value}`" class="app-text-sm app-text-normal">{{
            t(plan.labelKey)
          }}</label>
        </div>
      </div>
    </AppCard>

    <AppCard variant="compact">
      <div>
        <h3 class="app-text-sm app-text-normal font-semibold">
          {{ t('features.dev.input.file') }}
        </h3>
        <p class="mt-1 app-text-xs app-text-muted">
          {{ t('features.dev.input.fileHelp') }}
        </p>
      </div>
      <AppFileUpload
        name="showcase-files"
        :multiple="true"
        accept="*/*"
        :max-file-size="5000000"
        :file-limit="5"
        custom-upload
        :show-upload-button="false"
        :show-cancel-button="false"
        :choose-label="t('features.dev.input.chooseFiles')"
        @select="rememberImagePreviews"
      >
        <template #header="{ chooseCallback, clearCallback, files }">
          <div class="flex flex-wrap items-center gap-2">
            <AppButton
              type="button"
              icon="pi pi-paperclip"
              :label="t('features.dev.input.chooseFiles')"
              @click="chooseCallback()"
            />
            <AppButton
              type="button"
              tone="secondary"
              appearance="outlined"
              :label="t('features.dev.input.clearFiles')"
              :disabled="files.length === 0"
              @click="clearImages(clearCallback)"
            />
          </div>
        </template>
        <template #content="{ files, removeFileCallback }">
          <div v-if="files.length" class="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-3">
            <AppCard
              v-for="(file, index) in files"
              :key="`${file.name}-${file.size}`"
              variant="compact"
              class="min-w-0"
            >
              <div class="flex min-w-0 items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="truncate app-text-sm app-text-normal font-medium">{{ file.name }}</p>
                  <p class="app-text-xs app-text-muted">{{ (file.size / 1024).toFixed(1) }} KB</p>
                </div>
                <AppButton
                  type="button"
                  icon="pi pi-times"
                  tone="secondary"
                  appearance="text"
                  rounded
                  :aria-label="t('features.dev.input.removeFile')"
                  @click="removeFileCallback(index)"
                />
              </div>
            </AppCard>
          </div>
          <p v-else class="py-5 text-center app-text-sm app-text-muted">
            {{ t('features.dev.input.dropFiles') }}
          </p>
        </template>
      </AppFileUpload>
    </AppCard>

    <AppCard variant="compact">
      <div>
        <h3 class="app-text-sm app-text-normal font-semibold">
          {{ t('features.dev.input.image') }}
        </h3>
        <p class="mt-1 app-text-xs app-text-muted">
          {{ t('features.dev.input.imageHelp') }}
        </p>
      </div>
      <AppFileUpload
        name="showcase-images"
        :multiple="true"
        accept="image/*"
        :max-file-size="5000000"
        :file-limit="4"
        custom-upload
        :show-upload-button="false"
        :show-cancel-button="false"
        :choose-label="t('features.dev.input.chooseFiles')"
      >
        <template #header="{ chooseCallback, clearCallback, files }">
          <div class="flex flex-wrap items-center gap-2">
            <AppButton
              type="button"
              icon="pi pi-images"
              :label="t('features.dev.input.chooseFiles')"
              @click="chooseCallback()"
            />
            <AppButton
              type="button"
              tone="secondary"
              appearance="outlined"
              :label="t('features.dev.input.clearFiles')"
              :disabled="files.length === 0"
              @click="clearCallback()"
            />
          </div>
        </template>
        <template #content="{ files, removeFileCallback }">
          <div v-if="files.length" class="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
            <AppCard
              v-for="(file, index) in files"
              :key="`${file.name}-${file.size}`"
              variant="media"
            >
              <figure class="m-0">
                <img
                  :src="imagePreviews.get(file)"
                  :alt="`${t('features.dev.input.preview')}: ${file.name}`"
                  class="h-36 w-full bg-surface-100 object-cover app-dark:bg-surface-800"
                />
                <figcaption class="flex items-center justify-between gap-2 p-2">
                  <span class="truncate app-text-xs app-text-normal" :title="file.name">{{
                    file.name
                  }}</span>
                  <AppButton
                    type="button"
                    icon="pi pi-times"
                    tone="secondary"
                    appearance="text"
                    rounded
                    :aria-label="t('features.dev.input.removeFile')"
                    @click="removeImage(file, index, removeFileCallback)"
                  />
                </figcaption>
              </figure>
            </AppCard>
          </div>
          <p v-else class="py-5 text-center app-text-sm app-text-muted">
            {{ t('features.dev.input.dropImages') }}
          </p>
        </template>
      </AppFileUpload>
    </AppCard>

    <AppCard variant="compact">
      <details>
        <summary class="cursor-pointer app-text-sm app-text-normal font-semibold">
          {{ t('features.dev.input.submitted') }}
        </summary>
        <pre class="mt-3 overflow-x-auto app-text-xs app-text-muted">{{ form }}</pre>
      </details>
    </AppCard>
  </div>
</template>
