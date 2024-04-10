<template>
  <div class="layoutForms">
    <base-panel-acordions
      ref="root"
      class="forms-menu"
      :data="props.data"
      :tab="currentTab"
      @update:tab="currentTab = $event"
    ></base-panel-acordions>

    <div class="forms-data">
      <base-panel
        v-for="item in props.data"
        :id="item.id"
        :key="item.id"
        elevation="5"
        props-panel="1"
        bg-color="#ebebeb"
      >
        <template #title>{{ item.title }} </template>

        <div v-if="item?.tabs" class="tabsWrapper">
          <v-tabs
            v-model="currentTab"
            align-tabs="right"
            density="compact"
            mandatory
            style="position: sticky; top: 0px; background-color: white; z-index: 2"
          >
            <v-tab v-for="tab in item.tabs" :key="tab.id" :value="tab.title">
              {{ tab.title }}
            </v-tab>
          </v-tabs>

          <v-window v-model="currentTab">
            <v-window-item
              v-for="(tab, indexTab) in item.tabs"
              :id="tab.id"
              :key="tab.id"
              :value="tab.title"
            >
              <base-check-box
                v-if="chekingIsMissing(tab, indexTab)"
                ref="box"
                v-model="tab.isMissing"
                :label="`${tab.title} - отсутствует`"
                class="missing"
                @change="updateIsMissing(tab, indexTab)"
              ></base-check-box>
              <div v-if="!tab?.isMissing == true" class="tabsPageForm">
                <component
                  :is="getComponent(i.type)"
                  v-for="(i, index) in tab.fields"
                  :key="index"
                  v-model="i.value"
                  :style="{
                    'grid-column': `${i.width == 'all' ? '1/-1' : 'span ' + i.width}`
                  }"
                  :label="i.label"
                  :addition-data="i.additionData"
                  :items="i.items"
                  :item-text="i.text"
                  :item-value="i.itemValue"
                  :placeholder="i.placeholder"
                  :disabled="i.disabled"
                  :fields="i.constructorFields"
                ></component>
                <v-btn @click="test">TEST</v-btn>
              </div>
            </v-window-item>
          </v-window>
        </div>

        <div v-else style="padding: 20px" class="tabsWrapper">
          <p>No TABS</p>
        </div>
      </base-panel>
    </div>
  </div>
</template>
<script setup>
import BasePanel from '../base/BasePanel.vue'
import BasePanelAcordions from '../base/BasePanelAcordions.vue'
import BaseTextField from '../base/BaseTextField.vue'
import BaseAutocomplete from '../base/BaseAutocomplete.vue'
import BaseDateField from '../base/BaseDateField.vue'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCheckBox from '../base/BaseCheckBox.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseSlot from '../base/BaseSlot.vue'
import { ref, defineProps, onMounted } from 'vue'
const props = defineProps({
  data: { type: Array, default: [] }
})
const allComponents = {
  BaseTextField,
  BaseAutocomplete,
  BaseDateField,
  BaseTextarea,
  BaseCheckBox,
  BaseCombobox,
  BaseIsMissing,
  BaseSlot,
  BaseRecursiveConstructor
}
const root = ref(null)
const currentTab = ref('')
const defaultFields = {} // сохраняем первоначальное значение табов, которые могут отсутствовать
function getComponent(type) {
  return allComponents[type]
}
function chekingIsMissing(tab, indexTab) {
  const existIsMissing = Object.prototype.hasOwnProperty.call(tab, 'isMissing')
  if (existIsMissing) {
    const filds = JSON.parse(JSON.stringify(tab.fields))
    if (!defaultFields[indexTab]) {
      defaultFields[indexTab] = filds
    }
  }
  return existIsMissing
}
function updateIsMissing(tab, indexTab) {
  if (tab.isMissing) {
    tab.fields = JSON.parse(JSON.stringify(defaultFields[indexTab]))
  }
}
function test() {
  console.log('test', root)
}
const box = ref(null)
onMounted(() => console.log(box.value))
</script>

<style scoped>
.layoutForms {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 370px 1fr;
  overflow: auto;
}
.menu-button {
  display: flex;
  justify-content: flex-start;
}
.forms-menu {
  width: 370px;
  max-height: 92vh;
  overflow: auto;
  scrollbar-width: none;
  position: fixed;
  margin-top: 10px;
}
.forms-data {
  grid-column: -1/-2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
.tabsWrapper {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 85vh;
  align-content: flex-start;
}
::v-deep .v-btn__content {
  white-space: pre-wrap;
  padding: 5px 0px;
}
.tabsPageForm {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-gap: 12px 25px;
  padding: 30px 24px 10px 24px;
}
@media (max-width: 1200px) {
  .tabsPageForm {
    grid-template-columns: repeat(6, 1fr);
  }
}
.missing {
  grid-column: 1/-1;
  padding: 20px 24px 0px 24px;
}
</style>
