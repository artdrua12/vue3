<template>
  <!-- <div class="squares">
    <div v-for="(item, index) in props.items" :key="index" class="square">{{ item }}</div>
  </div> -->
  <div class="squares">
    <div v-for="(item, key, index) in props.items" :key="key" class="square">
      <span class="index">{{ index + 1 }} </span>
      <span class="text">{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: [Object], required: true }
})
</script>

<style scoped>
.squares {
  min-width: 320px;
  display: flex;
  justify-content: center;
  gap: 0.7vw;
  padding: 15px 0px 20px 0px;
  position: relative;
}
.square {
  width: 45px;
  position: relative;
  /* border: 1px solid #546e7a; */
  background-color: white;
  box-shadow:
   0 1px rgba(255,255,255,.2) inset,
   0 3px 5px #2c4957,
   0 0 1px 1px rgba(26, 57, 214, 0.2);
   background: linear-gradient(rgb(240, 239, 238), rgba(245, 245, 245, 0.952)) rgb(204, 187, 139);
   user-select: none;
}

.square:after {
  content: '';
  padding-top: 100%;
  display: block;
}
.index {
  position: absolute;
  color: hsl(199, 18%, 40%);
  font-size: 14px;
  font-weight: 500;
  top: -20px;
  transform: translateX(-50%);
  left: 50%;
}
.text {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 21px;
  color: rgb(44, 73, 87);
}
@media (max-width: 1200px) {
  .squares {
    gap: 0.5vw;
  }
  .index {
    font-size: 11px;
    transform: translateX(-50%);
    top: -16px;
    left: 50%;
  }
  .text {
    font-size: 14px;
  }
}
</style>
