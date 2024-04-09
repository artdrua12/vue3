<template>
  <v-text-field
    :label="props.label"
    clearable
    variant="outlined"
    density="compact"
    class="base"
    persistent-counter
    :rules="[rules.required]"
    bg-color="white"
    :placeholder="props.placeholder"
    dirty
    @keyup.enter="onEnter"
  ></v-text-field>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['update:enter'])
const rules = {
  required: (value) => !!value || 'Field is required'
}
const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' }
})
function onEnter() {
  emit('update:enter')
}
</script>
<!-- не имеет scoope поэтому эти стили распространяются и на baseDataField? BaseAutocomplete и другие с классом base, родные vuetify не изменяются  -->
<style>
.base .v-field__input {
  min-height: 25px;
  /* height: 27px; */
  padding-top: 1px;
  padding-bottom: 3px;
}
.base .v-input__details {
  min-height: 10px;
  padding-top: 0px;
}
/* .base .v-field--focused input {
  padding-top: 2px;
} */

.base .v-field--variant-outlined .v-field-label--floating {
  transform: translateY(-70%);
  color: #2c4957;
  font-size: 14px;
  font-weight: 600;
}
</style>
