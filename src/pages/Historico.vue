<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Histórico Médico</h1>

    <!-- Resumo Estatístico -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm mb-1">Total de Consultas</p>
            <p class="text-3xl font-bold text-primary">{{ totalConsultas }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
            <p class="text-gray-600 text-sm mb-1">Não Compareceu</p>
            <p class="text-3xl font-bold text-red-600">{{ faltouCount }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <select
          v-model="filtroStatus"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos os status</option>
          <option value="agendado">Agendado</option>
          <option value="concluído">Concluído</option>
          <option value="faltou">Não Compareceu</option>
        </select>

        <select
          v-model="filtroEspecialidade"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas as especialidades</option>
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

        <button
          @click="filtroStatus = ''; filtroEspecialidade = ''"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Limpar Filtros
        </button>
      </div>
    </div>

    <!-- Lista de Consultas -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Carregando histórico...</p>
    </div>

    <div v-else-if="consultasFiltradas.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="text-gray-600 text-lg mb-4">Nenhuma consulta encontrada</p>
      <router-link
        to="/agendar"
        class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Agendar Primeira Consulta
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <AppointmentCard
        v-for="consulta in consultasFiltradas"
        :key="consulta.id"
        :appointment="consulta"
        @update-status="handleUpdateStatus"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuthStore } from '../stores/auth'
import AppointmentCard from '../components/AppointmentCard.vue'

const authStore = useAuthStore()
const consultas = ref([])
const loading = ref(true)
const filtroStatus = ref('')
const filtroEspecialidade = ref('')

const totalConsultas = computed(() => consultas.value.length)
const realizadasCount = computed(() => consultas.value.filter(c => c.status === 'concluído').length)
const faltouCount = computed(() => consultas.value.filter(c => c.status === 'faltou').length)

const consultasFiltradas = computed(() => {
  let filtered = [...consultas.value]

  if (filtroStatus.value) {
    filtered = filtered.filter(c => c.status === filtroStatus.value)
  }

  if (filtroEspecialidade.value) {
    filtered = filtered.filter(c => c.especialidade === filtroEspecialidade.value)
  }

  return filtered.sort((a, b) => {
    const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date)
    const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date)
    return dateB - dateA // Mais recentes primeiro
  })
})

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
  if (!consultaId) return
  
  try {
    await updateDoc(doc(db, 'appointments', consultaId), {
      status: newStatus
    })
    
    // Atualizar histórico
    await updateHistory(newStatus === 'concluído')
    
    await loadConsultas()
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    alert('Erro ao atualizar status da consulta')
  }
}

const handleCancel = async (consultaId) => {
  if (!consultaId) return
  
  if (!confirm('Tem certeza que deseja cancelar esta consulta?')) {
    return
  }

  try {
    await deleteDoc(doc(db, 'appointments', consultaId))
    await loadConsultas()
  } catch (error) {
    console.error('Erro ao cancelar consulta:', error)
    alert('Erro ao cancelar consulta')
  }
}

const updateHistory = async (realizada) => {
  if (!authStore.user) return

  try {
    const historyRef = doc(db, 'history', authStore.user.uid)
    const historyDoc = await getDoc(historyRef)
    
    if (historyDoc.exists()) {
      const current = historyDoc.data()
      await updateDoc(historyRef, {
        consultasRealizadas: realizada 
          ? (current.consultasRealizadas || 0) + 1 
          : current.consultasRealizadas,
        consultasCanceladas: !realizada 
          ? (current.consultasCanceladas || 0) + 1 
          : current.consultasCanceladas
      })
    }
  } catch (error) {
    console.error('Erro ao atualizar histórico:', error)
  }
}

onMounted(() => {
  loadConsultas()
})
</script>

