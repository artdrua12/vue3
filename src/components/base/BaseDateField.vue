<template>
  <div>
    <!-- <BaseTextfield id="menu-activator" v-model="formatDate" color="primary"> </BaseTextfield>
    <v-menu activator="#menu-activator">
      <v-date-picker v-model="date" color="#2c4957" show-adjacent-months></v-date-picker>
    </v-menu> -->

    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <BaseTextfield v-bind="props" v-model="formatDate" :label="label" @update:enter="onEnter">
        </BaseTextfield>
      </template>
      <v-date-picker v-model="currentDate" color="#2c4957" show-adjacent-months></v-date-picker>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import { useDate } from 'vuetify'
import BaseTextfield from './BaseTextfield.vue'
const { label, date } = defineProps({
  label: { type: String, default: '' },
  date: { type: String, default: '2' }
})
const emit = defineEmits(['update:enter'])
const dateUtils = useDate()
const currentDate = ref()
const formatDate = computed({
  get() {
    return currentDate.value ? dateUtils.format(currentDate.value, 'keyboardDate') : null
  },
  set(value) {
    currentDate.value = value
  }
})


function onEnter() {
  emit('update:enter')
}
watch(formatDate, () => {
  console.log('newValue', formatDate.value)
  emit('update:enter', formatDate.value)
})
</script>

<style scoped></style>
