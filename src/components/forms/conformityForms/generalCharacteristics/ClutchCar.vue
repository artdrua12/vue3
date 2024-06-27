<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].notVehicleClutch"
      v-model:data="
        shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails
      "
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails
      "
      label="Сцепление - отсутствует"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails"
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails
        "
        :default-data="
          shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails[0]
        "
        class="full"
        label="Сцепление"
      >
        <base-textarea
          v-model="props.item.vehicleComponentText"
          label="Описание типа*"
          :rules="[conformityRules.vehicleClutchType]"
          class="full"
        ></base-textarea>

        <base-textfield
          v-model="props.item.vehicleComponentMakeName"
          label="Марка"
          class="full"
        ></base-textfield>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import { useShemaStore } from '@/stores/shemaStore'
const shema = useShemaStore().shema //схема
</script>
