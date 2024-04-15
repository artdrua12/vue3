<template>
  <div class="constructor">
    <v-btn icon="mdi-plus-box" color="#2c4957" class="addButton" @click="add"> </v-btn>

    <div v-if="isOne" class="adaptiveGrid">
      <template v-for="(obj, indexObj) in fieldsArray" :key="indexObj">
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
          class="bord"
          @update:enter="emit('find')"
        ></component>
      </template>
    </div>

    <template v-else>
      <fieldset
        v-for="(obj, indexObj) in fieldsArray"
        :key="indexObj + 100"
        class="adaptiveGrid adaptiveGrid--setting bord"
      >
        <legend>
          {{ props.label }}
          <v-icon
            v-if="fieldsArray.length != 1"
            color="red"
            icon="mdi-delete"
            size="23"
            @click="remove"
          ></v-icon>
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
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import BaseDateField from './BaseDateField.vue'
import BaseAutocomplete from './BaseAutocomplete.vue'
import BaseTextField from './BaseTextField.vue'
import BaseCheckBox from './BaseCheckBox.vue'
import BaseSlot from './BaseSlot.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
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
  position: relative;
  width: 100%;
  padding: 0px 0px 10px 50px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.adaptiveGrid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 12px;
}
.adaptiveGrid--setting {
  overflow: visible;
  background-color: rgba(105, 128, 138, 0.122);
  border: 1px dotted #2c4957;
  padding: 25px 24px 10px 24px;
}
.bord {
  position: relative;
}

legend {
  font-weight: 500;
  font-size: 17px;
  color: #2c4957;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bord::before {
  width: 40px;
  height: calc(100% + 50px);
  content: '';
  position: absolute;
  left: -40px;
  bottom: calc(50% + 7px);
  border-bottom: 1px dotted #2c4957;
  border-left: 1px dotted #2c4957;
}

.bord:first-of-type::before {
  height: 50%;
}

.addButton {
  position: absolute;
  top: -15px;
  left: -9px;
  width: 40px;
  height: 40px;
  z-index: 2;

  background-color: #ebebeb;
}

@media (max-width: 1200px) {
  .adaptiveGrid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
