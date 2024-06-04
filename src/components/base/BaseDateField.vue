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

import BaseTextfield from './BaseTextfield.vue'
const { label, dater, disabled } = defineProps({
  label: { type: String, default: '' },
  dater: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:date'])
const currentDate = ref(new Date(dater || null))

const formatDate = computed({
  get() {
    return currentDate.value ? currentDate.value.toLocaleDateString() : null
  },
  set(value) {
    currentDate.value = value
  }
})
function undate() {
  emit('update:date', formatDate.value)
}

// watch(date, () => {
//   console.log('sss')
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

<!-- <template>
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
import { computed, defineProps, defineEmits } from 'vue'
import BaseTextfield from './BaseTextfield.vue'
const { label, date, disabled } = defineProps({
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:date'])
const currentDate = defineModel({
  type: Date
})
const formatDate = computed({
  get() {
    return currentDate.value ? currentDate.value.toLocaleDateString() : null
  },
  set(value) {
    currentDate.value = value
  }
})
function undate() {
  emit('update:date', formatDate.value)
}
</script>  -->
