<template>
  <div class="baseIsMissing">
    <component
      :is="getComponent(props.additionData)"
      :key="index"
      :label="props.label"
      :array="props.array"
      :item-text="props.text"
      :items="props.propss"
      :placeholder="props.placeholder"
      :disabled="Boolean(valueCheckbox)"
      @update:enter="emit('find')"
    ></component>
    <BaseCheckbox v-model="valueCheckbox" label="Отсутствует"></BaseCheckbox>
  </div>
</template>

<script setup>
import BaseCheckbox from './BaseCheckbox.vue'
import BaseTextfield from './BaseTextfield.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseSwich from './BaseSwich.vue'
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
  label: { type: String, default: '' },
  itemValue: { type: String, default: '' },
  itemText: { type: String, default: '' },
  value: { type: String, default: '' },
  additionData: { type: String, required: true }
})
const emit = defineEmits(['find']) //событие для запуска поиска
let valueCheckbox = ref(false)

const allComponents = {
  BaseAutocomplete,
  BaseTextfield,
  BaseCheckbox,
  BaseCombobox,
  BaseSwich
}

function getComponent(type) {
  return allComponents[type]
}
</script>

<style scoped>
.baseIsMissing {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0px 12px;
}
</style>
