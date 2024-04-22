<template>
  <div class="layoutForms">
    <base-panel-acordions
      v-model:tab="currentTab"
      class="forms-menu"
      :data="props.data"
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
            <v-window-item v-for="tab in item.tabs" :id="tab.id" :key="tab.id" :value="tab.title">
              <div class="tabsPageForm">
                <component
                  :is="getComponent(i.type)"
                  v-for="(i, index) in tab.fields"
                  :key="index"
                  v-model:fields="i.fields"
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
                ></component>
              </div>
            </v-window-item>
          </v-window>
        </div>

        <div v-else class=" tabsWrapper tabsPageForm">
          <component
            :is="getComponent(i.type)"
            v-for="(i, index) in item.fields"
            :key="index"
            v-model:fields="i.fields"
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
          ></component>
        </div>
      </base-panel>
    </div>
  </div>
</template>
<script setup>
import BasePanel from '@/components/base/BasePanel.vue'
import BasePanelAcordions from '@/components/base/BasePanelAcordions.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import BaseSlot from '@/components/base/BaseSlot.vue'
import { ref, defineProps } from 'vue'
const props = defineProps({
  data: { type: Array, required: true }
})
const allComponents = {
  BaseTextfield,
  BaseAutocomplete,
  BaseDatefield,
  BaseTextarea,
  BaseCheckbox,
  BaseCombobox,
  BaseIsMissingDisabled,
  BaseIsMissing,
  BaseSlot,
  BaseRecursiveConstructor
}
const currentTab = ref('')
function getComponent(type) {
  return allComponents[type]
}
</script>

<style scoped>
.layoutForms {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 370px 1fr;
  overflow: auto;
  align-items: flex-start;
  align-content: flex-start;
}
.menu-button {
  display: flex;
  justify-content: flex-start;
}
.forms-menu {
  width: 370px;
  max-height: calc(100vh - 90px);
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
</style>
