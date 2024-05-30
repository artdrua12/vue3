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

// Документ об оценке соответствия
import DocumentComformity from '@/components/forms/conformityForms/document/DocumentComformity.vue'
import VehicleDetails from '@/components/forms/conformityForms/document/VehicleDetails.vue'
import CertificationAgency from '@/components/forms/conformityForms/document/CertificationAgency.vue'
import DeclarerAddress from '@/components/forms/conformityForms/document/DeclarerAddress.vue'
import ManufacturerAddress from '@/components/forms/conformityForms/document/ManufacturerAddress.vue'
import ManufacturersRepresentativesAddress from '@/components/forms/conformityForms/document/ManufacturersRepresentativesAddress.vue'
import AssemblyPlantAddress from '@/components/forms/conformityForms/document/AssemblyPlantAddress.vue'
import ProviderAddress from '@/components/forms/conformityForms/document/ProviderAddress.vue'
import ViewSpread from '@/components/forms/conformityForms/document/ViewSpread.vue'
import MoreInformations from '@/components/forms/conformityForms/document/MoreInformations.vue'
//  Базовое ТС
import BasicVehicle from '@/components/forms/conformityForms/BasicVehicle.vue'
// Общие характеристики транспортного средства (Шасси)
import VehicleComposition from '@/components/forms/conformityForms/generalCharacteristics/VehicleComposition.vue'
import VehicleRunningGearDetails from '@/components/forms/conformityForms/generalCharacteristics/VehicleRunningGearDetails.vue'
import VehicleAxis from '@/components/forms/conformityForms/generalCharacteristics/VehicleAxis.vue'
import DimensionsSize from '@/components/forms/conformityForms/generalCharacteristics/DimensionsSize.vue'
import WeightCar from '@/components/forms/conformityForms/generalCharacteristics/WeightCar.vue'
import WeightTowedTrailer from '@/components/forms/conformityForms/generalCharacteristics/WeightTowedTrailer.vue'
import EngineCar from '@/components/forms/conformityForms/generalCharacteristics/EngineCar.vue'
import StorageDevice from '@/components/forms/conformityForms/generalCharacteristics/StorageDevice.vue'
import FuelCar from '@/components/forms/conformityForms/generalCharacteristics/FuelCar.vue'
import SupplySystem from '@/components/forms/conformityForms/generalCharacteristics/SupplySystem.vue'
import IgnitionSystem from '@/components/forms/conformityForms/generalCharacteristics/IgnitionSystem.vue'
import NeutralizationSystem from '@/components/forms/conformityForms/generalCharacteristics/NeutralizationSystem.vue'
import ClutchCar from '@/components/forms/conformityForms/generalCharacteristics/ClutchCar.vue'
import TransmissionCar from '@/components/forms/conformityForms/generalCharacteristics/TransmissionCar.vue'
import SuspensionCar from '@/components/forms/conformityForms/generalCharacteristics/SuspensionCar.vue'
import SteerageCar from '@/components/forms/conformityForms/generalCharacteristics/SteerageCar.vue'
import BrakeSystems from '@/components/forms/conformityForms/generalCharacteristics/BrakeSystems.vue'
import TiresCar from '@/components/forms/conformityForms/generalCharacteristics/TiresCar.vue'


// Описание маркировки транспортного средства (Шасси)
import DescriptionOfVehicleMarkings from '@/components/forms/conformityForms/DescriptionOfVehicleMarkings.vue'
// Общий вид транспортного средства (Шасси)
import VehicleView from '@/components/forms/conformityForms/VehicleView.vue'
// Документ, подтверждающий соответствие обязательным требованиям
import ConfirmingDocument from '@/components/forms/conformityForms/ConfirmingDocument.vue'
// Перечень документов, являющихся основанием для оформления ОТТС
import ListOfDocuments from '@/components/forms/conformityForms/ListOfDocuments.vue'
// История изменения документа
import HistoryDocument from '@/components/forms/conformityForms/ChangeHistory.vue'

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
        component: 'AssemblyPlantAddress'
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
        component: 'VehicleComposition'
      },
      {
        title: 'Ходовая часть ТС',
        id: '#numbers-vheels',
        component: 'VehicleRunningGearDetails'
      },
      {
        title: 'Ось транспортного средства',
        id: '#vehicle-axis',
        component: 'VehicleAxis'
      },
      {
        title: 'Габаритные размеры',
        id: '#dimensions',
        component: 'DimensionsSize'
      },
      {
        title: 'Масса',
        id: '#weight',
        component: 'WeightCar'
      },
      {
        title: 'Масса буксируемого прицепа',
        id: '#weight-towed-trailer',
        component: 'WeightTowedTrailer'
      },
      {
        title: 'Двигатель',
        id: '#engine',
        component: 'EngineCar'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Устройство накопления энергии',
        id: '#storage-device',
        component: 'StorageDevice'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Топливо',
        id: '#fuel',
        component: 'FuelCar'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система питания',
        id: '#supply-system',
        component: 'SupplySystem'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система зажигания',
        id: '#ignition-system',
        component: 'IgnitionSystem'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система выпуска и нейтрализации отработавших газов',
        id: '#neutralization-system',
        component: 'NeutralizationSystem'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Сцепление',
        id: '#clutch',
        component: 'ClutchCar'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Трансмиссия',
        id: '#transmission',
        component: 'TransmissionCar'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Подвеска',
        id: '#suspension',
        component: 'SuspensionCar'
      },
      {
        title: 'Рулевое управление',
        id: '#steerage',
        component: 'SteerageCar'
      },
      {
        title: 'Тормозные системы',
        id: '#brake-systems',
        component: 'BrakeSystems'
      },
      {
        title: 'Шины',
        id: '#tires',
        component: 'TiresCar'
      }
    ]
  },
  {
    title: 'Описание маркировки транспортного средства (Шасси)',
    id: '#description-of-vehicle-markings',
    component: 'DescriptionOfVehicleMarkings'
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    id: '#vehicle-general-form',
    component: 'VehicleView'
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    id: '#confirming-document',
    component: 'ConfirmingDocument'
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    id: '#list-of-documents',
    component: 'ListOfDocuments'
    // hide: this.formModel.conformityDocKindCode === '30'
  },
  {
    title: 'История изменения документа',
    id: '#conformity-change-history',
    component: 'HistoryDocument'
  }
])

const currentTab = ref('')
const allComponents = {
  DocumentComformity,
  VehicleDetails,
  CertificationAgency,
  DeclarerAddress,
  ManufacturerAddress,
  ManufacturersRepresentativesAddress,
  AssemblyPlantAddress,
  ProviderAddress,
  ViewSpread,
  MoreInformations,

  BasicVehicle,

  VehicleComposition,
  VehicleRunningGearDetails,
  VehicleAxis,
  DimensionsSize,
  WeightCar,
  WeightTowedTrailer,
  EngineCar,
  StorageDevice,
  FuelCar,
  SupplySystem,
  IgnitionSystem,
  NeutralizationSystem,
  ClutchCar,
  TransmissionCar,
  SuspensionCar,
  SteerageCar,
  BrakeSystems,
  TiresCar,

  DescriptionOfVehicleMarkings,
  VehicleView,
  ConfirmingDocument,
  ListOfDocuments,
  HistoryDocument
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
  overflow: hidden;
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
