<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Agendar Consulta</h1>

    <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Especialidade -->
        <div>
          <label for="especialidade" class="block text-sm font-medium text-gray-700 mb-2">
            Especialidade <span class="text-red-500">*</span>
          </label>
          <select
            id="especialidade"
            v-model="form.especialidade"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Selecione uma especialidade</option>
            <option value="Clínica Geral">Clínica Geral</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Pediatria">Pediatria</option>
            <option value="Ginecologia">Ginecologia</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Oftalmologia">Oftalmologia</option>
            <option value="Psiquiatria">Psiquiatria</option>
            <option value="Neurologia">Neurologia</option>
            <option value="Endocrinologia">Endocrinologia</option>
          </select>
        </div>

        <!-- Unidade de Saúde -->
        <div>
          <label for="unidade" class="block text-sm font-medium text-gray-700 mb-2">
            Unidade de Saúde <span class="text-red-500">*</span>
          </label>
          <select
            id="unidade"
            v-model="form.unidade"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Selecione uma unidade</option>
            <option value="UBS Centro">UBS Centro</option>
            <option value="UBS Norte">UBS Norte</option>
            <option value="UBS Sul">UBS Sul</option>
            <option value="UBS Leste">UBS Leste</option>
            <option value="UBS Oeste">UBS Oeste</option>
            <option value="Hospital Municipal">Hospital Municipal</option>
            <option value="Clínica de Especialidades">Clínica de Especialidades</option>
          </select>
        </div>

        <!-- Data -->
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700 mb-2">
            Data e Hora <span class="text-red-500">*</span>
          </label>
          <input
            id="date"
            v-model="form.date"
            type="datetime-local"
            required
            :min="minDate"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p class="mt-1 text-sm text-gray-500">
            Selecione a data e hora desejada para sua consulta
          </p>
        </div>

        <!-- Lembrete -->
        <div>
          <label for="lembrete" class="block text-sm font-medium text-gray-700 mb-2">
            Lembrete (opcional)
          </label>
          <textarea
            id="lembrete"
            v-model="form.lembrete"
            rows="3"
            placeholder="Ex: Levar exames anteriores, tomar medicamento antes..."
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
        </div>

        <!-- Mensagem de Erro -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ errorMessage }}
        </div>

        <!-- Mensagem de Sucesso -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {{ successMessage }}
        </div>

        <!-- Botões -->
        <div class="flex flex-col sm:flex-row gap-4">
          <ButtonPrimary
            type="submit"
            :loading="loading"
            full-width
          >
            Agendar Consulta
          </ButtonPrimary>
          <router-link
            to="/dashboard"
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-center"
          >
            Cancelar
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuthStore } from '../stores/auth'
import ButtonPrimary from '../components/ButtonPrimary.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  especialidade: '',
  unidade: '',
  date: '',
  lembrete: ''
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Data mínima: hoje
const minDate = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 16)
})

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!form.value.especialidade || !form.value.unidade || !form.value.date) {
    errorMessage.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  // Validar se a data é futura
  const selectedDate = new Date(form.value.date)
  const now = new Date()
  if (selectedDate <= now) {
    errorMessage.value = 'Por favor, selecione uma data e hora futuras.'
    return
  }

  loading.value = true

  try {
    // Criar agendamento no Firestore
    await addDoc(collection(db, 'appointments'), {
      userId: authStore.user?.uid,
      especialidade: form.value.especialidade,
      unidade: form.value.unidade,
      date: Timestamp.fromDate(selectedDate),
      lembrete: form.value.lembrete || '',
      status: 'agendado',
      createdAt: Timestamp.now()
    })

    successMessage.value = 'Consulta agendada com sucesso!'
    
    // Limpar formulário
    form.value = {
      especialidade: '',
      unidade: '',
      date: '',
      lembrete: ''
    }

    // Redirecionar após 2 segundos
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)

  } catch (error) {
    console.error('Erro ao agendar consulta:', error)
    errorMessage.value = 'Erro ao agendar consulta. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

