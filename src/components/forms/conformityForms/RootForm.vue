<template>
  <div class="layoutForms">
    <base-panel-acordions
      v-model="dataEnabled"
      v-model:panel="panel"
      class="forms-menu"
    ></base-panel-acordions>

    <div class="forms-data">
      <base-panel
        v-for="item in dataEnabled"
        :id="item.component"
        :key="item.component"
        v-model:open-panel="item.openPanel"
        elevation="5"
        bg-color="#ebebeb"
        style="scroll-margin-top:10px"
      >
        <template #title>{{ item.title }} </template>
        <component
          :is="getComponent(item.component)"
          ref="childCompRef"
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

      <v-btn
        class="my-3"
        size="small"
        color="#648194"
        @click="isAdditionInfoRightMenu = !isAdditionInfoRightMenu"
      >
        <v-icon size="25">{{
          isAdditionInfoRightMenu ? 'mdi-chevron-up' : 'mdi-chevron-down'
        }}</v-icon></v-btn
      >
      <div v-if="isAdditionInfoRightMenu === true" class="mb-3">
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
          class="btnItem"
          size="small"
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
          class="btnItem"
          size="small"
          @click="() => $router.push('/conformities/form/' + shema.id)"
          >Редактировать</v-btn
        >
        <v-btn
          v-if="!(shema.conformityDocStatusDetails.docStatus !== '')"
          class="btnItem"
          size="small"
          @click="saveAsDraftDocument"
          >Создать черновик</v-btn
        >

        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'На утверждении' ||
              !getPermissions.has('Утвердить документ ОТТС (ОТШ)')
            )
          "
          class="btnItem"
          size="small"
          >Утвердить</v-btn
        >
        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'На утверждении' ||
              !getPermissions.has('Утвердить документ ОТТС (ОТШ)')
            )
          "
          class="btnItem"
          size="small"
          >Отказать</v-btn
        >
        <v-btn
          v-if="!(shema.conformityDocStatusDetails.docStatus !== 'Черновик')"
          class="btnItem"
          size="small"
          >Создать проект</v-btn
        >

        <v-btn
          v-if="!!['На согласовании'].includes(shema.conformityDocStatusDetails.docStatus)"
          class="btnItem"
          size="small"
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
          class="btnItem"
          size="small"
          >Копировать</v-btn
        >
        <v-btn
          v-if="!(shema.conformityDocStatusDetails.docStatus !== 'Черновик')"
          class="btnItem"
          size="small"
          @click.stop="saveImage()"
          >Сохранить</v-btn
        >

        <v-btn
          v-if="
            !!['Действующий', 'Приостановлен'].includes(shema.conformityDocStatusDetails.docStatus)
          "
          class="btnItem"
          size="small"
        >
          Аннулировать
        </v-btn>

        <v-btn
          v-if="
            !!['Действующий', 'Приостановлен', 'Прекращен'].includes(
              shema.conformityDocStatusDetails.docStatus
            )
          "
          class="btnItem"
          size="small"
          >Продлить</v-btn
        >
        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'Черновик' ||
              !getPermissions.has('Удалить документ ОТТС (ОТШ)')
            )
          "
          class="btnItem"
          size="small"
          >Удалить</v-btn
        >

        <v-btn
          v-if="
            !(
              shema.conformityDocStatusDetails.docStatus !== 'На утверждении' ||
              !getPermissions.has('Отзыв документа в статусе «На утверждении»')
            )
          "
          class="btnItem"
          size="small"
          >Отозвать</v-btn
        >
        <v-btn class="btnItem" size="small" @click="validation">Проверка</v-btn>
        <v-btn
          v-if="!!['Действующий'].includes(shema.conformityDocStatusDetails.docStatus)"
          class="btnItem"
          size="small"
        >
          Приостановить
        </v-btn>

        <v-btn
          v-if="
            !!['Приостановлен', 'Отменен в СЭП', 'Прекращен'].includes(
              shema.conformityDocStatusDetails.docStatus
            )
          "
          class="btnItem"
          size="small"
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
          class="btnItem"
          size="small"
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
          class="btnItem"
          size="small"
          >Отправить на утверждение
        </v-btn>

        <v-btn v-if="shema.id" class="btnItem" size="small" @click="dialog3 = !dialog3"
          >Работа с Pdf</v-btn
        >
        <v-btn class="btnItem" size="small" @click="isCloseDocument = !isCloseDocument"
          >Закрыть документ</v-btn
        >
      </div>
      <v-btn
        prepend-icon="mdi-menu"
        color="#2c4957"
        size="small"
        class="btnClose block full"
        @click="isOpenRightMenu = !isOpenRightMenu"
        >скрыть меню действий
      </v-btn>
    </div>

    <base-modal
      v-model="isCloseDocument"
      title="Закрыть документ"
      icon="mdi-file-document-remove-outline"
      ok-title="Продолжить"
      cancel-title="отмена"
      :ok-function="() => $router.push('/conformities')"
    >
      Все изменения будут потеряны. Продолжить?
    </base-modal>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import BasePanel from '@/components/base/BasePanel.vue'
import BasePanelAcordions from '@/components/base/BasePanelAcordions.vue'
import DocumentRoot from '@/components/forms/conformityForms/document/DocumentRoot.vue' // Документ об оценке соответствия
import BasicVehicle from '@/components/forms/conformityForms/BasicVehicle.vue' //  Базовое ТС
import GeneralCharacteristicsRoot from '@/components/forms/conformityForms/generalCharacteristics/GeneralCharacteristicsRoot.vue' // Общие характеристики транспортного средства (Шасси)
import DescriptionOfVehicleMarkings from '@/components/forms/conformityForms/DescriptionOfVehicleMarkings.vue' // Описание маркировки транспортного средства (Шасси)
import VehicleView from '@/components/forms/conformityForms/VehicleView.vue' // Общий вид транспортного средства (Шасси)
import ConfirmingDocument from '@/components/forms/conformityForms/ConfirmingDocument.vue' // Документ, подтверждающий соответствие обязательным требованиям
import ListOfDocuments from '@/components/forms/conformityForms/ListOfDocuments.vue' // Перечень документов, являющихся основанием для оформления ОТТС
import HistoryDocument from '@/components/forms/conformityForms/ChangeHistory.vue' // История изменения документа
import BaseModal from '@/components/base/BaseModal.vue'

import { useRoute } from 'vue-router'
import { useRequestStore } from '@/stores/requestStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useSnackStore } from '@/stores/snackStore'

const snack = useSnackStore()
const isCloseDocument = ref(false)
const shemaStore = useShemaStore()
const shema = shemaStore.getShema // получаем схему
const user = useUserStore() //получение permissions из пользователя
const { getPermissions } = storeToRefs(user) //получение permissions

const panel = ref(0) // текущая панель
const childCompRef = ref(null) // ссылка на дочерние компоненты
const data = reactive([
  {
    title: 'Документ об оценке соответствия',
    component: 'DocumentRoot',
    tab: 'DocumentComformity',
    openPanel: '1',
    enabled: true,
    tabs: [
      {
        title: 'Документ',
        component: 'DocumentComformity',
        enabled: true
      },
      {
        title: 'Транспортное средство',
        component: 'VehicleDetails',
        enabled: true
      },
      {
        title: 'Наименование органа, выдавшего документ',
        component: 'CertificationAgency',
        enabled: true
      },
      {
        title: 'Заявитель и его адрес',
        component: 'DeclarerAddress',
        enabled: true
      },
      {
        title: 'Изготовитель и его адрес',
        component: 'ManufacturerAddress',
        enabled: true
      },
      {
        title: 'Представители изготовителя и их адреса',
        component: 'ManufacturersRepresentativesAddress',
        enabled: true
      },
      {
        title: 'Сборочный завод и его адрес',
        component: 'AssemblyPlantAddress',
        enabled: true
      },
      {
        title: 'Поставщик сборочных комплектов и его адрес',
        component: 'ProviderAddress',
        enabled: true
      },
      {
        title: 'Вид распространения',
        component: 'ViewSpread',
        enabled: true
      },
      {
        title: 'Дополнительная информаци',
        component: 'MoreInformations',
        enabled: true
      }
    ]
  },
  {
    title: 'Базовое ТС',
    component: 'BasicVehicle',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    component: 'GeneralCharacteristicsRoot',
    tab: 'VehicleComposition',
    openPanel: '1',
    enabled: true,
    tabs: [
      {
        title: 'Компоновка транспортного средства',
        component: 'VehicleComposition',
        enabled: true
      },
      {
        title: 'Ходовая часть ТС',
        component: 'VehicleRunningGearDetails',
        enabled: true
      },
      {
        title: 'Ось транспортного средства',
        component: 'VehicleAxis',
        enabled: true
      },
      {
        title: 'Габаритные размеры',
        component: 'DimensionsSize',
        enabled: true
      },
      {
        title: 'Масса',
        component: 'WeightCar',
        enabled: true
      },
      {
        title: 'Масса буксируемого прицепа',
        component: 'WeightTowedTrailer',
        enabled: true
      },
      {
        title: 'Двигатель',
        component: 'EngineCar',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Устройство накопления энергии',
        component: 'StorageDevice',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Топливо',
        component: 'FuelCar',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Система питания',
        component: 'SupplySystem',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Система зажигания',
        component: 'IgnitionSystem',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Система нейтрализации',
        component: 'NeutralizationSystem',
        enabled: computed(() => isCategoryCodeAndEngineType.value)
      },
      {
        title: 'Сцепление',
        component: 'ClutchCar',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Трансмиссия',
        component: 'TransmissionCar',
        enabled: computed(() => isCategoryCode.value)
      },
      {
        title: 'Подвеска',
        component: 'SuspensionCar',
        enabled: true
      },
      {
        title: 'Рулевое управление',
        component: 'SteerageCar',
        enabled: true
      },
      {
        title: 'Тормозные системы',
        component: 'BrakeSystems',
        enabled: true
      },
      {
        title: 'Шины',
        component: 'TiresCar',
        enabled: true
      }
    ]
  },
  {
    title: 'Описание маркировки транспортного средства (Шасси)',
    component: 'DescriptionOfVehicleMarkings',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    component: 'VehicleView',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    component: 'ConfirmingDocument',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    component: 'ListOfDocuments',
    openPanel: '1',
    enabled: computed(() => shema.conformityDocKindCode === '30')
  },
  {
    title: 'История изменения документа',
    component: 'HistoryDocument',
    openPanel: '1',
    enabled: true
  }
])
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
const isAdditionInfoRightMenu = ref(false)
let isOpenRightMenu = ref(false)

// если есть квери параметр, заполняем первоначально схему данными
// if (route.query.val) {
//   shema.conformityDocKindCode = route.query.val
// }

// если есть id то получаем данные с сервера
// if (route.params.id) {
//   shemaStore.LoadDataAndNormaliseImages(`/api/otts/docDetails/search/${route.params.id}`)
// }

async function saveAsDraftDocument() {
  const saveShema = shemaStore.beforeSave() // обрезка картинок
  const response = await requests.post(
    `/api/otts/docDetails/saving-as-draft?docId=${shema.docId}`,
    saveShema
  )
  console.log('response', response)
}

async function saveImage() {
  const saveShema = shemaStore.beforeSave() // обрезка картинок
  return await requests.put(`/api/otts/docDetails/update/${route.params.id}?docId=${shema.docId}`, {
    cms: null,
    otts: saveShema
  })
}
function goToId(item) {
  let elem = document.getElementById(item.component)
  elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
  openPanel(item) // открываем панель если она закрыта
}
function openPanel(item) {
  item.openPanel = '1'
}
//  проверяем на валидность panel(которые отображаются), если находим невалидную, прекращаем проверку
async function validation() {
  for (let i = 0; i < dataEnabled.value.length; i++) {
    const check = await childCompRef.value[i]?.isValidation()
    if (check == false) {
      // переход к невалидной panel(по айди)
      panel.value = i
      goToId(dataEnabled.value[i])
      return
    }
  }
  snack.setSnack({ text: 'G ', type: 'info' })
}
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
  border-radius: 4px;
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
}
.openRightMenu {
  transform: translateX(-25px);
}

.btnActions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 7px;
}
.btnItem {
  color: white;
  font-size: 12px;
  background-color: rgb(100, 129, 148);
}
.btnItem .v-btn__content {
  white-space: wrap;
  padding: 0px 0px !important;
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
  z-index: 2;
}

.forms-menu {
  width: 350px;
  max-height: calc(100% - 90px);
  overflow: auto;
  scrollbar-width: none;
  margin: 10px 0px 0px 10px;
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
</style>
