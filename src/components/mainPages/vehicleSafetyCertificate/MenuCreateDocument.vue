<template>
  <base-modal
    v-model="isOpen"
    title="Выбор документа"
    icon="mdi-file-document-multiple"
    ok-title="Создать"
    :ok-function="
      () => {
        const shema = shemaStore.createShema(shemaDefault)
        shema.conformityDocKindCode = '40'
        $router.push('/vehicle-safety-certificate/form')
      }
    "
  >
    <div class="modals">
      <v-radio-group v-model="tab" color="#546e7a">
        <v-radio
          label="Оформление СБКТС без
          использования ОТТС"
          value="1"
        ></v-radio>

        <v-radio value="2">
          <template #label>
            <span>
              Оформление СБКТС на основании
              <v-icon size="35" color="#2c4957">mdi-file-document-outline</v-icon> ОТТС</span
            >
          </template>
        </v-radio>
      </v-radio-group>

      <v-window v-model="tab">
        <v-window-item value="1"> </v-window-item>
        <v-window-item value="2" class="mt-5">
          <base-textfield
            v-model="docId"
            label="Номер документа*"
            class="full"
            :items="dynamicArray"
            @input="search"
          ></base-textfield>
        </v-window-item>
      </v-window>
    </div>
  </base-modal>
</template>

<script setup>
import BaseModal from '@/components/base/BaseModal.vue'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import { ref, reactive } from 'vue'
import { useShemaStore } from '@/stores/shemaStore' // для работы со схемой
import { useRequestStore } from '@/stores/requestStore'

const requests = useRequestStore() // для работы с запросами
const shemaStore = useShemaStore()
const isOpen = defineModel({ type: Boolean, required: true })
const tab = ref('1')
const dynamicArray = ref([])
const docId = ref('')

const body = {
  isRegexSearch: true,
  query: {
    ['conformityDocStatusDetails.docStatus']: 'Действующий',
    ['conformityDocKindName']: 'одобрение типа транспортного средства ЕАЭС',
    docId: ''
  },
  fields: [
    'docId',
    'conformityAuthorityInformationDetails.authority',
    'docValidityDate',
    'docStartDate'
  ]
}

async function search() {
  dynamicArray.value = await requests.post('/api/otts/docDetails/search/', {
    body,
    query: {
      ['conformityDocStatusDetails.docStatus']: 'Действующий',
      ['conformityDocKindName']: 'одобрение типа транспортного средства ЕАЭС',
      docId: docId.value
    }
  })
  console.log('dynamicArray.value', dynamicArray.value)
}
</script>

<style scoped>
.selected {
  background-color: #e2e2e2;
}
.legendIcon {
  position: absolute;
  top: 15px;
  right: 5px;
  z-index: 2;
  background-color: #efefef;
  border-radius: 100%;
}
.modals {
  width: 430px;
}
.document {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.grid2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px 20px;
}
.full {
  grid-column: 1/-1;
}
.col {
  grid-column: span 1;
}
fieldset {
  padding: 10px 20px 10px 20px;
  border-radius: 7px;
  padding-bottom: 20px;
  border-color: #546e7a;
}
legend {
  padding: 0px 5px;
  font-size: 18px;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
h3 {
  font-weight: 500;
  color: #546e7a;
}
</style>
