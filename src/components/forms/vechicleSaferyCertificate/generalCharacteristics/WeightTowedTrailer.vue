base-textfield
<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notVehicleTrailerIndicator"
      v-model:data="shema.vehicleVariantDetails.vehicleMaxUnbrakedTrailerWeightMeasure"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleMaxUnbrakedTrailerWeightMeasure"
      label="Буксировка прицепа"
      invert
      :disabled="isLook"
      @change="onChange"
    >
      <div class="full grid12">
        <base-textfield
          v-model="shema.vehicleVariantDetails.vehicleMaxUnbrakedTrailerWeightMeasure.value"
          label="Максимальная масса прицепа без тормозной системы"
          type="number"
          max-length="24"
          class="span6"
          :rules="isO ? [] : [rules.vehicleMaxUnbrakedTrailerWeightMeasure]"
        ></base-textfield>

        <base-autocomplete
          v-model="shema.vehicleVariantDetails.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>
      </div>

      <div class="full grid12">
        <base-textfield
          v-model="shema.vehicleVariantDetails.vehicleMaxBrakedTrailerWeightMeasure.value"
          label="Максимальная масса прицепа с тормозной системой"
          type="number"
          max-length="24"
          class="span6"
          :rules="isO ? [] : [rules.vehicleMaxUnbrakedTrailerWeightMeasure]"
        ></base-textfield>

        <base-autocomplete
          v-model="shema.vehicleVariantDetails.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>
      </div>

      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.vehicleHitchLoadMeasure"
        label="Нагрузка на сцепное устройство транспортного средства"
        :filter-data="shema.vehicleVariantDetails.vehicleHitchLoadMeasure"
        :default-data="shemaDefault.vehicleVariantDetails.vehicleHitchLoadMeasure[0]"
        class="full mt-5"
        :disabled="isLook"
      >
        <div class="full grid12">
          <base-textfield
            v-model="props.item.value"
            label="Нагрузка на сцепное устройство ТС"
            type="number"
            max-length="24"
            class="span6"
            :rules="
              isO
                ? [
                    (v) =>
                      !!+v || `Поле 'Нагрузка на сцепное устройство ТС' обязательно к заполнению`
                  ]
                : [rules.vehicleHitchLoadMeasure(props.item)]
            "
          ></base-textfield>

          <base-autocomplete
            v-model="props.item.measurementUnitCode"
            label="Ед. измерения"
            :items="NSI_033"
            item-value="key"
            class="span6"
          ></base-autocomplete>
        </div>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
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

const isO = computed(() => shema.vehicleTypeDetails.vehicleTechCategoryCode.includes('O'))

function onChange() {
  // функция нужна потому что меняем данные в 3 местах на одном уровне вложености
  shema.vehicleVariantDetails.vehicleHitchLoadMeasure = JSON.parse(
    JSON.stringify(shemaDefault.vehicleVariantDetails.vehicleHitchLoadMeasure)
  )
  shema.vehicleVariantDetails.vehicleMaxBrakedTrailerWeightMeasure = JSON.parse(
    JSON.stringify(shemaDefault.vehicleVariantDetails.vehicleMaxBrakedTrailerWeightMeasure)
  )
}

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
