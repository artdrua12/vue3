<template>
  <div class="constructor">
    <fieldset v-for="(obj, indexObj) in fieldsArray" :key="indexObj + 100" class="adaptiveGrid">
      <div v-if="fieldsArray.length == indexObj + 1" class="button">
        <v-icon color="green" icon="mdi-plus-box" class="bt" @click="add"> </v-icon>
        <v-icon color="red" icon="mdi-delete" class="ml-5 bt" @click="remove"> </v-icon>
      </div>
      <legend>
        {{ props.label }}
      </legend>

      <component
        :is="getComponent(item.type)"
        v-for="(item, index) in obj"
        :key="index"
        v-model="item.value"
        :style="{
          'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
        }"
        :label="item.label"
        :addition-data="item.additionData"
        :items="item.items"
        :item-text="item.text"
        :item-value="item.itemValue"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :fields="item.fields"
        @update:enter="emit('find')"
      ></component>
    </fieldset>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import BaseDateField from './BaseDateField.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseTextField from './BaseTextField.vue'
import BaseCheckBox from './BaseCheckBox.vue'
import BaseSlot from './BaseSlot.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
const props = defineProps({
  label: { type: String, required: true },
  fields: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['find']) //событие для запуска поиска

const allComponents = {
  BaseDateField,
  BaseAutocomplete,
  BaseTextField,
  BaseCheckBox,
  BaseCombobox,
  BaseTextarea,
  BaseSlot
}

let fieldsArray = ref(props.fields)
const defaultFields = JSON.parse(JSON.stringify(fieldsArray.value[0]))

function getComponent(type) {
  return allComponents[type]
}

function add() {
  fieldsArray.value.push(JSON.parse(JSON.stringify(defaultFields)))
}
function remove() {
  fieldsArray.value.pop()
}
</script>

<style scoped>
.constructor {
  width: 100%;
  padding-left: 50px;
}
.adaptiveGrid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 12px;
  padding: 25px 24px 10px 24px;
  overflow: visible;
}
.adaptiveGrid:last-child > legend::before {
  border: none;
}
.adaptiveGrid:first-child::after {
  content: '';
  width: 18px;
  height: 18px;
  background-color: #2c4957;
  position: absolute;
  left: -50px;
  bottom: calc(100% + 14px);
}
.fullWidth {
  grid-column: 1/-1;
}
legend {
  padding: 0px 10px 5px 10px;
  font-weight: 500;
  font-size: 17px;
  color: #2c4957;
}
legend::after {
  width: 40px;
  height: 50%;
  content: '';
  position: absolute;
  left: -40px;
  bottom: 50%;
  border-bottom: 1px solid #2c4957;
  border-left: 1px solid #2c4957;
}
legend::before {
  width: 40px;
  height: calc(50% + 40px);
  content: '';
  position: absolute;
  left: -40px;
  top: 50%;
  border-left: 1px solid #2c4957;
}

legend:last-child {
  border: none;
}
fieldset {
  width: 100%;
  border: 0px solid #2c4957;
  border-left: 0px solid #2c4957;
  overflow: hidden;
  background-color: rgba(105, 128, 138, 0.122);
  margin-bottom: 20px;
}
.button {
  position: absolute;
  right: 20px;
  top: -30px;
}
.bt {
  background-color: #ebebeb;
}

@media (max-width: 1200px) {
  .adaptiveGrid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
