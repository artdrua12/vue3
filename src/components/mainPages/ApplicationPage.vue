<template>
  <layout-pages
    :fields="fields"
    :fields-more="fieldsMore"
    title="Реестр заявлений"
    @find="find"
  ></layout-pages>
</template>

<script setup>
import { provide, reactive, ref } from 'vue'
import LayoutPages from '../layout/LayoutPages.vue'
import { useRequestStore } from '@/stores/requestStore'

const requests = useRequestStore() // для работы с запросами
const tableHeaders = [
  {
    text: 'Номер заявления',
    value: 'number'
  },
  {
    text: 'Статус',
    value: 'status.name'
  },
  {
    text: 'Тип заявления',
    value: 'type.name'
  },
  {
    text: 'Дата создания',
    value: 'createDate'
  },
  {
    text: 'Дата последнего изменения',
    value: 'changeStatusLastDate'
  },
  {
    text: 'Номер электронного паспорта',
    value: 'epassportNumb'
  }
]
const additionalTableHeaders = [
  {
    text: 'ФИО заявителя',
    value: 'applicant',
    id: 1,
    model: false
  },
  {
    text: 'Наименование организации-заявителя',
    value: 'organization',
    id: 2,
    model: false
  },
  {
    text: 'Бизнес процесс',
    value: 'businessProcess',
    id: 3,
    model: false
  },
  {
    text: 'Версия бизнес процесса',
    value: 'businessProcessVersion',
    id: 4,
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
  type: {
    width: '3',
    label: 'Тип заявления',
    value: '',
    type: 'base-autocomplete',
    items: [],
    text: 'name',
    itemValue: 'type'
  },
  number: {
    width: '3',
    label: 'Номер заявления',
    value: '',
    type: 'base-text-field'
  },
  applicant: {
    width: '3',
    label: 'Заявитель',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'value'
  },
  epassportNumb: {
    width: '3',
    label: 'Номер электронного паспорта',
    value: '',
    type: 'base-text-field'
  },
  docStatus: {
    width: '3',
    label: 'Статус',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'name',
    itemValue: 'type'
  },
  organization: {
    width: '3',
    label: 'Организация заявителя',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'value'
  },
  vehicleId: {
    width: '6',
    label: 'Идентификационный номер ТС',
    value: '',
    type: 'base-text-field'
  }
})
const fieldsMore = reactive({
  engineId: {
    width: '3',
    label: 'Номер двигателя',
    value: '',
    type: 'base-text-field'
  },
  frameId: {
    width: '3',
    label: 'Номер шасси',
    value: '',
    type: 'base-text-field'
  },
  bodyId: {
    width: '6',
    label: 'Номер кузова(прицепа, рамы)',
    value: '',
    type: 'base-text-field'
  }
})
const actions = [
  {
    text: 'Просмотреть заявление',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: true
    },
    action: () =>
      this.$router.push({
        text: 'CREATE_PASSPORT',
        params: { epassportId: 'epassport' }
      })
  },
  {
    text: 'Просмотреть ЭП',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: true,
      notEqual: { epassportNumb: [null, undefined] }
    },
    // enabled: !(this.selected.length !== 1 || !this.selected[0].epassportNumb),
    action: async () => {
      await this.getEpassportId(this.selected[0].epassportNumb)
      this.$router.push(`/epassports/form/common/look/${this.ePassportRevs[0]?.id}`)
    }
  },
  {
    text: 'Подать заявление',
    enabled: true,
    children: [
      {
        text: 'Заявление на создание электронного паспорта транспортного средства',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () =>
          this.$router.push({
            text: 'CREATE_PASSPORT',
            params: { epassportId: 'epassport' }
          })
      },
      {
        text: 'Заявление на внесение изменений в электронный паспорт (Корректировка технических ошибок)',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений о проведении технического осмотра',
        icon: 'mdi-file-plus-outline',
        enabled: { permission: ['Оформить паспорт'] },
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на изменение сведений о базовом ТС',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на изменение статуса электронного паспорта на «Погашенный»',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },

      {
        text: 'Заявление на изменение статуса электронного паспорта с «Погашенный» на иной',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на внесение сведений собственника ТС',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на внесение сведений об утилизации ТС',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на внесение в электронный паспорт сведений об отзыве утилизации',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на присвоение электронному паспорту статуса «Аннулированный» на основании сведений от организации – изготовителя, уполномоченного органа (организации)',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на присвоение статуса ЭП «Аннулированный» на основании сведений от организаций, исключая изготовителя',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на внесение сведений об осуществленных регистрационных действиях',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на отмену основания, послужившего причиной присвоения ЭП статуса Аннулированный',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на изменение в конструкцию транспортного средства',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () => this.$router.push('/epassports')
      },
      {
        text: 'Заявление на получение сведений о проведении технического осмотра',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () =>
          this.$router.push({
            text: 'CREATE_RECEIVE_TECHNICAL_INSPECTION_INFO',
            params: { createApplication: true }
          })
      },
      {
        text: 'Запрос о наличии электронного паспорта транспортных средств (шасси транспортных средств) и электронного паспорта самоходной машины в СЭП',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () =>
          this.$router.push({
            text: 'CREATE_REQUEST_EPASSPORT_AVAILABILITY',
            params: { createApplication: true }
          })
      },
      {
        text: 'Запрос сведений из электронного паспорта транспортного средства (шасси транспортного средства) и электронного паспорта самоходной машины в составе сведений, утвержденных в Приложениях 1, 2 Решения Коллегии Евразийской экономической комиссии от 22.09.2015 №122',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () =>
          this.$router.push({
            text: 'CREATE_REQUEST_EPASSPORT_INFO_ANNEX_1_2',
            params: { createApplication: true }
          })
      },
      {
        text: 'Запрос сведений из электронного паспорта транспортного средства (шасси транспортного средства) и электронного паспорта самоходной машины в составе сведений пп.1-11 Приложений 3, 4, 5 к Решению Коллегии Евразийской экономической комиссии от 22.09.2015 №122',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () =>
          this.$router.push({
            text: 'CREATE_REQUEST_EPASSPORT_INFO_ANNEX_3_4_5',
            params: { createApplication: true }
          })
      },
      {
        text: 'Запрос сведений из электронного паспорта транспортного средства (шасси транспортного средства) и электронного паспорта самоходной машины в составе сведений, утвержденных Решением Коллегии Евразийской экономической комиссии от 22.09.2015 №122',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () =>
          this.$router.push({
            text: 'CREATE_REQUEST_EPASSPORT_INFO',
            params: { createApplication: true }
          })
      },
      {
        text: 'Запрос шаблона электронного паспорта',
        icon: 'mdi-file-plus-outline',
        enabled: true,
        action: () =>
          this.$router.push({
            text: 'CREATE_REQUEST_EPASSPORT_TEMPLATE',
            params: { createApplication: true }
          })
      }
    ]
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
      ['type']: fields.type.value,
      ['number']: fields.number.value,
      ['applicant']: fields.applicant.value,
      ['epassportNumb']: fields.epassportNumb.value,
      ['status']: fields.docStatus.value,
      ['organization']: fields.organization.value,
      ['vehicleId']: fields.vehicleId.value,
      ['engineId']: fieldsMore.engineId.value,
      ['bodyId']: fieldsMore.bodyId.value,
      ['frameId']: fieldsMore.frameId.value
    },
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post('/application/search', body)
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
