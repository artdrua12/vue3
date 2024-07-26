<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.notSteeringWheel"
      v-model:data="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleSteeringDetails"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails.vehicleSteeringDetails
      "
      label="Рулевого управления - отсутствует"
      class="full"
      :disabled="isLook"
    >
      <base-textfield
        v-model="
          shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleSteeringDetails
            .vehicleComponentMakeName
        "
        label="Марка рулевого управления"
        max-length="120"
        class="full"
      ></base-textfield>

      <base-textarea
        v-model="
          shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleSteeringDetails
            .vehicleComponentText
        "
        label="Описание типа рулевого управления"
        :validators="
          ['O1', 'O2', 'O3', 'O4'].includes(shema.vehicleTypeDetails.vehicleTechCategoryCode)
            ? []
            : [rules.wheelType]
        "
        class="full"
      ></base-textarea>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const NSI_027 = ref([])
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

async function load() {
  NSI_027.value = (await indexDB.getFromDatabase('catalog', 'NSI_027')) || []
}
load()
</script>
