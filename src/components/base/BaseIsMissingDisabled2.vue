<template>
  <div class="baseIsMissing">
    <slot class="field"></slot>
    <BaseCheckbox v-model="model" :label="props.label" class="ckeckbox"></BaseCheckbox>
  </div>
</template>

<script setup>
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { defineProps } from 'vue'
const props = defineProps({
  label: { type: String, default: 'Отсутствует' },
  value: { type: Boolean, default: false }
})
const model = defineModel({ type: Boolean })
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
