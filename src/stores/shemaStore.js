import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRequestStore } from '@/stores/requestStore'

export const useShemaStore = defineStore('shemaStore', () => {
  const requests = useRequestStore() // для работы с запросами

  //state
  let shema = ref(null)

  // watch(shema, (shema) => sessionStorage.setItem('shema', JSON.stringify(shema)), { deep: true })
  //get
  let getShema = computed(() => {
    if (shema.value == null) {
      shema.value = JSON.parse(sessionStorage.getItem('shema'))
    }
    return shema.value
  })
  //action
  function createShema(defaultShema) {
    shema.value = JSON.parse(JSON.stringify(defaultShema))
    sessionStorage.setItem('shema', JSON.stringify(shema.value)) // временное решение
    return shema.value
  }

  async function LoadDataAndNormaliseImages(url) {
    await loadServerData(url) // загрузка данных с cервера и перезапись схемы
    await normalizeImagesBase64(shema.value) // загрузка картинок и приведение к нормальному Base64
    return shema.value
  }

  function beforeSave() {
    const saveShema = JSON.parse(sessionStorage.getItem('shema'))
    const images = saveShema.vehicleTypeDetails.vehiclePicture
    for (let i = 0; i < images.length; i++) {
      images[i].value = images[i].value.split(';base64,')[1]
    }
    return saveShema
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

  return { createShema, LoadDataAndNormaliseImages, getShema, beforeSave }
})
