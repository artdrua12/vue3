<template>
  <div class="layoutForms">
    <base-panel-acordions
      v-model:tab="currentTab"
      class="forms-menu"
      :data="data"
    ></base-panel-acordions>

    <div class="forms-data">
      <base-panel
        v-for="item in data"
        :id="item.id"
        :key="item.id"
        elevation="5"
        props-panel="1"
        bg-color="#ebebeb"
      >
        <template #title>{{ item.title }} </template>

        <div v-if="item?.tabs" class="tabsWrapper">
          <v-tabs
            v-model="currentTab"
            align-tabs="right"
            density="compact"
            mandatory
            style="position: sticky; top: 0px; background-color: white; z-index: 2"
          >
            <v-tab v-for="tab in item.tabs" :key="tab.id" :value="tab.title">
              {{ tab.title }}
            </v-tab>
          </v-tabs>

          <v-window v-model="currentTab">
            <v-window-item v-for="tab in item.tabs" :id="tab.id" :key="tab.id" :value="tab.title">
              <component
                :is="getComponent(tab.component)"
                class="adaptiveGrid adaptiveGrid__padding"
              ></component>
            </v-window-item>
          </v-window>
        </div>

        <div v-else>
          <component
            :is="getComponent(item.component)"
            class="adaptiveGrid adaptiveGrid__paddings"
          ></component>
          <!-- <component :is="is(i.type)" ></component> -->
        </div>
      </base-panel>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, defineAsyncComponent } from 'vue'
import BasePanel from '@/components/base/BasePanel.vue'
import BasePanelAcordions from '@/components/base/BasePanelAcordions.vue'
import DocumentComformity from '@/components/forms/conformityForms/DocumentComformity.vue'
import VehicleDetails from '@/components/forms/conformityForms/VehicleDetails.vue'
import CertificationAgency from '@/components/forms/conformityForms/CertificationAgency.vue'
import DeclarerAddress from '@/components/forms/conformityForms/DeclarerAddress.vue'
import ManufacturerAddress from '@/components/forms/conformityForms/ManufacturerAddress.vue'
import ManufacturersRepresentativesAddress from '@/components/forms/conformityForms/ManufacturersRepresentativesAddress.vue'

const data = reactive([
  {
    title: 'Документ об оценке соответствия',
    id: '#vehicle-details',
    tabs: [
      {
        title: 'Документ',
        id: '#vehicle-details-document',
        component: 'DocumentComformity'
      },
      {
        title: 'Транспортное средство',
        id: '#vehicle-details-vehicle',
        component: 'VehicleDetails'
      },
      {
        title: 'Наименование органа, выдавшего документ',
        id: '#vehicle-details-certification',
        component: 'CertificationAgency'
      },
      {
        title: 'Заявитель и его адрес',
        id: '#vehicle-details-applicant',
        component: 'DeclarerAddress'
      },
      {
        title: 'Изготовитель и его адрес',
        id: '#vehicle-details-manufacturer',
        component: 'ManufacturerAddress'
      },
      {
        title: 'Представители изготовителя и их адреса',
        id: '#vehicle-details-representatives',
        component: 'ManufacturersRepresentativesAddress'
      },
      {
        title: 'Сборочный завод и его адрес',
        id: '#vehicle-details-factory',
        component: ''
      },
      {
        title: 'Поставщик сборочных комплектов и его адрес',
        id: '#vehicle-details-provider',
        component: ''
      },
      {
        title: 'Вид распространения',
        id: '#vehicle-details-view',
        component: ''
      },
      {
        title: 'Дополнительная информаци',
        id: '#vehicle-details-additional',
        component: ''
      }
    ]
  },
  {
    title: 'Базовое ТС',
    id: '#base-vehicle',
    component: ''
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    id: '#vehicle-setting',
    tabs: [
      {
        title: 'Компоновка транспортного средства',
        id: '#vehicle-composition',
        component: ''
      },
      {
        title: 'Ходовая часть ТС',
        id: '#numbers-vheels',
        component: ''
      },
      {
        title: 'Ось транспортного средства',
        id: '#vehicle-axis',
        component: ''
      },
      {
        title: 'Габаритные размеры',
        id: '#dimensions',
        component: ''
      },
      {
        title: 'Масса',
        id: '#weight',
        component: ''
      },
      {
        title: 'Масса буксируемого прицепа',
        id: '#weight-towed-trailer',
        component: ''
      },
      {
        title: 'Двигатель',
        id: '#engine',
        component: ''
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Устройство накопления энергии',
        id: '#storage-device',
        component: ''
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Топливо',
        id: '#fuel',
        component: ''
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система питания',
        id: '#supply-system',
        component: ''
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система зажигания',
        id: '#ignition-system',
        component: ''
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система выпуска и нейтрализации отработавших газов',
        id: '#neutralization-system',
        component: ''
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Сцепление',
        id: '#clutch',
        component: ''
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Трансмиссия',
        id: '#transmission',
        component: ''
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Подвеска',
        id: '#suspension',
        component: ''
      },
      {
        title: 'Рулевое управление',
        id: '#steerage',
        component: ''
      },
      {
        title: 'Тормозные системы',
        id: '#brake-systems',
        component: ''
      },
      {
        title: 'Шины',
        id: '#tires',
        component: ''
      }
    ]
  },
  {
    title: 'Описание маркировки транспортного средства (Шасси)',
    id: '#description-of-vehicle-markings',
    component: ''
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    id: '#vehicle-general-form',
    component: ''
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    id: '#confirming-document',
    component: ''
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    id: '#list-of-documents',
    component: ''
    // hide: this.formModel.conformityDocKindCode === '30'
  },
  {
    title: 'История изменения документа',
    id: '#conformity-change-history',
    component: ''
  }
])
const currentTab = ref('1')
const allComponents = {
  DocumentComformity,
  VehicleDetails,
  CertificationAgency,
  DeclarerAddress,
  ManufacturerAddress,
  ManufacturersRepresentativesAddress
}

function is(type) {
  return defineAsyncComponent(() => import(`@/components/base/${type}.vue`))
}
function getComponent(type) {
  return allComponents[type]
}
</script>

<style scoped>
.layoutForms {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 370px 1fr;
  overflow: auto;
  align-items: flex-start;
  align-content: flex-start;
  /* резервирует место под скролл */
  scrollbar-gutter: stable;
}
.menu-button {
  display: flex;
  justify-content: flex-start;
}
.forms-menu {
  width: 370px;
  max-height: calc(100vh - 90px);
  overflow: auto;
  scrollbar-width: none;
  position: fixed;
  margin-top: 10px;
}
.forms-data {
  grid-column: -1/-2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
.tabsWrapper {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 85vh;
  align-content: flex-start;
}
::v-deep .v-btn__content {
  white-space: pre-wrap;
  padding: 5px 0px;
}
.adaptiveGrid__padding {
  padding: 30px 24px 10px 24px;
}
</style>
