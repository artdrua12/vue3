<template>
  <v-text-field
    :label="props.label"
    clearable
    variant="outlined"
    density="compact"
    class="base"
    persistent-counter
    :rules="props.rules"
    bg-color="white"
    :placeholder="props.placeholder"
    dirty
    :hint="props.hint"
    @keyup.enter="onEnter"
  ></v-text-field>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['update:enter'])
const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rules: {
    type: [Array, Object],
    default() {
      return []
    }
  },
  hint: { type: String, default: '' }
})
function onEnter() {
  emit('update:enter')
}
</script>
<!-- не имеет scoope поэтому эти стили распространяются и на baseDataField? BaseAutocomplete и другие с классом base, родные vuetify не изменяются  -->
<style>
/* .v-field__input {
  min-height: 25px;
  height: 27px;
  min-height: 34px;
  padding-top: 1px;
  padding-bottom: 3px;
  line-height: 1.2;
} */
</style>
