<template>
  <div>
    <BaseCheckbox
      v-model="checkbox"
      :disabled="props.disabled"
      :label="props.label"
      class="full mb-5"
    ></BaseCheckbox>
    <slot v-if="invert ? checkbox : !checkbox"></slot>
  </div>
</template>

<script setup>
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['change'])
const props = defineProps({
  label: { type: String, default: 'Отсутствует' },
  defaultData: { type: [Array, Object, String], default: null },
  disabled: { type: Boolean, default: false },
  invert: { type: Boolean, default: false }
})
const checkbox = defineModel({
  type: Boolean,
  set(value) {
    // при извенении чекбокса подставляем дефолтные значения
    data.value = JSON.parse(JSON.stringify(props.defaultData))
    emit('change')
    return value
  }
})
const data = defineModel('data', { type: [Array, Object, String], required: true })
</script>
