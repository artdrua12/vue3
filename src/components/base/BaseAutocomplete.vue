<template>
  <v-autocomplete
    :label="props.label"
    :items="props.items"
    :item-title="props.itemText"
    :item-value="props.itemValue"
    density="compact"
    variant="outlined"
    class="base"
    bg-color="white"
    dirty
    clearable
    :menu-props="{
      width: 100,
      offset: 2,
      contentClass: 'dropdown'
    }"
    :rules="props.rules"
    @keyup.enter="onEnter"
  >
  </v-autocomplete>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['update:enter'])

const props = defineProps({
  label: { type: String, default: '' },
  itemValue: { type: String, default: 'value' },
  itemText: { type: String, default: 'value' },
  value: { type: String, default: '' },
  items: {
    type: Array,
    default() {
      return []
    }
  },
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

<style>
.v-list-item-title {
  white-space: pre-wrap;
}
</style>
