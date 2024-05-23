<template>
  <div class="constructor">
    <v-btn
      icon="mdi-plus-box"
      color="#465f6b"
      rounded="0"
      class="addBtn"
      :disabled="props.disabled"
      @click="add"
    >
    </v-btn>
    <fieldset
      v-for="(item, index) in filterData"
      :key="index"
      class="adaptiveGrid adaptiveGrid--setting"
    >
      <legend>
        {{ props.label }}
      </legend>
      <slot :item="item"></slot>

      <slot name="btnRemove" :index="index">
        <v-icon
          v-if="props.filterData.length != 1"
          color="red"
          icon="mdi-close-box"
          class="btnRemove"
          @click="remove(item)"
        ></v-icon
      ></slot>
    </fieldset>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const data = defineModel('data', { type: Array })
const props = defineProps({
  label: { type: String, default: '' },
  defaultData: { type: [Array, Object], required: true },
  filterData: { type: [Array, Object], required: true }, //отфильтрованные значения из data
  disabled: { type: Boolean, default: false } //выключает кнопку добавления
})

function add() {
  data.value.push(JSON.parse(JSON.stringify(props.defaultData)))
}
function remove(item) {
  const index = data.value.findIndex((dataItem) => dataItem == item)
  data.value.splice(index, 1)
}
if (props.filterData.length == 0) {
  add()
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

.adaptiveGrid--setting {
  overflow: visible;
  background-color: rgba(246, 194, 160, 0.122);
  border: 1px solid #2c4957;
  border-radius: 4px;
  padding: 25px 24px 10px 24px;
}

legend {
  font-weight: 500;
  font-size: 17px;
  color: #2c4957;
  padding: 0px 5px;
  line-height: 1;

  -webkit-line-clamp: 2; /* Число отображаемых строк */
  display: -webkit-box; /* Включаем флексбоксы */
  -webkit-box-orient: vertical; /* Вертикальная ориентация */
  overflow: hidden;
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
  top: -5px;
  left: -3px;
}

.btnRemove {
  font-size: 23px;
  position: absolute;
  bottom: calc(50% - 4px);
  left: -51px;
  z-index: 2;
  background-color: #ebebeb;
}
</style>
