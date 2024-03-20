<template>
  <div tag="div" name="list" class="wrapper">
    <div v-for="item in actionsArray" :key="item.name">
      <div v-if="item.children">
        <input :id="item.name" type="checkbox" :value="item.name" />
        <label :for="item.name" class="bold threeTitle mainTitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="gray"
            class="threeFolder"
          >
            <path d="M10,17L15,12L10,7V17Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="black"
            class="closeFolder"
          >
            <path
              d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="black"
            class="openFolder"
          >
            <path
              d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z"
            />
          </svg>
          {{ item.name }}
        </label>
        <div class="threeChield">
          <div v-for="itm in item.children" :key="itm.name" class="threeTitle threeTitle--padding">
            <v-icon size="25px" class="icon">{{ itm.icon }}</v-icon>
            <span class="">{{ itm.name }}</span>
          </div>
        </div>
      </div>

      <div v-else class="threeTitle">
        <v-icon size="25px" class="icon">{{ item.icon }}</v-icon>
        <span class="bold">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
const props = defineProps({
  tableRowSelect: { type: Object, required: true, default: {} } // выбранная строка из таблицы
})
let actionsArray = inject('actionsArray') // объект всех действий
</script>

<style scoped>
.wrapper {
  max-height: 90vh;
  overflow: auto;
  scrollbar-width: none;
  overflow: auto;
}
.wrapper::-webkit-scrollbar {
  width: 0;
}
.threeTitle {
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
  user-select: none;
  cursor: pointer;
  gap: 7px;
  color: #2c4957;

  font-size: 14px;
  padding: 7px 0px 7px 22px;
  line-height: 15px;
}
.threeTitle.mainTitle {
  grid-template-columns: auto 25px 1fr;
  /* margin-left: -12px; */
  padding: 10px 0px 10px 5px;
}
.threeTitle:hover {
  /* background-color: rgba(128, 128, 128, 0.1); */
  background-color: #f7e6d2;
  color: rgb(2, 150, 196);
}
.threeChield {
  grid-column: 1/-1;
  height: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.threeTitle--padding {
  padding: 5px 0px 5px 45px;
}
.bold {
  font-weight: bolder;
}
input[type='checkbox']:checked ~ .threeChield {
  height: 100%;
}
input[type='checkbox'] {
  display: none;
}

.threeFolder {
  transition: transform 0.25s;
}
.openFolder {
  display: none;
}
input[type='checkbox']:checked ~ .threeTitle .openFolder {
  display: block;
}
input[type='checkbox']:checked ~ .threeTitle .closeFolder {
  display: none;
}

input[type='checkbox']:checked ~ .threeTitle .threeFolder {
  transform: rotate(90deg);
}
.icon {
  color: black;
}
</style>
