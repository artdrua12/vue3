<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notVehicleTrailerIndicator"
      v-model:data="shema.vehicleVariantDetails[0].vehicleMaxUnbrakedTrailerWeightMeasure"
      :default-data="shemaDefault.vehicleVariantDetails[0].vehicleMaxUnbrakedTrailerWeightMeasure"
      label="Буксировка прицепа"
      invert
      @change="onChange"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleMaxUnbrakedTrailerWeightMeasure"
        label="Максимальная масса прицепа без тормозной системы"
        :filter-data="shema.vehicleVariantDetails[0].vehicleMaxUnbrakedTrailerWeightMeasure"
        :default-data="
          shemaDefault.vehicleVariantDetails[0].vehicleMaxUnbrakedTrailerWeightMeasure[0]
        "
        class="full mt-5"
      >
        <base-textfield
          v-model.sync="props.item.valueMin"
          label="Минимально*"
          type="number"
          max-length="24"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>

        <base-is-missing-disabled
          v-model="props.item.rangeIndicator"
          v-model:data="props.item.valueMax"
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="props.item.valueMax"
            label="Максимально"
            type="number"
            :disabled="!props.item.rangeIndicator"
            max-length="24"
            :rules="[
              conformityRules.minMax(
                props.item.valueMin,
                props.item.valueMax,
                props.item.rangeIndicator
              )
            ]"
          ></base-textfield>
        </base-is-missing-disabled>
      </base-constructor>

      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleMaxBrakedTrailerWeightMeasure"
        label="Максимальная масса прицепа с тормозной системой"
        :filter-data="shema.vehicleVariantDetails[0].vehicleMaxBrakedTrailerWeightMeasure"
        :default-data="
          shemaDefault.vehicleVariantDetails[0].vehicleMaxBrakedTrailerWeightMeasure[0]
        "
        class="full mt-5"
      >
        <base-textfield
          v-model.sync="props.item.valueMin"
          label="Минимально*"
          type="number"
          max-length="24"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>

        <base-is-missing-disabled
          v-model="props.item.rangeIndicator"
          v-model:data="props.item.valueMax"
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="props.item.valueMax"
            label="Максимально"
            type="number"
            :disabled="!props.item.rangeIndicator"
            max-length="24"
            :rules="[
              conformityRules.minMax(
                props.item.valueMin,
                props.item.valueMax,
                props.item.rangeIndicator
              )
            ]"
          ></base-textfield>
        </base-is-missing-disabled>
      </base-constructor>

      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleHitchLoadMeasure"
        label="Нагрузка на сцепное устройство транспортного средства"
        :filter-data="shema.vehicleVariantDetails[0].vehicleHitchLoadMeasure"
        :default-data="shemaDefault.vehicleVariantDetails[0].vehicleHitchLoadMeasure[0]"
        class="full mt-5"
      >
        <base-textfield
          v-model.sync="props.item.valueMin"
          label="Минимально*"
          type="number"
          max-length="24"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>

        <base-is-missing-disabled
          v-model="props.item.rangeIndicator"
          v-model:data="props.item.valueMax"
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="props.item.valueMax"
            label="Максимально"
            type="number"
            :disabled="!props.item.rangeIndicator"
            max-length="24"
            :rules="[
              conformityRules.minMax(
                props.item.valueMin,
                props.item.valueMax,
                props.item.rangeIndicator
              )
            ]"
          ></base-textfield>
        </base-is-missing-disabled>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_033 = ref([])

function onChange() {
  // функция нужна потому что меняем данные в 3 местах на одном уровне вложености
  shema.vehicleVariantDetails[0].vehicleHitchLoadMeasure = JSON.parse(
    JSON.stringify(shemaDefault.vehicleVariantDetails[0].vehicleHitchLoadMeasure)
  )
  shema.vehicleVariantDetails[0].vehicleMaxBrakedTrailerWeightMeasure = JSON.parse(
    JSON.stringify(shemaDefault.vehicleVariantDetails[0].vehicleMaxBrakedTrailerWeightMeasure)
  )
}

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
