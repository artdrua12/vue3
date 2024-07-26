<template>
  <div class="grid12 pa-7">
    <base-constructor
      v-slot="props"
      v-model="shema.docItemStatusDetails"
      :filter-data="shema.docItemStatusDetails"
      :default-data="shemaDefault.docItemStatusDetails[0]"
      class="full"
      label="Документ, на основании которых выдан сертификат соответствия"
      :disabled="isLook"
    >
      <base-textfield
        v-model="props.item.docName"
        label="Наименование документа"
        class="full"
      ></base-textfield>

      <base-textfield
        v-model="props.item.docNumber"
        label="Номер документа"
        class="span6"
      ></base-textfield>
      <base-datefield
        v-model="props.item.updateDateTime"
        label="Дата выдачи документа"
        class="span6"
      ></base-datefield>

      <base-textfield
        v-model="props.item.businessEntityName"
        label="Наименование испытательной лаборатории (центра)"
        class="span6"
      ></base-textfield>
      <base-textfield
        v-model="props.item.docId"
        label="Аттестат аккредитации"
        class="span6"
      ></base-textfield>
    </base-constructor>
    <base-textfield
      v-model="shema.fullDetails"
      label="Схема сертификации"
      class="full mt-3"
    ></base-textfield>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema // схема
const route = useRoute()
const NSI_046 = ref([])
const isLook = computed(() => route.query.look != null)

async function load() {
  NSI_046.value = (await indexDB.getFromDatabase('catalog', 'NSI_046')) || []
}
load()
async function isValidation() {
  return true
}
defineExpose({
  isValidation
})
</script>
