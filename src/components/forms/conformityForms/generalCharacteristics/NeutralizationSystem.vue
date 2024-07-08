<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notExhaust"
      v-model:data="shema.vehicleVariantDetails[0].exhaustDetails"
      :default-data="shemaDefault.vehicleVariantDetails[0].exhaustDetails"
      label="Система нейтрализации - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].exhaustDetails"
        :filter-data="shema.vehicleVariantDetails[0].exhaustDetails"
        :default-data="shemaDefault.vehicleVariantDetails[0].exhaustDetails[0]"
        class="full"
        label="Система выпуска и нейтрализации отработавших газов"
        :disabled="isLook"
      >
        <base-textarea
          v-model="props.item.vehicleComponentText"
          label="Описание типа*"
          max-length="10000"
          :rules="[conformityRules.exhaustType]"
          class="full"
        ></base-textarea>

        <base-textfield
          v-model="props.item.vehicleComponentMakeName"
          label="Марка"
          max-length="200"
          class="full"
        ></base-textfield>

        <base-constructor
          v-slot="props2"
          v-model="props.item.vehicleComponentElements"
          :filter-data="props.item.vehicleComponentElements"
          :default-data="
            shemaDefault.vehicleVariantDetails[0].exhaustDetails[0].vehicleComponentElements[0]
          "
          class="full"
          label="Элемент системы выпуска и нейтрализации отработавших газов"
          :disabled="isLook"
        >
          <base-autocomplete
            v-model="props2.item.vehicleComponentName"
            label="Наименование элемента системы выпуска и нейтрализации отработавших газов"
            :items="NSI_455"
            class="full"
          ></base-autocomplete>

          <base-constructor
            v-slot="props3"
            v-model="props2.item.stageDetails"
            :filter-data="props2.item.stageDetails"
            :default-data="
              shemaDefault.vehicleVariantDetails[0].exhaustDetails[0].vehicleComponentElements[0]
                .stageDetails[0]
            "
            class="full"
            label="Ступень"
            :disabled="isLook"
          >
            <base-textfield
              v-model="props3.item.vehicleComponentStageNumber"
              label="Номер ступени"
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

            <base-autocomplete
              v-if="props2.item.vehicleComponentName === 'глушитель'"
              v-model="props3.item.vehicleComponentType"
              label="Тип"
              :items="NSI_119"
            ></base-autocomplete>
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
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import { useRoute } from 'vue-router'


import { useShemaStore } from '@/stores/shemaStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().shema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const NSI_119 = ref([])
const NSI_455 = ref([])

async function load() {
  NSI_119.value = (await indexDB.getFromDatabase('catalog', 'NSI_119')) || []
  NSI_455.value = (await indexDB.getFromDatabase('catalog', 'NSI_119')) || []
}
load()
</script>
