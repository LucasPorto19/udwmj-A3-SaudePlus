<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-8">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <!-- Logo e Título -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-3xl font-bold">+</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
        <p class="text-gray-600">Cadastre-se para começar a usar o Saúde +</p>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        <InputField
          id="name"
          v-model="name"
          label="Nome Completo"
          type="text"
          placeholder="Seu nome completo"
          required
          :error="errors.name"
        />

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
          hint="Mínimo de 6 caracteres"
        />

        <InputField
          id="confirmPassword"
          v-model="confirmPassword"
          label="Confirmar Senha"
          type="password"
          placeholder="••••••••"
          required
          :error="errors.confirmPassword"
        />

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ errorMessage }}
        </div>

        <ButtonPrimary
          type="submit"
          :loading="loading"
          full-width
        >
          Criar Conta
        </ButtonPrimary>

        <div class="text-center">
          <p class="text-gray-600">
            Já tem uma conta?
            <router-link to="/login" class="text-primary font-semibold hover:underline">
              Entrar
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const errorMessage = ref('')
const loading = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!name.value.trim()) {
    errors.value.name = 'Nome é obrigatório'
  }

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

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Confirmação de senha é obrigatória'
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'As senhas não coincidem'
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  errorMessage.value = ''
  
  if (!validateForm()) {
    return
  }

  loading.value = true
  
  const result = await authStore.register(name.value, email.value, password.value, 'paciente')
  
  if (result.success) {
    router.push('/dashboard')
  } else {
    if (result.error.includes('email-already-in-use')) {
      errorMessage.value = 'Este e-mail já está cadastrado. Tente fazer login.'
    } else {
      errorMessage.value = 'Erro ao criar conta. Tente novamente.'
    }
  }
  
  loading.value = false
}
</script>

