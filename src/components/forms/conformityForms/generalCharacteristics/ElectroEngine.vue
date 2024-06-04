<template>
  <base-constructor
    v-slot="props"
    v-model="shema.vehicleVariantDetails[0].vehicleElectricalMachineDetails"
    :filter-data="shema.vehicleVariantDetails[0].vehicleElectricalMachineDetails"
    :default-data="shemaDefault.shema.vehicleVariantDetails[0].vehicleElectricalMachineDetails[0]"
    class="full"
    label="Электродвигатель"
  >
    <base-autocomplete
      v-model="props.item.electricalMachineKindCode"
      label="Вид электромашины*"
      :items="NSI_028"
      item-value="key"
      class="span6"
    ></base-autocomplete>

    <base-textfield
      v-model="props.item.vehicleComponentMakeName"
      label="Марка*"
      :validators="[conformityRules.vehicleComponentMakeName]"
      max-length="1000"
      class="span6"
    ></base-textfield>

    <base-autocomplete
      v-model="props.item.vehicleComponentText"
      label="Тип электромашины*"
      :items="NSI_060"
      :rules="[conformityRules.electricalMachineType]"
      class="full"
    ></base-autocomplete>

    <base-textfield
      v-model="props.item.electricalMachineVoltageMeasure.value"
      label="Рабочее напряжение, B*"
      :rules="[conformityRules.electricalMachineVoltageMeasure]"
      type="number"
      max-length="24"
      class="span3"
    ></base-textfield>

    <base-autocomplete
      v-model="props.item.electricalMachineVoltageMeasure.measurementUnitCode"
      label="Ед. измерения"
      :items="NSI_033"
      item-value="key"
      class="span3"
    ></base-autocomplete>

    <base-textfield
      v-model="props.item.electricMotorPowerMeasure.value"
      label="Максимальная 30-минутная мощность"
      type="number"
      max-length="24"
      class="span3"
    ></base-textfield>

    <base-autocomplete
      v-model="props.item.electricMotorPowerMeasure.measurementUnitCode"
      label="Ед. измерения"
      :items="NSI_033"
      item-value="key"
      class="span3"
    ></base-autocomplete>
  </base-constructor>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_028 = ref([])
const NSI_033 = ref([])
const NSI_060 = ref([])

async function load() {
  NSI_028.value = (await indexDB.getFromDatabase('catalog', 'NSI_028')) || []
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
  NSI_060.value = (await indexDB.getFromDatabase('catalog', 'NSI_060')) || []
}
load()
</script>
