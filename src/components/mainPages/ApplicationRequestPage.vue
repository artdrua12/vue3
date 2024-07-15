<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" open-panel="1">
      <template #title>Реестр заявлений по получению сведений</template>
      <v-form class="adaptiveGrid pa-5 mt-5">
        <base-textfield
          v-model="fields.number"
          label="Номер документа"
          class="span6"
        ></base-textfield>
        <base-autocomplete
          v-model="fields.organization"
          label="Организация"
          class="span6"
          :items="[{ value: `РУП 'Белтаможсервис'` }]"
        ></base-autocomplete>

        <base-textfield
          v-model="fields.epassportNumb"
          label="Номер электронного паспорта"
          class="span6"
          :disabled="Boolean(fields.bodyId)"
        ></base-textfield>
        <base-autocomplete
          v-model="fields.docStatus"
          label="Статус"
          class="span6"
          item-text="title"
          :items="[
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
          ]"
        ></base-autocomplete>

        <base-textfield
          v-model="fields.bodyId"
          label="Идентификационный номер ТС"
          class="span6"
          :disabled="Boolean(fields.epassportNumb)"
        ></base-textfield>
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
import BaseTable from '@/components/base/BaseTableSubGrid.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BasePanel from '@/components/base/BasePanel.vue'
import { useCheckAndLoadData } from './composable'

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
const pathToStatus = 'docStatus' // путь для статуса, используется в table и в action
let tableDataAndPagination = ref({}) // данные для таблицы + информция для пагинации
const additionalTableHeaders = [
  {
    text: 'Дата создания',
    value: 'createDate',
    model: false,
    id: 1
  }
]
const fields = reactive({
  number: '',
  organization: '',
  epassportNumb: '',
  docStatus: '',
  bodyId: ''
})
const defaultFields = JSON.parse(JSON.stringify(fields))
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
const tableRowSelect = ref({}) // выбранная строка из таблицы
let size = ref(5) //количество строк на одной странице
let page = ref(0) // текущая страница в пагинации

async function find() {
  const body = {
    isOwn: fields.own,
    isRegexSearch: true,
    query: {
      ['statementNumber']: fields.number,
      ['dataToProcess']: fields.epassportNumb
        ? fields.epassportNumb
        : fields.bodyId
          ? fields.bodyId
          : null,
      ['isVin']: fields.epassportNumb ? false : fields.bodyId ? true : null,
      ['cert.signer.organization']: fields.organization,
      ['status']: fields.docStatus
    },
    fields: ['statementNumber', 'status', 'createDate', 'dataToProcess'],
    pageAndSort: {
      page: page.value,
      size: size.value
    }
  }
  // проверка на заполенность хотя бы одного поля и загрузка данных
  tableDataAndPagination.value = await useCheckAndLoadData(
    fields,
    '/api/postgres-web-services/modification/search',
    body
  )
}
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
