<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="isLook">
    <base-autocomplete
      v-model="shema.technicalRegulations"
      label="Наименование технического регламента Таможенного союза"
      item-text="key"
      multiple
      chips
      item-value="key"
      :items="
        NSI_122.filter((item) =>
          ['ТР ТС 018/2011', 'ТР ТС 010/2011', 'ТР ТС 031/2012', 'Иные основания'].includes(
            item.key
          )
        )
      "
      class="full"
    ></base-autocomplete>

    <base-textfield v-model="shema.expiration" label="Срок службы" class="span6"></base-textfield>
    <base-textfield
      v-model="shema.instead"
      label="Выдан взамен сертификата соответствия"
      class="span6"
    ></base-textfield>

    <base-textarea
      v-model="shema.additionalInfoText"
      label="Иные сведения"
      class="full"
    ></base-textarea>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore()
const shema = useShemaStore().getShema // схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const NSI_122 = ref([])

async function load() {
  NSI_122.value = (await indexDB.getFromDatabase('catalog', 'NSI_122')) || []
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
