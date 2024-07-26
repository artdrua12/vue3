<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="isLook">
    <base-autocomplete
      v-model="shema.unifiedCountryCode.value"
      label="Cтрана"
      :items="NSI_034"
      item-value="key"
      class="span6"
    ></base-autocomplete>

    <base-textfield
      v-model="shema.docId"
      label="Номер декларации*"
      max-length="50"
      hint="Номер документа должен соответствовать формату ТС ZZ (А|Е|К)-ZZ.0000.00000.*  (символы ТС, А, Е, К - с использованием букв кириллицы, ZZ - с использованием латиницы)"
      class="span6"
    ></base-textfield>

    <base-autocomplete
      v-model="shema.conformityDocKindCode"
      label="Наименование вида документа об оценке соответствия"
      :items="conformityDocKindName"
      item-text="title"
      item-value="key"
      class="span6"
      disabled
    ></base-autocomplete>

    <base-datefield
      v-model="shema.docCreationDate"
      label="Дата внесения в единый реестр"
      class="span6"
      :disabled="isLook"
    ></base-datefield>

    <base-datefield
      id="docStartDate"
      v-model="shema.docStartDate"
      label="Срок действия с*"
      class="span6"
      :disabled="isLook"
    ></base-datefield>

    <base-datefield
      id="docValidityDate"
      v-model="shema.docValidityDate"
      label="Срок действия по*"
      class="span6"
      :disabled="isLook"
    ></base-datefield>


    <base-constructor
      v-slot="props"
      v-model="shema.docAnnexDetails"
      class="full"
      label="Приложение к документу"
      :filter-data="shema.docAnnexDetails"
      :default-data="shemaDefault.docAnnexDetails[0]"
      :disabled="isLook"
    >
      <base-textfield
        v-model="shema.docAnnexDetails[props.index].objectOrdinal"
         label="Порядковый номер приложения к документу"
        class="span6"
      ></base-textfield>
      <base-textfield
        v-model="shema.docAnnexDetails[props.index].pageQuantity"
        label="Количество листов"
        class="span6"
      ></base-textfield>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRequestStore } from '@/stores/requestStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore()
const requests = useRequestStore() // для работы с запросами
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму

const isLook = computed(() => route.query.look != null)
const conformityDocKindName = ref([])
const NSI_034 = ref([])

async function load() {
  conformityDocKindName.value =
    (await requests.get('/api/classifier/epassport/conformity-doc-kinds')) || []
  NSI_034.value = (await indexDB.getFromDatabase('catalog', 'NSI_034')) || []

  // const s = await requests.get('/api/classifier/epassport/conformity-doc-kinds')
  // console.log('s', s)
}
load()

// для того что бы метод был доступен у родителя
defineExpose({
  async isValidation() {
    const { valid } = await this.$refs.form.validate()
    console.log('valid', valid)
    return valid
  }
})
</script>
