<template>
  <div style="padding: 20px; overflow: auto; height: 100%">
    <v-btn @click="test">test</v-btn>
    <h1>Тестовая страница</h1>
    <base-file></base-file>
  </div>
</template>

<script setup>
// import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import BaseFile from '../base/BaseFile2.vue'
// const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore()

async function test() {
  // const referenceBook = await requests.post('/api/classifiers/get-full-records', {})
  // console.log('fields', referenceBook)
  const asd = await indexDB.getFromDatabase('catalog', 'NSI_003')
  console.log('NSI_003', asd)
}
</script>
<style scoped></style>
