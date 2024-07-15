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
      <p>Статус: <strong>{{}}</strong></p>
      <p v-if="shema.refuseReason">
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
        <v-btn class="btnItem" size="small"> Корректировать </v-btn>
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
        <v-btn class="btnItem" size="small" @click="saveAsDraftDocument">Создать черновик</v-btn>

        <v-btn class="btnItem" size="small">Утвердить</v-btn>
        <v-btn class="btnItem" size="small">Отказать</v-btn>
        <v-btn class="btnItem" size="small">Создать проект</v-btn>

        <v-btn class="btnItem" size="small"> Согласовать </v-btn>

        <v-btn class="btnItem" size="small">Копировать</v-btn>
        <v-btn class="btnItem" size="small" @click.stop="saveImage()">Сохранить</v-btn>

        <v-btn class="btnItem" size="small"> Аннулировать </v-btn>

        <v-btn class="btnItem" size="small">Продлить</v-btn>
        <v-btn class="btnItem" size="small">Удалить</v-btn>

        <v-btn class="btnItem" size="small">Отозвать</v-btn>
        <v-btn class="btnItem" size="small" @click="validation">Проверка</v-btn>
        <v-btn class="btnItem" size="small"> Приостановить </v-btn>

        <v-btn class="btnItem" size="small"> Возобновить </v-btn>
        <v-btn class="btnItem" size="small"> Изменить </v-btn>

        <v-btn
          class="btnItem"
          size="small"
          >Отправить на утверждение
        </v-btn>

        <v-btn  class="btnItem" size="small" @click="dialog3 = !dialog3"
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
import GeneralInformationRoot from '@/components/forms/vechicleSaferyCertificate/generalInformation/GeneralInformationRoot.vue' // Документ об оценке соответствия
import VehicleFrame from '@/components/forms/vechicleSaferyCertificate/VehicleFrame.vue' //  Шасси
import GeneralCharacteristicsRoot from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/GeneralCharacteristicsRoot.vue' // Общие характеристики транспортного средства
import ConformityInformation from '@/components/forms/vechicleSaferyCertificate/ConformityInformation.vue' // Сведения об ОТТС, на основании которого оформлено СБКТС"
import ChangeHistory from '@/components/forms/vechicleSaferyCertificate/ChangeHistory.vue' // История изменения документа
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
    title: 'Общие сведения',
    component: 'GeneralInformationRoot',
    tab: 'DocumentVechicle',
    openPanel: '1',
    enabled: true,
    tabs: [
      {
        title: 'Документ об оценке соответствия',
        component: 'DocumentVechicle',
        enabled: true
      },
      {
        title: 'Транспортное средство',
        component: 'VehicleDetails',
        enabled: true
      },
      {
        title: 'Идентификационный номер ТС',
        component: 'VehicleId',
        enabled: true
      },
      {
        title: 'Испытательная лаборатория',
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
        title: 'Сборочный завод и его адрес',
        component: 'AssemblyPlantAddress',
        enabled: true
      },
      {
        title: 'Ограничения',
        component: 'MoreInformations',
        enabled: true
      }
    ]
  },
  {
    title: 'Шасси',
    component: 'VehicleFrame ',
    openPanel: '1',
    enabled: true
  },
  {
    title: 'Компоновка ТС',
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
        component: 'NumbersVheels',
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
    title: 'Сведения об ОТТС, на основании которого оформлено СБКТС',
    component: 'ConformityInformation',
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
const isCategoryCode = computed(() => {
  return true
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
  GeneralInformationRoot,
  VehicleFrame,
  GeneralCharacteristicsRoot,
  ConformityInformation,
  ChangeHistory
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
</style>
