<template>
  <v-form ref="form" class="adaptiveGrid mt-5" :disabled="isLook">
    <base-autocomplete
      v-model="shema.unifiedCountryCode.value"
      label="Код страны, выдавшей  документ об оценке соответствия колесных транспортных средств"
      :items="NSI_034"
      item-value="key"
      class="span6"
    ></base-autocomplete>

    <base-textfield
      v-model="shema.docId"
      label="Номер документа*"
      :rules="[conformityRules.docId]"
      max-length="50"
      hint="Номер документа должен соответствовать формату ТС ZZ (А|Е|К)-ZZ.0000.00000.*  (символы ТС, А, Е, К - с использованием букв кириллицы, ZZ - с использованием латиницы)"
      class="span6"
    ></base-textfield>

    <!-- <base-textfield
      v-model="shema.docId"
      label="Номер документа*"
      max-length="50"
      hint="Номер документа должен соответствовать формату ТС ZZ (А|Е|К)-ZZ.0000.00000.*  (символы ТС, А, Е, К - с использованием букв кириллицы, ZZ - с использованием латиницы)"
      class="span6"
    ></base-textfield> -->

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
      v-if="shema.conformityDocKindCode === '30'"
      v-model="shema.docCreationDate"
      label="Дата оформления бумажного ОТТС"
      class="span6"
      :disabled="isLook"
    ></base-datefield>

    <base-datefield
      v-if="shema.conformityDocKindCode === '35'"
      v-model="shema.docCreationDate"
      label="Дата оформления бумажного ОТШ"
      class="span6"
      :disabled="isLook"
    ></base-datefield>

    <base-datefield
      id="docStartDate"
      v-model="shema.docStartDate"
      label="Дата начала срока действия документа*"
      :rules="[conformityRules.docStartDate]"
      class="span3"
      :disabled="isLook"
    ></base-datefield>

    <base-datefield
      id="docValidityDate"
      v-model="shema.docValidityDate"
      label="Дата истечения срока действия документа*"
      class="span3"
      :disabled="isLook"
    ></base-datefield>

    <base-textfield
      v-model="shema.formNumberId.formNumberMain"
      label="Номер бланка документа"
      class="span6"
    ></base-textfield>

    <base-combobox
      v-model="shema.formNumberId.formAdditionalNumberId"
      label="Номер бланка дополнительного листа"
      class="span6"
    ></base-combobox>

    <base-constructor
      v-slot="props"
      v-model="shema.docAnnexDetails"
      class="full mb-5"
      label="Приложение к документу"
      :filter-data="shema.docAnnexDetails"
      :default-data="shemaDefault.docAnnexDetails[0]"
      :disabled="isLook"
    >
      <base-textfield
        v-model="shema.docAnnexDetails[props.index].objectOrdinal"
        label="Номер приложения"
        class="span3"
      ></base-textfield>
      <base-textfield
        v-model="shema.docAnnexDetails[props.index].pageQuantity"
        label="Количество листов"
        class="span3"
      ></base-textfield>
      <base-combobox
        v-model="shema.docAnnexDetails[props.index].formNumberId"
        label="Номер бланка приложения"
        class="span6"
      >
      </base-combobox>
    </base-constructor>

    <base-textarea v-model="shema.additionalInfoText" label="Иные сведения" class="span6">
    </base-textarea>
    <base-textarea
      v-model="shema.conformityDocStatusDetails.docStatusChangeDocDetails.docName"
      label="Наименование документа об изменении статуса документа об оценке соответствия"
      class="span6"
    ></base-textarea>

    <base-textfield
      v-model="shema.conformityDocStatusDetails.docStatusChangeDocDetails.docId"
      label="Номер документа"
      class="span6"
    ></base-textfield>

    <base-datefield
      v-model="shema.conformityDocStatusDetails.docStatusChangeDocDetails.docCreationDate"
      label="Дата выдачи документа"
      class="span6"
      :disabled="isLook"
    >
    </base-datefield>

    <base-textfield
      v-model="shema.conformityDocStatusDetails.docStatusChangeDocDetails.formNumberId"
      label="Номер бланка документа"
      class="span6"
    ></base-textfield>

    <base-datefield
      v-model="shema.conformityDocStatusDetails.startDate"
      label="Начальная дата"
      class="span3"
      :disabled="isLook"
    >
    </base-datefield>

    <base-datefield
      v-model="shema.conformityDocStatusDetails.endDate"
      label="Конечная дата"
      class="span3"
      :disabled="isLook"
    >
    </base-datefield>

    <base-textfield
      v-model="shema.conformityDocStatusDetails.noteText"
      label="Примечание"
      class="full"
    ></base-textfield>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '@/components/forms/conformityForms/rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
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
