import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/DashboardUser.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/agendar',
      name: 'agendar',
      component: () => import('../pages/AgendarConsulta.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/historico',
      name: 'historico',
      component: () => import('../pages/Historico.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/PainelAdmin.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Guard de navegação para proteger rotas
router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (to.meta.requiresAuth && !user) {
        next('/login')
        resolve()
      } else if (to.meta.requiresAdmin && user) {
        // Verificar se é admin
        const { doc, getDoc } = await import('firebase/firestore')
        const { db } = await import('../config/firebase')
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists() && userDoc.data().type === 'admin') {
            next()
          } else {
            next('/dashboard')
          }
        } catch (error) {
          console.error('Erro ao verificar permissões:', error)
          next('/dashboard')
        }
        resolve()
      } else if (to.name === 'login' && user) {
        // Se já está logado, redireciona para dashboard
        next('/dashboard')
        resolve()
      } else {
        next()
        resolve()
      }
    })
  })
})

export default router

