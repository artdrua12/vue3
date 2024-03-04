<template>
  <div class="entrance">
    <div class="entranceBackground"></div>
    <div class="entranceMenu">
      <h2 class="mb-3">Вход в систему электронных паспортов РБ</h2>
      <v-text-field
        v-model="login"
        label="Имя пользователя"
        prepend-icon="mdi-account-key"
        variant="underlined"
        color="white"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Пароль"
        prepend-icon=" mdi-lock"
        variant="underlined"
      ></v-text-field>

      <v-btn block class="rounded-0 mt-3" @click="checkLogin">Войти</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useSnackStore } from '@/stores/snackStore'

const login = ref('bts')
const password = ref('w6Zvb')
const requests = useRequestStore()
const indexDB = useIndexDBStore()
const route = useRouter()
const snack = useSnackStore()

// function writingReferenceBooks() {
//   const request = indexedDB.open('referenceBooks', 1)

//   request.onerror = function (event) {
//     console.log('Проблема с открытием базы данных:', event)
//   }

//   request.onupgradeneeded = function () {
//     let db = request.result
//     const objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
//     objectStore.createIndex('title', 'title', { unique: false })
//     console.log('База данных и хранилище объектов созданы.')
//   }

//   request.onsuccess = function () {
//     console.log('event', request.result)
//     let db = request.result
//     console.log('База данных успешно открыта.')
//   }
// }

async function checkLogin() {
  const response = await requests.checkLogin(login.value, password.value)
  console.log('response', response)
  if (response.successfully) {
    // если авторизация пройдена
    route.push('/main')
    const referenceBooks = await requests.referenceBooks()
    if (referenceBooks) {
      indexDB.writingReferenceBooks(referenceBooks)
      console.log('referenceBooks', referenceBooks)
    }
  } else {
    snack.setSnack({ text: 'Ошибка авторизации', type: 'error' })
  }
}
</script>

<style scoped>
.entrance {
  width: 100%;
  height: 100%;
  /* background: rgb(231, 230, 228); */
  /* background: linear-gradient(135deg, rgb(31, 31, 29) 0%, #ebeff0 100%); */
  z-index: 9;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
  justify-content: center;
  align-items: center;
  /* margin: -40px 0px -30px 0px; */
  color: white;
}
.entranceMenu {
  grid-area: 2/2/3/3;
  padding: 40px 50px;
  border: 1px solid rgba(223, 64, 90, 1);
  background-image: url(@/assets/PD-007.jpg);
  background-color: rgba(231, 230, 228, 0.603);
  border-radius: 20px;
  background: linear-gradient(120deg, rgba(30, 29, 31, 1) 0%, rgba(223, 64, 90, 1) 100%);
  box-shadow: 0px 0px 1200px 12px rgba(246, 247, 247, 0.35);
  z-index: 7;
}
.entranceBackground {
  grid-area: 1/1/-1/-1;
  background: url(../../assets/123.avif) repeat;
  filter: blur(2px);
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
