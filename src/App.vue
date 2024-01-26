<template>
  <div class="app">
    <div class="app-top">
      <p class="app-tiple">Системы электронных паспортов РБ</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="40"
        height="30"
        fill="white"
      >
        <path
          d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
        />
      </svg>
      <h4>USEREB45CD61</h4>
    </div>
    <div class="app-content">
      <menu-my :items="items"></menu-my>
      <RouterView />
    </div>
    <div class="app-footer">
      <span>@2024 </span>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  padding: 0px;
}
.app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: #fff3e4;
  /* filter: saturate(1); */
}
.app-tiple {
  justify-self: flex-start;
  margin-right: auto;
  margin-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-top {
  height: 40px;
  background-color: #3f3c3c;
  display: flex;
  align-items: center;
  color: white;
  padding: 0px 20px;
}
.app-content {
  z-index: 1;
  overflow: auto;
  height: 100%;
  scrollbar-gutter: stable;
}
.app-footer {
  height: 30px;
  background-color: #3f3c3c;
  color: white;
  display: flex;
}



</style>
