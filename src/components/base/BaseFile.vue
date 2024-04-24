<template>
  <div class="baseFile">
    <div class="dropbox" @dragenter="stopPrevent" @dragover="stopPrevent" @drop="drop">
      <label
        ><v-icon icon="mdi-camera-outline" size="50px" class="dropboxChield"></v-icon>
        <span class="dropboxChield mt-2"> переместить или загрузить </span>
        <input
          type="file"
          multiple
          style="display: none"
          @change="(e) => uploadFile(e?.target?.files)"
        />
      </label>
    </div>
    <div v-for="(item, index) in images" :key="index" style="position: relative">
      <span class="title">{{ item.file.name }}</span>
      <img :src="item.url" class="img" @click="opened(index)" />
      <span class="size">{{ Math.ceil(item.file.size / 1000) }} Kb</span>
      <v-icon
        icon="mdi-delete-empty"
        color="red"
        size="20px"
        class="delete"
        @click="removingImg(index)"
      ></v-icon>
    </div>
    <base-modal v-model:isOpen="isOpen" icon="mdi-camera-outline">
      <img :src="modalUrl" width="auto" />
    </base-modal>
  </div>
  <canvas id="canvas" style="border: 1px solid red"></canvas>
  <div><v-btn @click="rotate">Rotate</v-btn></div>
  <img
    id="as"
    src="../../assets/images.jpg"
    style="width: 700px; height: auto; border: 1px solid red; object-fit: contain"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseModal from './BaseModal.vue'

const images = ref([])
const isOpen = ref(false)
const modalUrl = ref('#')

onMounted(() => {
  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')

  const img = new Image()
  img.onload = () => {
    context.drawImage(img, 0, 0)
  }
  img.src = 'src/assets/images.jpg'
})

function rotate() {
  // context.clearRect(0, 0, canvas.width, canvas.height);  // Очищаем холст
  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')
  let canvasImg = canvas.toDataURL('image/jpeg')
  let img = new Image()
  img.src = canvasImg
  const angle = 170
  if (angle % 180 !== 0) {
    canvas.width = img.height
    canvas.height = img.width
  } else {
    canvas.width = img.width
    canvas.height = img.height
  }

  context.save() // Сохраняем текущее состояние контекста
  context.translate(canvas.width / 2, canvas.height / 2) // Переходим в центр изображения
  context.rotate(Math.PI / 2) // Поворачиваем изображение на заданный угол, приведенный к радианам
  context.drawImage(img, -img.width / 2, -img.height / 2) // Рисуем изображение
  context.restore() // Возвращаем настройки контекста в исходное состояние

  canvasImg = canvas.toDataURL('image/jpeg')
  const first = document.getElementById('as')
  first.setAttribute('src', canvasImg)
  context.closePath()
}

function uploadFile(files) {
  if (!files) return
  for (let i = 0; i < files.length; i++) {
    let link = URL.createObjectURL(files[i])
    images.value.push({ url: link, file: files[i] })
    // URL.revokeObjectURL(link)
  }
}
function stopPrevent(e) {
  e.stopPropagation()
  e.preventDefault()
}

function drop(e) {
  stopPrevent(e)
  uploadFile(e.dataTransfer.files)
}

function removingImg(index) {
  images.value.splice(index, 1)
}
function opened(index) {
  console.log('opened')
  isOpen.value = !isOpen.value
  modalUrl.value = images.value[index].url
}
</script>

<style scoped>
.baseFile {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 15px;
  padding: 20px;
  background-color: #f0f5f9;
  border: 1px solid;
}
.dropbox {
  width: 170px;
  height: 120px;
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed #2c4957;
  padding: 5px;
  border-radius: 10px;
}
.dropboxChield {
  display: block;
  margin: auto;
  text-align: center;
  font-size: 14px;
  line-height: 1;
  font-family: serif;
}
.img {
  height: 120px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
  border-radius: 10px;
}
.title {
  position: absolute;
  top: -15px;
  left: 0px;
  font-size: 12px;
  font-weight: 700;
}
.size {
  position: absolute;
  bottom: -10px;
  left: 0px;
  font-size: 12px;
  font-weight: 500;
}
.delete {
  position: relative;
  bottom: 2px;
  right: 2px;
}
</style>
