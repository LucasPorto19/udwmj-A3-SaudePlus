// Utilitário para notificações
// Este arquivo contém funções para enviar notificações de lembretes de consulta

import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

/**
 * Envia notificação de lembrete de consulta
 * Nota: Para produção, você precisaria configurar Firebase Cloud Messaging (FCM)
 * ou usar uma extensão do Firebase para envio de e-mails
 */
export const sendAppointmentReminder = async (appointment, userEmail) => {
  try {
    // Aqui você implementaria o envio real de notificação
    // Por enquanto, apenas logamos a ação
    
    const appointmentDate = appointment.date.toDate ? appointment.date.toDate() : new Date(appointment.date)
    const formattedDate = appointmentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    console.log('📧 Notificação enviada:', {
      to: userEmail,
      subject: 'Lembrete de Consulta - Saúde +',
      message: `Você tem uma consulta agendada para ${formattedDate} - ${appointment.especialidade} na ${appointment.unidade}`
    })

    // Para implementação real com FCM:
    // 1. Configure Firebase Cloud Messaging no projeto
    // 2. Solicite permissão de notificação do usuário
    // 3. Use a API do FCM para enviar notificações push
    
    // Para implementação com e-mail:
    // 1. Use Firebase Extensions (Send Email)
    // 2. Ou integre com serviço de e-mail (SendGrid, Mailgun, etc.)

    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar notificação:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Verifica consultas próximas e envia lembretes
 * Esta função pode ser executada periodicamente (ex: via Cloud Functions)
 */
export const checkUpcomingAppointments = async () => {
  try {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    // Buscar consultas agendadas para amanhã
    const q = query(
      collection(db, 'appointments'),
      where('status', '==', 'agendado'),
      where('date', '>=', Timestamp.fromDate(now)),
      where('date', '<=', Timestamp.fromDate(tomorrow))
    )

    const querySnapshot = await getDocs(q)
    
    // Aqui você buscaria os dados do usuário e enviaria as notificações
    // Por enquanto, apenas retornamos as consultas encontradas
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    console.log(`Encontradas ${appointments.length} consultas para lembrete`)

    return appointments
  } catch (error) {
    console.error('Erro ao verificar consultas próximas:', error)
    return []
  }
}

