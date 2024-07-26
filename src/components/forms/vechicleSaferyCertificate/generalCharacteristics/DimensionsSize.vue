<template>
  <v-form ref="form" :disabled="isLook" class="grid12">
    <p class="full title">Длина ширина высота</p>
    <!-- Длина -->
    <base-textfield
      v-model="
        shema.vehicleVariantDetails.vehicleOverallDimensionDetails.widthMeasure[0].valueMin
      "
      label="Длина*"
      type="number"
      max-length="24"
      class="span6"
      :rules="[rules.lengthMeasure]"
    ></base-textfield>
    <base-autocomplete
      v-model="
        shema.vehicleVariantDetails.vehicleOverallDimensionDetails.lengthMeasure[0]
          .measurementUnitCode
      "
      label="Ед. измерения"
      :items="NSI_033"
      item-value="key"
      class="span6"
    ></base-autocomplete>

    <!-- Ширина -->
    <base-textfield
      v-model="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.widthMeasure[0].valueMin"
      label="Ширина*"
      type="number"
      max-length="24"
      :rules="[rules.widthMeasure]"
      class="span6"
    ></base-textfield>

    <base-autocomplete
      v-model="
        shema.vehicleVariantDetails.vehicleOverallDimensionDetails.widthMeasure[0]
          .measurementUnitCode
      "
      label="Ед. измерения"
      :items="NSI_033"
      item-value="key"
      class="span6"
    ></base-autocomplete>

    <base-textfield
      v-model="shema.vehicleVariantDetails.vehicleOverallDimensionDetails.heightMeasure[0].valueMin"
      label="Высота*"
      type="number"
      max-length="24"
      class="span6"
      :rules="[rules.heightMeasure]"
    ></base-textfield>

    <base-autocomplete
      v-model="
        shema.vehicleVariantDetails.vehicleOverallDimensionDetails.heightMeasure[0]
          .measurementUnitCode
      "
      label="Ед. измерения"
      :items="NSI_033"
      item-value="key"
      class="span6"
    ></base-autocomplete>

    <!-- Дополнительные параметры для контейнеровоза -->
    <base-is-missing
      v-model="
        shema.vehicleVariantDetails.vehicleOverallDimensionDetails.containerParametersIndicator
      "
      v-model:data="
        shema.vehicleVariantDetails.vehicleOverallDimensionDetails.loadingHeightMeasure[0].valueMin
      "
      :disabled="false"
      label="Дополнительные параметры для контейнеровоза"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleOverallDimensionDetails.loadingHeightMeasure[0]
          .valueMin
      "
      class="full"
      invert
      @change="onChange"
    >
      <div class="grid12 full">
        <!-- Высота (погрузочная) -->
        <base-textfield
          v-model="
            shema.vehicleVariantDetails.vehicleOverallDimensionDetails.loadingHeightMeasure[0]
              .valueMin
          "
          label="Высота (погрузочная)*"
          max-length="24"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="
            shema.vehicleVariantDetails.vehicleOverallDimensionDetails.loadingHeightMeasure[0]
              .measurementUnitCode
          "
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <!-- Высота (максимально допустимая) -->
        <base-textfield
          v-model="
            shema.vehicleVariantDetails.vehicleOverallDimensionDetails.maxHeightMeasure[0].valueMin
          "
          label="Высота (максимально допустимая)*"
          type="number"
          max-length="24"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="
            shema.vehicleVariantDetails.vehicleOverallDimensionDetails.maxHeightMeasure[0]
              .measurementUnitCode
          "
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>
      </div>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import { useRoute } from 'vue-router'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB

const route = useRoute()
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const NSI_033 = ref([])

function onChange() {
  // функция нужна потому что меняем данные в двух местах на одном уровне вложености
  shema.vehicleVariantDetails.vehicleOverallDimensionDetails.maxHeightMeasure[0].valueMin =
    JSON.parse(
      JSON.stringify(
        shemaDefault.vehicleVariantDetails.vehicleOverallDimensionDetails.maxHeightMeasure[0]
          .valueMin
      )
    )
}

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
