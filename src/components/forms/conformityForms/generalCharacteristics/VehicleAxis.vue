<template>
  <v-form ref="form" :disabled="isLook" class="adaptiveGrid mt-5">
    <base-textfield
      v-if="
        shema.vehicleTypeDetails.vehicleTechCategoryCode.find((i) =>
          ['O1', 'O2', 'O3', 'O4'].includes(i)
        )
      "
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleAxleQuantity"
      label="Количество осей"
      type="number"
      class="span6"
    ></base-textfield>

    <base-combobox
      v-if="
        shema.vehicleTypeDetails.vehicleTechCategoryCode.find((i) =>
          ['O1', 'O2', 'O3', 'O4'].includes(i)
        )
      "
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelQuantity"
      label="Количество колес"
      type="number"
      max-length="4"
      class="span6"
    ></base-combobox>

    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleAxleDetails"
      label="Ось транспортного средства"
      :filter-data="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleAxleDetails"
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleAxleDetails[0]
      "
      class="full"
      :disabled="isLook"
    >
      <base-textfield
        v-model="props.item.vehicleAxleOrdinal"
        label="Порядковый номер оси транспортного средства"
        type="number"
        class="full"
      ></base-textfield>

      <p class="title full">Технически допустимая максимальная масса на ось</p>

      <base-checkbox
        v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.rangeIndicator"
        label="Признак интервала значений"
        class="full"
        @change="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.maxValue = 0"
      ></base-checkbox>

      <div class="full grid12">
        <base-textfield
          v-model.sync="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value"
          label="Минимально"
          type="number"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-textfield
          v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.maxValue"
          label="Максимально"
          type="number"
          :disabled="
            !props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.rangeIndicator || isLook
          "
          max-length="24"
          :rules="[
            conformityRules.minMax(
              props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value,
              props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.maxValue,
              props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.rangeIndicator
            )
          ]"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="
            props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.measurementUnitCode
          "
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span4"
        ></base-autocomplete>
      </div>

      <base-checkbox
        v-model="props.item.dualTireAxleIndicator"
        label="Признак оси колес со сдвоенными шинами"
        class="span6"
      ></base-checkbox>
      <base-checkbox
        v-model="props.item.steeringAxleIndicator"
        label="Признак управляемой оси"
        class="span6"
      ></base-checkbox>
      <base-checkbox
        v-model="props.item.drivingAxleIndicator"
        label="Признак ведущей оси"
        class="span6"
      ></base-checkbox>
      <base-checkbox
        v-model="props.item.brakingAxleIndicator"
        label="Признак тормозной оси"
        class="span6"
      ></base-checkbox>

      <p class="title full mt-3">Величина колеи оси транспортного средства</p>

      <base-checkbox
        v-model="props.item.vehicleAxleSweptPathMeasure.rangeIndicator"
        label="Признак интервала значений"
        class="full"
        @change="props.item.vehicleAxleSweptPathMeasure.maxValue = 0"
      ></base-checkbox>

      <div class="full grid12">
        <base-textfield
          v-model.sync="props.item.vehicleAxleSweptPathMeasure.value"
          label="Минимально"
          type="number"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-textfield
          v-model="props.item.vehicleAxleSweptPathMeasure.maxValue"
          label="Максимально"
          type="number"
          :disabled="!props.item.vehicleAxleSweptPathMeasure.rangeIndicator || isLook"
          max-length="24"
          :rules="[
            conformityRules.minMax(
              props.item.vehicleAxleSweptPathMeasure.value,
              props.item.vehicleAxleSweptPathMeasure.maxValue,
              props.item.vehicleAxleSweptPathMeasure.rangeIndicator
            )
          ]"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.vehicleAxleSweptPathMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span4"
        ></base-autocomplete>
      </div>
    </base-constructor>

    <base-constructor
      v-slot="props2"
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelbaseMeasure"
      label="Колесная база транспортного средства"
      :filter-data="
        shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelbaseMeasure
      "
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0]
          .vehicleWheelbaseMeasure[0]
      "
      class="full mt-5"
    >
      <base-checkbox
        v-model="props2.item.rangeIndicator"
        label="Признак интервала значений"
        class="full"
        @change="props2.item.valueMax = 0"
      ></base-checkbox>

      <div class="full grid12">
        <base-textfield
          v-model="props2.item.valueMin"
          label="Минимально"
          type="number"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-textfield
          v-model="props2.item.valueMax"
          label="Максимально"
          type="number"
          :disabled="!props2.item.rangeIndicator || isLook"
          max-length="24"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="props2.item.measurementUnitCode"
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
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '@/components/forms/conformityForms/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_033 = ref([])
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
