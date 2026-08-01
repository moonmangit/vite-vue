<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('admin@company.com')
const password = ref('password123')
const isSubmitting = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      router.push('/')
    } else {
      errorMessage.value = 'Invalid email or password.'
    }
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'An error occurred during sign in.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <Message v-if="errorMessage" severity="error" variant="simple" size="small">
      {{ errorMessage }}
    </Message>

    <div class="space-y-1.5">
      <label
        for="email"
        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 app-dark:text-zinc-400"
      >
        {{ $t('auth.emailLabel') }}
      </label>
      <div class="relative">
        <InputText
          id="email"
          v-model="email"
          type="email"
          placeholder="admin@company.com"
          class="w-full pl-9 text-sm"
          required
        />
        <i class="pi pi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
      </div>
    </div>

    <div class="space-y-1.5">
      <div class="flex items-center justify-between">
        <label
          for="password"
          class="block text-xs font-semibold uppercase tracking-wider text-slate-500 app-dark:text-zinc-400"
        >
          {{ $t('auth.passwordLabel') }}
        </label>
        <a
          href="#"
          class="text-xs font-semibold text-primary-600 hover:text-primary-500 no-underline"
        >
          {{ $t('actions.forgotPassword') }}
        </a>
      </div>
      <div class="relative">
        <Password
          id="password"
          v-model="password"
          :feedback="false"
          toggle-mask
          fluid
          class="text-sm"
          input-class="w-full pl-9 text-sm"
          required
        />
        <i
          class="pi pi-lock absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 text-xs"
        />
      </div>
    </div>

    <Button
      type="submit"
      :label="$t('actions.signIn')"
      icon="pi pi-sign-in"
      :loading="isSubmitting"
      fluid
      class="mt-2 font-semibold"
    />
  </form>
</template>
