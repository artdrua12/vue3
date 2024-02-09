<template>
  <base-modal
    v-model:isOpen="isOpen"
    title="Основание оформления электронного паспорта"
    icon="mdi-firebase"
    ok-title="Создать"
  >
    <div class="modals">
      <v-tabs v-model="tab" align-tabs="title" selected-class="actv" color="#546e7a">
        <v-toolbar-title class="mt-3"
          ><h3 style="color: #354a54">Вид субъекта права:</h3></v-toolbar-title
        >
        <v-tab value="1" @click="toLegal"
          ><v-icon color="#546e7a" icon="mdi-briefcase"></v-icon>&nbsp; Юридическое лицо</v-tab
        >
        <v-tab value="2" @click="toIndividual"
          ><v-icon color="#546e7a" icon="mdi-account-tie"></v-icon>&nbsp; Физическое лицо</v-tab
        >
      </v-tabs>

      <v-radio-group v-model="radioTab" color="#546e7a">
        <v-radio
          label="изготовление транспортного средства (шасси транспортного средства, самоходной машины или другого вида техники)"
          value="1"
          class="mt-3"
        ></v-radio>
        <v-radio
          label="ввоз транспортного средства (шасси транспортного средства, самоходной машины или другого вида техники) на таможенную территорию Евразийского экономического союза из государства, не являющегося членом Евразийского экономического союза"
          value="2"
          class="mt-3"
        ></v-radio>
        <v-radio
          label="оформление электронного паспорта на транспортное средство (шасси транспортного средства, самоходную машину или другой вид техники) на иных основаниях"
          value="3"
          class="mt-3"
        ></v-radio>

        <v-window v-model="tab">
          <v-window-item value="2" style="height: 20px"> </v-window-item>
          <v-window-item value="1">
            <v-radio
              label="оформление электронного паспорта на транспортное средство (шасси транспортного средства, самоходную машину или другой вид техники) на иных основаниях"
              value="4"
              class="mt-3"
            ></v-radio>
          </v-window-item>
        </v-window>
      </v-radio-group>

      <div class="document">
        <h3>Документ, подтверждающий соответствие требованиям безопасности</h3>
        <base-swich
          v-model:value="isDoc"
          label="присутсвует"
          :disabled="tab == '2'"
          class="ml-4"
        ></base-swich>
      </div>

      <fieldset>
        <legend>
          <v-icon
            v-if="!isDoc && tab == '1'"
            icon=" mdi-close-circle"
            color="#f23f3f"
            class="legendIcon"
            size="15"
          />
          <v-icon
            v-if="isDoc && tab == '1'"
            icon="mdi-check-circle"
            color="green"
            class="legendIcon"
            size="15"
          />
          <v-icon icon="mdi-text-box" size="large" color="#546e7a" />
        </legend>

        <v-expand-transition>
          <div v-if="isDoc || (tab == '2' && radioTab == '1')" class="grid2">
            <base-autocomplite label="Вид документа" class="full"></base-autocomplite>
            <base-autocomplite label="Номер документа(ОТТС)" class="full"></base-autocomplite>
          </div>

          <div v-else class="grid2">
            <base-autocomplite
              label="Сведения об основаниях отсутствия документа, подтверждающего соответствие*"
              class="full"
            ></base-autocomplite>

            <h3 class="full" style="text-align: center">
              Сведения о документе, подтвержающем оформление электронного паспорта без документа,
              подтверждающего соответствие
            </h3>

            <base-autocomplite label="Наименование документа*" class="full"></base-autocomplite>
            <base-text-fiel label="Номер документа*" class="full"></base-text-fiel>
            <base-text-fiel label="Дата документа*" class="full"></base-text-fiel>
            <base-text-fiel label="Кем выдано" class="col"></base-text-fiel>
            <base-text-fiel label="Количество листов" class="col"></base-text-fiel>
          </div>
        </v-expand-transition>
      </fieldset>
    </div>
  </base-modal>
</template>

<script setup>
import BaseModal from './base/BaseModal.vue'
import BaseAutocomplite from './base/BaseAutocomplite.vue'
import BaseTextFiel from './base/BaseTextField.vue'
import BaseSwich from './base/BaseSwich.vue'
import { ref } from 'vue'
const isDoc = ref(false)
const isOpen = ref(false)
const tab = ref('1')
const radioTab = ref('1')
function toLegal() {
  isDoc.value = true
  radioTab.value = '1'
}
function toIndividual() {
  isDoc.value = false
  radioTab.value = '1'
}
</script>

<style scoped>
.actv {
  background-color: #dbdbdb;
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
