<template>
  <div class="adaptiveGrid">
    <base-constructor
      v-slot="props"
      v-model:data="shema.vehicleManufacturerDetails"
      :filter-data="filterData"
      :default-data="defaultDataConstructor"
      class="full"
      label="Изготовитель"
    >
      <base-autocomplete
        v-model="props.item.businessEntityName"
        label="Организация*"
        item-text="businessEntityName"
        item-value="businessEntityName"
        :items="authority"
        :rules="[conformityRules.authority]"
        class="full"
        @update:model-value="chooseManufacturerDoc(props.item)"
      ></base-autocomplete>

      <base-autocomplete
        v-if="props.item.businessEntityBriefNames.length > 1"
        v-model="shema.businessEntityBriefName"
        label="Краткое наименование изготовителя"
        item-text="businessEntityBriefName"
        item-value="businessEntityBriefName"
        :items="props.item.businessEntityBriefNames"
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
          v-model="item3.unifiedCommunicationChannelCode.value"
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
    </base-constructor>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_034 = ref([])
const NSI_042 = ref([])
const NSI_310 = ref([])
const authority = ref([])

const defaultDataConstructor = {
  vehicleManufacturerKindCode: '05',
  businessEntityName: '',
  businessEntityBriefName: '',
  businessEntityBriefNames: [],
  businessEntityTypeName: '',
  businessEntityId: [
    {
      kindId: '',
      value: ''
    }
  ],
  unifiedCountryCode: {
    value: '',
    codeListId: 'NSI_034'
  },
  subjectAddressDetails: [
    {
      addressKindCode: '4',
      unifiedCountryCode: {
        value: '',
        codeListId: 'NSI_034'
      },
      territoryCode: '',
      regionName: '',
      districtName: '',
      cityName: '',
      settlementName: '',
      streetName: '',
      buildingNumberId: '',
      roomNumberId: '',
      postCode: '',
      postOfficeBoxId: '',
      fullAddress: ''
    }
  ],
  unifiedCommunicationDetails: [
    {
      communicationChannelId: [],
      communicationChannelName: '',
      unifiedCommunicationChannelCode: {
        value: '',
        codeListId: 'NSI_042'
      }
    }
  ],
  fullNameDetails: {
    firstName: '',
    lastName: '',
    middleName: ''
  }
}
const filterData = computed(() =>
  shema.vehicleManufacturerDetails.filter((item) => item.vehicleManufacturerKindCode === '05')
)

function chooseManufacturerDoc(shemaItem) {
  const businessEntityName = shemaItem?.businessEntityName
  if (!businessEntityName) {
    const {
      subjectAddressDetails,
      unifiedCountryCode,
      unifiedCommunicationDetails,
      businessEntityTypeName
    } = defaultDataConstructor
    shemaItem.subjectAddressDetails = subjectAddressDetails
    shemaItem.unifiedCommunicationDetails = unifiedCommunicationDetails
    shemaItem.unifiedCountryCode = unifiedCountryCode
    shemaItem.businessEntityTypeName = businessEntityTypeName
    return
  }
  const choiseItem = authority.value.find((item) => item.businessEntityName == businessEntityName)
  //устанавливаем новое значение фирмы
  const {
    subjectAddressDetails,
    unifiedCountryCode,
    unifiedCommunicationDetails,
    businessEntityTypeName
  } = choiseItem
  shemaItem.subjectAddressDetails = subjectAddressDetails
  shemaItem.unifiedCommunicationDetails = unifiedCommunicationDetails
  shemaItem.unifiedCountryCode = unifiedCountryCode
  shemaItem.businessEntityTypeName = businessEntityTypeName
  //устанавливаем короткие имена фирмы
  shemaItem.businessEntityBriefNames = authority.value.filter(
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
}
load()
</script>
