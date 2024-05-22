<template>
  <v-expansion-panels v-model="panel" style="gap: 1px" class="base" variant="popout">
    <v-expansion-panel
      v-for="item in props.data"
      :key="item.id"
      :elevation="3"
      :title="item.title"
      color="#2c4957"
      :hide-actions="!item.tabs"
      bg-color="#ebebeb"
      @click="toId(item.id)"
    >
      <v-expansion-panel-text class="elevetion-0">
        <v-btn
          v-for="itm in item.tabs"
          :key="itm"
          v-model="tab"
          class="menu-button rounded-0"
          block
          @click="updateTab(itm)"
          >{{ itm.title }}</v-btn
        >
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { defineEmits, defineModel } from 'vue'
// const emit = defineEmits(['update:tab'])
const props = defineProps({
  elevation: { type: String, default: '5' }, //тень
  data: { type: Array, default: [] }, //1-панель будет открыта при отрисовке
  bgColor: { type: String, default: '#fff3e4' }, // фон панели заголовка
  tColor: { type: String, default: '#546e7a' } // цвет панели заголовка
})

const panel = defineModel('panel', { type: Number, required: true })
const tab = defineModel('tab', { type: String, required: true })

function toId(id) {
  let elem = document.getElementById(id)
  elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function updateTab(itm) {
  // emit('update:tab', item.title)
  tab.value = itm.component
}
</script>

<style scoped>
::v-deep .v-expansion-panel-text__wrapper {
  padding: 0px 0px 0px 0px;
}
::v-deep .v-expansion-panel-title--active {
  font-weight: bolder;
  font-size: 18px;
}
::v-deep .v-btn__content {
  white-space: pre-wrap;
  padding: 10px 5px;
  text-align: left;
}
.v-btn.v-btn--density-default {
  height: auto;
  text-align: center;
}
</style>
