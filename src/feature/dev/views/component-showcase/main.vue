<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import AppCard from '../../../../shared/component/AppCard.vue'
import AppButton from '../../../../shared/component/AppButton.vue'
import InputSection from './section/InputSection.vue'
import ButtonSection from './section/ButtonSection.vue'
import BadgeSection from './section/BadgeSection.vue'
import CardSection from './section/CardSection.vue'
import DialogSection from './section/DialogSection.vue'
import TypographySection from './section/TypographySection.vue'
import ChartSection from './section/ChartSection.vue'
import AvatarSection from './section/AvatarSection.vue'
import MessageSection from './section/MessageSection.vue'
import ProgressSection from './section/ProgressSection.vue'
import DataTableSection from './section/DataTableSection.vue'
import ShowcaseNavigationItem from './component/ShowcaseNavigationItem.vue'
import {
  createShowcaseFormState,
  type ShowcaseAdditionalInputState,
  type ShowcaseFormState,
} from './lib/formState'
import { useHashSectionNavigation } from './composable/useHashSectionNavigation'

hljs.registerLanguage('json', json)

const { t } = useI18n({ useScope: 'global' })
const activeArticle = ref('input-text')
const expandedItems = ref(['input', 'text-inputs'])
const isMobileNavigationOpen = ref(false)
const form = reactive(createShowcaseFormState())
const initialFormState = createShowcaseFormState()
type FormStateSelection = {
  fields?: (keyof ShowcaseFormState)[]
  additionalInputs?: (keyof ShowcaseAdditionalInputState)[]
}

const formStateBySection: Record<string, FormStateSelection> = {
  'input-text': { fields: ['name', 'email', 'search'] },
  'input-text-sizes': { additionalInputs: ['textSmall', 'textMedium', 'textLarge'] },
  'input-password': {
    fields: ['password'],
    additionalInputs: ['passwordFeedback', 'passwordInvalid'],
  },
  'input-textarea': {
    fields: ['description'],
    additionalInputs: ['descriptionInvalid', 'descriptionAutoResize'],
  },
  'input-number': { fields: ['quantity', 'amount'] },
  'input-number-states': { additionalInputs: ['numberSmall', 'numberLarge', 'numberInvalid'] },
  'input-dropdown': {
    fields: ['environment', 'teams'],
    additionalInputs: ['environmentInvalid', 'environmentLarge', 'teamsAlternate', 'teamsInvalid'],
  },
  'input-checkbox': { fields: ['notifications', 'permissions'] },
  'input-checkbox-states': {
    additionalInputs: [
      'checkboxSmall',
      'checkboxLarge',
      'checkboxInvalid',
      'checkboxIndeterminate',
    ],
  },
  'input-radio': { fields: ['plan'] },
  'input-radio-states': { additionalInputs: ['radioSize', 'radioInvalid'] },
  'input-switch': { fields: ['maintenanceMode'], additionalInputs: ['switchOn'] },
  'input-switch-states': { additionalInputs: ['switchInvalid'] },
  'input-file': { fields: ['selectedFiles', 'uploadedFiles'] },
  'input-image': { fields: ['selectedImage', 'selectedImages'] },
  'dialog-form': { fields: ['projectName'] },
  'data-table-formats': { fields: ['dataTableSearch', 'dataTableTeam'] },
  'data-table-selection': { fields: ['dataTableSingleSelection', 'dataTableMultipleSelection'] },
}

const currentSectionState = computed(() => {
  const selection = formStateBySection[activeArticle.value]
  if (!selection) return {}

  return {
    ...Object.fromEntries((selection.fields ?? []).map((field) => [field, form[field]])),
    ...(selection.additionalInputs?.length
      ? {
          additionalInputs: Object.fromEntries(
            selection.additionalInputs.map((field) => [field, form.additionalInputs[field]]),
          ),
        }
      : {}),
  }
})
const hasCurrentSectionState = computed(() => Boolean(formStateBySection[activeArticle.value]))

function resetCurrentSectionState() {
  const selection = formStateBySection[activeArticle.value]
  if (!selection) return

  Object.assign(
    form,
    Object.fromEntries(
      (selection.fields ?? []).map((field) => {
        const value = initialFormState[field]
        return [field, Array.isArray(value) ? [...value] : value]
      }),
    ),
  )
  Object.assign(
    form.additionalInputs,
    Object.fromEntries(
      (selection.additionalInputs ?? []).map((field) => {
        const value = initialFormState.additionalInputs[field]
        return [field, Array.isArray(value) ? [...value] : value]
      }),
    ),
  )
}

const formJson = computed(() =>
  JSON.stringify(
    currentSectionState.value,
    (key, value: unknown) => {
      if (typeof value === 'string' && /password/i.test(key) && value) return '••••••'
      if (typeof File !== 'undefined' && value instanceof File) {
        return { name: value.name, type: value.type, size: value.size }
      }
      return value
    },
    2,
  ),
)
const highlightedFormJson = computed(
  () => hljs.highlight(formJson.value, { language: 'json' }).value,
)

type NavigationItem = {
  id: string
  label: string
  icon?: string
  target?: string
  children?: NavigationItem[]
}

function navigationLinks(entries: Array<{ id: string; label: string }>): NavigationItem[] {
  return entries.map((entry) => ({ ...entry, target: entry.id }))
}

const navigation = computed<NavigationItem[]>(() => [
  {
    id: 'input',
    label: t('features.dev.tabs.input'),
    icon: 'pi pi-pencil',
    children: [
      {
        id: 'text-inputs',
        label: t('features.dev.input.textInputs'),
        children: [
          { id: 'input-text', label: t('features.dev.input.text'), target: 'input-text' },
          {
            id: 'input-text-sizes',
            label: t('features.dev.input.sizes'),
            target: 'input-text-sizes',
          },
          {
            id: 'input-password',
            label: t('features.dev.input.password'),
            target: 'input-password',
          },
          {
            id: 'input-textarea',
            label: t('features.dev.input.textarea'),
            target: 'input-textarea',
          },
          {
            id: 'number-inputs',
            label: t('features.dev.input.number'),
            children: [
              {
                id: 'input-number',
                label: t('features.dev.input.numberValuesTitle'),
                target: 'input-number',
              },
              {
                id: 'input-number-states',
                label: t('features.dev.input.numberStates'),
                target: 'input-number-states',
              },
            ],
          },
        ],
      },
      {
        id: 'dropdowns',
        label: t('features.dev.input.dropdownsTitle'),
        target: 'input-dropdown',
      },
      {
        id: 'checkboxes',
        label: t('features.dev.input.checkboxesTitle'),
        children: [
          {
            id: 'input-checkbox',
            label: t('features.dev.input.checkboxExamples'),
            target: 'input-checkbox',
          },
          {
            id: 'input-checkbox-states',
            label: t('features.dev.input.checkboxStates'),
            target: 'input-checkbox-states',
          },
        ],
      },
      {
        id: 'radio-buttons',
        label: t('features.dev.input.radioButtonsTitle'),
        children: [
          {
            id: 'input-radio',
            label: t('features.dev.input.radioExamples'),
            target: 'input-radio',
          },
          {
            id: 'input-radio-states',
            label: t('features.dev.input.radioStates'),
            target: 'input-radio-states',
          },
        ],
      },
      {
        id: 'switches',
        label: t('features.dev.input.switchesTitle'),
        children: [
          {
            id: 'input-switch',
            label: t('features.dev.input.switchExamples'),
            target: 'input-switch',
          },
          {
            id: 'input-switch-states',
            label: t('features.dev.input.switchStates'),
            target: 'input-switch-states',
          },
        ],
      },
      {
        id: 'file-upload',
        label: t('features.dev.input.fileImageTitle'),
        children: [
          { id: 'input-file', label: t('features.dev.input.file'), target: 'input-file' },
          { id: 'input-image', label: t('features.dev.input.image'), target: 'input-image' },
        ],
      },
    ],
  },
  {
    id: 'button',
    label: t('features.dev.tabs.button'),
    icon: 'pi pi-circle',
    children: navigationLinks([
      { id: 'button-severity', label: t('features.dev.button.severities') },
      { id: 'button-style', label: t('features.dev.button.styles') },
      { id: 'button-icon', label: t('features.dev.button.iconVariants') },
      { id: 'button-size', label: t('features.dev.button.sizeVariants') },
      { id: 'button-layout', label: t('features.dev.button.layout') },
      { id: 'button-state', label: t('features.dev.button.states') },
    ]),
  },
  {
    id: 'badge',
    label: t('features.dev.tabs.badge'),
    icon: 'pi pi-tag',
    children: navigationLinks([
      { id: 'badge-severity', label: t('features.dev.badge.severities') },
      { id: 'badge-numeric', label: t('features.dev.badge.numeric') },
      { id: 'badge-sizes', label: t('features.dev.badge.sizes') },
      { id: 'badge-tag-appearance', label: t('features.dev.badge.tagAppearance') },
      { id: 'badge-status', label: t('features.dev.badge.shared') },
    ]),
  },
  {
    id: 'card',
    label: t('features.dev.tabs.card'),
    icon: 'pi pi-id-card',
    children: navigationLinks([
      { id: 'card-variants', label: t('features.dev.card.variants') },
      { id: 'card-stat', label: t('features.dev.card.shared') },
      { id: 'card-skeleton', label: t('features.dev.card.skeleton') },
    ]),
  },
  {
    id: 'dialog',
    label: t('features.dev.tabs.dialog'),
    icon: 'pi pi-window-maximize',
    children: navigationLinks([
      { id: 'dialog-basic', label: t('features.dev.dialog.basic') },
      { id: 'dialog-form', label: t('features.dev.dialog.form') },
      { id: 'dialog-confirm', label: t('features.dev.dialog.confirm') },
      { id: 'dialog-maximizable', label: t('features.dev.dialog.maximizable') },
      { id: 'dialog-options', label: t('features.dev.dialog.options') },
    ]),
  },
  {
    id: 'typography',
    label: t('features.dev.tabs.typography'),
    icon: 'pi pi-align-left',
    children: navigationLinks([
      { id: 'typography-size', label: t('features.dev.typography.sizes') },
      { id: 'typography-tone', label: t('features.dev.typography.tones') },
      { id: 'typography-custom', label: t('features.dev.typography.customSizes') },
      { id: 'typography-color', label: t('features.dev.typography.semanticColors') },
    ]),
  },
  {
    id: 'chart',
    label: t('features.dev.tabs.chart'),
    icon: 'pi pi-chart-bar',
    children: navigationLinks([{ id: 'chart-types', label: t('features.dev.chart.types') }]),
  },
  {
    id: 'avatar',
    label: t('features.dev.tabs.avatar'),
    icon: 'pi pi-user',
    children: navigationLinks([
      { id: 'avatar-content', label: t('features.dev.avatar.content') },
      { id: 'avatar-shape', label: t('features.dev.avatar.shapes') },
      { id: 'avatar-size', label: t('features.dev.avatar.sizes') },
    ]),
  },
  {
    id: 'message',
    label: t('features.dev.tabs.message'),
    icon: 'pi pi-info-circle',
    children: navigationLinks([
      { id: 'message-severity', label: t('features.dev.message.severities') },
      { id: 'message-appearance', label: t('features.dev.message.variants') },
      { id: 'message-state', label: t('features.dev.message.states') },
    ]),
  },
  {
    id: 'progress',
    label: t('features.dev.tabs.progress'),
    icon: 'pi pi-chart-line',
    children: navigationLinks([
      { id: 'progress-mode', label: t('features.dev.progress.modes') },
      { id: 'progress-values', label: t('features.dev.progress.values') },
    ]),
  },
  {
    id: 'table',
    label: t('features.dev.tabs.dataTable'),
    icon: 'pi pi-table',
    children: navigationLinks([
      { id: 'data-table-formats', label: t('features.dev.dataTable.formats') },
      { id: 'data-table-selection', label: t('features.dev.dataTable.selection') },
      { id: 'data-table-groups', label: t('features.dev.dataTable.groups') },
      { id: 'data-table-states', label: t('features.dev.dataTable.states') },
    ]),
  },
])

const navigationTargets = computed(() => collectNavigationTargets(navigation.value))

let articleObserver: IntersectionObserver | undefined

function findTargetPath(
  items: NavigationItem[],
  target: string,
  parents: string[] = [],
): string[] | undefined {
  for (const item of items) {
    const path = [...parents, item.id]
    if (item.target === target) return path
    if (item.children) {
      const childPath = findTargetPath(item.children, target, path)
      if (childPath) return childPath
    }
  }
  return undefined
}

function collectNavigationTargets(items: NavigationItem[]): string[] {
  return items.flatMap((item) => [
    ...(item.target ? [item.target] : []),
    ...(item.children ? collectNavigationTargets(item.children) : []),
  ])
}

function syncNavigationToSection(target: string) {
  const path = findTargetPath(navigation.value, target)
  if (!path) return

  activeArticle.value = target
  expandedItems.value = path.slice(0, -1)
}

const navigateToSection = useHashSectionNavigation(syncNavigationToSection)

function navigateTo(id: string) {
  navigateToSection(id, 'smooth')
  isMobileNavigationOpen.value = false
}

function toggleNavigationItem(itemId: string) {
  expandedItems.value = expandedItems.value.includes(itemId)
    ? expandedItems.value.filter((expandedId) => expandedId !== itemId)
    : [...expandedItems.value, itemId]
}

onMounted(() => {
  const scrollContainer = document.querySelector('main')
  articleObserver = new IntersectionObserver(
    (entries) => {
      const lastTarget = navigationTargets.value[navigationTargets.value.length - 1]
      if (
        scrollContainer &&
        lastTarget &&
        scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 2
      ) {
        navigateToArticle(lastTarget)
        return
      }

      const visibleArticles = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const firstVisibleArticle = visibleArticles[0]
      if (firstVisibleArticle) navigateToArticle(firstVisibleArticle.target.id)
    },
    { root: scrollContainer, rootMargin: '-8% 0px -72% 0px', threshold: 0 },
  )

  for (const target of navigationTargets.value) {
    const article = document.getElementById(target)
    if (article) articleObserver.observe(article)
  }
})

function navigateToArticle(target: string) {
  syncNavigationToSection(target)
}

onUnmounted(() => articleObserver?.disconnect())
</script>

<template>
  <section class="mx-auto w-full max-w-9xl space-y-6">
    <header class="space-y-1">
      <h1 class="app-text-2xl app-text-normal font-bold tracking-tight">
        {{ t('features.dev.page.title') }}
      </h1>
      <p class="app-text-sm app-text-muted">
        {{ t('features.dev.page.subtitle') }}
      </p>
    </header>

    <div
      class="grid min-w-0 gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8"
      :class="
        hasCurrentSectionState
          ? 'showcase:grid-cols-[15rem_minmax(0,1fr)_19rem]'
          : 'showcase:grid-cols-[15rem_minmax(0,1fr)]'
      "
    >
      <aside class="min-w-0 lg:sticky lg:top-4 lg:self-start">
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-lg border app-surface-border app-surface px-4 py-3 app-text-sm app-text-normal font-semibold lg:hidden"
          aria-controls="component-showcase-navigation"
          :aria-expanded="isMobileNavigationOpen"
          @click="isMobileNavigationOpen = !isMobileNavigationOpen"
        >
          {{ t('features.dev.navigation.contents') }}
          <i
            :class="isMobileNavigationOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            aria-hidden="true"
          />
        </button>

        <div
          class="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none lg:grid-rows-[1fr]"
          :class="isMobileNavigationOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[1fr]'"
        >
          <nav
            id="component-showcase-navigation"
            :aria-label="t('features.dev.navigation.ariaLabel')"
            class="min-h-0 overflow-hidden"
          >
            <div class="space-y-1 rounded-xl border app-surface-border app-surface p-3">
              <ul class="m-0 list-none space-y-1 p-0">
                <ShowcaseNavigationItem
                  v-for="item in navigation"
                  :key="item.id"
                  :item="item"
                  :active-target="activeArticle"
                  :expanded-items="expandedItems"
                  @toggle="toggleNavigationItem"
                  @navigate="navigateTo"
                />
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      <article class="min-w-0 space-y-12">
        <InputSection :form="form" />
        <ButtonSection />
        <BadgeSection />
        <CardSection />
        <DialogSection :form="form" />
        <TypographySection />
        <ChartSection />
        <AvatarSection />
        <MessageSection />
        <ProgressSection />
        <DataTableSection :form="form" />
      </article>

      <Transition name="section-state">
        <aside
          v-if="hasCurrentSectionState"
          class="min-w-0 lg:col-span-2 showcase:col-span-1 showcase:sticky showcase:top-4 showcase:self-start"
        >
          <section aria-labelledby="showcase-form-state-title" class="space-y-3">
            <AppCard variant="full" class="form-state-card">
              <template #title>
                <span id="showcase-form-state-title">{{
                  t('features.dev.input.reactiveState')
                }}</span>
              </template>
              <template #header-icon>
                <AppButton
                  :label="t('features.dev.input.resetSection')"
                  :aria-label="t('features.dev.input.resetSection')"
                  :title="t('features.dev.input.resetSection')"
                  icon="pi pi-refresh"
                  tone="secondary"
                  appearance="text"
                  size="small"
                  @click="resetCurrentSectionState"
                />
              </template>
              <!-- Highlight.js escapes source text before producing token markup. -->
              <!-- eslint-disable vue/no-v-html -->
              <pre class="form-json-preview m-0 app-text-xs"><code
                class="hljs language-json"
                :aria-label="t('features.dev.input.jsonPreview')"
                v-html="highlightedFormJson"
              /></pre>
              <!-- eslint-enable vue/no-v-html -->
            </AppCard>
          </section>
        </aside>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.section-state-enter-active,
.section-state-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.section-state-enter-from,
.section-state-leave-to {
  opacity: 0;
  transform: translateX(0.5rem);
}

.form-state-card :deep(.p-card-body) {
  max-height: calc(100vh - 8rem);
  overflow-x: hidden;
  overflow-y: auto;
}

.form-state-card pre {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

@media (prefers-reduced-motion: reduce) {
  .section-state-enter-active,
  .section-state-leave-active {
    transition: none;
  }
}
</style>
