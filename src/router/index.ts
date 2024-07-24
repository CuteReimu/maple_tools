import { createRouter, createWebHistory } from 'vue-router'
import HEXA from '../views/HEXA.vue'
import Symbol from '../views/Symbol.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/HEXA',
      name: 'HEXA',
      component: HEXA
    },
    {
      path: '/Symbol',
      name: 'Symbol',
      component: Symbol
    },
  ]
})

export default router
