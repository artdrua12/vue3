<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="isLook">
    <base-autocomplete
      v-model="shema.vehicleTypeDetails.vehicleCharacteristicsName"
      label="Наименование продукции"
      :items="NSI_069"
      item-text="title"
      multiple
      chips
      class="full"
    ></base-autocomplete>

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
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="shema.vehicleTypeDetails.notVehicleCommercialNameIndicator"
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
      ></base-combobox>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="shema.vehicleTypeDetails.notVehicleTypeIndicator"
      v-model:data="shema.vehicleTypeDetails.vehicleTypeId"
      :default-data="[]"
      class="span6"
      :disabled="isLook"
    >
      <base-combobox
        v-model="shema.vehicleTypeDetails.vehicleTypeId"
        label="Идентификатор типа*"
        :max-length="50"
        :disabled="isLook || shema.vehicleTypeDetails.notVehicleTypeIndicator"
        class="span6"
      ></base-combobox>
    </base-is-missing-disabled>
    <base-autocomplete
      v-model="shema.vehicleTypeDetails.vehicleType"
      multiple
      chips
      label="Тип ТС"
      :items="NSI_399"
      class="span6"
    ></base-autocomplete>

    <base-is-missing-disabled
      v-model="shema.vehicleTypeDetails.notVehicleTypeVariantId"
      v-model:data="shema.vehicleTypeDetails.vehicleTypeVariantId"
      :default-data="[]"
      class="span6"
      :disabled="isLook"
    >
      <base-combobox
        v-model="shema.vehicleTypeDetails.vehicleTypeVariantId"
        label="Модификация СМ"
        :max-length="50"
        :disabled="isLook || shema.vehicleTypeDetails.notVehicleTypeVariantId"
      ></base-combobox>
    </base-is-missing-disabled>

    <base-is-missing-disabled
      v-model="shema.vehicleTypeDetails.notCodTNVED"
      v-model:data="shema.vehicleTypeDetails.codTNVED"
      :default-data="[]"
      class="span6"
      :disabled="isLook"
    >
      <base-autocomplete
        v-model="shema.vehicleTypeDetails.codTNVED"
        label="Код ТН ВЭД*"
        :items="NSI_108"
        item-text="key"
        :max-length="50"
        :disabled="isLook || shema.vehicleTypeDetails.notCodTNVED"
      ></base-autocomplete>
    </base-is-missing-disabled>

    <base-autocomplete
      v-model="shema.vehicleTypeDetails.vehicleTechCategoryCode"
      label="Категория ТС в соответствии с ТР ТС № 018/2011*"
      item-value="key"
      :items="NSI_015"
      multiple
      chips
      class="full"
    >
    </base-autocomplete>

    <base-autocomplete
      v-model="shema.vehicleTypeDetails.vehicleTechCategoryCode"
      label="Категория ТС, СМ по ТР ТС 010/2011, ТР ТС 018/2011, ТР ТС 031/2012*"
      item-value="key"
      :items="NSI_015"
      multiple
      chips
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
      ></base-autocomplete>
    </base-is-missing-disabled>

    <p class="title full mb-3">Объект сертификации</p>

    <base-autocomplete
      v-model="shema.vehicleVariantDetails.technicalRegulationObjectKindCode"
      label="Выпуск продукции*"
      :items="NSI_303"
      item-text="title"
      class="span6"
    ></base-autocomplete>

    <base-textfield
      v-if="['2', '3'].includes(shema.vehicleVariantDetails.technicalRegulationObjectKindCode)"
      v-model="shema.unifiedCommodityMeasure.value"
      label="Размер партии"
      :disabled="shema.technicalRegulationObjectKindCode === '3'"
      type="number"
      class="span6"
    ></base-textfield>

    <base-textfield
      v-if="shema.technicalRegulationObjectKindCode !== '1'"
      v-model="shema.vehicleDetails.vehicleIdInfoDetails.vehicleFactoryNumberId"
      label="Заводской номер"
      class="span6"
    ></base-textfield>

    <base-constructor
      v-slot="props"
      v-model="shema.vehicleComplianceDocDetails"
      :filter-data="shema.vehicleComplianceDocDetails"
      :default-data="shemaDefault.vehicleComplianceDocDetails[0]"
      label="Документ"
      :disabled="isLook"
      class="full"
    >
      <base-textfield
        v-model="props.item.docName"
        label="Наименование документа"
        class="full"
      ></base-textfield>

      <base-textfield
        v-model="props.item.docId"
        label="Номер документа"
        class="span6"
      ></base-textfield>
      <base-datefield v-model="props.item.docCreationDate" label="Дата документа" class="span6">
      </base-datefield>
    </base-constructor>

    <base-constructor
      v-slot="props"
      v-model="shema.shippingDoc"
      :filter-data="shema.shippingDoc"
      :default-data="shemaDefault.shippingDoc[0]"
      label="Реквизит товаросопроводительной документации"
      :disabled="isLook"
      class="full"
    >
      <base-textfield
        v-model="props.item.docName"
        label="Наименование документа"
        class="full"
      ></base-textfield>

      <base-textfield
        v-model="props.item.docId"
        label="Номер документа"
        class="span6"
      ></base-textfield>
      <base-datefield v-model="props.item.docCreationDate" label="Дата документа" class="span6">
      </base-datefield>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму

const NSI_013 = ref([])
const NSI_015 = ref([])
const NSI_016 = ref([])
const NSI_046 = ref([])
const NSI_064 = ref([])
const NSI_069 = ref([])
const NSI_089 = ref([])
const NSI_108 = ref([])
const NSI_303 = ref([])
const NSI_399 = ref([])

const isLook = computed(() => route.query.look != null)

async function load() {
  NSI_013.value = (await indexDB.getFromDatabase('catalog', 'NSI_015')) || []
  NSI_015.value = (await indexDB.getFromDatabase('catalog', 'NSI_015')) || []
  NSI_016.value = (await indexDB.getFromDatabase('catalog', 'NSI_016')) || []
  NSI_046.value = (await indexDB.getFromDatabase('catalog', 'NSI_046')) || []
  NSI_064.value = (await indexDB.getFromDatabase('catalog', 'NSI_064')) || []
  NSI_069.value = (await indexDB.getFromDatabase('catalog', 'NSI_069')) || []
  NSI_089.value = (await indexDB.getFromDatabase('catalog', 'NSI_089')) || []
  NSI_108.value = (await indexDB.getFromDatabase('catalog', 'NSI_108')) || []
  NSI_303.value = (await indexDB.getFromDatabase('catalog', 'NSI_303')) || []
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
