<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notBaseVehicleDetails"
      v-model:data="shema.vehicleVariantDetails[0].baseVehicleDetails"
      label="Базовое ТС - отсутствует"
      :default-data="shemaDefault.vehicleVariantDetails[0].baseVehicleDetails"
      class="full"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].baseVehicleDetails"
        :filter-data="shema.vehicleVariantDetails[0].baseVehicleDetails"
        :default-data="shemaDefault.vehicleVariantDetails[0].baseVehicleDetails[0]"
        class="full"
        label="Базовое ТС"
        :disabled="isLook"
      >
        <base-is-missing-disabled
          v-model="props.item.notVehicleMakeNameIndicator"
          v-model:data="props.item.vehicleMakeName"
          class="full"
          :disabled="isLook"
        >
          <base-autocomplete
            v-model="props.item.vehicleMakeName"
            label="Марка*"
            :items="NSI_046"
            :disabled="props.item.notVehicleMakeNameIndicator"
            item-value="key"
            max-length="120"
            :rules="
              props.item.notVehicleMakeNameIndicator ? [] : [conformityRules.vehicleMakeNameString]
            "
          ></base-autocomplete>
        </base-is-missing-disabled>

        <base-textfield
          id="type"
          v-model="props.item.vehicleTypeId"
          label="Идентификатор типа*"
          :rules="[conformityRules.vehicleTypeId]"
          max-length="50"
          class="span6"
        ></base-textfield>

        <base-combobox
          v-model="props.item.vehicleCommercialName"
          label="Коммерческое наименование транспортного средства"
          max-length="120"
          class="span6"
        ></base-combobox>

        <base-textfield
          v-model="props.item.docId"
          label="Номер бумажного паспорта базового ТС (шасси ТС)"
          max-length="50"
          class="span6"
        ></base-textfield>

        <base-datefield v-model="props.item.docCreationDate" label="Дата документа" class="span6">
        </base-datefield>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с базой данных
const shema = useShemaStore().getShema // схема
const form = ref(null) // ссылка на форму

const isLook = computed(() => route.query.look != null)
const NSI_046 = ref([])

async function load() {
  NSI_046.value = (await indexDB.getFromDatabase('catalog', 'NSI_046')) || []
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
