<template>
  <div>
    <!-- <base-text-field id="menu-activator" v-model="formatDate" color="primary"> </base-text-field>
    <v-menu activator="#menu-activator">
      <v-date-picker v-model="date" color="#2c4957" show-adjacent-months></v-date-picker>
    </v-menu> -->

    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <base-text-field
          v-bind="props"
          v-model="formatDate"
          :label="propsParent.label"
          @update:enter="onEnter"
        >
        </base-text-field>
      </template>
      <v-date-picker v-model="date" color="#2c4957" show-adjacent-months></v-date-picker>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useDate } from 'vuetify'
import BaseTextField from './BaseTextField.vue'
const propsParent = defineProps({
  label: { type: String, default: '' }
})
const emit = defineEmits(['update:enter'])
const dateUtils = useDate()
const date = ref()
const formatDate = computed({
  get() {
    return date.value ? dateUtils.format(date.value, 'keyboardDate') : null
  },
  set(value) {
    date.value = value
  }
})

function onEnter() {
  emit('update:enter')
}
</script>

<style scoped></style>
