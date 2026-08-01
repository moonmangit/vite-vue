<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Tag from 'primevue/tag'
import ToggleSwitch from 'primevue/toggleswitch'
import { RouterLink } from 'vue-router'
import type { User } from '../../../feature/auth/store/auth'

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
        <Button
          icon="pi pi-bars"
          severity="secondary"
          size="small"
          text
          class="p-1.5 text-slate-600 app-dark:text-zinc-300"
          aria-label="Toggle Sidebar"
          @click="emit('toggleSidebar')"
        />

        <RouterLink to="/" class="flex items-center gap-2.5 no-underline">
          <span
            class="grid size-8 place-items-center rounded-lg bg-primary-600 text-sm font-black text-white shadow-sm"
          >
            A
          </span>
          <span
            class="hidden sm:inline-block text-base font-black tracking-tight text-slate-900 app-dark:text-white"
          >
            Apex<span class="text-primary-600">Admin</span>
          </span>
        </RouterLink>

        <Tag
          :value="$t('app.operational')"
          severity="success"
          class="hidden md:inline-flex text-[10px] px-1.5 py-0.5"
        />
      </div>

      <!-- Center Search Bar -->
      <div class="hidden lg:flex items-center w-72 relative">
        <InputText :placeholder="$t('app.searchPlaceholder')" class="w-full text-xs pl-8 pr-12" />
        <i class="pi pi-search absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
        <span
          class="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-slate-100 px-1 py-0.5 text-[9px] font-mono text-slate-400 app-dark:border-zinc-800 app-dark:bg-zinc-900"
        >
          ⌘K
        </span>
      </div>

      <!-- Right Controls: Language, Theme, Profile -->
      <div class="flex items-center gap-2.5">
        <Select
          :model-value="locale"
          :options="languageOptions"
          option-label="label"
          option-value="value"
          size="small"
          class="w-28"
          aria-label="Language"
          @update:model-value="(val) => emit('update:locale', val)"
        />

        <Button
          :label="locale.toUpperCase()"
          severity="secondary"
          size="small"
          text
          class="font-mono text-xs font-bold px-2 py-1"
          title="Toggle Language (EN/TH)"
          @click="emit('update:locale', locale === 'en' ? 'th' : 'en')"
        />

        <div
          class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1 app-dark:border-zinc-800"
        >
          <i class="pi pi-moon text-xs text-slate-400" aria-hidden="true" />
          <ToggleSwitch
            :model-value="isDark"
            aria-label="Dark mode"
            class="scale-75"
            @update:model-value="emit('toggleDark')"
          />
        </div>

        <!-- Notifications Bell -->
        <div class="relative">
          <Button
            icon="pi pi-bell"
            severity="secondary"
            size="small"
            text
            class="p-1.5 text-slate-600 app-dark:text-zinc-300"
            aria-label="Notifications"
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
          <Avatar :image="user.avatar" shape="circle" size="normal" class="size-7" />
          <div class="hidden xl:block text-left">
            <span class="block text-xs font-bold leading-none text-slate-900 app-dark:text-white">
              {{ user.name }}
            </span>
            <span class="block text-[10px] text-slate-400 app-dark:text-zinc-500">
              {{ user.role }}
            </span>
          </div>
          <Button
            icon="pi pi-power-off"
            severity="secondary"
            size="small"
            text
            class="text-xs p-1"
            :title="$t('actions.signOut')"
            @click="emit('logout')"
          />
        </div>
      </div>
    </div>
  </header>
</template>
