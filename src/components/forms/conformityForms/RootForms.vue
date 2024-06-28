<template>
  <div class="layoutForms">
    <base-panel-acordions v-model="dataEnabled" class="forms-menu"></base-panel-acordions>
    <div class="forms-data">
      <base-panel
        v-for="item in dataEnabled"
        :id="item.id"
        :key="item.id"
        v-model:open-panel="item.openPanel"
        elevation="5"
        bg-color="#ebebeb"
      >
        <template #title>{{ item.title }} </template>
        <component
          :is="getComponent(item.component)"
          v-model="item.tabsEnabled"
          v-model:tab="item.tab"
          class="mainContent"
        ></component>
      </base-panel>
    </div>

    <v-btn
      prepend-icon="mdi-menu"
      class="modalBtn"
      color="white"
      variant="text"
      @click="isOpenRightMenu = !isOpenRightMenu"
    >
      меню действий
    </v-btn>

    <div class="forms-action" :class="{ openRightMenu: isOpenRightMenu }">
      <p class="action-title">
        {{
          shema.conformityDocKindCode === '30'
            ? 'Одобрение типа транспортного средства'
            : 'Одобрение типа шасси'
        }}
      </p>
      <p v-if="shema.cert.signer.name != ''">
        Подписан:
        <strong
          >{{ shema.cert.signer.organization }} {{ shema.cert.signer.surname }}
          {{ shema.cert.signer.name }}</strong
        >
      </p>
      <p>
        Номер документа: <strong>{{ shema.docId }}</strong>
      </p>
      <p>
        Статус: <strong>{{ shema.conformityDocStatusDetails.docStatus }}</strong>
      </p>
      <p v-if="shema.refuseReason && shema.conformityDocStatusDetails.docStatus === 'Черновик'">
        Причина отказа: <strong>{{ shema.refuseReason }}</strong>
      </p>
      <p v-if="shema.conformityDocKindCode === '30'">
        Дата оформления бумажного ОТТС: <strong>{{ shema.docCreationDate }}</strong>
      </p>
      <p v-if="shema.conformityDocKindCode === '35'">
        Дата оформления бумажного ОТШ: <strong>{{ shema.docCreationDate }}</strong>
      </p>
      <p>
        Срок действия:
        <strong>{{
          `${shema.docStartDate} ${shema.docStartDate ? '-' : ''} ${shema.docValidityDate}`
        }}</strong>
      </p>

      <v-btn class="btn my-3" @click="isShowText = !isShowText">
        <v-icon size="25">{{ isShowText ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn
      >
      <div v-if="isShowText === true">
        <p>Сформирован на основании:</p>
        <p>
          Орган по сертификации:
          <strong>{{ shema.conformityAuthorityInformationDetails.businessEntityBriefName }}</strong>
        </p>
        <p>
          Марка: <strong>{{ shema.vehicleTypeDetails.vehicleMakeName.join(' , ') }}</strong>
        </p>
        <p>
          Тип: <strong>{{ shema.vehicleTypeDetails.vehicleTypeId.join('  , ') }}</strong>
        </p>
      </div>

      <div class="btnActions">
        <v-btn
          v-if="
            ['Действующий', 'Утвержден', 'Приостановлен', 'Прекращен'].includes(
              shema.conformityDocStatusDetails.docStatus
            )
          "
          class="btn"
        >
          Корректировать
        </v-btn>
        <v-btn
          v-if="
            !(
              $route.name !== 'look' ||
              !getPermissions.has('Редактировать документ ОТТС (ОТШ)') ||
              shema.conformityDocStatusDetails.docStatus !== 'Черновик'
            )
          "
          class="btn"
          @click="() => $router.push('/conformities/form/' + shema.id)"
          >Редактировать</v-btn
        >
        <v-btn v-if="!(shema.conformityDocStatusDetails.docStatus !== '')" class="btn"
          >Создать черновик</v-btn
        >

        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'На утверждении' ||
              !getPermissions.has('Утвердить документ ОТТС (ОТШ)')
            )
          "
          class="btn"
          >Утвердить</v-btn
        >
        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'На утверждении' ||
              !getPermissions.has('Утвердить документ ОТТС (ОТШ)')
            )
          "
          class="btn"
          >Отказать</v-btn
        >
        <v-btn v-if="!(shema.conformityDocStatusDetails.docStatus !== 'Черновик')" class="btn"
          >Создать проект</v-btn
        >

        <v-btn
          v-if="!!['На согласовании'].includes(shema.conformityDocStatusDetails.docStatus)"
          class="btn"
        >
          Согласовать
        </v-btn>

        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'Действующий' ||
              !getPermissions.has('Копировать документ ОТТС (ОТШ)')
            )
          "
          class="btn"
          >Копировать</v-btn
        >
        <v-btn
          v-if="!(shema.conformityDocStatusDetails.docStatus !== 'Черновик')"
          class="btn"
          @click.stop="saveImage()"
          >Сохранить</v-btn
        >

        <v-btn
          v-if="
            !!['Действующий', 'Приостановлен'].includes(shema.conformityDocStatusDetails.docStatus)
          "
          class="btn"
        >
          Аннулировать
        </v-btn>

        <v-btn
          v-if="
            !!['Действующий', 'Приостановлен', 'Прекращен'].includes(
              shema.conformityDocStatusDetails.docStatus
            )
          "
          class="btn"
          >Продлить</v-btn
        >
        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'Черновик' ||
              !getPermissions.has('Удалить документ ОТТС (ОТШ)')
            )
          "
          class="btn"
          >Удалить</v-btn
        >

        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'На утверждении' ||
              !getPermissions.has('Отзыв документа в статусе «На утверждении»')
            )
          "
          class="btn"
          >Отозвать</v-btn
        >
        <v-btn class="btn">Проверка</v-btn>
        <v-btn
          v-if="!!['Действующий'].includes(shema.conformityDocStatusDetails.docStatus)"
          class="btn"
        >
          Приостановить
        </v-btn>

        <v-btn
          v-if="
            !!['Приостановлен', 'Отменен в СЭП', 'Прекращен'].includes(
              shema.conformityDocStatusDetails.docStatus
            )
          "
          class="btn"
        >
          Возобновить
        </v-btn>
        <v-btn
          v-if="
            !(
              !['Действующий'].includes(shema.conformityDocStatusDetails.docStatus) ||
              !getPermissions.has('Утвердить документ ОТТС (ОТШ)') ||
              $route.name === 'look'
            )
          "
          class="btn"
        >
          Изменить
        </v-btn>

        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'Проект' ||
              !getPermissions.has('Создать документ ОТТС (ОТШ)')
            )
          "
          class="btn"
          >Отправить на утверждение
        </v-btn>

        <v-btn v-if="shema.id" class="btn" @click="dialog3 = !dialog3">Работа с Pdf</v-btn>
        <v-btn class="btn" @click.stop="askClose()">Закрыть документ</v-btn>
      </div>
      <v-btn
        prepend-icon="mdi-close-thick"
        class="btnClose block full"
        @click="isOpenRightMenu = !isOpenRightMenu"
        >Закрыть
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import BasePanel from '@/components/base/BasePanel.vue'
import BasePanelAcordions from '@/components/base/BasePanelAcordions.vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
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

import { useRoute } from 'vue-router'
import { useRequestStore } from '@/stores/requestStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const shemaStore = useShemaStore()
shemaStore.createShema(shemaDefault) // создаем схему
const shema = shemaStore.shema // после связываем схему с полями
const user = useUserStore() //получение permissions из пользователя
const { getPermissions } = storeToRefs(user) //получение permissions

const isCategoryCode = computed(() => {
  return shema.vehicleTypeDetails.vehicleTechCategoryCode.every(
    (i) => !['O1', 'O2', 'O3', 'O4'].includes(i)
  )
})

const isCategoryCodeAndEngineType = computed(() => {
  return (
    isCategoryCode.value &&
    shema.vehicleVariantDetails[0].engineType === 'Двигатель внутреннего сгорания'
  )
})

const dataEnabled = computed(() => {
  return data.filter((item) => {
    if (item.tabs) {
      item.tabsEnabled = item.tabs.filter((subItem) => subItem.enabled)
    }
    return item.enabled
  })
})

const requests = useRequestStore()
const route = useRoute()
const isShowText = ref(false)
let isOpenRightMenu = ref(false)

// если есть квери параметр, заполняем первоначально схему данными
if (route.query.val) {
  shema.conformityDocKindCode = route.query.val
}

// если есть id то получаем данные с сервета
if (route.params.id) {
  shemaStore.LoadDataAndNormaliseImages(`/api/otts/docDetails/search/${route.params.id}`)
}

async function saveImage() {
  const images = JSON.parse(JSON.stringify(shema.vehicleTypeDetails.vehiclePicture))
  console.log('images', images)
  for (let i = 0; i < images.length; i++) {
    images[i].value = images[i].value.split(';base64,')[1]
  }
  return await requests.put(`/api/otts/docDetails/update/${route.params.id}?docId=${shema.docId}`, {
    cms: null,
    otts: shema
  })
}

// async function loadServerData() {
//   return await requests.get(`/api/otts/docDetails/search/${route.params.id}`)
// }

// async function gettingURLImg(nameImg) {
//   return await requests.postText('/api/storage/image/get', { fileName: nameImg })
// }

const data = reactive([
  {
    title: 'Документ об оценке соответствия',
    id: '#vehicle-details',
    component: 'DocumentRoot',
    tab: 'DocumentComformity',
    openPanel: '1',
    enabled: true,
    tabs: [
      {
        title: 'Документ',
        id: '#vehicle-details-document',
        component: 'DocumentComformity',
        enabled: true
      },
      {
        title: 'Транспортное средство',
        id: '#vehicle-details-vehicle',
        component: 'VehicleDetails',
        enabled: true
      },
      {
        title: 'Наименование органа, выдавшего документ',
        id: '#vehicle-details-certification',
        component: 'CertificationAgency',
        enabled: true
      },
      {
        title: 'Заявитель и его адрес',
        id: '#vehicle-details-applicant',
        component: 'DeclarerAddress',
        enabled: true
      },
      {
        title: 'Изготовитель и его адрес',
        id: '#vehicle-details-manufacturer',
        component: 'ManufacturerAddress',
        enabled: true
      },
      {
        title: 'Представители изготовителя и их адреса',
        id: '#vehicle-details-representatives',
        component: 'ManufacturersRepresentativesAddress',
        enabled: true
      },
      {
        title: 'Сборочный завод и его адрес',
        id: '#vehicle-details-factory',
        component: 'AssemblyPlantAddress',
        enabled: true
      },
      {
        title: 'Поставщик сборочных комплектов и его адрес',
        id: '#vehicle-details-provider',
        component: 'ProviderAddress',
        enabled: true
      },
      {
        title: 'Вид распространения',
        id: '#vehicle-details-view',
        component: 'ViewSpread',
        enabled: true
      },
      {
        title: 'Дополнительная информаци',
        id: '#vehicle-details-additional',
        component: 'MoreInformations',
        enabled: true
      }
    ]
  },
  {
    title: 'Базовое ТС',
    id: '#base-vehicle',
    component: 'BasicVehicle',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    id: '#vehicle-setting',
    component: 'GeneralCharacteristicsRoot',
    tab: 'VehicleComposition',
    openPanel: '1',
    enabled: true,
    tabs: [
      {
        title: 'Компоновка транспортного средства',
        id: '#vehicle-composition',
        component: 'VehicleComposition',
        enabled: true
      },
      {
        title: 'Ходовая часть ТС',
        id: '#numbers-vheels',
        component: 'VehicleRunningGearDetails',
        enabled: true
      },
      {
        title: 'Ось транспортного средства',
        id: '#vehicle-axis',
        component: 'VehicleAxis',
        enabled: true
      },
      {
        title: 'Габаритные размеры',
        id: '#dimensions',
        component: 'DimensionsSize',
        enabled: true
      },
      {
        title: 'Масса',
        id: '#weight',
        component: 'WeightCar',
        enabled: true
      },
      {
        title: 'Масса буксируемого прицепа',
        id: '#weight-towed-trailer',
        component: 'WeightTowedTrailer',
        enabled: true
      },
      {
        title: 'Двигатель',
        id: '#engine',
        component: 'EngineCar',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Устройство накопления энергии',
        id: '#storage-device',
        component: 'StorageDevice',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Топливо',
        id: '#fuel',
        component: 'FuelCar',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Система питания',
        id: '#supply-system',
        component: 'SupplySystem',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Система зажигания',
        id: '#ignition-system',
        component: 'IgnitionSystem',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Система нейтрализации',
        id: '#neutralization-system',
        component: 'NeutralizationSystem',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Сцепление',
        id: '#clutch',
        component: 'ClutchCar',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Трансмиссия',
        id: '#transmission',
        component: 'TransmissionCar',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Подвеска',
        id: '#suspension',
        component: 'SuspensionCar',
        enabled: true
      },
      {
        title: 'Рулевое управление',
        id: '#steerage',
        component: 'SteerageCar',
        enabled: true
      },
      {
        title: 'Тормозные системы',
        id: '#brake-systems',
        component: 'BrakeSystems',
        enabled: true
      },
      {
        title: 'Шины',
        id: '#tires',
        component: 'TiresCar',
        enabled: true
      }
    ]
  },
  {
    title: 'Описание маркировки транспортного средства (Шасси)',
    id: '#description-of-vehicle-markings',
    component: 'DescriptionOfVehicleMarkings',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    id: '#vehicle-general-form',
    component: 'VehicleView',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    id: '#confirming-document',
    component: 'ConfirmingDocument',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    id: '#list-of-documents',
    component: 'ListOfDocuments',
    openPanel: '1',
    enabled: computed(() => shema.conformityDocKindCode === '30')
  },
  {
    title: 'История изменения документа',
    id: '#conformity-change-history',
    component: 'HistoryDocument',
    openPanel: '1',
    enabled: true
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
  grid-template-columns: 350px 1fr;
  overflow: auto;
  align-items: flex-start;
  align-content: flex-start;
  /* резервирует место под скролл */
  scrollbar-gutter: stable;
  color: #2c4957;
}
.forms-action {
  position: fixed;
  top: 65px;
  right: 0px;
  z-index: 2;
  width: 370px;
  max-height: calc(100vh - 120px);
  background-color: rgba(219, 219, 219);
  /* background-color: rgba(127, 255, 212, 0.589); */
  padding: 0px 2px 10px 12px;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  scrollbar-width: thin;
  scrollbar-gutter: stable;
  border: 1px solid white;
  overflow: auto;
  box-shadow:
    rgba(44, 73, 87, 0.79) 0px 1px 20px,
    rgba(44, 73, 87, 0.4) 0px 7px 7px;
  transform: translateX(110%);
  transition: transform 0.35s ease-in-out;
}
.btnClose {
  margin-top: 10px;
  position: sticky;
  bottom: 0px;
  color: red;
}
.openRightMenu {
  transform: translateX(-25px);
}

.btnActions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.btn {
  /* color: #648194; */
  font-size: 12px;
}
.action-title {
  line-height: 1;
  text-align: center;
  font-size: 20px;
  margin: 12px 0px 12px 0px;
  font-weight: 700;
}
.modalBtn {
  position: fixed;
  right: 120px;
  top: 2px;
}

.forms-menu {
  width: 350px;
  max-height: calc(100% - 90px);
  overflow: auto;
  scrollbar-width: none;
  margin-top: 10px;
  position: fixed;
}
.forms-data {
  grid-column: -1/-2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 25px 15px 25px;
  overflow: hidden;
}
.mainContent {
  min-height: calc(100vh - 160px);
}
::v-deep .v-btn__content {
  white-space: pre-wrap;
  padding: 5px 0px;
}
</style>
