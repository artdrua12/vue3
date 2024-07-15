<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notVehicleBrakingSystem"
      v-model:data="shema.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
      :default-data="shemaDefault.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
      label="Рулевого управления - отсутствует"
      class="full"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
        :filter-data="shema.vehicleVariantDetails[0].vehicleBrakingSystemDetails"
        :default-data="shemaDefault.vehicleVariantDetails[0].vehicleBrakingSystemDetails[0]"
        label="Рулевое управление"
        class="full"
        :disabled="isLook"
      >
        <base-autocomplete
          v-if="
            (props.item.vehicleBrakingSystemKindCode &&
              props.item.vehicleBrakingSystemKindCode.length === 2) ||
            docStatus === 'Черновик' ||
            !docStatus
          "
          v-model="props.item.vehicleBrakingSystemKindCode"
          label="Наименование элемента тормозной системы*"
          :rules="[conformityRules.vehicleBrakingSystemItemName]"
          :items="NSI_029"
          item-value="key"
          class="full"
        ></base-autocomplete>

        <base-autocomplete
          v-else
          v-model="props.item.vehicleBrakingSystemItemName"
          label="Наименование элемента тормозной системы*"
          :rules="[conformityRules.vehicleBrakingSystemItemName]"
          :items="vehicleBrakingSystemItemName"
        ></base-autocomplete>

        <base-textarea
          v-model="props.item.vehicleComponentText"
          max-length="1000"
          label="Описание*"
          :rules="[conformityRules.vehicleBrakComponentText]"
          class="full"
        ></base-textarea>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '@/components/forms/conformityForms/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
const NSI_029 = ref([])
const form = ref(null) // ссылка на форму

const isLook = computed(() => route.query.look != null)
const docStatus = computed(() => shema.conformityDocStatusDetails.docStatus)

async function load() {
  NSI_029.value = (await indexDB.getFromDatabase('catalog', 'NSI_029')) || []
}
load()
</script>
