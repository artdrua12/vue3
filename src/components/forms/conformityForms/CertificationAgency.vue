<template>
  <div class="adaptiveGrid">
    <base-autocomplete
      v-if="!docStatus || docStatus === 'Черновик'"
      v-model="formModel.authority"
      label="Организация*"
      :items="certificateAccreditations"
      item-text="certificationBodyNameBrief"
      item-value="accreditationId"
      :rules="[conformityRules.authority]"
      class="full"
    ></base-autocomplete>

    <base-textarea
      v-else
      v-model="formModel.businessEntityBriefName"
      label="Организация*"
      disabled
      class="span6"
    >
    </base-textarea>

    <base-textarea
      v-model="formModel.businessEntityName"
      label="Полное наименование органа по сертификации"
      disabled
      class="span6"
    >
    </base-textarea>

    <base-textarea
      v-model="formModel.businessEntityBriefName"
      label="Краткое наименование органа по сертификации"
      disabled
      class="span6"
    >
    </base-textarea>

    <base-textfield
      v-model="formModel.businessEntityId"
      label="Идентификатор хозяйствующего субъекта"
      max-length="20"
      disabled
      class="span6"
    >
    </base-textfield>

    <base-textfield
      v-model="formModel.docId"
      label="Номер аттестата аккредитации"
      max-length="20"
      disabled
      class="span6"
    >
    </base-textfield>

    <base-datefield
      v-model="formModel.docStartDate"
      label="Дата начала действия аттестата"
      disabled
      class="span6"
    >
    </base-datefield>

    <base-datefield
      v-model="formModel.docValidityDate"
      label="Срок окончания действия аттестата"
      disabled
      class="span6"
    >
    </base-datefield>

    <base-autocomplete
      v-model="formModel.businessEntityTypeName"
      label="Наименование организационно-правовой формы"
      max-length="300"
      item-text="value"
      :items="NSI_310"
      class="full"
    ></base-autocomplete>

    <p class="full title">Контактные данные</p>
    <template v-for="(item, index) in unifiedCommunicationDetails" :key="index">
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
        disabled
        class="span6"
      ></base-combobox>
    </template>
    <base-textfield
      :v-model="
        [
          formModel.fullNameDetails.lastName,
          formModel.fullNameDetails.firstName,
          formModel.fullNameDetails.middleName
        ].join(' ')
      "
      label="ФИО руководителя хозяйствующего субъекта"
      disabled
      class="full"
    ></base-textfield>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore()

const formModel = computed(() => {
  return shema.conformityAuthorityInformationDetails
})
const docStatus = computed(() => {
  return shema.conformityDocStatusDetails.docStatus
})
const unifiedCommunicationDetails = computed(() => {
  return shema.conformityAuthorityInformationDetails.unifiedCommunicationDetails
})

const NSI_042 = ref([])
const NSI_310 = ref([])
const certificateAccreditations = ref([])

async function load() {
  NSI_042.value = await indexDB.getFromDatabase('catalog', 'NSI_042')
  NSI_310.value = await indexDB.getFromDatabase('catalog', 'NSI_310')
  certificateAccreditations.value = await requests.get(
    '/api/classifier/epassport/certification-body/search/certificateAccreditations'
  )
}
load()
</script>
