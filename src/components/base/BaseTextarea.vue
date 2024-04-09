<template>
  <v-textarea
    :label="props.label"
    variant="outlined"
    density="compact"
    class="base"
    :rules="[rules.required]"
    bg-color="white"
    rows="3"
    dirty
    auto-grow
    @keyup.enter="onEnter"
  ></v-textarea>
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
<style scoped></style>
