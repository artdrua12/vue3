<template>
  <div>
    <v-btn
      class="mb-2"
      color="#546e7a"
      prepend-icon="mdi-file-document-plus-outline"
      dark
      @click="add"
    >
      Добавить документ
    </v-btn>

    <base-modal
      v-model:isOpen="isOpen"
      :title="currentIndex === -1 ? 'Добавление доумента' : 'Редактирование документа'"
      icon="mdi-file-document-plus-outline"
      :ok-function="{ fun: save, isCloseAfterClick: true }"
    >
      <div>
        <base-autocomplete
          v-model="currentItem.technicalRegulationObjectKindCode"
          label="Наименование объекта технического регулирования*"
          class="all"
        ></base-autocomplete>
        <base-textfield
          v-model="currentItem.docName"
          label="Наименование документа, подтверждающего соответствие"
        ></base-textfield>
        <base-textfield v-model="currentItem.docNumber" label="Номер документа"></base-textfield>
        <base-datefield
          :value="currentItem.updateDateTime"
          label="Дата документа*"
          @update:enter="currentItem.updateDateTime = $event"
        ></base-datefield>
        <base-datefield
          v-model="currentItem.startDateTime"
          label="Срок действия с*"
        ></base-datefield>
        <base-datefield
          v-model="currentItem.endDateTime"
          label="Срок действия по*"
        ></base-datefield>
        <base-autocomplete
          v-model="currentItem.businessEntityName"
          label="Наименование организации, выдавшей документ"
        ></base-autocomplete>
        <base-textfield
          v-model="currentItem.unifiedCountry"
          label="Происхождение документа"
        ></base-textfield>
      </div>
    </base-modal>

    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template #[`item.actions`]="{ item }">
        <div style="display: flex; justify-content: space-between">
          <v-icon class="me-2" size="20" color="orange" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="20" color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
        </div>
      </template>
      <template #no-data> Документы отсутствуют </template>
      <template #bottom></template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'

const isOpen = ref(false)
const currentIndex = ref(-1)
const currentItem = ref({
  technicalRegulationObjectKindCode: '',
  docName: '',
  docNumber: '',
  updateDateTime: '',
  businessEntityName: '',
  startDateTime: '',
  endDateTime: '',
  unifiedCountry: ''
})
const defaultItem = {
  technicalRegulationObjectKindCode: '',
  docName: '',
  docNumber: '',
  updateDateTime: '',
  businessEntityName: '',
  startDateTime: '',
  endDateTime: '',
  unifiedCountry: ''
}
const items = ref([
  {
    technicalRegulationObjectKindCode: '123',
    docName: '321',
    docNumber: '777',
    updateDateTime: '12.03.2024',
    businessEntityName: '',
    startDateTime: '',
    endDateTime: '',
    unifiedCountry: ''
  }
])
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
    value: 'businessEntityName'
  },
  { title: 'Срок действия с', value: 'startDateTime' },
  { title: 'Срок действия по', value: 'endDateTime' },
  { title: 'Происхождение документа', value: 'unifiedCountry' },
  // {
  //   title: 'Наименование организации, выдавшей документ',
  //   value: 'businessEntity.businessEntityName'
  // },
  // { title: 'Срок действия с', value: 'validityPeriodDetails.startDateTime' },
  // { title: 'Срок действия по', value: 'validityPeriodDetails.endDateTime' },
  // { title: 'Происхождение документа', value: 'businessEntity.unifiedCountry' },
  { title: 'Действия', value: 'actions', sortable: false }
])

function save() {
  if (currentIndex.value > -1) {
    // обновляем
    Object.assign(items.value[currentIndex.value], currentItem.value)
  } else {
    // добавляем
    items.value.push(Object.assign({}, currentItem.value))
  }
  currentItem.value = Object.assign({}, defaultItem)
  currentIndex.value = -1
}

function add() {
  currentIndex.value = -1 // выставляем значение текущего индекса
  currentItem.value = Object.assign({}, currentItem.value) // подставляем пустое значение
  isOpen.value = true
}

function editItem(item) {
  currentIndex.value = items.value.indexOf(item)
  currentItem.value = Object.assign({}, item)
  isOpen.value = true
}

function deleteItem(item) {
  const index = items.value.indexOf(item)
  items.value.splice(index, 1)
}
</script>
