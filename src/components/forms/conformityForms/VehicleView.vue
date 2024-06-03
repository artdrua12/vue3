<template>
  <div class="baseFile">
    <div class="dropbox" @dragenter="stopPrevent" @dragover="stopPrevent" @drop="drop">
      <label
        ><v-icon icon="mdi-camera-outline" size="50px" class="dropboxIntro"></v-icon>
        <span class="dropboxIntro mt-2"> переместить или загрузить </span>
        <input
          type="file"
          multiple
          style="display: none"
          @change="(e) => uploadFile(e?.target?.files)"
        />
      </label>
    </div>

    <div v-for="(item, index) in images" :key="index" style="position: relative">
      <span class="imgTitle">{{ item.file.name }}</span>
      <img :src="item.url" class="img" @click="openModal(index)" />
      <span class="imgSize">{{ Math.ceil(item.file.size / 1000) }} Kb</span>
      <v-icon
        icon="mdi-delete-empty"
        color="red"
        size="20px"
        class="imgDelete"
        @click="removingImg(index)"
      ></v-icon>
    </div>

    <base-modal v-model:isOpen="isOpen" :is-empty="true" :title="images[currentIndex]?.file?.name">
      <!-- <img ref="modalImg" :src="images[currentIndex]?.url" class="modalImg" @click="closeModal" /> -->
      <canvas ref="modalCanvas" class="canvasC" @click="closeModal" @wheel="onwheel"></canvas>

      <div class="modalButtons">
        <v-btn icon="mdi-arrow-left-top-bold" class="modalButtonImg" @click="rotate(-90)"> </v-btn>
        <v-btn icon="mdi-close-circle" class="modalButtonImg" @click="closeModal"> </v-btn>
        <v-btn icon="mdi-arrow-right-top-bold" class="modalButtonImg" @click="rotate(90)"> </v-btn>
      </div>
    </base-modal>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'

const modalCanvas = ref(null) // canvas который находится в модальном окне
const images = ref([]) // массив картинок
const isOpen = ref(false)
const currentIndex = ref()
const scale = ref(1)

watch(isOpen, (isOpen) => {
  if (isOpen) {
    initCanvas()
  }
})

function rotate(angle) {
  let canvas = modalCanvas.value
  let context = canvas.getContext('2d')
  let canvasImg = canvas.toDataURL('image/jpeg')

  let img = new Image()
  img.src = canvasImg

  img.onload = function () {
    drawRotated(canvas, context, angle, img)
    // requestAnimationFrame(rotate)
  }
}

function drawRotated(canvas, context, angle, img) {
  if (angle % 180 !== 0) {
    canvas.width = img.height
    canvas.height = img.width
  } else {
    canvas.width = img.width
    canvas.height = img.height
  }
  // Запуск анимации
  context.clearRect(0, 0, canvas.width, canvas.height) // Очищаем холст
  context.save() // Сохраняем текущее состояние контекста
  context.translate(canvas.width / 2, canvas.height / 2) // Переходим в центр изображения
  context.rotate((angle * Math.PI) / 180) // Поворачиваем изображение на заданный угол, приведенный к радианам
  context.drawImage(img, -img.width / 2, -img.height / 2) // Рисуем изображение
  context.restore() // Возвращаем настройки контекста в исходное состояние
}

function onwheel(e) {
  if (e.deltaY > 0) {
    scale.value -= 0.15
    modalCanvas.value.style.transform = `scale(${scale.value > 0.15 ? scale.value : (scale.value = 0.15)})`
  } else {
    scale.value += 0.15
    modalCanvas.value.style.transform = `scale(${scale.value})`
  }
  return false
}

function closeModal() {
  // передаем новые координаты в массив картинок
  let canvas = modalCanvas.value
  let canvasImg = canvas.toDataURL('image/jpeg') || images.value[currentIndex.value].url
  canvasImg = canvas.toDataURL('image/jpeg')
  images.value[currentIndex.value].url = canvasImg
  scale.value = 1
  isOpen.value = false
}

function uploadFile(files) {
  if (!files) return
  for (let i = 0; i < files.length; i++) {
    let link = URL.createObjectURL(files[i])
    images.value.push({ url: link, file: files[i] })
    // URL.revokeObjectURL(link)
  }
}
function openModal(index) {
  isOpen.value = !isOpen.value
  currentIndex.value = index
}

async function initCanvas() {
  await nextTick() // Dom обновился и появилось модальное окно с modalCanvas
  let canvas = modalCanvas.value
  let context = canvas.getContext('2d')

  const img = new Image()
  img.onload = () => {
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    context.drawImage(img, 0, 0)
  }
  img.src = images.value[currentIndex.value].url
  context.closePath()
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
</script>

<style scoped>
.baseFile {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 25px;
  margin: 20px 0px 0px 0px;
  /* background-color: rgba(246, 194, 160, 0.122); */
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
  margin-bottom: 25px;
}
.dropboxIntro {
  display: block;
  margin: auto;
  text-align: center;
  font-size: 14px;
  line-height: 1;
  font-family: serif;
  color: #2c4957;
}
.img {
  height: 120px;
  object-fit: contain;
  border-radius: 10px;
}
.imgTitle {
  position: absolute;
  top: -17px;
  left: 0px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}
.imgSize {
  position: relative;
  bottom: 6px;
  left: 0px;
  font-size: 12px;
  font-weight: 500;
}
.imgDelete {
  position: absolute;
  bottom: 20px;
  right: -18px;
}
.modalImg {
  border: 4px solid white;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease-in-out;
}
.modalButtons {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  position: fixed;
  bottom: 40px;
}
.modalButtonImg {
  background-color: white;
  color: #546e7a;
}
.canvasC {
  border: 2px solid white;
}
</style>
