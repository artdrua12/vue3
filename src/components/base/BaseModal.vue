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
          <v-btn
            color="#546e7a"
            class="rounded-0"
            variant="tonal"
            density="comfortable"
            @click="close"
            >{{ props.cancelTitle }}
          </v-btn>
          <v-btn
            color="#546e7a"
            :disabled="okDisable"
            class="rounded-0"
            density="comfortable"
            @click="ok"
            >{{ props.okTitle }}</v-btn
          >
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
  okDisable: {
    type: Boolean,
    default: false
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'mdi-tune-variant'
  },
  okFunction: {
    type: Function,
    default: () => {}
  }
})
const emit = defineEmits(['update:isOpen'])
function close() {
  emit('update:isOpen', false)
}
function ok() {
  props.okFunction()
  close()
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
  z-index: 5;
  background-color: rgba(33, 33, 33, 0.33);

  backdrop-filter: grayscale(1) blur(1px);
}

.modal {
  display: flex;
  flex-direction: column;
  width: auto;
  background-color: #f0f0f0;
  box-shadow:
    0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
.modal-title {
  min-height: 30px;
  background-color: #546e7a;
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
}
.modal-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}
.modal p {
  font-size: 20px;
}
</style>
