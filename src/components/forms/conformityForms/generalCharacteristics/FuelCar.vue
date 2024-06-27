<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notFuelKind"
      v-model:data="shema.vehicleVariantDetails[0].vehicleFuelKindName"
      :default-data="shemaDefault.vehicleVariantDetails[0].vehicleFuelKindName"
      label="Топливо - отсутствует"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleFuelKindName"
        :filter-data="shema.vehicleVariantDetails[0].vehicleFuelKindName"
        :default-data="shemaDefault.vehicleVariantDetails[0].vehicleFuelKindName[0]"
        class="full"
        label="Топливо"
      >
        <base-autocomplete
          v-model="props.item.vehicleFuelKindNameZ"
          :items="NSI_030"
          label="Вид топлива*"
          multiple
          :rules="[conformityRules.vehicleFuelKindName]"
          class="full"
        ></base-autocomplete>

        <base-autocomplete
          v-if="props.item.vehicleFuelKindNameZ.find((i) => ['бензин'].includes(i))"
          v-model="props.item.octaneNumber"
          label="Октановое число бензина"
          :items="NSI_088"
          class="full"
        ></base-autocomplete>

        <base-autocomplete
          v-if="props.item.vehicleFuelKindNameZ.find((i) => ['дизельное топливо'].includes(i))"
          v-model="props.item.cetaneNumber"
          label="Цетановое число дизельного топлива"
          :items="NSI_120"
          class="full"
        ></base-autocomplete>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().shema //схема

const NSI_030 = ref([])
const NSI_088 = ref([])
const NSI_120 = ref([])

async function load() {
  NSI_030.value = (await indexDB.getFromDatabase('catalog', 'NSI_030')) || []
  NSI_088.value = (await indexDB.getFromDatabase('catalog', 'NSI_088')) || []
  NSI_120.value = (await indexDB.getFromDatabase('catalog', 'NSI_120')) || []
}
load()
</script>
