<template>
  <v-expansion-panels >
    <v-expansion-panel
      class="base rounded-0"
      elevation="5"
      bg-color="#fff3e4"
    >
      <v-expansion-panel-title color="#3f3c3c" >
        <slot name="title"></slot>
      </v-expansion-panel-title>
      <slot name="main"></slot>
      <v-expansion-panel-text>
        <slot name="addition"></slot>
      </v-expansion-panel-text>
      <slot name="bottom"></slot>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.base.v-expansion-panel--active
  > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 30px;
  height: 40px;
}
.base .v-expansion-panel-title {
  min-height: 30px;
  height: 40px;
}
</style>
