<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="$route.query.look != null">
    <base-autocomplete
      v-if="!shema.conformityDocStatus || shema.conformityDocStatus === 'Черновик'"
      v-model="shema.conformityAuthorityInformationDetails.authority"
      label="Организация*"
      :items="certificateAccreditations"
      item-text="certificationBodyNameBrief"
      item-value="accreditationId"
      class="full"
      :disabled="false"
      @update:search="chooseAuthorityOnForm"
    ></base-autocomplete>

    <base-textarea
      v-else
      v-model="shema.conformityAuthorityInformationDetails.businessEntityBriefName"
      label="Организация*"
      disabled
      class="span6"
    >
    </base-textarea>

    <base-textarea
      v-model="shema.conformityAuthorityInformationDetails.businessEntityName"
      label="Полное наименование органа по сертификации"
      disabled
      class="span6"
    >
    </base-textarea>

    <base-textarea
      v-model="shema.conformityAuthorityInformationDetails.businessEntityBriefName"
      label="Краткое наименование органа по сертификации"
      disabled
      class="span6"
    >
    </base-textarea>

    <base-textfield
      v-model="shema.conformityAuthorityInformationDetails.docId"
      label="Aттестат аккредитации*"
      max-length="20"
      disabled
      class="span6"
    >
    </base-textfield>

    <base-datefield
      v-model="shema.conformityAuthorityInformationDetails.docStartDate"
      label="Дата начала действия аттестата"
      disabled
      class="span6"
    >
    </base-datefield>

    <base-datefield
      v-model="shema.conformityAuthorityInformationDetails.docValidityDate"
      label="Срок окончания действия аттестата"
      disabled
      class="span6"
    >
    </base-datefield>

    <base-autocomplete
      v-model="shema.conformityAuthorityInformationDetails.businessEntityTypeName"
      label="Наименование организационно-правовой формы"
      max-length="300"
      item-text="value"
      :items="NSI_310"
      class="full"
    ></base-autocomplete>

    <base-textarea
      v-for="(item, index) in shema.conformityAuthorityInformationDetails.subjectAddressDetails"
      :key="index"
      v-model="item.fullAddress"
      :label="
        shema.conformityAuthorityInformationDetails.subjectAddressDetails[index].addressKindCode ===
        '4'
          ? 'Местонахождение (Юридический адрес)'
          : 'Местонахождение (Фактический адрес)'
      "
      disabled
      class="full"
    ></base-textarea>

    <p class="full title">Контактные данные</p>

    <template
      v-for="(item, index) in shema.conformityAuthorityInformationDetails
        .unifiedCommunicationDetails"
      :key="index"
    >
      <template v-if="item.unifiedCommunicationChannelCode?.value">
        <base-autocomplete
          v-model="item.unifiedCommunicationChannelCode.value"
          label="Тип контактной информации"
          :items="NSI_042"
          item-value="key"
          class="span6"
          disabled
        ></base-autocomplete>

        <base-combobox
          v-model="item.communicationChannelId"
          label="Контактные данные"
          disabled
          class="span6"
        ></base-combobox>
      </template>
    </template>
    <base-textfield
      :value="
        [
          shema.conformityAuthorityInformationDetails.fullNameDetails?.lastName,
          shema.conformityAuthorityInformationDetails.fullNameDetails?.firstName,
          shema.conformityAuthorityInformationDetails.fullNameDetails?.middleName
        ].join(' ')
      "
      label="ФИО руководителя хозяйствующего субъекта"
      disabled
      class="full"
    ></base-textfield>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore() // для работы с базой данных IndexDB
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму

const NSI_042 = ref([])
const NSI_310 = ref([])
const certificateAccreditations = ref([])
const authority = ref([])

function chooseAuthorityOnForm() {
  const authorityId = shema.conformityAuthorityInformationDetails.authority
  const choiseItem = certificateAccreditations.value.find((i) => i.accreditationId === authorityId)
  const forBusinessEntityId = authority.value.find((item) =>
    item.certificateAccreditation.find((i) => i.accreditationId === authorityId)
  )
  if (!choiseItem) {
    shema.conformityAuthorityInformationDetails = JSON.parse(
      JSON.stringify(shemaDefault.conformityAuthorityInformationDetails)
    )
    return
  }
  // устанавливаем новое значение фирмы
  const {
    certificationBodyNameFull,
    certificationBodyNameBrief,
    businessEntityTypeName,
    subjectAddressDetails,
    unifiedCommunicationDetails,
    fullNameDetails,
    certificateNumber,
    certificateBeginDate,
    certificateEndDate
  } = choiseItem
  shema.conformityAuthorityInformationDetails.businessEntityName = certificationBodyNameFull
  shema.conformityAuthorityInformationDetails.businessEntityBriefName = certificationBodyNameBrief
  shema.conformityAuthorityInformationDetails.businessEntityTypeName = businessEntityTypeName
  shema.conformityAuthorityInformationDetails.subjectAddressDetails = subjectAddressDetails
  shema.conformityAuthorityInformationDetails.unifiedCommunicationDetails =
    unifiedCommunicationDetails
  shema.conformityAuthorityInformationDetails.fullNameDetails = fullNameDetails
  shema.conformityAuthorityInformationDetails.businessEntityId =
    forBusinessEntityId.businessEntityId.map((e) => e.value).join('; ')
  shema.conformityAuthorityInformationDetails.docId = certificateNumber
  shema.conformityAuthorityInformationDetails.certificateBeginDate = certificateBeginDate
  shema.conformityAuthorityInformationDetails.certificateEndDate = certificateEndDate
}

async function load() {
  NSI_042.value = await indexDB.getFromDatabase('catalog', 'NSI_042')
  NSI_310.value = await indexDB.getFromDatabase('catalog', 'NSI_310')
  certificateAccreditations.value =
    (await requests.get(
      '/api/classifier/epassport/certification-body/search/certificateAccreditations'
    )) || []
  authority.value = await requests.get('/api/classifier/epassport/certification-body/search/all')
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
