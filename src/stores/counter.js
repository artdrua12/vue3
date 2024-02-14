import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('alert', () => {
  const snack = reactive([])
  // watch(
  //   () => snack,
  //   () => {
  //     setTimeout(() => {
  //       snack.shift()
  //     }, 3500)
  //   },
  //   { deep: true }
  // )
  function setSnack() {
    snack.push({ id: getId(), text: 'Столбец зафиксирован', color: 'snackInfo' });
    removeFirstElement();
  }
  function removeFirstElement() {
    setTimeout(() => {
      snack.shift()
    }, 2500)
  }
  function getId() {
    return new Date().getMilliseconds()
  }
  return { snack, setSnack }
})
