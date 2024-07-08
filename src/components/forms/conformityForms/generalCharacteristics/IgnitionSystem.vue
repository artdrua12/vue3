<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notVehicleIgnition"
      v-model:data="shema.vehicleVariantDetails[0].vehicleIgnitionDetails"
      :default-data="shemaDefault.vehicleVariantDetails[0].vehicleIgnitionDetails"
      label="Система зажигания - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleIgnitionDetails"
        :filter-data="shema.vehicleVariantDetails[0].vehicleIgnitionDetails"
        :default-data="shemaDefault.vehicleVariantDetails[0].vehicleIgnitionDetails[0]"
        class="full"
        label="Система зажигания"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Описание типа*"
          :items="NSI_055"
          :rules="[conformityRules.vehicleIgnitionType]"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.vehicleComponentMakeName"
          label="Марка"
          max-length="1000"
          class="full"
        ></base-textfield>

        <base-constructor
          v-slot="props2"
          v-model="props.item.vehicleComponentElements"
          :filter-data="props.item.vehicleComponentElements"
          :default-data="
            shemaDefault.vehicleVariantDetails[0].vehicleIgnitionDetails[0]
              .vehicleComponentElements[0]
          "
          class="full"
          label="Элемент системы зажигания"
          :disabled="isLook"
        >
          <base-autocomplete
            v-model="props2.item.vehicleComponentName"
            label="Наименование элемента системы зажигания"
            :items="NSI_062"
            class="full"
          ></base-autocomplete>

          <base-textfield
            v-model="props2.item.vehicleComponentMakeName"
            label="Марка"
            class="span6"
          ></base-textfield>

          <base-textfield
            v-model="props2.item.vehicleComponentType"
            label="Тип"
            class="span6"
          ></base-textfield>

          <base-combobox
            v-model="props2.item.vehicleComponentMarking"
            label="Маркировка"
            class="full"
          ></base-combobox>
        </base-constructor>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().shema //схема
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
