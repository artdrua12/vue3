<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="isLook">
    <base-is-missing
      v-model="shema.notFrameIndicator"
      v-model:data="shema.frameDetails"
      :default-data="shemaDefault.frameDetails"
      class="full"
      :disabled="isLook"
    >
      <base-is-missing-disabled
        v-model="shema.frameDetails.notFrameMakeNameIndicator"
        v-model:data="shema.frameDetails.frameMakeName"
        class="full"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="shema.frameDetails.frameMakeName"
          label="Марка*"
          :items="NSI_046"
          :disabled="shema.frameDetails.notFrameMakeNameIndicator"
          item-value="key"
          max-length="120"
        ></base-autocomplete>
      </base-is-missing-disabled>

      <base-textfield
        id="type"
        v-model="shema.frameDetails.frameType"
        label="Идентификатор типа*"
        max-length="50"
        class="span6"
        :rules="[rules.frameType]"
      ></base-textfield>

      <base-textfield
        v-model="shema.frameDetails.frameModification"
        label="Модификация"
        max-length="50"
        class="span6"
      ></base-textfield>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
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
