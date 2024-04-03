<template>
  <div class="app">
    <div class="app-top">
      <p class="app-title">Системы электронных паспортов РБ</p>
      <v-btn
        prepend-icon="mdi-exit-to-app"
        variant="text"
        color="#f7f7f7"
        @click="isOpen = !isOpen"
      >
        Выход
      </v-btn>
    </div>

    <base-menu></base-menu>

    <div class="app-content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>

    <div class="app-footer">
      <p>@2024</p>
    </div>

    <transition-group name="slide" tag="div" class="snackbar-wrapper">
      <div v-for="item in snack" :key="item.id" class="snackbar" :class="item.type">
        <v-icon v-if="item.type == 'info'" size="35" icon=" mdi-message-processing"></v-icon>
        <v-icon v-if="item.type == 'error'" size="35" icon="mdi-close-thick"></v-icon>
        <span>{{ item.text }}</span>
      </div>
    </transition-group>
    <base-modal
      v-model:isOpen="isOpen"
      title="Выход "
      icon="mdi-exit-to-app"
      ok-title="Да"
      cancel-title="отмена"
      :ok-function="{ fun: user.exitFromUser, isCloseAfterClick: true }"
    >
      <p>Вы действительно хотите выйти?</p>
    </base-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSnackStore } from '@/stores/snackStore'
import { RouterView } from 'vue-router'
import BaseMenu from './components/base/BaseMenu.vue'
import BaseModal from './components/base/BaseModal.vue'
import { storeToRefs } from 'pinia' // что бы объект был реактивным
import { useUserStore } from './stores/userStore'

const isOpen = ref(false)
const store = useSnackStore() // для работы с уведовлениями
const user = useUserStore()
const { snack } = storeToRefs(store) // для работы с уведомлениями что бы они были реактивны
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40px 1fr 30px;
  background-color: #f7f7f7;
}
.app-title {
  justify-self: flex-start;
  margin-right: auto;
  margin-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
}
.app-top {
  height: 40px;
  background-color: #2c4957;
  display: flex;
  align-items: center;
  color: white;
  padding: 0px 0px 0px 20px;
}
.app-content {
  overflow: hidden;
  height: 100%;
}
.app-footer {
  height: 30px;
  background-color: #2c4957;
  color: white;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 10px;
}

/* snackbar */
.snackbar-wrapper {
  grid-area: 1/1/-1/-1;
  position: fixed;
  right: 25px;
  bottom: 45px;
  display: flex;
  flex-direction: column-reverse;
  gap: 25px;
  z-index: 11;
}
.snackbar {
  width: 320px;
  z-index: 11;
  display: grid;
  gap: 7px;
  grid-template-columns: 35px 1fr;
  align-items: center;
  color: white;
  padding: 10px 12px 10px 10px;
  font-size: 14px;
  font-family: sans-serif;
  letter-spacing: 1px;
  transition: transform 0.35s;
  box-shadow: 0px 0px 7px -3px #2c4957;
  border-left: 3px solid white;
}
.info {
  background-color: rgba(0, 128, 0, 0.9);
}
.error {
  background-color: rgba(194, 0, 0, 0.9);
}
.snack-icon {
  display: block;
  color: white;
  width: 35px;
  height: 35px;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-leave-active {
  position: absolute;
}
</style>
