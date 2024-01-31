<template>
  <div>
    <v-switch
      color="#10a410"
      v-model="checkbox1"
      :label="props.label"
      class="base"
      hide-details
    ></v-switch>
  </div>
</template>

<script setup>
import { ref } from "vue";
const checkbox1 = ref("false");
const props = defineProps({
  label: { type: String, default: "" },
});
</script>
<style>
.base.v-switch .v-selection-control {
  min-height: 20px;
  height: 30px;
  margin-left: -10px;
}
</style>
