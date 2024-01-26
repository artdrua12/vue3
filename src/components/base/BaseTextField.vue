<template>
  <v-text-field
    :label="props.label"
    clearable
    variant="outlined"
    density="compact"
    v-model="val"
    class="base"
    persistent-counter
    :rules="[rules.required]"
    bg-color="white"
  ></v-text-field>
</template>

<script setup>
import { ref, defineProps } from "vue";
const rules = {
  required: value => !!value || "Field is required",
};
const val = ref("");
const props = defineProps({
  label: { type: String, default: "" },
});
</script>
<!-- не имеет scoope поэтому эти стили распространяются и на baseDataField? BaseAutocomplite и другие с классом base, родные vuetify не изменяются  -->
<style>
.base .v-field__input {
  min-height: 25px;
  height: 30px;
}
.base .v-input__details {
  min-height: 10px;
  padding-top: 2px;
}
</style>
