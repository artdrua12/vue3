<template>
  <v-expansion-panels  style="gap: 7px" class="base">
    <v-expansion-panel
      v-for="item in panel"
      :id="item"
      :key="item"
      :elevation="3"
      :title="item.title"
      color="#2c4957"
      :hide-actions="!item.panels"
      bg-color="red"
      static
      @click="toId(item.title)"
    >
      <v-expansion-panel-text v-if="item.panels" elevation="0">
        <v-btn
          v-for="itm in item.panels"
          :key="itm"
          class="menu-button rounded-0"
          block
          @click="toId(itm)"
          >{{ itm }}</v-btn
        >
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  elevation: { type: String, default: '5' }, //тень
  propsPanel: { type: Array }, //1-панель будет открыта при отрисовке
  bgColor: { type: String, default: '#fff3e4' }, // фон панели заголовка
  tColor: { type: String, default: '#546e7a' } // цвет панели заголовка
})
const panel = ref('')
panel.value = props.propsPanel
function toId(id) {
  let elem = document.getElementById(id)
  elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<style scoped>
.base.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 30px;
}
.base .v-expansion-panel-title {
  min-height: 30px;
}
::v-deep .v-expansion-panel-text__wrapper {
  padding: 0px 0px 0px 0px;
}
::v-deep .v-expansion-panel-title--active {
  /* background-color: white !important;
  color: #628a9e !important; */
  font-weight: bolder;
  font-size: 18px;
}
</style>
