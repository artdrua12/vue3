<template>
  <div v-show="getUser" class="menu">
    <input id="close" type="radio" name="acordion" />
    <div class="openClose">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="35"
        height="35"
        fill="white"
      >
        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>
    </div>
    <div v-for="item in sortItems" :key="item" class="item">
      <input :id="item.title" type="radio" name="acordion" />
      <label :for="item.title" class="item-text" @click="setHeight(item.children.length)">
        <v-icon :icon="item.icon" size="large" class="item-icon" />
        <span>{{ item.title }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          class="item-bange"
          viewBox="0 0 24 24"
        >
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </label>
      <div class="submenu">
        <router-link v-for="text in item.children" :key="text" class="submenu-text" :to="text.to">{{
          text.title
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
const currentUser = useUserStore()

const { getUser, getPermissions } = storeToRefs(currentUser)

const sortItems = computed(() => {
  const cloneItems = JSON.parse(JSON.stringify(items))
  return filteringByPermissions(cloneItems)
})

const items = [
  {
    icon: 'mdi-file-document-outline',
    title: 'Документы, подтверждающие соответствие требованиям безопасности',
    permission: true,
    children: [
      {
        icon: 'mdi-file-outline',
        title: 'Реестр ОТТС (ОТШ)',
        to: '/conformities',
        permission: 'Доступ к реестру ОТТС (осуществление поиска)'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр СБКТС',
        to: '/vehicle-safety-certificate',
        permission: 'Доступ к реестру СБКТС (осуществление поиска)'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр сертификатов соответствия',
        to: '/powered-machines/certificates',
        permission: 'Доступ к реестру сертификатов соответствия (осуществление поиска)'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр деклараций о соответствии',
        to: '/powered-machines/declarations',
        permission: 'Доступ к реестру деклараций соответствия (осуществление поиска)'
      }
    ]
  },
  {
    icon: 'mdi-receipt-text',
    title: 'Реестры',
    permission: true,
    children: [
      {
        icon: 'mdi-file-outline',
        title: 'Реестр электронных паспортов ТС',
        to: '/epassports',
        permission: 'Доступ к реестру электронных паспортов ТС (осуществление поиска)'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр электронных паспортов CМ',
        to: '/powered-machines/epassports',
        permission: 'Доступ к реестру электронных паспортов СМ (осуществление поиска)'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр заявлений по получению сведений',
        to: '/application-request',
        permission: 'Доступ к реестру заявлений по получению сведений'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр заявлений',
        to: '/application',
        permission: 'Доступ к реестру заявлений'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр шаблонов',
        to: '/registry/templates',
        permission: 'Доступ к реестру шаблонов'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр НСИ',
        to: '/reference-information',
        permission: "Доступ к реестру справочников'"
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр уведомлений об отмене',
        to: '/cancellation-document',
        permission: 'true'
      }
    ]
  },
  {
    icon: 'mdi-account-tie',
    title: 'Администрирование процессов',
    permission: 'Доступ к администрированию процессов',
    children: [
      {
        icon: 'mdi-file-outline',
        title: 'Реестр ролей',
        to: '/registry-roles',
        permission: 'Просмотр и редактирование реестра ролей'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр процессов и версий',
        to: '/administrative-process',
        permission: 'Доступ к реестру процессов и версий'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр бизнес процессов',
        to: '/business-process',
        permission: 'Доступ к реестру бизнес процессов'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр изготовителей ТС, ШТС, СМ и других видов техники',
        to: '/registry-manufacturers-process',
        permission: 'Доступ к реестру изготовителей'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр отчётов',
        to: '/reports-registry',
        permission: 'true'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр органов по сертификации и испытательных лабораторий',
        to: '/registry-certification-testlaboratories',
        permission: 'Доступ к реестру органов по сертификации и испытательных лабораторий'
      },
      {
        icon: 'mdi-file-outline',
        title: 'Система оповещения',
        to: '/registry-notification-system',
        permission: 'Сервис сообщений о технологических работах'
      }
    ]
  }
]

function filteringByPermissions(array) {
  return array.filter((item) => {
    if (item.children) {
      item.children = filteringByPermissions(item.children)
    }
    return item.permission == true || getPermissions.value.has(item.permission)
  })
}

function setHeight(item) {
  let root = document.querySelector('.menu')
  let h = item * 50 + 30 + 'px'
  root.style.setProperty('--height', h)
}

onMounted(() => {
  const el = document.querySelector('.menu')
  if (el) {
    el.onmouseleave = function () {
      const radio = document.querySelector('#close')
      radio.checked = true
    }
  }
})
</script>

<style scoped>
.menu {
  top: 40px;
  position: fixed;
  width: 350px;
  height: calc(100% - 70px);
  transition: transform 0.4s;
  transform: translateX(-100%);
  --height: 0px;
  background-color: #f7f7f7;
  user-select: none;
  cursor: pointer;
  box-shadow:
    3px 0px 15px 5px rgba(0, 0, 0, 0.12),
    inset 0px 11px 12px -10px rgba(0, 0, 0, 0.45);
  font-family: 'Open Sans', arial;
  font-weight: 400;
  z-index: 3;
}
.menu:hover,
.menu:hover .openClose {
  transform: translateX(0px);
}
.openClose {
  position: fixed;
  width: 100%;
  padding: 6px;
  transform: translateX(100%);
  top: -43px;
  display: flex;
  transition: transform 0.4s;

  height: 40px;
}
.item-icon {
  justify-self: center;
  color: #3f3c3c;
}
.item-text {
  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  min-height: 60px;
  padding: 10px 0px;
  border-bottom: 1px solid #cabfb3;
  cursor: pointer;
  color: #575656;
  font-size: 18px;
  font-style: oblique;
  line-height: 18px;
}
.item-bange {
  width: 40px;
  transition: transform 0.3s;
}
/* submenu */
.submenu {
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 0px;
  padding-left: 10px;
  box-shadow:
    inset 0px 5px 5px -4px rgba(50, 50, 50, 0.55),
    inset 0px -5px 5px -4px rgba(50, 50, 50, 0.55);
  overflow: hidden;
  transition: height 0.3s;
  background-color: #ededed;
  cursor: pointer;
  color: #3f3e3e;
  /* box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white; */
}
.submenu-text {
  display: flex;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;
  font-size: 16px;
  font-style: italic;
  line-height: 16px;
}
.submenu-text:last-child {
  border-bottom: none;
}
input[type='radio']:checked ~ .submenu {
  /* height: var(--height); */
  height: var(--height);
}
input[type='radio']:checked ~ .item-text .item-bange {
  transform: rotate(-180deg);
}
input[type='radio'] {
  display: none;
}
a {
  text-decoration: none;
}
</style>
