<template>
  <div>
    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <BaseTextfield v-bind="props" v-model="formatDate" :label="label" :disabled="disabled">
        </BaseTextfield>
      </template>
      <v-date-picker
        v-model="currentDate"
        color="#2c4957"
        show-adjacent-months
        @update:model-value="undate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useDate } from 'vuetify'
import BaseTextfield from './BaseTextfield.vue'
const { label, date, disabled } = defineProps({
  label: { type: String, default: '' },
  date: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})
console.log(date)
const emit = defineEmits(['update:value'])
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
function undate() {
  emit('update:value', formatDate.value)
}

// watch(formatDate, () => {
//   emit('update:enter', formatDate.value)
// })
</script>

<!-- <template>
  <div>
    <BaseTextfield
      :value="formatDate"
      :label="props.label"
      :disabled="props.disabled"
      @click="show = true"
    >
    </BaseTextfield>
    <v-date-picker
      v-show="show"
      v-model="currentDate"
      color="#2c4957"
      show-adjacent-months
      @click="show = false"
    ></v-date-picker>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDate } from 'vuetify'
import BaseTextfield from '../base/BaseTextfield.vue'
const dateUtils = useDate()

const props = defineProps({
  label: { type: String, default: '' },
  date: { type: String, default: null },
  disabled: { type: Boolean, default: false }
})

const show = ref(false)
const currentDate = ref(props.date)
const formatDate = computed(() =>
  currentDate.value ? dateUtils.format(currentDate.value, 'keyboardDate') : null
)
</script> -->
