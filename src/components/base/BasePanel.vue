<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel
      class="base rounded-0"
      :elevation="props.elevation"
      bg-color="#fff3e4"
      value="1"
    >
      <v-expansion-panel-title color="#3f3c3c">
        <slot name="title"></slot>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot name="content"></slot>
      </v-expansion-panel-text>
      <slot name="bottom"></slot>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
  elevation: { type: String, default: '5' },
  propsPanel: { type: String, default: '' }
})
const panel = ref('')
panel.value = props.propsPanel
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
