<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.notPowerStorageDevice"
      v-model:data="shema.vehicleVariantDetails.powerStorageDeviceDetails"
      :default-data="shemaDefault.vehicleVariantDetails.powerStorageDeviceDetails"
      label="Устройство накопления энергии - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails.powerStorageDeviceDetails"
        :filter-data="shema.vehicleVariantDetails.powerStorageDeviceDetails"
        :default-data="shemaDefault.vehicleVariantDetails.powerStorageDeviceDetails[0]"
        class="full"
        label="Базовое ТС"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Тип (описание) компонента*"
          :items="NSI_059"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.powerStorageDeviceVoltageMeasure.value"
          label="Рабочее напряжение устройства накопления энергии"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.powerStorageDeviceVoltageMeasure.measurementUnitCode"
          label="Ед.измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <base-textarea
          v-model="props.item.vehicleComponentLocationText"
          label="Место расположения компонента СМ"
          class="full"
        ></base-textarea>

        <base-textfield
          v-model="props.item.vehicleRangeMeasure.value"
          label="Запас хода"
          type="number"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.powerStorageDeviceVoltageMeasure.measurementUnitCode"
          label="Ед.измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useShemaStore } from '@/stores/shemaStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const NSI_033 = ref([])
const NSI_059 = ref([])

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
  NSI_059.value = (await indexDB.getFromDatabase('catalog', 'NSI_059')) || []
}
load()
</script>
