<template>
  <v-form ref="form" class="pa-7">
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
      v-model="isOpen"
      :title="currentIndex === -1 ? 'Добавление документа' : 'Редактирование документа'"
      icon="mdi-file-document-plus-outline"
      :ok-function="addOrEdit"
    >
      <div class="modalSize">
        <base-autocomplete
          v-model="modalItem.technicalRegulationObjectKindCode"
          label="Наименование объекта технического регулирования*"
          :items="NSI_106"
          class="full"
          :rules="[
            () => !!modalItem.technicalRegulationObjectKindCode || 'Обязательно к заполнению'
          ]"
        ></base-autocomplete>

        <base-textfield
          v-model="modalItem.docName"
          label="Наименование документа, подтверждающего соответствие"
          class="full"
        ></base-textfield>

        <base-textfield
          v-model="modalItem.docNumber"
          label="Номер документа"
          class="full"
        ></base-textfield>

        <base-datefield
          v-model="modalItem.updateDateTime"
          label="Дата документа*"
          class="span6"
        ></base-datefield>

        <base-datefield
          v-model="modalItem.validityPeriodDetails.startDateTime"
          label="Срок действия с*"
          class="span3"
        ></base-datefield>

        <base-datefield
          v-model="modalItem.validityPeriodDetails.endDateTime"
          label="Срок действия по*"
          class="span3"
        ></base-datefield>

        <base-autocomplete
          v-model="modalItem.businessEntity.businessEntityName"
          label="Наименование организации, выдавшей документ"
          :items="organizationName"
          item-text="certificationBodyNameBrief"
          item-value="certificationBodyNameBrief"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="modalItem.businessEntity.unifiedCountry"
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
  </v-form>
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
const currentIndex = ref(-1) // -1 редактируем 0 и более - добавляем
const modalItem = ref({
  technicalRegulationObjectKindCode: '',
  docName: '',
  docNumber: '',
  updateDateTime: '',
  businessEntity: {
    unifiedCountry: '',
    businessEntityName: ''
  },
  validityPeriodDetails: {
    startDateTime: '',
    endDateTime: ''
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
    startDateTime: '',
    endDateTime: ''
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
const form = ref(null) // ссылка на форму

function addOrEdit() {
  // редактируем
  if (currentIndex.value > -1) {
    Object.assign(items.value[currentIndex.value], modalItem.value)
  } else {
    // добавляем
    items.value.push(Object.assign({}, modalItem.value))
  }
  // modalItem.value = JSON.parse(JSON.stringify(defaultItem)) // выставляем  значаения по умолчанию
  // currentIndex.value = -1 // выставляем  значаения по умолчанию (на добавление)
}

function add() {
  currentIndex.value = -1 // выставляем значение индекса на добавление (index < 0)
  modalItem.value = JSON.parse(JSON.stringify(defaultItem)) // подставляем значаения по умолчанию
  isOpen.value = true //открываем модальное окно
}

function editItem(item) {
  currentIndex.value = items.value.indexOf(item) // выставляем значение текущего индекса на редактирование (index > 0)
  modalItem.value = JSON.parse(JSON.stringify(item))
  isOpen.value = true //открываем модальное окно
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

// для того что бы метод был доступен у родителя
defineExpose({
  async isValidation() {
    const { valid } = await form.value.validate()
    return valid
  }
})
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
