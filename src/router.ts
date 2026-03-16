import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/HomePage.vue'
import LoginPage from '@/pages/Login.vue'
import RegisterPage from '@/pages/Register.vue'
import { useAuthStore } from '@/store/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    guestOnly?: boolean
  }
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const

const routes = [
  {
    path: ROUTES.HOME,
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
    meta: { guestOnly: true },
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterPage,
    meta: { guestOnly: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return ROUTES.LOGIN
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return ROUTES.HOME
  }

  return true
})

export default router
