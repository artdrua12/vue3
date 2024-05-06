<template>
  <div>
    <v-btn
      class="mb-2"
      color="#2c4957"
      prepend-icon="mdi-file-document-plus-outline"
      dark
      @click="isOpen = true"
    >
      Добавить документ
    </v-btn>

    <base-modal
      v-model:isOpen="isOpen"
      title="Добавление доумента"
      icon="mdi-file-document-plus-outline"
      :ok-function="{ fun: add, isCloseAfterClick: true }"
    >
      <div>
        <base-autocomplete
          v-model:value="item.docName"
          label="Наименование объекта технического регулирования*"
          class="all"
        ></base-autocomplete>
        <base-textfield
          v-model:value="item.technicalRegulationObjectKindCode"
          label="Наименование документа, подтверждающего соответствие"
        ></base-textfield>
        <base-textfield v-model="item.docNumber" label="Номер документа"></base-textfield>
        <base-datefield label="Дата документа*"></base-datefield>
        <base-datefield label="Срок действия с*"></base-datefield>
        <base-datefield label="Срок действия по*"></base-datefield>
        <base-autocomplete label="Наименование организации, выдавшей документ"></base-autocomplete>
        <base-textfield label="Происхождение документа"></base-textfield>
      </div>
    </base-modal>

    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template #[`item.actions`]="{ currentItem }">
        <v-icon class="me-2" size="small" @click="editItem(currentItem)"> mdi-pencil </v-icon>
        <v-icon size="small" @click="deleteItem(currentItem)"> mdi-delete </v-icon>
      </template>
      <template #no-data> Документы отсутствуют </template>
      <template #bottom></template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseTextfield from './BaseTextfield.vue'
import BaseDatefield from './BaseDatefield.vue'

const isOpen = ref(false)
const item = ref({
  technicalRegulationObjectKindCode: '',
  docName: '',
  docNumber: ''
})
const items = ref([{ technicalRegulationObjectKindCode: '123', docName: '321', docNumber: '777' }])
const headers = ref([
  {
    title: 'Объекты технического регулирования',
    value: 'technicalRegulationObjectKindCode',
    align: 'start',
    sortable: false
  },
  { title: 'Наименование документа, подтверждающего соответствие', value: 'docName' },
  { title: 'Номер документа', value: 'docNumber' },
  { title: 'Дата документа', value: 'updateDateTime' },
  {
    title: 'Наименование организации, выдавшей документ',
    value: 'businessEntity.businessEntityName'
  },
  { title: 'Срок действия с', value: 'validityPeriodDetails.startDateTime' },
  { title: 'Срок действия по', value: 'validityPeriodDetails.endDateTime' },
  { title: 'Происхождение документа', value: 'businessEntity.unifiedCountry' },
  { title: 'Действия', value: 'actions', sortable: false }
])
function add() {
  items.value.push(Object.assign({}, item.value))
}
function editItem(item) {
  console.log('editItem', item)
}
function deleteItem(item) {
  console.log('deleteItem', item)
}
</script>

