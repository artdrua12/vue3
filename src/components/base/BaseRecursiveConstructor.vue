<template>
  <div class="constructor">
    <v-btn
      icon="mdi-plus-box"
      color="#465f6b"
      rounded="0"
      :class="isOne ? 'addBtnOne' : 'addBtn'"
      @click="add"
    >
    </v-btn>
    <fieldset
      v-for="(obj, indexObj) in fieldsArray"
      :key="indexObj + 100"
      class="adaptiveGrid"
      :class="{ 'adaptiveGrid--setting': !isOne }"
    >
      <legend v-if="!isOne">
        {{ props.label }}
      </legend>

      <v-icon
        v-if="fieldsArray.length != 1"
        color="red"
        icon="mdi-close-box"
        size="23"
        class="removeBtn"
        @click="remove"
      ></v-icon>
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
import { ref, defineProps, defineEmits, computed } from 'vue'
import BaseDatefield from './BaseDatefield.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseTextfield from './BaseTextfield.vue'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseSlot from './BaseSlot.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor.vue'
const props = defineProps({
  label: { type: String, required: true, default: '.' },
  fields: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['find']) //событие для запуска поиска
const isOne = computed(() => {
  return Object.keys(fieldsArray.value[0]).length == 1
})
const allComponents = {
  BaseDatefield,
  BaseAutocomplete,
  BaseTextfield,
  BaseCheckbox,
  BaseCombobox,
  BaseTextarea,
  BaseRecursiveConstructor,
  BaseIsMissingDisabled,
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
  position: relative;
  width: 100%;
  padding: 0px 0px 10px 50px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.adaptiveGrid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 12px;
  border: none;
}
.adaptiveGrid--setting {
  overflow: visible;
  background-color: rgba(105, 128, 138, 0.122);
  border: 1px solid #2c4957;
  border-radius: 4px;
  padding: 25px 24px 10px 24px;
}

legend {
  font-weight: 500;
  font-size: 17px;
  color: #2c4957;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 5px;
}
.adaptiveGrid::before {
  width: 40px;
  height: 100%;
  content: '';
  position: absolute;
  left: -40px;
  bottom: calc(50% + 7px);
  border-bottom: 1px solid #2c4957;
  border-left: 1px solid #2c4957;
}
.adaptiveGrid::after {
  width: 40px;
  height: 100%;
  content: '';
  position: absolute;
  left: -40px;
  bottom: 0%;
  border-left: 1px solid #2c4957;
}

.adaptiveGrid:first-of-type::before {
  height: 50%;
}
.adaptiveGrid:last-of-type::after {
  border: none;
}
.addBtn,
.addBtnOne {
  width: 30px;
  height: 30px;
  font-size: 14px;
  z-index: 2;
  background-color: #ebebeb;
}
.addBtn {
  position: absolute;
  top: 3px;
  left: -3px;
}
.addBtnOne {
  position: relative;
  top: 5px;
  left: -55px;
}
.removeBtn {
  font-size: 25px;
  position: absolute;
  bottom: calc(50% - 4px);
  left: -51px;
  z-index: 2;
  background-color: #ebebeb;
}

@media (max-width: 1200px) {
  .adaptiveGrid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
