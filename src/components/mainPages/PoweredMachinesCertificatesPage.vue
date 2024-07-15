<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" open-panel="1">
      <template #title>Реестр сертификатов соответствия</template>
      <v-form ref="form" class="adaptiveGrid pa-5">
        <base-checkbox :v-model="fields.own" label="Только свои" class="full"></base-checkbox>

        <base-textfield
          v-model="fields.docId"
          label="Номер документа"
          class="span6"
        ></base-textfield>
        <base-datefield
          v-model="fields.startDateTime"
          label="Срок действия с"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.endDateTime"
          label="Срок действия по"
          class="span3"
        ></base-datefield>

        <base-autocomplete
          v-model="fields.docStatus"
          label="Статус"
          class="span6"
          :items="NSI_003"
        ></base-autocomplete>
        <base-autocomplete
          v-model="fields.countryCode"
          label="Страна выдачи документа"
          class="span6"
          :items="NSI_034"
          item-value="key"
        ></base-autocomplete>

        <base-autocomplete
          v-model="fields.makeName"
          label="Марка"
          class="span6"
          item-text="title"
          :items="NSI_046"
        ></base-autocomplete>
        <base-datefield
          v-model="fields.lastModifiedWith"
          label="Дата изменения с"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.lastModifiedBy"
          label="Дата изменения по"
          class="span3"
        ></base-datefield>

        <base-datefield
          v-model="fields.commercialName"
          label="Коммерческое наименование"
          class="full"
        ></base-datefield>

        <div class="full grid12">
          <base-textfield
            v-model="fields.signerSurname"
            label="Документ подписан"
            placeholder="Фамилия"
            class="span4"
          ></base-textfield>
          <base-textfield
            v-model="fields.singerName"
            placeholder="Имя"
            class="span4"
          ></base-textfield>
          <base-textfield
            v-model="fields.singerPatronimic"
            placeholder="Отчество"
            class="span4"
          ></base-textfield>
        </div>

        <base-panel class="full" elevation="3">
          <template #title>Дополнительные поля</template>
          <div class="adaptiveGrid pt-7 px-5">
            <base-autocomplete
              v-model="fields.manufacturer"
              label="Изготовитель"
              class="span6"
              :items="manufacturerItems"
              item-text="businessEntityName"
              item-value="businessEntityName"
            ></base-autocomplete>
            <base-autocomplete
              v-model="fields.declarer"
              label="Заявитель"
              class="span6"
              :items="manufacturerItems"
              item-text="businessEntityName"
              item-value="businessEntityName"
            ></base-autocomplete>

            <base-autocomplete
              v-model="fields.certificationAgency"
              label="Орган по сертификации"
              class="full"
              :items="certificationAgencyItems"
              item-text="certificationBodyNameBrief"
              item-value="certificationBodyNameBrief"
            ></base-autocomplete>
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
import BaseTable from '@/components/base/BaseTableSubGrid.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BasePanel from '@/components/base/BasePanel.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import { useGetCatalog, useLoadItems, useCheckAndLoadData } from './composable'

const tableHeaders = [
  { text: 'Номер  документа', value: 'docId', id: 'h1' },
  { text: 'Дата изменения', value: 'tcInfo.lastModified', id: 'h2' },
  { text: 'Изготовитель', value: 'vehicleManufacturerDetails[0].businessEntityName', id: 'h3' },
  { text: 'Заявитель', value: 'applicantDetails.businessEntityName', id: 'h4' },
  { text: 'Статус', value: `conformityDocStatus`, id: 'h5' },
  { text: 'Документ подписан', value: ['cert.signer.surname', 'cert.signer.name'], id: 'h6' }
]
const pathToStatus = 'conformityDocStatus' // путь для статуса, используется в table и в action
let tableDataAndPagination = ref({})
const form = ref(null) // ссылка на форму
const additionalTableHeaders = [
  { text: 'Страна выдачи документа', value: 'unifiedCountryCode.value', id: 1, model: false },
  { text: 'Сформирован на основании', value: 'conformityDocKindName', id: 2, model: false },
  {
    text: 'Коммерческое наименование',
    value: 'vehicleTypeDetails.vehicleCommercialName',
    id: 3,
    model: false
  },
  { text: 'Тип', value: 'vehicleTypeDetails.vehicleTypeId', id: 4, model: false },
  {
    text: 'Модификация',
    value: 'vehicleVariantDetails.vehicleTypeVariantId',
    id: 5,
    model: false
  },
  {
    text: 'Код ТН ВЭД',
    value: 'vehicleVariantDetails.codTNVED',
    id: 6,
    model: false
  },
  { text: 'Срок действия с', value: 'docStartDate', id: 7, model: false },
  { text: 'Срок действия по', value: 'docValidityDate', id: 8, model: false },
  {
    text: 'Орган по сертификации',
    value: 'conformityAuthorityInformationDetails.businessEntityBriefName',
    id: 9,
    model: false
  },
  {
    text: 'Полное наименование продукции',
    value: '',
    id: 10,
    model: false
  },
  {
    text: 'Наименование объекта сертификации',
    value: 'unifiedCommodityMeasure.release',
    id: 11
  },
  {
    text: 'Идентификационный номер изделия',
    value: 'vehicleDetails.vehicleIdInfoDetails.vehicleFactoryNumberId',
    id: 12,
    model: false
  },
  { text: 'Марка', value: 'vehicleTypeDetails.vehicleMakeName', id: 13 },
  { text: 'Тех.регламент ТС', value: 'technicalRegulations', id: 14 }
]

const NSI_003 = ref([])
const NSI_034 = ref([])
const NSI_046 = ref([])
const manufacturerItems = ref([])
const certificationAgencyItems = ref([])

const fields = reactive({
  own: false,
  docId: '',
  startDateTime: '',
  endDateTime: '',
  docStatus: '',
  countryCode: '',
  makeName: '',
  lastModifiedWith: '',
  lastModifiedBy: '',
  commercialName: '',

  signerSurname: '',
  singerName: '',
  singerPatronimic: '',
  // Дополнительные поля
  manufacturer: '',
  declarer: '',
  certificationAgency: ''
})
const defaultFields = JSON.parse(JSON.stringify(fields))

const actions = [
  {
    text: 'Создать документ',
    icon: 'mdi-file-plus-outline',
    enabled: { permission: ['Создать сертификат соответствия'] }
  },
  {
    text: 'Редактировать',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Черновик'],
      permission: ['Редактировать сертификат соответствия']
    }
  },
  {
    text: 'Внесение изменений НО в сертификат в статусе "Действующий"',
    icon: 'mdi-file-document-edit-outline',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Утвердить сертификат соответствия']
    }
  },
  {
    text: 'Просмотреть',
    icon: 'mdi-file-eye-outline',
    enabled: {
      notEmpty: 'true',
      permission: ['Просмотреть сертификат соответствия']
    }
  },
  {
    text: 'Копировать',
    icon: 'mdi-content-copy',
    enabled: {
      notEmptyAndStatus: ['Действующий'],
      permission: ['Копировать сертификат соответствия']
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
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Возобновить',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Выгрузка',
    icon: 'mdi-xml',
    enabled: false
    /*  this.hasSelected && this.permissions.includes('Выгрузка сертификата соответствия') */
  },
  {
    text: 'Пересмотреть',
    enabled: false,
    icon: 'mdi-file-document-edit-outline'
  },
  {
    text: 'Корректировать',
    enabled: false,
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
      permission: ['Удалить сертификат соответствия']
    }
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
      ['docId']: fields.docId,
      ['docStartDate']: fields.startDateTime + 'to',
      ['docValidityDate']: 'to' + fields.endDateTime,
      ['conformityDocStatus']: fields.docStatus,
      ['cert.signer.surname']: fields.signerSurname,
      ['cert.signer.name']: (fields.singerName || '' + ' ' + fields.singerPatronimic || '').trim(),
      ['tcInfo.lastModified']: fields.lastModifiedWith + 'to' + fields.lastModifiedBy,
      ['unifiedCountryCode.value']: fields.countryCode,
      ['conformityAuthorityInformationDetails.businessEntityBriefName']: fields.certificationAgency,
      ['vehicleTypeDetails.vehicleMakeName']: fields.makeName,
      ['vehicleTypeDetails.vehicleCommercialName']: fields.commercialName,
      ['vehicleManufacturerDetails.businessEntityName']: fields.manufacturer,
      ['applicantDetails.businessEntityName']: fields.declarer
    },
    fields: [
      'docId',
      'tcInfo.lastModified',
      'vehicleManufacturerDetails.businessEntityName',
      'applicantDetails.businessEntityName',
      'conformityDocStatus',
      'unifiedCountryCode.value',
      'conformityDocKindName',
      'vehicleTypeDetails.vehicleCommercialName',
      'vehicleTypeDetails.vehicleTypeId',
      'vehicleVariantDetails.vehicleTypeVariantId',
      'vehicleVariantDetails.codTNVED',
      'docStartDate',
      'docValidityDate',
      'conformityAuthorityInformationDetails.businessEntityBriefName',
      'vehicleTypeDetails.vehicleMakeName',
      'vehicleDetails.vehicleIdInfoDetails.vehicleFactoryNumberId',
      'unifiedCommodityMeasure.release',
      'cert.signer.surname',
      'cert.signer.name',
      'technicalRegulations'
    ],
    pageAndSort: {
      page: page.value,
      size: size.value
    }
  }
  // проверка на заполенность хотя бы одного поля и загрузка данных
  tableDataAndPagination.value = await useCheckAndLoadData(
    fields,
    '/api/powered-machines/certificate/modification/search',
    body
  )
}
//справочники для автокомплита
async function load() {
  NSI_003.value = await useGetCatalog('NSI_003')
  NSI_034.value = await useGetCatalog('NSI_034')
  NSI_046.value = await useGetCatalog('NSI_046')
  manufacturerItems.value = await useLoadItems('/api/manufacturer-registry/all')
  certificationAgencyItems.value = await useLoadItems(
    '/api/classifier/epassport/certification-body/search/certificateAccreditations'
  )
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
