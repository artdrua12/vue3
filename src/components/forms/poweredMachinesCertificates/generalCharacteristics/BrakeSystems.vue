<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notVehicleBrakingSystem"
      v-model:data="shema.vehicleVariantDetails.vehicleBrakingSystemDetails"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleBrakingSystemDetails"
      label="Тормозные системы - отсутствуют"
      class="full"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.vehicleBrakingSystemDetails"
        :filter-data="shema.vehicleVariantDetails.vehicleBrakingSystemDetails"
        :default-data="shemaDefault.vehicleVariantDetails.vehicleBrakingSystemDetails[0]"
        label="Тормозная система"
        class="full"
        :disabled="isLook"
      >
        <base-autocomplete
          v-if="
            (props.item.vehicleBrakingSystemKindCode &&
              props.item.vehicleBrakingSystemKindCode.length === 2) ||
            shema.conformityDocStatus === 'Черновик' ||
            !shema.conformityDocStatus
          "
          v-model="props.item.vehicleBrakingSystemKindCode"
          label="Вид тормозной системы *"
          item-text="title"
          :items="NSI_029"
          item-value="key"
          class="full"
        ></base-autocomplete>

        <base-autocomplete
          v-else
          v-model="props.item.vehicleBrakingSystemItemName"
          item-text="title"
          label="Вид тормозной системы *"
          :items="vehicleBrakingSystemItemName"
        ></base-autocomplete>

        <base-textarea
          v-model="props.item.vehicleComponentText"
          max-length="1000"
          label="Описание*"
          class="full"
        ></base-textarea>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
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

async function load() {
  NSI_029.value = (await indexDB.getFromDatabase('catalog', 'NSI_029')) || []
}
load()
</script>
