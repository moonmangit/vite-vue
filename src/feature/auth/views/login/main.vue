<script setup lang="ts">
import LoginForm from '../../component/LoginForm.vue'
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-slate-50 to-primary-50 app-dark:from-zinc-950 app-dark:via-zinc-900 app-dark:to-primary-950/20"
  >
    <div
      class="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-xl backdrop-blur-md app-dark:border-zinc-800 app-dark:bg-zinc-900/90"
    >
      <div class="mb-6 text-center">
        <div
          class="inline-flex size-12 items-center justify-center rounded-xl bg-primary-600 text-xl font-black text-white shadow-md shadow-primary-500/20 mb-3"
        >
          A
        </div>
        <div class="flex items-center justify-center gap-2 mb-1">
          <h1 class="text-2xl font-black tracking-tight text-slate-900 app-dark:text-white">
            Apex<span class="text-primary-600">Admin</span>
          </h1>
        </div>
        <p class="text-xs text-slate-500 app-dark:text-zinc-400">
          {{ $t('auth.title') }}
        </p>
      </div>

      <LoginForm />

      <div
        class="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-400 app-dark:border-zinc-800 app-dark:text-zinc-500"
      >
        <span>{{ $t('auth.version') }}</span>
      </div>
    </div>
  </div>
</template>
