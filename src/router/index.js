import { createRouter, createWebHistory } from 'vue-router'
import LayoutMenu from '../components/layout/LayoutMenu.vue'
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
      path: '/main',
      name: 'home',
      component: LayoutMenu
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
