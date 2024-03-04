import { defineStore } from 'pinia'
import { useSnackStore } from './snackStore'

export const useRequestStore = defineStore('request', () => {
  async function checkLogin(login, password) {
    try {
      const response = await fetch('http://localhost:8080/api/authentication/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': 'secret'
        },
        credentials: 'include',
        body: JSON.stringify({ login, password })
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(response.status)
      }
      // return response.ok ? await response.json() : throw new Error(response.status)
    } catch (error) {
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  async function referenceBooks() {
    try {
      const response = await fetch('http://localhost:8080/nsi/directory/search', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': 'secret'
        },
        credentials: 'include',
        body: JSON.stringify({})
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка загрузки справочников', type: 'error' })
      return null
    }
  }

  return { checkLogin, referenceBooks }
})
