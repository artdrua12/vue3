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
    v-model="checkbox"
    :label="props.label"
    class="base"
    :disabled="props.disabled"
    hide-details
    color="#546e7a"
  ></v-checkbox>
</template>

<script setup>
// import { ref, watch } from 'vue'
// import { defineEmits } from 'vue'
const checkbox = defineModel({ type: Boolean, default: false })
const props = defineProps({
  label: { type: String, default: '' },
  // value: {
  //   type: Boolean,
  //   default: false
  // },
  disabled: {
    type: Boolean,
    default: false
  },
  additionData: { type: Boolean, default: true }
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
<!-- не имеет scoope поэтому эти стили распространяются и на baseDataField? BaseAutocomplete и другие с классом base, родные vuetify не изменяются  -->
<style>
.base.v-checkbox .v-selection-control {
  min-height: 20px;
  /* height: 30px; */
  margin-left: -10px;
  display: flex;
}
.base .v-selection-control .v-label {
  font-weight: 400;
  color: #031f2d;
  font-size: 16px;

  text-overflow: ellipsis;
  line-height: 1;
  overflow: hidden;
}
</style>
