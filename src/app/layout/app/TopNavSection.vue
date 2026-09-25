<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { User } from '../../../feature/auth/store/auth'
import AppAvatar from '../../../shared/component/AppAvatar.vue'
import AppButton from '../../../shared/component/AppButton.vue'
import AppInputText from '../../../shared/component/AppInputText.vue'
import AppSelect from '../../../shared/component/AppSelect.vue'
import AppTag from '../../../shared/component/AppTag.vue'
import AppToggleSwitch from '../../../shared/component/AppToggleSwitch.vue'

defineProps<{
  locale: string
  languageOptions: Array<{ label: string; value: string }>
  isDark: boolean
  user: User | null
}>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
  (e: 'toggleDark'): void
  (e: 'logout'): void
  (e: 'update:locale', value: string): void
}>()
</script>

<template>
  <header
    class="h-14 shrink-0 border-b border-slate-200 bg-white/90 backdrop-blur-md app-dark:border-zinc-800 app-dark:bg-zinc-950/90 z-40"
  >
    <div class="flex h-full items-center justify-between px-4">
      <!-- Left Header Section: Sidebar Toggle & Brand -->
      <div class="flex items-center gap-3">
        <AppButton
          icon="pi pi-bars"
          tone="secondary"
          size="small"
          appearance="text"
          class="p-1.5 app-text-muted"
          :aria-label="$t('nav.toggleSidebar')"
          @click="emit('toggleSidebar')"
        />

        <RouterLink to="/" class="flex items-center gap-2.5 no-underline">
          <span
            class="grid size-8 place-items-center rounded-lg bg-primary-600 app-text-sm font-black text-white shadow-sm"
          >
            A
          </span>
          <span
            class="hidden sm:inline-block app-text-md app-text-normal font-black tracking-tight"
          >
            Apex<span class="text-primary-600">Admin</span>
          </span>
        </RouterLink>

        <AppTag
          :value="$t('app.operational')"
          tone="success"
          class="hidden md:inline-flex app-text-custom px-1.5 py-0.5"
          style="--app-font-size: 10px"
        />
      </div>

      <!-- Center Search Bar -->
      <div class="hidden lg:flex items-center w-72 relative">
        <AppInputText
          :placeholder="$t('app.searchPlaceholder')"
          class="w-full app-text-xs pl-8 pr-12"
          fluid
        />
        <i
          class="pi pi-search absolute left-2.5 top-1/2 -translate-y-1/2 app-text-xs app-text-muted"
        />
        <span
          class="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-slate-100 px-1 py-0.5 app-text-custom app-text-muted font-mono app-dark:border-zinc-800 app-dark:bg-zinc-900"
          style="--app-font-size: 9px"
        >
          ⌘K
        </span>
      </div>

      <!-- Right Controls: Language, Theme, Profile -->
      <div class="flex items-center gap-2.5">
        <AppSelect
          :model-value="locale"
          :options="languageOptions"
          option-label="label"
          option-value="value"
          size="small"
          class="w-28"
          :aria-label="$t('nav.language')"
          @update:model-value="(val) => emit('update:locale', val)"
        />

        <AppButton
          :label="locale.toUpperCase()"
          tone="secondary"
          size="small"
          appearance="text"
          class="font-mono app-text-xs font-bold px-2 py-1"
          :title="$t('nav.toggleLanguage')"
          @click="emit('update:locale', locale === 'en' ? 'th' : 'en')"
        />

        <div
          class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1 app-dark:border-zinc-800"
        >
          <i class="pi pi-moon app-text-xs app-text-muted" aria-hidden="true" />
          <AppToggleSwitch
            :model-value="isDark"
            :aria-label="$t('nav.darkMode')"
            class="scale-75"
            @update:model-value="emit('toggleDark')"
          />
        </div>

        <!-- Notifications Bell -->
        <div class="relative">
          <AppButton
            icon="pi pi-bell"
            tone="secondary"
            size="small"
            appearance="text"
            class="p-1.5 app-text-muted"
            :aria-label="$t('nav.notifications')"
          />
          <span
            class="absolute top-1 right-1 size-2 rounded-full bg-rose-500 ring-2 ring-white app-dark:ring-zinc-950"
          />
        </div>

        <!-- User Profile & Sign Out -->
        <div
          v-if="user"
          class="flex items-center gap-2 pl-2 border-l border-slate-200 app-dark:border-zinc-800"
        >
          <AppAvatar :image="user.avatar" shape="circle" class="size-7" />
          <div class="hidden xl:block text-left">
            <span class="block app-text-xs app-text-normal font-bold leading-none">
              {{ user.name }}
            </span>
            <span class="block app-text-custom app-text-muted" style="--app-font-size: 10px">
              {{ user.role }}
            </span>
          </div>
          <AppButton
            icon="pi pi-power-off"
            tone="secondary"
            size="small"
            appearance="text"
            class="app-text-xs p-1"
            :title="$t('actions.signOut')"
            @click="emit('logout')"
          />
        </div>
      </div>
    </div>
  </header>
</template>
