import { createRouter, createWebHistory } from 'vue-router'
import TheEntrance from '../components/layout/TheEntrance.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'entrance',
      component: TheEntrance
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../components/layout/TheStart.vue')
    },
    {
      path: '/conformities',
      name: 'conformities',
      component: () => import('../components/conformities/conformitiesPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/layout/LayoutPanel.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/layout/Test.vue')
    }
  ]
})

export default router
