<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import AppCard from '../../../../shared/component/AppCard.vue'
import AppButton from '../../../../shared/component/AppButton.vue'
import AppInputText from '../../../../shared/component/AppInputText.vue'
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
import ToastSection from './section/ToastSection.vue'
import ConfirmSection from './section/ConfirmSection.vue'
import ShowcaseNavigationItem from './component/ShowcaseNavigationItem.vue'
import {
  matchesSearchText,
  normalizeSearchText,
  translatedSearchText,
} from './lib/navigationSearch'
import {
  createShowcaseFormState,
  type ShowcaseAdditionalInputState,
  type ShowcaseFormState,
} from './lib/formState'
import { useHashSectionNavigation } from './composable/useHashSectionNavigation'

hljs.registerLanguage('json', json)

const { locale, t } = useI18n({ useScope: 'global' })
const activeArticle = ref('input-text')
const expandedItems = ref(['input', 'text-inputs', 'system'])
const isMobileNavigationOpen = ref(false)
const navigationSearch = ref('')
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
  searchTerms?: string[]
  icon?: string
  target?: string
  children?: NavigationItem[]
}

function localizedSearchTerms(key: string): string[] {
  return [t(key, {}, { locale: 'en' }), t(key, {}, { locale: 'th' })]
}

function localizedNavigationItem(id: string, key: string, target = id): NavigationItem {
  return { id, label: t(key), target, searchTerms: localizedSearchTerms(key) }
}

function navigationLinks(entries: Array<{ id: string; key: string }>): NavigationItem[] {
  return entries.map(({ id, key }) => localizedNavigationItem(id, key))
}

const navigation = computed<NavigationItem[]>(() => [
  {
    id: 'input',
    label: t('features.dev.tabs.input'),
    searchTerms: localizedSearchTerms('features.dev.tabs.input'),
    icon: 'pi pi-pencil',
    children: [
      {
        id: 'text-inputs',
        label: t('features.dev.input.textInputs'),
        searchTerms: localizedSearchTerms('features.dev.input.textInputs'),
        children: [
          localizedNavigationItem('input-text', 'features.dev.input.text'),
          localizedNavigationItem('input-text-sizes', 'features.dev.input.sizes'),
          localizedNavigationItem('input-password', 'features.dev.input.password'),
          localizedNavigationItem('input-textarea', 'features.dev.input.textarea'),
          {
            id: 'number-inputs',
            label: t('features.dev.input.number'),
            searchTerms: localizedSearchTerms('features.dev.input.number'),
            children: [
              localizedNavigationItem('input-number', 'features.dev.input.numberValuesTitle'),
              localizedNavigationItem('input-number-states', 'features.dev.input.numberStates'),
            ],
          },
        ],
      },
      {
        id: 'dropdowns',
        label: t('features.dev.input.dropdownsTitle'),
        searchTerms: localizedSearchTerms('features.dev.input.dropdownsTitle'),
        target: 'input-dropdown',
      },
      {
        id: 'checkboxes',
        label: t('features.dev.input.checkboxesTitle'),
        searchTerms: localizedSearchTerms('features.dev.input.checkboxesTitle'),
        children: [
          localizedNavigationItem('input-checkbox', 'features.dev.input.checkboxExamples'),
          localizedNavigationItem('input-checkbox-states', 'features.dev.input.checkboxStates'),
        ],
      },
      {
        id: 'radio-buttons',
        label: t('features.dev.input.radioButtonsTitle'),
        searchTerms: localizedSearchTerms('features.dev.input.radioButtonsTitle'),
        children: [
          localizedNavigationItem('input-radio', 'features.dev.input.radioExamples'),
          localizedNavigationItem('input-radio-states', 'features.dev.input.radioStates'),
        ],
      },
      {
        id: 'switches',
        label: t('features.dev.input.switchesTitle'),
        searchTerms: localizedSearchTerms('features.dev.input.switchesTitle'),
        children: [
          localizedNavigationItem('input-switch', 'features.dev.input.switchExamples'),
          localizedNavigationItem('input-switch-states', 'features.dev.input.switchStates'),
        ],
      },
      {
        id: 'file-upload',
        label: t('features.dev.input.fileImageTitle'),
        searchTerms: localizedSearchTerms('features.dev.input.fileImageTitle'),
        children: [
          localizedNavigationItem('input-file', 'features.dev.input.file'),
          localizedNavigationItem('input-image', 'features.dev.input.image'),
        ],
      },
    ],
  },
  {
    id: 'button',
    label: t('features.dev.tabs.button'),
    searchTerms: localizedSearchTerms('features.dev.tabs.button'),
    icon: 'pi pi-circle',
    children: navigationLinks([
      { id: 'button-severity', key: 'features.dev.button.severities' },
      { id: 'button-style', key: 'features.dev.button.styles' },
      { id: 'button-icon', key: 'features.dev.button.iconVariants' },
      { id: 'button-size', key: 'features.dev.button.sizeVariants' },
      { id: 'button-layout', key: 'features.dev.button.layout' },
      { id: 'button-state', key: 'features.dev.button.states' },
    ]),
  },
  {
    id: 'badge',
    label: t('features.dev.tabs.badge'),
    searchTerms: localizedSearchTerms('features.dev.tabs.badge'),
    icon: 'pi pi-tag',
    children: navigationLinks([
      { id: 'badge-severity', key: 'features.dev.badge.severities' },
      { id: 'badge-numeric', key: 'features.dev.badge.numeric' },
      { id: 'badge-sizes', key: 'features.dev.badge.sizes' },
      { id: 'badge-tag-appearance', key: 'features.dev.badge.tagAppearance' },
      { id: 'badge-status', key: 'features.dev.badge.shared' },
    ]),
  },
  {
    id: 'card',
    label: t('features.dev.tabs.card'),
    searchTerms: localizedSearchTerms('features.dev.tabs.card'),
    icon: 'pi pi-id-card',
    children: navigationLinks([
      { id: 'card-variants', key: 'features.dev.card.variants' },
      { id: 'card-stat', key: 'features.dev.card.shared' },
      { id: 'card-skeleton', key: 'features.dev.card.skeleton' },
    ]),
  },
  {
    id: 'dialog',
    label: t('features.dev.tabs.dialog'),
    searchTerms: localizedSearchTerms('features.dev.tabs.dialog'),
    icon: 'pi pi-window-maximize',
    children: navigationLinks([
      { id: 'dialog-basic', key: 'features.dev.dialog.basic' },
      { id: 'dialog-form', key: 'features.dev.dialog.form' },
      { id: 'dialog-confirm', key: 'features.dev.dialog.confirm' },
      { id: 'dialog-maximizable', key: 'features.dev.dialog.maximizable' },
      { id: 'dialog-options', key: 'features.dev.dialog.options' },
    ]),
  },
  {
    id: 'typography',
    label: t('features.dev.tabs.typography'),
    searchTerms: localizedSearchTerms('features.dev.tabs.typography'),
    icon: 'pi pi-align-left',
    children: navigationLinks([
      { id: 'typography-size', key: 'features.dev.typography.sizes' },
      { id: 'typography-tone', key: 'features.dev.typography.tones' },
      { id: 'typography-custom', key: 'features.dev.typography.customSizes' },
      { id: 'typography-color', key: 'features.dev.typography.semanticColors' },
    ]),
  },
  {
    id: 'chart',
    label: t('features.dev.tabs.chart'),
    searchTerms: localizedSearchTerms('features.dev.tabs.chart'),
    icon: 'pi pi-chart-bar',
    children: navigationLinks([{ id: 'chart-types', key: 'features.dev.chart.types' }]),
  },
  {
    id: 'avatar',
    label: t('features.dev.tabs.avatar'),
    searchTerms: localizedSearchTerms('features.dev.tabs.avatar'),
    icon: 'pi pi-user',
    children: navigationLinks([
      { id: 'avatar-content', key: 'features.dev.avatar.content' },
      { id: 'avatar-shape', key: 'features.dev.avatar.shapes' },
      { id: 'avatar-size', key: 'features.dev.avatar.sizes' },
    ]),
  },
  {
    id: 'message',
    label: t('features.dev.tabs.message'),
    searchTerms: localizedSearchTerms('features.dev.tabs.message'),
    icon: 'pi pi-info-circle',
    children: navigationLinks([
      { id: 'message-severity', key: 'features.dev.message.severities' },
      { id: 'message-appearance', key: 'features.dev.message.variants' },
      { id: 'message-state', key: 'features.dev.message.states' },
    ]),
  },
  {
    id: 'system',
    label: t('features.dev.tabs.system'),
    searchTerms: localizedSearchTerms('features.dev.tabs.system'),
    icon: 'pi pi-cog',
    children: navigationLinks([
      { id: 'toast-notifications', key: 'features.dev.toast.title' },
      { id: 'confirm-usage', key: 'features.dev.confirm.title' },
    ]),
  },
  {
    id: 'progress',
    label: t('features.dev.tabs.progress'),
    searchTerms: localizedSearchTerms('features.dev.tabs.progress'),
    icon: 'pi pi-chart-line',
    children: navigationLinks([
      { id: 'progress-mode', key: 'features.dev.progress.modes' },
      { id: 'progress-values', key: 'features.dev.progress.values' },
    ]),
  },
  {
    id: 'table',
    label: t('features.dev.tabs.dataTable'),
    searchTerms: localizedSearchTerms('features.dev.tabs.dataTable'),
    icon: 'pi pi-table',
    children: navigationLinks([
      { id: 'data-table-formats', key: 'features.dev.dataTable.formats' },
      { id: 'data-table-selection', key: 'features.dev.dataTable.selection' },
      { id: 'data-table-groups', key: 'features.dev.dataTable.groups' },
      { id: 'data-table-states', key: 'features.dev.dataTable.states' },
    ]),
  },
])

const navigationTargets = computed(() => collectNavigationTargets(navigation.value))
const normalizedNavigationSearch = computed(() => normalizeSearchText(navigationSearch.value))
const visibleNavigation = computed(() =>
  filterNavigationItems(navigation.value, normalizedNavigationSearch.value),
)
const visibleExpandedItems = computed(() =>
  normalizedNavigationSearch.value
    ? collectExpandableNavigationItems(visibleNavigation.value)
    : expandedItems.value,
)

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

function filterNavigationItems(items: NavigationItem[], query: string): NavigationItem[] {
  if (!query) return items

  return items.flatMap((item) => {
    const targetText = item.target
      ? typeof document === 'undefined'
        ? ''
        : document.getElementById(item.target)?.textContent
      : ''
    const bilingualSectionText = targetText ? translatedSearchText(targetText, locale.value) : ''
    const searchableText = [
      item.label,
      ...(item.searchTerms ?? []),
      targetText ?? '',
      bilingualSectionText,
    ].join(' ')
    if (matchesSearchText(query, searchableText)) return [item]

    const children = item.children ? filterNavigationItems(item.children, query) : []
    return children.length ? [{ ...item, children }] : []
  })
}

function collectExpandableNavigationItems(items: NavigationItem[]): string[] {
  return items.flatMap((item) => [
    ...(item.children?.length ? [item.id] : []),
    ...(item.children ? collectExpandableNavigationItems(item.children) : []),
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
              <AppInputText
                id="showcase-navigation-search"
                v-model="navigationSearch"
                type="search"
                size="small"
                fluid
                :aria-label="t('features.dev.navigation.searchSections')"
                :placeholder="t('features.dev.navigation.searchSectionsPlaceholder')"
              />
              <ul class="m-0 list-none space-y-1 p-0">
                <template v-if="visibleNavigation.length">
                  <ShowcaseNavigationItem
                    v-for="item in visibleNavigation"
                    :key="item.id"
                    :item="item"
                    :active-target="activeArticle"
                    :expanded-items="visibleExpandedItems"
                    @toggle="toggleNavigationItem"
                    @navigate="navigateTo"
                  />
                </template>
                <li v-else class="list-none px-2 py-1.5 app-text-sm app-text-muted" role="status">
                  {{ t('features.dev.navigation.noSectionMatches') }}
                </li>
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
        <ToastSection />
        <ConfirmSection />
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
