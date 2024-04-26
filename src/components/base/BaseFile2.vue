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
      <img :src="item.url" class="img" @click="opened(index)" />
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
      <!-- <canvas ref="modalCanvas" class="canvas" @click="isOpen = false"></canvas> -->
      <img ref="modalCanvas" :src="images[currentIndex]?.url" class="canvasC" />

      <div class="modalButtons">
        <v-btn icon="mdi-arrow-left-top-bold" class="modalButtonImg" @click="rotate(-90)"> </v-btn>
        <v-btn icon="mdi-arrow-right-top-bold" class="modalButtonImg" @click="rotate(90)"> </v-btn>

        <v-btn icon="mdi-image-outline" class="modalButtonImg" @click="naturalSize"> </v-btn>

        <v-btn icon="mdi-plus-thick" class="modalButtonImg" @click.stop="scale(0.25)"> </v-btn>
        <v-btn icon="mdi-minus-thick" class="modalButtonImg" @click.stop="scale(-0.25)"> </v-btn>
        <v-btn icon="mdi-close-circle" class="modalButtonImg" @click="isOpen = false"> </v-btn>
      </div>
    </base-modal>
  </div>
</template>
  
  <script setup>
import { ref, watch, nextTick } from 'vue'
import BaseModal from './BaseModal.vue'

const modalCanvas = ref(null) // canvas который находится в модальном окне
const images = ref([]) // массив картинок
const isOpen = ref(false)
const currentIndex = ref()
const initialModalImage = ref()

watch(isOpen, (isOpen) => {
  if (isOpen) {
    // startCanvas()
  }
})

function uploadFile(files) {
  if (!files) return
  for (let i = 0; i < files.length; i++) {
    let link = URL.createObjectURL(files[i])
    images.value.push({ url: link, file: files[i] })
    // URL.revokeObjectURL(link)
  }
}
function opened(index) {
  isOpen.value = !isOpen.value
  currentIndex.value = index
}

async function startCanvas() {
  await nextTick() // Dom обновился и появилось модальное окно с modalCanvas
  let canvas = modalCanvas.value
  let context = canvas.getContext('2d')

  const img = new Image()
  img.onload = () => {
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    context.drawImage(img, 0, 0)
  }
  initialModalImage.value = images.value[currentIndex.value].url
  img.src = initialModalImage.value
  context.closePath()
}

function scale(size) {
  let canvas = modalCanvas.value
  canvas.style.transform = `scale(${(this.size = (this.size || 1) + size)})`
}

function naturalSize() {
  let canvas = modalCanvas.value
  let context = canvas.getContext('2d')
  let img = new Image()
  img.onload = () => {
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    context.drawImage(img, 0, 0) // Рисуем изображение
  }
  img.src = initialModalImage.value
  images.value[currentIndex.value].url = initialModalImage.value
}

async function rotate(deg) {
  let canvas = modalCanvas.value
  canvas.style.transform = `rotate(${(this.deg = (this.deg || 0) + deg)}deg)`
  // let link = URL.createObjectURL(files[i])
  // images.value.push({ url: link, file: files[i] })
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
.dropboxIntro {
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
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9); */
  border-radius: 10px;
  box-shadow: inset 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
  /* box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.5); */
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
.canvasC {
  border: 4px solid white;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
  transition: 500ms;
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
</style>
  