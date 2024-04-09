<template>
  <layout-pages
    v-model:fields="fields"
    v-mode:fields-more="fieldsMore"
    title=" Реестр электронных паспортов СМ"
    @find="find"
  ></layout-pages>
</template>

<script setup>
import { provide, reactive, ref } from 'vue'
import LayoutPages from '../layout/LayoutPages.vue'
import { useRequestStore } from '@/stores/requestStore'
import { useUserStore } from '@/stores/userStore'
const currentUser = useUserStore()

const requests = useRequestStore() // для работы с запросами
const tableHeaders = [
  { text: 'Номер ЭП', value: 'vehicleEPassportId', id: 'h1' },
  {
    text: 'Номер документа, подтверждающего соответствие',
    value: 'documentDetails.docId',
    id: 'h2'
  },
  {
    text: 'Идентификационный номер',
    value: 'vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleIdentityNumberId',
    id: 'h3'
  },
  { text: 'Изготовитель', value: 'vehicleManufacturerDetails[0].businessEntityName', id: 'h4' },
  { text: 'Статус', value: 'documentStatus', id: 'h5' },
  { text: 'Марка', value: 'vehicleTypeDetails.vehicleMakeName', id: 'h6' },
  {
    text: 'Коммерческое наименование',
    value: 'vehicleTypeDetails.vehicleCommercialName',
    id: 'h7'
  },
  {
    text: 'Утилизационный сбор',
    // value: 'vehicleDetails.recyclingDutyPaidDetails[0].recyclingDutyNotPayIndicator',
    value: 'valueForTable',
    id: 'h8'
  },
  { text: 'Документ подписан', value: ['cert.signer.surname', 'cert.signer.name'], id: 'h9' },
  {
    text: 'Заводской номер',
    value: 'vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleFactoryNumberId',
    id: 'h10'
  },
  {
    text: 'Номер бумажного паспорта базового ТС (шасси)',
    value: 'vehicleVariantDetails.baseVehicleDetails.docId',
    id: 'h11'
  },
  {
    text: 'Номер электронного паспорта базового ТС (шасси)',
    value: 'vehicleVariantDetails.baseVehicleDetails.vehicleEPassportId',
    id: 'h12'
  }
]
const additionalTableHeaders = [
  { text: 'Вид ЭП', value: 'vehicleEPassportKindName', id: 1, model: false },
  { text: 'Дата перевода в статус', value: 'tcInfo.statusModified', id: 2, model: false },
  { text: 'Дата оформления', value: 'docCreationDate', id: 3, model: false },
  {
    text: 'Наименование, определяемое назначением',
    value: 'vehicleDetails.vehicleCharacteristicsName',
    id: 4,
    model: false
  },
  {
    text: 'Категория в соответствии с Конвенцией',
    value: 'vehicleDetails.machineCategoryCode',
    id: 5,
    model: false
  },
  {
    text: 'Категория в соответствии с ТР ТС',
    value: 'vehicleTypeDetails.machineTechCategoryCode',
    id: 6,
    model: false
  },
  {
    text: 'Номер двигателя',
    value: 'vehicleDetails.vehicleIdInfoDetails.vehicleEngineIdDetails[0].vehicleIdentityNumberId',
    id: 7,
    model: false
  },
  {
    text: 'Номер основного ведущего моста',
    value:
      'vehicleDetails.vehicleIdInfoDetails.mainPoweredAxleIdDetails[0].vehicleIdentityNumberId',
    id: 8,
    model: false
  },
  {
    text: 'Номер кузова (кабины, прицепа)',
    value: 'vehicleDetails.vehicleIdInfoDetails.machineBodyIdDetails.vehicleIdentityNumberId',
    id: 9,
    model: false
  },
  {
    text: 'Цвет кузова (кабины, прицепа)',
    value: 'vehicleDetails.vehicleBodyColourName',
    id: 10,
    model: false
  },
  { text: 'Год изготовления', value: 'vehicleDetails.manufactureYear', id: 11, model: false },
  {
    text: 'Тип движителя',
    value: 'vehicleTypeDetails.propulsionKindName',
    id: 12,
    model: false
  },
  {
    text: 'Максимальная скорость',
    value: 'vehicleVariantDetails.vehicleMaxSpeedMeasure[0].value',
    id: 13,
    model: false
  },
  {
    text: 'Технически допустимая максимальная масса (кг)',
    value:
      'vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleDetails[0].vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value',
    id: 14,
    model: false
  },
  {
    text: 'Юр.лицо/физ.лицо',
    value: 'legalPersonTypeForTable',
    id: 15,
    model: false
  },
  {
    text: 'Модификация',
    value: 'vehicleVariantDetails.vehicleTypeVariantId',
    id: 16,
    model: false
  },
  {
    text: 'Номер ЭП, на основе которого создан шаблон',
    value: 'originalVehicleEPassportId',
    id: 17,
    model: false
  },
  {
    text: 'Статус электронного паспорта базового ТС (шасси)',
    value: 'vehicleVariantDetails.baseVehicleDetails.documentStatus',
    id: 20,
    model: false
  },
  {
    text: 'Основание оформления ЭПТС',
    value: 'vehicleEPassportBaseCodeForTable',
    id: 21,
    model: false
  }
]
let tableDataFromResponse = ref({})

const fields = reactive({
  checkboxes: {
    width: 'all',
    value: false,
    type: 'base-slot',
    additionData: {
      own: {
        label: 'Только свои',
        value: false,
        type: 'base-check-box'
      },
      copy: {
        label: 'Шаблоны',
        value: false,
        type: `${
          ['НО АДМ', 'ОАО ЦНИИТУ', 'Национальный оператор «ОАО ЦНИИТУ»'].includes(
            currentUser.getUser.value?.companyName
          )
            ? ''
            : 'base-checkbox'
        }`
      }
    }
  },
  kindCode: {
    width: '6',
    label: 'Вид электронного паспорта',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-passport-kinds',
    text: 'value',
    itemValue: 'key',
    filter: `filter(i => ['3'].includes(i.key))`
  },
  docStatus: {
    width: '6',
    label: 'Статус',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/status-kinds',
    text: 'value'
  },
  passportId: {
    width: '6',
    label: 'Номер электронного паспорта',
    value: '',
    type: 'base-text-field'
  },
  vehicleFactoryNumberId: {
    width: '6',
    label: 'Заводской номер',
    value: '',
    type: 'base-text-field'
  },
  identityNumber: {
    width: '6',
    label: 'Идентификационный номер:',
    value: '',
    type: 'base-text-field'
  },
  vehicleName: {
    width: '6',
    label: 'Марка',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-makes',
    text: 'value'
  },
  statusModifiedWith: {
    width: '3',
    label: 'Дата перевода в статус с',
    value: '',
    type: 'base-date-field'
  },
  statusModifiedBy: {
    width: '3',
    label: 'Дата перевода в статус по',
    value: '',
    type: 'base-date-field'
  },
  docCreationDateWith: {
    width: '3',
    label: 'Дата оформления с',
    value: '',
    type: 'base-date-field'
  },
  docCreationDateBy: {
    width: '3',
    label: 'Дата оформления по',
    value: '',
    type: 'base-date-field'
  },
  fullName: {
    width: 'all',
    value: '',
    type: 'base-slot',
    additionData: {
      signerSurname: {
        width: '4',
        label: 'Документ подписан',
        value: '',
        type: 'base-text-field',
        placeholder: 'Фамилия'
      },
      singerName: { width: '4', value: '', type: 'base-text-field', placeholder: 'Имя' },
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
  engineId: {
    width: '6',
    label: 'Номер двигателя',
    value: '',
    type: 'base-text-field'
  },
  mainPoweredAxleId: {
    width: '6',
    label: 'Номер основного ведущего моста',
    value: '',
    type: 'base-text-field'
  },
  bodyId: {
    width: '6',
    label: 'Номер кузова (кабины, прицепа)',
    value: '',
    type: 'base-text-field'
  },
  mover: {
    width: '6',
    label: 'Тип движителя',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/propulsion-kinds',
    text: 'value'
  },
  infoId: {
    width: 'all',
    label: 'Сведения об идентификационном номере устройства вызова экстренных оперативных служб',
    value: '',
    type: 'base-text-field'
  },
  commercialName: {
    width: '6',
    label: 'Коммерческое наименование',
    value: '',
    type: 'base-text-field'
  },
  techCategoryCode: {
    width: '6',
    label: 'Категория ТС, СМ по ТР ТС 010/2011, ТР ТС 018/2011, ТР ТС 031/2012',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-tech-categories',
    text: 'title',
    itemValue: 'key'
  },
  manufacturer: {
    width: 'all',
    label: 'Изготовитель',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/manufacturer-registry/all',
    text: 'businessEntityName',
    itemValue: 'businessEntityName'
  },
  countryCode: {
    width: '6',
    label: 'Страна оформления паспорта',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/countries',
    text: 'value',
    itemValue: 'key'
  },
  authorityName: {
    width: '6',
    label: 'Орган (организация), оформивший ЭП',
    value: '',
    type: 'base-text-field'
  },
  docKindCode: {
    width: '6',
    label: 'Вид документа ',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/conformity-doc-kinds',
    text: 'value',
    itemValue: 'key'
  },
  docId: {
    width: '6',
    label: 'Номер документа ',
    value: '',
    type: 'base-text-field'
  },
  basisRegistration: {
    width: '6',
    label: 'Основание оформления ЭПСМ',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-passport-bases',
    text: 'value',
    itemValue: 'key'
  }
})

const actions = [
  {
    text: 'Оформить электронный паспорт СМ',
    icon: 'mdi-file-plus-outline',
    enabled: {
      permission: ['Оформить паспорт СМ']
    }
  },
  {
    text: 'Ввод ЭПСМ из АИС СЭП ЕАЭС',
    icon: 'mdi-file-plus-outline',
    enabled: true
    // enabled: this.permissions.includes('Ввод ЭПСМ из АИС СЭП ЕАЭС'),
  },
  {
    text: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Редактировать паспорт СМ']
    }
  },
  {
    text: 'Внесение изменений НО в ЭПСМ в статусе "Действующий"',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Утвердить паспорт СМ']
    }
  },
  {
    text: 'Внесение изменений НО в ЭПТС в статусе «На аннулировании»',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['На аннулировании'],
      permission: ['Аннулировать паспорт']
    }
  },
  {
    text: 'Внесение изменений НО в ЭПСМ в статусе "Аннулированный"',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Аннулированный'],
      permission: [
        'Изменение статуса ЭПСМ на «Действующий» по устранению причин, послуживших основанием для присвоения электронному паспорту статуса «Аннулированный»'
      ]
    }
  },
  {
    text: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: true,
      permission: ['Просмотреть паспорт СМ']
    }
  },
  {
    text: 'Создать шаблон',
    icon: 'mdi-content-copy',
    enabled: {
      notEmptyAndStatus: ['Действующий', 'Незавершенный'],
      notEqual: { legalPersonType: ['10'], externalSystemLoadCode: ['9', '10', '11', '12'] }
    }
  },
  {
    text: 'Удалить',
    icon: 'mdi-delete-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Удалить паспорт СМ']
    }
  },
  {
    text: 'Выписка',
    icon: 'mdi-file-pdf-outline',
    enabled: { notEmpty: true }
  },
  {
    text: 'Выгрузка',
    icon: 'mdi-xml',
    enabled: {
      notEmpty: true,
      permission: ['Осуществить выгрузку паспорта СМ']
    }
  },
  {
    text: 'Создать заявление',
    enabled: true,
    children: [
      {
        text: 'Заявление на внесение изменений в электронный паспорт (Корректировка технических ошибок)',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на исполнение гарантийных обязательств',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Новый собственник',
        enabled: false,
        icon: 'mdi-file-plus-outline'
      },
      {
        text: 'Смена собственника',
        enabled: false,
        icon: 'mdi-file-plus-outline'
      },
      { text: 'Залог', enabled: false, icon: 'mdi-file-plus-outline' },
      {
        text: 'Переуступка залога',
        enabled: false,
        icon: 'mdi-file-plus-outline'
      },
      { text: 'Снятие залога', enabled: false, icon: 'mdi-file-plus-outline' },
      { text: 'Лизинг', enabled: false, icon: 'mdi-file-plus-outline' },
      { text: 'Сублизинг', enabled: false, icon: 'mdi-file-plus-outline' },
      {
        text: 'Прекращение лизинга',
        enabled: false,
        icon: 'mdi-file-plus-outline'
      },
      {
        text: 'Заявление на изменение сведений о базовом ТС (шасси ТС)',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: `Заявление на присвоение электронному паспорту статуса «Аннулированный» на основании
                        сведений от организации – изготовителя, уполномоченного органа (организации)`,
        icon: 'mdi-file-plus-outline',
        enabled: { notEmpty: true }
      },
      {
        text: 'Заявление на получение регистрационных знаков ТРАНЗИТ',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение сведений об утилизации ТС (шасси ТС)',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений об отзыве утилизации',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: `Заявление на присвоение электронному паспорту статуса «Аннулированный» на основании
                    сведений от государственных и иных органов и организаций, исключая изготовителей»`,
        icon: 'mdi-file-plus-outline',
        enabled: { notEmpty: true }
      },
      {
        text: 'Заявление на внесение сведений об осуществленных регистрационных действиях',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на создание электронного паспорта',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmpty: true }
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений собственника',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений об ограничениях (обременениях)',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о снятии ограничений (обременений)',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о проведении технического обслуживания',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о проведении ремонтных работ',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о проведении технического осмотра',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о страховании',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о дорожно-транспортном происшествии',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о страховых случаях',
        icon: 'mdi-file-plus-outline',
        enabled: false
      }
    ]
  },
  {
    text: 'Внести сведения в электронный паспорт',
    enabled: true,
    children: [
      {
        text: 'Внести сведения в электронный паспорт об утилизационном сборе и сведения о выпуске',
        icon: 'mdi-file-document-edit-outline',
        enabled: {
          notEmptyAndStatus: ['Незавершенный'],
          permission: [
            'Внести сведения об утилизационном сборе СМ',
            'Внести сведения о таможенных операциях СМ'
          ]
        }
      },
      {
        text: 'Сведения об исполнении гарантийных обязательств',
        icon: 'mdi-file-document-edit-outline',
        enabled: {
          notEmptyAndStatus: ['Действующий', 'Незавершенный']
        }
      }
    ]
  }
]

provide('tableDataFromResponse', tableDataFromResponse)
provide('additionalTableHeaders', additionalTableHeaders)
provide('tableHeaders', tableHeaders)
provide('actions', actions)
provide('pathToStatus', 'documentStatus') // путь для статуса, используется в table и в action

async function find(obj) {
  const body = {
    isOwn: fields.checkboxes.additionData.own.value,
    isRegexSearch: true,
    query: {
      ['vehicleEPassportKindCode']: fields.kindCode.value,
      ['documentStatus']: fields.docStatus.value,
      ['vehicleEPassportId']: fields.passportId.value,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleIdentityNumberId']:
        fields.identityNumber.value,
      ['vehicleTypeDetails.vehicleMakeName']: fields.vehicleName.value,
      ['tcInfo.statusModified']:
        fields.statusModifiedWith.value + 'to' + fields.statusModifiedBy.value,
      ['docCreationDate']: fields.docCreationDateWith.value + 'to' + fields.docCreationDateBy.value,
      ['cert.signer.surname']: fields.fullName.additionData.signerSurname.value,
      ['cert.signer.name']: (
        fields.fullName.additionData.singerName.value ||
        '' + ' ' + fields.fullName.additionData.singerPatronimic.value ||
        ''
      ).trim(),
      ['vehicleDetails.vehicleIdInfoDetails.vehicleEngineIdDetails.vehicleIdentityNumberId']:
        fieldsMore.engineId.value,
      ['vehicleDetails.vehicleIdInfoDetails.mainPoweredAxleIdDetails.vehicleIdentityNumberId']:
        fieldsMore.mainPoweredAxleId.value,
      ['vehicleDetails.vehicleIdInfoDetails.machineBodyIdDetails.vehicleIdentityNumberId']:
        fieldsMore.bodyId.value,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleEmergencyCallDeviceIdDetails.vehicleIdentityNumberId']:
        fieldsMore.infoId.value,
      ['vehicleTypeDetails.vehicleCommercialName']: fieldsMore.commercialName.value,
      ['vehicleTypeDetails.machineTechCategoryCode']: fieldsMore.techCategoryCode.value,
      ['vehicleCountryCode']: fieldsMore.countryCode.value,
      ['documentDetails.docKindCode.value']: fieldsMore.docKindCode.value,
      ['documentDetails.docId']: fieldsMore.docId.value,
      ['vehicleTypeDetails.propulsionKindName']: fieldsMore.mover.value,
      ['vehicleManufacturerDetails.businessEntityName']: fieldsMore.manufacturer.value,
      ['cert.signer.organization']: fieldsMore.authorityName.value,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleFactoryNumberId']:
        fields.vehicleFactoryNumberId.value,
      ['externalSystemLoadCode']: fields.checkboxes.additionData.copy.value ? '6' : '',
      ['vehicleEPassportBaseCode']: fieldsMore.basisRegistration.value
    },
    fields: [
      'tcInfo',
      'vehicleEPassportKindCode',
      'vehicleDetails.vehicleCharacteristicsName',
      'vehicleVariantDetails.engineType',
      'extSysLoading',
      'vehicleTypeDetails.propulsionKindName',
      'vehicleVariantDetails.vehicleMaxSpeedMeasure.value',
      'vehicleEPassportId',
      'documentDetails.docId',
      'vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleIdentityNumberId',
      'documentStatus',
      'vehicleTypeDetails.vehicleMakeName',
      'vehicleTypeDetails.vehicleCommercialName',
      'vehicleDetails.recyclingDutyPaidDetails.recyclingDutyNotPayIndicator',
      'vehicleDetails.recyclingDutyPaidDetails.recyclingDutyPaydIndicator',
      'docCreationDate',
      'vehicleDetails.machineCategoryCode',
      'vehicleTypeDetails.machineTechCategoryCode',
      'vehicleDetails.vehicleIdInfoDetails.vehicleEngineIdDetails.vehicleIdentityNumberId',
      'vehicleDetails.vehicleIdInfoDetails.mainPoweredAxleIdDetails.vehicleIdentityNumberId',
      'vehicleDetails.vehicleIdInfoDetails.machineBodyIdDetails.vehicleIdentityNumberId',
      'vehicleDetails.vehicleBodyColourName',
      'vehicleDetails.manufactureYear',
      'vehicleVariantDetails.engineDetails.vehicleComponentMakeName',
      'vehicleVariantDetails.engineDetails.engineCapacityMeasure.value',
      'vehicleVariantDetails.engineDetails.engineMaxPowerDetails.engineMaxPowerMeasure.value',
      'vehicleVariantDetails.vehicleEcoClassCode',
      'vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleDetails.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value',
      'cert.signer.surname',
      'cert.signer.name',
      'vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleFactoryNumberId',
      'vehicleManufacturerDetails.businessEntityName',
      'vehicleVariantDetails.baseVehicleDetails.docId',
      'vehicleVariantDetails.baseVehicleDetails.vehicleEPassportId',
      'vehicleVariantDetails.baseVehicleDetails.documentStatus',
      'vehicleEPassportBaseCode',
      'externalSystemLoadCode',
      'legalPersonType',
      'vehicleVariantDetails.vehicleTypeVariantId',
      'originalVehicleEPassportId'
    ],
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post('/api/powered-machines/passport/modification/search', body)
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
