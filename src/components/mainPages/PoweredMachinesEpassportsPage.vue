<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" open-panel="1">
      <template #title>Реестр электронных паспортов СМ</template>
      <v-form class="adaptiveGrid pa-5">
        <div class="full grid12">
          <base-checkbox :v-model="fields.own" label="Только свои" class="span6"></base-checkbox>
          <base-checkbox
            v-if="
              !['НО АДМ', 'ОАО ЦНИИТУ', 'Национальный оператор «ОАО ЦНИИТУ»'].includes(
                currentUser.getUser.value?.companyName
              )
            "
            :v-model="fields.copy"
            label="Шаблоны"
            class="span6"
          ></base-checkbox>
        </div>

        <base-autocomplete
          v-model="fields.kindCode"
          label="Вид электронного паспорта"
          class="span6"
          :items="NSI_011.filter((i) => ['3'].includes(i.key))"
          item-value="key"
        ></base-autocomplete>
        <base-autocomplete
          v-model="fields.docStatus"
          label="Статус"
          class="span6"
          :items="NSI_003"
        ></base-autocomplete>

        <base-textfield
          v-model="fields.passportId"
          label="Номер электронного паспорта"
          class="span6"
        ></base-textfield>
        <base-textfield
          v-model="fields.vehicleFactoryNumberId"
          label="Заводской номер"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="fields.identityNumber"
          label="Идентификационный номер:"
          class="span6"
        ></base-textfield>
        <base-autocomplete
          v-model="fields.vehicleName"
          label="Марка"
          class="span6"
          item-text="title"
          :items="NSI_046"
        ></base-autocomplete>

        <base-datefield
          v-model="fields.statusModifiedWith"
          label="Дата перевода в статус с"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.statusModifiedBy"
          label="Дата перевода в статус по"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.docCreationDateWith"
          label="Дата оформления с"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.docCreationDateBy"
          label="Дата оформления по"
          class="span3"
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
            <base-textfield
              v-model="fields.engineId"
              label="Номер двигателя"
              class="span6"
            ></base-textfield>
            <base-textfield
              v-model="fields.mainPoweredAxleId"
              label="Номер основного ведущего моста"
              class="span6"
            ></base-textfield>

            <base-textfield
              v-model="fields.bodyId"
              label="Номер кузова (кабины, прицепа)"
              class="span6"
            ></base-textfield>
            <base-autocomplete
              v-model="fields.mover"
              label="Тип движителя"
              class="span6"
              item-text="key"
              item-value="key"
              :items="moverItems"
            ></base-autocomplete>

            <base-textfield
              v-model="fields.infoId"
              label="Сведения об идентификационном номере устройства вызова экстренных оперативных служб"
              class="full"
            ></base-textfield>

            <base-textfield
              v-model="fields.commercialName"
              label="Коммерческое наименование"
              class="span6"
            ></base-textfield>
            <base-autocomplete
              v-model="fields.techCategoryCode"
              label="Категория ТС, СМ по ТР ТС 010/2011, ТР ТС 018/2011, ТР ТС 031/2012"
              class="span6"
              item-text="key"
              item-value="key"
              :items="NSI_015.filter((e) => e.key.match(/L|M|N|O/))"
            ></base-autocomplete>

            <base-autocomplete
              v-model="fields.manufacturer"
              label="Изготовитель"
              class="full"
              :items="manufacturerItems"
              item-text="businessEntityName"
              item-value="businessEntityName"
            ></base-autocomplete>

            <base-autocomplete
              v-model="fields.countryCode"
              label="Страна оформления паспорта"
              class="span6"
              :items="NSI_034"
              item-value="key"
            ></base-autocomplete>
            <base-textfield
              v-model="fields.authorityName"
              label="Орган (организация), оформивший ЭП"
              class="span6"
            ></base-textfield>

            <base-autocomplete
              v-model="fields.docKindCode"
              label="Вид документа "
              class="span6"
              :items="NSI_012"
            ></base-autocomplete>
            <base-textfield
              v-model="fields.docId"
              label="Номер документа "
              class="span6"
            ></base-textfield>

            <base-autocomplete
              v-model="fields.assemblyPlant"
              label="Основание оформления ЭПТС"
              class="span6"
              :items="NSI_023"
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
// import { useRouter } from 'vue-router'
import { useGetCatalog, useLoadItems, useCheckAndLoadData } from './composable'
import { useUserStore } from '@/stores/userStore'
// import shemaDefault from '../forms/conformityForms/shemaDefault'
//import { useShemaStore } from '@/stores/shemaStore' // для работы со схемой

// const shemaStore = useShemaStore()
// const route = useRouter()
const currentUser = useUserStore()
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
const pathToStatus = 'documentStatus' // путь для статуса, используется в table и в action
let tableDataAndPagination = ref({})
const fields = reactive({
  own: false,
  copy: false,
  kindCode: '',
  docStatus: '',
  passportId: '',
  vehicleFactoryNumberId: '',
  identityNumber: '',
  vehicleName: '',
  statusModifiedWith: '',
  statusModifiedBy: '',
  docCreationDateWith: '',
  docCreationDateBy: '',
  signerSurname: '',
  singerName: '',
  singerPatronimic: '',
  //Дополнительные поля
  engineId: '',
  mainPoweredAxleId: '',
  bodyId: '',
  mover: '',
  infoId: '',
  techCategoryCode: '',
  manufacturer: '',
  countryCode: '',
  authorityName: '',
  docKindCode: '',
  docId: '',
  basisRegistration: ''
})
const defaultFields = JSON.parse(JSON.stringify(fields))
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

const tableRowSelect = ref({}) // выбранная строка из таблицы
let size = ref(5) //количество строк на одной странице
let page = ref(0) // текущая страница в пагинации
const NSI_003 = ref([])
const NSI_011 = ref([])
const NSI_012 = ref([])
const NSI_015 = ref([])
const NSI_023 = ref([])
const NSI_034 = ref([])
const NSI_046 = ref([])
const manufacturerItems = ref([])
const moverItems = ref([])

async function find() {
  const body = {
    isOwn: fields.own,
    isRegexSearch: true,
    query: {
      ['vehicleEPassportKindCode']: fields.kindCode,
      ['documentStatus']: fields.docStatus,
      ['vehicleEPassportId']: fields.passportId,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleIdentityNumberId']:
        fields.identityNumber,
      ['vehicleTypeDetails.vehicleMakeName']: fields.vehicleName,
      ['tcInfo.statusModified']: fields.statusModifiedWith + 'to' + fields.statusModifiedBy,
      ['docCreationDate']: fields.docCreationDateWith + 'to' + fields.docCreationDateBy,
      ['cert.signer.surname']: fields.signerSurname,
      ['cert.signer.name']: (fields.singerName || '' + ' ' + fields.singerPatronimic || '').trim(),
      ['vehicleDetails.vehicleIdInfoDetails.vehicleEngineIdDetails.vehicleIdentityNumberId']:
        fields.engineId,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleFrameIdDetails.vehicleIdentityNumberId']:
        fields.mainPoweredAxleId,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleBodyIdDetails.vehicleIdentityNumberId']:
        fields.bodyId,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleEmergencyCallDeviceIdDetails.vehicleIdentityNumberId']:
        fields.infoId,
      ['vehicleTypeDetails.vehicleCommercialName']: fields.commercialName,
      ['vehicleTypeDetails.vehicleTechCategoryCode']: fields.techCategoryCode,
      ['vehicleCountryCode']: fields.countryCode,
      ['documentDetails.docKindName']: fields.docKindCode,
      ['documentDetails.docId']: fields.docId,
      ['vehicleTypeDetails.propulsionKindName']: fields.mover.value,
      ['vehicleManufacturerDetails.businessEntityName']: fields.manufacturer,
      ['cert.signer.organization']: fields.authorityName,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleIdDetails.vehicleFactoryNumberId']:
        fields.vehicleFactoryNumberId,
      ['externalSystemLoadCode']: fields.copy ? '6' : '',
      ['vehicleEPassportBaseCode']: fields.basisRegistration
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
      page: page.value,
      size: size.value
    }
  }

  // проверка на заполенность хотя бы одного поля и загрузка данных
  tableDataAndPagination.value = await useCheckAndLoadData(
    fields,
    '/api/powered-machines/passport/modification/search',
    body
  )
}
//справочники для автокомплита
async function load() {
  NSI_003.value = await useGetCatalog('NSI_003')
  NSI_011.value = await useGetCatalog('NSI_011')
  NSI_012.value = await useGetCatalog('NSI_012')
  NSI_015.value = await useGetCatalog('NSI_015')
  NSI_023.value = await useGetCatalog('NSI_023')
  NSI_034.value = await useGetCatalog('NSI_034')
  NSI_046.value = await useGetCatalog('NSI_046')
  manufacturerItems.value = await useLoadItems('/api/manufacturer-registry/all')
  moverItems.value = await useLoadItems('/api/classifier/epassport/propulsion-kinds')
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
