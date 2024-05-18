<template>
  <BaseCheckbox v-model="model" :label="props.label" class="full"></BaseCheckbox>
  <slot v-if="!model" class="field"></slot>
</template>

<script setup>
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { defineProps } from 'vue'
const props = defineProps({
  label: { type: String, default: 'Отсутствует' }
})
const model = defineModel({ type: Boolean })
</script>
