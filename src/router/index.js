import { createRouter, createWebHistory } from 'vue-router'
import LayoutMenu from '../components/layout/LayoutMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutMenu
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/layout/LayoutPanel.vue')
    }
  ]
})

export default router
