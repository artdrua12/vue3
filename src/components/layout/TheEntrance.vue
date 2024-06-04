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

      <v-btn block class="rounded-0 mt-3" @click="entrance">Войти</v-btn>
      <v-btn block class="rounded-0 mt-3" @click="entrance2">Войти c неполным меню</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useSnackStore } from '@/stores/snackStore'
import { useUserStore } from '@/stores/userStore'

const login = ref('bts')
const password = ref('w6Zvb')
const requests = useRequestStore()
const indexDB = useIndexDBStore()
const route = useRouter()
const snack = useSnackStore()
const currentUser = useUserStore()

async function entrance2() {
  login.value = 'HiHHzyu3'
  password.value = 'gI,7v$U7dkkn'
  await entrance()
}

async function entrance() {
  const login = await checkLogin()
  if (!login) {
    snack.setSnack({ text: 'Ошибка авторизации', type: 'error' })
    return
  }
  // получаем  user (name и permissions) и в случае успеха переходим в приложение
  const getUser = await currentUser.loadUser()

  if (!getUser) {
    return
  }

  route.push('./start')

  const referenceBook = await requests.post('/api/classifiers/get-full-records', {})
  //если спарвочник не пустой, то записываем в хранилище catalog, indexDB
  if (referenceBook?.length > 0) {
    for (let i = 0; i < referenceBook.length; i++) {
      indexDB.setToDatabase('catalog', referenceBook[i].codeNsi, referenceBook[i].recordLine)
    }
  }
}

async function checkLogin() {
  const response = await requests.post('/api/authentication/login', {
    login: login.value,
    password: password.value
  })
  if (response?.successfully) {
    return response.message
  }
  return null
}
</script>

<style scoped>
.entrance {
  width: 100%;
  height: 100%;
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
