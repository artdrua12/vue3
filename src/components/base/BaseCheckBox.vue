<template>
  <div>
    <v-checkbox v-model="checkbox1" :label="props.label" class="base" hide-details></v-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const checkbox1 = ref('false')
const props = defineProps({
  label: { type: String, default: '' }
})
</script>
<style>
.base.v-checkbox .v-selection-control {
  min-height: 20px;
  height: 30px;
  margin-left: -10px;
}
</style>
