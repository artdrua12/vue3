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
import { ref } from 'vue'

import DocumentComformity from '@/components/forms/conformityForms/document/DocumentComformity.vue'
import VehicleDetails from '@/components/forms/conformityForms/document/VehicleDetails.vue'
import CertificationAgency from '@/components/forms/conformityForms/document/CertificationAgency.vue'
import DeclarerAddress from '@/components/forms/conformityForms/document/DeclarerAddress.vue'
import ManufacturerAddress from '@/components/forms/conformityForms/document/ManufacturerAddress.vue'
import ManufacturersRepresentativesAddress from '@/components/forms/conformityForms/document/ManufacturersRepresentativesAddress.vue'
import AssemblyPlantAddress from '@/components/forms/conformityForms/document/AssemblyPlantAddress.vue'
import ProviderAddress from '@/components/forms/conformityForms/document/ProviderAddress.vue'
import ViewSpread from '@/components/forms/conformityForms/document/ViewSpread.vue'
import MoreInformations from '@/components/forms/conformityForms/document/MoreInformations.vue'

const tabs = defineModel({ type: Array }) // массив табов
const currentTab = defineModel('tab', { type: String }) //текущая таб

const allComponents = {
  DocumentComformity,
  VehicleDetails,
  CertificationAgency,
  DeclarerAddress,
  ManufacturerAddress,
  ManufacturersRepresentativesAddress,
  AssemblyPlantAddress,
  ProviderAddress,
  ViewSpread,
  MoreInformations
}
function getComponent(type) {
  return allComponents[type]
}
</script>

<style></style>
