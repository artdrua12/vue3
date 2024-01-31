import { createRouter, createWebHistory } from 'vue-router'
import MenuLayout from '../components/layout/MenuLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuLayout
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/layout/AboutView.vue')
    }
  ]
})

export default router
