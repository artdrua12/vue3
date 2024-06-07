<template>
  <div class="layoutForms">
    <base-panel-acordions v-model="data" class="forms-menu"></base-panel-acordions>
    <div class="forms-data">
      <base-panel
        v-for="item in data"
        :id="item.id"
        :key="item.id"
        v-model:open-panel="item.openPanel"
        elevation="5"
        bg-color="#ebebeb"
      >
        <template #title>{{ item.title }} </template>

        <component
          :is="getComponent(item.component)"
          v-model="item.tabs"
          v-model:tab="item.tab"
        ></component>
      </base-panel>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import BasePanel from '@/components/base/BasePanel.vue'
import BasePanelAcordions from '@/components/base/BasePanelAcordions.vue'

// Документ об оценке соответствия
import DocumentRoot from '@/components/forms/conformityForms/document/DocumentRoot.vue'
//  Базовое ТС
import BasicVehicle from '@/components/forms/conformityForms/BasicVehicle.vue'
// Общие характеристики транспортного средства (Шасси)
import GeneralCharacteristicsRoot from '@/components/forms/conformityForms/generalCharacteristics/GeneralCharacteristicsRoot.vue'
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
    component: 'DocumentRoot',
    tab: 'DocumentComformity',
    openPanel: '1',
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
    component: 'BasicVehicle',
    openPanel: '1'
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    id: '#vehicle-setting',
    component: 'GeneralCharacteristicsRoot',
    tab: 'VehicleComposition',
    openPanel: '1',
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
    component: 'DescriptionOfVehicleMarkings',
    openPanel: '1'
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    id: '#vehicle-general-form',
    component: 'VehicleView',
    openPanel: '1'
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    id: '#confirming-document',
    component: 'ConfirmingDocument',
    openPanel: '1'
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    id: '#list-of-documents',
    component: 'ListOfDocuments',
    openPanel: '1'
    // hide: this.formModel.conformityDocKindCode === '30'
  },
  {
    title: 'История изменения документа',
    id: '#conformity-change-history',
    component: 'HistoryDocument',
    openPanel: '1'
  }
])
const allComponents = {
  DocumentRoot,
  BasicVehicle,
  GeneralCharacteristicsRoot,
  DescriptionOfVehicleMarkings,
  VehicleView,
  ConfirmingDocument,
  ListOfDocuments,
  HistoryDocument
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
  padding: 10px 25px 15px 25px;
  overflow: hidden;
}
/* .tabsWrapper {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 85vh;
  min-height: 50vh;
  align-content: flex-start;
} */
::v-deep .v-btn__content {
  white-space: pre-wrap;
  padding: 5px 0px;
}
/* .adaptiveGrid__padding {
  padding: 0px 24px 10px 24px;
} */
</style>
