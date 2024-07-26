<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notExhaust"
      v-model:data="shema.vehicleVariantDetails.exhaustDetails"
      :default-data="shemaDefault.vehicleVariantDetails.exhaustDetails"
      label="Система нейтрализации - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.exhaustDetails"
        :filter-data="shema.vehicleVariantDetails.exhaustDetails"
        :default-data="shemaDefault.vehicleVariantDetails.exhaustDetails[0]"
        class="full"
        label="Система нейтрализации"
        :disabled="isLook"
      >
        <base-textfield
          v-model="props.item.vehicleComponentText"
          label="Тип системы нейтрализации*"
          max-length="1000"
          class="full"
        ></base-textfield>

        <base-is-missing
          v-model="props.item.notVehicleComponentMakeName"
          v-model:data="props.item.vehicleComponentMakeName"
          :default-data="shemaDefault.vehicleVariantDetails.vehicleComponentMakeName"
          label="Марка - отсутствует"
          :disabled="isLook"
          class="full"
        >
          <base-textfield
            v-model="props.item.vehicleComponentMakeName"
            label="Марка"
            max-length="1000"
            class="full"
          ></base-textfield>
        </base-is-missing>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import { useRoute } from 'vue-router'

import { useShemaStore } from '@/stores/shemaStore'
const route = useRoute()
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)


</script>
