<template>
  <v-form ref="form" :disabled="isLook" class="adaptiveGrid mt-5">
    <base-autocomplete
      v-if="
        shema.vehicleTypeDetails.vehicleTechCategoryCode.every(
          (i) => !['O1', 'O2', 'O3', 'O4'].includes(i)
        )
      "
      v-model="shema.vehicleTypeDetails.vehicleLayoutPatternText"
      :items="NSI_050"
      label="Схема компоновки транспортного средства*"
      max-length="250"
      chips
      :rules="[conformityRules.vehicleLayoutPatternText]"
      multiple
      class="full"
    ></base-autocomplete>

    <base-autocomplete
      v-if="conformityDocKindCodeis35"
      v-model="shema.vehicleVariantDetails[0].vehicleChassisDesignCode"
      label="Код варианта изготовления шасси транспортного средства"
      :items="NSI_017"
      multiple
      chips
      class="full"
    ></base-autocomplete>

    <base-constructor-one-element
      v-slot="props"
      v-model="shema.vehicleTypeDetails.vehicleEquipmentText"
      class="full"
      :disabled="isLook"
    >
      <base-textarea
        v-model="shema.vehicleTypeDetails.vehicleEquipmentText[props.index]"
        label="Оборудование транспортного средства"
      >
      </base-textarea>
    </base-constructor-one-element>

    <base-checkbox
      v-if="conformityDocKindCodeis35"
      v-model="shema.isNotRequiredVehicleEmergencyCallDeviceIndicator"
      label="Возможность оформления ЭПТС без УВЭОС"
      style="margin-top: -0.4rem"
      :disabled="
        shema.vehicleVariantDetails[0].vehicleEmergencyCallDeviceIndicator ||
        !shema.docId.match(/^ТС /) ||
        isLook
      "
      class="span6"
    >
    </base-checkbox>
    <base-checkbox
      v-if="conformityDocKindCodeis35"
      v-model="shema.vehicleVariantDetails[0].vehicleEmergencyCallDeviceIndicator"
      label="Оборудование УВЭОС"
      :disabled="
        shema.vehicleTypeDetails.isNotRequiredVehicleEmergencyCallDeviceIndicator ||
        !shema.docId.match(/^ТС /) ||
        isLook
      "
      class="span6"
    ></base-checkbox>

    <base-autocomplete
      v-if="
        shema.vehicleTypeDetails.vehicleTechCategoryCode.find(
          (i) => !['O1', 'O2', 'O3', 'O4'].includes(i)
        )
      "
      label="Расположение двигателя*"
      :items="NSI_047"
      :model="shema.vehicleVariantDetails[0].vehicleComponentLocationText"
      multiple
      chips
      :rules="[conformityRules.vehicleComponentLocationText]"
      max-length="1000"
      class="full"
    ></base-autocomplete>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import { conformityRules } from '@/components/forms/conformityForms/rules'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const conformityDocKindCodeis35 = computed(() => {
  return shema.conformityDocKindCode === '35'
})
const NSI_017 = ref([])
const NSI_047 = ref([])
const NSI_050 = ref([])

async function load() {
  NSI_017.value = (await indexDB.getFromDatabase('catalog', 'NSI_017')) || []
  NSI_047.value = (await indexDB.getFromDatabase('catalog', 'NSI_047')) || []
  NSI_050.value = (await indexDB.getFromDatabase('catalog', 'NSI_050')) || []
}
load()
</script>
