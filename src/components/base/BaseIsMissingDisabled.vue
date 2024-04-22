<template>
  <div class="baseIsMissing">
    <component
      :is="getComponent(i.type)"
      v-for="(i, index) in fields"
      :key="index"
      :label="i.label"
      :fields="i.fields"
      :disabled="props.additionData ? valueCheckbox : !valueCheckbox"
      class="field"
      @update:enter="emit('find')"
    ></component>
    <BaseCheckbox v-model="valueCheckbox" :label="props.label" class="ckeckbox"></BaseCheckbox>
  </div>
</template>

<script setup>
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseSwich from '@/components/base/BaseSwich.vue'
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
  label: { type: String, default: 'Отсутствует' },
  itemValue: { type: String, default: '' },
  itemText: { type: String, default: '' },
  value: { type: String, default: '' },
  fields: {
    type: Object,
    default() {
      return null
    }
  },
  // что бы disabled компонент когда сheckbox поставлен, если false - наоборот
  additionData: {
    type: Boolean,
    default: true
  }
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
  display: flex;
  gap: 0px 12px;
}
.field {
  flex: content 1 1;
  min-width: 100px;
}
.ckeckbox {
  flex: content 0 1;
  overflow: hidden;
}
</style>
