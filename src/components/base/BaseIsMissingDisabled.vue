<template>
  <div class="baseIsMissing">
    <slot class="field" :disabled="true"></slot>
    <BaseCheckbox
      v-model="checkbox"
      :label="props.label"
      :disabled="disabled"
      class="ckeckbox"
    ></BaseCheckbox>
  </div>
</template>

<script setup>
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['change'])
const props = defineProps({
  label: { type: String, default: 'Отсутствует' },
  defaultData: { type: [String, Object, Array], default: null },
  disabled: { type: Boolean, default: false }
})
// то куда потставляются данные
const data = defineModel('data', {
  type: [String, Object, Array, Number],
  default: null
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
</script>

<style scoped>
.baseIsMissing {
  width: 100%;
  display: flex;
  gap: 0px 12px;
  align-content: center;
}
.field {
  flex: content 1 1;
  min-width: 100px;
}
.ckeckbox {
  flex: content 0 0;
  overflow: hidden;
  margin-top: -6px;
}
</style>
