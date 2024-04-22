<template>
  <div class="baseFile">
    <label for="file">Forma</label>
    <input id="file"  type="file" @change="uploadFile" />
    <img :src="previewFilePath" class="imaf" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const value = ref('')

const uploadFile = (e) => {
  const [file] = e.target.files
  value.value = file
  console.log('uploadFile')
}
const previewFilePath = computed(() => {
  if (value.value?.type) {
    return URL.createObjectURL(value.value)
  }
  return '#'
})
</script>

<style>
.baseFile {
  display: flex;
}
.imaf {
  width: 100px;
  height: 80px;
  object-fit: contain;
}
</style>