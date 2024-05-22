<template>
  <div class="panel-layot">
    <v-btn
      icon="mdi-tune-variant"
      variant="text"
      style="display: fixed; top: -10px; left: 380px; z-index: 100"
      @click="isOpen = true"
    ></v-btn>
    <div class="panel-menu">
      <BasePanelAcordions
        :props-panel="data"
        :tab="tab"
        @update:tab="tab = $event"
      ></BasePanelAcordions>
      <v-btn @click="testGreen">TEST green</v-btn>
      <v-btn @click="testRed">TEST red</v-btn>
    </div>

    <div class="panels">
      <base-panel
        v-for="item in data"
        :id="item.title"
        :key="item.title"
        elevation="5"
        props-panel="1"
        bg-color="#ebebeb"
      >
        <template #title>{{ item.title }} </template>
        <div v-if="item.items" class="tabsWrapper">
          <v-tabs
            v-model="tab"
            align-tabs="right"
            density="compact"
            style="position: sticky; top: 0px; background-color: white; z-index: 2"
          >
            <v-tab v-for="itm in item.items" :key="itm" :value="itm.title"> {{ itm.title }} </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item v-for="itm in item.items" :id="itm" :key="itm" :value="itm.title">
              <p style="padding: 20px">{{ text }}</p>
            </v-window-item>
          </v-window>
        </div>
        <div v-else style="padding: 20px" class="tabsWrapper">
          <p style="padding: 20px">{{ text }}</p>
        </div>
      </base-panel>
    </div>
    <menu-registration v-model:isOpen="isOpen"></menu-registration>
  </div>
</template>
<script setup>
import BasePanel from '../base/BasePanel.vue'
import MenuRegistration from '../MenuRegistration.vue'
import BasePanelAcordions from '../base/BasePanelAcordions.vue'
import { ref } from 'vue'
import { useSnackStore } from '@/stores/snackStore'
const snack = useSnackStore()
const isOpen = ref(false)
const tab = ref('панель1')
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

function testGreen() {
  snack.setSnack({ text: 'Просто какой-то Текст ', type: 'info' })
}
function testRed() {
  snack.setSnack({ text: 'Ошибка загрузки', type: 'error' })
}
const data = [
  {
    title: 'Документ об оценке соответствия',
    id: '#vehicle-details',
    items: [
      {
        title: 'Документ',
        id: '#vehicle-details-document'
      },
      {
        title: 'Транспортное средство',
        id: '#vehicle-details-vehicle'
      },
      {
        title: 'Наименование органа, выдавшего документ',
        id: '#vehicle-details-certification'
      },
      {
        title: 'Заявитель и его адрес',
        id: '#vehicle-details-applicant'
      },
      {
        title: 'Изготовитель и его адрес',
        id: '#vehicle-details-manufacturer'
      },
      {
        title: 'Представители изготовителя и их адрес',
        id: '#vehicle-details-representatives'
      },
      {
        title: 'Сборочный завод и его адрес',
        id: '#vehicle-details-factory'
      },
      {
        title: 'Поставщик сборочных комплектов и его адрес',
        id: '#vehicle-details-provider'
      },
      {
        title: 'Вид распространения',
        id: '#vehicle-details-view'
      },
      {
        title: 'Дополнительная информаци',
        id: '#vehicle-details-additional'
      }
    ]
  },
  {
    title: 'Базовое ТС',
    id: '#base-vehicle'
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    items: [
      {
        title: 'Компоновка транспортного средства',
        id: '#vehicle-composition'
      },
      {
        title: 'Ходовая часть ТС',
        id: '#numbers-vheels'
      },
      {
        title: 'Ось транспортного средства',
        id: '#vehicle-axis'
      },
      {
        title: 'Габаритные размеры',
        id: '#dimensions'
      },
      {
        title: 'Масса',
        id: '#weight'
      },
      {
        title: 'Масса буксируемого прицепа',
        id: '#weight-towed-trailer'
      },
      {
        title: 'Двигатель',
        id: '#engine'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Устройство накопления энергии',
        id: '#storage-device'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Топливо',
        id: '#fuel'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система питания',
        id: '#supply-system'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система зажигания',
        id: '#ignition-system'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система выпуска и нейтрализации отработавших газов',
        id: '#neutralization-system'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Сцепление',
        id: '#clutch'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Трансмиссия',
        id: '#transmission'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Подвеска',
        id: '#suspension'
      },
      {
        title: 'Рулевое управление',
        id: '#steerage'
      },
      {
        title: 'Тормозные системы',
        id: '#brake-systems'
      },
      {
        title: 'Шины',
        id: '#tires'
      }
    ]
  },
  {
    title: 'Описание маркировки транспортного средства (Шасси)',
    id: '#description-of-vehicle-markings'
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    id: '#vehicle-general-form'
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    id: '#confirming-document'
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    id: '#list-of-documents'
    // hide: this.formModel.conformityDocKindCode === '30'
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТШ',
    id: '#list-of-documents'
    // hide: this.formModel.conformityDocKindCode === '35'
  },
  {
    title: 'История изменения документа',
    id: '#conformity-change-history'
  }
]
</script>

<style scoped>
::v-deep .v-btn__content {
  white-space: pre-wrap;
  padding: 5px 0px;
}
.tabsWrapper {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 85vh;
  align-content: flex-start;
}
.panel-layot {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 12px;
  overflow: auto;
  height: 100%;
}
.menu-button {
  display: flex;
  justify-content: flex-start;
}
.panel-menu {
  position: fixed;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
.panels {
  grid-column: -1/-2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
</style>
