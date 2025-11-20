// Store Pinia para gerenciar autenticação
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userData = ref(null)
  const loading = ref(false)

  // Verificar se é admin
  const isAdmin = computed(() => {
    return userData.value?.type === 'admin'
  })

  // Verificar se é paciente
  const isPaciente = computed(() => {
    return userData.value?.type === 'paciente'
  })

  // Inicializar listener de autenticação
  const initAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        // Buscar dados do usuário no Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          userData.value = { id: firebaseUser.uid, ...userDoc.data() }
        }
      } else {
        user.value = null
        userData.value = null
      }
    })
  }

  // Login
  const login = async (email, password) => {
    loading.value = true
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      if (userDoc.exists()) {
        userData.value = { id: userCredential.user.uid, ...userDoc.data() }
      }
      return { success: true }
    } catch (error) {
      console.error('Erro no login:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Registro
  const register = async (name, email, password, userType = 'paciente') => {
    loading.value = true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Criar documento do usuário no Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        type: userType,
        createdAt: new Date().toISOString()
      })

      // Criar histórico inicial
      await setDoc(doc(db, 'history', userCredential.user.uid), {
        consultasRealizadas: 0,
        consultasCanceladas: 0,
        ultimosAtendimentos: []
      })

      return { success: true }
    } catch (error) {
      console.error('Erro no registro:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      userData.value = null
      return { success: true }
    } catch (error) {
      console.error('Erro no logout:', error)
      return { success: false, error: error.message }
    }
  }

  // Atualizar perfil
  const updateProfile = async (updates) => {
    try {
      await setDoc(doc(db, 'users', user.value.uid), updates, { merge: true })
      userData.value = { ...userData.value, ...updates }
      return { success: true }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    userData,
    loading,
    isAdmin,
    isPaciente,
    initAuth,
    login,
    register,
    logout,
    updateProfile
  }
})

