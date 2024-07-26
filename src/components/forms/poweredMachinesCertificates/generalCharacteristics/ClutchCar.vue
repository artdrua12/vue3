<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.notVehicleClutchIndicator"
      v-model:data="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleClutchDetails"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails.vehicleClutchDetails
      "
      label="Сцепление - отсутствует"
      :disabled="isLook"
    >
      <base-textfield
        v-model="
          shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleClutchDetails
            .vehicleClutchType
        "
        label="Тип сцепления*"
        class="full"
        :rules="[rules.vehicleClutchType]"
      ></base-textfield>

      <base-textfield
        v-model="
          shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleClutchDetails
            .vehicleComponentMakeName
        "
        label="Марка"
        class="full"
      ></base-textfield>

    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
</script>
