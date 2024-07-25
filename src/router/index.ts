import {createRouter, createWebHistory} from 'vue-router'
import HEXA from '../views/HEXA.vue'
import ARC from '../views/ARC.vue'
import SAC from '../views/SAC.vue'
import LegionResolver from '../views/LegionResolver.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/HEXA'
    },
    {
      path: '/HEXA',
      name: 'HEXA',
      component: HEXA
    },
    {
      path: '/ARC',
      name: 'ARC',
      component: ARC
    },
    {
      path: '/SAC',
      name: 'SAC',
      component: SAC
    },
    {
      path: '/LegionResolver',
      name: 'LegionResolver',
      component: LegionResolver
    }
  ]
})

export default router
