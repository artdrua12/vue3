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
    <div v-for="(item, index) in data" :key="index" class="element">
      <slot name="default" :index="index"></slot>
      <slot name="btnRemove" :index="index">
        <v-icon
          v-if="data.length != 1"
          color="red"
          class="btnRemove"
          icon="mdi-close-box"
          @click="remove(item)"
        ></v-icon
      ></slot>
    </div>
  </div>
</template>

<script setup>
const data = defineModel({ type: Array, required: true }) // место куда вставляем данные
const props = defineProps({
  defaultData: { type: String, default: ' ' },
  disabled: { type: Boolean, default: false } //выключает кнопку добавления
})

function add() {
  data.value.push(JSON.parse(JSON.stringify(props.defaultData)))
}
function remove(item) {
  const index = data.value.findIndex((dataItem) => dataItem == item)
  data.value.splice(index, 1)
}
if (data.value.length == 0) {
  add()
}
</script>

<style scoped>
.constructor {
  position: relative;
  width: 100%;
  padding: 15px 0px 10px 50px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.element {
  position: relative;
}
.element::before {
  width: 40px;
  height: 100%;
  content: '';
  position: absolute;
  left: -40px;
  bottom: calc(50% + 7px);
  border-bottom: 1px solid #2c4957;
  border-left: 1px solid #2c4957;
}
.element::after {
  width: 40px;
  height: 100%;
  content: '';
  position: absolute;
  left: -40px;
  bottom: 0%;
  border-left: 1px solid #2c4957;
}

.element:first-of-type::before {
  height: 50%;
}
.element:last-of-type::after {
  border: none;
}
.addBtn {
  position: absolute;
  top: -20px;
  left: -5px;
  width: 30px;
  height: 30px;
  font-size: 14px;
  z-index: 2;
  background-color: #ebebeb;
}

.btnRemove {
  font-size: 23px;
  position: absolute;
  bottom: calc(50% - 5px);
  left: -50px;
  z-index: 2;
  background-color: #ebebeb;
}
</style>
