<template>
  <!-- <v-checkbox
    v-model="checkbox"
    :label="props.label"
    class="base"
    hide-details
    :disabled="props.disabled"  
    color="#546e7a"
    @change="onChange"
  ></v-checkbox> -->
  <v-checkbox
    :label="props.label"
    class="base"
    hide-details
    :disabled="props.disabled"  
    color="#546e7a"
  ></v-checkbox>
</template>

<script setup>
// import { ref, watch } from 'vue'
// import { defineEmits } from 'vue'
const props = defineProps({
  label: { type: String, default: '' },
  // value: {
  //   type: Boolean,
  //   default: false
  // },
  disabled: {
    type: Boolean,
    default: false
  }
})
// const checkbox = ref(props.value)
// watch(
//   () => props.value,
//   (newVal) => {
//     checkbox.value = newVal
//   }
// )
// const emit = defineEmits(['update:value'])
// function onChange() {
//   emit('update:value', checkbox.value)
// }
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
