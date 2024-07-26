<template>
  <v-form ref="form" :disabled="isLook" class="adaptiveGrid mt-5">
    <base-autocomplete
      v-model="shema.vehicleTypeDetails.vehicleLayoutPatternText"
      :items="NSI_050"
      label="Схема компоновки СМ*"
      max-length="250"
      chips
      multiple
      class="span6"
    ></base-autocomplete>

    <base-autocomplete
      v-if="!shema.vehicleTypeDetails.machineTechCategoryCode.join('').match(/O|R/)"
      v-model="shema.vehicleVariantDetails.vehicleComponentLocationText"
      :items="NSI_047"
      label="Расположение двигателя*"
      max-length="1000"
      chips
      multiple
      class="span6"
      :rules="[
        (v) => (!!v && !!v.length) || `Поле 'Расположение двигателя' обязательно к заполнению`
      ]"
    ></base-autocomplete>

    <base-constructor-one-element
      v-slot="props"
      v-model="
        shema.vehicleVariantDetails.vehicleBodyworkDetails[0].vehicleCarriageSpaceImplementationText
      "
      class="full"
      :default-data="['']"
      :disabled="isLook"
    >
      <base-textarea
        v-model="
          shema.vehicleVariantDetails.vehicleBodyworkDetails[0]
            .vehicleCarriageSpaceImplementationText[props.index]
        "
        label="Исполнение загрузочного пространства"
      >
      </base-textarea>
    </base-constructor-one-element>

    <base-textarea
      v-model="shema.vehicleVariantDetails.vehicleBodyworkDetails[0].vehicleComponentText"
      label="Конструктивные особенности (тип) кузова (кабины, шасси)"
      class="span6"
    >
    </base-textarea>

    <base-textfield
      v-model="shema.vehicleVariantDetails.vehicleBodyworkDetails[0].vehiclePassengerQuantity"
      label="Пассажировместимость СМ"
      type="number"
      class="span6"
    >
    </base-textfield>

    <base-autocomplete
      v-model="shema.vehicleTypeDetails.propulsionKindCode"
      label="Наименование типа движителя"
      :items="NSI_031"
      item-value="key"
      class="full"
    ></base-autocomplete>

    <base-constructor
      v-slot="props"
      v-model="shema.vehicleVariantDetails.vehicleMaxSpeedMeasure"
      :filter-data="shema.vehicleVariantDetails.vehicleMaxSpeedMeasure"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleMaxSpeedMeasure"
      class="full mb-5"
      label="Измеренная максимальная скорость СМ"
      :disabled="isLook"
    >
      <base-textfield
        v-model="props.item"
        label="Пассажировместимость СМ"
        type="number"
        class="span6"
      >
      </base-textfield>

      <base-autocomplete
        v-model="props.item.measurementUnitCode"
        label="Ед. измерения"
        :items="NSI_033"
        item-text="key"
        item-value="key"
        class="span6"
      ></base-autocomplete>
    </base-constructor>

    <base-textfield
      v-model="shema.vehicleVariantDetails.vehicleVoltageMeasure.value"
      label="Номинальное напряжение СМ"
      type="number"
      class="span6"
    >
    </base-textfield>

    <base-autocomplete
      v-model="shema.vehicleVariantDetails.vehicleVoltageMeasure.measurementUnitCode"
      label="Ед. измерения"
      :items="NSI_033"
      item-value="key"
      class="span6"
    ></base-autocomplete>

    <base-checkbox
      v-model="shema.vehicleTypeDetails.reversibleControlIndicator"
      label="Признак наличия реверсивного управления"
      class="full"
    >
    </base-checkbox>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'
import shemaDefault from '@/components/forms/poweredMachinesCertificates/shemaDefault'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const NSI_031 = ref([])
const NSI_033 = ref([])
const NSI_047 = ref([])
const NSI_050 = ref([])

async function load() {
  NSI_031.value = (await indexDB.getFromDatabase('catalog', 'NSI_031')) || []
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
  NSI_047.value = (await indexDB.getFromDatabase('catalog', 'NSI_047')) || []
  NSI_050.value = (await indexDB.getFromDatabase('catalog', 'NSI_050')) || []
}
load()
</script>
