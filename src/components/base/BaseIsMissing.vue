<template>
  <div class="baseIsMissing">
    <component
      :is="getComponent(props.dataSlot)"
      :key="index"
      :label="props.label"
      :array="props.array"
      :item-text="props.text"
      :items="props.propss"
      :placeholder="props.placeholder"
      :disabled="valueCheckbox"
      @update:enter="emit('find')"
    ></component>
    <base-check-box v-model:value="valueCheckbox" label="Отсутствует"></base-check-box>
  </div>
</template>

<script setup>
import BaseCheckBox from './BaseCheckBox.vue'
import BaseTextField from './BaseTextField.vue'
import BaseAutocomplite from './BaseAutocomplite.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
  label: { type: String, default: '' },
  itemValue: { type: String, default: '' },
  itemText: { type: String, default: '' },
  value: { type: String, default: '' },
  dataSlot: { type: String, required: true }
})
const emit = defineEmits(['find']) //событие для запуска поиска
let valueCheckbox = ref(false)

const allComponents = {
  BaseAutocomplite,
  BaseTextField,
  BaseCheckBox,
  BaseCombobox
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
