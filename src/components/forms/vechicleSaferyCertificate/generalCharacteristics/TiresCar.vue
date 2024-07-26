<template>
  <v-form ref="form" :disabled="isLook" class="mt-5">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleTyreKindInfo"
      :filter-data="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleTyreKindInfo"
      :default-data="
        shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails.vehicleTyreKindInfo[0]
      "
      label="Шины"
      class="full"
      :disabled="isLook"
    >
      <base-textfield
        v-model="props.item.vehicleTyreKindSize"
        label="Обозначение размера*"
        :rules="[rules.vehicleTyreKindSize]"
        class="span6"
      ></base-textfield>

      <base-textfield
        v-model="props.item.vehicleTyreKindName"
        label="Марка"
        class="span6"
      ></base-textfield>

      <base-autocomplete
        v-model="props.item.vehicleTyreKindCategorySpeed"
        label="Скоростная категория"
        :items="NSI_039"
        item-text="title"
        chips
        multiple
        class="full"
      ></base-autocomplete>

      <base-is-missing
        v-model="props.item.differentTiresIndicator"
        v-model:data="props.item.vehicleTyreKindLocation"
        default-data=""
        label="Разные шины"
        class="full"
        invert
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props.item.vehicleTyreKindLocation"
          label="Расположение*"
          :items="NSI_107"
          class="full"
        ></base-autocomplete>
      </base-is-missing>

      <p class="title full">Индекс несущей способности для односкатных шин</p>

      <base-textfield
        v-model="props.item.vehicleTyreKindMinIndexSingleTire"
        label="Минимальный*"
        :rules="[rules.vehicleTyreKindMinIndexSingleTire]"
        class="span6"
      ></base-textfield>

      <base-textfield
        v-model="props.item.vehicleTyreKindMaxIndexSingleTire"
        label="Максимальный"
        class="span6"
        :disabled="isLook"
      ></base-textfield>

      <base-is-missing
        v-model="props.item.gableTireIndicator"
        v-model:data="props.item.vehicleTyreKindMinIndexGableTire"
        label="Двускатные шины"
        class="full"
        invert
        :disabled="isLook"
        @change="onChange(props.index)"
      >
        <p class="title full" style="margin-top: -40px">Для двухскатных шин</p>

        <base-textfield
          v-model="props.item.vehicleTyreKindMinIndexGableTire"
          label="Минимальный*"
          :rules="[rules.vehicleTyreKindMinIndexGableTire]"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="props.item.vehicleTyreKindMaxIndexGableTire"
          label="Максимальный"
          class="span6"
          :disabled="isLook"
        ></base-textfield>
      </base-is-missing>

      <base-checkbox
        v-model="props.item.isSupplementVehicleTyre"
        label="Запасная шина для временного пользования"
        class="full"
        :disabled="isLook"
      ></base-checkbox>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
const NSI_039 = ref([])
const NSI_107 = ref([])
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

function onChange(index) {
  // функция нужна потому что меняем данные в двух местах на одном уровне вложености
  shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleTyreKindInfo[
    index
  ].vehicleTyreKindMaxIndexGableTire = ''
}

async function load() {
  NSI_039.value = (await indexDB.getFromDatabase('catalog', 'NSI_039')) || []
  NSI_107.value = (await indexDB.getFromDatabase('catalog', 'NSI_107')) || []
}
load()
</script>
