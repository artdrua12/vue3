<template>
  <div>
    <base-constructor
      v-slot="props"
      v-model:data="shema.vehicleTypeDetails.vehicleLabelingDetails"
      :filter-data="shema.vehicleTypeDetails.vehicleLabelingDetails"
      :default-data="defaultDataConstructor"
      class="mt-5"
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
          v-model:data="
            shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
              .vehicleComponentLocationText
          "
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
        v-model:data="
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
        v-model:data="
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
          label="Место расположения идентификационного номера  двигателя"
        ></base-textarea>
      </base-constructor-one-element>

      <p class="title full">
        Структура и содержание идентификационного номера транспортного средства
      </p>

      <base-constructor
        v-slot="props5"
        v-model:data="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails
        "
        :filter-data="
          shema.vehicleTypeDetails.vehicleLabelingDetails[props.index].vehicleIdCharacterDetails
        "
        :default-data="defaultDataConstructor5"
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
          class="full"
        ></base-autocomplete>
      </base-constructor>
    </base-constructor>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing2.vue'

const defaultDataConstructor = {
  vehicleIdentificationNumberId: {
    number1: '?',
    number2: '?',
    number3: '?',
    number4: '?',
    number5: '?',
    number6: '?',
    number7: '?',
    number8: '?',
    number9: '?',
    number10: '?',
    number11: '?',
    number12: '?',
    number13: '?',
    number14: '?',
    number15: '?',
    number16: '?',
    number17: '?'
  },
  uniformSignLocationText: '',
  engineIdentificationNumberLocationText: [''],
  vehicleComponentLocationText: [''],
  vehicleIdCharacterDetails: [
    {
      idCharacterQuantity: 0,
      idCharacterStartingOrdinal: 0,
      idCharacterText: '',
      idCharacterValueDetails: [
        {
          idCharacterValueCode: '',
          idCharacterValueText: ''
        }
      ],
      idCharacterValueText: '',
      typeDate: ''
    }
  ],
  vehicleIdentificationNumberLocationText: [''],
  notManufacturerPlateIndicator: false
}
const defaultDataConstructor5 = [
  {
    idCharacterQuantity: 0,
    idCharacterStartingOrdinal: 0,
    idCharacterText: '',
    idCharacterValueDetails: [
      {
        idCharacterValueCode: '',
        idCharacterValueText: ''
      }
    ],
    idCharacterValueText: '',
    typeDate: ''
  }
]
</script>

<style></style>
