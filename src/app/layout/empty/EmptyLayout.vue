<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppToastOutlet } from '../../../shared/toast/main'
</script>

<template>
  <AppToastOutlet />
  <div class="min-h-screen bg-slate-50 app-text-normal transition-colors app-dark:bg-zinc-950">
    <RouterView />
  </div>
</template>
