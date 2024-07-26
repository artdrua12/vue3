<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notFuelKind"
      v-model:data="shema.vehicleVariantDetails.vehicleFuelKindName"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleFuelKindName"
      label="Топливо - отсутствует"
      :disabled="isLook"
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails.vehicleFuelKindName"
        :items="NSI_030"
        label="Вид топлива*"
        multiple
        chips
        class="full"
      ></base-autocomplete>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import { useRoute } from 'vue-router'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const NSI_030 = ref([])

async function load() {
  NSI_030.value = (await indexDB.getFromDatabase('catalog', 'NSI_030')) || []
}
load()
</script>
