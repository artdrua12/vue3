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
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleSteeringDetails"
        :filter-data="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleSteeringDetails"
        :default-data="
          shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails.vehicleSteeringDetails[0]
        "
        class="full"
        label="Рулевое управление"
        :disabled="isLook"
      >
        <base-textfield
          v-model="props.item.vehicleComponentMakeName"
          label="Марка рулевого управления"
          max-length="120"
          class="span6"
        ></base-textfield>

        <base-textarea
          v-model="props.item.vehicleComponentText"
          label="Описание (тип) *"
          class="span6"
        ></base-textarea>

        <base-autocomplete
          v-model="props.item.steeringWheelPositionName"
          label="Положение рулевого колеса"
          item-text="title"
          :items="NSI_027"
          class="span6"
        ></base-autocomplete>

        <base-textarea
          v-model="props.item.vehicleComponentLocationText"
          label="Описание места расположения рулевого управления, достаточное для его обнаружения"
          class="span6"
        ></base-textarea>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
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
