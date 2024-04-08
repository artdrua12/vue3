<template>
  <layout-pages
    v-model:fields="fields"
    v-mode:fields-more="fieldsMore"
    title="Реестр шаблонов"
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
    text: 'Наименование шаблона',
    value: 'patternName'
  },
  {
    text: 'Статус шаблона',
    value: 'documentStatus'
  },
  {
    text: 'Номер ОТТС(ОТШ)',
    value: 'documentDetails.docId'
  },
  {
    text: 'Дата создания',
    value: 'docCreationDate'
  },
  {
    text: 'Дата последнего изменения',
    value: 'tcInfo.lastModified'
  }
]
const additionalTableHeaders = [
  {
    text: 'id',
    value: 'id',
    id: 1,
    model: false
  },
  {
    text: 'Версия шаблона',
    value: 'templateVersion',
    id: 2,
    model: false
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
  name: {
    width: '6',
    label: 'Наименование шаблона',
    value: '',
    type: 'base-text-field'
  },
  eDocId: {
    width: '6',
    label: 'Номер ОТТС(ОТШ)',
    value: '',
    type: 'base-text-field'
  },
  epStatus: {
    width: '6',
    label: 'Статус шаблона',
    value: '',
    type: 'base-autocomplite',
    items: [],
    text: 'value'
  },
  templateVersion: {
    width: '3',
    label: 'Версия шаблона',
    value: '',
    type: 'base-autocomplite',
    items: [],
    text: 'value'
  },
  creationDate: {
    width: '3',
    label: 'Дата создания',
    value: '',
    type: 'base-date-field'
  }
})
const fieldsMore = reactive({})
const actions = [
  {
    text: 'Создать единичный шаблон',
    icon: 'mdi-file-plus-outline',
    enabled: {
      notEmpty: true,
      permission: ['Создать единичный шаблон']
    },
    action: () => {
      this.isOpenCreateSingleTemplateModal = true
    }
  },
  {
    text: 'Создать набор шаблонов',
    icon: 'mdi-file-plus-outline',
    enabled: { permission: ['Создать набор шаблонов'] },
    action: async () => {
      this.isOpenCreateGroupTemplateModal = true
    }
  },
  {
    text: 'Скопировать шаблон',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmptyAndStatus: ['Аннулирован', 'Заархивирован', 'Копия'],
      permission: ['Скопировать шаблон']
    },
    action: async () => {
      this.isShowCopyTemplate = true
    }
  },
  {
    text: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmpty: true,
      permission: ['Редактировать шаблон']
    },
    action: () => {
      this.$router.push({
        text: 'registry.templates.edit',
        params: {
          templateId: this.selected[0].id,
          documentId: this.selected[0].documentDetails.docId
        }
      })
    }
  },
  {
    text: 'Выгрузить XML',
    icon: 'mdi-xml',
    enabled: {
      notEmpty: true,
      permission: ['Выгрузить шаблон xml']
    },
    action: () => {
      this.createXml(this.selected.map((template) => template.id))
    }
  },
  {
    text: 'Удалить',
    icon: 'mdi-delete-outline',
    enabled: {
      notEmptyAndStatus: ['Заархивирован'],
      permission: ['Удалить шаблон']
    },
    action: async () => {
      this.isShowDeleteDialog = true
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
      ['patternName']: fields.name.value,
      ['documentStatus']: fields.epStatus.value,
      ['documentDetails.docId']: fields.eDocId.value,
      ['docCreationDate']: fields.creationDate.value,
      ['templateVersion']: fields.templateVersion.value
    },
    fields: [
      'id',
      'documentStatus',
      'docCreationDate',
      'eDocDateTime',
      'documentDetails',
      'patternName',
      'templateVersion',
      'tcInfo'
    ],
    pageAndSort: {
      page: obj.page,
      size: obj.size
    }
  }
  const res = await requests.post('/api/ep-templates/modification/search', body)
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
