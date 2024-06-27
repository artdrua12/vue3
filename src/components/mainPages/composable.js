// useGetAutocompliteData - функция которая заполняет данными BaseAutocomplete из indexDB

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useSnackStore } from '@/stores/snackStore'
const indexDB = useIndexDBStore() // для работы с базой данных
const requests = useRequestStore() // для работы с запросами
const snack = useSnackStore() // для работы с уведомлениями

async function useGetAutocompliteData(obj = {}) {
  for (const key in obj) {
    if (obj[key].catalog) {
      obj[key].items = await useGetCatalog(obj[key].catalog)
      if (obj[key].filter) {
        obj[key].items = eval(`obj[key].items.${obj[key].filter}`)
      }
    } else if (obj[key].url) {
      try {
        const data = await requests.get(obj[key].url)
        if (!data) {
          throw new Error()
        }
        obj[key].items = data
      } catch (error) {
        console.log('Ошибка загрузки данных для ' + obj[key]?.label)
      }
      if (obj[key].filter) {
        obj[key].items = eval(`obj[key].items.${obj[key].filter}`)
      }
    }
  }
}
//данные от сервера
async function useLoadItems(url) {
  return await requests.get(url)
}
//загрузка из IndexDb
async function useGetCatalog(catalog) {
  return (await indexDB.getFromDatabase('catalog', catalog)) || []
}

// проверка что выбрано хотя бы одно поле
function checkingFields(obj) {
  for (const key in obj) {
    if (obj[key]) {
      return true
    }
  }
  snack.setSnack({
    text: 'Ни один критерий поиска не заполнен!',
    type: 'error'
  })

  return false
}

// проверка на заполенность хотя бы одного поля и загрузка данных
async function useCheckAndLoadData(fields, url, body) {
  const check = checkingFields(fields)
  if (check) {
    return (await requests.post(url, body)) || {}
  }
  return {}
}
export { useGetAutocompliteData, useCheckAndLoadData, useGetCatalog, useLoadItems }
