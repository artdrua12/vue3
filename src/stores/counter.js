import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('alert', () => {
  const snack = reactive([])
  watch(
    () => snack,
    (newVal) => {
      setTimeout(() => {
        snack.shift()
      }, 3500)
    }
  )
  return { snack }
})
