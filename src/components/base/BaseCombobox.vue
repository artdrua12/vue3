<template>
  <v-combobox
    :label="props.label"
    :items="props.items"
    :item-title="props.itemText"
    :item-value="props.itemValue"
    density="compact"
    variant="outlined"
    class="base"
    prepend-inner-icon="mdi-checkbox-multiple-blank-outline"
    bg-color="white"
    :menu-props="{
      width: 100,
      offset: 2,
      contentClass: 'dropdown'
    }"
    clearable
    multiple
    closable-chips
    chips
    dirty
    :rules="props.rules"
    @keyup.enter="onEnter"
  ></v-combobox>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['update:enter'])

const props = defineProps({
  label: { type: String, default: '' },
  itemValue: { type: String, default: '' },
  itemText: { type: String, default: '' },
  value: { type: [String, Array], default: '' },
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
