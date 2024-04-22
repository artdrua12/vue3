<template>
  <v-checkbox
    v-model="checkbox"
    :label="props.label"
    class="base"
    hide-details
    :disabled="props.disabled"
    color="#546e7a"
  ></v-checkbox>
</template>

<script setup>
const checkbox = defineModel({ type: Boolean, default: false })
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
