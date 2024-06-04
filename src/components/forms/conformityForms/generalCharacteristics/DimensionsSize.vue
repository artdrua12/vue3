<template>
  <div class="adaptiveGrid">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.lengthMeasure"
      label="Длина"
      :filter-data="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.lengthMeasure"
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleOverallDimensionDetails.lengthMeasure[0]
      "
      class="full mt-5"
    >
      <base-textfield
        v-model.sync="props.item.valueMin"
        label="Минимально"
        type="number"
        max-length="24"
        :rules="[conformityRules.lengthMeasure]"
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

    <!-- Ширина -->
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.widthMeasure"
      label="Ширина"
      :filter-data="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.widthMeasure"
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleOverallDimensionDetails.widthMeasure[0]
      "
      class="full mt-5"
    >
      <base-textfield
        v-model.sync="props.item.valueMin"
        label="Минимально"
        type="number"
        max-length="24"
        :rules="[conformityRules.lengthMeasure]"
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

    <!-- Высота -->
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.heightMeasure"
      label="Высота"
      :filter-data="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.heightMeasure"
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleOverallDimensionDetails.heightMeasure[0]
      "
      class="full mt-5"
    >
      <base-textfield
        v-model.sync="props.item.valueMin"
        label="Минимально"
        type="number"
        max-length="24"
        :rules="[conformityRules.lengthMeasure]"
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

    <!-- Высота в рабочем положении -->
    <base-constructor
      v-slot="props"
      v-model="
        shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.workingPositionHeightMeasure
      "
      label="Высота в рабочем положении"
      :filter-data="
        shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.workingPositionHeightMeasure
      "
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleOverallDimensionDetails
          .workingPositionHeightMeasure[0]
      "
      class="full mt-5"
    >
      <base-textfield
        v-model.sync="props.item.valueMin"
        label="Минимально"
        type="number"
        max-length="24"
        :rules="[conformityRules.lengthMeasure]"
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

    <!-- Дополнительные параметры для контейнеровоза -->
    <base-is-missing
      v-if="
        shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.conformityDocKindCode !== '35'
      "
      v-model="
        shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.containerParametersIndicator
      "
      v-model:data="
        shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.loadingHeightMeasure
      "
      :disabled="!!shema.vehicleTypeDetails.vehicleTechCategoryCode.toString().match(/L|M/)"
      label="Дополнительные параметры для контейнеровоза"
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleOverallDimensionDetails.loadingHeightMeasure
      "
      class="full"
      invert
      @change="onChange"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.loadingHeightMeasure"
        label="Высота (погрузочная)"
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.loadingHeightMeasure
        "
        :default-data="defaultData[0]"
        class="full mt-5"
      >
        <base-textfield
          v-model.sync="props.item.valueMin"
          label="Минимально"
          type="number"
          max-length="24"
          :rules="[conformityRules.lengthMeasure]"
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

      <!-- Высота (максимально допустимая) -->
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.maxHeightMeasure"
        label="Высота (максимально допустимая)"
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.maxHeightMeasure
        "
        :default-data="defaultData[0]"
        class="full mt-5"
      >
        <base-textfield
          v-model.sync="props.item.valueMin"
          label="Минимально"
          type="number"
          max-length="24"
          :rules="[conformityRules.lengthMeasure]"
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
const defaultData = [
  {
    measurementUnitCode: 'MMT',
    rangeIndicator: false,
    valueMax: 0,
    valueMin: 0
  }
]

function onChange() {
  // функция нужна потому что меняем данные в двух местах на одном уровне вложености
  shema.vehicleVariantDetails[0].vehicleOverallDimensionDetails.maxHeightMeasure = JSON.parse(
    JSON.stringify(
      shemaDefault.vehicleVariantDetails[0].vehicleOverallDimensionDetails.maxHeightMeasure
    )
  )
}

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
