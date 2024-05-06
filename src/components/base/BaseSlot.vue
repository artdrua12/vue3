<template>
  <div>
    <p v-if="props.label" class="slot-title">{{ props.label }}</p>
    <div v-if="props.fields" class="slot">
      <component
        :is="getComponent(item.type)"
        v-for="(item, index) in props.fields"
        :key="index"
        v-model="item.value"
        :style="{
          'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
        }"
        :label="item.label"
        :addition-data="item.additionData"
        :item-text="item.text"
        :items="item.items"
        :fields="item.fields"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
      ></component>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseTextfield from './BaseTextfield.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'

const props = defineProps({
  label: { type: String, default: null },
  fields: {
    type: Object,
    default() {
      return null
    }
  }
})
const allComponents = {
  BaseTextfield,
  BaseCheckbox,
  BaseCombobox,
  BaseTextarea,
  BaseAutocomplete,
  BaseIsMissingDisabled
}
function getComponent(type) {
  return allComponents[type]
}
</script>

<style scoped>
.slot {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 0px 12px;
  margin-top: 12px;
}
.slot-title {
  grid-column: 1/-1;
  text-align: center;
  font-size: 19px;
  color: #546e7a;
  margin: 0px 0px 2px 0px;
}
</style>
