<template>
    <div class="adaptiveGrid mt-5">
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
        :default-data="defaultDataConstructor"
        class="full"
      >
        <base-textfield
          v-model="props.item.vehicleAxleOrdinal"
          label="Порядковый номер оси транспортного средства"
          type="number"
          class="full"
        ></base-textfield>
  
        <p class="title full">Технически допустимая максимальная масса на ось</p>
        <base-textfield
          v-model.sync="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value"
          label="Минимально"
          type="number"
          max-length="24"
          class="span3"
        ></base-textfield>
  
        <base-autocomplete
          v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>
  
        <base-is-missing-disabled
          v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.rangeIndicator"
          v-model:data="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.maxValue"
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.maxValue"
            label="Максимально"
            type="number"
            :disabled="!props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.rangeIndicator"
            max-length="24"
            :rules="[
              conformityRules.minMax(
                props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value,
                props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.maxValue,
                props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.rangeIndicator
              )
            ]"
          ></base-textfield>
        </base-is-missing-disabled>
  
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
  
        <base-textfield
          v-model.sync="props.item.vehicleAxleSweptPathMeasure.value"
          label="Минимально"
          type="number"
          max-length="24"
          class="span3"
        ></base-textfield>
  
        <base-autocomplete
          v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>
  
        <base-is-missing-disabled
          v-model="props.item.vehicleAxleSweptPathMeasure.rangeIndicator"
          v-model:data="props.item.vehicleAxleSweptPathMeasure.maxValue"
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="props.item.vehicleAxleSweptPathMeasure.maxValue"
            label="Максимально"
            type="number"
            :disabled="!props.item.vehicleAxleSweptPathMeasure.rangeIndicator"
            max-length="24"
            :rules="[
              conformityRules.minMax(
                props.item.vehicleAxleSweptPathMeasure.value,
                props.item.vehicleAxleSweptPathMeasure.maxValue,
                props.item.vehicleAxleSweptPathMeasure.rangeIndicator
              )
            ]"
          ></base-textfield>
        </base-is-missing-disabled>
      </base-constructor>
  
      <base-constructor
        v-slot="props2"
        v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelbaseMeasure"
        label="Колесная база транспортного средства"
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleWheelbaseMeasure
        "
        :default-data="defaultDataConstructor2"
        class="full mt-5"
      >
        <base-textfield
          v-model.sync="props2.item.valueMin"
          label="Минимально"
          type="number"
          max-length="24"
          class="span3"
        ></base-textfield>
  
        <base-autocomplete
          v-model="props2.item.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>
  
        <base-is-missing-disabled
          v-model="props2.item.rangeIndicator"
          v-model:data="props2.item.valueMax"
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="props2.item.valueMax"
            label="Максимально"
            type="number"
            :disabled="!props2.item.rangeIndicator"
            max-length="24"
          ></base-textfield>
        </base-is-missing-disabled>
      </base-constructor>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import shema from '@/components/forms/shema'
  import { conformityRules } from '../rules'
  import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
  import BaseCombobox from '@/components/base/BaseCombobox.vue'
  import BaseTextfield from '@/components/base/BaseTextfield.vue'
  import BaseConstructor from '@/components/base/BaseConstructor.vue'
  import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
  import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
  
  import { useIndexDBStore } from '@/stores/indexDBStore'
  import { useRequestStore } from '@/stores/requestStore'
  const indexDB = useIndexDBStore() // для работы с IndexDB
  const request = useRequestStore()
  
  const NSI_033 = ref([])
  
  const defaultDataConstructor = {
    vehicleWheelQuantity: 0,
    brakingAxleIndicator: false,
    drivingAxleIndicator: false,
    dualTireAxleIndicator: false,
    steeringAxleIndicator: false,
    vehicleAxleOrdinal: 0,
    vehicleAxleSweptPathMeasure: {
      measurementUnitCode: 'MMT',
      value: 0,
      maxValue: 0,
      rangeIndicator: false
    },
    vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure: {
      measurementUnitCode: 'KGM',
      value: 0,
      rangeIndicator: false
    },
    vehicleTyre: {
      vehicleTyreKindSize: ''
    },
    vehicleTyreKindCode: ''
  }
  const defaultDataConstructor2 = {
    measurementUnitCode: 'MMT',
    rangeIndicator: false,
    valueMax: 0,
    valueMin: 0,
    semitrailerIndicator: false
  }
  
  async function load() {
    NSI_033.value = await indexDB.getFromDatabase('catalog', 'NSI_033')
  
    const s = await request.get('/api/classifier/epassport/powered-wheels')
    console.log('s', s)
  }
  load()
  </script>
  