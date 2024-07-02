<template>
  <v-form ref="form" class="pa-7">
    <base-constructor
      v-slot="props"
      v-model="shema.vehicleTypeDetails.vehicleLabelingDetails"
      :filter-data="shema.vehicleTypeDetails.vehicleLabelingDetails"
      :default-data="shemaDefault.vehicleTypeDetails.vehicleLabelingDetails[0]"
      label="Маркировка"
    >
      <base-textarea
        v-model="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].uniformSignLocationText
        "
        label="Место расположения и форма единого знака обращения на рынке государств-членов Таможенного союза*"
        class="full"
      ></base-textarea>

      <base-is-missing
        v-model="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].notManufacturerPlateIndicator
        "
        v-model:data="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleComponentLocationText
        "
        :default-data="['']"
        label="Признак отсутствия таблички изготовителя"
        class="full"
      >
        <base-constructor-one-element
          v-slot="props2"
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
              .vehicleComponentLocationText
          "
          class="full"
        >
          <base-textarea
            v-model="
              shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
                .vehicleComponentLocationText[props2.index]
            "
            label="Место расположения таблички изготовителя*"
            class="full"
          ></base-textarea>
        </base-constructor-one-element>
      </base-is-missing>

      <base-constructor-one-element
        v-slot="props3"
        v-model="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
            .vehicleIdentificationNumberLocationText
        "
        class="full"
      >
        <base-textarea
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
              .vehicleIdentificationNumberLocationText[props3.index]
          "
          label="Место расположения идентификационного номера*"
          :rules="[conformityRules.vehicleIdentificationNumberLocationText]"
        ></base-textarea>
      </base-constructor-one-element>

      <base-constructor-one-element
        v-slot="props4"
        v-model="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
            .engineIdentificationNumberLocationText
        "
        class="full"
      >
        <base-textarea
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
              .engineIdentificationNumberLocationText[props4.index]
          "
          label="Место расположения идентификационного номера двигателя"
        ></base-textarea>
      </base-constructor-one-element>

      <p class="title full">
        Структура и содержание идентификационного номера транспортного средства
      </p>
      <base-squares
        :items="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdentificationNumberId
        "
        class="full"
      ></base-squares>

      <base-constructor
        v-slot="props5"
        v-model="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails
        "
        :filter-data="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails
        "
        :default-data="
          shemaDefault.vehicleTypeDetails.vehicleLabelingDetails[0].vehicleIdCharacterDetails[0]
        "
        class="full"
        label="Группа"
      >
        <base-autocomplete
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails[
              props5.index
            ].idCharacterStartingOrdinal
          "
          label="Номер символа"
          :items="fromAndBy"
          class="span6"
        ></base-autocomplete>

        <base-autocomplete
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails[
              props5.index
            ].idCharacterQuantity
          "
          :items="fromAndBy"
          label="Количество символов*"
          :rules="[conformityRules.idCharacterQuantity]"
          class="span6"
        ></base-autocomplete>

        <base-autocomplete
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails[
              props5.index
            ].typeDate
          "
          label="Тип данных*"
          :items="groupType"
          :rules="[conformityRules.typeDate]"
          class="full"
        ></base-autocomplete>

        <base-textarea
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails[
              props5.index
            ].idCharacterText
          "
          label="Описание*"
          :rules="[conformityRules.idCharacterText]"
          class="full"
        ></base-textarea>

        <base-constructor
          v-slot="props6"
          v-model="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails[
              props5.index
            ].idCharacterValueDetails
          "
          :filter-data="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails[
              props5.index
            ].idCharacterValueDetails
          "
          :default-data="
            shemaDefault.vehicleTypeDetails.vehicleLabelingDetails[0].vehicleIdCharacterDetails[0]
              .idCharacterValueDetails[0]
          "
          class="full"
          label="Значение"
        >
          <base-textfield
            v-model="
              shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
                .vehicleIdCharacterDetails[props5.index].idCharacterValueDetails[props6.index]
                .idCharacterValueCode
            "
            label="Значение"
            :items="groupType"
            class="full"
          ></base-textfield>

          <base-textarea
            v-model="
              shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
                .vehicleIdCharacterDetails[props5.index].idCharacterValueDetails[props6.index]
                .idCharacterValueText
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
import { ref } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
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
const shema = useShemaStore().shema // схема
const form = ref(null) // ссылка на форму

const fromAndBy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const groupType = [' Год выпуска по ТР ТС 018/2011', 'Настраиваемое значение', ' Список']

// для того что бы метод был доступен у родителя
defineExpose({
  async isValidation() {
    const { valid } = await form.value.validate()
    return valid
  }
})
</script>
