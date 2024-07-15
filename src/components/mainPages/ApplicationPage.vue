<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" open-panel="1">
      <template #title>Реестр заявлений</template>
      <v-form class="adaptiveGrid pa-5">
        <base-checkbox :v-model="fields.own" label="Только свои" class="full"></base-checkbox>

        <base-autocomplete
          v-model="fields.type"
          label="Тип заявления"
          class="span3"
          :items="[]"
        ></base-autocomplete>
        <base-textfield
          v-model="fields.number"
          label="Номер заявления"
          class="span3"
        ></base-textfield>
        <base-autocomplete
          v-model="fields.type"
          label="Заявитель"
          class="span3"
          :items="[{ value: 'registrant1' }, { value: 'registrant2' }, { value: 'registrant3' }]"
        ></base-autocomplete>
        <base-textfield
          v-model="fields.epassportNumb"
          label="Номер электронного паспорта"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="fields.docStatus"
          label="Статус"
          class="span3"
          :items="NSI_100"
        ></base-autocomplete>
        <base-autocomplete
          v-model="fields.organization"
          label="Организация заявителя"
          class="span3"
          :items="[
            { value: 'organization1' },
            { value: 'organization2' },
            { value: 'organization3' }
          ]"
        ></base-autocomplete>
        <base-textfield
          v-model="fields.bodyId"
          label="Идентификационный номер ТС"
          class="span6"
        ></base-textfield>

        <base-panel class="full" elevation="3">
          <template #title>Дополнительные поля</template>
          <div class="adaptiveGrid pt-7 px-5">
            <base-textfield
              v-model="fields.engineId"
              label="Номер двигателя"
              class="span3"
            ></base-textfield>
            <base-textfield
              v-model="fields.frameId"
              label="Номер шасси"
              class="span3"
            ></base-textfield>
            <base-textfield
              v-model="fields.bodyId"
              label="Номер кузова(прицепа, рамы)"
              class="span6"
            ></base-textfield>
          </div>
        </base-panel>
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
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseTable from '@/components/base/BaseTableSubGrid.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BasePanel from '@/components/base/BasePanel.vue'
import { useGetCatalog, useCheckAndLoadData } from './composable'

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
const pathToStatus = 'docStatus' // путь для статуса, используется в table и в action
let tableDataAndPagination = ref({}) // данные для таблицы + информция для пагинации
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
const fields = reactive({
  own: false,
  type: '',
  number: '',
  applicant: '',
  epassportNumb: '',
  docStatus: '',
  organization: '',
  vehicleId: '',
  engineId: '',
  frameId: '',
  bodyId: ''
})
const defaultFields = JSON.parse(JSON.stringify(fields))
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
        query: { epassportId: 'epassport' }
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
const tableRowSelect = ref({}) // выбранная строка из таблицы
let size = ref(5) //количество строк на одной странице
let page = ref(0) // текущая страница в пагинации
const NSI_100 = ref([])

async function find() {
  const body = {
    isOwn: fields.own,
    isRegexSearch: true,
    query: {
      ['type']: fields.type,
      ['number']: fields.number,
      ['applicant']: fields.applicant,
      ['epassportNumb']: fields.epassportNumb,
      // ['status']: fields.docStatus, правильное решение
      ['status']: 'CONFIRMED', // временное решение
      ['organization']: fields.organization,
      ['vehicleId']: fields.vehicleId,
      ['engineId']: fields.engineId,
      ['bodyId']: fields.bodyId,
      ['frameId']: fields.frameId
    },
    pageAndSort: {
      page: page.value,
      size: size.value
    }
  }
  // проверка на заполенность хотя бы одного поля и загрузка данных
  const response = await useCheckAndLoadData(fields, '/application/search', body)
  tableDataAndPagination.value = { result: response }
  console.log('tableDataAndPagination.value ', tableDataAndPagination.value)
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
