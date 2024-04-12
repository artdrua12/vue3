<template>
  <v-radio-group v-model="model"  inline  color="#546e7a" class="base">
  <v-radio label="На серийно выпускаемую продукцию" value="one"></v-radio>
  <v-radio label="На партию транспортных средств" value="two"></v-radio>
</v-radio-group>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },

  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
.base.v-checkbox .v-selection-control {
  min-height: 20px;
  height: 30px;
  margin-left: -10px;
}
.base .v-selection-control .v-label {
  font-weight: 600;
  color: #031f2d;
  font-size: 16px;
}
</style>
