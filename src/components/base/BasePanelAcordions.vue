<template>
  <v-expansion-panels style="gap: 1px" class="base" variant="popout">
    <v-expansion-panel
      v-for="item in data"
      :key="item.id"
      :elevation="3"
      :title="item.title"
      :hide-actions="!item.tabs"
      color="#2c4957"
      bg-color="#ebebeb"
      @click="toId(item)"
    >
      <v-expansion-panel-text class="elevetion-0">
        <v-btn
          v-for="itm in item.tabsEnabled"
          :key="itm"
          v-model="item.tab"
          class="menu-button rounded-0"
          block
          @click="updateTab(item, itm)"
          >{{ itm.title }}
        </v-btn>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
const data = defineModel({ type: Array })

function toId(item) {
  let elem = document.getElementById(item.id)
  elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
  openPanel(item)
}
function openPanel(item) {
  item.openPanel = '1'
}

function updateTab(item, itm) {
  // console.log('item, itm', item, itm)
  item.tab = itm.component
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
.v-btn.v-btn--density-default {
  height: auto;
  text-align: center;
}
</style>
