<template>
  <base-modal
    v-model="isOpen"
    title="Выбор документа"
    icon="mdi-file-document-multiple"
    ok-title="Создать"
    :ok-function="() => $router.push('/vehicle-safety-certificate/form')"
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
          <fieldset class="grid12">
            <legend>Сведения об ОТТС, на основании которого оформлено СБКТС</legend>

            <base-checkbox
              v-model="noDoc"
              label="Документ отсутствует"
              class="full"
            ></base-checkbox>

            <base-textfield label="Номер документа*" class="full"></base-textfield>
            <template v-if="noDoc">
              <base-autocomplete
                v-model="shema.conformityInformation.documentType"
                label="Тип"
                class="full"
                disabled
                :items="[{ value: 'Одобрение типа транспортного средства' }]"
              ></base-autocomplete>
              <base-datefield
                label="Срок действия с*"
                class="span6"
                :rules="[createSBKTS.docStartDate]"
              ></base-datefield>
              <base-datefield
                label="Срок действия по*"
                class="span6"
                :rules="[createSBKTS.docValidityDate]"
              ></base-datefield>
              <base-autocomplete
                label="Кем выдан*"
                class="full"
                item-text="certificationBodyNameBrief"
                item-value="accreditationId"
                :items="authority"
                :rules="[createSBKTS.authority]"
              ></base-autocomplete>
            </template>
          </fieldset>
        </v-window-item>
      </v-window>
    </div>
  </base-modal>
</template>

<script setup>
import BaseModal from '@/components/base/BaseModal.vue'
import BaseCheckbox from './base/BaseCheckbox.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseDatefield from './base/BaseDatefield.vue'
import { ref } from 'vue'
import { createSBKTS } from '@/components/forms/vechicleSaferyCertificate/rules'
import { useRequestStore } from '@/stores/requestStore'
import { useShemaStore } from '@/stores/shemaStore' // для работы со схемой

const shemaStore = useShemaStore()
const shema = shemaStore.getShema
const requests = useRequestStore()
const noDoc = ref(false)
const authority = ref([])
const isDoc = ref(false)
const isOpen = defineModel({ type: Boolean, required: true })
const tab = ref('1')

function to_1() {
  isDoc.value = true
}
function to_2() {
  isDoc.value = false
}
async function load() {
  authority.value = await requests.get(
    '/api/classifier/epassport/certification-body/search/certificateAccreditations'
  )
}
load()
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
  width: 850px;
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
