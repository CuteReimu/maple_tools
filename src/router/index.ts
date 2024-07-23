import { createRouter, createWebHistory } from 'vue-router'
import HEXA from '../views/HEXA.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HEXA
    },
  ]
})

export default router
