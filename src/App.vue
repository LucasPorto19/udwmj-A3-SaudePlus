<template>
  <div id="app" class="min-h-screen flex flex-col">
    <HeaderNav v-if="showHeader" />
    <main class="flex-grow">
      <router-view />
    </main>
    <FooterBar v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue'
import FooterBar from './components/FooterBar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
authStore.initAuth()


const route = useRoute()

// Não mostrar header/footer em páginas de login/registro
const showHeader = computed(() => {
  return route.name !== 'login' && route.name !== 'register'
})

const showFooter = computed(() => {
  return route.name !== 'login' && route.name !== 'register'
})
</script>

