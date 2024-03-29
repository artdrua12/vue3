<template>
  <div>
    <v-btn @click="test">Все справочники</v-btn>
    <h1>Страница в разработке...</h1>
    <div>
      <base-date-field></base-date-field>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDate } from 'vuetify'
import { useRequestStore } from '@/stores/requestStore'
import BaseDateField from '../base/BaseDateField.vue'
const requests = useRequestStore()
const date = useDate()

async function test() {
  // const referenceBook = await requests.post(
  //   'http://localhost:8080/api/classifiers/get-full-records',
  //   {}
  // )
  console.log('referenceBook')
}
</script>
<style scoped></style>
