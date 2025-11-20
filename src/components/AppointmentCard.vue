<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <!-- Informações da Consulta -->
      <div class="flex-1">
        <div class="flex items-center mb-2">
          <div class="w-3 h-3 rounded-full mr-2" :class="statusColor"></div>
          <span class="text-sm font-medium text-gray-600 uppercase">{{ statusText }}</span>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-800 mb-2">
          {{ appointment.especialidade }}
        </h3>
        
        <div class="space-y-1 text-gray-600">
          <p class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ appointment.unidade }}
          </p>
          
          <p class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formattedDate }}
          </p>
          
          <p v-if="appointment.lembrete" class="flex items-center text-sm">
            <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lembrete: {{ appointment.lembrete }}
          </p>
        </div>
      </div>

      <!-- Ações -->
      <div v-if="showActions" class="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2">
        <button
          v-if="appointment.status === 'agendado'"
          @click="$emit('update-status', appointment.id, 'concluído')"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
        >
          Marcar como Realizada
        </button>
        <button
          v-if="appointment.status === 'agendado'"
          @click="$emit('update-status', appointment.id, 'faltou')"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
        >
          Não Compareceu
        </button>
        <button
          @click="$emit('cancel', appointment.id)"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

const statusText = computed(() => {
  const statusMap = {
    'agendado': 'Agendado',
    'concluído': 'Concluído',
    'faltou': 'Não Compareceu'
  }
  return statusMap[props.appointment.status] || props.appointment.status
})

const statusColor = computed(() => {
  const colorMap = {
    'agendado': 'bg-blue-500',
    'concluído': 'bg-green-500',
    'faltou': 'bg-red-500'
  }
  return colorMap[props.appointment.status] || 'bg-gray-500'
})

const formattedDate = computed(() => {
  if (!props.appointment.date) return ''
  const date = props.appointment.date.toDate ? props.appointment.date.toDate() : new Date(props.appointment.date)
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

defineEmits(['update-status', 'cancel'])
</script>

