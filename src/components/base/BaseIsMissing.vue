<template>
  <BaseCheckbox
    v-model="valueCheckbox"
    :label="props.label"
    style="grid-column: 1/-1"
    :disabled="props.disabled"
    class="mb-5"
    @change="changingCheckbox"
  ></BaseCheckbox>
  <div v-if="isReverce ? valueCheckbox : !valueCheckbox" class="adaptiveGrid">
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
import BaseCheckbox from './BaseCheckbox.vue'
import BaseTextfield from './BaseTextfield.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseSlot from './BaseSlot.vue'
import { ref, defineProps, defineModel } from 'vue'

const props = defineProps({
  label: { type: String, default: 'отсутствует' },
  fields: {
    type: Object,
    default() {
      return {}
    }
  },
  // что бы появлялся компонент когда сheckbox поставлен, если false - наоборот
  additionData: {
    type: Boolean,
    default: true
  },
  disabled: { type: Boolean, default: false },
  value: { type: Boolean, default: false }
})
const valueCheckbox = defineModel({ type: Boolean, default: false })
const isReverce = ref(props.additionData)
console.log('props.additionData', props.additionData)
const fields = ref(props.fields)
const defaultFields = JSON.parse(JSON.stringify(props.fields)) // сохраняем первоначальное значение табов, которые могут отсутствовать

const allComponents = {
  BaseAutocomplete,
  BaseTextfield,
  BaseTextarea,
  BaseCheckbox,
  BaseCombobox,
  BaseRecursiveConstructor,
  BaseIsMissing,
  BaseSlot
}
function changingCheckbox() {
  if (valueCheckbox.value) {
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
