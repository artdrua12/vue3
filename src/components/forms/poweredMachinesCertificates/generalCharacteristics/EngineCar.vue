<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notEngineIndicator"
      v-model:data="shema.vehicleVariantDetails"
      :default-data="shemaDefault.vehicleVariantDetails"
      label="Двигатель - отсутствует"
      :disabled="isLook"
    >
      <base-is-missing
        v-model="shema.vehicleTypeDetails.vehicleHybrid"
        v-model:data="shema.vehicleVariantDetails.vehicleElectricalMachineDetails[0]"
        label="Наличие гибридной СМ"
        :default-data="shemaDefault.vehicleVariantDetails.vehicleElectricalMachineDetails[0]"
        class="full"
        :disabled="isLook"
        invert
      >
        <base-combobox
          v-model="shema.vehicleTypeDetails.vehicleHybridDesignText"
          label="Описание гибридной СМ"
          max-length="1000"
          class="full"
        ></base-combobox>

        <ElectroEngine class="full mb-5" />
      </base-is-missing>

      <base-textfield
        v-model="shema.vehicleVariantDetails.engineQuantity"
        label="Количество двигателей внутреннего сгорания"
        type="number"
        class="span6"
      ></base-textfield>

      <base-autocomplete
        v-model="shema.vehicleVariantDetails.engineType"
        label="Вид двигателя*"
        :items="NSI_118"
        item-text="title"
        class="span6"
        @update:model="shema.vehicleVariantDetails.engineTypeDependence"
      ></base-autocomplete>

      <base-constructor
        v-if="shema.vehicleVariantDetails.engineType === 'Двигатель внутреннего сгорания'"
        v-slot="props"
        v-model="shema.vehicleVariantDetails.engineDetails"
        :filter-data="shema.vehicleVariantDetails.engineDetails"
        :default-data="shemaDefault.vehicleVariantDetails.engineDetails[0]"
        class="full"
        label="Двигатель внутреннего сгорания"
        :disabled="isLook"
      >
        <base-textfield
          v-model="props.item.vehicleComponentMakeName"
          label="Марка двигателя*"
          max-length="120"
          class="full"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Тип(описание) двигателя внутреннего сгорания*"
          :items="NSI_301"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.engineCylinderQuantity"
          label="Количество цилиндров*"
          type="number"
          class="span6"
        ></base-textfield>

        <base-textfield
          id="engineCompressionRate"
          v-model="props.item.engineCompressionRate"
          label="Степень сжатия*"
          type="number"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.engineCylinderArrangementText"
          label="Расположение цилиндров"
          :items="NSI_308"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.engineCapacityMeasure.value"
          label="Рабочий объём цилиндров*, см³"
          type="number"
          max-length="24"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.engineCapacityMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.engineMaxPowerDetails.engineMaxPowerMeasure.value"
          label="Максимальная мощность, кВт*"
          type="number"
          max-length="24"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.engineMaxPowerDetails.engineMaxPowerMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <p class="title full">
          Скорость вращения коленчатого вала, при которой достигается максимальная мощность
          двигателя
        </p>

        <base-checkbox
          v-model="
            props.item.engineMaxPowerDetails.vehicleShaftRotationFrequencyMeasure.rangeIndicator
          "
          label="Признак интервала значений"
          class="full"
          @change="
            props.item.engineMaxPowerDetails.vehicleShaftRotationFrequencyMeasure.valueMax = 0
          "
        ></base-checkbox>

        <div class="full grid12">
          <base-textfield
            v-model="props.item.engineMaxPowerDetails.vehicleShaftRotationFrequencyMeasure.valueMin"
            label="Минимально*"
            type="number"
            class="span4"
          ></base-textfield>

          <base-textfield
            v-model="
              props.item.engineMaxPowerDetails.vehicleShaftRotationFrequencyMeasure.valueMax
            "
            label="Максимально"
            type="number"
            :disabled="
              !props.item.engineMaxPowerDetails.vehicleShaftRotationFrequencyMeasure.rangeIndicator
            "
            max-length="24"
            class="span4"
          ></base-textfield>

          <base-autocomplete
            v-model="
              props.item.engineMaxPowerDetails.vehicleShaftRotationFrequencyMeasure
                .measurementUnitCode
            "
            label="Ед. измерения"
            :items="NSI_033"
            item-value="key"
            class="span4"
          ></base-autocomplete>
        </div>

        <base-textfield
          v-model="props.item.engineMaxTorqueDetails.engineMaxTorqueMeasure.value"
          label="Максимальный крутящий момент двигателя*"
          type="number"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.engineMaxTorqueDetails.engineMaxTorqueMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <p class="title full">
          Скорость вращения коленчатого вала, при которой достигается максимальный крутящий момент
          двигателя
        </p>
        <base-checkbox
          v-model="
            props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequencyMeasure.rangeIndicator
          "
          label="Признак интервала значений"
          class="full"
          :disabled="isLook"
          @change="
            props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequencyMeasure.valueMax
          "
        ></base-checkbox>

        <div class="full grid12">
          <base-textfield
            v-model="
              props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequencyMeasure.valueMin
            "
            label="Минимально*"
            type="number"
            class="span4"
          ></base-textfield>

          <base-textfield
            v-model="
              props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequencyMeasure.valueMax
            "
            label="Максимально"
            type="number"
            :disabled="
              !props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequencyMeasure.rangeIndicator
            "
            max-length="24"
            class="span4"
          ></base-textfield>

          <base-autocomplete
            v-model="
              props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequencyMeasure
                .measurementUnitCode
            "
            label="Ед. измерения"
            :items="NSI_033"
            item-value="key"
            class="span4"
          ></base-autocomplete>
        </div>
      </base-constructor>

      <ElectroEngine
        v-else-if="shema.vehicleVariantDetails.engineType === 'Электрический двигатель'"
      />
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
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import ElectroEngine from '@/components/forms/poweredMachinesCertificates/generalCharacteristics/ElectroEngine.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема

const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const NSI_033 = ref([])
const NSI_118 = ref([])
const NSI_301 = ref([])
const NSI_308 = ref([])

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
  NSI_118.value = (await indexDB.getFromDatabase('catalog', 'NSI_118')) || []
  NSI_301.value = (await indexDB.getFromDatabase('catalog', 'NSI_301')) || []
  NSI_308.value = (await indexDB.getFromDatabase('catalog', 'NSI_308')) || []
}
load()
</script>
