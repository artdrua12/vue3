<template>
  <div style="padding: 20px; overflow: auto; height: 100%">
    <v-btn @click="test">test</v-btn>
    <h1>Страница в разработке...</h1>
    <base-recursive-constructor
      :fields="fields"
      :fields2="fields2"
      label="Приложение к документу"
    ></base-recursive-constructor>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRequestStore } from '@/stores/requestStore'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor.vue'
const requests = useRequestStore() // для работы с запросами
async function getAutocompliteData(obj = {}) {
  for (const key in obj) {
    if (obj[key].url) {
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
const fields2 = reactive({
  number: {
    width: '3',
    label: 'Номер заявления',
    value: '',
    type: 'base-text-field'
  }
})

const fields = reactive({
  type: {
    width: '3',
    label: 'Тип заявления',
    value: '',
    type: 'base-autocomplete',
    items: [],
    text: 'name',
    itemValue: 'type'
  },
  number: {
    width: '3',
    label: 'Номер заявления',
    value: '',
    type: 'base-text-field'
  },
  applicant: {
    width: '3',
    label: 'Заявитель',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'value'
  },
  epassportNumb: {
    width: '3',
    label: 'Номер электронного паспорта',
    value: '',
    type: 'base-text-field'
  },
  docStatus: {
    width: '3',
    label: 'Статус',
    value: '',
    type: 'base-autocomplete',
    items: [],
    url: '/api/classifier/epassport/status-directory-otts',
    text: 'name',
    itemValue: 'type'
  },
  vehicleId: {
    width: '6',
    label: 'Идентификационный номер ТС',
    value: '',
    type: 'base-text-field'
  },
  BaseRecursiveConstructor: {
    width: 'all',
    label: 'Тип заявления',
    value: '',
    type: 'base-recursive-constructor',
    items: [],
    fields: {
      number: {
        width: '3',
        label: 'Номер заявления',
        value: '',
        type: 'base-text-field'
      },
      docStatus: {
        width: '3',
        label: 'Статус',
        value: '',
        type: 'base-autocomplete',
        items: [],
        url: '/api/classifier/epassport/status-directory-otts',
        text: 'name',
        itemValue: 'type'
      },
      vehicleId: {
        width: '6',
        label: 'Идентификационный номер ТС',
        value: '',
        type: 'base-text-field'
      }
    }
  },
  BaseRecursiveConstructor2: {
    width: 'all',
    label: 'Что то другое',
    value: '',
    type: 'base-recursive-constructor',
    items: [],
    fields: {
      vehicleId: {
        width: '6',
        label: 'Идентификационный номер ТС',
        value: '',
        type: 'base-text-field'
      }
    }
  }
})

async function test() {
  // const referenceBook = await requests.post(
  //   'http://localhost:8080/api/classifiers/get-full-records',
  //   {}
  // )
  console.log('fields', fields)
}
getAutocompliteData(fields)
</script>
<style scoped></style>
