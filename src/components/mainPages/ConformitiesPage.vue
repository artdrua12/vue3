<template>
  <layout-pages
    v-model:fields="fields"
    v-mode:fields-more="fieldsMore"
    title="Реестр ОТТС"
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
  { text: 'Тип  документа', value: 'conformityDocKindName', id: 'h2' },
  { text: 'Дата изменения', value: 'tcInfo.lastModified', id: 'h3' },
  { text: 'Изготовитель', value: 'vehicleManufacturerDetails[0].businessEntityName', id: 'h4' },
  { text: 'Заявитель', value: 'applicantDetails.businessEntityName', id: 'h5' },
  { text: 'Статус', value: `conformityDocStatusDetails.docStatus`, id: 'h6' },
  { text: 'Документ подписан', value: ['cert.signer.surname', 'cert.signer.name'], id: 'h7' }
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
    type: 'base-autocomplite',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'value'
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
  fullName: {
    width: 'all',
    value: '',
    type: 'base-slot',
    dataSlot: {
      signerSurname: {
        label: 'Документ подписан',
        width: '4',
        value: '',
        type: 'base-text-field',
        placeholder: 'Фамилия'
      },
      singerName: {
        width: '4',
        value: '',
        type: 'base-text-field',
        placeholder: 'Имя'
      },
      singerPatronimic: {
        width: '4',
        value: '',
        type: 'base-text-field',
        placeholder: 'Отчество'
      }
    }
  }
})
const fieldsMore = reactive({
  vehicleMakeName: {
    width: '6',
    label: 'Марка',
    value: '',
    type: 'base-autocomplite',
    items: [],
    url: '/api/classifier/epassport/vehicle-makes',
    text: 'value',
    itemValue: 'value'
  },
  commercialName: {
    width: '6',
    label: 'Коммерческое наименование',
    value: '',
    type: 'base-text-field'
  },
  manufacturer: {
    width: '6',
    label: 'Изготовитель',
    value: '',
    type: 'base-autocomplite',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  assemblyPlant: {
    width: '6',
    label: 'Сборочный завод',
    value: '',
    type: 'base-autocomplite',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  certificationAgency: {
    width: '6',
    label: 'Орган по сертификации',
    value: '',
    type: 'base-autocomplite',
    items: [],
    url: '/api/classifier/epassport/certification-body/search/certificateAccreditations',
    text: 'certificationBodyNameBrief',
    itemValue: 'certificationBodyNameBrief'
  },
  docType: {
    width: '6',
    label: 'Тип документа',
    value: '',
    type: 'base-autocomplite',
    items: [],
    //conformityDocKind отправляем в экшены
    url: '/api/classifier/epassport/conformity-doc-kinds',
    filter: "filter(e =>['30', '35'].includes(e.key))",
    text: 'value',
    itemValue: 'value'
  },
  countryCode: {
    width: '6',
    label: 'Страна выдачи документа',
    value: '',
    type: 'base-autocomplite',
    items: [],
    url: '/api/classifier/epassport/countries',
    text: 'value',
    itemValue: 'key'
  },
  techCategory: {
    width: '6',
    label: 'Категория ТС',
    value: '',
    type: 'base-autocomplite',
    items: [],
    url: '/api/classifier/epassport/vehicle-tech-categories',
    filter: 'filter(e => e.key.match(/L|M|N|O/))',
    text: 'key',
    itemValue: 'key'
  }
})
const actions = [
  {
    text: 'Создать документ',
    enabled: true,
    children: [
      {
        text: 'ОТТС',
        icon: 'mdi-file-plus-outline',
        enabled: { permission: ['Создать документ ОТТС (ОТШ)'] },
        action: () => route.push('/conformities/forms')
      },
      {
        text: 'ОТШ',
        icon: 'mdi-file-plus-outline',
        enabled: { permission: ['Создать документ ОТТС (ОТШ)'] },
        action: () => route.push('/layoutPanel')
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
    }
  },
  // решение до реализации заявлений!!
  {
    text: 'Внесение изменений НО в ОТТС в статусе «Действующий»',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Утвердить документ ОТТС (ОТШ)']
    }
  },
  {
    text: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: 'true',
      permission: ['Просмотреть документ ОТТС (ОТШ)']
    }
  },
  {
    text: 'Копировать',
    icon: 'mdi-content-copy',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Копировать документ ОТТС (ОТШ)']
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
    }
  }
]
provide('tableDataFromResponse', tableDataFromResponse)
provide('additionalTableHeaders', additionalTableHeaders)
provide('tableHeaders', tableHeaders)
provide('actions', actions)
provide('pathToStatus', 'conformityDocStatusDetails.docStatus') // путь для статуса, используется в table и в action

async function find(obj) {
  const body = {
    isOwn: fields.own.value,
    isRegexSearch: true,
    query: {
      ['docId']: fields.docId.value,
      ['docStartDate']: fields.startDateTime.value + 'to',
      ['docValidityDate']: 'to' + fields.endDateTime.value,
      ['conformityDocStatusDetails.docStatus']: fields.docStatus.value,
      ['unifiedCountryCode.value']: fieldsMore.countryCode.value,
      ['vehicleManufacturerDetails.businessEntityName']: fieldsMore.manufacturer.value,
      ['cert.signer.surname']: fields.fullName.dataSlot.signerSurname.value,
      ['cert.signer.name']: fieldsMore.namePartonimic,
      ['tcInfo.lastModified']: fields.lastModifiedWith.value + 'to' + fields.lastModifiedBy.value,
      ['conformityAuthorityInformationDetails.businessEntityBriefName']:
        fieldsMore.certificationAgency.value,
      ['vehicleTypeDetails.vehicleMakeName']: fieldsMore.vehicleMakeName.value,
      ['vehicleTypeDetails.vehicleCommercialName']: fieldsMore.commercialName.value,
      ['vehicleTypeDetails.vehicleTechCategoryCode']: fieldsMore.techCategory.value,
      ['conformityDocKindName']: fieldsMore.docType.value,
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
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post('/api/otts/docDetails/modification/search', body)

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
