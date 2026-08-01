import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import { AppPreset } from './preset'

export * from './preset'

export function installPrimeVue(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset: AppPreset,
      options: {
        darkModeSelector: '.app-dark',
      },
    },
  })
  app.use(ToastService)
}
