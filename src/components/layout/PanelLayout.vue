<template>
  <div class="panel-layot">
    <div class="panel-menu">
      <div v-for="item in data" :key="item.title">
        <template v-if="item.panels">
          <base-panel elevation="2" tColor="white" bgColor="primary" :key="item" :id="item">
            <template v-slot:title>{{ item.title }}</template>
            <template v-slot:content
              ><p v-for="itm in item.panels" :key="itm" @click="toId(itm)">
                {{ itm }}
                <!-- <a :href="`#${itm}`">{{ itm }}</a> -->
              </p>
            </template>
          </base-panel>
        </template>
        <p v-else @click="toId(item.title)">{{ item.title }}</p>
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
              bgColor="primary"
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
  </div>
</template>
<script setup>
import BasePanel from '../base/BasePanel.vue'
function toId(id) {
  let elem = document.getElementById(id)
  elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
  console.log(id)
}
const data = [
  { panels: ['children1', 'children2', 'children3'], title: 'панель1' },
  { title: 'панель2' },
  { panels: ['children12', 'children22', 'children32', 'children42'], title: 'панель3' },
  { panels: ['children13', 'children23'], title: 'панель4' },
  { title: 'панель5' }
]
</script>

<style scoped>
.panel-layot {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 12px;
}
.panel-menu {
  position: fixed;
  width: 400px;
  scroll-margin-top: 20px;
}
.panels {
  grid-column: -1/-2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
</style>
