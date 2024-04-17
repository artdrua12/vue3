<template>
  <div>
    <!-- <BaseTextfield id="menu-activator" v-model="formatDate" color="primary"> </BaseTextfield>
    <v-menu activator="#menu-activator">
      <v-date-picker v-model="date" color="#2c4957" show-adjacent-months></v-date-picker>
    </v-menu> -->

    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <BaseTextfield
          v-bind="props"
          v-model="formatDate"
          :label="propsParent.label"
          @update:enter="onEnter"
        >
        </BaseTextfield>
      </template>
      <v-date-picker v-model="date" color="#2c4957" show-adjacent-months></v-date-picker>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useDate } from 'vuetify'
import BaseTextfield from './BaseTextfield.vue'
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
