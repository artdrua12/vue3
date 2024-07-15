<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" open-panel="1">
      <template #title>Реестр ОТТС</template>
      <v-form class="adaptiveGrid pa-5">
        <base-checkbox :v-model="fields.own" label="Только свои" class="full"></base-checkbox>

        <base-textfield
          v-model="fields.docId"
          label="Номер документа"
          class="span6"
        ></base-textfield>
        <base-datefield
          v-model="fields.startDateTime"
          label="Срок действия с"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.endDateTime"
          label="Срок действия по"
          class="span3"
        ></base-datefield>

        <base-autocomplete
          v-model="fields.docStatus"
          label="Статус"
          class="span6"
          :items="NSI_003"
        ></base-autocomplete>
        <base-datefield
          v-model="fields.lastModifiedWith"
          label="Дата изменения с"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.lastModifiedBy"
          label="Дата изменения по"
          class="span3"
        ></base-datefield>

        <div class="full grid12">
          <base-textfield
            v-model="fields.signerSurname"
            label="Документ подписан"
            placeholder="Фамилия"
            class="span4"
          ></base-textfield>
          <base-textfield
            v-model="fields.singerName"
            placeholder="Имя"
            class="span4"
          ></base-textfield>
          <base-textfield
            v-model="fields.singerPatronimic"
            placeholder="Отчество"
            class="span4"
          ></base-textfield>
        </div>

        <base-panel class="full" elevation="3">
          <template #title>Дополнительные поля</template>
          <div class="adaptiveGrid pt-7 px-5">
            <base-autocomplete
              v-model="fields.vehicleMakeName"
              label="Марка"
              class="span6"
              item-text="title"
              :items="NSI_046"
            ></base-autocomplete>
            <base-textfield
              v-model="fields.commercialName"
              label="Коммерческое наименование"
              class="span6"
            ></base-textfield>

            <base-autocomplete
              v-model="fields.manufacturer"
              label="Изготовитель"
              class="span6"
              :items="manufacturerItems"
              item-text="businessEntityName"
              item-value="businessEntityName"
            ></base-autocomplete>
            <base-autocomplete
              v-model="fields.assemblyPlant"
              label="Сборочный завод"
              class="span6"
              :items="manufacturerItems"
              item-text="businessEntityName"
              item-value="businessEntityName"
            ></base-autocomplete>

            <base-autocomplete
              v-model="fields.certificationAgency"
              label="Орган по сертификации"
              class="span6"
              :items="certificationAgencyItems"
              item-text="certificationBodyNameBrief"
              item-value="certificationBodyNameBrief"
            ></base-autocomplete>
            <base-autocomplete
              v-model="fields.docType"
              label="Тип документа"
              class="span6"
              :items="NSI_012.filter((e) => ['30', '35'].includes(e.key))"
            ></base-autocomplete>

            <base-autocomplete
              v-model="fields.countryCode"
              label="Страна выдачи документа'"
              class="span6"
              :items="NSI_034"
              item-value="key"
            ></base-autocomplete>
            <base-autocomplete
              v-model="fields.techCategory"
              label="Категория ТС"
              class="span6"
              :items="NSI_015.filter((e) => e.key.match(/L|M|N|O/))"
              item-text="key"
              item-value="key"
            ></base-autocomplete>
          </div>
        </base-panel>
      </v-form>
      <div class="full base-button">
        <v-btn
          prepend-icon="mdi-close-circle"
          color="red"
          size="small"
          class="rounded-0"
          variant="tonal"
          @click="Object.assign(fields, defaultFields)"
        >
          Очистить форму
        </v-btn>
        <v-btn
          append-icon="mdi-magnify"
          width="120px"
          color="#546e7a"
          size="small"
          elevation="3"
          class="rounded-0"
          @click="find"
        >
          Поиск
        </v-btn>
      </div>
    </base-panel>

    <div class="base-action elevation-5">
      <base-panel open-panel="1">
        <template #title>Выбор действия</template>
        <base-threeview
          :selected="tableRowSelect"
          :path-to-status="pathToStatus"
          :actions="actions"
        ></base-threeview>
      </base-panel>
    </div>

    <base-table
      v-model:size="size"
      v-model:page="page"
      v-model:tableRowSelect="tableRowSelect"
      :table-headers="tableHeaders"
      :additional-table-headers="additionalTableHeaders"
      :table-data-and-pagination="tableDataAndPagination"
      :path-to-status="pathToStatus"
      class="base-table"
      @find="find"
    ></base-table>

    <base-modal
      v-model="isModalDelete"
      title="Удаление документа"
      icon="mdi-file-document-remove-outline"
      ok-title="Продолжить"
      cancel-title="отмена"
      :ok-function="
        async () => {
          const res = await requests.delet(`/api/otts/docDetails/delete/${tableRowSelect.id}`)
          if (res) {
            await find()
            snack.setSnack({ text: 'Документ удален', type: 'info' })
          } else {
            snack.setSnack({ text: 'Ошибка удаления', type: 'error' })
          }
        }
      "
    >
      Вы действительно хотите удалить выбранный документ?
    </base-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseThreeview from '@/components/base/BaseThreeview.vue'
import BaseTable from '@/components/base/BaseTableSubGrid.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BasePanel from '@/components/base/BasePanel.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import { useRouter } from 'vue-router'
import { useGetCatalog, useLoadItems, useCheckAndLoadData } from './composable'
import { useRequestStore } from '@/stores/requestStore'
import shemaDefault from '../forms/conformityForms/shemaDefault'
import { useShemaStore } from '@/stores/shemaStore' // для работы со схемой
import { useSnackStore } from '@/stores/snackStore' // для работы с уведомлениями
import BaseModal from '@/components/base/BaseModal.vue'
const requests = useRequestStore()

const shemaStore = useShemaStore()
const snack = useSnackStore()
const route = useRouter()
const tableHeaders = [
  { text: 'Номер  документа', value: 'docId', id: 'h1' },
  { text: 'Тип  документа', value: 'conformityDocKindName', id: 'h2' },
  { text: 'Дата изменения', value: 'tcInfo.lastModified', id: 'h3' },
  { text: 'Изготовитель', value: 'vehicleManufacturerDetails[0].businessEntityName', id: 'h4' },
  { text: 'Заявитель', value: 'applicantDetails.businessEntityName', id: 'h5' },
  { text: 'Статус', value: `conformityDocStatusDetails.docStatus`, id: 'h6' },
  { text: 'Документ подписан', value: ['cert.signer.surname', 'cert.signer.name'], id: 'h7' }
]
const pathToStatus = 'conformityDocStatusDetails.docStatus' // путь для статуса, используется в table и в action
let tableDataAndPagination = ref({}) // данные для таблицы + информция для пагинации
const additionalTableHeaders = [
  { text: 'Страна выдачи документа', value: 'unifiedCountryCode.value', id: 1, model: false },
  { text: 'Сформирован на основании', value: 'conformityDocKindName', id: 2, model: false },
  {
    text: 'Коммерческое наименование',
    value: 'vehicleTypeDetails.vehicleCommercialName',
    id: 3,
    model: false
  },
  { text: 'Тип', value: 'vehicleTypeDetails.vehicleTypeIdZ', id: 4, model: false },
  {
    text: 'Модификация',
    value: 'vehicleVariantDetails[0].vehicleTypeVariantId',
    id: 5,
    model: false
  },
  {
    text: 'Техническая категория',
    value: 'vehicleTypeDetails.vehicleTechCategoryCode',
    id: 6,
    model: false
  },
  {
    text: 'Экологический класс',
    value: 'vehicleVariantDetails[0].vehicleEcoClassCode',
    id: 7,
    model: false
  },
  { text: 'Срок действия с', value: 'docStartDate', id: 8, model: false },
  { text: 'Срок действия по', value: 'docValidityDate', id: 9, model: false },
  {
    text: 'Представитель изготовителя',
    value: 'representativeBusinessEntityName',
    id: 10,
    model: false
  },
  {
    text: 'Орган по сертификации',
    value: 'conformityAuthorityInformationDetails.businessEntityBriefName',
    id: 11,
    model: false
  },
  { text: 'Вариант изготовления Шасси', value: 'status', id: 12, model: false },
  {
    text: 'Трансмиссия: тип',
    value: 'vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleTransmissionText',
    id: 13,
    model: false
  },
  { text: 'Двигатель', value: 'vehicleVariantDetails[0].engineType', id: 14, model: false },
  {
    text: 'Колесная формула',
    value: 'vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelFormula[0]',
    id: 15,
    model: false
  },
  {
    text: 'Кузов',
    value: 'vehicleVariantDetails[0].vehicleBodyworkDetails[0].vehicleBodyworkType',
    id: 16,
    model: false
  },
  {
    text: 'Система питания: тип',
    value: 'fuelFeedDetailsElementsVehicleComponentType',
    id: 17,
    model: false
  },
  {
    text: 'Система зажигания: тип',
    value: 'vehicleIgnitionDetailsElementsVehicleComponentType',
    id: 18,
    model: false
  },
  {
    text: 'Система нейтрализации: тип',
    value: 'exhaustDetailsVehicleComponentText',
    id: 19,
    model: false
  },
  { text: 'Марка', value: 'vehicleTypeDetails.vehicleMakeName', id: 20, model: false },
  {
    text: 'Габаритные размеры: длина',
    value: 'vehicleVariantDetails[0].vehicleOverallDimensionDetails.lengthMeasure[0].valueMin',
    id: 21,
    model: false
  },
  {
    text: 'Габаритные размеры: ширина',
    value: 'vehicleVariantDetails[0].vehicleOverallDimensionDetails.widthMeasure[0].valueMin',
    id: 22,
    model: false
  },
  {
    text: 'Габаритные размеры: высота',
    value: 'vehicleVariantDetails[0].vehicleOverallDimensionDetails.heightMeasure[0].valueMin',
    id: 23,
    model: false
  }
]
const fields = reactive({
  own: false,
  docId: '',
  startDateTime: '',
  endDateTime: '',
  docStatus: '',
  lastModifiedWith: '',
  lastModifiedBy: '',
  signerSurname: '',
  singerName: '',
  singerPatronimic: '',
  // Дополнительные поля
  vehicleMakeName: '',
  commercialName: '',
  manufacturer: '',
  assemblyPlant: '',
  certificationAgency: '',
  docType: '',
  countryCode: '',
  techCategory: ''
})
const defaultFields = JSON.parse(JSON.stringify(fields))
const actions = [
  {
    text: 'Создать документ',
    enabled: true,
    children: [
      {
        text: 'ОТТС',
        icon: 'mdi-file-plus-outline',
        enabled: { permission: ['Создать документ ОТТС (ОТШ)'] },
        action: () => {
          const shema = shemaStore.createShema(shemaDefault) // создаем схему
          shema.conformityDocKindCode = '30' // вносим изменения в схему
          route.push('/conformities/form')
        }
      },
      {
        text: 'ОТШ',
        icon: 'mdi-file-plus-outline',
        enabled: { permission: ['Создать документ ОТТС (ОТШ)'] },
        action: () => {
          const shema = shemaStore.createShema(shemaDefault) // создаем схему
          shema.conformityDocKindCode = '35' // вносим изменения в схему
          route.push('/conformities/form')
        }
      }
    ]
  },
  {
    text: 'Создать шаблон',
    enabled: false,
    children: [
      {
        text: 'Единичный шаблон',
        enabled: false,
        icon: 'mdi-file-plus-outline'
      },
      {
        text: 'Набор шаблонов',
        enabled: false,
        icon: 'mdi-file-plus-outline'
      }
    ]
  },
  {
    text: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Редактировать документ ОТТС (ОТШ)']
    },
    action: async () => {
      shemaStore.createShema(shemaDefault) // создаем схему
      await shemaStore.LoadDataAndNormaliseImages(
        `/api/otts/docDetails/search/${tableRowSelect.value.id}`
      ) // получаем данные о конкретной строке и заполняем ими таблицу
      route.push('/conformities/form') // переходим на страницу формы
    }
  },
  // решение до реализации заявлений!!
  {
    text: 'Внесение изменений НО в ОТТС в статусе «Действующий»',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Утвердить документ ОТТС (ОТШ)']
    },
    action: async () => {
      shemaStore.createShema(shemaDefault) // создаем схему
      await shemaStore.LoadDataAndNormaliseImages(
        `/api/otts/docDetails/search/${tableRowSelect.value.id}`
      ) // получаем данные о конкретной строке и заполняем ими таблицу
      route.push('/conformities/form') // переходим на страницу формы
      // route.push({
      //   path: `/conformities/form/${id}`,
      //   query: { docStatus: 'Действующий' }
      // })
    }
  },
  {
    text: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: 'true',
      permission: ['Просмотреть документ ОТТС (ОТШ)']
    },
    action: async () => {
      shemaStore.createShema(shemaDefault) // создаем схему
      await shemaStore.LoadDataAndNormaliseImages(
        `/api/otts/docDetails/search/${tableRowSelect.value.id}`
      ) // получаем данные о конкретной строке и заполняем ими таблицу
      route.push({
        path: `/conformities/form`,
        query: { look: true }
      }) // переход на страницу формы в режиме просмотра
    }
  },
  {
    text: 'Копировать',
    icon: 'mdi-content-copy',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Копировать документ ОТТС (ОТШ)']
    },
    action: async () => {
      await shemaStore.createShema(shemaDefault) // создаем схему
      await shemaStore.LoadDataAndNormaliseImages(
        `/api/otts/docDetails/search/${tableRowSelect.value.id}`
      ) //загружаем в схему новые данные
      route.push(`/conformities/form`) // переходим на документ
      const saveShema = shemaStore.beforeSave() // нормализуем картинки перед сохранением
      await requests.post(`/api/otts/docDetails/saving/copy/${tableRowSelect.value.id}`, saveShema) //запрос на копирование объекта
      snack.setSnack({ text: 'Документ скопирован', type: 'info' })
    }
  },
  {
    text: 'Аннулировать',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  { text: 'Вернуть', enabled: false, icon: 'mdi-file-document-edit-outline' },
  {
    text: 'Приостановить',
    enabled: {
      notEmptyAndStatus: ['Действующий']
    },
    icon: 'mdi-file-document-edit-outline'
  },
  { text: 'Продлить', enabled: false, icon: 'mdi-file-document-edit-outline' },
  {
    text: 'Возобновить',
    enabled: {
      notEmptyAndStatus: ['Приостановлен', 'Отменен в СЭП', 'Прекращен']
    },
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Выгрузка',
    icon: 'mdi-xml',
    enabled: false
  },
  {
    text: 'Пересмотреть',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Корректировать',
    enabled: {
      notEmptyAndStatus: ['Действующий', 'Утвержден', 'Приостановлен', 'Прекращен']
    },
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Прекратить действие',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Удалить',
    icon: 'mdi-delete-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Удалить документ ОТТС (ОТШ)']
    },
    action: () => {
      isModalDelete.value = !isModalDelete.value
    }
  }
]
const tableRowSelect = ref({}) // выбранная строка из таблицы
let size = ref(5) //количество строк на одной странице
let page = ref(0) // текущая страница в пагинации
const isModalDelete = ref(false)

const NSI_003 = ref([])
const NSI_012 = ref([])
const NSI_015 = ref([])
const NSI_034 = ref([])
const NSI_046 = ref([])
const manufacturerItems = ref([])
const certificationAgencyItems = ref([])

async function find() {
  const body = {
    isOwn: fields.own,
    isRegexSearch: true,
    query: {
      ['docId']: fields.docId,
      ['docStartDate']: fields.startDateTime + 'to',
      ['docValidityDate']: 'to' + fields.endDateTime,
      ['conformityDocStatusDetails.docStatus']: fields.docStatus,
      ['unifiedCountryCode.value']: fields.countryCode,
      ['vehicleManufacturerDetails.businessEntityName']: fields.manufacturer,
      ['cert.signer.surname']: fields.signerSurname,
      ['cert.signer.name']: fields.namePartonimic,
      ['tcInfo.lastModified']: fields.lastModifiedWith + 'to' + fields.lastModifiedBy,
      ['conformityAuthorityInformationDetails.businessEntityBriefName']: fields.certificationAgency,
      ['vehicleTypeDetails.vehicleMakeName']: fields.vehicleMakeName,
      ['vehicleTypeDetails.vehicleCommercialName']: fields.commercialName,
      ['vehicleTypeDetails.vehicleTechCategoryCode']: fields.techCategory,
      ['conformityDocKindName']: fields.docType,
      ['vehicleManufacturerDetails.vehicleManufacturerKindCode']: '05'
    },
    fields: [
      'docId',
      'conformityDocKindName',
      'tcInfo.lastModified',
      'vehicleManufacturerDetails',
      'applicantDetails.businessEntityName',
      'conformityDocStatusDetails.docStatus',
      'unifiedCountryCode.value',
      'conformityDocKindName',
      'vehicleTypeDetails.vehicleCommercialName',
      'vehicleTypeDetails.vehicleTypeIdZ',
      'vehicleVariantDetails.vehicleTypeVariantId',
      'vehicleTypeDetails.vehicleTechCategoryCode',
      'vehicleVariantDetails.vehicleEcoClassCode',
      'docStartDate',
      'docValidityDate',
      'conformityAuthorityInformationDetails.businessEntityBriefName',
      'vehicleVariantDetails.vehicleRunningGearDetails.vehicleTransmissionText',
      'vehicleVariantDetails.engineType',
      'vehicleVariantDetails.vehicleRunningGearDetails.vehicleWheelFormula',
      'vehicleVariantDetails.vehicleBodyworkDetails.vehicleBodyworkType',
      'vehicleVariantDetails.fuelFeedDetails',
      'vehicleVariantDetails.vehicleIgnitionDetails',
      'vehicleVariantDetails.exhaustDetails',
      'vehicleTypeDetails.vehicleMakeName',
      'vehicleVariantDetails.vehicleOverallDimensionDetails.lengthMeasure.valueMin',
      'vehicleVariantDetails.vehicleOverallDimensionDetails.widthMeasure.valueMin',
      'vehicleVariantDetails.vehicleOverallDimensionDetails.heightMeasure.valueMin',
      'cert.signer'
    ],
    pageAndSort: {
      page: page.value,
      size: size.value
    }
  }
  // проверка на заполенность хотя бы одного поля и загрузка данных
  tableDataAndPagination.value = await useCheckAndLoadData(
    fields,
    '/api/otts/docDetails/modification/search',
    body
  )
}
//справочники для автокомплита
async function load() {
  NSI_003.value = await useGetCatalog('NSI_003')
  NSI_012.value = await useGetCatalog('NSI_012')
  NSI_015.value = await useGetCatalog('NSI_015')
  NSI_034.value = await useGetCatalog('NSI_034')
  NSI_046.value = await useGetCatalog('NSI_046')
  manufacturerItems.value = await useLoadItems('/api/manufacturer-registry/all')
  certificationAgencyItems.value = await useLoadItems(
    '/api/classifier/epassport/certification-body/search/certificateAccreditations'
  )
  // const r = await useLoadItems(
  //   '/api/classifier/epassport/certification-body/search/certificateAccreditations'
  // )
  // console.log('r', r)
}
load()
</script>

<style scoped>
.layoutPages {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: auto 1fr;
  gap: 5px 20px;
  padding: 10px 5px 15px 20px;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;
  overflow-x: hidden;
  /* резервирует место под скролл */
  scrollbar-gutter: stable;
}
.baseForm {
  width: 100%;
}
.base-search {
  grid-area: 1/1/2/2;
}
.base-action {
  grid-area: 1/2/-1/3;
  overflow: hidden;
  max-height: 90vh;
  z-index: 1;
  position: absolute;
  right: 23px;
  width: 400px;
}
.base-table {
  grid-area: 2/1/3/-1;
  z-index: 0;
}
.base-button {
  display: flex;
  justify-content: space-between;
}
</style>
