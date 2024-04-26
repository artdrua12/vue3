// useGetAutocompliteData - функция которая заполняет данными BaseAutocomplete из indexDB

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore() // для работы с базой данных
const requests = useRequestStore() // для работы с запросами

export async function useGetAutocompliteData(obj = {}) {
  for (const key in obj) {
    if (obj[key].catalog) {
      obj[key].items = await getCatalog(obj[key].catalog)
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

async function getCatalog(catalog) {
  console.log('i.catalog')
  return await indexDB.getFromDatabase('catalog', catalog)
}
