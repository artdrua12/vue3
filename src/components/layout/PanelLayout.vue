<template>
  <div class="panel-layot">
    <div class="panel-menu">
      <v-btn icon="mdi-tune-variant" variant="text" @click="isOpen = true"></v-btn>
      <!-- <base-panel elevation="5" color="#bdbdbf" bg-color="none" :propsPanel="data"></base-panel> -->
      <!-- <div v-for="item in data" :key="item.title">
        <template v-if="item.panels">
          <base-panel :id="item" elevation="5" color="#bdbdbf" bg-color="none" :propsPanel="data">
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
      <BasePanelAcordions :props-panel="data"></BasePanelAcordions>
      <v-btn @click="testGreen">TEST green</v-btn>
      <v-btn @click="testRed">TEST red</v-btn>
    </div>

    <div class="panels">
      <div class="test">
        <div class="testc2" :class="{ onmenu: onmenu }">
          <h2 style="color: white; position: absolute; top: -55px; left: -100px">
            Система электронных паспортов РБ
          </h2>
          <h3 style="color: white; position: absolute; bottom: -30px; right: 20px">2024</h3>
          <h3 style="color: white; position: absolute; top: 30px; left: -100px">Один</h3>
          <h3 style="color: white; position: absolute; top: 60px; left: -100px">Два</h3>
          <h3 style="color: white; position: absolute; top: 90px; left: -100px">Три</h3>
          <h3 style="color: white; position: absolute; top: 120px; left: -100px">Четыре</h3>
          <h3 style="color: white; position: absolute; top: 150px; left: -100px">Пять</h3>
          <h3 style="color: white; position: absolute; top: 180px; left: -100px">Шесть</h3>
          <h3 style="color: white; position: absolute; top: 210px; left: -100px">Семь</h3>
        </div>
        <div class="testc">
          <v-btn icon="mdi-menu" variant="text" @click="onmenu = !onmenu"></v-btn>
          <h2 style="margin-left: 40px;">Какойто текст</h2>
          <v-text-field label="Label" variant="outlined"></v-text-field>
        </div>
      </div>
      <base-panel
        v-for="item in data"
        :id="item.title"
        :key="item.title"
        elevation="5"
        props-panel="1"
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
            props-panel="1"
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
import { useSnackbarStore } from '@/stores/snackStore'
const store = useSnackbarStore()
const isOpen = ref(false)
const onmenu = ref(false)
const data = [
  { panels: ['children11', 'children12', 'children13'], title: 'панель1' },
  { title: 'панель2' },
  { panels: ['children31', 'children32', 'children33', 'children34'], title: 'панель3' },
  { panels: ['children41', 'children42'], title: 'панель4' },
  { title: 'панель5' }
]
function testGreen() {
  store.setSnack({ text: 'Много текста Много текста Много текста Много текста ', type: 'info' })
}
function testRed() {
  store.setSnack({ text: 'Ошибка загрузки', type: 'error' })
}
</script>

<style scoped>
.test {
  width: 100%;
  container-type: inline-size;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.testc {
  grid-area: 1/1/-1/-1;
  width: 700px;
  height: 400px;
  background-color: red;
  margin: auto;
}
.testc2 {
  grid-area: 1/1/-1/-1;
  width: 700px;
  height: 400px;
  margin: auto;
  /* transition: clip-path .5s ease-out;
  clip-path: inset(0px 0px 0px 0px round 0px); */
  box-shadow: -100px 0px 0px 150px rgba(4, 4, 25, 0.7);
  transition: all 0.35s ease-out;
  position: relative;
  z-index: 0;
}
.onmenu {
  /* clip-path: inset(40px 0px 20px 100px round 15px 0px 0px 75px); */
  transform: scale(0.8) translate(87px, 20px);
  border-radius: 0px 0px 0px 70px;
  z-index: 1;
}

@container (min-width: 750px) {
  .testc {
    background-color: yellowgreen;
  }
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
</style>
