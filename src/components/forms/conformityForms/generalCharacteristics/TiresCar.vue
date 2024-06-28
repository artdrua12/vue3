<template>
  <div class="mt-5">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleTyreKindInfo"
      :filter-data="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleTyreKindInfo"
      :default-data="
        shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleTyreKindInfo[0]
      "
      label="Шины"
      class="full"
    >
      <base-is-missing
        v-model="props.item.differentTires"
        v-model:data="props.item.vehicleTyreKindLocation"
        default-data=""
        label="Разные шины"
        class="full"
        invert
      >
        <base-autocomplete
          v-model="props.item.vehicleTyreKindLocation"
          label="Расположение*"
          :items="NSI_107"
          class="full"
        ></base-autocomplete>
      </base-is-missing>

      <base-textfield
        v-model="props.item.vehicleTyreKindSize"
        label="Обозначение размера*"
        :rules="[conformityRules.vehicleTyreKindSize]"
        class="span6"
      ></base-textfield>

      <base-textfield
        v-model="props.item.vehicleTyreKindStaticRadius.value"
        label="Статический радиус"
        class="span4"
      ></base-textfield>

      <base-autocomplete
        v-model="props.item.vehicleTyreKindStaticRadius.measurementUnitCode"
        label="Ед.измерения*"
        item-value="key"
        class="span2"
        :items="NSI_033"
      ></base-autocomplete>

      <base-textfield
        v-model="props.item.vehicleTyreKindCode"
        label="Код вида шины транспортного средства"
        class="span6"
      ></base-textfield>

      <base-autocomplete
        v-model="props.item.vehicleTyreKindCategorySpeed"
        label="Классификатор скоростных категорий*"
        :items="NSI_039"
        :rules="[conformityRules.vehicleTyreKindCategorySpeed]"
        class="span6"
        multiple
        chips
      ></base-autocomplete>

      <p class="title full">Индекс несущей способности для максимально допустимой нагрузки</p>
      <p class="title full">Для односкатных шин</p>

      <base-textfield
        v-model="props.item.vehicleTyreKindMinIndexSingleTire"
        label="Минимально*"
        :rules="[conformityRules.vehicleTyreKindMinIndexSingleTire]"
        class="span6"
      ></base-textfield>

      <base-textfield
        v-model="props.item.vehicleTyreKindMaxIndexSingleTire"
        label="Максимально"
        class="span6"
      ></base-textfield>

      <base-is-missing
        v-model="props.item.gableTireIndicator"
        v-model:data="props.item.vehicleTyreKindMinIndexGableTire"
        label="Двускатные шины"
        class="full"
        invert
        @change="onChange(props.index)"
      >
        <p class="title full" style="margin-top: -40px">Для двухскатных шин</p>

        <base-textfield
          v-model="props.item.vehicleTyreKindMinIndexGableTire"
          label="Минимально*"
          :rules="[conformityRules.vehicleTyreKindMinIndexGableTire]"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="props.item.vehicleTyreKindMaxIndexGableTire"
          label="Максимально"
          class="span6"
        ></base-textfield>
      </base-is-missing>

      <base-checkbox
        v-model="props.item.isSupplementVehicleTyre"
        label="Запасная шина для временного пользования"
        class="full"
      ></base-checkbox>
    </base-constructor>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'

const shema = useShemaStore().shema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
const NSI_033 = ref([])
const NSI_039 = ref([])
const NSI_107 = ref([])

function onChange(index) {
  // функция нужна потому что меняем данные в двух местах на одном уровне вложености
  shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleTyreKindInfo[
    index
  ].vehicleTyreKindMaxIndexGableTire = ''
}

async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
  NSI_039.value = (await indexDB.getFromDatabase('catalog', 'NSI_039')) || []
  NSI_107.value = (await indexDB.getFromDatabase('catalog', 'NSI_107')) || []
}
load()
</script>
