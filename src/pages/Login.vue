<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <!-- Logo e Título -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-3xl font-bold">+</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h1>
        <p class="text-gray-600">Entre na sua conta para continuar</p>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <InputField
          id="email"
          v-model="email"
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          required
          :error="errors.email"
        />

        <InputField
          id="password"
          v-model="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          required
          :error="errors.password"
        />

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ errorMessage }}
        </div>

        <ButtonPrimary
          type="submit"
          :loading="loading"
          full-width
        >
          Entrar
        </ButtonPrimary>

        <div class="text-center">
          <p class="text-gray-600">
            Não tem uma conta?
            <router-link to="/register" class="text-primary font-semibold hover:underline">
              Criar conta
            </router-link>
          </p>
        </div>

        <!-- Link para Home -->
        <div class="text-center">
          <router-link to="/" class="text-gray-500 text-sm hover:text-primary">
            ← Voltar para o início
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import InputField from '../components/InputField.vue'
import ButtonPrimary from '../components/ButtonPrimary.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errors = ref({})
const errorMessage = ref('')
const loading = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!email.value) {
    errors.value.email = 'E-mail é obrigatório'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'E-mail inválido'
  }

  if (!password.value) {
    errors.value.password = 'Senha é obrigatória'
  } else if (password.value.length < 6) {
    errors.value.password = 'Senha deve ter pelo menos 6 caracteres'
  }

  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  errorMessage.value = ''
  
  if (!validateForm()) {
    return
  }

  loading.value = true
  
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    // Verificar se é admin e redirecionar
    if (authStore.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  } else {
    errorMessage.value = 'E-mail ou senha incorretos. Tente novamente.'
  }
  
  loading.value = false
}
</script>

