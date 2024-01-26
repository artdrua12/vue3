<template>
  <div class="expBottom">
    <input type="checkbox" id="addition" />
    <div class="panelText">
      <slot name="text"></slot>
    </div>
    <label class="panelTitle" for="addition">
      <v-btn
        prepend-icon="mdi-close-circle"
        width="120px"
        color="red"
        size="small"
        variant="text"
        elevation="5"
      >
        Очистить
      </v-btn>
      <v-icon icon="mdi-chevron-down" size="30" class="ic"></v-icon>
      <v-btn
        append-icon="mdi-magnify"
        width="120px"
        size="small"
        variant="text"
        elevation="2"
      >
        Поиск
      </v-btn>
    </label>
  </div>
</template>

<script setup></script>
<style scoped>
.expBottom {
  display: grid;
  grid-template-rows: auto 1fr;
  widows: 100%;
  height: 100%;
}
.panelText {
  width: 100%;
  max-height: 0px;
  transition: max-height 0.35s linear;
  overflow: hidden;
  /* padding: 0px 20px;
  background-color: #f7e6d2; */
}
.panelTitle {
  width: 100%;
  height: auto;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  background-color: #ededed;
  /* border: 1px solid; */
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked ~ .panelText {
  max-height: 1000px;
  overflow: visible;
}
.ic {
  border-radius: 50%;
  transition: transform 0.25s linear;
}

input[type="checkbox"]:checked ~ .panelTitle .ic {
  transform: rotate(180deg);
}
</style>
