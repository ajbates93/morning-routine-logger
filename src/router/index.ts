import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../components/Account.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})