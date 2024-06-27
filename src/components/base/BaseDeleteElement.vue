<template>
  <div class="deleteWraper">
    <div class="grid12">
      <slot></slot>
    </div>

    <v-btn class="btnDelete" icon="mdi mdi-delete" @click="removing"> </v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  fun: { type: Function, required: true }
})

function removing() {
  props.fun()
}
</script>

<style scoped>
.deleteWraper {
  display: flex;
  gap: 20px;
}
.btnDelete {
  color: red;
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
</style>
