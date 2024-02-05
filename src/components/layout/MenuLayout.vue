<template>
  <div class="baseLayout">
    <base-panel class="baseSearch" elevation="3" props-panel="1">
      <template #title>Реестр ОТТС</template>
      <div class="baseLayoutForm">
        <component
          :is="item.type"
          v-for="(item, index) in searchMain"
          :key="index"
          :style="{
            'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
          }"
          :label="item.label"
          :data-slot="item.dataSlot"
        ></component>

        <base-panel class="fullWidth" elevation="3">
          <div v-if="JSON.stringify(searchAdditionally) !== '{}'" color="">
            <div class="baseLayoutForm mt-3">
              <component
                :is="item.type"
                v-for="(item, index) in searchAdditionally"
                :key="index + 2"
                :style="{
                  'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
                }"
                :label="item.label"
                val="asd"
              ></component>
            </div>
          </div>
        </base-panel>
      </div>
      <div class="fullWidth base-button">
        <v-btn
          prepend-icon="mdi-close-circle"
          color="red"
          size="small"
          variant="text"
          class="rounded-0"
        >
          Очистить форму
        </v-btn>
        <v-btn
          append-icon="mdi-magnify"
          width="120px"
          color="#3f3c3c"
          size="small"
          elevation="3"
          class="rounded-0"
        >
          Поиск
        </v-btn>
      </div>
    </base-panel>
    <div class="base-action elevation-5">
      <base-panel props-panel="1">
        <template #title>Выбор действия</template>
        <base-threeview :selection="selection"></base-threeview>
      </base-panel>
    </div>
    <base-table class="base-table" @choise="setSelection"></base-table>
  </div>
</template>

<script>
import BaseThreeview from '../base/BaseThreeview.vue'
import BaseTable from '../base/BaseTableSubGrid.vue'
import BaseDateField from '../base/BaseDateField.vue'
import BaseAutocomplete from '../base/BaseAutocomplite.vue'
import BaseTextField from '../base/BaseTextField.vue'
import BaseCheckBox from '../base/BaseCheckBox.vue'
import BaseSlot from '../base/BaseSlot.vue'
import BasePanel from '../base/BasePanel.vue'
import { reactive, ref } from 'vue'

export default {
  components: {
    BaseThreeview,
    BaseTable,
    BaseDateField,
    BaseAutocomplete,
    BaseTextField,
    BaseCheckBox,
    BaseSlot,
    BasePanel
  },

  setup() {
    const selection = reactive({})
    const searchMain = reactive({
      own: {
        width: 'all',
        label: 'Только свои',
        value: false,
        type: 'base-check-box'
      },

      docId: {
        width: '6',
        label: 'Номер документа',
        value: '',
        type: 'base-text-field'
      },
      startDateTime: {
        width: '3',
        label: 'Срок действия с',
        value: '',
        type: 'base-date-field'
      },
      endDateTime: {
        width: '3',
        label: 'Срок действия по',
        value: '',
        type: 'base-date-field'
      },
      docStatus: {
        width: '6',
        label: 'Статус',
        value: '',
        type: 'base-autocomplete',
        items: [],
        url: '/api/classifier/epassport/status-directory-otts',
        text: 'value'
      },
      lastModifiedWith: {
        width: '3',
        label: 'Дата изменения с',
        value: '',
        type: 'base-date-field'
      },
      lastModifiedBy: {
        width: '3',
        label: 'Дата изменения по',
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
          singerName: {
            width: '4',
            value: '',
            type: 'base-text-field',
            placeholder: 'Имя'
          },
          singerPatronimic: {
            width: '4',
            value: '',
            type: 'base-text-field',
            placeholder: 'Отчество'
          }
        }
      }
    })
    const searchAdditionally = reactive({
      vehicleMakeName: {
        width: '6',
        label: 'Марка',
        value: '',
        type: 'base-autocomplete',
        items: [],
        url: '/api/classifier/epassport/vehicle-makes'
      },
      commercialName: {
        width: '6',
        label: 'Коммерческое наименование',
        value: '',
        type: 'base-text-field'
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
      assemblyPlant: {
        width: '6',
        label: 'Сборочный завод',
        value: '',
        type: 'base-autocomplete',
        items: [],
        url: '/api/manufacturer-registry/all',
        text: 'businessEntityName',
        itemValue: 'businessEntityName'
      },
      certificationAgency: {
        width: '6',
        label: 'Орган по сертификации',
        value: '',
        type: 'base-autocomplete',
        items: [],
        url: '/api/classifier/epassport/certification-body/search/certificateAccreditations',
        text: 'certificationBodyNameBrief',
        itemValue: 'certificationBodyNameBrief'
      },
      docType: {
        width: '6',
        label: 'Тип документа',
        value: '',
        type: 'base-autocomplete',
        items: [],
        // url: '/api/classifier/epassport/conformity-doc-kinds',
        // filter: "filter(e =>['30', '35'].includes(e.key))",
        text: 'value'
      },
      countryCode: {
        width: '6',
        label: 'Страна выдачи документа',
        value: '',
        type: 'base-autocomplete',
        items: [],
        url: '/api/classifier/epassport/countries',
        text: 'value',
        itemValue: 'key'
      },
      techCategory: {
        width: '6',
        label: 'Категория ТС',
        value: '',
        type: 'base-autocomplete',
        items: [],
        url: '/api/classifier/epassport/vehicle-tech-categories',
        filter: 'filter(e => e.key.match(/L|M|N|O/))',
        text: 'key',
        itemValue: 'key'
      }
    })
    const isOpen = ref('false')
    const setSelection = function ($event) {
      selection.value = $event
    }
    return {
      searchMain,
      searchAdditionally,
      isOpen,
      selection,
      setSelection
    }
  }
}
</script>

<style scoped>
.baseLayout {
  width: 100%;
  height: calc(100% - 10px);
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: auto 1fr;
  gap: 0px 20px;
  padding: 10px 5px 15px 20px;
  align-items: flex-start;
  align-content: flex-start;
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
  position: fixed;
  right: 22px;
  width: 400px;
}
.base-table {
  grid-area: 2/1/3/-1;
  z-index: 0;
}
.base-button {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.fullWidth {
  grid-column: 1/-1;
}
.baseLayoutForm {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 5px 12px;
  padding: 12px 24px 10px 24px;
}
@media (max-width: 1200px) {
  .baseLayoutForm {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
