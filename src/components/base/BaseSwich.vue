<template>
  <div>
    <v-switch
      v-model="checkbox"
      color="#546e7a"
      :label="props.label"
      class="base"
      hide-details
      :disabled="props.disabled"
      @change="onChange"
    ></v-switch>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { defineEmits } from 'vue'
const props = defineProps({
  label: { type: String, default: '' },
  value: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const checkbox = ref(props.value)
watch(
  () => props.value,
  (newVal) => {
    checkbox.value = newVal
  }
)
const emit = defineEmits(['update:value'])
function onChange() {
  emit('update:value', checkbox.value)
}
</script>

<style scoped>
.base.v-switch .v-selection-control {
  min-height: 20px;
  height: 30px;
  margin-left: -10px;
}
</style>
