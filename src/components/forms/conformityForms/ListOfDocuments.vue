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
      :title="currentIndex === -1 ? 'Добавление документа' : 'Редактирование документа'"
      icon="mdi-file-document-plus-outline"
      :ok-function="{ fun: save, isCloseAfterClick: true }"
    >
      <div class="modalSize">
        <base-autocomplete
          v-model="currentItem.technicalRegulationObjectKindCode"
          label="Наименование объекта технического регулирования*"
          :items="NSI_106"
          class="full"
          :rules="[
            () => !!currentItem.technicalRegulationObjectKindCode || 'Обязательно к заполнению'
          ]"
        ></base-autocomplete>

        <base-textfield
          v-model="currentItem.docName"
          label="Наименование документа, подтверждающего соответствие"
          class="full"
        ></base-textfield>

        <base-textfield
          v-model="currentItem.docNumber"
          label="Номер документа"
          class="full"
        ></base-textfield>

        <base-datefield
          :value="currentItem.updateDateTime"
          label="Дата документа*"
          class="span6"
          @update:value="currentItem.updateDateTime = $event"
        ></base-datefield>

        <base-datefield
          :value="currentItem.validityPeriodDetails.startDateTime"
          label="Срок действия с*"
          class="span3"
          @update:value="currentItem.validityPeriodDetails.startDateTime = $event"
        ></base-datefield>

        <base-datefield
          :value="currentItem.validityPeriodDetails.endDateTime"
          label="Срок действия по*"
          class="span3"
          @update:value="currentItem.validityPeriodDetails.endDateTime = $event"
        ></base-datefield>

        <base-autocomplete
          v-model="currentItem.businessEntity.businessEntityName"
          label="Наименование организации, выдавшей документ"
          :items="organizationName"
          item-text="certificationBodyNameBrief"
          item-value="certificationBodyNameBrief"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="currentItem.businessEntity.unifiedCountry"
          label="Происхождение документа"
          class="full"
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
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
const indexDB = useIndexDBStore() // для работы с IndexDB
const request = useRequestStore()

const NSI_106 = ref([])
const organizationName = ref([])
const isOpen = ref(false)
const currentIndex = ref(-1)
const currentItem = ref({
  technicalRegulationObjectKindCode: '',
  docName: '',
  docNumber: '',
  updateDateTime: '',
  businessEntity: {
    unifiedCountry: '',
    businessEntityName: ''
  },
  validityPeriodDetails: {
    endDateTime: '',
    startDateTime: ''
  }
})
const defaultItem = {
  technicalRegulationObjectKindCode: '',
  docName: '',
  docNumber: '',
  updateDateTime: '',
  businessEntity: {
    unifiedCountry: '',
    businessEntityName: ''
  },
  validityPeriodDetails: {
    endDateTime: '',
    startDateTime: ''
  }
}
const items = ref([])
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
async function load() {
  NSI_106.value = await indexDB.getFromDatabase('catalog', 'NSI_106')
  organizationName.value = await request.get(
    '/api/classifier/epassport/certification-body/search/certificateAccreditations'
  )
}
load()
</script>

<style scoped>
.modalSize {
  width: 700px;
  margin: 20px 10px 0px 10px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 20px;
  /* grid-auto-flow: dense; */
  align-items: flex-start;
}
</style>
