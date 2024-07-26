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
      children: [
        {
          path: '',
          name: 'ConformitiesPage',
          component: () => import('../components/mainPages/ConformitiesPage.vue')
        },
        {
          path: 'form',
          name: 'ConformitiesCreate',
          component: () => import('@/components/forms/conformityForms/RootForm.vue')
        }
        // {
        //   path: 'form/:id',
        //   component: () => import('@/components/forms/conformityForms/RootForms.vue'),
        //   meta: [
        //     { subtitle: 'Карточка ОТТС', type: 'одобрение типа транспортного средства ЕАЭС' },
        //     { subtitle: 'Карточка ОТШ', type: 'одобрение типа шасси ЕАЭС' }
        //   ]
        // }
      ]
    },
    {
      path: '/vehicle-safety-certificate',
      name: 'vehicleSafetyCertificate',
      children: [
        {
          path: '',
          name: 'VehicleSafetyCertificatePage',
          component: () => import('../components/mainPages/vehicleSafetyCertificate/VehicleSafetyCertificatePage.vue')
        },
        {
          path: 'form',
          name: 'VehicleSafetyCertificateForm',
          component: () => import('@/components/forms/vechicleSaferyCertificate/RootForm.vue')
        }
      ]
    },
    {
      path: '/powered-machines-certificates',
      name: 'poweredMachinesCertificates',
      children: [
        {
          path: '',
          name: 'PoweredMachinesCertificatesPage',
          component: () => import('@/components/mainPages/PoweredMachinesCertificatesPage.vue')
        },
        {
          path: 'form',
          name: 'PoweredMachinesCertificatesForm',
          component: () => import('@/components/forms/poweredMachinesCertificates/RootForm.vue')
        }
      ]
    },
    {
      path: '/powered-machines-declarations',
      name: 'poweredMachinesDeclarations',
      children: [
        {
          path: '',
          name: 'PoweredMachinesDeclarationsPage',
          component: () => import('@/components/mainPages/PoweredMachinesDeclarationsPage.vue')
        },
        {
          path: 'form',
          name: 'PoweredMachinesDeclarationsForm',
          component: () => import('@/components/forms/poweredMachinesDeclarations/RootForm.vue')
        }
      ]
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
      path: '/layoutPanel',
      name: 'layoutPanel',
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
