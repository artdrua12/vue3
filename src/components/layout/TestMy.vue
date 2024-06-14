<template>
  <div style="padding: 20px; overflow: auto; height: 100%">
    <v-btn @click="test">test</v-btn>
    <h1>Тестовая страница</h1>
    <base-datefield v-model="currentDate" label="дата компонент"></base-datefield>
    <base-textarea label="test"></base-textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useDate } from 'vuetify'
import BaseDatefield from '../base/BaseDatefield.vue'
import BaseTextarea from '../base/BaseTextarea.vue'
// import { useRequestStore } from '@/stores/requestStore'
// import { useIndexDBStore } from '@/stores/indexDBStore'
// const requests = useRequestStore() // для работы с запросами
// const indexDB = useIndexDBStore()
const currentDate = ref('2090-03-12')

async function test() {
  // const referenceBook = await requests.post('/api/classifiers/get-full-records', {})
  // console.log('fields', referenceBook)
  // const asd = await indexDB.getFromDatabase('catalog', 'NSI_003')
  console.log('currentDate', currentDate.value)
}
</script>
<style scoped></style>
