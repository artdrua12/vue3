<template>
  <v-form ref="form" class="pa-7">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notBaseVehicleIndicator"
      v-model:data="shema.vehicleVariantDetails.baseVehicleDetails"
      label="Признак отсутствия базовой СМ"
      :default-data="shemaDefault.vehicleVariantDetails.baseVehicleDetails"
      class="full"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.baseVehicleDetails"
        :filter-data="shema.vehicleVariantDetails.baseVehicleDetails"
        :default-data="shemaDefault.vehicleVariantDetails.baseVehicleDetails[0]"
        class="full"
        label="Базовая СМ"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleMakeName"
          label="Марка*"
          :items="NSI_046"
          item-text="title"
          max-length="120"
          class="span6"
        ></base-autocomplete>
        <base-textfield
          v-model="props.item.vehicleTypeId"
          label="Идентификатор типа*"
          max-length="50"
          :rules="[(v) => !!v || 'Обязательно для заполнения']"
          class="span6"
        >
        </base-textfield>

        <base-textfield
          v-model="props.item.vehicleCommercialName"
          label="Коммерческое наименование СМ"
          max-length="120"
          class="span6"
        ></base-textfield>
        <base-textfield
          v-model="props.item.docId"
          label="Номер бумажного паспорта базовой СМ (шасси ТС)"
          max-length="50"
          class="span6"
        ></base-textfield>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRouter } from 'vue-router'

const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore() // для работы с базой данных IndexDB
const shema = useShemaStore().getShema //схема
const NSI_046 = ref([])
const organizationName = ref([])
const form = ref(null) // ссылка на форму
const route = useRouter()
const isLook = computed(() => route.query?.look != null)

async function load() {
  NSI_046.value = await indexDB.getFromDatabase('catalog', 'NSI_046')
  organizationName.value = await requests.get(
    '/api/classifier/epassport/certification-body/search/certificateAccreditations'
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
