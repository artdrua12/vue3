<template>
  <div class="adaptiveGrid mt-5">
    <base-autocomplete
      v-model="shema.applicantDetails.businessEntityName"
      label="Организация*"
      item-text="businessEntityName"
      item-value="businessEntityName"
      :items="
        authority.filter(
          (e) => e.vehicleManufacturerKindCode && e.vehicleManufacturerKindCode.includes('30')
        )
      "
      :rules="[conformityRules.authority]"
      class="full"
      @update:search="chooseApplicantDoc"
    ></base-autocomplete>

    <base-autocomplete
      v-if="shema.applicantDetails.businessEntityBriefNames.length > 1"
      v-model="shema.applicantDetails.businessEntityBriefName"
      label="Краткое наименование изготовителя"
      item-text="businessEntityBriefName"
      item-value="businessEntityBriefName"
      :items="authorityBrief"
      class="full"
    ></base-autocomplete>

    <base-autocomplete
      v-model="shema.applicantDetails.unifiedCountryCode.value"
      label="Код страны"
      item-text="key"
      :items="NSI_034"
      class="span6"
      disabled
    ></base-autocomplete>

    <base-autocomplete
      v-model="shema.applicantDetails.businessEntityTypeName"
      label="Наименование организационно-правовой формы"
      max-length="300"
      item-text="value"
      :items="NSI_310"
      class="span6"
      disabled
    ></base-autocomplete>

    <template
      v-for="(item, index) in shema.applicantDetails.subjectAddressDetails.filter((e) =>
        ['2', '4'].includes(e.addressKindCode)
      )"
      :key="index"
    >
      <base-textfield
        v-model="item.fullAddress"
        :label="
          item.addressKindCode === '4'
            ? 'Местонахождение (Юридический адрес)'
            : 'Местонахождение (Фактический адрес)'
        "
        disabled
        class="full"
      >
      </base-textfield>
    </template>

    <p class="full title">Контактные данные</p>
    <template
      v-for="(item, index) in shema.applicantDetails.unifiedCommunicationDetails"
      :key="index"
    >
      <base-autocomplete
        v-model="item.unifiedCommunicationChannelCode.value"
        label="Тип контактной информации"
        :items="NSI_042"
        class="span6"
        disabled
      ></base-autocomplete>
      <base-combobox
        v-model="item.communicationChannelId"
        label="Контактные данные"
        :disabled="item.communicationChannelId.length < 2"
        class="span6"
      ></base-combobox>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_034 = ref([])
const NSI_042 = ref([])
const NSI_310 = ref([])
const authority = ref([])

function chooseApplicantDoc() {
  const businessEntityName = shema.applicantDetails.businessEntityName
  if (!businessEntityName) {
    const {
      subjectAddressDetails,
      unifiedCountryCode,
      unifiedCommunicationDetails,
      businessEntityTypeName
    } = shemaDefault.applicantDetails
    shema.applicantDetails.subjectAddressDetails = subjectAddressDetails
    shema.applicantDetails.unifiedCommunicationDetails = unifiedCommunicationDetails
    shema.applicantDetails.unifiedCountryCode = unifiedCountryCode
    shema.applicantDetails.businessEntityTypeName = businessEntityTypeName
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
  shema.applicantDetails.subjectAddressDetails = subjectAddressDetails
  shema.applicantDetails.unifiedCommunicationDetails = unifiedCommunicationDetails
  shema.applicantDetails.unifiedCountryCode = unifiedCountryCode
  shema.applicantDetails.businessEntityTypeName = businessEntityTypeName
  //устанавливаем короткие имена фирмы
  shema.applicantDetails.businessEntityBriefNames = authority.value.filter(
    (e) => e.businessEntityName === businessEntityName && e.businessEntityBriefName
  )
}

async function load() {
  NSI_034.value = (await indexDB.getFromDatabase('catalog', 'NSI_034')) || []
  NSI_042.value = (await indexDB.getFromDatabase('catalog', 'NSI_042')) || []
  NSI_310.value = (await indexDB.getFromDatabase('catalog', 'NSI_310')) || []
  authority.value = (await requests.get('/api/manufacturer-registry/all')) || []
}
load()
</script>
