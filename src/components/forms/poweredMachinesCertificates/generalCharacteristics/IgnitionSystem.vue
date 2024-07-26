<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notVehicleIgnition"
      v-model:data="shema.vehicleVariantDetails.vehicleIgnitionDetails"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleIgnitionDetails"
      label="Система зажигания - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.vehicleIgnitionDetails"
        :filter-data="shema.vehicleVariantDetails.vehicleIgnitionDetails"
        :default-data="shemaDefault.vehicleVariantDetails.vehicleIgnitionDetails[0]"
        class="full"
        label="Система зажигания"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Тип*"
          item-text="title"
          :items="NSI_055"
          class="full"
        ></base-autocomplete>

        <base-is-missing
          v-model="props.item.notVehicleComponentMakeName"
          v-model:data="props.item.vehicleComponentMakeName"
          label="Марка - отсутствует"
          :disabled="isLook"
          class="full"
        >
          <base-textfield
            v-model="props.item.vehicleComponentMakeName"
            label="Марка"
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
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const NSI_055 = ref([])
const NSI_062 = ref([])

async function load() {
  NSI_055.value = (await indexDB.getFromDatabase('catalog', 'NSI_055')) || []
  NSI_062.value = (await indexDB.getFromDatabase('catalog', 'NSI_062')) || []
}
load()
</script>
