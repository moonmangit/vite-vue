<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import AppCard from '../../../../shared/component/AppCard.vue'
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
import { createShowcaseFormState } from './lib/formState'
import { useHashSectionNavigation } from './composable/useHashSectionNavigation'

hljs.registerLanguage('json', json)

const { t } = useI18n({ useScope: 'global' })
const activeArticle = ref('input-text')
const expandedModule = ref('input')
const isMobileNavigationOpen = ref(false)
const form = reactive(createShowcaseFormState())
const formJson = computed(() => JSON.stringify(form, null, 2))
const highlightedFormJson = computed(
  () => hljs.highlight(formJson.value, { language: 'json' }).value,
)

const navigation = computed(() => [
  {
    id: 'input',
    label: t('features.dev.tabs.input'),
    icon: 'pi pi-pencil',
    leaves: [
      { id: 'input-text', label: t('features.dev.input.text') },
      { id: 'input-text-sizes', label: t('features.dev.input.sizes') },
      { id: 'input-password', label: t('features.dev.input.password') },
      { id: 'input-textarea', label: t('features.dev.input.textarea') },
      { id: 'input-number', label: t('features.dev.input.number') },
      { id: 'input-number-states', label: t('features.dev.input.numberStates') },
      { id: 'input-dropdown', label: t('features.dev.input.select') },
      { id: 'input-checkbox', label: t('features.dev.input.checkbox') },
      { id: 'input-control-states', label: t('features.dev.input.controlStates') },
      { id: 'input-switch', label: t('features.dev.input.switch') },
      { id: 'input-radio', label: t('features.dev.input.radio') },
      { id: 'input-file', label: t('features.dev.input.file') },
      { id: 'input-image', label: t('features.dev.input.image') },
    ],
  },
  {
    id: 'button',
    label: t('features.dev.tabs.button'),
    icon: 'pi pi-circle',
    leaves: [
      { id: 'button-severity', label: t('features.dev.button.severities') },
      { id: 'button-style', label: t('features.dev.button.styles') },
      { id: 'button-icon', label: t('features.dev.button.iconVariants') },
      { id: 'button-size', label: t('features.dev.button.sizeVariants') },
      { id: 'button-layout', label: t('features.dev.button.layout') },
      { id: 'button-state', label: t('features.dev.button.states') },
    ],
  },
  {
    id: 'badge',
    label: t('features.dev.tabs.badge'),
    icon: 'pi pi-tag',
    leaves: [
      { id: 'badge-severity', label: t('features.dev.badge.severities') },
      { id: 'badge-numeric', label: t('features.dev.badge.numeric') },
      { id: 'badge-sizes', label: t('features.dev.badge.sizes') },
      { id: 'badge-tag-appearance', label: t('features.dev.badge.tagAppearance') },
      { id: 'badge-status', label: t('features.dev.badge.shared') },
    ],
  },
  {
    id: 'card',
    label: t('features.dev.tabs.card'),
    icon: 'pi pi-id-card',
    leaves: [
      { id: 'card-variants', label: t('features.dev.card.variants') },
      { id: 'card-stat', label: t('features.dev.card.shared') },
    ],
  },
  {
    id: 'dialog',
    label: t('features.dev.tabs.dialog'),
    icon: 'pi pi-window-maximize',
    leaves: [
      { id: 'dialog-basic', label: t('features.dev.dialog.basic') },
      { id: 'dialog-form', label: t('features.dev.dialog.form') },
      { id: 'dialog-confirm', label: t('features.dev.dialog.confirm') },
      { id: 'dialog-maximizable', label: t('features.dev.dialog.maximizable') },
      { id: 'dialog-options', label: t('features.dev.dialog.options') },
    ],
  },
  {
    id: 'typography',
    label: t('features.dev.tabs.typography'),
    icon: 'pi pi-align-left',
    leaves: [
      { id: 'typography-size', label: t('features.dev.typography.sizes') },
      { id: 'typography-tone', label: t('features.dev.typography.tones') },
      { id: 'typography-custom', label: t('features.dev.typography.customSizes') },
      { id: 'typography-color', label: t('features.dev.typography.semanticColors') },
    ],
  },
  {
    id: 'chart',
    label: t('features.dev.tabs.chart'),
    icon: 'pi pi-chart-bar',
    leaves: [{ id: 'chart-types', label: t('features.dev.chart.types') }],
  },
  {
    id: 'avatar',
    label: t('features.dev.tabs.avatar'),
    icon: 'pi pi-user',
    leaves: [
      { id: 'avatar-content', label: t('features.dev.avatar.content') },
      { id: 'avatar-shape', label: t('features.dev.avatar.shapes') },
      { id: 'avatar-size', label: t('features.dev.avatar.sizes') },
    ],
  },
  {
    id: 'message',
    label: t('features.dev.tabs.message'),
    icon: 'pi pi-info-circle',
    leaves: [
      { id: 'message-severity', label: t('features.dev.message.severities') },
      { id: 'message-appearance', label: t('features.dev.message.variants') },
      { id: 'message-state', label: t('features.dev.message.states') },
    ],
  },
  {
    id: 'progress',
    label: t('features.dev.tabs.progress'),
    icon: 'pi pi-chart-line',
    leaves: [
      { id: 'progress-mode', label: t('features.dev.progress.modes') },
      { id: 'progress-values', label: t('features.dev.progress.values') },
    ],
  },
  {
    id: 'table',
    label: t('features.dev.tabs.dataTable'),
    icon: 'pi pi-table',
    leaves: [
      { id: 'data-table-formats', label: t('features.dev.dataTable.formats') },
      { id: 'data-table-selection', label: t('features.dev.dataTable.selection') },
      { id: 'data-table-groups', label: t('features.dev.dataTable.groups') },
      { id: 'data-table-states', label: t('features.dev.dataTable.states') },
    ],
  },
])

let articleObserver: IntersectionObserver | undefined

function syncNavigationToSection(id: string) {
  const module = navigation.value.find(
    (item) => item.id === id || item.leaves.some((leaf) => leaf.id === id),
  )
  if (!module) return

  activeArticle.value =
    module.leaves.find((leaf) => leaf.id === id)?.id ?? module.leaves[0]?.id ?? ''
  expandedModule.value = module.id
}

const navigateToSection = useHashSectionNavigation(syncNavigationToSection)

function navigateTo(id: string) {
  navigateToSection(id, 'smooth')
  isMobileNavigationOpen.value = false
}

function toggleModule(moduleId: string) {
  expandedModule.value = expandedModule.value === moduleId ? '' : moduleId
}

function needsExpandedLabel(label: string) {
  return label.length > 20
}

onMounted(() => {
  const scrollContainer = document.querySelector('main')
  articleObserver = new IntersectionObserver(
    (entries) => {
      const lastModule = navigation.value[navigation.value.length - 1]
      const lastArticle = lastModule?.leaves[lastModule.leaves.length - 1]
      if (
        scrollContainer &&
        lastArticle &&
        scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 2
      ) {
        navigateToArticle(lastArticle.id)
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

  for (const module of navigation.value) {
    for (const leaf of module.leaves) {
      const article = document.getElementById(leaf.id)
      if (article) articleObserver.observe(article)
    }
  }
})

function navigateToArticle(id: string) {
  activeArticle.value = id
  expandedModule.value =
    navigation.value.find((module) => module.leaves.some((leaf) => leaf.id === id))?.id ??
    expandedModule.value
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
      class="grid min-w-0 gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8 showcase:grid-cols-[15rem_minmax(0,1fr)_19rem]"
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
              <section v-for="module in navigation" :key="module.id" class="space-y-1">
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left app-text-sm app-text-normal font-semibold hover:bg-surface-100 app-dark:hover:bg-surface-800"
                  :aria-expanded="expandedModule === module.id"
                  :aria-controls="`${module.id}-navigation`"
                  @click="toggleModule(module.id)"
                >
                  <span class="inline-flex items-center gap-2">
                    <span class="inline-flex size-4 shrink-0 items-center justify-center">
                      <i :class="[module.icon, 'app-text-xs app-text-muted']" aria-hidden="true" />
                    </span>
                    {{ module.label }}
                  </span>
                  <i
                    :class="
                      expandedModule === module.id ? 'pi pi-chevron-down' : 'pi pi-chevron-right'
                    "
                    class="app-text-xs app-text-muted"
                    aria-hidden="true"
                  />
                </button>
                <div
                  :id="`${module.id}-navigation`"
                  class="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
                  :class="expandedModule === module.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                  :aria-hidden="expandedModule !== module.id"
                  :inert="expandedModule !== module.id"
                >
                  <div class="min-h-0 overflow-hidden">
                    <ul
                      class="m-0 mt-1 ml-4 list-none space-y-0.5 border-l app-surface-border pl-3"
                    >
                      <li v-for="leaf in module.leaves" :key="leaf.id">
                        <a
                          :href="`#${leaf.id}`"
                          class="block min-w-0 rounded-lg px-2.5 py-2 app-text-sm font-semibold transition-all duration-150"
                          :class="
                            activeArticle === leaf.id
                              ? 'bg-primary-50 text-primary-700 font-bold shadow-2xs app-dark:bg-primary-600 app-dark:text-white app-dark:shadow-xs'
                              : 'app-text-muted hover:bg-surface-100 app-hover-text-normal app-dark:hover:bg-surface-900'
                          "
                          :aria-current="activeArticle === leaf.id ? 'location' : undefined"
                          @click.prevent="navigateTo(leaf.id)"
                        >
                          <span class="block truncate leading-5">{{ leaf.label }}</span>
                          <span
                            class="grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-200 ease-out motion-reduce:transition-none"
                            :class="
                              activeArticle === leaf.id && needsExpandedLabel(leaf.label)
                                ? 'mt-1 grid-rows-[1fr] opacity-100'
                                : 'mt-0 grid-rows-[0fr] opacity-0'
                            "
                            :aria-hidden="
                              !(activeArticle === leaf.id && needsExpandedLabel(leaf.label))
                            "
                          >
                            <span
                              class="min-h-0 overflow-hidden whitespace-normal break-words app-text-xs app-text-muted font-normal leading-4"
                              >{{ leaf.label }}</span
                            >
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </nav>
        </div>
      </aside>

      <article class="min-w-0 space-y-12">
        <InputSection :form="form" />
        <ButtonSection />
        <BadgeSection />
        <CardSection />
        <DialogSection />
        <TypographySection />
        <ChartSection />
        <AvatarSection />
        <MessageSection />
        <ProgressSection />
        <DataTableSection />
      </article>

      <aside
        class="min-w-0 lg:col-span-2 showcase:col-span-1 showcase:sticky showcase:top-4 showcase:self-start"
      >
        <section aria-labelledby="showcase-form-state-title" class="space-y-3">
          <AppCard variant="full" class="max-h-[calc(100vh-8rem)] overflow-auto">
            <template #title>
              <span id="showcase-form-state-title">{{ t('features.dev.input.submitted') }}</span>
            </template>
            <template #header-icon><i class="pi pi-code" aria-hidden="true" /></template>
            <!-- Highlight.js escapes source text before producing token markup. -->
            <!-- eslint-disable vue/no-v-html -->
            <pre class="form-json-preview m-0 overflow-x-auto app-text-xs"><code
              class="hljs language-json"
              :aria-label="t('features.dev.input.jsonPreview')"
              v-html="highlightedFormJson"
            /></pre>
            <!-- eslint-enable vue/no-v-html -->
          </AppCard>
        </section>
      </aside>
    </div>
  </section>
</template>
