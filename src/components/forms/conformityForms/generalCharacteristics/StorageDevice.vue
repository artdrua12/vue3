<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notPowerStorageDevice"
      v-model:data="shema.vehicleVariantDetails[0].powerStorageDeviceDetails"
      :default-data="shemaDefault.vehicleVariantDetails[0].powerStorageDeviceDetails"
      label="Устройство накопления энергии - отсутствует"
      :disabled="isLook"
    >
      <base-constructor
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].powerStorageDeviceDetails"
        :filter-data="shema.vehicleVariantDetails[0].powerStorageDeviceDetails"
        :default-data="shemaDefault.vehicleVariantDetails[0].powerStorageDeviceDetails[0]"
        class="full"
        label="Базовое ТС"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Тип компонента*"
          :items="NSI_059"
          :rules="[conformityRules.text]"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.vehicleMakeName"
          label="Марка*"
          :rules="[conformityRules.vehicleMakeName]"
          class="span6"
        ></base-textfield>

        <base-textfield v-model="props.item.text" label="Тип*" class="span6"></base-textfield>

        <base-textfield
          v-model="props.item.electrochemicalSteam"
          label="Электрохимическая пара"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="props.item.elementsQuantity"
          label="Количество элементов"
          type="number"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="props.item.massValue.value"
          label="Масса"
          type="number"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.massValue.measurementUnitCode"
          label="Ед.измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.powerStorageDeviceVoltageMeasure.value"
          label="Рабочее напряжение устройства накопления энергии"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.powerStorageDeviceVoltageMeasure.measurementUnitCode"
          label="Ед.измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.vehicleComponentLocationText"
          label="Место расположения компонента ТС"
          class="full"
        ></base-textfield>

        <base-textfield
          v-model="props.item.capacity.value"
          label="Ёмкость"
          type="number"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.capacity.measurementUnitCode"
          label="Ед.измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.vehicleRangeMeasure.value"
          label="Запас хода"
          type="number"
          class="span3"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.vehicleRangeMeasure.measurementUnitCode"
          label="Ед.измерения"
          :items="NSI_033"
          item-value="key"
          class="span3"
        ></base-autocomplete>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import { useShemaStore } from '@/stores/shemaStore'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().shema //схема
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
