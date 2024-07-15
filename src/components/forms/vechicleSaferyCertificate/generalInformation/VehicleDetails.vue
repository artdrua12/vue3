<template>
  <v-form ref="form" class="adaptiveGrid mt-5" :disabled="isLook">
    <base-is-missing-disabled
      v-model="shema.vehicleTypeDetails.notVehicleMakeNameIndicator"
      v-model:data="shema.vehicleTypeDetails.vehicleMakeName"
      :default-data="[]"
      class="span6"
      :disabled="isLook"
    >
      <base-autocomplete
        v-model="shema.vehicleTypeDetails.vehicleMakeName"
        label="Марка*"
        :items="NSI_046"
        multiple
        chips
        item-value="key"
        max-length="120"
        :disabled="isLook || shema.vehicleTypeDetails.notVehicleMakeNameIndicator"
        :rules="
          !shema.vehicleTypeDetails.notVehicleMakeNameIndicator ? [commonRules.vehicleMakeName] : []
        "
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model:data="shema.vehicleTypeDetails.vehicleCommercialName"
      :default-data="[]"
      class="span6"
      :disabled="isLook"
    >
      <base-combobox
        v-model="shema.vehicleTypeDetails.vehicleCommercialName"
        label="Коммерческое наименование*"
        max-length="120"
        :disabled="isLook || shema.vehicleTypeDetails.notVehicleCommercialNameIndicator"
        :rules="
          !shema.vehicleTypeDetails.notVehicleCommercialNameIndicator
            ? [commonRules.vehicleCommercialName]
            : []
        "
      ></base-combobox>
    </base-is-missing-disabled>

    <BaseConstructorOneElement
      v-slot="props"
      v-model="shema.vehicleTypeDetails.vehicleTypeId"
      class="full"
      :disabled="isLook"
      :default-data="[null]"
    >
      <base-autocomplete
        v-model="shema.vehicleTypeDetails.vehicleTypeId[props.index]"
        multiple
        chips
        label="Тип"
        :items="NSI_399"
        class="span6"
      ></base-autocomplete>
    </BaseConstructorOneElement>

    <base-combobox
      v-model="shema.vehicleTypeDetails.vehicleTypeIdZ"
      label="Идентификатор типа*"
      :rules="[commonRules.vehicleTypeId]"
      :max-length="50"
      class="span6"
    ></base-combobox>
    <base-autocomplete
      v-model="shema.vehicleTypeDetails.manufactureYear"
      label="Год изготовления ТС"
      :items="NSI_064"
      class="span6"
    ></base-autocomplete>

    <base-autocomplete
      v-model="shema.vehicleTypeDetails.vehicleTechCategoryCode"
      label="Категория ТС в соответствии с ТР ТС № 018/2011*"
      item-value="key"
      :items="NSI_015.filter((e) => e.key.match(/L|M|N|O/))"
      multiple
      chips
      :rules="[commonRules.vehicleTechCategoryCode]"
      class="full"
    >
    </base-autocomplete>

    <base-is-missing-disabled
      v-model="shema.vehicleVariantDetails.notVehicleEcoClassCodeIndicator"
      v-model:data="shema.vehicleVariantDetails.vehicleEcoClassCode"
      :default-data="[]"
      class="full"
      :disabled="isLook"
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails.vehicleEcoClassCode"
        label="Экологический класс*"
        :items="NSI_016"
        item-text="value"
        multiple
        chips
        :disabled="isLook || shema.vehicleVariantDetails.notVehicleEcoClassCodeIndicator"
        :rules="
          !shema.vehicleVariantDetails.notVehicleEcoClassCodeIndicator
            ? [commonRules.vehicleEcoClassCode]
            : []
        "
      ></base-autocomplete>
    </base-is-missing-disabled>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'
import { commonRules } from '@/components/forms/vechicleSaferyCertificate/rules'
const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму

const NSI_013 = ref([])
const NSI_015 = ref([])
const NSI_016 = ref([])
const NSI_046 = ref([])
const NSI_064 = ref([])
const NSI_089 = ref([])
const NSI_108 = ref([])
const NSI_399 = ref([])

const isLook = computed(() => route.query.look != null)

async function load() {
  NSI_013.value = (await indexDB.getFromDatabase('catalog', 'NSI_015')) || []
  NSI_015.value = (await indexDB.getFromDatabase('catalog', 'NSI_015')) || []
  NSI_016.value = (await indexDB.getFromDatabase('catalog', 'NSI_016')) || []
  NSI_046.value = (await indexDB.getFromDatabase('catalog', 'NSI_046')) || []
  NSI_064.value = (await indexDB.getFromDatabase('catalog', 'NSI_064')) || []
  NSI_089.value = (await indexDB.getFromDatabase('catalog', 'NSI_089')) || []
  NSI_108.value = (await indexDB.getFromDatabase('catalog', 'NSI_108')) || []
  NSI_399.value = (await indexDB.getFromDatabase('catalog', 'NSI_399')) || []
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
