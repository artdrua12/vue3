<template>
  <div class="wrapper">
    <div v-for="item in sortArray" :key="item.name" class="three">
      <div v-if="item.children">
        <input type="checkbox" :id="item.name" :value="item.name" />
        <label :for="item.name" class="bold threeTitle mainTitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="gray"
            class="threeFolder"
          >
            <path d="M10,17L15,12L10,7V17Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="black"
            class="closeFolder"
          >
            <path
              d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="black"
            class="openFolder"
          >
            <path
              d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z"
            />
          </svg>
          {{ item.name }}
        </label>
        <div class="threeChield">
          <div class="threeTitle threeTitle--padding" v-for="itm in item.children" :key="itm.name">
            <v-icon size="25px" class="icon">{{ itm.icon }}</v-icon>
            <span class="">{{ itm.name }}</span>
          </div>
        </div>
      </div>

      <div class="threeTitle" v-else>
        <v-icon size="25px" class="icon">{{ item.icon }}</v-icon>
        <span class="bold">{{ item.name }}</span>
      </div>
    </div>
    <v-btn @click="wa">Watch</v-btn>
  </div>
</template>

<script setup>
import { reactive, defineProps, computed, watchEffect } from 'vue'
const props = defineProps({
  selection: { type: Array }
})
const array = reactive([
  {
    name: 'Оформить электронный паспорт',
    enabled: true,
    children: [
      {
        name: 'ЭПТС',
        key: 'createEPTS',
        icon: 'mdi-file-plus-outline',
        enabled: true
      },
      {
        name: 'ЭПШТС',
        key: 'createEPCH',
        icon: 'mdi-file-plus-outline',
        enabled: true
      },
      {
        name: 'Ввод ЭПШТС из АИС СЭП ЕАЭС',
        key: 'createEPCHfromEEU',
        icon: 'mdi-file-plus-outline',
        enabled: true
      },
      {
        name: 'ЭПТС на основе ЭПШТС',
        icon: 'mdi-file-plus-outline',
        key: 'createVehicleEpFromChassisEp',
        enabled: true
      }
    ]
  },
  {
    key: 'edit',
    name: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: Boolean(props.selection.value)
  },
  {
    key: 'edit',
    name: 'Внесение изменений НО в ЭПТС в статусе «Действующий»',
    icon: 'mdi-file-document-edit-outline',
    enabled: Boolean(props.selection.value)
  },
  {
    key: 'edit',
    name: 'Внесение изменений НО в ЭПТС в статусе «На аннулировании»',
    icon: 'mdi-file-document-edit-outline',
    enabled: Boolean(props.selection.value)
  },
  {
    key: 'edit',
    name: 'Внесение изменений НО в ЭПТС в статусе "Аннулированный"',
    icon: 'mdi-file-document-edit-outline',
    enabled: Boolean(props.selection.value)
  },
  {
    key: 'look',
    name: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: true
  },
  {
    key: 'copy',
    name: 'Создать шаблон',
    icon: 'mdi-content-copy',
    enabled: true
  },
  {
    key: 'delete',
    name: 'Удалить',
    icon: 'mdi-delete-outline',
    enabled: true
  },
  {
    key: '1',
    name: 'Создать заявление',
    enabled: true,
    children: [
      {
        key: '10',
        name: 'Заявление на исполнение гарантийных обязательств',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: '11',
        name: 'Заявление на внесение сведений собственника ТС',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: '12',
        name: 'Смена собственника',
        enabled: true,
        icon: 'mdi-file-plus-outline'
      },
      {
        key: '13',
        name: 'Залог',
        enabled: Boolean(props.selection.value),
        icon: 'mdi-file-plus-outline'
      },
      {
        key: '14',
        name: 'Переуступка залога',
        enabled: Boolean(props.selection.value),
        icon: 'mdi-file-plus-outline'
      },
      {
        key: '15',
        name: 'Снятие залога',
        enabled: Boolean(props.selection.value),
        icon: 'mdi-file-plus-outline'
      },
      {
        key: '16',
        name: 'Лизинг',
        enabled: true,
        icon: 'mdi-file-plus-outline'
      },
      {
        key: '17',
        name: 'Сублизинг',
        enabled: Boolean(props.selection.value),
        icon: 'mdi-file-plus-outline'
      },
      {
        key: '18',
        name: 'Прекращение лизинга',
        enabled: true,
        icon: 'mdi-file-plus-outline'
      },
      {
        key: '21',
        name: 'Заявление на получение регистрационных знаков ТРАНЗИТ',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: '25',
        icon: 'mdi-file-plus-outline',
        name: 'Заявление на внесение сведений об осуществленных регистрационных действиях',
        enabled: true
      },
      {
        key: '27',
        name: 'Заявление на внесение в электронный паспорт сведений собственника',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: '28',
        name: 'Заявление на внесение в электронный паспорт сведений об ограничениях (обременениях)',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: '29',
        name: 'Заявление на внесение в электронный паспорт сведений о снятии ограничений (обременений)',
        icon: 'mdi-file-plus-outline',
        enabled: true
      },
      {
        key: '30',
        name: 'Заявление на внесение в электронный паспорт сведений о проведении технического обслуживания',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: '31',
        name: 'Заявление на внесение в электронный паспорт сведений о проведении ремонтных работ',
        icon: 'mdi-file-plus-outline',
        enabled: true
      },
      {
        key: '33',
        name: 'Заявление на внесение в электронный паспорт сведений о страховании',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: '34',
        name: 'Заявление на внесение в электронный паспорт сведений о дорожно-транспортном происшествии',
        icon: 'mdi-file-plus-outline',
        enabled: true
      },
      {
        key: '35',
        name: 'Заявление на внесение в электронный паспорт сведений о страховых случаях',
        icon: 'mdi-file-plus-outline',
        enabled: Boolean(props.selection.value)
      }
    ]
  },
  {
    key: '2',
    name: 'Загрузить сведения о ТС (шасси)',
    enabled: true,
    icon: 'mdi-file-upload-outline'
  },
  {
    key: 'pdf',
    name: 'Выписка',
    enabled: Boolean(props.selection.value),
    icon: 'mdi-file-pdf-outline'
  },
  {
    key: 'xml',
    name: 'Выгрузка',
    icon: 'mdi-xml',
    enabled: Boolean(props.selection.value)
  },
  {
    key: '6',
    name: 'Внести сведения в электронный паспорт',
    enabled: true,
    children: [
      {
        key: 'recyclingReleaseNotes',
        name: 'Внести сведения в электронный паспорт об утилизационном сборе и сведения о выпуске',
        icon: 'mdi-file-document-edit-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: 'restrictionInfo',
        name: 'Информация об ограничениях',
        icon: 'mdi-file-document-edit-outline',
        enabled: Boolean(props.selection.value)
      },
      {
        key: 'warrantyWorkText',
        name: 'Сведения об исполнении гарантийных обязательств',
        icon: 'mdi-file-document-edit-outline',
        enabled: true
      }
    ]
  }
])
const sortArray = computed(() => {
  const newItems = array[0].children.filter((item) => {
    if (item.children) {
      item.children = item.children.filter((i) => i.enabled)
    }
    return item.enabled
  })
  return newItems
})
function wa() {
  console.log('props', props.selection.value)
}
watchEffect(props.selection.value, () => {
  console.log('props change')
})

</script>

<style scoped>
.wrapper {
  max-height: 90vh;
  overflow: auto;
  scrollbar-width: none;
  overflow: auto;
}
.wrapper::-webkit-scrollbar {
  width: 0;
}
.threeTitle {
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
  user-select: none;
  cursor: pointer;
  gap: 7px;
  /* background-color: #f7e6d2; */

  font-size: 14px;
  padding: 10px 0px 10px 22px;
  line-height: 15px;
}
.threeTitle.mainTitle {
  grid-template-columns: auto 25px 1fr;
  /* margin-left: -12px; */
  padding: 10px 0px 10px 5px;
}
.threeTitle:hover {
  /* background-color: rgba(128, 128, 128, 0.1); */
  background-color: #f7e6d2;
  color: rgb(2, 150, 196);
}
.threeChield {
  grid-column: 1/-1;
  height: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.threeTitle--padding {
  padding: 5px 0px 5px 45px;
}
.bold {
  font-weight: bolder;
}
input[type='checkbox']:checked ~ .threeChield {
  height: 100%;
}
input[type='checkbox'] {
  display: none;
}

.threeFolder {
  transition: transform 0.25s;
}
.openFolder {
  display: none;
}
input[type='checkbox']:checked ~ .threeTitle .openFolder {
  display: block;
}
input[type='checkbox']:checked ~ .threeTitle .closeFolder {
  display: none;
}

input[type='checkbox']:checked ~ .threeTitle .threeFolder {
  transform: rotate(90deg);
}
.icon {
  color: black;
}
</style>
