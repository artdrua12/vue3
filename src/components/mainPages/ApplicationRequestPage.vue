<template>
  <layout-pages
    v-model:fields="fields"
    v-mode:fields-more="fieldsMore"
    title="Реестр заявлений по получению сведений"
    @find="find"
  ></layout-pages>
</template>

<script setup>
import { provide, reactive, ref, computed } from 'vue'
import LayoutPages from '../layout/LayoutPages.vue'
import { useRequestStore } from '@/stores/requestStore'

const requests = useRequestStore() // для работы с запросами
const tableHeaders = [
  { text: 'Номер заявления', value: 'statementNumber', id: 'h1' },
  { text: 'Статус', value: 'status', id: 'h2' },
  {
    text: 'Номер электронного паспорта',
    value: 'epassportNumb',
    id: 'h3'
  },
  {
    text: 'Идентификационный номер ТС',
    value: 'bodyId',
    id: 'h4'
  }
]
const additionalTableHeaders = [
  {
    text: 'Дата создания',
    value: 'createDate',
    model: false,
    id: 1
  }
]
let tableDataFromResponse = ref({})

const fields = reactive({
  toIndentTopPage: {
    width: 'all',
    value: false,
    type: 'base-slot',
    dataSlot: {}
  },
  number: {
    width: '6',
    label: 'Номер заявления',
    value: '',
    type: 'base-text-field'
  },
  organization: {
    width: '6',
    label: 'Организация',
    value: '',
    type: 'base-autocomplete',
    items: ['РУП "Белтаможсервис"'],
    text: 'value'
  },
  epassportNumb: {
    width: '6',
    label: 'Номер электронного паспорта',
    value: '',
    type: 'base-text-field',
    disabled: computed(() => Boolean(fields.bodyId.value))
  },
  docStatus: {
    width: '6',
    label: 'Статус',
    value: '',
    type: 'base-autocomplete',
    items: [
      {
        key: '90',
        value: 'В работе',
        title: '90 - В работе'
      },
      {
        key: '91',
        value: 'Исполнено',
        title: '91 - Исполнено'
      }
    ],
    text: 'value'
  },
  bodyId: {
    width: '6',
    label: 'Идентификационный номер ТС',
    value: '',
    type: 'base-text-field',
    disabled: computed(() => Boolean(fields.epassportNumb.value))
  }
})
const fieldsMore = reactive({})
const actions = [
  {
    text: 'Подать заявление',
    icon: 'mdi-file-plus-outline',
    enabled: {
      permission: ['Доступ к веб-сервису интеграции АИС']
    }
  },
  {
    text: 'Просмотреть заявление',
    icon: 'mdi-file-eye-outline',
    enabled: { notEmpty: 'true' }
  }
]

provide('tableDataFromResponse', tableDataFromResponse)
provide('additionalTableHeaders', additionalTableHeaders)
provide('tableHeaders', tableHeaders)
provide('actions', actions)
provide('pathToStatus', 'docStatus') // путь для статуса, используется в table и в action

async function find(obj) {
  const body = {
    isRegexSearch: true,
    query: {
      ['statementNumber']: fields.number.value,
      ['dataToProcess']: fields.epassportNumb.value
        ? fields.epassportNumb.value
        : fields.bodyId.value
          ? fields.bodyId.value
          : null,
      ['isVin']: fields.epassportNumb.value ? false : fields.bodyId.value ? true : null,
      ['cert.signer.organization']: fields.organization.value,
      ['status']: fields.docStatus.value
    },
    fields: ['statementNumber', 'status', 'createDate', 'dataToProcess'],
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post('/api/postgres-web-services/modification/search', body)
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
