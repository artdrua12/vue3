<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notFuelFeed"
      v-model:data="shema.vehicleVariantDetails.fuelFeedDetails"
      :default-data="shemaDefault.vehicleVariantDetails.fuelFeedDetails"
      label="Система питания - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.fuelFeedDetails"
        :filter-data="shema.vehicleVariantDetails.fuelFeedDetails"
        :default-data="shemaDefault.vehicleVariantDetails.fuelFeedDetails[0]"
        class="full"
        label="Система питания"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Тип*"
          :items="NSI_056"
          class="full"
        ></base-autocomplete>

        <base-is-missing
          v-model="props.item.notVehicleComponentMakeName"
          v-model:data="props.item.vehicleComponentMakeName"
          :default-data="shemaDefault.vehicleVariantDetails.vehicleComponentMakeName"
          label="Марка - отсутствует"
          :disabled="isLook"
           class="full"
        >
          <base-textfield
            v-model="props.item.vehicleComponentMakeName"
            label="Марка"
            max-length="1000"
            class="full"
          ></base-textfield>
        </base-is-missing>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import { useShemaStore } from '@/stores/shemaStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const indexDB = useIndexDBStore() // для работы с IndexDB
const NSI_056 = ref([])

async function load() {
  NSI_056.value = (await indexDB.getFromDatabase('catalog', 'NSI_056')) || []
}
load()
</script>
