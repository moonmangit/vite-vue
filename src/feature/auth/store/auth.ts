import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>({
    id: 'usr_101',
    name: 'Alex Morgan',
    email: 'alex.morgan@admin.com',
    role: 'System Administrator',
    avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
  })
  const isAuthenticated = ref<boolean>(true)

  function login(email: string, password?: string): boolean {
    void password
    user.value = {
      id: 'usr_101',
      name: email.split('@')[0].toUpperCase() || 'Admin User',
      email: email || 'admin@company.com',
      role: 'System Administrator',
      avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    }
    isAuthenticated.value = true
    return true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
})
