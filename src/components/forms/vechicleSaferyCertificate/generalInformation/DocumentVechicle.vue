<template>
  <v-form ref="form" class="adaptiveGrid mt-5" :disabled="isLook">
    <base-autocomplete
      v-model="shema.unifiedCountryCode.value"
      label="Страны"
      :items="NSI_034"
      item-value="key"
      class="span6"
    ></base-autocomplete>
    <base-datefield
      id="docStartDate"
      v-model="shema.docCreationDate"
      label="Дата выдачи"
      class="span6"
      :disabled="isLook"
    ></base-datefield>

    <base-textfield
      v-model="shema.docId"
      label="Номер документа*"
      :rules="[commonRules.docId]"
      max-length="50"
      hint="Номер документа должен соответствовать формату ТС ZZ (А|Е|К)-ZZ.0000.00000.*  (символы ТС, А, Е, К - с использованием букв кириллицы, ZZ - с использованием латиницы)"
      class="full"
    ></base-textfield>
    <base-autocomplete
      v-model="shema.conformityDocKindCode"
      label="Вид документа "
      :items="conformityDocKindName"
      :disabled="true"
      item-value="key"
      class="full"
    ></base-autocomplete>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import { commonRules } from '@/components/forms/vechicleSaferyCertificate/rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
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
