<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Saúde + 
          <span class="text-primary">Bem-Estar</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Plataforma digital para agendamento de consultas e gestão de saúde.
          Alinhada com a ODS 3 da ONU - Saúde e Bem-Estar para todos.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/register"
            class="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition shadow-lg"
          >
            Criar Conta
          </router-link>
          <router-link
            to="/login"
            class="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Entrar
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Funcionalidades Principais
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Agendamento Rápido</h3>
          <p class="text-gray-600">
            Agende suas consultas de forma simples e rápida, escolhendo especialidade, unidade e data.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Histórico Médico</h3>
          <p class="text-gray-600">
            Acompanhe seu histórico de consultas e mantenha seus registros organizados.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Lembretes Automáticos</h3>
          <p class="text-gray-600">
            Receba notificações sobre suas consultas e nunca mais perca um compromisso.
          </p>
        </div>
      </div>
    </section>

    <!-- ODS 3 Section -->
    <section class="bg-primary text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">ODS 3 - Saúde e Bem-Estar</h2>
        <p class="text-xl max-w-2xl mx-auto">
          Esta plataforma contribui para o Objetivo de Desenvolvimento Sustentável 3 da ONU,
          promovendo acesso universal à saúde e melhorando a qualidade de vida de todos.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
// Página inicial - não requer lógica complexa
</script>

