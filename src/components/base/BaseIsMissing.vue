<template>
  <div class="adaptiveGrid">
    <BaseCheckbox
      v-model="checkbox"
      :disabled="props.disabled"
      :label="props.label"
      class="full mb-3"
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
  defaultData: { type: [Array, Object, String, Number, null, undefined], default: null },
  disabled: { type: Boolean, default: false },
  invert: { type: Boolean, default: false } // инверсия галочки чекбокса
})
const data = defineModel('data', { type: [Array, Object, String, Number, null], required: true }) //место, где изменяем данные
const checkbox = defineModel({
  type: Boolean,
  set(value) {
    // при извенении чекбокса подставляем дефолтные значения
    data.value = props.defaultData ? JSON.parse(JSON.stringify(props.defaultData)) : null
    emit('change')
    return value
  }
})
</script>
