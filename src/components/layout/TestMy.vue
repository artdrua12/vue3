<template>
  <div style="padding: 20px; overflow: auto; height: 100%">
    <v-btn @click="test">test</v-btn>
    <h1>Тестовая страница</h1>
    <v-text-field :value="currentDate ? currentDate.toLocaleDateString() : null"></v-text-field>
    <base-datefield v-model="currentDate" label="дата компонент"></base-datefield>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useDate } from 'vuetify'
import BaseDatefield from '../base/BaseDatefield.vue'
// import { useRequestStore } from '@/stores/requestStore'
// import { useIndexDBStore } from '@/stores/indexDBStore'
// const requests = useRequestStore() // для работы с запросами
// const indexDB = useIndexDBStore()
const currentDate = ref()

async function test() {
  // const referenceBook = await requests.post('/api/classifiers/get-full-records', {})
  // console.log('fields', referenceBook)
  // const asd = await indexDB.getFromDatabase('catalog', 'NSI_003')
  currentDate.value = new Date('03.12.2020')
  console.log('currentDate', currentDate.value)
}
</script>
<style scoped></style>
