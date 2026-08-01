import { createApp } from 'vue'
import './style.css'
import App from './app/App.vue'
import { i18n, installDesignTokens, installPrimeVue, pinia, router } from './app/config'

installDesignTokens()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
installPrimeVue(app)
app.mount('#app')
