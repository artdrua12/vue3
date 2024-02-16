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
    <div class="app-content">
      <base-menu :items="items"></base-menu>
      <RouterView />
    </div>
    <div class="app-footer">
      <span>@2024 </span>
    </div>

    <transition-group name="slide" tag="div" class="snackbar-wrapper">
      <div v-for="item in snack" :key="item.id" class="snackbar" :class="item.color">
        <svg
          v-if="item.color == 'snackInfo'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
        </svg>

        <svg
          v-if="item.color == 'snackInfo2'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M8,6.2V4H7V2H17V4H16V12L18,14V16H17.8L14,12.2V4H10V8.2L8,6.2M20,20.7L18.7,22L12.8,16.1V22H11.2V16H6V14L8,12V11.3L2,5.3L3.3,4L20,20.7M8.8,14H10.6L9.7,13.1L8.8,14Z"
          />
        </svg>

        <span>{{ item.text }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useSnackbarStore } from './stores/snackStore';
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
.snackbar-wrapper {
  position: fixed;
  right: 20px;
  bottom: 50px;
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  z-index: 7;
}
.snackbar {
  width: 300px;
  z-index: 7;
  display: grid;
  grid-template-columns: 35px 1fr;
  align-items: center;
  gap: 7px;
  color: white;
  padding: 10px 20px 10px 10px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 20px;
  font-family: sans-serif;
  letter-spacing: 1px;
  transition: transform 0.33s;
  box-shadow: 7px -7px 12px 5px rgba(0, 0, 0, 0.2);
}
.snackbar svg {
  width: 35px;
  height: 35px;
  fill: white;
}
.snackInfo,
.snackInfo2 {
  background-color: #455a64;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: transform 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(110%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(120%);
}

.slide-leave-active {
  position: absolute;
}

#app {
  width: 100%;
  height: 100vh;
  padding: 0px;
}
.app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: #ebebeb;
  /* filter: saturate(1); */
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
  scrollbar-gutter: stable;
}
.app-footer {
  height: 30px;
  background-color: #2c4957;
  color: white;
  display: flex;
}
</style>
