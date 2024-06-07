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

import VehicleComposition from '@/components/forms/conformityForms/generalCharacteristics/VehicleComposition.vue'
import VehicleRunningGearDetails from '@/components/forms/conformityForms/generalCharacteristics/VehicleRunningGearDetails.vue'
import VehicleAxis from '@/components/forms/conformityForms/generalCharacteristics/VehicleAxis.vue'
import DimensionsSize from '@/components/forms/conformityForms/generalCharacteristics/DimensionsSize.vue'
import WeightCar from '@/components/forms/conformityForms/generalCharacteristics/WeightCar.vue'
import WeightTowedTrailer from '@/components/forms/conformityForms/generalCharacteristics/WeightTowedTrailer.vue'
import EngineCar from '@/components/forms/conformityForms/generalCharacteristics/EngineCar.vue'
import StorageDevice from '@/components/forms/conformityForms/generalCharacteristics/StorageDevice.vue'
import FuelCar from '@/components/forms/conformityForms/generalCharacteristics/FuelCar.vue'
import SupplySystem from '@/components/forms/conformityForms/generalCharacteristics/SupplySystem.vue'
import IgnitionSystem from '@/components/forms/conformityForms/generalCharacteristics/IgnitionSystem.vue'
import NeutralizationSystem from '@/components/forms/conformityForms/generalCharacteristics/NeutralizationSystem.vue'
import ClutchCar from '@/components/forms/conformityForms/generalCharacteristics/ClutchCar.vue'
import TransmissionCar from '@/components/forms/conformityForms/generalCharacteristics/TransmissionCar.vue'
import SuspensionCar from '@/components/forms/conformityForms/generalCharacteristics/SuspensionCar.vue'
import SteerageCar from '@/components/forms/conformityForms/generalCharacteristics/SteerageCar.vue'
import BrakeSystems from '@/components/forms/conformityForms/generalCharacteristics/BrakeSystems.vue'
import TiresCar from '@/components/forms/conformityForms/generalCharacteristics/TiresCar.vue'

const tabs = defineModel({ type: Array }) // массив табов
const currentTab = defineModel('tab', { type: String }) //текущая таб

const allComponents = {
  VehicleComposition,
  VehicleRunningGearDetails,
  VehicleAxis,
  DimensionsSize,
  WeightCar,
  WeightTowedTrailer,
  EngineCar,
  StorageDevice,
  FuelCar,
  SupplySystem,
  IgnitionSystem,
  NeutralizationSystem,
  ClutchCar,
  TransmissionCar,
  SuspensionCar,
  SteerageCar,
  BrakeSystems,
  TiresCar
}
function getComponent(type) {
  return allComponents[type]
}
</script>

<style></style>
