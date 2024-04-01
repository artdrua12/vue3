<template>
  <layout-pages
    v-model:fields="fields"
    v-mode:fields-more="fieldsMore"
    title="Реестр электронных паспортов "
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
    text: 'Номер бумажного паспорта базового ТС (шасси)',
    value: 'vehicleVariantDetails.baseVehicleDetails.docId',
    id: 'h10'
  },
  {
    text: 'Номер электронного паспорта базового ТС (шасси)',
    value: 'vehicleVariantDetails.baseVehicleDetails.vehicleEPassportId',
    id: 'h11'
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
    value: 'vehicleDetails.vehicleCategoryCode',
    id: 5,
    model: false
  },
  {
    text: 'Категория в соответствии с ТР ТС',
    value: 'vehicleTypeDetails.vehicleTechCategoryCode',
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
    text: 'Номер шасси (рамы)',
    value: 'vehicleDetails.vehicleIdInfoDetails.vehicleFrameIdDetails.vehicleIdentityNumberId',
    id: 8,
    model: false
  },
  {
    text: 'Номер кузова (кабины, прицепа)',
    value: 'vehicleDetails.vehicleIdInfoDetails.vehicleBodyIdDetails.vehicleIdentityNumberId',
    id: 9,
    model: false
  },
  {
    text: 'Цвет кузова (кабины, прицепа)',
    value: 'vehicleDetails.vehicleBodyColourCode',
    id: 10,
    model: false
  },
  { text: 'Год изготовления', value: 'vehicleDetails.manufactureYear', id: 11, model: false },
  {
    text: 'Марка двигателя',
    value: 'vehicleVariantDetails.engineDetails[0].vehicleComponentMakeName',
    id: 12,
    model: false
  },
  { text: 'Тип двигателя', value: 'vehicleVariantDetails.engineType', id: 13, model: false },
  {
    text: 'Рабочий объем цилиндров',
    value: 'vehicleVariantDetails.engineDetails[0].engineCapacityMeasure.value',
    id: 14,
    model: false
  },
  {
    text: 'Максимальная мощность',
    value:
      'vehicleVariantDetails.engineDetails[0].engineMaxPowerDetails.engineMaxPowerMeasure.value',
    id: 15,
    model: false
  },
  {
    text: 'Экологический класс',
    value: 'vehicleVariantDetails.vehicleEcoClassCode',
    id: 16,
    model: false
  },
  {
    text: 'Технически допустимая максимальная масса (кг)',
    value:
      'vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleDetails[0].vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value',
    id: 17,
    model: false
  },
  {
    text: 'Юр.лицо/физ.лицо',
    value: 'legalPersonTypeForTable',
    id: 18,
    model: false
  },
  {
    text: 'Номер ЭП, на основе которого создан шаблон',
    value: 'originalVehicleEPassportId',
    id: 19,
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
    dataSlot: {
      own: {
        width: 3,
        label: 'Только свои',
        value: false,
        type: 'base-check-box'
      },
      copy: {
        width: 3,
        label: 'Шаблоны',
        value: false,
        type: `${
          ['НО АДМ', 'ОАО ЦНИИТУ', 'Национальный оператор «ОАО ЦНИИТУ»'].includes(
            currentUser.getUser.value?.companyName
          )
            ? ''
            : 'base-check-box'
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
    filter: `filter(i => ['1', '2'].includes(i.key))`
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
  createWith: {
    width: '3',
    label: 'Период изготовления с',
    value: '',
    type: 'base-date-field'
  },
  createBy: {
    width: '3',
    label: 'Период изготовления по',
    value: '',
    type: 'base-date-field'
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
    dataSlot: {
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
  frameId: {
    width: '6',
    label: 'Номер шасси (рамы)',
    value: '',
    type: 'base-text-field'
  },
  bodyId: {
    width: '6',
    label: 'Номер кузова (кабины, прицепа)',
    value: '',
    type: 'base-text-field'
  },
  commercialName: {
    width: '6',
    label: 'Коммерческое наименование',
    value: '',
    type: 'base-text-field'
  },
  infoId: {
    width: 'all',
    label: 'Сведения об идентификационном номере устройства вызова экстренных оперативных служб',
    value: '',
    type: 'base-text-field'
  },
  componentName: {
    width: '6',
    label: 'Марка двигателя',
    value: '',
    type: 'base-text-field'
  },
  techCategoryCode: {
    width: '6',
    label: 'Категория в соответствии с ТР ТС',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/vehicle-tech-categories',
    text: 'key',
    itemValue: 'key',
    filter: `filter(e => e.key.match(/L|M|N|O/))`
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
  startDate: {
    width: '3',
    label: 'Период создания ЭП с',
    value: '',
    type: 'base-date-field'
  },
  validityDate: {
    width: '3',
    label: 'Период создания ЭП по',
    value: '',
    type: 'base-date-field'
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
    label: 'Вид документа о соответствии',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/conformity-doc-kinds',
    text: 'value'
  },
  docId: {
    width: '6',
    label: 'Номер документа  о соответствии',
    value: '',
    type: 'base-text-field'
  },
  basisRegistration: {
    width: '6',
    label: 'Основание оформления ЭПТС',
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
    text: 'Оформить электронный паспорт',
    enabled: true,
    children: [
      {
        text: 'ЭПТС',
        icon: 'mdi-file-plus-outline',
        enabled: {
          permission: ['Оформить паспорт']
        }
      },
      {
        text: 'Ввод ЭПТС из АИС СЭП ЕАЭС',
        icon: 'mdi-file-plus-outline',
        enabled: true
        // enabled: this.permissions.includes('Ввод ЭПТС из АИС СЭП ЕАЭС'),
      },
      {
        text: 'ЭПШТС',
        icon: 'mdi-file-plus-outline',
        enabled: {
          permission: ['Оформить паспорт']
        }
      },
      {
        text: 'Ввод ЭПШТС из АИС СЭП ЕАЭС',
        icon: 'mdi-file-plus-outline',
        enabled: true
        // enabled: this.permissions.includes('Ввод ЭПШТС из АИС СЭП ЕАЭС'),
      },
      {
        text: 'ЭПТС на основе ЭПШТС',
        icon: 'mdi-file-plus-outline',
        enabled: {
          permission: ['Оформить паспорт']
        }
      }
    ]
  },
  {
    text: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Редактировать паспорт ТС']
    }
  },
  {
    text: 'Внесение изменений НО в ЭПТС в статусе «Действующий»',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Утвердить паспорт']
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
    text: 'Внесение изменений НО в ЭПТС в статусе "Аннулированный"',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Аннулированный'],
      permission: [
        'Изменение статуса ЭПТС на «Действующий» по устранению причин, послуживших основанием для присвоения электронному паспорту статуса «Аннулированный»'
      ]
    }
  },
  {
    text: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: true,
      permission: ['Просмотреть паспорт ТС']
    }
  },
  {
    text: 'Создать шаблон',
    icon: 'mdi-content-copy',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      notEqual: { legalPersonType: ['10'], externalSystemLoadCode: ['9', '10', '11'] }
    }
    // enabled:
    //   this.hasSelected &&
    //   this.selected[0].documentStatus === 'Действующий' &&
    //   this.selected[0].legalPersonType !== '10' &&
    //   !['9', '10', '11'].includes(this.selected[0].externalSystemLoadCode)
  },
  {
    text: 'Удалить',
    icon: 'mdi-delete-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Удалить паспорт ТС']
    }
  },
  {
    text: 'Создать заявление',
    enabled: true,
    children: [
      {
        text: 'Заявление на внесение изменений в электронный паспорт (Корректировка технических ошибок)',
        icon: 'mdi-file-plus-outline',
        enabled: {
          notEmptyAndStatus: ['Действующий', 'Незавершенный'],
          permission: ['Удалить паспорт ТС']
        }
      },
      {
        text: 'Заявление на исполнение гарантийных обязательств',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение сведений собственника ТС',
        icon: 'mdi-file-plus-outline',
        enabled: {
          notEmptyAndStatus: ['Действующий']
        }
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
        text: 'Заявление на изменение сведений о базовом ТС',
        icon: 'mdi-file-plus-outline',
        enabled: {
          notEmptyAndStatus: ['Действующий', 'Незавершенный', 'Аннулированный'],
          notEqual: { vehicleEPassportKindCode: ['2'], vehicleEPassportBaseCode: ['03'] }
        }
        // enabled:
        //   this.hasSelected === 1 &&
        //   ['Действующий', 'Незавершенный', 'Аннулированный'].includes(
        //     this.selected[0].documentStatus
        //   ) &&
        //   this.selected[0].vehicleEPassportKindCode !== '2' &&
        //   this.selected[0].vehicleEPassportBaseCode !== '03'
      },
      {
        text: 'Заявление на присвоение электронному паспорту статуса «Аннулированный» на основании сведений от организации – изготовителя, уполномоченного органа (организации)',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmptyAndStatus: ['Действующий'] }
      },
      {
        text: 'Заявление на получение регистрационных знаков ТРАНЗИТ',
        icon: 'mdi-file-plus-outline',
        enabled: false
      },
      {
        text: 'Заявление на внесение сведений об утилизации ТС',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmptyAndStatus: ['Действующий'] }
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений об отзыве утилизации',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmptyAndStatus: ['Утилизированный'] }
      },
      {
        text: 'Заявление на присвоение статуса ЭП «Аннулированный» на основании сведений от организаций, исключая изготовителя',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmptyAndStatus: ['Действующий'] }
      },
      {
        icon: 'mdi-file-plus-outline',
        text: 'Заявление на внесение сведений об осуществленных регистрационных действиях',
        enabled: { notEmptyAndStatus: ['Действующий'] }
      },
      {
        text: 'Заявление на создание электронного паспорта транспортного средства',
        icon: 'mdi-file-plus-outline',
        enabled: true
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
        enabled: { notEmptyAndStatus: ['Действующий'] }
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
      },
      {
        text: 'Заявление на отмену основания, послужившего причиной присвоения ЭП статуса Аннулированный',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmptyAndStatus: ['Аннулированный'] }
      },
      {
        text: 'Заявление на изменение статуса электронного паспорта на «Погашенный»',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmptyAndStatus: ['Действующий'] }
      },
      {
        key: '38',
        text: 'Заявление на изменение статуса электронного паспорта с «Погашенный» на иной',
        icon: 'mdi-file-plus-outline',
        enabled: { notEmptyAndStatus: ['Погашенный'] }
      }
    ]
  },
  {
    text: 'Загрузить сведения о ТС (шасси)',
    enabled: false,
    icon: 'mdi-file-upload-outline'
  },
  {
    text: 'Выписка',
    enabled: { notEmpty: true },
    icon: 'mdi-file-pdf-outline'
  },
  {
    text: 'Выгрузка',
    icon: 'mdi-xml',
    enabled: {
      notEmpty: true,
      permission: ['Осуществить выгрузку паспорта']
    }
  },
  {
    key: '6',
    text: 'Внести сведения в электронный паспорт',
    enabled: true,
    children: [
      {
        text: 'Внести сведения в электронный паспорт об утилизационном сборе и сведения о выпуске',
        icon: 'mdi-file-document-edit-outline',
        enabled: {
          notEmptyAndStatus: ['Незавершенный'],
          permission: [
            'Внести сведения об утилизационном сборе',
            'Внести сведения о таможенных операциях'
          ]
        }
        // enabled:
        //   this.hasSelected &&
        //   this.permissions.includes('Внести сведения об утилизационном сборе') &&
        //   this.permissions.includes('Внести сведения о таможенных операциях') &&
        //   this.selected[0].documentStatus === 'Незавершенный'
      },
      {
        text: 'Информация об ограничениях',
        icon: 'mdi-file-document-edit-outline',
        enabled: false
        /*    this.hasSelected &&
                    this.permissions.includes('Заявление на внесение сведений собственника ТС') &&
                    this.selected[0].documentStatus === 'Действующий' */
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
    isOwn: fields.checkboxes.dataSlot.own.value,
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
      ['cert.signer.surname']: fields.fullName.dataSlot.signerSurname.value,
      ['cert.signer.name']: (
        fields.fullName.dataSlot.singerName.value ||
        '' + ' ' + fields.fullName.dataSlot.singerPatronimic.value ||
        ''
      ).trim(),
      ['vehicleDetails.vehicleIdInfoDetails.vehicleEngineIdDetails.vehicleIdentityNumberId']:
        fieldsMore.engineId.value,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleFrameIdDetails.vehicleIdentityNumberId']:
        fieldsMore.frameId.value,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleBodyIdDetails.vehicleIdentityNumberId']:
        fieldsMore.bodyId.value,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleEmergencyCallDeviceIdDetails.vehicleIdentityNumberId']:
        fieldsMore.infoId.value,
      ['vehicleTypeDetails.vehicleCommercialName']: fieldsMore.commercialName.value,
      ['vehicleVariantDetails.engineDetails.vehicleComponentMakeName']:
        fieldsMore.componentName.value,
      ['vehicleTypeDetails.vehicleTechCategoryCode']: fieldsMore.techCategoryCode.value,
      ['vehicleCountryCode']: fieldsMore.countryCode.value,
      ['documentDetails.docKindName']: fieldsMore.docKindCode.value,
      ['documentDetails.docId']: fieldsMore.docId.value,
      ['vehicleManufacturerDetails.businessEntityName']: fieldsMore.manufacturer.value,
      ['eDocDateTime']: fieldsMore.startDate.value + 'to' + fieldsMore.validityDate.value,
      ['vehicleDetails.manufactureYear']: fields.createWith.value + 'to' + fields.createBy.value,
      ['cert.signer.organization']: fieldsMore.authorityName.value,
      ['externalSystemLoadCode']: fields.checkboxes.dataSlot.copy.value ? '6' : '',
      ['vehicleEPassportBaseCode']: fieldsMore.basisRegistration.value
    },
    fields: [
      'tcInfo',
      'epassportBtoIndicator',
      'vehicleEPassportKindCode',
      'vehicleDetails.vehicleCharacteristicsName',
      'vehicleVariantDetails.engineType',
      'extSysLoading',
      'vehicleEPassportId',
      'documentDetails.docId',
      'vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleIdentityNumberId',
      'documentStatus',
      'vehicleTypeDetails.vehicleMakeName',
      'vehicleTypeDetails.vehicleCommercialName',
      'vehicleDetails.recyclingDutyPaidDetails.recyclingDutyNotPayIndicator',
      'vehicleDetails.recyclingDutyPaidDetails.recyclingDutyPaydIndicator',
      'docCreationDate',
      'vehicleDetails.vehicleCategoryCode',
      'vehicleTypeDetails.vehicleTechCategoryCode',
      'vehicleDetails.vehicleIdInfoDetails.vehicleEngineIdDetails.vehicleIdentityNumberId',
      'vehicleDetails.vehicleIdInfoDetails.vehicleFrameIdDetails.vehicleIdentityNumberId',
      'vehicleDetails.vehicleIdInfoDetails.vehicleBodyIdDetails.vehicleIdentityNumberId',
      'vehicleDetails.vehicleBodyColourCode',
      'vehicleDetails.manufactureYear',
      'vehicleVariantDetails.engineDetails.vehicleComponentMakeName',
      'vehicleVariantDetails.engineDetails.engineCapacityMeasure.value',
      'vehicleVariantDetails.engineDetails.engineMaxPowerDetails.engineMaxPowerMeasure.value',
      'vehicleVariantDetails.vehicleEcoClassCode',
      'vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleDetails.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value',
      'vehicleManufacturerDetails.businessEntityName',
      'cert.signer.surname',
      'cert.signer.name',
      'vehicleEPassportBaseCode',
      'vehicleVariantDetails.baseVehicleDetails.docId',
      'vehicleVariantDetails.baseVehicleDetails.vehicleEPassportId',
      'vehicleVariantDetails.baseVehicleDetails.documentStatus',
      'externalSystemLoadCode',
      'legalPersonType',
      'originalVehicleEPassportId',
      'vehicleManufacturerDetails.vehicleManufacturerKindCode',
      'vehicleManufacturerDetails.businessEntityName'
    ],
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post('/api/powered-machines/certificate/modification/search', body)
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
