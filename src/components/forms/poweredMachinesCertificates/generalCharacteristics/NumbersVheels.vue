<template>
  <v-form ref="form" :disabled="isLook" class="adaptiveGrid mt-5">
    <template
      v-if="
        [
          'M1',
          'M1G',
          'M2',
          'M2G',
          'M3',
          'M3G',
          'L1',
          'L2',
          'L3',
          'L4',
          'L5',
          'L6',
          'L7',
          'N1',
          'N1G',
          'N2',
          'N2G',
          'N3',
          'N3G'
        ].includes(shema.vehicleTypeDetails.vehicleTechCategoryCode)
      "
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleWheelFormula"
        :items="NSI_045"
        label="Колесная формула*"
        :rules="[rules.vehicleWheelFormula]"
        multiple
        chips
        class="span6"
      ></base-autocomplete>

      <base-autocomplete
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.poweredWheel"
        label="Ведущие колеса*"
        :items="NSI_079"
        max-length="120"
        :rules="[rules.poweredWheel]"
        multiple
        chips
        class="span6"
      ></base-autocomplete>

      <base-textarea
        v-if="
          ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'].includes(
            shema.vehicleTypeDetails.vehicleTechCategoryCode
          )
        "
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleFrameText"
        label="Рама"
        max-length="1000"
        class="span6"
      ></base-textarea>
    </template>
    <!-- Ось -->
    <template
      v-if="['O1', 'O2', 'O3', 'O4'].includes(shema.vehicleTypeDetails.vehicleTechCategoryCode)"
    >
      <base-textfield
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleQuantity"
        label="Количество осей"
        type="number"
        class="span6"
      ></base-textfield>
      <base-textfield
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleWheelQuantity"
        label="Количество колес"
        max-length="4"
        type="number"
        class="span6"
      ></base-textfield>
    </template>

    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleDetails"
      :filter-data="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleDetails"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails.vehicleAxleDetails[0]
      "
      class="full"
      label="Добавить Ось"
      :disabled="isLook"
    >
      <base-textfield
        v-model="props.item.vehicleAxleOrdinal"
        label="Ось"
        type="number"
        max-length="3"
        class="full"
      ></base-textfield>
      <!-- <base-textfield
        v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value"
        label="Технически допустимая максимальная масса на ось"
        type="number"
        max-length="24"
        :rules="[rules.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure(props.item)]"
      ></base-textfield> -->
      <base-textfield
        v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value"
        label="Технически допустимая максимальная масса на ось"
        type="number"
        max-length="24"
        class="span6"
      ></base-textfield>
      <base-autocomplete
        v-model="props.item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.measurementUnitCode"
        label="Ед. измерения"
        :items="NSI_033"
        item-value="key"
        class="span6"
      ></base-autocomplete>

      <!-- <base-textfield
      v-model="props.item.vehicleAxleSweptPathMeasure.value"
      label="Величина колеи оси ТС*"
      type="number"
      max-length="24"
      :rules="
        !vehicleTechCategoryCode.match(/L1|L3/)
          ? [
          rules.existsМehicleAxleSweptPathMeasure({
                value: props.item.vehicleAxleSweptPathMeasure.value,
                axel: props.item.vehicleAxleOrdinal
              }),
              rules.vehicleAxleSweptPathMeasure(props.item)
            ]
          : [rules.vehicleAxleSweptPathMeasure(props.item)]
      "
    ></base-textfield> -->
      <base-textfield
        v-model="props.item.vehicleAxleSweptPathMeasure.value"
        label="Величина колеи оси ТС*"
        type="number"
        max-length="24"
        class="span6"
      ></base-textfield>
      <base-autocomplete
        v-model="props.item.vehicleAxleSweptPathMeasure.measurementUnitCode"
        label="Ед. измерения"
        :items="NSI_033"
        item-value="key"
        class="span6"
      ></base-autocomplete>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
import { useRoute } from 'vue-router'

const route = useRoute()
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const NSI_033 = ref([])
const NSI_045 = ref([])
const NSI_079 = ref([])

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
  NSI_045.value = (await indexDB.getFromDatabase('catalog', 'NSI_045')) || []
  NSI_079.value = (await indexDB.getFromDatabase('catalog', 'NSI_079')) || []
}
load()
</script>
