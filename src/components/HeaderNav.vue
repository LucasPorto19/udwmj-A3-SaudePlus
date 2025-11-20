<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white text-xl font-bold">+</span>
          </div>
          <span class="text-xl font-bold text-gray-800">Saúde +</span>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link 
            v-if="authStore.user"
            to="/dashboard" 
            class="text-gray-700 hover:text-primary transition"
          >
            Dashboard
          </router-link>
          <router-link 
            v-if="authStore.user"
            to="/agendar" 
            class="text-gray-700 hover:text-primary transition"
          >
            Agendar Consulta
          </router-link>
          <router-link 
            v-if="authStore.user"
            to="/historico" 
            class="text-gray-700 hover:text-primary transition"
          >
            Histórico
          </router-link>
          <router-link 
            v-if="authStore.isAdmin"
            to="/admin" 
            class="text-gray-700 hover:text-primary transition"
          >
            Painel Admin
          </router-link>
          <button
            v-if="authStore.user"
            @click="handleLogout"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Sair
          </button>
          <router-link
            v-else
            to="/login"
            class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Entrar
          </router-link>
        </div>

        <!-- Menu Mobile -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-gray-700"
          aria-label="Menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Menu Mobile Expandido -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-2">
        <router-link 
          v-if="authStore.user"
          to="/dashboard" 
          class="block py-2 text-gray-700 hover:text-primary"
          @click="mobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        <router-link 
          v-if="authStore.user"
          to="/agendar" 
          class="block py-2 text-gray-700 hover:text-primary"
          @click="mobileMenuOpen = false"
        >
          Agendar Consulta
        </router-link>
        <router-link 
          v-if="authStore.user"
          to="/historico" 
          class="block py-2 text-gray-700 hover:text-primary"
          @click="mobileMenuOpen = false"
        >
          Histórico
        </router-link>
        <router-link 
          v-if="authStore.isAdmin"
          to="/admin" 
          class="block py-2 text-gray-700 hover:text-primary"
          @click="mobileMenuOpen = false"
        >
          Painel Admin
        </router-link>
        <button
          v-if="authStore.user"
          @click="handleLogout"
          class="w-full text-left py-2 text-red-500 hover:text-red-600"
        >
          Sair
        </button>
        <router-link
          v-else
          to="/login"
          class="block bg-primary text-white px-4 py-2 rounded-lg text-center"
          @click="mobileMenuOpen = false"
        >
          Entrar
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
  mobileMenuOpen.value = false
}
</script>

