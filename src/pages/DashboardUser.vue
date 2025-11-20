<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Cabeçalho -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        Olá, {{ authStore.userData?.name || 'Usuário' }}!
      </h1>
      <p class="text-gray-600">Bem-vindo ao seu painel de saúde</p>
    </div>

    <!-- Cards de Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm mb-1">Consultas Agendadas</p>
            <p class="text-3xl font-bold text-primary">{{ agendadasCount }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm mb-1">Consultas Realizadas</p>
            <p class="text-3xl font-bold text-green-600">{{ realizadasCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm mb-1">Próxima Consulta</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ proximaConsulta ? formatDate(proximaConsulta.date) : 'Nenhuma' }}
            </p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Ações Rápidas -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/agendar"
          class="flex items-center p-4 border-2 border-primary rounded-lg hover:bg-blue-50 transition"
        >
          <svg class="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <div>
            <p class="font-semibold text-gray-800">Agendar Consulta</p>
            <p class="text-sm text-gray-600">Nova consulta médica</p>
          </div>
        </router-link>

        <router-link
          to="/historico"
          class="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <svg class="w-8 h-8 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <p class="font-semibold text-gray-800">Ver Histórico</p>
            <p class="text-sm text-gray-600">Consultas anteriores</p>
          </div>
        </router-link>

        <div class="flex items-center p-4 border-2 border-gray-300 rounded-lg opacity-50">
          <svg class="w-8 h-8 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <div>
            <p class="font-semibold text-gray-800">Medicamentos</p>
            <p class="text-sm text-gray-600">Em breve</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Próximas Consultas -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-800">Próximas Consultas</h2>
        <router-link to="/agendar" class="text-primary hover:underline text-sm">
          Ver todas
        </router-link>
      </div>
      
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Carregando...</p>
      </div>
      
      <div v-else-if="proximasConsultas.length === 0" class="text-center py-8">
        <p class="text-gray-600 mb-4">Nenhuma consulta agendada</p>
        <router-link
          to="/agendar"
          class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Agendar Consulta
        </router-link>
      </div>
      
      <div v-else>
        <AppointmentCard
          v-for="consulta in proximasConsultas.slice(0, 3)"
          :key="consulta.id"
          :appointment="consulta"
          @update-status="handleUpdateStatus"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, query, where, getDocs, orderBy, limit, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuthStore } from '../stores/auth'
import AppointmentCard from '../components/AppointmentCard.vue'

const authStore = useAuthStore()
const consultas = ref([])
const loading = ref(true)

const agendadasCount = computed(() => {
  return consultas.value.filter(c => c.status === 'agendado').length
})

const realizadasCount = computed(() => {
  return consultas.value.filter(c => c.status === 'concluído').length
})

const proximaConsulta = computed(() => {
  const agendadas = consultas.value
    .filter(c => c.status === 'agendado')
    .sort((a, b) => {
      const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date)
      const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date)
      return dateA - dateB
    })
  return agendadas[0] || null
})

const proximasConsultas = computed(() => {
  return consultas.value
    .filter(c => c.status === 'agendado')
    .sort((a, b) => {
      const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date)
      const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date)
      return dateA - dateB
    })
})

const formatDate = (date) => {
  if (!date) return ''
  const d = date.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const loadConsultas = async () => {
  if (!authStore.user) return
  
  loading.value = true
  try {
    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', authStore.user.uid),
      orderBy('date', 'desc')
    )
    const querySnapshot = await getDocs(q)
    consultas.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erro ao carregar consultas:', error)
  } finally {
    loading.value = false
  }
}

const handleUpdateStatus = async (consultaId, newStatus) => {
  // Redirecionar para histórico para atualizar status
  // Ou implementar atualização direta aqui
  await loadConsultas()
}

onMounted(() => {
  loadConsultas()
})
</script>

