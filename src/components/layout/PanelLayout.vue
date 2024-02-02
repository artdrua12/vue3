<template>
  <div class="panel-layot">
    <div class="panel-menu">
      <v-btn
        v-bind="props"
        icon="mdi-tune-variant"
        variant="text"
        @click="isOpen = true"
      ></v-btn>
      <div v-for="item in data" :key="item.title">
        <template v-if="item.panels">
          <base-panel elevation="5" tColor="#bdbdbf" bgColor="none" :key="item" :id="item">
            <template v-slot:title>{{ item.title }}</template>
            <template v-slot:content>
              <div>
                <v-btn
                  class="menu-button rounded-0"
                  block
                  v-for="itm in item.panels"
                  :key="itm"
                  @click="toId(itm)"
                  >{{ itm }}</v-btn
                >
              </div>
            </template>
          </base-panel>
        </template>
        <v-btn block v-else @click="toId(item.title)" class="menu-button rounded-0">{{
          item.title
        }}</v-btn>
      </div>
    </div>

    <div class="panels">
      <base-panel
        elevation="5"
        props-panel="1"
        v-for="item in data"
        :key="item.title"
        :id="item.title"
      >
        <template v-slot:title>Panel Title {{ item.title }}</template>
        <template v-slot:content>
          <div
            v-if="item.panels"
            style="padding: 20px; display: flex; flex-direction: column; gap: 12px"
          >
            <base-panel
              elevation="2"
              props-panel="1"
              tColor="gray"
              v-for="itm in item.panels"
              :key="itm"
              :id="itm"
            >
              <template v-slot:title>Title Children</template>
              <template v-slot:content
                ><h1>{{ itm }}</h1></template
              >
            </base-panel>
          </div>
          <div v-else style="padding: 20px">
            <h1>BasePanel</h1>
            <h1>BasePanel</h1>
            <h1>BasePanel</h1>
            <h1>BasePanel</h1>
            <h1>BasePanel</h1>
          </div>
        </template>
      </base-panel>
    </div>
    <base-modal v-model:isOpen="isOpen"></base-modal>
  </div>
</template>
<script setup>
import BasePanel from '../base/BasePanel.vue'
import BaseModal from '../base/BaseModal.vue'
import { ref } from 'vue'
const isOpen = ref('true')
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
