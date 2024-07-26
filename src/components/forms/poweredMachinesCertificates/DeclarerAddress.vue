<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="$route.query.look == null">
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
      :rules="[rules.authority]"
      class="full"
      :disabled="false"
      @update:search="chooseApplicantDoc"
    ></base-autocomplete>

    <base-autocomplete
      v-if="shema.applicantDetails?.businessEntityBriefNames?.length > 1"
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
      <base-delete-element
        class="full"
        :fun="() => shema.applicantDetails.subjectAddressDetails.splice(index, 1)"
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
      </base-delete-element>
    </template>

    <p class="full title">Контактные данные</p>
    <template
      v-for="(item, index) in shema.applicantDetails.unifiedCommunicationDetails"
      :key="index"
    >
      <base-delete-element
        class="full"
        :fun="() => shema.applicantDetails.unifiedCommunicationDetails.splice(index, 1)"
      >
        <base-autocomplete
          v-model="item.communicationChannelName"
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
      </base-delete-element>
    </template>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import { rules } from '@/components/forms/poweredMachinesCertificates/rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseDeleteElement from '@/components/base/BaseDeleteElement.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema // схема
const form = ref(null) // ссылка на форму

const NSI_034 = ref([])
const NSI_042 = ref([])
const NSI_310 = ref([])
const authority = ref([])

async function chooseApplicantDoc() {
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

// для того что бы метод был доступен у родителя
defineExpose({
  async isValidation() {
    const { valid } = await form.value.validate()
    return valid
  }
})
</script>
