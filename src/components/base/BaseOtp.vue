<template>
  <div class="otp">
    <div class="title_container">
      <p v-for="itm in 17" :key="itm" class="title_text">{{ itm }}</p>
    </div>
    <div style="overflow: hidden">
      <v-otp-input
        v-model="otp"
        length="17"
        max-height="55"
        max-width="100%"
        color="white"
        placeholder="?"
        style="overflow: hidden"
      ></v-otp-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const otp = ref('1234567')
</script>

<style>
.v-otp-input__content {
  min-width: 7px;
}
.v-otp-input .v-field {
  min-width: 15px;
}

@media (max-width: 1200px) {
  .v-otp-input__content {
    gap: 0px;
  }
}
</style>

<style scoped>
.otp {
  overflow: hidden;
}
/* .v-otp-input__field{
  min-width: 10px;
} */
.title_container {
  display: flex;
  gap: 0.5rem;
  padding: 0 0.5rem 0 0.5rem;
  justify-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: -7px;
  min-width: 17px;
  color: #69808a;
}
.title_text {
  min-width: 15px;
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 14px;
  height: 10px;
}
.squares {
  max-width: 900px;
  min-width: 300px;
  overflow: hidden;
  margin: auto;
}
@media (max-width: 1200px) {
  .title_container {
    gap: 0px;
  }
}
</style>
