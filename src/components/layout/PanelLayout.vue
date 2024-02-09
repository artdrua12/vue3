<template>
  <div class="panel-layot">
    <div class="panel-menu">
      <v-btn v-bind="props" icon="mdi-tune-variant" variant="text" @click="isOpen = true"></v-btn>
      <div v-for="item in data" :key="item.title">
        <template v-if="item.panels">
          <base-panel :id="item" elevation="5" t-color="#bdbdbf" bg-color="none">
            <template #title>{{ item.title }}</template>
            <div>
              <v-btn
                v-for="itm in item.panels"
                :key="itm"
                class="menu-button rounded-0"
                block
                @click="toId(itm)"
                >{{ itm }}</v-btn
              >
            </div>
          </base-panel>
        </template>
        <v-btn v-else block class="menu-button rounded-0" @click="toId(item.title)">{{
          item.title
        }}</v-btn>
      </div>
    </div>

    <div class="panels">
      <base-panel
        v-for="item in data"
        :id="item.title"
        :key="item.title"
        elevation="5"
        props-panel="1"
      >
        <template #title>Panel Title {{ item.title }}</template>
        <div
          v-if="item.panels"
          style="padding: 20px; display: flex; flex-direction: column; gap: 12px"
        >
          <base-panel
            v-for="itm in item.panels"
            :id="itm"
            :key="itm"
            elevation="2"
            props-panel="1"
            t-color="gray"
          >
            <template #title>Title Children</template>
            <h1>{{ itm }}</h1>
          </base-panel>
        </div>
        <div v-else style="padding: 20px">
          <h1>BasePanel</h1>
          <h1>BasePanel</h1>
          <h1>BasePanel</h1>
          <h1>BasePanel</h1>
          <h1>BasePanel</h1>
        </div>
      </base-panel>
    </div>

    <base-modal
      v-model:isOpen="isOpen"
      title="Основание оформления электронного паспорта"
      icon="mdi-firebase"
      ok-title="Создать"
    >
      <div class="modals">
        <v-tabs v-model="tab" align-tabs="title" selected-class="actv" color="#546e7a">
          <v-toolbar-title class="mt-3"
            ><p style="color: #354a54">Вид субъекта права:</p></v-toolbar-title
          >
          <v-tab value="1" @click="radioTab = '1'"
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
  </div>
</template>
<script setup>
import BasePanel from '../base/BasePanel.vue'
import BaseModal from '../base/BaseModal.vue'
import BaseAutocomplite from '../base/BaseAutocomplite.vue'
import BaseTextFiel from '../base/BaseTextField.vue'
// import BaseCheckBox from '../base/BaseCheckBox.vue'
import BaseSwich from '../base/BaseSwich.vue'
import { ref } from 'vue'
const isDoc = ref(false)
const isOpen = ref(false)
const tab = ref('1')
const radioTab = ref('1')
function toId(id) {
  let elem = document.getElementById(id)
  elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
function toIndividual() {
  isDoc.value = false
  radioTab.value = '1'
}
const data = [
  { panels: ['children11', 'children12', 'children13'], title: 'панель1' },
  { title: 'панель2' },
  { panels: ['children31', 'children32', 'children33', 'children34'], title: 'панель3' },
  { panels: ['children41', 'children42'], title: 'панель4' },
  { title: 'панель5' }
]
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
.modals-radio {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.panel-layot {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 12px;
}
.menu-button {
  display: flex;
  justify-content: flex-start;
}
.panel-menu {
  position: fixed;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
.panels {
  grid-column: -1/-2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
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
