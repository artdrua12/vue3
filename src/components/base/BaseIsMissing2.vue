<template>
  <BaseCheckbox
    v-model="model"
    :disabled="props.disabled"
    :label="props.label"
    class="full mb-3"
  ></BaseCheckbox>
    <slot v-if="invert ? model : !model"></slot>
</template>

<script setup>
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['change'])
const model = defineModel({
  type: Boolean,
  set(value) {
    // при извенении чекбокса подставляем дефолтные значения
    data.value = JSON.parse(JSON.stringify(props.defaultData))
    emit('change')
    return value
  }
})
const data = defineModel('data', { type: [Array, Object], required: true })
const props = defineProps({
  label: { type: String, default: 'Отсутствует' },
  defaultData: { type: [Array, Object], required: true },
  disabled: { type: Boolean, default: false },
  invert: { type: Boolean, default: false }
})
</script>
