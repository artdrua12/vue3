<template>
  <div class="adaptiveGrid">
    <template v-for="(item, index) in formModel" :key="index">
      <template v-if="item.vehicleManufacturerKindCode === '05'">
        <base-autocomplete
          v-model="formModel.businessEntityName"
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
          @update:model="
            chooseManufacturerDoc({
              businessEntityName: item.businessEntityName,
              authority
            })
          "
        ></base-autocomplete>

        <base-autocomplete
          v-if="authorityBrief.length > 1"
          v-model="formModel.businessEntityBriefName"
          label="Краткое наименование изготовителя"
          item-text="businessEntityBriefName"
          item-value="businessEntityBriefName"
          :items="authorityBrief"
          class="full"
        ></base-autocomplete>

        <base-autocomplete
          v-model="item.unifiedCountryCode.value"
          label="Код страны"
          item-text="key"
          :items="NSI_034"
          class="span6"
          disabled
        ></base-autocomplete>

        <base-autocomplete
          v-model="item.businessEntityTypeName"
          label="Наименование организационно-правовой формы"
          max-length="300"
          item-text="value"
          :items="NSI_310"
          class="span6"
          disabled
        ></base-autocomplete>

        <template
          v-for="(item2, index2) in item.subjectAddressDetails.filter((e) =>
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
        <template v-for="(item3, index3) in item.unifiedCommunicationDetails" :key="index3">
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
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore()

const formModel = computed(() => {
  return shema.vehicleManufacturerDetails
})

const NSI_034 = ref([])
const NSI_042 = ref([])
const NSI_310 = ref([])
const authority = ref([])
const authorityBrief = ref([])

function chooseManufacturerDoc({ businessEntityName, authority }) {
  authorityBrief.value = authority.filter(
    (e) => e.businessEntityName === businessEntityName && e.businessEntityBriefName
  )
}

async function load() {
  NSI_034.value = await indexDB.getFromDatabase('catalog', 'NSI_034')
  NSI_042.value = await indexDB.getFromDatabase('catalog', 'NSI_042')
  NSI_310.value = await indexDB.getFromDatabase('catalog', 'NSI_310')
  authority.value = await requests.get('/api/manufacturer-registry/all')
}
load()
</script>
