<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" open-panel="1">
      <template #title>Реестр заявлений</template>
      <v-form class="adaptiveGrid pa-5 mt-5">
        <base-textfield
          v-model="fields.name"
          label="Наименование шаблона"
          class="span6"
        ></base-textfield>
        <base-autocomplete
          v-model="fields.epStatus"
          label="Статус шаблона"
          class="span6"
          :items="[
            { value: 'Черновик' },
            { value: 'Аннулирован' },
            { value: 'Заархивирован' },
            { value: 'Копия' },
            { value: 'Действующий' }
          ]"
        ></base-autocomplete>

        <base-textfield
          v-model="fields.eDocId"
          label="Номер ОТТС(ОТШ)"
          class="full"
        ></base-textfield>

     
        <base-autocomplete
          v-model="fields.templateVersion"
          label="Версия шаблона"
          class="span6"
          :items="[{ value: 1 }, { value: 2 }, { value: 3 }]"
        ></base-autocomplete>
        <base-datefield
          v-model="fields.creationDate"
          label="Дата создания"
          class="span6"
        ></base-datefield>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseThreeview from '@/components/base/BaseThreeview.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseTable from '@/components/base/BaseTableSubGrid.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BasePanel from '@/components/base/BasePanel.vue'
import { useGetCatalog, useCheckAndLoadData } from './composable'

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
const pathToStatus = 'docStatus' // путь для статуса, используется в table и в action
let tableDataAndPagination = ref({}) // данные для таблицы + информция для пагинации
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
const fields = reactive({
  name: '',
  eDocId: '',
  epStatus: '',
  templateVersion: '',
  creationDate: ''
})
const defaultFields = JSON.parse(JSON.stringify(fields))
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
const tableRowSelect = ref({}) // выбранная строка из таблицы
let size = ref(5) //количество строк на одной странице
let page = ref(0) // текущая страница в пагинации
const NSI_100 = ref([])

async function find() {
  const body = {
    isRegexSearch: true,
    query: {
      ['patternName']: fields.name,
      ['documentStatus']: fields.epStatus,
      ['documentDetails.docId']: fields.eDocId,
      ['docCreationDate']: fields.creationDate,
      ['templateVersion']: fields.templateVersion
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
      page: page.value,
      size: size.value
    }
  }
  // проверка на заполенность хотя бы одного поля и загрузка данных
  tableDataAndPagination.value = await useCheckAndLoadData(
    fields,
    '/api/ep-templates/modification/search',
    body
  )
}
//справочники для автокомплита
async function load() {
  NSI_100.value = await useGetCatalog('NSI_100')
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
