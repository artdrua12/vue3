<template>
  <layout-pages
    :fields="fields"
    :fields-more="fieldsMore"
    title="Реестр деклараций о соответствии"
    @find="find"
  ></layout-pages>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { provide, reactive, ref } from 'vue'
import LayoutPages from '../layout/LayoutPages.vue'
import { useRequestStore } from '@/stores/requestStore'
const route = useRouter()

const requests = useRequestStore() // для работы с запросами
const tableHeaders = [
  { text: 'Номер  документа', value: 'docId', id: 'h1' },
  { text: 'Дата изменения', value: 'tcInfo.lastModified', id: 'h2' },
  { text: 'Изготовитель', value: 'vehicleManufacturerDetails[0].businessEntityName', id: 'h3' },
  { text: 'Заявитель', value: 'applicantDetails.businessEntityName', id: 'h4' },
  { text: 'Статус', value: `docStatus`, id: 'h5' },
  { text: 'Документ подписан', value: ['cert.signer.surname', 'cert.signer.name'], id: 'h6' }
]
const additionalTableHeaders = [
  { text: 'Страна выдачи документа', value: 'unifiedCountryCode.value', id: 1, model: false },
  { text: 'Сформирован на основании', value: 'conformityDocKindName', id: 2, model: false },
  {
    text: 'Коммерческое наименование',
    value: 'vehicleTypeDetails.vehicleCommercialName',
    id: 3,
    model: false
  },
  { text: 'Тип', value: 'vehicleTypeDetails.vehicleTypeId', id: 4, model: false },
  {
    text: 'Модификация',
    value: 'vehicleVariantDetails.vehicleTypeVariantId',
    id: 5,
    model: false
  },
  {
    text: 'Код ТН ВЭД',
    value: 'vehicleVariantDetails.codTNVED',
    id: 6,
    model: false
  },
  { text: 'Срок действия с', value: 'docStartDate', id: 7, model: false },
  { text: 'Срок действия по', value: 'docValidityDate', id: 8, model: false },
  {
    text: 'Орган по сертификации',
    value: 'conformityAuthorityInformationDetails.authority',
    id: 9,
    model: false
  },
  {
    text: 'Полное наименование продукции',
    value: '',
    id: 10,
    model: false
  },
  {
    text: 'Наименование объекта сертификации',
    value: 'unifiedCommodityMeasure.release',
    id: 11
  },
  {
    text: 'Идентификационный номер изделия',
    value: 'vehicleDetails.vehicleIdInfoDetails.vehicleFactoryNumberId',
    id: 12,
    model: false
  },
  { text: 'Марка', value: 'vehicleTypeDetails.vehicleMakeName', id: 13 },
  { text: 'Тех.регламент ТС', value: 'technicalRegulations', id: 14 }
]
let tableDataFromResponse = ref({})
const fields = reactive({
  own: {
    width: 'all',
    label: 'Только свои',
    value: false,
    type: 'base-check-box'
  },
  docId: {
    width: '6',
    label: 'Номер документа',
    value: '',
    type: 'base-text-field'
  },
  startDateTime: {
    width: '3',
    label: 'Срок действия с',
    value: '',
    type: 'base-date-field'
  },
  endDateTime: {
    width: '3',
    label: 'Срок действия по',
    value: '',
    type: 'base-date-field'
  },
  docStatus: {
    width: '6',
    label: 'Статус',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'value'
  },
  countryCode: {
    width: '6',
    label: 'Страна выдачи документа',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/countries',
    text: 'value'
  },
  makeName: {
    width: '6',
    label: 'Марка',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-makes'
  },
  lastModifiedWith: {
    width: '3',
    label: 'Дата изменения с',
    value: '',
    type: 'base-date-field'
  },
  lastModifiedBy: {
    width: '3',
    label: 'Дата изменения по',
    value: '',
    type: 'base-date-field'
  },
  commercialName: {
    width: 'all',
    label: 'Коммерческое наименование',
    value: '',
    type: 'base-text-field'
  },
  fullName: {
    width: 'all',
    value: '',
    type: 'base-slot',
    dataSlot: {
      signerSurname: {
        label: 'Документ подписан',
        value: '',
        type: 'base-text-field',
        placeholder: 'Фамилия',
        width: '4'
      },
      singerName: { value: '', type: 'base-text-field', placeholder: 'Имя', width: '4' },
      singerPatronimic: {
        value: '',
        type: 'base-text-field',
        placeholder: 'Отчество',
        width: '4'
      }
    }
  }
})
const fieldsMore = reactive({
  manufacturer: {
    width: '6',
    label: 'Изготовитель',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  declarer: {
    width: '6',
    label: 'Заявитель',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  }
})
const actions = [
  {
    text: 'Создать документ',
    icon: 'mdi-file-plus-outline',
    enabled: { permission: 'Создать декларацию соответствия' }
  },
  {
    text: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: 'Редактировать декларацию соответствия'
    }
  },
  {
    text: 'Внесение изменений НО в декларацию в статусе "Действующий"',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: 'Утвердить декларацию соответствия'
    }
  },
  {
    text: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: 'true',
      permission: 'Просмотреть декларацию соответствия'
    }
  },
  {
    text: 'Копировать',
    icon: 'mdi-content-copy',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: 'Копировать декларацию соответствия'
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
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Возобновить',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Выгрузка',
    icon: 'mdi-xml',
    enabled: false
    /*  this.hasSelected && this.permissions.includes('Выгрузка декларации соответствия') */
  },
  {
    text: 'Пересмотреть',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Корректировать',
    enabled: false,
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
      permission: 'Удалить декларацию соответствия'
    }
  }
]

provide('tableDataFromResponse', tableDataFromResponse)
provide('additionalTableHeaders', additionalTableHeaders)
provide('tableHeaders', tableHeaders)
provide('actions', actions)
provide('pathToStatus', 'docStatus') // путь для статуса, используется в table и в action

async function find(obj) {
  const body = {
    isOwn: fields.own.value,
    isRegexSearch: true,
    query: {
      ['docId']: fields.docId.value,
      ['docStartDate']: fields.startDateTime.value + 'to',
      ['docValidityDate']: 'to' + fields.endDateTime.value,
      ['docStatus']: fields.docStatus.value,
      ['cert.signer.surname']: fields.fullName.dataSlot.signerSurname.value,
      ['cert.signer.name']: (
        fields.fullName.dataSlot.singerName.value ||
        '' + ' ' + fields.fullName.dataSlot.singerPatronimic.value ||
        ''
      ).trim(),
      ['tcInfo.lastModified']:
        fields.lastModifiedWith.value + 'to' + fields.lastModifiedBy.value,
      ['unifiedCountryCode.value']: fields.countryCode.value,
      /* ['conformityAuthorityInformationDetails.authority']: this.search.certificationAgency, */
      ['vehicleTypeDetails.vehicleMakeName']: fields.makeName.value,
      ['vehicleTypeDetails.vehicleCommercialName']: fields.commercialName.value,
      ['vehicleManufacturerDetails.businessEntityName']: fieldsMore.manufacturer.value,
      ['applicantDetails.businessEntityName']: fieldsMore.declarer.value
    },
    fields: [
      'docId',
      'tcInfo.lastModified',
      'vehicleManufacturerDetails.businessEntityName',
      'applicantDetails.businessEntityName',
      `docStatus`,
      'unifiedCountryCode.value',
      'conformityDocKindName',
      'vehicleTypeDetails.vehicleCommercialName',
      'vehicleTypeDetails.vehicleTypeId',
      'vehicleVariantDetails.vehicleTypeVariantId',
      'vehicleVariantDetails.codTNVED',
      'docStartDate',
      'docValidityDate',
      /* 'conformityAuthorityInformationDetails.authority', */
      'vehicleTypeDetails.vehicleMakeName',
      'vehicleDetails.vehicleIdInfoDetails.vehicleFactoryNumberId',
      'unifiedCommodityMeasure.release',
      'cert.signer.surname',
      'cert.signer.name',
      'technicalRegulations'
    ],
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post(
    'http://localhost:8080/api/powered-machines/declaration/modification/search',
    body
  )
  tableDataFromResponse.value = res
}

async function getAutocompliteData(obj = {}) {
  for (const key in obj) {
    if (obj[key].url) {
      try {
        const data = await requests.get('http://localhost:8080' + obj[key].url)
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
