<template>
  <div class="constructor">
    <fieldset
      v-for="(item, index) in filterData"
      :key="index"
      class="adaptiveGrid item"
      :class="{ many: isOneField }"
    >
      <legend>
        <slot name="label" :index="index" :item="item">
          {{ props.label }}
        </slot>
      </legend>
      <slot :index="index" :item="item"></slot>

      <slot name="btnRemove" :index="index" :item="item">
        <v-btn
          v-if="isOneField"
          icon
          class="btnRemove"
          size="30"
          :disabled="props.disabled"
          @click="remove(item)"
        >
          <p>{{ index + 1 }}</p>
        </v-btn>
        <v-btn v-else size="30" icon class="btnOne" stacked :disabled="props.disabled" @click="add">
          <v-icon size="34" color="#69808a" icon="mdi-plus-circle"></v-icon>
        </v-btn>
      </slot>
    </fieldset>
    <v-btn
      v-show="isOneField"
      size="30"
      icon
      class="btnAdd"
      :disabled="props.disabled"
      @click="add"
    >
      <v-icon size="22" color="#69808a" icon="mdi-plus-circle"></v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const data = defineModel({ type: [Array, Object, String], required: true })
const props = defineProps({
  label: { type: String, default: '' },
  defaultData: { type: [Array, Object, String], required: true }, // значения которые добавляем по умолчанию
  filterData: { type: [Array, Object, String], required: true }, //отфильтрованные значения из data
  disabled: { type: Boolean, default: false } //выключает кнопку добавления
})

function add() {
  data.value.push(JSON.parse(JSON.stringify(props.defaultData)))
}
function remove(item) {
  const index = data.value.findIndex((dataItem) => dataItem == item)
  data.value.splice(index, 1)
}
const isOneField = computed(() => props.filterData.length > 1)

// если массив не приходит, заменяем тогда дефолтным значением
if (!props.filterData) {
  data.value = [JSON.parse(JSON.stringify(props.defaultData))]
}
// если массив пустой
if (props.filterData && props.filterData?.length == 0) {
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
  overflow: hidden;
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
.item {
  background-color: rgba(173, 178, 180, 0.122);
  border: 1px solid #2c4957;
  border-radius: 4px;
  padding: 25px 24px 10px 24px;
  box-shadow: -3px 3px 7px 2px rgba(54, 54, 54, 0.3);
}

.item::before {
  width: 36px;
  height: calc(50% + 12px);
  content: '';
  position: absolute;
  left: -36px;
  top: calc(50% - 5px);
  border-top: 1px solid #2c4957;
}
.many.item::before {
  border-left: 1px solid #2c4957;
}
.item::after {
  width: 36px;
  height: calc(50% + 35px);
  content: '';
  position: absolute;
  left: -36px;
  top: -40px;
  border-left: 1px solid #2c4957;
}

.item:first-of-type::after {
  border: none;
}

.btnAdd {
  position: absolute;
  bottom: 3px;
  left: 0px;
  z-index: 2;
  border: 1px solid #2c4957;
}

.btnRemove,.btnOne {
  position: absolute;
  bottom: calc(50% - 10px);
  left: -50px;
  z-index: 2;
  font-family: sans-serif;
  font-weight: 700;
}
.btnRemove {
  border: 1px solid #2c4957;
}
</style>
