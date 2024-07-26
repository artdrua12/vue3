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
        style="scroll-margin-top: 10px"
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
      <p class="action-title">Сертификат соответствия</p>
      <p :disabled="shema.cert && shema.cert.signer.name != ''">
        Подписан:
        <strong
          >{{ shema.cert.signer.organization }} {{ shema.cert.signer.surname }}
          {{ shema.cert.signer.name }}</strong
        >
      </p>
      <p>
        Номер документа: <strong>{{ shema.docId }}</strong>
      </p>
      Номер документа: <strong>{{ shema.docId }}</strong>
      <p>
        Статус: <strong>{{ shema.conformityDocStatus }}</strong>
      </p>
      <p :disabled="shema.refuseReason">
        Причина отказа: <strong>{{ shema.refuseReason }}</strong>
      </p>

      <p>
        Дата оформления:
        <strong>{{ shema.docCreationDate }}</strong>
      </p>

      <p>
        Срок действия:<strong>{{ `${shema.docStartDate} - ${shema.docValidityDate}` }}</strong>
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
      <div v-show="isAdditionInfoRightMenu === true" class="mb-3">
        <p>
          Орган по сертификации:
          <strong>{{ shema.conformityAuthorityInformationDetails.businessEntityBriefName }}</strong>
        </p>
        <p>
          Марка: <strong>{{ shema.vehicleTypeDetails.vehicleMakeName }}</strong>
        </p>
        <p>
          Тип: <strong>{{ shema.vehicleTypeDetails.vehicleTypeId }}</strong>
        </p>
      </div>

      <div class="btnActions">
        <v-btn :disabled="true" color="#648194" size="small">Корректировать</v-btn>

        <v-btn
          :disabled="
            $route.name !== 'look' ||
            !getPermissions.has('Редактировать документ СБКТС') ||
            shema.conformityDocStatusDetails.docStatus !== 'Черновик'
          "
          class="btnItem"
          size="small"
          @click="() => $router.push('/vehicle-safety-certificate/form/')"
          >Редактировать</v-btn
        >
        <v-btn class="btnItem" size="small" @click="saveAsDraftDocument">Создать черновик</v-btn>

        <v-btn
          :disabled="
            shema.conformityDocStatus !== 'На утверждении' ||
            !getPermissions.has('Утвердить сертификат соответствия')
          "
          color="#648194"
          size="small"
          @click="isApprove = !isApprove"
          >Утвердить</v-btn
        >

        <v-btn
          :disabled="
            shema.conformityDocStatus !== 'На утверждении' ||
            !getPermissions.has('Утвердить сертификат соответствия')
          "
          class="btnItem"
          size="small"
          @click="isRefuse = !isRefuse"
          >Отказать</v-btn
        >
        <v-btn
          :disabled="shema.conformityDocStatus !== 'Черновик'"
          class="btnItem"
          size="small"
          @click="createProject"
          >Создать проект</v-btn
        >
        <v-btn :disabled="true" color="#648194" size="small">Согласовать</v-btn>
        <v-btn
          :disabled="
            shema.conformityDocStatus !== 'Действующий' ||
            !getPermissions.has('Копировать документ СБКТС')
          "
          class="btnItem"
          size="small"
          @click="copyDocument(shema.id)"
          >Копировать</v-btn
        >
        <v-btn
          :disabled="shema.conformityDocStatus !== 'Черновик'"
          class="btnItem"
          size="small"
          @click="save()"
          >Сохранить</v-btn
        >
        <v-btn :disabled="true" color="#648194" size="small">Аннулировать</v-btn>
        <v-btn :disabled="true" color="#648194" size="small">Вернуть</v-btn>
        <v-btn :disabled="true" color="#648194" size="small">На согласование</v-btn>

        <v-btn
          :disabled="
            !['Действующий', 'Приостановлен', 'Прекращен'].includes(shema.conformityDocStatus)
          "
          class="btnItem"
          size="small"
          >Продлить</v-btn
        >
        <v-btn
          :disabled="
            !getPermissions.has('Удалить документ СБКТС') ||
            shema.conformityDocStatus !== 'Черновик'
          "
          class="btnItem"
          size="small"
          >Удалить</v-btn
        >

        <v-btn
          :disabled="
            shema.conformityDocStatus !== 'На утверждении' ||
            !getPermissions.has('Отзыв документа в статусе «На утверждении»')
          "
          class="btnItem"
          size="small"
          >Отозвать</v-btn
        >
        <v-btn
          :disabled="shema.conformityDocStatus !== 'Черновик'"
          class="btnItem"
          size="small"
          @click="validation"
          >Проверка</v-btn
        >
        <v-btn :disabled="true" color="#648194" size="small">Приостановить</v-btn>
        <v-btn
          :disabled="
            !['Действующий'].includes(shema.conformityDocStatus) ||
            !getPermissions.has('Утвердить сертификат соответствия')
          "
          class="btnItem"
          size="small"
        >
          Изменить
        </v-btn>

        <v-btn
          :disabled="
            shema.conformityDocStatus !== 'Проект' || !getPermissions.has('Создать документ СБКТС')
          "
          class="btnItem full"
          size="small"
          >Отправить на утверждение
        </v-btn>

        <v-btn :disabled="!shema.id" class="btnItem" size="small" @click="dialog3 = !dialog3"
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
import CertificationConformity from '@/components/forms/poweredMachinesCertificates/CertificationConformity.vue'
import CertificationAgency from '@/components/forms/poweredMachinesCertificates/CertificationAgency.vue'
import DeclarerAddress from '@/components/forms/poweredMachinesCertificates/DeclarerAddress.vue'
import ManufacturerAddress from '@/components/forms/poweredMachinesCertificates/ManufacturerAddress.vue'
import ConfirmingDocument from '@/components/forms/poweredMachinesCertificates/ConfirmingDocument.vue'
import VehicleProduct from '@/components/forms/poweredMachinesCertificates/VehicleProduct.vue'
import MoreInformations from '@/components/forms/poweredMachinesCertificates/MoreInformations.vue'
import ListOfDocuments from '@/components/forms/poweredMachinesCertificates/ListOfDocuments.vue'
import BasicVehicle from '@/components/forms/poweredMachinesCertificates/BasicVehicle.vue'
import RestrictionsCar from '@/components/forms/poweredMachinesCertificates/RestrictionsCar.vue'
import DescriptionOfVehicleMarkings from '@/components/forms/poweredMachinesCertificates/DescriptionOfVehicleMarkings.vue'
import VehicleGeneralView from '@/components/forms/poweredMachinesCertificates/VehicleGeneralView.vue'
import GeneralCharacteristicsRoot from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/GeneralCharacteristicsRoot.vue'
import ChangeHistory from '@/components/forms/poweredMachinesCertificates/ChangeHistory.vue'
import BaseModal from '@/components/base/BaseModal.vue'

import { useRoute } from 'vue-router'
import { useRequestStore } from '@/stores/requestStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useSnackStore } from '@/stores/snackStore'

const allComponents = {
  CertificationConformity, // Сертификат соответствия
  CertificationAgency, // Орган по сертификации, выдавший сертификат
  DeclarerAddress, // Заявитель
  ManufacturerAddress, // Изготовитель
  ConfirmingDocument, // Сведения о документах, на основании которых выдан сертификат соответствия
  VehicleProduct, // Продукция
  MoreInformations, // Дополнительная информация
  ListOfDocuments, // Перечень документов, подтверждающих соответствие компонентов СМ
  BasicVehicle, // Базовая СМ
  RestrictionsCar, // Ограничения
  GeneralCharacteristicsRoot, // Общие характеристики транспортного средства
  DescriptionOfVehicleMarkings, // Описание маркировки СМ
  VehicleGeneralView, // Общий вид СМ
  ChangeHistory // История изменения документа
}

const snack = useSnackStore()
const isCloseDocument = ref(false)
const shemaStore = useShemaStore()
const shema = shemaStore.getShema // получаем схему
const user = useUserStore() //получение permissions из пользователя
const { getPermissions } = storeToRefs(user) //получение permissions

let isAdditionInfoRightMenu = ref(false)
let isOpenRightMenu = ref(false)
const isApprove = ref(false)
const isRefuse = ref(false)

const isTechnicalRegulations = computed(() => {
  return shema.technicalRegulations.includes('ТР ТС 031/2012')
})

const isCategoryCode = computed(() => {
  const array = shema.vehicleTypeDetails.machineTechCategoryCode
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].search('O|R[abX]') > -1) return false
    }
  }
  return true
})
const isCategoryCodeAndEngineType = computed(() => {
  return (
    isCategoryCode.value &&
    shema.vehicleVariantDetails.engineType === 'Двигатель внутреннего сгорания'
  )
})

const panel = ref(0) // текущая панель
const childCompRef = ref(null) // ссылка на дочерние компоненты
const data = reactive([
  {
    title: 'Сертификат соответствия',
    component: 'CertificationConformity',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Орган по сертификации, выдавший сертификат',
    component: 'CertificationAgency',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Заявитель',
    component: 'DeclarerAddress',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Изготовитель',
    component: 'ManufacturerAddress',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Сведения о документах, на основании которых выдан сертификат соответствия',
    component: 'ConfirmingDocument',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Продукция',
    component: 'VehicleProduct',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Дополнительная информация',
    component: 'MoreInformations',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Перечень документов, подтверждающих соответствие компонентов СМ',
    component: 'ListOfDocuments',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Базовая СМ',
    component: 'BasicVehicle',
    openPanel: '1',
    enabled: computed(() => isTechnicalRegulations.value)
  },
  {
    title: 'Ограничения',
    component: 'RestrictionsCar',
    openPanel: '1',
    enabled: computed(() => isTechnicalRegulations.value)
  },
  {
    title: 'Общие характеристики СМ',
    component: 'GeneralCharacteristicsRoot',
    tab: 'VehicleComposition',
    openPanel: '1',
    enabled: computed(() => isTechnicalRegulations.value),
    tabs: [
      {
        title: 'Компоновка СМ',
        component: 'VehicleComposition',
        enabled: true
      },
      {
        title: 'Ходовая часть СМ',
        component: 'VehicleRunningGearDetails',
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
        title: 'Другие приводные двигатели или комбинации двигателей',
        component: 'OtherDriveMotors',
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
      }
    ]
  },
  {
    title: 'Описание маркировки СМ',
    component: 'DescriptionOfVehicleMarkings',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Общий вид СМ',
    component: 'VehicleGeneralView',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'История изменения документа',
    component: 'ChangeHistory',
    openPanel: '1',
    enabled: true
  }
])
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

async function saveAsDraftDocument() {
  const saveShema = shemaStore.beforeSave() // обрезка картинок
  const response = await requests.post(`/api/sbkts/create/draft?docId=${shema.docId}`, saveShema)
  console.log('response', response)
}

async function save() {
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
      return false
    }
  }
  snack.setSnack({ text: 'Валидация успешно пройдена', type: 'info' })
  return true
}
function createProject() {
  const isValid = validation()
  if (isValid) {
    console.log('валидация пройдена')
  }
  console.log('createProject')
}

async function copyDocument() {
  const saveShema = shemaStore.beforeSave() // обрезка картинок
  return await requests.post(`/api/sbkts/saving/copy/${shema.id}`, saveShema)
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
    rgba(44, 44, 44, 0.79) 0px 1px 15px,
    rgba(44, 73, 87, 0.4) 0px 1px 7px;
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
