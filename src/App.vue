<template>
  <div class="app">
    <div class="app-top">
      <p class="app-tiple">Системы электронных паспортов РБ</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="40"
        height="30"
        fill="white"
      >
        <path
          d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
        />
      </svg>
      <h4>USEREB45CD61</h4>
    </div>

    <base-menu :items="items"></base-menu>
    <RouterView class="app-content" />

    <div class="app-footer">
      <span>@2024 </span>
    </div>

    <transition-group name="slide" tag="div" class="snackbar-wrapper">
      <div v-for="item in snack" :key="item.id" class="snackbar" :class="item.type">
        <v-icon v-if="item.type == 'info'" size="35" icon=" mdi-bell-ring"></v-icon>
        <v-icon v-if="item.type == 'error'" size="35" icon="mdi-close-thick"></v-icon>

        <span>{{ item.text }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useSnackbarStore } from './stores/snackStore'
import { RouterView } from 'vue-router'
import BaseMenu from './components/base/BaseMenu.vue'
import { storeToRefs } from 'pinia'
const store = useSnackbarStore()
const { snack } = storeToRefs(store)
const items = [
  {
    icon: 'mdi-file-document-check-outline',
    text: 'Документы, подтверждающие соответствие требованиям безопасности',
    items: [
      {
        title: 'Реестр ОТТС (ОТШ)',
        to: '/conformities'
      },
      {
        title: 'Реестр СБКТС',
        to: '/vehicle-safety-certificate'
      },
      {
        title: 'Реестр сертификатов соответствия',
        to: '/powered-machines/certificates'
      },
      {
        title: 'Реестр деклараций о соответствии',
        to: '/powered-machines/declarations'
      }
    ]
  },
  {
    icon: 'mdi-receipt-text-outline',
    text: 'Реестры',
    color: 'white',
    items: [
      {
        title: 'Реестр электронных паспортов',
        to: '/epassports'
      },
      {
        title: 'Реестр электронных паспортов CМ',
        to: '/powered-machines/epassports'
      },
      {
        title: 'Реестр заявлений по получению сведений',
        to: '/application-request'
      }
    ]
  },
  {
    icon: 'mdi-pencil-lock-outline',
    text: 'Администрирование процессов',
    color: 'white',
    items: [
      {
        title: 'Реестр ролей',
        to: '/registry-roles'
      },
      {
        title: 'Реестр процессов и версий',
        to: '/administrative-process'
      },
      {
        title: 'Реестр бизнес процессов',
        to: '/business-process'
      },
      {
        title: 'Реестр изготовителей ТС, ШТС, СМ и других видов техники',
        to: '/registry-manufacturers-process'
      },
      {
        title: 'Реестр отчётов',
        to: '/reports-registry'
      },
      {
        title: 'Реестр органов по сертификации и испытательных лабораторий',
        to: '/registry-certification-heightlaboratories'
      },
      {
        title: 'Система оповещения',
        to: '/registry-notification-system'
      }
    ]
  }
]
</script>

<style>
/* snackbar */

/* #app {
  width: 100%;
  height: 100vh;
  padding: 0px;
} */
.app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  background-color: #f7f7f7;
}
.app-tiple {
  justify-self: flex-start;
  margin-right: auto;
  margin-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-top {
  height: 40px;
  background-color: #2c4957;
  display: flex;
  align-items: center;
  color: white;
  padding: 0px 20px;
}
.app-content {
  z-index: 1;
  overflow: auto;
  height: 100%;
  /* резервирует место под скролл */
  scrollbar-gutter: stable;
}
.app-footer {
  height: 30px;
  background-color: #2c4957;
  color: white;
  display: flex;
}

.snackbar-wrapper {
  position: fixed;
  right: 25px;
  bottom: 45px;
  display: flex;
  flex-direction: column-reverse;
  gap: 25px;
  z-index: 7;
}
.snackbar {
  width: 300px;
  z-index: 7;
  display: grid;
  gap: 7px;
  grid-template-columns: 35px 1fr;
  align-items: center;
  color: white;
  padding: 10px 12px 10px 10px;
  font-size: 16px;
  font-family: sans-serif;
  letter-spacing: 1px;
  transition: transform 0.35s;
  box-shadow: 0px 0px 7px -3px #2c4957;
  border: 1px solid white;
  border-radius: 7px;
}
.info {
  background-color: green;
}
.error {
  background-color: #c10000;
}
.snack-icon {
  display: block;
  color: white;
  width: 35px;
  height: 35px;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(120%);
}

.slide-leave-active {
  position: absolute;
}
</style>
