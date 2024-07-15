<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notFuelFeed"
      v-model:data="shema.vehicleVariantDetails[0].fuelFeedDetails"
      :default-data="shemaDefault.vehicleVariantDetails[0].fuelFeedDetails"
      label="Система питания - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].fuelFeedDetails"
        :filter-data="shema.vehicleVariantDetails[0].fuelFeedDetails"
        :default-data="shemaDefault.vehicleVariantDetails[0].fuelFeedDetails[0]"
        class="full"
        label="Система питания"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Описание типа*"
          :items="NSI_056"
          :rules="[conformityRules.fuelFeedType]"
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
            shemaDefault.vehicleVariantDetails[0].fuelFeedDetails[0].vehicleComponentElements[0]
          "
          class="full"
          label="Элемент системы питания"
        >
          <base-autocomplete
            v-model="props2.item.vehicleComponentName"
            label="Наименование элемента системы питания"
            :items="NSI_063"
            class="full"
          ></base-autocomplete>

          <template v-if="props2.item.vehicleComponentName !== 'Глушители шума впуска'">
            <base-textfield
              v-model="props2.item.vehicleComponentMakeName"
              label="Марка"
              class="span6"
            ></base-textfield>

            <base-textfield
              v-model="props2.item.vehicleComponentText"
              label="Описание"
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
              class="span6"
            ></base-combobox>
          </template>

          <base-constructor
            v-if="props2.item.vehicleComponentName === 'Глушители шума впуска'"
            v-slot="props3"
            v-model="props2.item.stageDetails"
            :filter-data="props2.item.stageDetails"
            :default-data="
              shemaDefault.vehicleVariantDetails[0].fuelFeedDetails[0].vehicleComponentElements[0]
                .stageDetails[0]
            "
            class="full"
            label="Cтупень глушителя"
            :disabled="isLook"
          >
            <base-textfield
              v-model="props3.item.vehicleComponentStageNumber"
              label="Номер ступени"
              disabled
              class="span6"
            ></base-textfield>

            <base-textfield
              v-model="props3.item.vehicleComponentMakeName"
              label="Марка"
              class="span6"
            ></base-textfield>

            <base-combobox
              v-model="props3.item.vehicleComponentMarking"
              label="Маркировка"
              class="full"
            ></base-combobox>
          </base-constructor>
        </base-constructor>
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
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import { useShemaStore } from '@/stores/shemaStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const indexDB = useIndexDBStore() // для работы с IndexDB
const NSI_056 = ref([])
const NSI_063 = ref([])

async function load() {
  NSI_056.value = (await indexDB.getFromDatabase('catalog', 'NSI_056')) || []
  NSI_063.value = (await indexDB.getFromDatabase('catalog', 'NSI_063')) || []
}
load()
</script>
