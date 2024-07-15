<template>
  <div class="tabsWrapper">
    <v-tabs v-model="currentTab" align-tabs="right" density="compact" mandatory>
      <v-tab v-for="item in tabs" :id="item.id" :key="item.id" :value="item.component">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-window v-model="currentTab">
      <v-window-item v-for="item in tabs" :id="item.id" :key="item.id" :value="item.component">
        <component :is="getComponent(item.component)" class="pa-7"></component>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import VehicleComposition from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/VehicleComposition.vue' 
import NumbersVheels from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/NumbersVheels.vue'
import DimensionsSize from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/DimensionsSize.vue'
import WeightCar from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/WeightCar.vue'
import WeightTowedTrailer from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/WeightTowedTrailer.vue'
import EngineCar from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/EngineCar.vue'
import ClutchCar from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/ClutchCar.vue'
import TransmissionCar from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/TransmissionCar.vue'
import SuspensionCar from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/SuspensionCar.vue'
import SteerageCar from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/SteerageCar.vue'
import BrakeSystems from '@/components/forms/vechicleSaferyCertificate/generalCharacteristics/BrakeSystems.vue'

const tabs = defineModel({ type: Array }) // массив табов
const currentTab = defineModel('tab', { type: String }) //текущая таб

const allComponents = {
  VehicleComposition,//Компоновка транспортного средства
  NumbersVheels, //Ходовая часть ТС
  DimensionsSize,//Габаритные размеры
  WeightCar, //Масса
  WeightTowedTrailer,//Масса буксируемого прицепа-
  EngineCar,//Двигатель
  ClutchCar, //Сцепление
  TransmissionCar,//Трансмиссия 
  SuspensionCar,//Подвеска
  SteerageCar, //Рулевое управление
  BrakeSystems, //Тормозная система
}
function getComponent(type) {
  return allComponents[type]
}
async function isValidation() {
  // await childCompRef.value[0].isValidate()
  return true
}
defineExpose({
  isValidation
})
</script>
