<template>
  <div>
    <v-btn @click="test">TEST</v-btn>
    <v-btn @click="getData">GetData</v-btn>
  </div>
</template>

<script setup>
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
const indexDB = useIndexDBStore()
const requests = useRequestStore()

async function test() {
  const referenceBooks = await requests.referenceBooks()
  if (referenceBooks) {
    indexDB.setReferenceBooks(referenceBooks)
  }
}
async function getData() {
  const getData = await indexDB.getReferenceBook(25)
  console.log('getData', getData)
}
</script>

<style scoped></style>
