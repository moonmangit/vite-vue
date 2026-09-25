<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import AppButton from '../../../shared/component/AppButton.vue'
import AppInputText from '../../../shared/component/AppInputText.vue'
import AppMessage from '../../../shared/component/AppMessage.vue'
import AppPassword from '../../../shared/component/AppPassword.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('admin@company.com')
const password = ref('password123')
const isSubmitting = ref(false)
const errorMessage = ref('')
const errorMessageKey = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''
  errorMessageKey.value = ''

  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      router.push('/')
    } else {
      errorMessageKey.value = 'features.auth.login.invalidCredentials'
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessageKey.value = 'features.auth.login.signInError'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <AppMessage
      v-if="errorMessage || errorMessageKey"
      severity="error"
      variant="simple"
      size="small"
    >
      {{ errorMessage || $t(errorMessageKey) }}
    </AppMessage>

    <div class="space-y-1.5">
      <label
        for="email"
        class="block app-text-xs app-text-muted font-semibold uppercase tracking-wider"
      >
        {{ $t('features.auth.login.emailLabel') }}
      </label>
      <div class="relative">
        <AppInputText
          id="email"
          v-model="email"
          type="email"
          :placeholder="$t('features.auth.login.emailPlaceholder')"
          class="w-full pl-9 app-text-sm"
          required
        />
        <i
          class="pi pi-envelope absolute left-3 top-1/2 -translate-y-1/2 app-text-xs app-text-muted"
        />
      </div>
    </div>

    <div class="space-y-1.5">
      <div class="flex items-center justify-between">
        <label
          for="password"
          class="block app-text-xs app-text-muted font-semibold uppercase tracking-wider"
        >
          {{ $t('features.auth.login.passwordLabel') }}
        </label>
        <a
          href="#"
          class="app-text-xs font-semibold text-primary-600 hover:text-primary-500 no-underline"
        >
          {{ $t('features.auth.login.forgotPassword') }}
        </a>
      </div>
      <div class="relative">
        <AppPassword
          id="password"
          v-model="password"
          :feedback="false"
          toggle-mask
          fluid
          class="app-text-sm"
          input-class="w-full pl-9 app-text-sm"
          required
        />
        <i
          class="pi pi-lock absolute left-3 top-1/2 -translate-y-1/2 z-10 app-text-xs app-text-muted"
        />
      </div>
    </div>

    <AppButton
      type="submit"
      :label="$t('features.auth.login.signIn')"
      icon="pi pi-sign-in"
      :loading="isSubmitting"
      fluid
      class="mt-2 font-semibold"
    />
  </form>
</template>
