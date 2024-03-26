<template>
  <div>
    <v-btn @click="test">Все справочники</v-btn>
    <h1>Страница в разработке...</h1>
  </div>
</template>

<script setup>
// import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
// import { useUserStore } from '@/stores/userStore'
// import { storeToRefs } from 'pinia'

// const { getUser } = storeToRefs(currentUser)

// const currentUser = useUserStore()
// const user = useUserStore()
// const indexDB = useIndexDBStore()
const requests = useRequestStore()

async function test() {
  const referenceBook = await requests.post(
    'http://localhost:8080/api/classifiers/get-full-records',
    {}
  )
  console.log('referenceBook', referenceBook)
}
</script>
<style scoped></style>
