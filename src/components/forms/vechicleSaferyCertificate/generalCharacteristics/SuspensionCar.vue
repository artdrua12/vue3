<template>
  <v-form ref="form" :disabled="isLook" class="mt-5">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSuspensionDetails"
      :filter-data="
        shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleSuspensionDetails
      "
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0]
          .vehicleSuspensionDetails[0]
      "
      class="full"
      label="Подвеска"
      :disabled="isLook"
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
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '@/components/forms/conformityForms/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const NSI_138 = ref([])

const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
async function load() {
  NSI_138.value = (await indexDB.getFromDatabase('catalog', 'NSI_138')) || []
}
load()
</script>
