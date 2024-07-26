base-textfield
<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notVehicleTrailerIndicator"
      v-model:data="shema.vehicleVariantDetails.vehicleTrailer"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleTrailer"
      label="Буксировка прицепа"
      invert
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.vehicleTrailer"
        label="Масса"
        :filter-data="shema.vehicleVariantDetails.vehicleTrailer"
        :default-data="shemaDefault.vehicleVariantDetails.vehicleTrailer[0]"
        class="full mt-5"
        :disabled="isLook"
      >
        <base-constructor
          v-slot="props2"
          v-model="props.item.permissibleTowableWeightMeasure"
          label="Технически допустимая буксируемая масса"
          :filter-data="props.item.permissibleTowableWeightMeasure"
          :default-data="
            shemaDefault.vehicleVariantDetails.vehicleTrailer[0].permissibleTowableWeightMeasure[0]
          "
          class="full mt-5"
          :disabled="isLook"
        >
          <div class="full grid12">
            <base-textfield
              v-model="props2.item.value"
              label="Значение"
              type="number"
              max-length="24"
              class="span6"
            ></base-textfield>

            <base-autocomplete
              v-model="props2.item.measurementUnitCode"
              label="Ед. измерения"
              :items="NSI_033"
              item-value="key"
              class="span6"
            ></base-autocomplete>
          </div>
        </base-constructor>

        <base-constructor
          v-slot="props2"
          v-model="props.item.vehicleMaxUnbrakedTrailerWeightMeasure"
          label="Масса прицепа без тормозной системы"
          :filter-data="props.item.vehicleMaxUnbrakedTrailerWeightMeasure"
          :default-data="
            shemaDefault.vehicleVariantDetails.vehicleTrailer[0].vehicleMaxUnbrakedTrailerWeightMeasure[0]
          "
          class="full mt-5"
          :disabled="isLook"
        >
          <div class="full grid12">
            <base-textfield
              v-model="props2.item.value"
              label="Значение"
              type="number"
              max-length="24"
              class="span6"
            ></base-textfield>

            <base-autocomplete
              v-model="props2.item.measurementUnitCode"
              label="Ед. измерения"
              :items="NSI_033"
              item-value="key"
              class="span6"
            ></base-autocomplete>
          </div>
        </base-constructor>

        <base-constructor
          v-slot="props2"
          v-model="props.item.vehicleMaxBrakedTrailerWeightMeasure"
          label="Масса прицепа с тормозной системой"
          :filter-data="props.item.vehicleMaxBrakedTrailerWeightMeasure"
          :default-data="
            shemaDefault.vehicleVariantDetails.vehicleTrailer[0].vehicleMaxBrakedTrailerWeightMeasure[0]
          "
          class="full mt-5"
          :disabled="isLook"
        >
          <div class="full grid12">
            <base-textfield
              v-model="props2.item.value"
              label="Значение"
              type="number"
              max-length="24"
              class="span6"
            ></base-textfield>

            <base-autocomplete
              v-model="props2.item.measurementUnitCode"
              label="Ед. измерения"
              :items="NSI_033"
              item-value="key"
              class="span6"
            ></base-autocomplete>
          </div>
        </base-constructor>

        
        <base-constructor
          v-slot="props2"
          v-model="props.item.vehicleHitchLoadMeasure"
          label="Нагрузка на сцепное устройство СМ"
          :filter-data="props.item.vehicleHitchLoadMeasure"
          :default-data="
            shemaDefault.vehicleVariantDetails.vehicleTrailer[0].vehicleHitchLoadMeasure[0]
          "
          class="full mt-5"
          :disabled="isLook"
        >
          <div class="full grid12">
            <base-textfield
              v-model="props2.item.value"
              label="Значение"
              type="number"
              max-length="24"
              class="span6"
            ></base-textfield>

            <base-autocomplete
              v-model="props2.item.measurementUnitCode"
              label="Ед. измерения"
              :items="NSI_033"
              item-value="key"
              class="span6"
            ></base-autocomplete>
          </div>
        </base-constructor>

      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import { useRoute } from 'vue-router'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const route = useRoute()
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const NSI_033 = ref([])

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
