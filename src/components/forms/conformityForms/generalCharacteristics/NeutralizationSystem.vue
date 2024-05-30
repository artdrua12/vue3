<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notExhaust"
      v-model:data="shema.vehicleVariantDetails[0].exhaustDetails"
      :default-data="defaultData"
      label="Система выпуска и нейтрализации отработавших газов - отсутствует"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].exhaustDetails"
        :filter-data="shema.vehicleVariantDetails[0].exhaustDetails"
        :default-data="defaultData[0]"
        class="full"
        label="Система выпуска и нейтрализации отработавших газов"
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
          :default-data="defaultData[0].vehicleComponentElements[0]"
          class="full"
          label="Элемент системы выпуска и нейтрализации отработавших газов"
        >
          <base-autocomplete
            v-model="props2.item.vehicleComponentName"
            label="Наименование элемента системы выпуска и нейтрализации отработавших газов"
            :items="exhaust"
            class="full"
          ></base-autocomplete>

          <base-constructor-2
            v-slot="props3"
            v-model="props2.item.stageDetails"
            :filter-data="props2.item.stageDetails"
            :default-data="defaultData[0].vehicleComponentElements[0].stageDetails[0]"
            label="Ступень"
            class="full"
          >
            <base-textfield
              :value="`Ступень ${props3.index + 1}`"
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

            <base-autocomplete
              v-if="props2.item.vehicleComponentName === 'глушитель'"
              v-model="props3.item.vehicleComponentType"
              label="Тип"
              :items="NSI_119"
            ></base-autocomplete>
          </base-constructor-2>
        </base-constructor>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseConstructor2 from '@/components/base/BaseConstructor2.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
const indexDB = useIndexDBStore() // для работы с IndexDB
const request = useRequestStore()

const NSI_119 = ref([])
const exhaust = ref([])

const defaultData = [
  {
    vehicleComponentMakeName: '',
    vehicleComponentText: '',
    vehicleComponentElements: [
      {
        vehicleComponentName: '',
        stageDetails: [
          {
            vehicleComponentStageNumber: 'Ступень 1',
            vehicleComponentMakeName: '',
            vehicleComponentMarking: [],
            vehicleComponentType: ''
          }
        ]
      }
    ]
  }
]

async function load() {
  NSI_119.value = await indexDB.getFromDatabase('catalog', 'NSI_119')
  exhaust.value = await request.get('/api/classifier/exhaust-details')
}
load()
</script>
