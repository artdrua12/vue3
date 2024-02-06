<template>
  <teleport to="#port">
    <div v-if="isOpen" class="modal-wrapper">
      <div class="modal">
        <div class="modal-title">
          <p><v-icon :icon="props.icon"></v-icon> &nbsp;{{ props.title }}</p>
          <v-btn icon="mdi-window-close" variant="text" @click="close"> </v-btn>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-button">
          <v-btn variant="text" @click="close">{{ props.cancelTitle }} </v-btn>
          <v-btn color="#3f3c3c" class="rounded-0" @click="close">{{ props.okTitle }}</v-btn>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineEmits } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  okTitle: {
    type: String,
    default: 'OK'
  },
  cancelTitle: {
    type: String,
    default: 'Закрыть'
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'mdi-tune-variant'
  }
})
const emit = defineEmits(['update:isOpen'])
function close() {
  emit('update:isOpen', false)
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
  background-color: white;
  box-shadow: 0 -5px 15px -3px rgba(245, 242, 242, 0.2), 0 -10px 15px -2px rgba(252, 251, 251, 0.14);
  border-radius: 4px;
}
.modal-title {
  min-height: 30px;
  background-color: #3f3c3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 18px;
  padding: 0px 0px 0px 12px;
  border-radius: 4px 4px 0 0;
}
.modal-content {
  padding: 20px;
  max-height: 800px;
}
.modal-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.modal p {
  font-size: 20px;
}
</style>
