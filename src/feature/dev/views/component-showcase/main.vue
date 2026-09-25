<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InputSection from './section/InputSection.vue'
import ButtonSection from './section/ButtonSection.vue'
import BadgeSection from './section/BadgeSection.vue'
import CardSection from './section/CardSection.vue'
import DialogSection from './section/DialogSection.vue'
import TypographySection from './section/TypographySection.vue'
import ChartSection from './section/ChartSection.vue'
import AppTabs from '../../../../shared/component/AppTabs.vue'

const activeTab = ref('input')
const { t } = useI18n({ useScope: 'global' })

const showcaseTabs = computed(() => [
  { value: 'input', label: t('features.dev.tabs.input'), icon: 'pi pi-pencil' },
  { value: 'button', label: t('features.dev.tabs.button'), icon: 'pi pi-circle' },
  { value: 'badge', label: t('features.dev.tabs.badge'), icon: 'pi pi-tag' },
  { value: 'card', label: t('features.dev.tabs.card'), icon: 'pi pi-id-card' },
  { value: 'dialog', label: t('features.dev.tabs.dialog'), icon: 'pi pi-window-maximize' },
  { value: 'typography', label: t('features.dev.tabs.typography'), icon: 'pi pi-align-left' },
  { value: 'chart', label: t('features.dev.tabs.chart'), icon: 'pi pi-chart-bar' },
])
</script>

<template>
  <section class="mx-auto w-full max-w-7xl space-y-5">
    <header class="space-y-1">
      <h1 class="app-text-2xl app-text-normal font-bold tracking-tight">
        {{ t('features.dev.page.title') }}
      </h1>
      <p class="app-text-sm app-text-muted">
        {{ t('features.dev.page.subtitle') }}
      </p>
    </header>

    <AppTabs v-model="activeTab" :items="showcaseTabs" scrollable class="min-w-0">
      <template #input><InputSection /></template>
      <template #button><ButtonSection /></template>
      <template #badge><BadgeSection /></template>
      <template #card><CardSection /></template>
      <template #dialog><DialogSection /></template>
      <template #typography><TypographySection /></template>
      <template #chart><ChartSection /></template>
    </AppTabs>
  </section>
</template>
