<template>
  <div class="mt-5">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSuspensionDetails"
      :filter-data="
        shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSuspensionDetails
      "
      :default-data="defaultData"
      class="full"
      label="Подвеска"
    >
      <base-autocomplete
        v-model="props.item.vehicleSuspensionKindCode"
        label="Вид подвески транспортных средств*"
        :items="NSI_138"
        item-value="key"
        :rules="[conformityRules.vehicleSuspensionKindCode]"
        class="full"
      ></base-autocomplete>

      <base-textarea
        v-model="props.item.vehicleComponentText"
        label="Описание"
        :rules="[conformityRules.vehicleComponentText]"
        class="full"
      ></base-textarea>
    </base-constructor>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'

const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_138 = ref([])

const defaultData = {
  vehicleComponentText: '',
  vehicleSuspensionKindCode: '',
  vehicleSuspensionView: ''
}

async function load() {
  NSI_138.value = await indexDB.getFromDatabase('catalog', 'NSI_138')
}
load()
</script>
