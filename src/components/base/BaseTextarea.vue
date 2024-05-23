<template>
  <v-textarea
    v-model="model"
    :label="props.label"
    variant="outlined"
    density="compact"
    class="base"
    :rules="props.rules"
    bg-color="white"
    dirty
    auto-grow
    clearable
    @keyup.enter="onEnter"
  ></v-textarea>
</template>

<script setup>
import { defineProps, defineEmits, defineModel } from 'vue'
const model = defineModel({ type: String })
const emit = defineEmits(['update:enter'])
const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rules: {
    type: [Array, Object],
    default() {
      return []
    }
  }
})
function onEnter() {
  emit('update:enter')
}
</script>
<!-- не имеет scoope поэтому эти стили распространяются и на baseDataField? BaseAutocomplete и другие с классом base, родные vuetify не изменяются  -->
<style scoped></style>
