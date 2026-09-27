<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '../../../../../shared/component/AppButton.vue'
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
import ImageUploadVariant from '../component/ImageUploadVariant.vue'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'
import type { ShowcaseFormState } from '../lib/formState'

const { t, locale } = useI18n({ useScope: 'global' })
const props = defineProps<{ form: ShowcaseFormState }>()
const form = props.form
const autoUploadCompleted = ref(false)

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
const permissions = computed(() => [
  { value: 'read', label: t('features.dev.input.readPermission') },
  { value: 'write', label: t('features.dev.input.writePermission') },
  { value: 'admin', label: t('features.dev.input.adminPermission') },
])
const dropdownVariants = computed(() => [
  { value: 'single', label: t('features.dev.input.singleSelect') },
  { value: 'multiple', label: t('features.dev.input.multipleSelect') },
])
const checkboxVariants = computed(() => [
  { value: 'binary', label: t('features.dev.input.binary') },
  { value: 'group', label: t('features.dev.input.permissions') },
])
const fileVariants = computed(() => [
  { value: 'basic', label: t('features.dev.input.basicUpload') },
  { value: 'advanced', label: t('features.dev.input.advancedUpload') },
])
const imageVariants = computed(() => [
  { value: 'single', label: t('features.dev.variants.singleImage') },
  { value: 'multiple', label: t('features.dev.variants.multipleImages') },
])
const textSizes = ['small', 'medium', 'large'] as const

function completeAutoUpload() {
  autoUploadCompleted.value = true
}
</script>

<template>
  <section id="input" class="space-y-8" aria-labelledby="input-title">
    <header class="space-y-1">
      <h2 id="input-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.input.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.input.description') }}</p>
    </header>

    <div class="space-y-8">
      <ShowcaseArticle id="input-text" :title="t('features.dev.input.text')">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div class="space-y-2">
            <label for="showcase-name" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.text')
            }}</label>
            <AppInputText
              id="showcase-name"
              v-model="form.name"
              :placeholder="t('features.dev.input.textPlaceholder')"
              fluid
            />
            <small class="app-text-sm app-text-muted">{{
              t('features.dev.input.helperText')
            }}</small>
          </div>
          <div class="space-y-2">
            <label for="showcase-search" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.search')
            }}</label>
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
            <label for="showcase-email" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.email')
            }}</label>
            <AppInputText
              id="showcase-email"
              v-model="form.email"
              type="email"
              :placeholder="t('features.dev.input.emailPlaceholder')"
              invalid
              fluid
            />
            <small class="app-text-sm text-red-600 app-dark:text-red-400">{{
              t('features.dev.input.invalidHelp')
            }}</small>
          </div>
          <div class="space-y-2">
            <label for="showcase-text-disabled" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.disabled')
            }}</label>
            <AppInputText
              id="showcase-text-disabled"
              :model-value="t('features.dev.input.unavailable')"
              disabled
              fluid
            />
          </div>
          <div class="space-y-2">
            <label for="showcase-readonly" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.readonly')
            }}</label>
            <AppInputText
              id="showcase-readonly"
              :model-value="t('features.dev.input.readonlyValue')"
              readonly
              fluid
            />
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-text-sizes" :title="t('features.dev.input.sizes')">
        <div class="grid gap-4 md:grid-cols-3">
          <div v-for="size in textSizes" :key="size" class="space-y-2">
            <label :for="`text-size-${size}`" class="app-text-sm app-text-normal font-medium">
              {{ t(`features.dev.variants.${size}`) }}
            </label>
            <AppInputText
              :id="`text-size-${size}`"
              :size="size"
              :placeholder="t('features.dev.input.textPlaceholder')"
              fluid
            />
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-password" :title="t('features.dev.input.password')">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div class="space-y-2">
            <label for="showcase-password" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.password')
            }}</label>
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
            <label for="showcase-password-feedback" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.passwordFeedback') }}
            </label>
            <AppPassword
              id="showcase-password-feedback"
              :model-value="'Example!Password9'"
              toggle-mask
              fluid
            />
          </div>
          <div class="space-y-2">
            <label
              for="showcase-password-disabled"
              class="app-text-sm app-text-normal font-medium"
              >{{ t('features.dev.input.disabled') }}</label
            >
            <AppPassword
              id="showcase-password-disabled"
              model-value="example-password"
              disabled
              fluid
              :feedback="false"
            />
          </div>
          <div class="space-y-2">
            <label for="showcase-password-invalid" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.invalid') }}
            </label>
            <AppPassword
              id="showcase-password-invalid"
              :model-value="'weak'"
              invalid
              toggle-mask
              fluid
              :feedback="false"
            />
            <small class="app-text-sm text-red-600 app-dark:text-red-400">
              {{ t('features.dev.input.invalidHelp') }}
            </small>
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-textarea" :title="t('features.dev.input.textarea')">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div class="space-y-2">
            <label for="showcase-description" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.variants.default')
            }}</label>
            <AppTextarea
              id="showcase-description"
              v-model="form.description"
              :placeholder="t('features.dev.input.textareaPlaceholder')"
              :rows="3"
              fluid
            />
          </div>
          <div class="space-y-2">
            <label
              for="showcase-description-invalid"
              class="app-text-sm app-text-normal font-medium"
              >{{ t('features.dev.input.invalid') }}</label
            >
            <AppTextarea
              id="showcase-description-invalid"
              model-value=""
              :placeholder="t('features.dev.input.textareaPlaceholder')"
              invalid
              :rows="3"
              fluid
            />
            <small class="app-text-sm text-red-600 app-dark:text-red-400">{{
              t('features.dev.input.invalidHelp')
            }}</small>
          </div>
          <div class="space-y-2">
            <label
              for="showcase-description-readonly"
              class="app-text-sm app-text-normal font-medium"
              >{{ t('features.dev.input.readonly') }}</label
            >
            <AppTextarea
              id="showcase-description-readonly"
              :model-value="t('features.dev.input.readonlyValue')"
              readonly
              :rows="3"
              fluid
            />
          </div>
          <div class="space-y-2">
            <label for="showcase-description-auto" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.autoResize') }}
            </label>
            <AppTextarea
              id="showcase-description-auto"
              :model-value="t('features.dev.input.autoResizeSample')"
              auto-resize
              :rows="2"
              fluid
            />
          </div>
          <div class="space-y-2">
            <label
              for="showcase-description-disabled"
              class="app-text-sm app-text-normal font-medium"
            >
              {{ t('features.dev.input.disabled') }}
            </label>
            <AppTextarea
              id="showcase-description-disabled"
              :model-value="t('features.dev.input.unavailable')"
              disabled
              :rows="2"
              fluid
            />
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-number" :title="t('features.dev.input.number')">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <label for="showcase-number" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.number')
            }}</label>
            <AppInputNumber
              v-model="form.quantity"
              input-id="showcase-number"
              :min="0"
              :max="1000"
              :step="5"
              show-buttons
              fluid
            />
          </div>
          <div class="space-y-2">
            <label for="showcase-currency" class="app-text-sm app-text-normal font-medium">{{
              t('features.dev.input.currency')
            }}</label>
            <AppInputNumber
              v-model="form.amount"
              input-id="showcase-currency"
              mode="currency"
              currency="USD"
              :locale="currencyLocale"
              :min-fraction-digits="2"
              fluid
            />
            <small class="app-text-sm app-text-muted">{{
              t('features.dev.input.currencyHelp')
            }}</small>
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-number-states" :title="t('features.dev.input.numberStates')">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div class="space-y-2">
            <label for="number-size-small" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.variants.small') }}
            </label>
            <AppInputNumber input-id="number-size-small" :model-value="24" size="small" fluid />
          </div>
          <div class="space-y-2">
            <label for="number-size-large" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.variants.large') }}
            </label>
            <AppInputNumber input-id="number-size-large" :model-value="24" size="large" fluid />
          </div>
          <div class="space-y-2">
            <label for="number-invalid" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.invalid') }}
            </label>
            <AppInputNumber input-id="number-invalid" :model-value="-1" :min="0" invalid fluid />
          </div>
          <div class="space-y-2">
            <label for="number-disabled" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.disabled') }}
            </label>
            <AppInputNumber input-id="number-disabled" :model-value="12" disabled fluid />
          </div>
          <div class="space-y-2">
            <label for="number-readonly" class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.readonly') }}
            </label>
            <AppInputNumber input-id="number-readonly" :model-value="12" readonly fluid />
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle
        id="input-dropdown"
        :title="t('features.dev.input.select')"
        :variants="dropdownVariants"
      >
        <template #single>
          <label for="showcase-environment" class="app-text-sm app-text-normal font-medium">{{
            t('features.dev.input.singleSelect')
          }}</label>
          <AppSelect
            v-model="form.environment"
            input-id="showcase-environment"
            :options="environments"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.input.selectPlaceholder')"
            filter
            show-clear
            size="small"
            fluid
          />
          <AppSelect
            :model-value="'staging'"
            :options="environments"
            option-label="label"
            option-value="value"
            disabled
            fluid
          />
          <AppSelect
            :model-value="null"
            :options="environments"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.input.invalid')"
            invalid
            fluid
          />
          <AppSelect
            :model-value="'production'"
            :options="environments"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.variants.large')"
            size="large"
            fluid
          />
        </template>
        <template #multiple>
          <label for="showcase-teams" class="app-text-sm app-text-normal font-medium">{{
            t('features.dev.input.multipleSelect')
          }}</label>
          <AppMultiSelect
            v-model="form.teams"
            input-id="showcase-teams"
            :options="teams"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.input.multiplePlaceholder')"
            display="chip"
            filter
            :max-selected-labels="1"
            size="small"
            fluid
          />
          <AppMultiSelect
            :model-value="['platform', 'design']"
            :options="teams"
            option-label="label"
            option-value="value"
            display="comma"
            :placeholder="t('features.dev.input.multiplePlaceholder')"
            size="large"
            fluid
          />
          <AppMultiSelect
            :model-value="[]"
            :options="teams"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.input.disabled')"
            disabled
            fluid
          />
          <AppMultiSelect
            :model-value="[]"
            :options="teams"
            option-label="label"
            option-value="value"
            :placeholder="t('features.dev.input.invalid')"
            invalid
            fluid
          />
        </template>
      </ShowcaseArticle>

      <ShowcaseArticle
        id="input-checkbox"
        :title="t('features.dev.input.checkbox')"
        :variants="checkboxVariants"
      >
        <template #binary>
          <div class="flex items-center gap-2">
            <AppCheckbox v-model="form.notifications" input-id="showcase-notifications" binary />
            <label for="showcase-notifications" class="app-text-sm app-text-normal">{{
              t('features.dev.input.notifications')
            }}</label>
          </div>
        </template>
        <template #group>
          <fieldset class="space-y-3 border-0 p-0">
            <legend class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.permissions') }}
            </legend>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="permission in permissions"
                :key="permission.value"
                class="flex items-center gap-2"
              >
                <AppCheckbox
                  v-model="form.permissions"
                  :input-id="`permission-${permission.value}`"
                  name="permissions"
                  :value="permission.value"
                />
                <label
                  :for="`permission-${permission.value}`"
                  class="app-text-sm app-text-normal"
                  >{{ permission.label }}</label
                >
              </div>
            </div>
          </fieldset>
        </template>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-control-states" :title="t('features.dev.input.controlStates')">
        <div class="space-y-6">
          <fieldset class="grid gap-4 border-0 p-0 sm:grid-cols-2 xl:grid-cols-3">
            <legend class="mb-3 app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.checkbox') }}
            </legend>
            <div class="flex items-center gap-2">
              <AppCheckbox input-id="checkbox-small" :model-value="true" binary size="small" />
              <label for="checkbox-small" class="app-text-sm app-text-normal">
                {{ t('features.dev.variants.small') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppCheckbox input-id="checkbox-large" :model-value="true" binary size="large" />
              <label for="checkbox-large" class="app-text-sm app-text-normal">
                {{ t('features.dev.variants.large') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppCheckbox input-id="checkbox-invalid" :model-value="false" binary invalid />
              <label for="checkbox-invalid" class="app-text-sm app-text-normal">
                {{ t('features.dev.input.invalid') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppCheckbox input-id="checkbox-disabled" :model-value="true" binary disabled />
              <label for="checkbox-disabled" class="app-text-sm app-text-muted">
                {{ t('features.dev.input.disabled') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppCheckbox input-id="checkbox-readonly" :model-value="true" binary readonly />
              <label for="checkbox-readonly" class="app-text-sm app-text-normal">
                {{ t('features.dev.input.readonly') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppCheckbox
                input-id="checkbox-indeterminate"
                :model-value="false"
                binary
                indeterminate
              />
              <label for="checkbox-indeterminate" class="app-text-sm app-text-normal">
                {{ t('features.dev.input.indeterminate') }}
              </label>
            </div>
          </fieldset>

          <fieldset class="grid gap-4 border-0 p-0 sm:grid-cols-2 xl:grid-cols-3">
            <legend class="mb-3 app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.radio') }}
            </legend>
            <div class="flex items-center gap-2">
              <AppRadioButton input-id="radio-small" name="radio-size" value="small" size="small" />
              <label for="radio-small" class="app-text-sm app-text-normal">
                {{ t('features.dev.variants.small') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppRadioButton input-id="radio-large" name="radio-size" value="large" size="large" />
              <label for="radio-large" class="app-text-sm app-text-normal">
                {{ t('features.dev.variants.large') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppRadioButton
                input-id="radio-invalid"
                name="radio-invalid"
                value="invalid"
                invalid
              />
              <label for="radio-invalid" class="app-text-sm app-text-normal">
                {{ t('features.dev.input.invalid') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppRadioButton
                input-id="radio-disabled"
                name="radio-disabled"
                value="disabled"
                disabled
              />
              <label for="radio-disabled" class="app-text-sm app-text-muted">
                {{ t('features.dev.input.disabled') }}
              </label>
            </div>
          </fieldset>

          <fieldset class="grid gap-4 border-0 p-0 sm:grid-cols-2 xl:grid-cols-3">
            <legend class="mb-3 app-text-sm app-text-normal font-medium">
              {{ t('features.dev.input.switch') }}
            </legend>
            <div class="flex items-center gap-2">
              <AppToggleSwitch input-id="switch-readonly" :model-value="true" readonly />
              <label for="switch-readonly" class="app-text-sm app-text-normal">
                {{ t('features.dev.input.readonly') }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <AppToggleSwitch input-id="switch-invalid" :model-value="false" invalid />
              <label for="switch-invalid" class="app-text-sm app-text-normal">
                {{ t('features.dev.input.invalid') }}
              </label>
            </div>
          </fieldset>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-switch" :title="t('features.dev.input.switch')">
        <div class="flex flex-wrap gap-8">
          <div class="flex items-center gap-3">
            <AppToggleSwitch v-model="form.maintenanceMode" input-id="showcase-maintenance" />
            <label for="showcase-maintenance" class="app-text-sm app-text-normal">{{
              t('features.dev.input.maintenanceMode')
            }}</label>
          </div>
          <div class="flex items-center gap-3">
            <AppToggleSwitch :model-value="true" input-id="showcase-switch-on" />
            <label for="showcase-switch-on" class="app-text-sm app-text-normal">{{
              t('features.dev.variants.on')
            }}</label>
          </div>
          <div class="flex items-center gap-3">
            <AppToggleSwitch input-id="showcase-switch-disabled" disabled />
            <label for="showcase-switch-disabled" class="app-text-sm app-text-muted">{{
              t('features.dev.input.disabled')
            }}</label>
          </div>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle id="input-radio" :title="t('features.dev.input.radio')">
        <div class="grid gap-6 md:grid-cols-2">
          <fieldset class="space-y-3 border-0 p-0">
            <legend class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.variants.horizontal') }}
            </legend>
            <div class="flex flex-wrap gap-5">
              <div v-for="plan in plans" :key="plan.value" class="flex items-center gap-2">
                <AppRadioButton
                  v-model="form.plan"
                  :input-id="`plan-horizontal-${plan.value}`"
                  name="plan-horizontal"
                  :value="plan.value"
                />
                <label :for="`plan-horizontal-${plan.value}`" class="app-text-sm app-text-normal">{{
                  t(plan.labelKey)
                }}</label>
              </div>
            </div>
          </fieldset>
          <fieldset class="space-y-3 border-0 p-0">
            <legend class="app-text-sm app-text-normal font-medium">
              {{ t('features.dev.variants.vertical') }}
            </legend>
            <div class="grid gap-3">
              <div v-for="plan in plans" :key="plan.value" class="flex items-center gap-2">
                <AppRadioButton
                  v-model="form.plan"
                  :input-id="`plan-vertical-${plan.value}`"
                  name="plan-vertical"
                  :value="plan.value"
                />
                <label :for="`plan-vertical-${plan.value}`" class="app-text-sm app-text-normal">{{
                  t(plan.labelKey)
                }}</label>
              </div>
            </div>
          </fieldset>
        </div>
      </ShowcaseArticle>

      <ShowcaseArticle
        id="input-file"
        :title="t('features.dev.input.file')"
        :variants="fileVariants"
      >
        <template #basic>
          <AppFileUpload
            mode="basic"
            name="showcase-basic-file"
            accept="*/*"
            :max-file-size="5000000"
            :file-limit="1"
            :choose-label="t('features.dev.input.chooseFiles')"
          />
        </template>
        <template #advanced>
          <div class="space-y-5">
            <AppFileUpload
              mode="advanced"
              name="showcase-files"
              :multiple="true"
              accept="*/*"
              :max-file-size="5000000"
              :file-limit="5"
              custom-upload
              :show-upload-button="true"
              :show-cancel-button="true"
              :choose-label="t('features.dev.input.chooseFiles')"
              @uploader="completeAutoUpload"
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
                    @click="clearCallback()"
                  />
                </div>
              </template>
            </AppFileUpload>
            <AppFileUpload
              mode="basic"
              name="showcase-disabled-file"
              :choose-label="t('features.dev.input.uploadDisabled')"
              disabled
            />
            <AppFileUpload
              mode="basic"
              name="showcase-auto-file"
              :choose-label="t('features.dev.input.automaticUpload')"
              auto
              custom-upload
              @uploader="completeAutoUpload"
            />
            <p v-if="autoUploadCompleted" role="status" class="app-text-sm app-text-muted">
              {{ t('features.dev.input.uploadComplete') }}
            </p>
          </div>
        </template>
      </ShowcaseArticle>

      <ShowcaseArticle
        id="input-image"
        :title="t('features.dev.input.image')"
        :variants="imageVariants"
      >
        <template #single><ImageUploadVariant :multiple="false" name="showcase-image" /></template>
        <template #multiple
          ><ImageUploadVariant :multiple="true" name="showcase-images"
        /></template>
      </ShowcaseArticle>
    </div>
  </section>
</template>
