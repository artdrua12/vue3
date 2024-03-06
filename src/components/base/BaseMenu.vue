<template>
  <div v-if="permissions.length > 0" class="menu">
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
    <div v-for="item in items" :key="item" class="item">
      <input :id="item.text" type="radio" name="acordion" />
      <label :for="item.text" class="item-text" @click="setHeight(item.items.length)">
        <v-icon :icon="item.icon" size="large" class="item-icon" />
        <span>{{ item.text }}</span>
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
        <span v-for="text in item.items" :key="text" class="submenu-text">
          {{ text.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore()

// const props = defineProps({
//   items: { type: Array, required: true }
// })
let permissions = reactive([])
const items = [
  {
    icon: 'mdi-file-document-outline',
    title: 'Документы, подтверждающие соответствие требованиям безопасности',
    enabled: true,
    items: [
      {
        icon: 'mdi-file-outline',
        title: 'Реестр ОТТС (ОТШ)',
        to: '/conformities',
        enabled: permissions.includes('Доступ к реестру ОТТС (осуществление поиска)')
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр СБКТС',
        to: '/vehicle-safety-certificate',
        enabled: permissions.includes('Доступ к реестру СБКТС (осуществление поиска)')
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр сертификатов соответствия',
        to: '/powered-machines/certificates',
        enabled: permissions.includes(
          'Доступ к реестру сертификатов соответствия (осуществление поиска)'
        )
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр деклараций о соответствии',
        to: '/powered-machines/declarations',
        enabled: permissions.includes(
          'Доступ к реестру деклараций соответствия (осуществление поиска)'
        )
      }
    ]
  },
  {
    icon: 'mdi-receipt',
    title: 'Реестры',
    enabled: true,
    items: [
      {
        icon: 'mdi-file-outline',
        title: 'Реестр электронных паспортов ТС',
        to: '/epassports',
        enabled: permissions.includes(
          'Доступ к реестру электронных паспортов ТС (осуществление поиска)'
        )
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр электронных паспортов CМ',
        to: '/powered-machines/epassports',
        enabled: permissions.includes(
          'Доступ к реестру электронных паспортов СМ (осуществление поиска)'
        )
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр заявлений по получению сведений',
        to: '/application-request',
        enabled: permissions.includes('Доступ к реестру заявлений по получению сведений')
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр заявлений',
        to: '/application',
        enabled: permissions.includes('Доступ к реестру заявлений')
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр шаблонов',
        to: '/registry/templates',
        enabled: !!permissions.find((e) => e.match('Доступ к реестру шаблонов'))
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр НСИ',
        to: '/reference-information',
        enabled: !!permissions.find((e) => e.match('Доступ к реестру справочников'))
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр уведомлений об отмене',
        to: '/cancellation-document',
        enabled: true
      }
    ]
  },
  {
    icon: 'mdi-account-tie',
    title: 'Администрирование процессов',
    enabled: permissions.includes('Доступ к администрированию процессов'),
    items: [
      {
        icon: 'mdi-file-outline',
        title: 'Реестр ролей',
        to: '/registry-roles',
        enabled: permissions.includes('Просмотр и редактирование реестра ролей')
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр процессов и версий',
        to: '/administrative-process',
        enabled: !!permissions.find((e) => e.match('Доступ к реестру процессов и версий'))
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр бизнес процессов',
        to: '/business-process',
        enabled: !!permissions.find((e) => e.match('Доступ к реестру бизнес процессов'))
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр изготовителей ТС, ШТС, СМ и других видов техники',
        to: '/registry-manufacturers-process',
        enabled: permissions.includes('Доступ к реестру изготовителей')
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр отчётов',
        to: '/reports-registry',
        enabled: true
      },
      {
        icon: 'mdi-file-outline',
        title: 'Реестр органов по сертификации и испытательных лабораторий',
        to: '/registry-certification-testlaboratories',
        enabled: permissions.includes(
          'Доступ к реестру органов по сертификации и испытательных лабораторий'
        )
      },
      {
        icon: 'mdi-file-outline',
        title: 'Система оповещения',
        to: '/registry-notification-system',
        enabled: permissions.includes('Сервис сообщений о технологических работах')
      }
    ]
  }
]

async function getPermissions() {
  const array = await indexDB.getFromDatabase('user', 'permissions')
  permissions.splice(0, 0, ...array)

  console.log('permissions mounted', permissions)
}

function setHeight(item) {
  let root = document.querySelector('.menu')
  let h = item * 50 + 30 + 'px'
  root.style.setProperty('--height', h)
}

onMounted(() => {
  getPermissions()
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
  z-index: 9;
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
  top: -41px;
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
  transform: rotate(-90deg);
}
input[type='radio'] {
  display: none;
}
</style>
