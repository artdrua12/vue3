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
      component: () => import('../components/mainPages/ConformitiesPage.vue')
    },
    {
      path: '/vehicle-safety-certificate',
      name: 'vehicleSafetyCertificate',
      component: () => import('../components/mainPages/VehicleSafetyCertificatePage.vue')
    },
    {
      path: '/powered-machines-certificates',
      name: 'poweredMachinesCertificates',
      component: () => import('../components/mainPages/PoweredMachinesCertificatesPage.vue')
    },
    {
      path: '/powered-machines-declarations',
      name: 'poweredMachinesDeclarations',
      component: () => import('../components/mainPages/PoweredMachinesDeclarationsPage.vue')
    },
    {
      path: '/epassports',
      name: 'epassports',
      component: () => import('../components/mainPages/EpassportsPage.vue')
    },
    {
      path: '/powered-machines-epassports',
      name: 'poweredMachinesEpassports',
      component: () => import('../components/mainPages/PoweredMachinesEpassportsPage.vue')
    },
    {
      path: '/application-request',
      name: 'applicationRequest',
      component: () => import('../components/mainPages/ApplicationRequestPage.vue')
    },
    {
      path: '/application',
      name: 'application',
      component: () => import('../components/mainPages/ApplicationPage.vue')
    },
    {
      path: '/registry-templates',
      name: 'registryTemplates',
      component: () => import('../components/mainPages/RegistryTemplatesPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/layout/LayoutPanel.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/layout/TestMy.vue')
    }
  ]
})

export default router
