<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'
</script>

<template>
  <Toast />
  <div
    class="min-h-screen bg-slate-50 text-slate-950 transition-colors app-dark:bg-zinc-950 app-dark:text-zinc-50"
  >
    <RouterView />
  </div>
</template>
