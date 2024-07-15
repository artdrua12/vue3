<template>
  <div class="tabsWrapper">
    <v-tabs v-model="currentTab" align-tabs="right" density="compact" mandatory>
      <v-tab v-for="item in tabs" :key="item.component" :value="item.component">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-window v-model="currentTab">
      <v-window-item v-for="item in tabs" :key="item.component" :value="item.component">
        <component :is="getComponent(item.component)" ref="childCompRef" class="pa-7"></component>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import DocumentVechicle from '@/components/forms/vechicleSaferyCertificate/generalInformation/DocumentVechicle.vue'
import VehicleDetails from '@/components/forms/vechicleSaferyCertificate/generalInformation/VehicleDetails.vue'
import VehicleId from '@/components/forms/vechicleSaferyCertificate/generalInformation/VehicleId.vue'
import CertificationAgency from '@/components/forms/vechicleSaferyCertificate/generalInformation/CertificationAgency.vue'
import DeclarerAddress from '@/components/forms/vechicleSaferyCertificate/generalInformation/DeclarerAddress.vue'
import ManufacturerAddress from '@/components/forms/vechicleSaferyCertificate/generalInformation/ManufacturerAddress.vue'
import AssemblyPlantAddress from '@/components/forms/vechicleSaferyCertificate/generalInformation/AssemblyPlantAddress.vue'
import MoreInformations from '@/components/forms/vechicleSaferyCertificate/generalInformation/MoreInformations.vue'

const tabs = defineModel({ type: Array }) // массив табов
const currentTab = defineModel('tab', { type: String }) //текущая таб
const childCompRef = ref(null) // ссылка на дочерний компонент

const allComponents = {
  DocumentVechicle, //Документ об оценке соответствия
  VehicleDetails, //Транспортное средство
  VehicleId, //Идентификационный номер ТС
  CertificationAgency, //Орган по сертификации
  DeclarerAddress, //Заявитель и его адрес
  ManufacturerAddress, //Изготовитель и его адрес
  AssemblyPlantAddress, //Сборочный завод и его адрес
  MoreInformations //Ограничения
}
function getComponent(type) {
  return allComponents[type]
}

//  проверяем на валидность все tab, если находим невалидный, прекращаем проверку
async function isValidation() {
  for (let i = 0; i < tabs.value.length; i++) {
    currentTab.value = tabs.value[i].component
    await nextTick()
    const check = await childCompRef.value[i]?.isValidation() // вызываем валидацию дочернего компонента
    if (check == false) {
      return false
    }
  }
  return true
}
// для того что бы метод был доступен у родителя
defineExpose({
  isValidation
})
</script>
