import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRequestStore } from '@/stores/requestStore'
import { useSnackStore } from '@/stores/snackStore'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const requests = useRequestStore() // для работы с запросами
  const snack = useSnackStore() // для работы с уведомлениями
  const route = useRouter() // для работы с роутером

  //state
  let isChange = ref(false)

  //getter
  let getUser = computed(() => {
    isChange.value
    return JSON.parse(sessionStorage.getItem('user'))
  })

  let getPermissions = computed(() => {
    return new Set(getUser.value?.permissions)
  })

  //action
  async function loadUser() {
    const userData = await requests.get('http://localhost:8080/api/user/info') //получаем данные из запроса
    if (!userData) {
      snack.setSnack({ text: 'Ошибка получения пользователя', type: 'error' })
      return null
    }

    sessionStorage.setItem('user', JSON.stringify(userData))
    isChange.value = !isChange.value
    return 'ok'
  }

  function exitFromUser() {
    sessionStorage.clear()
    isChange.value = !isChange.value
    route.push('./')
  }

  return {
    getUser,
    isChange,
    getPermissions,
    loadUser,
    exitFromUser
  }
})
