<template>
  <v-autocomplete
    v-model="value"
    :label="props.label"
    :items="props.items"
    :item-title="props.itemText"
    :item-value="props.itemValue"
    density="compact"
    variant="outlined"
    class="base"
    bg-color="white"
    :chips="props.chips"
    closable-chips
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
  itemValue: { type: [String, Object], default: 'value' },
  itemText: { type: [String, Object], default: 'value' },
  // value: { type: [String, Object], default: '' },
  chips: { type: Boolean, default: false },
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
let value = defineModel({ type: [Object, Array, String, Number, undefined, null], default: [] })
function onEnter() {
  emit('update:enter')
}
</script>

<style>
.v-list-item-title {
  white-space: pre-wrap;
}
</style>
