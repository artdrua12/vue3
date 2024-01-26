<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal-title">
        <p><v-icon icon="mdi-tune-variant"></v-icon> {{ props.title }}</p>
        <v-btn icon="mdi-window-close" @click="close" variant="text"> </v-btn>
      </div>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
      <div class="modal-button">
        <slot name="button"></slot>
        <v-btn variant="text">Снять все выделения </v-btn>
        <v-btn color="#3f3c3c" class="rounded-0" @click="close">{{
          props.okTitle
        }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  okTitle: {
    type: String,
    default: "OK",
  },
});
const emit = defineEmits(["modalOpen"]);
function close() {
  emit("modalOpen");
}
</script>

<style>
.modal-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  z-index: 10;
  background-color: rgba(33, 33, 33, 0.46);
}

.modal {
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  background-color: white;
  /* box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12); */
}
.modal-title {
  min-height: 40px;
  background-color: #3f3c3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 18px;
  padding: 7px 0px 7px 10px;
}
.modal-content {
  padding: 20px;
}
.modal-button {
  width: 100%;
  display: flex;
}
.modal p {
  font-size: 20px;
}
</style>
