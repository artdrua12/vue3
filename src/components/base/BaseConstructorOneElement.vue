<template>
  <div class="constructor">
    <v-btn
      icon="mdi-plus"
      color="#465f6b"
      rounded="0"
      size="30"
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
const data = defineModel({ type: [Array, null], required: true }) // место куда вставляем данные
const props = defineProps({
  defaultData: { type: String, default: '' },
  disabled: { type: Boolean, default: false } //выключает кнопку добавления
})

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
  padding: 15px 0px 10px 50px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.element {
  position: relative;
}
.element::before {
  width: 37px;
  height: calc(50% + 7px);;
  content: '';
  position: absolute;
  left: -35px;
  bottom: calc(50% + 7px);
  border-bottom: 1px solid #2c4957;
  border-left: 1px solid #2c4957;
}
.element::after {
  width: 35px;
  height: 100%;
  content: '';
  position: absolute;
  left: -35px;
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
  top: -15px;
  left: 0px;
  width: 30px;
  height: 30px;
  font-size: 14px;
  z-index: 2;
  background-color: #ebebeb;
}

.btnRemove {
  font-size: 23px;
  position: absolute;
  bottom: calc(50% - 4px);
  left: -47px;
  z-index: 2;
  background-color: #ebebeb;
}
</style>
