<template>
  <div class="layoutForms">
    <base-panel-acordions
      v-model:panel="currentPanel"
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
            <v-tab
              v-for="tab in item.tabs"
              :key="tab.id"
              v-model="currentTab"
              :value="tab.component"
            >
              {{ tab.title }}
            </v-tab>
          </v-tabs>

          <v-window v-model="currentTab">
            <v-window-item
              v-for="tab in item.tabs"
              :id="tab.id"
              :key="tab.id"
              :value="tab.component"
            >
              <component
                :is="getComponent(tab.component)"
                class="adaptiveGrid__padding"
              ></component>
              <!-- <component
                :is="is(tab.component)"
                class="adaptiveGrid adaptiveGrid__paddings"
              ></component> -->
            </v-window-item>
          </v-window>
        </div>

        <component
          :is="getComponent(item.component)"
          v-else
          class="adaptiveGrid__padding"
        ></component>
      </base-panel>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import BasePanel from '@/components/base/BasePanel.vue'
import BasePanelAcordions from '@/components/base/BasePanelAcordions.vue'
import DocumentComformity from '@/components/forms/conformityForms/document/DocumentComformity.vue'
import VehicleDetails from '@/components/forms/conformityForms/document/VehicleDetails.vue'
import CertificationAgency from '@/components/forms/conformityForms/document/CertificationAgency.vue'
import DeclarerAddress from '@/components/forms/conformityForms/document/DeclarerAddress.vue'
import ManufacturerAddress from '@/components/forms/conformityForms/document/ManufacturerAddress.vue'
import ManufacturersRepresentativesAddress from '@/components/forms/conformityForms/document/ManufacturersRepresentativesAddress.vue'
import AssemblyPlant from '@/components/forms/conformityForms/document/AssemblyPlant.vue'
import ProviderAddress from '@/components/forms/conformityForms/document/ProviderAddress.vue'
import ViewSpread from '@/components/forms/conformityForms/document/ViewSpread.vue'
import MoreInformations from '@/components/forms/conformityForms/document/MoreInformations.vue'

import BasicVehicle from '@/components/forms/conformityForms/BasicVehicle.vue'

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
        component: 'AssemblyPlant'
      },
      {
        title: 'Поставщик сборочных комплектов и его адрес',
        id: '#vehicle-details-provider',
        component: 'ProviderAddress'
      },
      {
        title: 'Вид распространения',
        id: '#vehicle-details-view',
        component: 'ViewSpread'
      },
      {
        title: 'Дополнительная информаци',
        id: '#vehicle-details-additional',
        component: 'MoreInformations'
      }
    ]
  },
  {
    title: 'Базовое ТС',
    id: '#base-vehicle',
    component: 'BasicVehicle'
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    id: '#vehicle-setting',
    tabs: [
      {
        title: 'Компоновка транспортного средства',
        id: '#vehicle-composition',
        component: 'DocumentComformity'
      },
      {
        title: 'Ходовая часть ТС',
        id: '#numbers-vheels',
        component: 'DocumentComformity'
      },
      {
        title: 'Ось транспортного средства',
        id: '#vehicle-axis',
        component: 'DocumentComformity'
      },
      {
        title: 'Габаритные размеры',
        id: '#dimensions',
        component: 'DocumentComformity'
      },
      {
        title: 'Масса',
        id: '#weight',
        component: 'DocumentComformity'
      },
      {
        title: 'Масса буксируемого прицепа',
        id: '#weight-towed-trailer',
        component: 'DocumentComformity'
      },
      {
        title: 'Двигатель',
        id: '#engine',
        component: 'DocumentComformity'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Устройство накопления энергии',
        id: '#storage-device',
        component: 'DocumentComformity'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Топливо',
        id: '#fuel',
        component: 'DocumentComformity'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система питания',
        id: '#supply-system',
        component: 'DocumentComformity'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система зажигания',
        id: '#ignition-system',
        component: 'DocumentComformity'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система выпуска и нейтрализации отработавших газов',
        id: '#neutralization-system',
        component: 'DocumentComformity'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Сцепление',
        id: '#clutch',
        component: 'DocumentComformity'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Трансмиссия',
        id: '#transmission',
        component: 'DocumentComformity'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Подвеска',
        id: '#suspension',
        component: 'DocumentComformity'
      },
      {
        title: 'Рулевое управление',
        id: '#steerage',
        component: 'DocumentComformity'
      },
      {
        title: 'Тормозные системы',
        id: '#brake-systems',
        component: 'DocumentComformity'
      },
      {
        title: 'Шины',
        id: '#tires',
        component: 'DocumentComformity'
      }
    ]
  },
  {
    title: 'Описание маркировки транспортного средства (Шасси)',
    id: '#description-of-vehicle-markings',
    component: 'DocumentComformity'
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    id: '#vehicle-general-form',
    component: 'DocumentComformity'
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    id: '#confirming-document',
    component: 'DocumentComformity'
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    id: '#list-of-documents',
    component: 'DocumentComformity'
    // hide: this.formModel.conformityDocKindCode === '30'
  },
  {
    title: 'История изменения документа',
    id: '#conformity-change-history',
    component: 'DocumentComformity'
  }
])
const currentPanel = ref(0)
const currentTab = ref('tab')
const allComponents = {
  DocumentComformity,
  VehicleDetails,
  CertificationAgency,
  DeclarerAddress,
  ManufacturerAddress,
  ManufacturersRepresentativesAddress,
  AssemblyPlant,
  ProviderAddress,
  ViewSpread,
  MoreInformations,
  BasicVehicle
}

// function is(type) {
//   if (!type) {
//     console.log('______________no_____________')
//     return
//   }
//   return defineAsyncComponent(() => import(`@/components/forms/conformityForms/${type}.vue`))
// }
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
  padding: 14px 24px 10px 24px;
}
</style>
