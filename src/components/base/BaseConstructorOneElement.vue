<template>
  <div class="constructor">
    <div v-for="(item, index) in data" :key="index" class="element" :class="{ many: isOneField }">
      <slot name="default" :index="index"></slot>
      <slot name="btnRemove" :index="index">
        <v-btn
          v-if="isOneField"
          icon
          class="btnRemove"
          size="30"
          :disabled="props.disabled"
          @click="remove(item)"
        >
          {{ index + 1 }}
        </v-btn>
        <v-btn v-else size="30" icon class="btnRemove" :disabled="props.disabled" @click="add">
          <v-icon size="24" color="#69808a" icon="mdi-plus-circle"></v-icon>
        </v-btn>
      </slot>
    </div>
    <v-btn
      v-show="isOneField"
      icon
      size="30"
      class="addBtn"
      :disabled="props.disabled"
      @click="add"
    >
      <v-icon size="24" color="#69808a" icon="mdi-plus-circle"></v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const data = defineModel({ type: [Array, null], required: true }) // место куда вставляем данные
const props = defineProps({
  defaultData: { type: String, default: '' },
  disabled: { type: Boolean, default: false } //выключает кнопку добавления
})

const isOneField = computed(() => data.value.length > 1)

setTimeout(() => {
  if (!data.value) {
    // если у нас поле не массив то создаем массив
    data.value = [props.defaultData.value]
    add()
  }

  if (data.value.length == 0) {
    // если у нас пустой массив то заполняем дефолтными значениями
    data.value.push(props.defaultData)
  }
}, 1000)

function add() {
  data.value.push(props.defaultData)
}

function remove(item) {
  const index = data.value.findIndex((dataItem) => dataItem == item)
  data.value.splice(index, 1)
}
</script>

<style scoped>
.constructor {
  position: relative;
  width: 100%;
  padding: 5px 0px 15px 50px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.element {
  position: relative;
}
.element::before {
  width: 35px;
  height: 50%;
  content: '';
  position: absolute;
  left: -35px;
  top: calc(50% - 12px);
  border-top: 1px solid #2c4957;
}
.many.element::before {
  border-left: 1px solid #2c4957;
}
.element::after {
  height: 50%;
  content: '';
  position: absolute;
  left: -35px;
  top: -15px;
  border-left: 1px solid #2c4957;
}

.element:first-of-type::after {
  border: none;
}
.addBtn {
  position: absolute;
  bottom: 3px;
  left: 0px;
  z-index: 2;
  border: 1px solid #2c4957;
}

.btnRemove {
  position: absolute;
  bottom: calc(50% - 2px);
  left: -50px;
  z-index: 2;
  /* color: orangered; */
  font-family: sans-serif;
  font-weight: 700;
  border: 1px solid #2c4957;
}
</style>
