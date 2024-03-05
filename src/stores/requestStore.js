import { defineStore } from 'pinia'
import { useSnackStore } from './snackStore'

export const useRequestStore = defineStore('request', () => {
  async function get(url) {
    try {
      const response = await fetch(url, {
        credentials: 'include' // credentials - возвращает куки на сервер, без этого придет пустой запрос
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json'
        // }
      })
      if (response.ok) {
        // response.ok- заголовок лежит от 200 до 299
        return await response.json()
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      console.log('error', error)
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  async function post(url, body) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'API-Key': 'secret'
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  return { get, post }
})
