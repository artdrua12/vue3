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
const childCompRef = ref(null) // ссылка на дочерний компонент

const allComponents = {
  DocumentComformity, // документ
  VehicleDetails, // Транспортное средство
  CertificationAgency, // Наименование органа выдавшего документ
  DeclarerAddress, //Заявитель и его адрес
  ManufacturerAddress, //Изготовитель и его адрес
  ManufacturersRepresentativesAddress, //Представить изготовитель и его адрес
  AssemblyPlantAddress, //Сборочный завод и его адрес
  ProviderAddress, // Поставщик сборочных комплектов
  ViewSpread, // Вид распростанения
  MoreInformations // Дополнительная информация
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
