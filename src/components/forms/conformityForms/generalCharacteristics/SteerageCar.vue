<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].notSteeringWheel"
      v-model:data="
        shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSteeringDetails
      "
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSteeringDetails
      "
      label="Рулевого управления - отсутствует"
      class="full"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSteeringDetails"
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSteeringDetails
        "
        :default-data="
          shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0]
            .vehicleSteeringDetails[0]
        "
        label="Рулевое управление"
        class="full"
        :disabled="isLook"
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
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '@/components/forms/conformityForms/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const docStatus = computed(() => shema.conformityDocStatusDetails.docStatus)
const NSI_027 = ref([])
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

async function load() {
  NSI_027.value = (await indexDB.getFromDatabase('catalog', 'NSI_027')) || []
}
load()
</script>
