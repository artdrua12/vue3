<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel
      class="base rounded-0"
      :elevation="props.elevation"
      :bg-color="props.bgColor"
      value="1"
    >
      <v-expansion-panel-title :color="props.color">
        <slot name="title"></slot>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot></slot>
      </v-expansion-panel-text>
      <slot name="bottom"></slot>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
const props = defineProps({
  elevation: { type: String, default: '5' }, //тень
  //1-панель будет открыта при отрисовке
  bgColor: { type: String, default: '#e7e7e7' }, // фон панели заголовка
  color: { type: String, default: '#546e7a' } // цвет панели заголовка
})
const panel = defineModel('openPanel', { type: String })
</script>

<style scoped>
.base.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 30px;
  height: 40px;
}
.base .v-expansion-panel-title {
  min-height: 30px;
  height: 40px;
}

::v-deep .v-expansion-panel-text__wrapper {
  padding: 0px 0px 0px 0px;
}
</style>
