<template>
  <layout-pages :fields="fields" :fields-more="fieldsMore" @find="find"></layout-pages>
</template>

<script setup>
import { reactive, provide, ref } from 'vue'
import LayoutPages from '../layout/LayoutPages.vue'
import { useRequestStore } from '@/stores/requestStore'

const requests = useRequestStore() // для работы с запросами
// const selected = ref([])
const tableHeader = [
  { text: 'Номер  документа', value: 'docId' },
  { text: 'Тип  документа', value: 'conformityDocKindName' },
  { text: 'Дата изменения', value: 'tcInfo.lastModified' },
  { text: 'Изготовитель', value: 'manufacturerBusinessEntityName' },
  { text: 'Заявитель', value: 'applicantDetails.businessEntityName' },
  { text: 'Статус', value: `conformityDocStatusDetails.docStatus` },
  { text: 'Документ подписан', value: 'cert.signer.fullName' }
]
const tableData = ref([])
provide('tableData', tableData)
provide('tableHeader', tableHeader)
const tableSettingData = [
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
provide('tableSettingData', tableSettingData)

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
      ['conformityDocKindName']: fieldsMore.docType.value
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
      'cert.signer.surname',
      'cert.signer.name'
    ],
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post(
    'http://localhost:8080/api/otts/docDetails/modification/search',
    body
  )
  tableData.value = res.result
  console.log('tableData.value', tableData.value)
}

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
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-makes'
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
    type: 'base-autocomplete',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  assemblyPlant: {
    width: '6',
    label: 'Сборочный завод',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  certificationAgency: {
    width: '6',
    label: 'Орган по сертификации',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/certification-body/search/certificateAccreditations',
    text: 'certificationBodyNameBrief',
    itemValue: 'certificationBodyNameBrief'
  },
  docType: {
    width: '6',
    label: 'Тип документа',
    value: '',
    type: 'base-autocomplete',
    items: [],
    //conformityDocKind отправляем в экшены
    url: '/api/classifier/epassport/conformity-doc-kinds',
    filter: "filter(e =>['30', '35'].includes(e.key))",
    text: 'value'
  },
  countryCode: {
    width: '6',
    label: 'Страна выдачи документа',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/countries',
    text: 'value',
    itemValue: 'key'
  },
  techCategory: {
    width: '6',
    label: 'Категория ТС',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-tech-categories',
    filter: 'filter(e => e.key.match(/L|M|N|O/))',
    text: 'key',
    itemValue: 'key'
  }
})

async function getAutocompliteData(obj = {}) {
  for (const key in obj) {
    if (obj[key].url) {
      try {
        obj[key].items = await requests.get('http://localhost:8080' + obj[key].url)
        // console.log('ДЛЯ ' + obj[key]?.label, obj[key].items)
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
