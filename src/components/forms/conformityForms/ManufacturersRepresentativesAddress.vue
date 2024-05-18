<template>
  <div class="adaptiveGrid">
    <base-is-missing
      v-model="shema.notVehicleRepresentativeDetails"
      label="Представитель изготовителя и его адреса - отсутствует"
    >
      <base-recursive-constructor
        v-slot="props"
        v-model:data="shema.vehicleManufacturerDetails"
        class="full"
        label="Представитель изготовителя и его адрес"
      >
        <template v-if="props.item.vehicleManufacturerKindCode !== '10'">
          <base-autocomplete
            v-model="props.item.businessEntityName"
            label="Организация*"
            item-text="businessEntityName"
            item-value="businessEntityName"
            :items="authority"
            :rules="[conformityRules.authority]"
            class="full"
            @update:search="chooseManufacturerDoc(props.item, '10')"
          ></base-autocomplete>

          <base-autocomplete
            v-if="authorityBrief.length > 1"
            v-model="shema.businessEntityBriefName"
            label="Краткое наименование изготовителя"
            item-text="businessEntityBriefName"
            item-value="businessEntityBriefName"
            :items="authorityBrief"
            class="full"
          ></base-autocomplete>

          <base-autocomplete
            v-model="props.item.unifiedCountryCode.value"
            label="Код страны"
            item-text="key"
            :items="NSI_034"
            class="span6"
            disabled
          ></base-autocomplete>

          <base-autocomplete
            v-model="props.item.businessEntityTypeName"
            label="Наименование организационно-правовой формы"
            max-length="300"
            item-text="value"
            :items="NSI_310"
            class="span6"
            disabled
          ></base-autocomplete>

          <template
            v-for="(item2, index2) in props.item.subjectAddressDetails.filter((e) =>
              ['2', '4'].includes(e.addressKindCode)
            )"
            :key="index2"
          >
            <base-textfield
              v-model="item2.fullAddress"
              :label="
                item2.addressKindCode === '4'
                  ? 'Местонахождение (Юридический адрес)'
                  : 'Местонахождение (Фактический адрес)'
              "
              disabled
              class="full"
            >
            </base-textfield>
          </template>

          <p class="full title">Контактные данные</p>
          <template v-for="(item3, index3) in props.item.unifiedCommunicationDetails" :key="index3">
            <base-autocomplete
              v-model="item3.communicationChannelName"
              label="Тип контактной информации"
              :items="NSI_042"
              class="span6"
              disabled
            ></base-autocomplete>
            <base-combobox
              v-model="item3.communicationChannelId"
              label="Контактные данные"
              :disabled="item3.communicationChannelId.length < 2"
              class="span6"
            ></base-combobox>
          </template>
        </template>
      </base-recursive-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing2.vue'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor2.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore()

const NSI_034 = ref([])
const NSI_042 = ref([])
const NSI_310 = ref([])
const authority = ref([])
const authorityBrief = ref([]) // краткое наименованиеизготовителя

function chooseManufacturerDoc(shemaItem, vehicleManufacturerKindCode) {
  const businessEntityName = shemaItem.businessEntityName
  const choiseItem = authority.value.find((item) => item.businessEntityName == businessEntityName)
  shemaItem = Object.assign(shemaItem, choiseItem)
  console.log('choiseItem', choiseItem)
  authorityBrief.value = authority.value.filter(
    (e) => e.businessEntityName === businessEntityName && e.businessEntityBriefName
  )
}

async function load() {
  NSI_034.value = await indexDB.getFromDatabase('catalog', 'NSI_034')
  NSI_042.value = await indexDB.getFromDatabase('catalog', 'NSI_042')
  NSI_310.value = await indexDB.getFromDatabase('catalog', 'NSI_310')
  const fullAutority = await requests.get('/api/manufacturer-registry/all')

  authority.value = fullAutority.filter(
    (e) => e.vehicleManufacturerKindCode && e.vehicleManufacturerKindCode.includes('30')
  )
  const test2 = await requests.get('/api/types-communication-classifier-details/search/all')

  console.log('authority.value', test2)
}
load()
</script>
