<template>
  <v-form ref="form" :disabled="isLook" class="grid12">
    <!-- Длина -->
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.lengthMeasure"
      :filter-data="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.lengthMeasure"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleOverallDimensionDetails.lengthMeasure[0]
      "
      class="full"
      label="Базовое ТС"
      :disabled="isLook"
    >
      <base-checkbox
        v-model="props.item.rangeIndicator"
        label="Признак интервала значений"
        class="full"
        :disabled="isLook"
        @change="props.item.valueMax = 0"
      ></base-checkbox>
      <div class="full grid12">
        <base-textfield
          v-model="props.item.valueMin"
          label="Минимально"
          type="number"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-textfield
          v-model="props.item.valueMax"
          label="Максимально"
          type="number"
          :disabled="!props.item.rangeIndicator || isLook"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span4"
        ></base-autocomplete>
      </div>
    </base-constructor>

    <!-- Ширина -->
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.widthMeasure"
      :filter-data="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.widthMeasure"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleOverallDimensionDetails.widthMeasure[0]
      "
      class="full"
      label="Базовое ТС"
      :disabled="isLook"
    >
      <base-checkbox
        v-model="props.item.rangeIndicator"
        label="Признак интервала значений"
        class="full"
        :disabled="isLook"
        @change="props.item.valueMax = 0"
      ></base-checkbox>
      <div class="full grid12">
        <base-textfield
          v-model="props.item.valueMin"
          label="Минимально"
          type="number"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-textfield
          v-model="props.item.valueMax"
          label="Максимально"
          type="number"
          :disabled="!props.item.rangeIndicator || isLook"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span4"
        ></base-autocomplete>
      </div>
    </base-constructor>

    <!-- Высота -->
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.heightMeasure"
      :filter-data="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.heightMeasure"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleOverallDimensionDetails.heightMeasure[0]
      "
      class="full"
      label="Базовое ТС"
      :disabled="isLook"
    >
      <base-checkbox
        v-model="props.item.rangeIndicator"
        label="Признак интервала значений"
        class="full"
        :disabled="isLook"
        @change="props.item.valueMax = 0"
      ></base-checkbox>
      <div class="full grid12">
        <base-textfield
          v-model="props.item.valueMin"
          label="Минимально"
          type="number"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-textfield
          v-model="props.item.valueMax"
          label="Максимально"
          type="number"
          :disabled="!props.item.rangeIndicator || isLook"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span4"
        ></base-autocomplete>
      </div>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'

import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { useRoute } from 'vue-router'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB

const route = useRoute()
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const NSI_033 = ref([])

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
