<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppTabs from '../../../../../shared/component/AppTabs.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'

type ShowcaseVariant = {
  value: string
  label: string
  disabled?: boolean
}

const moduleIcons: Record<string, string> = {
  input: 'pi pi-pencil',
  button: 'pi pi-circle',
  badge: 'pi pi-tag',
  card: 'pi pi-id-card',
  dialog: 'pi pi-window-maximize',
  typography: 'pi pi-align-left',
  chart: 'pi pi-chart-bar',
  avatar: 'pi pi-user',
  message: 'pi pi-info-circle',
  progress: 'pi pi-chart-line',
}

const props = withDefaults(
  defineProps<{
    id: string
    title: string
    subtitle?: string
    icon?: string
    variants?: ShowcaseVariant[]
    card?: boolean
  }>(),
  { subtitle: undefined, icon: undefined, variants: () => [], card: true },
)

const { t } = useI18n({ useScope: 'global' })
const moduleKey = computed(() => props.id.split('-')[0])
const subtitle = computed(
  () =>
    props.subtitle ??
    (moduleKey.value === 'input' ? '' : t(`features.dev.${moduleKey.value}.description`)),
)
const icon = computed(() => props.icon ?? moduleIcons[moduleKey.value] ?? 'pi pi-circle')
const activeVariant = ref(props.variants?.[0]?.value ?? '')
</script>

<template>
  <section :id="id" class="scroll-mt-6" :aria-labelledby="`${id}-title`">
    <AppCard v-if="card !== false" variant="full">
      <template #title>
        <span :id="`${id}-title`">{{ title }}</span>
      </template>
      <template v-if="subtitle" #subtitle>{{ subtitle }}</template>
      <template #header-icon>
        <i :class="icon" aria-hidden="true" />
      </template>
      <template #content>
        <AppTabs
          v-if="variants && variants.length > 1"
          v-model="activeVariant"
          :items="variants"
          scrollable
          class="min-w-0"
        >
          <template v-for="variant in variants" #[variant.value]>
            <slot :name="variant.value" :variant="variant" />
          </template>
        </AppTabs>
        <slot v-else />
      </template>
    </AppCard>
    <template v-else>
      <h3 :id="`${id}-title`" class="mb-3 app-text-md app-text-normal font-semibold">
        {{ title }}
      </h3>
      <AppTabs
        v-if="variants && variants.length > 1"
        v-model="activeVariant"
        :items="variants"
        scrollable
        class="min-w-0"
      >
        <template v-for="variant in variants" #[variant.value]>
          <slot :name="variant.value" :variant="variant" />
        </template>
      </AppTabs>
      <slot v-else />
    </template>
  </section>
</template>
