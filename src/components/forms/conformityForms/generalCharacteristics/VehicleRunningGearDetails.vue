<template>
  <div
    v-if="
      shema.vehicleTypeDetails.vehicleTechCategoryCode.find((i) =>
        [
          'M1',
          'M1G',
          'M2',
          'M2G',
          'M3',
          'M3G',
          'L1',
          'L2',
          'L3',
          'L4',
          'L5',
          'L6',
          'L7',
          'N1',
          'N1G',
          'N2',
          'N2G',
          'N3',
          'N3G'
        ].includes(i)
      )
    "
    class="adaptiveGrid mt-5"
  >
    <base-autocomplete
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelFormula"
      :items="NSI_045"
      label="Колесная формула*"
      :rules="[conformityRules.vehicleWheelFormula]"
      multiple
      class="span6"
    ></base-autocomplete>

    <base-autocomplete
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].poweredWheel"
      label="Ведущие колеса*"
      :items="NSI_079"
      max-length="120"
      :rules="[conformityRules.poweredWheel]"
      multiple
      class="span6"
    ></base-autocomplete>

    <base-textfield
      v-if="
        shema.vehicleTypeDetails.vehicleTechCategoryCode.find((i) =>
          ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'].includes(i)
        )
      "
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelLocation"
      label="Расположение колес"
      max-length="1000"
    ></base-textfield>

    <base-combobox
      v-if="
        shema.vehicleTypeDetails.vehicleTechCategoryCode.find((i) =>
          ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'].includes(i)
        )
      "
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleFrameText"
      label="Рама"
      max-length="1000"
    ></base-combobox>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const shema = useShemaStore().shema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_045 = ref([])
const NSI_079 = ref([])

async function load() {
  NSI_045.value = (await indexDB.getFromDatabase('catalog', 'NSI_045')) || []
  NSI_079.value = (await indexDB.getFromDatabase('catalog', 'NSI_079')) || []
}
load()
</script>
