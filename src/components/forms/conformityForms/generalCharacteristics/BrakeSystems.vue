<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notVehicleBrakingSystem"
      v-model:data="shema.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
      :default-data="shemaDefault.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
      label="Рулевого управления - отсутствует"
      class="full"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
        :filter-data="shema.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
        :default-data="shemaDefault.vehicleVariantDetails[0].vehicleBrakingSystemDetails[0]"
        label="Рулевое управление"
        class="full"
      >
        <base-autocomplete
          v-if="
            (props.item.vehicleBrakingSystemKindCode &&
              props.item.vehicleBrakingSystemKindCode.length === 2) ||
            docStatus === 'Черновик' ||
            !docStatus
          "
          v-model="props.item.vehicleBrakingSystemKindCode"
          label="Наименование элемента тормозной системы*"
          :rules="[conformityRules.vehicleBrakingSystemItemName]"
          :items="NSI_029"
          item-value="key"
          class="full"
        ></base-autocomplete>

        <base-autocomplete
          v-else
          v-model="props.item.vehicleBrakingSystemItemName"
          label="Наименование элемента тормозной системы*"
          :rules="[conformityRules.vehicleBrakingSystemItemName]"
          :items="vehicleBrakingSystemItemName"
        ></base-autocomplete>

        <base-textarea
          v-model="props.item.vehicleComponentText"
          max-length="1000"
          label="Описание*"
          :rules="[conformityRules.vehicleBrakComponentText]"
          class="full"
        ></base-textarea>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'

const indexDB = useIndexDBStore() // для работы с IndexDB
const docStatus = computed(() => shema.conformityDocStatusDetails.docStatus)
const NSI_029 = ref([])

async function load() {
  NSI_029.value = (await indexDB.getFromDatabase('catalog', 'NSI_029')) || []
}
load()
</script>
