<template>
  <v-form ref="form" :disabled="isLook" class="grid12">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails.vehicleMassMeasure"
      label="Масса"
      :filter-data="shema.vehicleVariantDetails.vehicleMassMeasure"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleMassMeasure[0]"
      class="full mt-5"
      :disabled="isLook"
    >
      <base-autocomplete
        v-model="props.item.massView"
        label="Вид массы*"
        :items="NSI_019"
        item-value="key"
        class="full"
      ></base-autocomplete>

      <base-constructor
        v-slot="props2"
        v-model="props.item.meaningMassMeasure"
        label="Значение массы"
        :filter-data="props.item.meaningMassMeasure"
        :default-data="
          shemaDefault.vehicleVariantDetails.vehicleMassMeasure[0].meaningMassMeasure[0]
        "
        class="full mt-5"
        :disabled="isLook"
      >

        <div class="full grid12">
          <base-textfield
            v-model="props2.item.minMassMeasure"
            label="Масса*"
            type="number"
            max-length="24"
            :rules="[rules.minMassMeasure]"
            class="span6"
          ></base-textfield>

          <base-autocomplete
            v-model="props2.item.measurementUnitCode"
            label="Ед. измерения"
            :items="NSI_033"
            item-value="key"
            class="span6"
          ></base-autocomplete>
        </div>
      </base-constructor>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_019 = ref([])
const NSI_033 = ref([])

async function load() {
  NSI_019.value = (await indexDB.getFromDatabase('catalog', 'NSI_019')) || []
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
