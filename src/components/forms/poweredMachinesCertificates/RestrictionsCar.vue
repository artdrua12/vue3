<template>
  <v-form ref="form" class="adaptiveGrid pa-7" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleTypeDetails.vehicleUseRestrictionIndicator"
      v-model:data="shema.vehicleTypeDetails.vehicleUseRestrictionText"
      :default-data="shemaDefault.vehicleTypeDetails.vehicleUseRestrictionText"
      label="Наличие ограничений использования СМ"
      :disabled="isLook"
      invert
      class="full"
    >
      <base-constructor-one-element
        v-slot="props"
        v-model="shema.vehicleTypeDetails.vehicleUseRestrictionText"
        class="full"
        :disabled="isLook"
        :default-data="['']"
      >
        <base-textarea
          v-model="shema.vehicleTypeDetails.vehicleUseRestrictionText[props.index]"
          label="Ограничения на возможность использования на дорогах общего пользования"
        ></base-textarea>
      </base-constructor-one-element>
    </base-is-missing>

    <base-autocomplete
      v-model="shema.vehicleTypeDetails.preferentialManufacturingModeText"
      label="Сведения о производстве с применением льготного режима производства"
      :items="NSI_067"
      item-text="title"
      class="full"
    ></base-autocomplete>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
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
const NSI_067 = ref([])

async function load() {
  NSI_067.value = (await indexDB.getFromDatabase('catalog', 'NSI_067')) || []
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
