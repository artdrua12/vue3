<template>
  <div class="panel-layot">
    <v-btn
      icon="mdi-tune-variant"
      variant="text"
      style="display: fixed; top: -10px; left: 380px; z-index: 100"
      @click="isOpen = true"
    ></v-btn>
    <div class="panel-menu">
      <BasePanelAcordions :open-panel="data"></BasePanelAcordions>
      <v-btn @click="testGreen">TEST green</v-btn>
      <v-btn @click="testRed">TEST red</v-btn>
    </div>

    <div class="panels">
      <base-panel
        v-for="item in data"
        :id="item.title"
        :key="item.title"
        elevation="5"
        open-panel="1"
        bg-color="#ebebeb"
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
            open-panel="1"
            color="#2c4957"
            bg-color="#dbdbdb"
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
    <menu-registration v-model:isOpen="isOpen"></menu-registration>
  </div>
</template>
<script setup>
import BasePanel from '../base/BasePanel.vue'
import MenuRegistration from '../MenuRegistration.vue'
import BasePanelAcordions from '../base/BasePanelAcordions.vue'
import { ref } from 'vue'
import { useSnackStore } from '@/stores/snackStore'
const snack = useSnackStore()
const isOpen = ref(false)
const data = [
  { panels: ['children11', 'children12', 'children13'], title: 'панель1' },
  { title: 'панель2' },
  { panels: ['children31', 'children32', 'children33', 'children34'], title: 'панель3' },
  { panels: ['children41', 'children42'], title: 'панель4' },
  { title: 'панель5' }
]
function testGreen() {
  snack.setSnack({ text: 'Текст ', type: 'info' })
}
function testRed() {
  snack.setSnack({ text: 'Ошибка загрузки', type: 'error' })
}
</script>

<style scoped>
.panel-layot {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 12px;
  overflow: auto;
  height: 100%;
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
</style>
