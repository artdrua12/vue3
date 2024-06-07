<template>
  <div class="adaptiveGrid pa-7">
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].docName"
      label="Наименование документа, подтверждающего соответствие обязательным требованиям"
      class="span6"
    ></base-textfield>
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].docId"
      label="Номер документа, подтверждающего соответствие обязательным требованиям"
      class="span6"
    ></base-textfield>
    <base-datefield
      v-model="shema.vehicleComplianceDocDetails[0].docCreationDate"
      label="Дата документа"
      class="span3"
    ></base-datefield>
    <base-datefield
      v-model="shema.vehicleComplianceDocDetails[0].eventDate"
      label="Дата внесения записи о документе в единый реестр"
      class="span3"
    ></base-datefield>
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].businessEntityName"
      label="Наименование хозяйствующего субъекта, выдавшего документ"
      class="span6"
    ></base-textfield>
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].businessEntityId"
      label="Идентификатор хозяйствующего субъекта, присвоенный при государственной регистрации"
      class="span6"
    ></base-textfield>
    <base-textfield
      v-model="shema.fullNameDetails"
      label="ФИО руководителя уполномоченного органа"
      class="span6"
    ></base-textfield>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/conformityForms/shema'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_046 = ref([])

async function load() {
  NSI_046.value = (await indexDB.getFromDatabase('catalog', 'NSI_046')) || []
}
load()
</script>
