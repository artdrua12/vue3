<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].notSteeringWheel"
      v-model:data="
        shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSteeringDetails
      "
      :default-data="defaultData"
      label="Рулевого управления - отсутствует"
      class="full"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSteeringDetails"
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSteeringDetails
        "
        :default-data="defaultData[0]"
        label="Рулевое управление"
        class="full"
      >
        <base-textfield
          v-model="props.item.vehicleComponentMakeName"
          label="Марка рулевого управления"
          max-length="120"
          class="full"
        ></base-textfield>

        <base-textarea
          v-model="props.item.vehicleComponentText"
          label="Описание"
          max-length="1000"
          class="full"
        ></base-textarea>

        <base-autocomplete
          v-if="
            (props.item.steeringWheelPositionCode &&
              props.item.steeringWheelPositionCode.length === 2) ||
            docStatus === 'Черновик' ||
            !docStatus
          "
          v-model="props.item.steeringWheelPositionCode"
          :items="NSI_027"
          :label="
            shema.vehicleTypeDetails.vehicleTechCategoryCode.every((e) =>
              ['O1', 'O2', 'O3', 'O4'].includes(e)
            )
              ? 'Описание месторасположения рулевого управления транспортного средства'
              : 'Описание месторасположения рулевого управления транспортного средства*'
          "
          item-value="key"
          :rules="
            shema.vehicleTypeDetails.vehicleTechCategoryCode.every((e) =>
              ['O1', 'O2', 'O3', 'O4'].includes(e)
            )
              ? []
              : [conformityRules.vehicleWheelLocationText]
          "
          class="full"
        ></base-autocomplete>

        <base-textarea
          v-model="props.item.vehicleComponentLocationText"
          label="
              Описание места расположения рулевого управления, достаточное для его обнаружения
            "
          class="full"
        ></base-textarea>

        <base-textfield
          v-model="props.item.wheelType"
          :label="
            shema.vehicleTypeDetails.vehicleTechCategoryCode.every((e) =>
              ['O1', 'O2', 'O3', 'O4'].includes(e)
            )
              ? 'Тип рулевого механизма'
              : 'Тип рулевого механизма*'
          "
          :rules="
            shema.vehicleTypeDetails.vehicleTechCategoryCode.every((e) =>
              ['O1', 'O2', 'O3', 'O4'].includes(e)
            )
              ? []
              : [conformityRules.wheelType]
          "
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="props.item.modelCode"
          label="Маркировка Рулевого механизма"
          class="span6"
        ></base-textfield>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'

const indexDB = useIndexDBStore() // для работы с IndexDB

const docStatus = computed(() => shema.conformityDocStatusDetails.docStatus)
const NSI_027 = ref([])

const defaultData = [
  {
    modelCode: '',
    steeringWheelPositionCode: '',
    vehicleComponentLocationText: '',
    vehicleComponentMakeName: '',
    vehicleComponentText: '',
    wheelType: ''
  }
]

async function load() {
  NSI_027.value = await indexDB.getFromDatabase('catalog', 'NSI_027')
}
load()
</script>
