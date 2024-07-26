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
import VehicleComposition from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/VehicleComposition.vue'
import VehicleRunningGearDetails from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/NumbersVheels.vue'
import DimensionsSize from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/DimensionsSize.vue'
import WeightCar from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/WeightCar.vue'
import WeightTowedTrailer from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/WeightTowedTrailer.vue'
import EngineCar from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/EngineCar.vue'
import StorageDevice from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/StorageDevice.vue'
import OtherDriveMotors from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/OtherDriveMotors.vue'
import FuelCar from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/FuelCar.vue'
import SupplySystem from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/SupplySystem.vue'
import IgnitionSystem from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/IgnitionSystem.vue'
import NeutralizationSystem from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/NeutralizationSystem.vue'
import ClutchCar from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/ClutchCar.vue'
import TransmissionCar from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/TransmissionCar.vue'
import SuspensionCar from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/SuspensionCar.vue'
import SteerageCar from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/SteerageCar.vue'
import BrakeSystems from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/BrakeSystems.vue'

const tabs = defineModel({ type: Array }) // массив табов
const currentTab = defineModel('tab', { type: String }) //текущая таб

const allComponents = {
  VehicleComposition, // Компоновка СМ
  VehicleRunningGearDetails, // Ходовая часть СМ
  DimensionsSize, //Габаритные размеры
  WeightCar, //Масса
  WeightTowedTrailer, //Масса буксируемого прицепа
  EngineCar, //Двигатель
  StorageDevice, //Устройство накопления энергии
  OtherDriveMotors, //Другие приводные двигатели или комбинации двигателей
  FuelCar, // Топливо
  SupplySystem, // Система питания
  IgnitionSystem, // Система зажигания
  NeutralizationSystem, // Система нейтрализации
  ClutchCar, //Сцепление
  TransmissionCar, //Трансмиссия
  SuspensionCar, //Подвеска
  SteerageCar, //Рулевое управление
  BrakeSystems //Тормозная система
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
