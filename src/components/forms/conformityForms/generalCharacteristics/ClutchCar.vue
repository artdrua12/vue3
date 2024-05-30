<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].notVehicleClutch"
      v-model:data="
        shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails
      "
      :default-data="defaultData"
      label="Сцепление - отсутствует"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails"
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleClutchDetails
        "
        :default-data="defaultData[0]"
        class="full"
        label="Сцепление"
      >
        <base-textarea
          v-model="props.item.vehicleComponentText"
          label="Описание типа*"
          :validators="[conformityRules.vehicleClutchType]"
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
import shema from '@/components/forms/shema'
import { conformityRules } from '../rules'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'

const defaultData = [
  {
    vehicleClutchType: '',
    vehicleComponentMakeName: '',
    vehicleComponentText: ''
  }
]
</script>
