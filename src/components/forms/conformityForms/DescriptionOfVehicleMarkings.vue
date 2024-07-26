<template>
  <v-form ref="form" :disabled="isLook" class="pa-7">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleTypeDetails.vehicleLabelingDetails"
      :filter-data="shema.vehicleTypeDetails.vehicleLabelingDetails"
      :default-data="shemaDefault.vehicleTypeDetails.vehicleLabelingDetails[0]"
      label="Маркировка"
      :disabled="isLook"
    >
      <base-textarea
        v-model="props.item.uniformSignLocationText"
        label="Место расположения и форма единого знака обращения на рынке государств-членов Таможенного союза*"
        class="full"
      ></base-textarea>

      <base-is-missing
        v-model="props.item.notManufacturerPlateIndicator"
        v-model:data="props.item.vehicleComponentLocationText"
        :default-data="['']"
        label="Признак отсутствия таблички изготовителя"
        class="full"
        :disabled="isLook"
      >
        <base-constructor-one-element
          v-slot="props2"
          v-model="props.item.vehicleComponentLocationText"
          class="full"
          :disabled="isLook"
        >
          <base-textarea
            v-model="props.item.vehicleComponentLocationText[props2.index]"
            label="Место расположения таблички изготовителя*"
            class="full"
          ></base-textarea>
        </base-constructor-one-element>
      </base-is-missing>

      <base-constructor-one-element
        v-slot="props3"
        v-model="props.item.vehicleIdentificationNumberLocationText"
        class="full"
        :disabled="isLook"
      >
        <base-textarea
          v-model="props.item.vehicleIdentificationNumberLocationText[props3.index]"
          label="Место расположения идентификационного номера*"
          :rules="[conformityRules.vehicleIdentificationNumberLocationText]"
        ></base-textarea>
      </base-constructor-one-element>

      <base-constructor-one-element
        v-slot="props4"
        v-model="props.item.engineIdentificationNumberLocationText"
        class="full"
        :disabled="isLook"
      >
        <base-textarea
          v-model="props.item.engineIdentificationNumberLocationText[props4.index]"
          label="Место расположения идентификационного номера двигателя"
        ></base-textarea>
      </base-constructor-one-element>

      <p class="title full">
        Структура и содержание идентификационного номера транспортного средства
      </p>
      <base-squares :items="props.item.vehicleIdentificationNumberId" class="full"></base-squares>

      <base-constructor
        v-slot="props5"
        v-model="props.item.vehicleIdCharacterDetails"
        :filter-data="props.item.vehicleIdCharacterDetails"
        :default-data="
          shemaDefault.vehicleTypeDetails.vehicleLabelingDetails[0].vehicleIdCharacterDetails[0]
        "
        class="full"
        label="Группа"
        :disabled="isLook"
      >
        <base-autocomplete
          v-model="props5.item.idCharacterStartingOrdinal"
          label="Номер символа"
          :items="fromAndBy"
          class="span6"
        ></base-autocomplete>

        <base-autocomplete
          v-model="props5.item.idCharacterQuantity"
          :items="fromAndBy"
          label="Количество символов*"
          :rules="[conformityRules.idCharacterQuantity]"
          class="span6"
        ></base-autocomplete>

        <base-autocomplete
          v-model="props5.item.typeDate"
          label="Тип данных*"
          :items="groupType"
          :rules="[conformityRules.typeDate]"
          class="full"
        ></base-autocomplete>

        <base-textarea
          v-model="props5.item.idCharacterText"
          label="Описание*"
          :rules="[conformityRules.idCharacterText]"
          class="full"
        ></base-textarea>

        <base-constructor
          v-slot="props6"
          v-model="props.item.vehicleIdCharacterDetails[props5.index].idCharacterValueDetails"
          :filter-data="props.item.vehicleIdCharacterDetails[props5.index].idCharacterValueDetails"
          :default-data="
            shemaDefault.vehicleTypeDetails.vehicleLabelingDetails[0].vehicleIdCharacterDetails[0]
              .idCharacterValueDetails[0]
          "
          class="full"
          label="Значение"
          :disabled="isLook"
        >
          <base-textfield
            v-model="
              props.item.vehicleIdCharacterDetails[props5.index].idCharacterValueDetails[
                props6.index
              ].idCharacterValueCode
            "
            label="Значение"
            :items="groupType"
            class="full"
          ></base-textfield>

          <base-textarea
            v-model="
              props.item.vehicleIdCharacterDetails[props5.index].idCharacterValueDetails[
                props6.index
              ].idCharacterValueText
            "
            label="Расшифровка значения"
            class="full"
          ></base-textarea>
        </base-constructor>
      </base-constructor>
    </base-constructor>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseSquares from '@/components/base/BaseSquares.vue'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema // схема
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const fromAndBy = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
  { value: 13 },
  { value: 14 },
  { value: 15 },
  { value: 16 },
  { value: 17 }
]
const groupType = [' Год выпуска по ТР ТС 018/2011', 'Настраиваемое значение', ' Список']

// для того что бы метод был доступен у родителя
defineExpose({
  async isValidation() {
    const { valid } = await form.value.validate()
    return valid
  }
})
</script>
