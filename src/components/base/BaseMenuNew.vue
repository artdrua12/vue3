<template>
  <div class="menu">
    <input id="close" type="radio" name="acordion" />
    <div v-for="item in props.items" :key="item" class="item">
      <input :id="item.text" type="radio" name="acordion" />
      <label :for="item.text" class="item-text" @click="setHeight(item.items.length)">
        <v-icon :icon="item.icon" size="large" color:white class="item-icon" />
        <span>{{ item.text }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          class="item-bange"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </label>
      <div class="submenu">
        <span v-for="text in item.items" :key="text" class="submenu-text">
          {{ text.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const props = defineProps({
  items: { type: Array, required: true }
})
function setHeight(item) {
  let root = document.querySelector('.menu')
  let h = item * 50 + 30 + 'px'
  root.style.setProperty('--height', h)
}

onMounted(() => {
  const el = document.querySelector('.menu')
  if (el) {
    el.onmouseleave = function () {
      const radio = document.querySelector('#close')
      radio.checked = true
    }
  }
})
</script>

<style scoped>
.menu {
  position: fixed;
  top: 20px;
  width: 360px;
  height: 100%;
  --height: 0px;
  user-select: none;
  cursor: pointer;
  font-family: 'serif', arial;
  font-weight: 400;
  color: white;
}
.menu:hover,
.menu:hover {
  transform: translateX(0px);
}
.item-icon {
  justify-self: center;
  color: white;
}
.item-text {
  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  min-height: 60px;
  padding: 10px 0px;
  /* border-bottom: 1px solid white; */
  /* background-color: rgba(4, 4, 25, 0.75); */
  cursor: pointer;
  color: white;
  font-size: 18px;
  font-style: oblique;
  line-height: 18px;
}
.item-bange {
  width: 40px;
  transition: transform 0.3s;
  color: white ;
}
/* submenu */
.submenu {
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 0px;
  padding-left: 10px;
  /* box-shadow:
    inset 0px 5px 5px -4px rgba(50, 50, 50, 0.55),
    inset 0px -5px 5px -4px rgba(229, 226, 226, 0.55); */
  overflow: hidden;
  transition: height 0.3s;
  /* background-color: rgba(248, 248, 252, 0.5); */
  cursor: pointer;
  color: white;
  /* box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white; */
}
.submenu-text {
  display: flex;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid white;
  font-size: 16px;
  font-style: italic;
  line-height: 16px;
}
.submenu-text:last-child {
  border-bottom: none;
}
input[type='radio']:checked ~ .submenu {
  /* height: var(--height); */
  height: var(--height);
}
input[type='radio']:checked ~ .item-text .item-bange {
  transform: rotate(-90deg);
}
input[type='radio'] {
  display: none;
}
</style>
