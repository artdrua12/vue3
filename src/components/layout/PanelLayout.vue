<template>
  <div class="panel-layot">
    <div class="panel-menu">
      <v-btn icon="mdi-tune-variant" variant="text" @click="isOpen = true"></v-btn>
      <!-- <base-panel elevation="5" t-color="#bdbdbf" bg-color="none" :propsPanel="data"></base-panel> -->
      <!-- <div v-for="item in data" :key="item.title">
        <template v-if="item.panels">
          <base-panel :id="item" elevation="5" t-color="#bdbdbf" bg-color="none" :propsPanel="data">
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
      </div> -->
      <BasePanelAcordions
        t-color="#bdbdbf"
        :props-panel="data"
        bg-color="none"
      ></BasePanelAcordions>
      <v-btn @click="test">TEST SNACKBAR</v-btn>
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
    <menu-registration v-model:isOpen="isOpen"></menu-registration>
  </div>
</template>
<script setup>
import BasePanel from '../base/BasePanel.vue'
import MenuRegistration from '../MenuRegistration.vue'
import BasePanelAcordions from '../base/BasePanelAcordions.vue'
import { ref } from 'vue'
import { useSnackbarStore } from '@/stores/counter'
const store = useSnackbarStore()
const isOpen = ref(false)
const data = [
  { panels: ['children11', 'children12', 'children13'], title: 'панель1' },
  { title: 'панель2' },
  { panels: ['children31', 'children32', 'children33', 'children34'], title: 'панель3' },
  { panels: ['children41', 'children42'], title: 'панель4' },
  { title: 'панель5' }
]
function test() {
  console.log('store', store.snack)
  store.snack.push({ text: 'Столбец зафиксирован', color: 'snackInfo' });
  // this.setSnack({ text: 'Столбец зафиксирован', color: 'snackInfo' })
}
</script>

<style scoped>
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
</style>
