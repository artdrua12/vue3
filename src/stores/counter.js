import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('alert', () => {
  const snack = ref([])

  return { snack }
})
