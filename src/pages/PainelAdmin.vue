<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Verificar se é admin -->
    <div v-if="!authStore.isAdmin" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
      Acesso negado. Apenas administradores podem acessar este painel.
    </div>

    <div v-else>
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Painel Administrativo</h1>
        <p class="text-gray-600">Gestão e relatórios do sistema</p>
      </div>

      <!-- Cards de Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">Total de Consultas</p>
              <p class="text-3xl font-bold text-primary">{{ stats.totalConsultas }}</p>
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
              <p class="text-gray-600 text-sm mb-1">Pacientes Cadastrados</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.totalPacientes }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">Consultas Realizadas</p>
              <p class="text-3xl font-bold text-blue-600">{{ stats.consultasRealizadas }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">Taxa de Comparecimento</p>
              <p class="text-3xl font-bold text-purple-600">{{ taxaComparecimento }}%</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráfico de Atendimentos -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Gráfico de Atendimentos</h2>
        <div class="h-64">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Lista de Pacientes -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Pacientes Cadastrados</h2>
          <button
            @click="generatePDF"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            Gerar Relatório PDF
          </button>
        </div>
        
        <div v-if="loading" class="text-center py-8">
          <p class="text-gray-600">Carregando pacientes...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4 text-gray-700 font-semibold">Nome</th>
                <th class="text-left py-3 px-4 text-gray-700 font-semibold">E-mail</th>
                <th class="text-left py-3 px-4 text-gray-700 font-semibold">Consultas</th>
                <th class="text-left py-3 px-4 text-gray-700 font-semibold">Cadastrado em</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="paciente in pacientes" :key="paciente.id" class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">{{ paciente.name }}</td>
                <td class="py-3 px-4">{{ paciente.email }}</td>
                <td class="py-3 px-4">{{ paciente.consultasCount || 0 }}</td>
                <td class="py-3 px-4">{{ formatDate(paciente.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuthStore } from '../stores/auth'
import { Chart, registerables } from 'chart.js'
import jsPDF from 'jspdf'

Chart.register(...registerables)

const authStore = useAuthStore()
const pacientes = ref([])
const consultas = ref([])
const loading = ref(true)
const stats = ref({
  totalConsultas: 0,
  totalPacientes: 0,
  consultasRealizadas: 0
})
const chartCanvas = ref(null)
let chartInstance = null

const taxaComparecimento = computed(() => {
  const total = stats.value.totalConsultas
  const realizadas = stats.value.consultasRealizadas
  if (total === 0) return 0
  return Math.round((realizadas / total) * 100)
})

const formatDate = (date) => {
  if (!date) return '-'
  const d = date.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString('pt-BR')
}

const loadData = async () => {
  loading.value = true
  
  try {
    // Carregar pacientes
    const usersQuery = query(collection(db, 'users'), where('type', '==', 'paciente'))
    const usersSnapshot = await getDocs(usersQuery)
    pacientes.value = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Carregar consultas
    const appointmentsSnapshot = await getDocs(collection(db, 'appointments'))
    consultas.value = appointmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Calcular estatísticas
    stats.value.totalPacientes = pacientes.value.length
    stats.value.totalConsultas = consultas.value.length
    stats.value.consultasRealizadas = consultas.value.filter(c => c.status === 'concluído').length

    // Contar consultas por paciente
    pacientes.value.forEach(paciente => {
      paciente.consultasCount = consultas.value.filter(c => c.userId === paciente.id).length
    })

    // Criar gráfico após carregar dados
    await nextTick()
    createChart()
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  } finally {
    loading.value = false
  }
}

const createChart = () => {
  if (!chartCanvas.value) return

  // Destruir gráfico anterior se existir
  if (chartInstance) {
    chartInstance.destroy()
  }

  // Agrupar consultas por status
  const statusCounts = {
    agendado: consultas.value.filter(c => c.status === 'agendado').length,
    concluído: consultas.value.filter(c => c.status === 'concluído').length,
    faltou: consultas.value.filter(c => c.status === 'faltou').length
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: ['Agendado', 'Concluído', 'Não Compareceu'],
      datasets: [{
        label: 'Número de Consultas',
        data: [statusCounts.agendado, statusCounts.concluído, statusCounts.faltou],
        backgroundColor: [
          '#4DA6FF',
          '#10B981',
          '#EF4444'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

const generatePDF = () => {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text('Relatório de Saúde +', 20, 20)
  
  doc.setFontSize(12)
  doc.text(`Total de Pacientes: ${stats.value.totalPacientes}`, 20, 40)
  doc.text(`Total de Consultas: ${stats.value.totalConsultas}`, 20, 50)
  doc.text(`Consultas Realizadas: ${stats.value.consultasRealizadas}`, 20, 60)
  doc.text(`Taxa de Comparecimento: ${taxaComparecimento.value}%`, 20, 70)

  doc.setFontSize(14)
  doc.text('Lista de Pacientes:', 20, 90)
  
  let y = 100
  pacientes.value.forEach((paciente, index) => {
    if (y > 280) {
      doc.addPage()
      y = 20
    }
    doc.setFontSize(10)
    doc.text(`${index + 1}. ${paciente.name} - ${paciente.email} - ${paciente.consultasCount || 0} consultas`, 20, y)
    y += 10
  })

  doc.save('relatorio-saude-plus.pdf')
}

onMounted(() => {
  if (authStore.isAdmin) {
    loadData()
  }
})
</script>

