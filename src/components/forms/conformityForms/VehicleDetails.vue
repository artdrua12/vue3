<template>
  <div class="adaptiveGrid">
    <base-is-missing-disabled
      v-model="vehicleTypeDetails.notVehicleMakeNameIndicator"
      class="span6"
    >
      <base-autocomplete
        v-model="vehicleTypeDetails.vehicleMakeName"
        label="Марка*"
        :items="NSI_046"
        :disabled="vehicleTypeDetails.notVehicleMakeNameIndicator"
        item-value="key"
        max-length="120"
        :rules="
          !vehicleTypeDetails.notVehicleMakeNameIndicator ? [conformityRules.vehicleMakeName] : []
        "
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="vehicleTypeDetails.notVehicleCommercialNameIndicator"
      class="span6"
    >
      <base-combobox
        v-model="vehicleTypeDetails.vehicleCommercialName"
        label="Коммерческое наименование*"
        item-value="key"
        max-length="120"
        :rules="
          !vehicleTypeDetails.notVehicleCommercialNameIndicator
            ? [conformityRules.vehicleCommercialName]
            : []
        "
        :disabled="vehicleTypeDetails.notVehicleCommercialNameIndicator"
      ></base-combobox>
    </base-is-missing-disabled>

    <base-autocomplete
      v-if="shema.conformityDocKindCode !== '35'"
      v-model="vehicleTypeDetails.vehicleTypeId"
      multiple
      label="Тип"
      item-text="value"
      :items="NSI_399"
      class="span6"
    ></base-autocomplete>

    <base-combobox
      v-model="vehicleTypeDetails.vehicleTypeIdZ"
      label="Идентификатор типа*"
      :rules="[conformityRules.vehicleTypeIdZ]"
      class="span6"
    ></base-combobox>

    <base-is-missing-disabled v-model="vehicleVariantDetails[0].notVehicleTypeId" class="span6">
      <base-combobox
        v-model="vehicleTypeDetails.vehicleMakeName"
        label="Модификация транспортного средства"
        :rules="
          !vehicleVariantDetails[0].notVehicleTypeId ? [conformityRules.vehicleTypeVariantId] : []
        "
        :disabled="vehicleVariantDetails[0].notVehicleTypeId"
      ></base-combobox>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="vehicleVariantDetails[0].notModificationVirtual"
      class="span6"
    >
      <base-textfield
        v-model="vehicleVariantDetails[0].modificationVirtual"
        label="Виртуальная модификация*"
        :disabled="vehicleVariantDetails[0].notModificationVirtual"
      ></base-textfield>
    </base-is-missing-disabled>

    <base-autocomplete
      v-model="vehicleTypeDetails.vehicleTechCategoryCode"
      label="Категория ТС в соответствии с ТР ТС № 018/2011*"
      item-text="key"
      :items="NSI_015.filter((e) => e.key.match(/L|M|N|O/))"
      multiple
      :rules="[conformityRules.vehicleTechCategoryCode]"
      class="span6"
    >
    </base-autocomplete>

    <base-is-missing-disabled
      v-model="vehicleVariantDetails[0].notVehicleEcoClassCodeIndicator"
      class="span6"
    >
      <base-autocomplete
        v-model="vehicleVariantDetails[0].vehicleEcoClassCode"
        label="Экологический класс*"
        :disabled="vehicleVariantDetails[0].notVehicleEcoClassCodeIndicator"
        :items="NSI_016"
        item-text="value"
        multiple
        :rules="
          !vehicleVariantDetails[0].notVehicleEcoClassCodeIndicator
            ? [conformityRules.vehicleEcoClassCode]
            : []
        "
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-if="
        vehicleTypeDetails.vehicleTechCategoryCode.find((i) =>
          ['M2', 'M2G', 'M3', 'M3G'].includes(i)
        )
      "
      v-model="vehicleVariantDetails[0].notClassCode"
      class="span6"
    >
      <base-autocomplete
        v-model="vehicleVariantDetails[0].classCode"
        label="Класс для категорий M2, M2G, M3, M3G "
        :items="clazz"
        :disabled="vehicleVariantDetails[0].notClassCode"
        item-text="value"
        multiple
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled v-model="vehicleVariantDetails[0].notCodOKPBY" class="span6">
      <base-autocomplete
        v-model="vehicleVariantDetails[0].codOKPBY"
        label="Код ОКП*"
        :items="NSI_089"
        :disabled="vehicleVariantDetails[0].notCodOKPBY"
        item-text="key"
        multiple
        :rules="!vehicleVariantDetails[0].notCodOKPBY ? [conformityRules.codOKPBY] : []"
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled v-model="vehicleVariantDetails[0].notCodTNVED" class="span6">
      <base-autocomplete
        v-model="vehicleVariantDetails[0].codTNVED"
        label="Код ТН ВЭД*"
        :items="NSI_108"
        :disabled="vehicleVariantDetails[0].notCodTNVED"
        item-text="key"
        multiple
        :rules="!vehicleVariantDetails[0].notCodTNVED ? [conformityRules.codTNVED] : []"
      ></base-autocomplete>
    </base-is-missing-disabled>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled2.vue'

import { useRequestStore } from '@/stores/requestStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore()
const vehicleTypeDetails = computed(() => {
  return shema.vehicleTypeDetails
})
const vehicleVariantDetails = computed(() => {
  return shema.vehicleVariantDetails
})
const NSI_015 = ref([])
const NSI_016 = ref([])
const NSI_046 = ref([])
const NSI_089 = ref([])
const NSI_108 = ref([])
const NSI_399 = ref([])
const clazz = ref([])

async function load() {
  NSI_015.value = await indexDB.getFromDatabase('catalog', 'NSI_015')
  NSI_016.value = await indexDB.getFromDatabase('catalog', 'NSI_016')
  NSI_046.value = await indexDB.getFromDatabase('catalog', 'NSI_046')
  NSI_089.value = await indexDB.getFromDatabase('catalog', 'NSI_089')
  NSI_108.value = await indexDB.getFromDatabase('catalog', 'NSI_108')
  NSI_399.value = await indexDB.getFromDatabase('catalog', 'NSI_399')
  clazz.value = await requests.get('/api/classifier/epassport/class-m2-m3-classifier')
}
load()
</script>
