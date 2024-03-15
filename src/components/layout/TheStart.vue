<template>
  <div class="startWraper">
    <div class="start">
        <img src="../../assets/logo.png" width="250">
      <h1>ЦНИИТУ</h1>
      <h2>национальный </h2>
      <h3>оператор АИС СЭП РБ</h3>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.startWraper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  /* background: url(../../assets/123.avif) repeat;
  filter: drop-shadow(16px 16px 20px rgb(255, 255, 255)) invert(55%); */
  background: url(../../assets/bg6.avif) repeat;
}
.start {
  margin: auto;
  background-color: rgba(240, 248, 255, 0.555);
  padding: 50px;
  text-align: center;
}
h1,h2,
h3 {
  font-weight: 1000;
  background-color: #b9b9b9;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.3);
  margin: 0px;
  padding: 0px;
}
h1{
    font-size: 70px;
}
h2{
    font-size: 45px; 
}
h3{
    font-size: 30px;
}
</style>
