<template>
  <div class="baseFile pa-3">
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
      <span class="imgTitle">{{ item.fileName }}</span>
      <img :src="item.value" class="img" @click="openModal(index)" />
      <!-- <span class="imgSize">{{ Math.ceil(item.file.size / 1000) }} Kb</span> -->
      <v-icon
        icon="mdi-delete-empty"
        color="red"
        size="20px"
        class="imgDelete"
        @click="removingImg(index)"
      ></v-icon>
    </div>

    <!-- <base-modal v-model:isOpen="isOpen" :is-empty="true">
      <canvas ref="modalCanvas" class="canvasC" @click="closeModal" @wheel="onwheel"></canvas>

      <div class="modalButtons">
        <v-btn icon="mdi-arrow-left-top-bold" class="modalButtonImg" @click="rotate(-90)"> </v-btn>
        <v-btn icon="mdi-close-circle" class="modalButtonImg" @click="closeModal"> </v-btn>
        <v-btn icon="mdi-arrow-right-top-bold" class="modalButtonImg" @click="rotate(90)"> </v-btn>
      </div>
    </base-modal> -->

    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-top-transition">
      <div class="modal-wrapper">
        <canvas ref="modalCanvas" class="canvasC" @click="closeModal" @wheel="onwheel"></canvas>

        <div class="modalButtons">
          <v-btn icon="mdi-arrow-left-top-bold" class="modalButtonImg" @click="rotate(-90)">
          </v-btn>
          <v-btn icon="mdi-close-circle" class="modalButtonImg" @click="closeModal"> </v-btn>
          <v-btn icon="mdi-arrow-right-top-bold" class="modalButtonImg" @click="rotate(90)">
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import shema from './shema'

const modalCanvas = ref(null) // canvas который находится в модальном окне
const isOpen = ref(false)
const currentIndex = ref()
const scale = ref(1)

const images = computed(() => {
  return shema.vehicleTypeDetails.vehiclePicture
})

function rotate(angle) {
  let canvas = modalCanvas.value
  let context = canvas.getContext('2d')
  let canvasImg = canvas.toDataURL()

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
  images.value[currentIndex.value].value = canvas.toDataURL()
  scale.value = 1
  isOpen.value = false
}

function uploadFile(files) {
  if (!files) return
  for (let i = 0; i < files.length; i++) {
    // let urlBase64 = URL.createObjectURL(files[i])

    const reader = new FileReader()
    reader.readAsDataURL(files[i])
    reader.onloadend = () => {
      images.value.push({
        fileName: files[i].name,
        value: reader.result,
        isLoadedInStorage: true,
        isNeedToDelete: false
      })
    }
  }
}

function openModal(index) {
  isOpen.value = !isOpen.value
  currentIndex.value = index
  initCanvas()
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
  img.src = images.value[currentIndex.value].value
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
  margin: 20px 0px 0px 20px;
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
  max-width: 100%;
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
  bottom: -12px;
  left: -80%;
  font-size: 12px;
  font-weight: 500;
}
.imgDelete {
  position: relative;
  bottom: 0px;
  left: 0px;
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
