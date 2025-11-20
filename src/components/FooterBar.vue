<template>
  <footer class="bg-gray-800 text-white mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Sobre -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Sobre o Saúde +</h3>
          <p class="text-gray-300 text-sm">
            Plataforma dedicada à promoção da saúde e bem-estar, 
            alinhada com a ODS 3 da ONU.
          </p>
        </div>

        <!-- Links Rápidos -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Links Rápidos</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/" class="text-gray-300 hover:text-primary transition">
                Início
              </router-link>
            </li>
            <li v-if="authStore.user">
              <router-link to="/dashboard" class="text-gray-300 hover:text-primary transition">
                Dashboard
              </router-link>
            </li>
            <li v-if="authStore.user">
              <router-link to="/agendar" class="text-gray-300 hover:text-primary transition">
                Agendar Consulta
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contato</h3>
          <p class="text-gray-300 text-sm">
            Dúvidas? Entre em contato conosco através do suporte.
          </p>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        <p>&copy; 2025 Saúde +. Todos os direitos reservados.</p>
        <p class="mt-2">ODS 3 - Saúde e Bem-Estar</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

