<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notFuelKind"
      v-model:data="shema.vehicleVariantDetails[0].vehicleFuelKindName"
      :default-data="shemaDefault.vehicleVariantDetails[0].vehicleFuelKindName"
      label="Топливо - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleFuelKindName"
        :filter-data="shema.vehicleVariantDetails[0].vehicleFuelKindName"
        :default-data="shemaDefault.vehicleVariantDetails[0].vehicleFuelKindName[0]"
        class="full"
        label="Топливо"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleFuelKindNameZ"
          :items="NSI_030"
          label="Вид топлива*"
          multiple
          chips
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
import { useRoute } from 'vue-router'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

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
