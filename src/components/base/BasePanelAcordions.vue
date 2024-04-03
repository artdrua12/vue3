<template>
  <v-expansion-panels style="gap: 1px" class="base" variant="popout" >
    <v-expansion-panel
      v-for="item in panel"
      :id="item"
      :key="item"
      :elevation="3"
      :title="item.title"
      color="#2c4957"
      :hide-actions="!item.items"
      bg-color="#ebebeb"
      @click="toId(item.title)"
    >
      <v-expansion-panel-text v-if="item.items" class="elevetion-0" >
        <v-btn
          v-for="itm in item.items"
          :key="itm"
          class="menu-button rounded-0"
          block
          @click="to(itm)"
          >{{ itm.title }}</v-btn
        >
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['update:tab'])
const props = defineProps({
  elevation: { type: String, default: '5' }, //тень
  propsPanel: { type: Array, default: [] }, //1-панель будет открыта при отрисовке
  bgColor: { type: String, default: '#fff3e4' }, // фон панели заголовка
  tColor: { type: String, default: '#546e7a' } // цвет панели заголовка
})
const panel = ref('')
panel.value = props.propsPanel
function toId(id) {
  let elem = document.getElementById(id)
  elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
function to(item) {
  console.log('item', item.title)
  emit('update:tab', item.title)
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
}
</style>
