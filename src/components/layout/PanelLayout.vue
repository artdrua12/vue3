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
    >
      <div class="modals">
        <v-tabs v-model="tab" color="green" align-tabs="title">
          <v-toolbar-title class="mt-3">Вид субъекта права:</v-toolbar-title>

          <v-tab value="1"><v-icon icon="mdi-account-tie"></v-icon>&nbsp; Физическое лицо</v-tab>
          <v-tab value="2"><v-icon icon="mdi-briefcase"></v-icon>&nbsp; Юридическое лицо</v-tab>
        </v-tabs>

        <v-radio-group v-model="tab2" class="mt-7">
          <v-radio
            label="изготовление транспортного средства (шасси транспортного средства, самоходной машины или другого вида техники)"
            value="3"
          ></v-radio>
          <v-radio
            label="ввоз транспортного средства (шасси транспортного средства, самоходной машины или другого вида техники) на таможенную территорию Евразийского экономического союза из государства, не являющегося членом Евразийского экономического союза"
            value="4"
          ></v-radio>
          <v-radio
            label="оформление электронного паспорта на транспортное средство (шасси транспортного средства, самоходную машину или другой вид техники) на иных основаниях"
            value="5"
          ></v-radio>

          <v-window v-model="tab">
            <v-window-item value="1" style="height: 48px"> </v-window-item>
            <v-window-item value="2">
              <v-radio
                label="оформление электронного паспорта на транспортное средство (шасси транспортного средства, самоходную машину или другой вид техники) на иных основаниях"
                value="6"
              ></v-radio>
            </v-window-item>
          </v-window>
        </v-radio-group>

        <!-- <h2>Сведения о документе, подтверждающем соответствие требованиям безопасности</h2> -->
        <fieldset style="padding: 0px 20px 20px 20px ">
          <legend style="padding:0px 10px; font-size: 18px;">
            Сведения о документе, подтверждающем соответствие требованиям безопасности
          </legend>

          <div v-if="tab2 == '3'" class="it">
            <base-autocomplite label="Вид документа"></base-autocomplite>
            <base-autocomplite label="Номер документа(ОТТС)"></base-autocomplite>
          </div>

          <div v-else class="it">
            <v-window v-model="tab">
              <v-window-item value="1" style="height: 30px"> </v-window-item>
              <v-window-item value="2">
                <base-check-box label="Документ отсутсвует"></base-check-box>
              </v-window-item>
            </v-window>

            <h3>Сведения об основаниях отсутствия документа, подтверждающего соответствие*</h3>
            <base-autocomplite
              label="Сведения об основаниях отсутствия документа, подтверждающего соответствие*"
            ></base-autocomplite>
            <h3>
              Сведения о документе, подтвержающем оформление электронного паспорта без документа,
              подтверждающего соответствие
            </h3>
            <base-autocomplite label="Наименование документа*"></base-autocomplite>
            <base-text-fiel label="Номер документа*"></base-text-fiel>
            <base-text-fiel label="Дата документа*"></base-text-fiel>
            <base-text-fiel label="Кем выдано"></base-text-fiel>
            <base-text-fiel label="Количество листов"></base-text-fiel>
          </div>
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
import BaseCheckBox from '../base/BaseCheckBox.vue'
import { ref } from 'vue'
const isOpen = ref(false)
const tab = ref('1')
const tab2 = ref('3')
function toId(id) {
  let elem = document.getElementById(id)
  elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
  console.log(id)
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
.modals {
  max-width: 850px;
  min-height: 82vh;
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
h2 {
  text-align: center;
}
</style>
