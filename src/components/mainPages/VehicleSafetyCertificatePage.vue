<template>
  <layout-pages
    v-model:fields="fields"
    v-model:fields-more="fieldsMore"
    title="Реестр СБКТС"
    @find="find"
  ></layout-pages>
</template>

<script setup>
import { provide, reactive, ref } from 'vue'
import LayoutPages from '../layout/LayoutPages.vue'
import { useRequestStore } from '@/stores/requestStore'

const requests = useRequestStore() // для работы с запросами
const tableHeaders = [
  { text: 'Номер СБКТС', value: 'docId', id: 'h1' },
  { text: 'Дата изменения', value: 'tcInfo.lastModified', id: 'h2' },
  { text: 'Изготовитель', value: 'vehicleManufacturerDetails[0].businessEntityName', id: 'h3' },
  { text: 'Заявитель', value: 'applicantDetails.businessEntityName', id: 'h4' },
  { text: 'Статус', value: `docStatusDetails.docStatus`, id: 'h5' },
  { text: 'Документ подписан', value: ['cert.signer.surname', 'cert.signer.name'], id: 'h6' }
]
const additionalTableHeaders = [
  { text: 'Страна выдачи документа', value: 'unifiedCountryCode.value', id: 1, model: false },
  { text: 'Номер ОТТС', value: 'conformityInformation.docId', id: 2, model: false },
  {
    text: 'Коммерческое наименование',
    value: 'vehicleTypeDetails.vehicleCommercialName',
    id: 3,
    model: false
  },
  { text: 'Марка', value: 'vehicleTypeDetails.vehicleMakeName', id: 4, model: false },
  { text: 'Тип', value: 'vehicleTypeDetails.vehicleTypeIdZ', id: 5, model: false },
  {
    text: 'Техническая категория',
    value: 'vehicleTypeDetails.vehicleTechCategoryCode',
    id: 6,
    model: false
  },
  {
    text: 'Экологический класс',
    value: 'vehicleVariantDetails.vehicleEcoClassCode',
    id: 7,
    model: false
  },
  {
    text: 'Испытательная лаборатория',
    value: 'conformityAuthorityInformationDetails.businessEntityBriefName',
    id: 8,
    model: false
  },
  { text: 'Двигатель', value: 'vehicleVariantDetails.engineType', id: 9, model: false },
  {
    text: 'Идентификационный номер',
    value: 'vehicleTypeDetails.vehicleIdentificationNumberId',
    id: 10,
    model: false
  }
]
let tableDataFromResponse = ref({})
const fields = reactive({
  own: {
    width: 'all',
    label: 'Только свои',
    value: false,
    type: 'BaseCheckbox'
  },
  docId: {
    width: '6',
    label: 'Номер документа',
    value: '',
    type: 'BaseTextfield'
  },
  docStatus: {
    width: '6',
    label: 'Статус',
    value: '',
    type: 'BaseAutocomplete',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'value'
  },
  countryCode: {
    width: '6',
    label: 'Страна выдачи документа',
    value: '',
    type: 'BaseAutocomplete',
    items: [],
    url: '/api/classifier/epassport/countries',
    text: 'value',
    itemValue: 'key'
  },
  vin: {
    width: '6',
    label: 'Идентификационный номер',
    value: '',
    type: 'BaseTextfield'
  },
  makeName: {
    width: '6',
    label: 'Марка',
    value: '',
    type: 'BaseAutocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-makes',
    text: 'value'
  },
  lastModifiedWith: {
    width: '3',
    label: 'Дата изменения с',
    value: '',
    type: 'BaseDatefield'
  },
  lastModifiedBy: {
    width: '3',
    label: 'Дата изменения по',
    value: '',
    type: 'BaseDatefield'
  },
  commercialName: {
    width: 'all',
    label: 'Коммерческое наименование',
    value: '',
    type: 'BaseTextfield'
  },
  fullName: {
    width: 'all',
    value: '',
    type: 'BaseSlot',
    additionData: {
      signerSurname: {
        width: '4',
        label: 'Документ подписан',
        value: '',
        type: 'BaseTextfield',
        placeholder: 'Фамилия'
      },
      singerName: { width: '4', value: '', type: 'BaseTextfield', placeholder: 'Имя' },
      singerPatronimic: {
        width: '4',
        value: '',
        type: 'BaseTextfield',
        placeholder: 'Отчество'
      }
    }
  }
})
const fieldsMore = reactive({
  manufacturer: {
    width: '6',
    label: 'Изготовитель',
    value: '',
    type: 'BaseAutocomplete',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  declarer: {
    width: '6',
    label: 'Заявитель',
    value: '',
    type: 'BaseAutocomplete',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  certificationAgency: {
    width: '6',
    label: 'Испытательная лаборатория',
    value: '',
    type: 'BaseAutocomplete',
    items: [],
    url: '/api/classifier/epassport/certification-body/search/certificateAccreditations',
    text: 'certificationBodyNameBrief',
    itemValue: 'certificationBodyNameBrief'
  }
})
const actions = [
  {
    text: 'Создать документ',
    icon: 'mdi-file-plus-outline',
    enabled: { permission: ['Создать документ СБКТС'] }
  },
  {
    text: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Редактировать документ СБКТС']
    }
  },
  // решение до реализации заявлений!!
  {
    text: 'Внесение изменений НО в СБКТС в статусе «Действующий»',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Утвердить документ СБКТС']
    }
  },
  {
    text: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: 'true',
      permission: ['Утвердить документ СБКТС']
    }
  },
  {
    text: 'Копировать',
    icon: 'mdi-content-copy',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Копировать документ СБКТС']
    }
  },
  {
    text: 'Аннулировать',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  { text: 'Вернуть', enabled: false, icon: 'mdi-file-document-edit-outline' },
  {
    text: 'Выгрузка',
    icon: 'mdi-xml',
    enabled: false /* this.hasSelected && this.permissions.includes('Выгрузка документа СБКТС') */
  },
  {
    text: 'Корректировать',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Удалить',
    icon: 'mdi-delete-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Удалить документ СБКТС']
    }
  }
]

provide('tableDataFromResponse', tableDataFromResponse) // для заполнеия таблицы данными
provide('additionalTableHeaders', additionalTableHeaders) // заколовки для таблицы дополнительные
provide('tableHeaders', tableHeaders) // заколовки для таблицы
provide('actions', actions) // все мозможные действия
provide('pathToStatus', 'docStatusDetails.docStatus') // путь к статусу

async function find(obj) {
  console.log('find')
  const body = {
    isOwn: fields.own.value,
    isRegexSearch: true,
    query: {
      ['docId']: fields.docId.value,
      ['docStatusDetails.docStatus']: fields.docStatus.value,
      ['unifiedCountryCode.value']: fields.countryCode.value,
      ['vehicleTypeDetails.vehicleIdentificationNumberId']: fields.vin.value,
      ['vehicleTypeDetails.vehicleMakeName']: fields.makeName.value,
      ['tcInfo.lastModified']: fields.lastModifiedWith.value + 'to' + fields.lastModifiedBy.value,
      ['vehicleTypeDetails.vehicleCommercialName']: fields.commercialName.value,
      ['cert.signer.surname']: fields.fullName.additionData.signerSurname.value,
      ['cert.signer.name']: (
        fields.fullName.additionData.singerName.value ||
        '' + ' ' + fields.fullName.additionData.singerPatronimic.value ||
        ''
      ).trim(),

      ['vehicleManufacturerDetails.businessEntityName']: fieldsMore.manufacturer.value,
      ['conformityAuthorityInformationDetails.businessEntityBriefName']:
        fieldsMore.certificationAgency.value,
      ['applicantDetails.businessEntityName']: fieldsMore.declarer.value
    },
    fields: [
      'docId',
      'tcInfo.lastModified',
      'vehicleManufacturerDetails.businessEntityName',
      'applicantDetails.businessEntityName',
      'docStatusDetails.docStatus',
      'unifiedCountryCode.value',
      'conformityInformation.docId',
      'vehicleTypeDetails.vehicleCommercialName',
      'vehicleTypeDetails.vehicleMakeName',
      'vehicleTypeDetails.vehicleTypeIdZ',
      'vehicleTypeDetails.vehicleTechCategoryCode',
      'vehicleVariantDetails.vehicleEcoClassCode',
      'conformityAuthorityInformationDetails.businessEntityBriefName',
      'vehicleVariantDetails.engineType',
      'cert.signer.surname',
      'cert.signer.name',
      'vehicleTypeDetails.vehicleIdentificationNumberId'
    ],
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post('/api/sbkts/modification/search', body)
  tableDataFromResponse.value = res
}

async function getAutocompliteData(obj = {}) {
  for (const key in obj) {
    if (obj[key].url) {
      try {
        const data = await requests.get(obj[key].url)
        if (!data) {
          throw new Error()
        }
        obj[key].items = data
      } catch (error) {
        console.log('Ошибка загрузки данных для ' + obj[key]?.label)
      }
      if (obj[key].filter) {
        obj[key].items = eval(`obj[key].items.${obj[key].filter}`)
      }
    }
  }
}

getAutocompliteData({ ...fields, ...fieldsMore })
</script>

<style scoped></style>
