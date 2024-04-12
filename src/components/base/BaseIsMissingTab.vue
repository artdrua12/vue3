<template>
  <base-check-box
    v-model="valueCheckbox"
    :label="props.label"
    style="grid-column: 1/-1"
    class="mb-5"
    @change="changingCheckbox"
  ></base-check-box>
  <div v-if="!valueCheckbox" class="adaptiveGrid">
    <component
      :is="getComponent(i.type)"
      v-for="(i, index) in fields"
      :key="index"
      :style="{
        'grid-column': `${i.width == 'all' ? '1/-1' : 'span ' + i.width}`
      }"
      :label="i.label"
      :fields="i.fields"
    ></component>
  </div>
</template>

<script setup>
import BaseCheckBox from './BaseCheckBox.vue'
import BaseTextField from './BaseTextField.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor.vue'
import BaseIsMissingTab from '@/components/base/BaseIsMissingTab.vue'
import { ref, defineProps } from 'vue'
const props = defineProps({
  label: { type: String, default: 'отсутствует' },
  fields: {
    type: Object,
    default() {
      return {}
    }
  }
})

let valueCheckbox = ref(false)
const fields = ref(props.fields)
const defaultFields = JSON.parse(JSON.stringify(props.fields)) // сохраняем первоначальное значение табов, которые могут отсутствовать

const allComponents = {
  BaseAutocomplete,
  BaseTextField,
  BaseTextarea,
  BaseCheckBox,
  BaseCombobox,
  BaseRecursiveConstructor,
  BaseIsMissingTab
}
function changingCheckbox() {
  if (valueCheckbox.value) {
    console.log('changingCheckbox true')
    fields.value = JSON.parse(JSON.stringify(defaultFields))
  }
}
function getComponent(type) {
  console.log('type', type)
  return allComponents[type]
}
</script>

<style scoped>
.adaptiveGrid {
  grid-column: 1/-1;
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 12px;
  overflow: visible;
}

@media (max-width: 1200px) {
  .adaptiveGrid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
