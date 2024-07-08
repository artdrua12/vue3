import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRequestStore } from '@/stores/requestStore'

export const useShemaStore = defineStore('shemaStore', () => {
  const requests = useRequestStore() // для работы с запросами

  //state
  let shema = ref({})

  watch(
    shema,
    (shema) => {
      if (shema == {}) {
        shema = JSON.parse(sessionStorage.getItem('shema'))
        console.log('nulle', shema)
      } else {
        sessionStorage.setItem('shema', JSON.stringify(shema))
      }
    },
    { deep: true }
  )
  //action
  function createShema(defaultShema) {
    shema.value = JSON.parse(JSON.stringify(defaultShema))
    return shema.value
  }

  async function LoadDataAndNormaliseImages(url) {
    await loadServerData(url) // загрузка данных с cервера и перезапись схемы
    await normalizeImagesBase64(shema.value) // загрузка картинок и приведение к нормальному Base64
    return shema.value
  }

  async function loadServerData(url) {
    const data = await requests.get(url) // загрузка данных
    return Object.assign(shema.value, data) // заполнение пустой схемы данными полученными из сервера
  }
  async function gettingURLImg(nameImg) {
    return await requests.postText('/api/storage/image/get', { fileName: nameImg })
  }
  function normalizeImagesBase64(shema) {
    const images = shema.vehicleTypeDetails.vehiclePicture
    for (let i = 0; i < images.length; i++) {
      // загрузка не коректного Base64
      gettingURLImg(images[i].fileName).then((url) => {
        images[i].value = 'data:image/jpeg;base64,' + url //приведение к нормальному Base64
      })
    }
  }

  return { createShema, LoadDataAndNormaliseImages, shema }
})
