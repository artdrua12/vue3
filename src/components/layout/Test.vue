<template>
  <div>
    <v-btn @click="test">getUser.value</v-btn>
  </div>
</template>

<script setup>
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

// const { getUser } = storeToRefs(currentUser)

const currentUser = useUserStore()
const user = useUserStore()
const indexDB = useIndexDBStore()
const requests = useRequestStore()

async function test() {
  const a = await requests.get('http://localhost:8080/api/manufacturer-registry/all')
}
</script>
<style scoped></style>
