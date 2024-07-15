<template>
  <v-form ref="form" :disabled="isLook">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleManufacturerDetails"
      :filter-data="filterData"
      :default-data="shemaDefault.vehicleManufacturerDetails[0]"
      class="mt-5"
      label="Изготовитель"
      :disabled="isLook"
    >
      <base-autocomplete
        v-model="shema.vehicleManufacturerDetails[props.index].businessEntityName"
        label="Организация*"
        item-text="businessEntityName"
        item-value="businessEntityName"
        :items="authority"
        :rules="[conformityRules.authority]"
        class="full"
        @update:model-value="chooseManufacturerDoc(shema.vehicleManufacturerDetails[props.index])"
      ></base-autocomplete>

      <base-autocomplete
        v-if="shema.vehicleManufacturerDetails[props.index].businessEntityBriefNames?.length > 1"
        v-model="shema.businessEntityBriefName"
        label="Краткое наименование изготовителя"
        item-text="businessEntityBriefName"
        item-value="businessEntityBriefName"
        :items="shema.vehicleManufacturerDetails[props.index].businessEntityBriefNames"
        class="full"
      ></base-autocomplete>

      <base-autocomplete
        v-model="shema.vehicleManufacturerDetails[props.index].unifiedCountryCode.value"
        label="Код страны"
        item-text="key"
        :items="NSI_034"
        class="span6"
        disabled
      ></base-autocomplete>

      <base-autocomplete
        v-model="shema.vehicleManufacturerDetails[props.index].businessEntityTypeName"
        label="Наименование организационно-правовой формы"
        max-length="300"
        item-text="value"
        :items="NSI_310"
        class="span6"
        disabled
      ></base-autocomplete>

      <template
        v-for="(item2, index2) in shema.vehicleManufacturerDetails[
          props.index
        ].subjectAddressDetails.filter((e) => ['2', '4'].includes(e.addressKindCode))"
        :key="index2"
      >
        <base-delete-element
          class="full"
          :fun="
            () =>
              shema.vehicleManufacturerDetails[props.index].subjectAddressDetails.splice(index2, 1)
          "
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
        </base-delete-element>
      </template>

      <p class="full title">Контактные данные</p>
      <template
        v-for="(item3, index3) in shema.vehicleManufacturerDetails[props.index]
          .unifiedCommunicationDetails"
        :key="index3"
      >
        <base-delete-element
          class="full"
          :fun="
            () =>
              shema.vehicleManufacturerDetails[props.index].unifiedCommunicationDetails.splice(
                index3,
                1
              )
          "
        >
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
        </base-delete-element>
      </template>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '@/components/forms/conformityForms/rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseDeleteElement from '@/components/base/BaseDeleteElement.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'
const route = useRoute()
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema // схема
const form = ref(null) // ссылка на форму

const NSI_034 = ref([])
const NSI_042 = ref([])
const NSI_310 = ref([])
const authority = ref([])

const isLook = computed(() => route.query.look != null)
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
    } = shemaDefault.vehicleManufacturerDetails[0]
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
  NSI_034.value = (await indexDB.getFromDatabase('catalog', 'NSI_034')) || []
  NSI_042.value = (await indexDB.getFromDatabase('catalog', 'NSI_042')) || []
  NSI_310.value = (await indexDB.getFromDatabase('catalog', 'NSI_310')) || []
  let fullAutority = (await requests.get('/api/manufacturer-registry/all')) || []

  authority.value = fullAutority.filter(
    (e) => e.vehicleManufacturerKindCode && e.vehicleManufacturerKindCode.includes('30')
  )
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
