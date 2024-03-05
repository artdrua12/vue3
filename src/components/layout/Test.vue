<template>
  <div>
    <v-btn @click="test">TEST</v-btn>
    <v-btn @click="getData">getIDdatafromIndexDB</v-btn>
    <v-btn @click="getUser">Get</v-btn>
  </div>
</template>

<script setup>
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
const indexDB = useIndexDBStore()
const requests = useRequestStore()

async function test() {
  const search = await requests.post('http://localhost:8080/nsi/directory/search', {})
  if (!search) return
  for (let i = 0; i < search.length - 1; i++) {
    const referenceBook = await requests.post(
      'http://localhost:8080/nsi/record/line/search/auto-complete-dto',
      {
        recordValues: [],
        directoryId: search[i].id
      }
    )
    if (!referenceBook) continue
    //если запрос не пустой, то записываем в indexDB
    indexDB.setToDatabase('catalog', search[i].code, referenceBook)
  }
}
async function getData() {
  const getData = await indexDB.getFromDatabase('catalog', 'NSI_030')
  console.log('getData', getData)
}
async function getUser() {
  const getUser = await requests.get('http://localhost:8080/api/user/info')
  console.log('get', getUser.permissions);
  indexDB.setToDatabase('user', 'permissions', getUser.permissions);
}
</script>

<style scoped></style>
