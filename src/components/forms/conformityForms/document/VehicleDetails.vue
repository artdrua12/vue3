<template>
  <div class="adaptiveGrid mt-5">
    <base-is-missing-disabled
      v-model="shema.vehicleTypeDetails.notVehicleMakeNameIndicator"
      v-model:data="shema.vehicleTypeDetails.vehicleMakeName"
      :default-data="[null]"
      class="span6"
    >
      <base-autocomplete
        v-model="shema.vehicleTypeDetails.vehicleMakeName"
        label="Марка*"
        :items="NSI_046"
        :disabled="shema.vehicleTypeDetails.notVehicleMakeNameIndicator"
        multiple
        item-value="key"
        max-length="120"
        :rules="
          !shema.vehicleTypeDetails.notVehicleMakeNameIndicator
            ? [conformityRules.vehicleMakeName]
            : []
        "
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="shema.vehicleTypeDetails.notVehicleCommercialNameIndicator"
      v-model:data="shema.vehicleTypeDetails.vehicleCommercialName"
      :default-data="[null]"
      class="span6"
    >
      <base-combobox
        v-model="shema.vehicleTypeDetails.vehicleCommercialName"
        label="Коммерческое наименование*"
        item-value="key"
        max-length="120"
        :rules="
          !shema.vehicleTypeDetails.notVehicleCommercialNameIndicator
            ? [conformityRules.vehicleCommercialName]
            : []
        "
        :disabled="shema.vehicleTypeDetails.notVehicleCommercialNameIndicator"
      ></base-combobox>
    </base-is-missing-disabled>

    <base-autocomplete
      v-if="shema.conformityDocKindCode !== '35'"
      v-model="shema.vehicleTypeDetails.vehicleTypeId"
      multiple
      label="Тип"
      item-text="value"
      :items="NSI_399"
      class="span6"
    ></base-autocomplete>

    <base-combobox
      v-model="shema.vehicleTypeDetails.vehicleTypeIdZ"
      label="Идентификатор типа*"
      :rules="[conformityRules.vehicleTypeIdZ]"
      class="span6"
    ></base-combobox>

    <base-is-missing-disabled
      v-model="shema.vehicleVariantDetails[0].notVehicleTypeId"
      v-model:data="shema.vehicleVariantDetails[0].vehicleTypeVariantId"
      :default-data="[null]"
      class="span6"
    >
      <base-combobox
        v-model="shema.vehicleVariantDetails[0].vehicleTypeVariantId"
        label="Модификация транспортного средства"
        :rules="
          !shema.vehicleVariantDetails[0].notVehicleTypeId
            ? [conformityRules.vehicleTypeVariantId]
            : []
        "
        :disabled="shema.vehicleVariantDetails[0].notVehicleTypeId"
      ></base-combobox>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="shema.vehicleVariantDetails[0].notModificationVirtual"
      v-model:data="shema.vehicleVariantDetails[0].modificationVirtual"
      class="span6"
    >
      <base-textfield
        v-model="shema.vehicleVariantDetails[0].modificationVirtual"
        label="Виртуальная модификация*"
        :disabled="shema.vehicleVariantDetails[0].notModificationVirtual"
      ></base-textfield>
    </base-is-missing-disabled>

    <base-autocomplete
      v-model="shema.vehicleTypeDetails.vehicleTechCategoryCode"
      label="Категория ТС в соответствии с ТР ТС № 018/2011*"
      item-text="key"
      :items="NSI_015.filter((e) => e.key.match(/L|M|N|O/))"
      multiple
      :rules="[conformityRules.vehicleTechCategoryCode]"
      class="span6"
    >
    </base-autocomplete>

    <base-is-missing-disabled
      v-model="shema.vehicleVariantDetails[0].notVehicleEcoClassCodeIndicator"
      v-model:data="shema.vehicleVariantDetails[0].vehicleEcoClassCode"
      :default-data="[null]"
      class="span6"
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails[0].vehicleEcoClassCode"
        label="Экологический класс*"
        :disabled="shema.vehicleVariantDetails[0].notVehicleEcoClassCodeIndicator"
        :items="NSI_016"
        item-text="value"
        multiple
        :rules="
          !shema.vehicleVariantDetails[0].notVehicleEcoClassCodeIndicator
            ? [conformityRules.vehicleEcoClassCode]
            : []
        "
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-if="
        shema.vehicleTypeDetails.vehicleTechCategoryCode.find((i) =>
          ['M2', 'M2G', 'M3', 'M3G'].includes(i)
        )
      "
      v-model="shema.vehicleVariantDetails[0].notClassCode"
      v-model:data="shema.vehicleVariantDetails[0].classCode"
      :default-data="[null]"
      class="span6"
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails[0].classCode"
        label="Класс для категорий M2, M2G, M3, M3G "
        :items="NSI_013"
        :disabled="shema.vehicleVariantDetails[0].notClassCode"
        item-text="value"
        multiple
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="shema.vehicleVariantDetails[0].notCodOKPBY"
      v-model:data="shema.vehicleVariantDetails[0].codOKPBY"
      :default-data="[null]"
      class="span6"
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails[0].codOKPBY"
        label="Код ОКП*"
        :items="NSI_089"
        :disabled="shema.vehicleVariantDetails[0].notCodOKPBY"
        item-text="key"
        multiple
        :rules="!shema.vehicleVariantDetails[0].notCodOKPBY ? [conformityRules.codOKPBY] : []"
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="shema.vehicleVariantDetails[0].notCodTNVED"
      v-model:data="shema.vehicleVariantDetails[0].codTNVED"
      :default-data="[null]"
      class="span6"
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails[0].codTNVED"
        label="Код ТН ВЭД*"
        :items="NSI_108"
        :disabled="shema.vehicleVariantDetails[0].notCodTNVED"
        item-text="key"
        multiple
        :rules="!shema.vehicleVariantDetails[0].notCodTNVED ? [conformityRules.codTNVED] : []"
      ></base-autocomplete>
    </base-is-missing-disabled>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import { conformityRules } from '../rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().shema //схема

const NSI_013 = ref([])
const NSI_015 = ref([])
const NSI_016 = ref([])
const NSI_046 = ref([])
const NSI_089 = ref([])
const NSI_108 = ref([])
const NSI_399 = ref([])

async function load() {
  NSI_013.value = (await indexDB.getFromDatabase('catalog', 'NSI_015')) || []
  NSI_015.value = (await indexDB.getFromDatabase('catalog', 'NSI_015')) || []
  NSI_016.value = (await indexDB.getFromDatabase('catalog', 'NSI_016')) || []
  NSI_046.value = (await indexDB.getFromDatabase('catalog', 'NSI_046')) || []
  NSI_089.value = (await indexDB.getFromDatabase('catalog', 'NSI_089')) || []
  NSI_108.value = (await indexDB.getFromDatabase('catalog', 'NSI_108')) || []
  NSI_399.value = (await indexDB.getFromDatabase('catalog', 'NSI_399')) || []
}
load()
</script>
