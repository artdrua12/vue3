<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" open-panel="1">
      <template #title>Реестр электронных паспортов</template>
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
          :items="NSI_011.filter((i) => ['1', '2'].includes(i.key))"
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
        <base-datefield
          v-model="fields.createWith"
          label="Период изготовления с"
          class="span3"
        ></base-datefield>
        <base-datefield
          v-model="fields.createBy"
          label="Период изготовления по"
          class="span3"
        ></base-datefield>

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
              v-model="fields.frameId"
              label="Номер шасси (рамы)"
              class="span6"
            ></base-textfield>

            <base-textfield
              v-model="fields.bodyId"
              label="Номер кузова (кабины, прицепа)"
              class="span6"
            ></base-textfield>
            <base-textfield
              v-model="fields.commercialName"
              label="Коммерческое наименование"
              class="span6"
            ></base-textfield>

            <base-textfield
              v-model="fields.infoId"
              label="Сведения об идентификационном номере устройства вызова экстренных оперативных служб"
              class="full"
            ></base-textfield>

            <base-textfield
              v-model="fields.commercialName"
              label="Марка двигателя"
              class="span6"
            ></base-textfield>
            <base-autocomplete
              v-model="fields.techCategoryCode"
              label="Категория в соответствии с ТР ТС"
              class="span6"
              item-text="key"
              item-value="key"
              :items="NSI_015.filter((e) => e.key.match(/L|M|N|O/))"
            ></base-autocomplete>

            <base-autocomplete
              v-model="fields.manufacturer"
              label="Изготовитель"
              class="span6"
              :items="manufacturerItems"
              item-text="businessEntityName"
              item-value="businessEntityName"
            ></base-autocomplete>
            <base-datefield
              v-model="fields.startDate"
              label="Период создания ЭП с"
              class="span3"
            ></base-datefield>
            <base-datefield
              v-model="fields.validityDate"
              label="Период создания ЭП по"
              class="span3"
            ></base-datefield>

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
              label="Вид документа о соответствии"
              class="span6"
              :items="NSI_012"
            ></base-autocomplete>
            <base-textfield
              v-model="fields.docId"
              label="Номер документа  о соответствии"
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
const pathToStatus = 'documentStatus' // путь для статуса, используется в table и в action
let tableDataAndPagination = ref({})
const fields = reactive({
  own: false,
  copy: false,
  kindCode: '',
  docStatus: '',
  passportId: '',
  createWith: '',
  createBy: '',
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
  frameId: '',
  bodyId: '',
  commercialName: '',
  infoId: '',
  componentName: '',
  techCategoryCode: '',
  manufacturer: '',
  startDate: '',
  validityDate: '',
  countryCode: '',
  authorityName: '',
  docKindCode: '',
  docId: '',
  basisRegistration: ''
})
const defaultFields = JSON.parse(JSON.stringify(fields))
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
        fields.frameId,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleBodyIdDetails.vehicleIdentityNumberId']:
        fields.bodyId,
      ['vehicleDetails.vehicleIdInfoDetails.vehicleEmergencyCallDeviceIdDetails.vehicleIdentityNumberId']:
        fields.infoId,
      ['vehicleTypeDetails.vehicleCommercialName']: fields.commercialName,
      ['vehicleVariantDetails.engineDetails.vehicleComponentMakeName']: fields.componentName,
      ['vehicleTypeDetails.vehicleTechCategoryCode']: fields.techCategoryCode,
      ['vehicleCountryCode']: fields.countryCode,
      ['documentDetails.docKindName']: fields.docKindCode,
      ['documentDetails.docId']: fields.docId,
      ['vehicleManufacturerDetails.businessEntityName']: fields.manufacturer,
      ['eDocDateTime']: fields.startDate + 'to' + fields.validityDate,
      ['vehicleDetails.manufactureYear']: fields.createWith + 'to' + fields.createBy,
      ['cert.signer.organization']: fields.authorityName,
      ['externalSystemLoadCode']: fields.copy ? '6' : '',
      ['vehicleEPassportBaseCode']: fields.basisRegistration
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
  NSI_011.value = await useGetCatalog('NSI_011')
  NSI_012.value = await useGetCatalog('NSI_012')
  NSI_015.value = await useGetCatalog('NSI_015')
  NSI_023.value = await useGetCatalog('NSI_023')
  NSI_034.value = await useGetCatalog('NSI_034')
  NSI_046.value = await useGetCatalog('NSI_046')
  manufacturerItems.value = await useLoadItems('/api/manufacturer-registry/all')
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
