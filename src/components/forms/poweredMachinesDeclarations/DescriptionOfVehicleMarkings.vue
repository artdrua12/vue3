<template>
  <v-form ref="form" class="pa-7">
    <base-is-missing
      v-model="shema.vehicleTypeDetails.vehicleLabelingDetails.notManufacturerPlateIndicator"
      v-model:data="shema.vehicleTypeDetails.vehicleLabelingDetails.vehicleComponentLocationText"
      label="Признак отсутствия таблички изготовителя"
      :default-data="
        shemaDefault.vehicleTypeDetails.vehicleLabelingDetails.vehicleComponentLocationText
      "
      class="full"
      :disabled="isLook"
    >
      <base-constructor-one-element
        v-slot="props"
        v-model="shema.vehicleTypeDetails.vehicleLabelingDetails.vehicleComponentLocationText"
        class="full"
        :disabled="isLook"
      >
        <base-textfield v-model="props.item" label="Место расположения таблички изготовителя*">
        </base-textfield>
      </base-constructor-one-element>
    </base-is-missing>

    <base-constructor-one-element
      v-slot="props2"
      v-model="
        shema.vehicleTypeDetails.vehicleLabelingDetails.vehicleIdentificationNumberLocationText
      "
      class="full"
      :disabled="isLook"
    >
      <base-textarea v-model="props2.item" label="Место расположения идентификационного номера*">
      </base-textarea>
    </base-constructor-one-element>

    <base-constructor-one-element
      v-slot="props2"
      v-model="
        shema.vehicleTypeDetails.vehicleLabelingDetails.engineIdentificationNumberLocationText
      "
      class="full"
      :disabled="isLook"
    >
      <base-textarea
        v-model="props2.item"
        label="Место расположения идентификационного номера двигателя"
      >
      </base-textarea>
    </base-constructor-one-element>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRequestStore } from '@/stores/requestStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRouter } from 'vue-router'

const requests = useRequestStore() // для работы с запросами
const indexDB = useIndexDBStore() // для работы с базой данных IndexDB
const shema = useShemaStore().getShema //схема
const NSI_106 = ref([])
const organizationName = ref([])
const form = ref(null) // ссылка на форму
const route = useRouter()
const isLook = computed(() => route.query?.look != null)

async function load() {
  NSI_106.value = await indexDB.getFromDatabase('catalog', 'NSI_106')
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
