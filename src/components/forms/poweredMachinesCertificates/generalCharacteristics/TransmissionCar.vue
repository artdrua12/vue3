<template>
  <v-form ref="form" :disabled="isLook">
    <base-is-missing
      v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.notTransmissionUnit"
      v-model:data="shema.vehicleVariantDetails.vehicleRunningGearDetails"
      :default-data="shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails"
      label="Трансмиссия - отсутствует"
      :disabled="isLook"
    >
      <base-autocomplete
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.vehicleTransmissionText"
        label="Тип трансмиссии*"
        :items="NSI_058"
        max-length="1000"
        multiple
        chips
        :rules="[rules.vehicleTransmissionText]"
        class="full"
      ></base-autocomplete>

      <base-combobox
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.machineTransmissionText"
        label="Схемы трансмиссии самоходной машины"
        class="full"
      ></base-combobox>

      <base-constructor
        v-model="shema.vehicleVariantDetails.vehicleRunningGearDetails.transmissionUnitDetails"
        :filter-data="shema.vehicleVariantDetails.vehicleRunningGearDetails.transmissionUnitDetails"
        :default-data="
          shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails.transmissionUnitDetails[0]
        "
        class="full"
        :disabled="isLook"
      >
        <template #label="props">
          {{
            !props.item.vehicleUnitKindCode ||
            (!NSI_018.find((e) => e.key === props.item.vehicleUnitKindCode) &&
              !NSI_018.find((e) => e.title === props.item.vehicleUnitKindCode))
              ? 'Узел трансмиссии'
              : props.item.vehicleUnitKindCode.length === 2
                ? NSI_018.find((e) => e.key === props.item.vehicleUnitKindCode).value
                : props.item.vehicleUnitKindCode
          }}
        </template>
        <template #default="props">
          <base-autocomplete
            v-if="
              (props.item.vehicleUnitKindCode && props.item.vehicleUnitKindCode.length === 2) ||
              shema.conformityDocStatus === 'Черновик' ||
              !shema.conformityDocStatus
            "
            v-model="props.item.vehicleUnitKindCode"
            label="Код узла*"
            :items="NSI_018"
            item-value="key"
            class="full"
            :rules="[rules.vehicleUnitKindCode]"
          ></base-autocomplete>

          <base-autocomplete
            v-else
            v-model="props.item.vehicleUnitKindCode"
            label="Код узла*"
            :items="NSI_018"
            item-value="title"
            class="full"
          ></base-autocomplete>

          <template v-if="!!props.item.vehicleUnitKindCode.indexOf('20')">
            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('05')"
              v-model="props.item.vehicleComponentText"
              label="Тип коробки передач*"
              :items="NSI_053"
              :rules="[rules.transmissionTypeVehicleComponentText]"
              class="full"
            ></base-autocomplete>

            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('15')"
              v-model="props.item.vehicleComponentText"
              label="Описание конструктивных особенностей (типа) главной передачи*"
              :items="NSI_051"
              :rules="[rules.mainGearType]"
              class="span6"
            ></base-autocomplete>

            <base-textfield
              v-model="props.item.vehicleComponentMakeName"
              label="Марка"
              class="span6"
            ></base-textfield>

            <base-combobox
              v-model="props.item.vehicleComponentModelCode"
              label="Маркировка"
              class="span6"
            ></base-combobox>

            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('15')"
              v-model="props.item.axisDistribution"
              label="Распределение по осям"
              :items="NSI_026"
              class="span6"
            ></base-autocomplete>

            <base-textfield
              v-model="props.item.transmissionUnitGearQuantity"
              type="number"
              label="Количество передач*"
              class="span6"
            ></base-textfield>
          </template>

          <base-textfield
            v-if="!props.item.vehicleUnitKindCode.indexOf('20')"
            v-model="props.item.vehicleComponentText"
            label="Описание конструктивных особенностей (типа) вала отбора мощности*"
            :rules="[(v) => !!v || 'Обязательно для заполнения']"
            class="span6"
          ></base-textfield>

          <base-textfield
            v-if="!props.item.vehicleUnitKindCode.indexOf('20')"
            v-model="props.item.vehicleComponentLocationText"
            label="Место расположения вала отбора мощности*"
            :rules="[(v) => !!v || 'Обязательно для заполнения']"
            class="span6"
          ></base-textfield>

          <base-constructor
            v-if="
              [
                '05 - коробка передач',
                '10 - раздаточная коробка',
                '15 - главная передача',
                '99 - редуктор',
                '05',
                '10',
                '15',
                '99'
              ].includes(props.item.vehicleUnitKindCode)
            "
            v-slot="props2"
            v-model="props.item.transmissionUnitGearDetails"
            :filter-data="props.item.transmissionUnitGearDetails"
            :default-data="
              shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails
                .transmissionUnitDetails[0].transmissionUnitGearDetails
            "
            label="Передаточные числа"
            class="full"
            :disabled="isLook"
          >
            <base-autocomplete
              v-model="props2.item.transmissionUnitGearName"
              label="Наименование передачи"
              max-length="120"
              :items="NSI_307"
              class="span6"
            ></base-autocomplete>
            <base-autocomplete
              v-model="props2.item.transmissionUnitGearType"
              label="Вид передаточного числа"
              max-length="20"
              :items="NSI_081"
              class="span6"
            ></base-autocomplete>

            <base-textfield
              v-model="props2.item.transmissionUnitGearRate"
              type="number"
              label="Передаточное число*"
              class="span6"
            ></base-textfield>

            <base-textfield
              v-model="props2.item.transmissionUnitGearRateMax"
              label="Максимальное передаточное число"
              type="number"
              class="span6"
            ></base-textfield>

            <base-checkbox
              v-model="props2.item.transmissionUnitReverseGearIndicator"
              label="Признак передачи заднего хода"
              class="full"
            ></base-checkbox>
          </base-constructor>

          <base-constructor
            v-if="!props.item.vehicleUnitKindCode.indexOf('20')"
            v-slot="props3"
            v-model="props.item.vehiclePowerTakeOffDetails"
            :filter-data="props.item.vehiclePowerTakeOffDetails"
            :default-data="
              shemaDefault.vehicleVariantDetails.vehicleRunningGearDetails
                .transmissionUnitDetails[0].vehiclePowerTakeOffDetails
            "
            title="Передаточное отношение"
            class="full"
            :disabled="isLook"
          >
            <base-textfield
              v-model="props3.vehicleShaftRotationFrequencyMeasure.value"
              label="Скорость вращения вала"
              type="number"
              class="span6"
            ></base-textfield>
            <base-autocomplete
              v-model="props3.item.vehicleShaftRotationFrequencyMeasure.measurementUnitCode"
              label="Ед. измерения"
              item-value="key"
              :items="measurementUnitCode"
              class="span6"
            ></base-autocomplete>
            <base-textfield
              v-model="props3.item.transmissionUnitGearRate"
              label="Передаточное отношение"
              class="full"
            ></base-textfield>
          </base-constructor>
        </template>
      </base-constructor>
    </base-is-missing>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRequestStore } from '@/stores/requestStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().getShema //схема
const requests = useRequestStore() // для работы с запросами

const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)
const NSI_018 = ref([])
const NSI_026 = ref([])
const NSI_051 = ref([])
const NSI_053 = ref([])
const NSI_058 = ref([])
const NSI_081 = ref([])
const NSI_307 = ref([])
const measurementUnitCode = ref([])

async function load() {
  NSI_018.value = (await indexDB.getFromDatabase('catalog', 'NSI_018')) || []
  NSI_026.value = (await indexDB.getFromDatabase('catalog', 'NSI_026')) || []
  NSI_051.value = (await indexDB.getFromDatabase('catalog', 'NSI_051')) || []
  NSI_053.value = (await indexDB.getFromDatabase('catalog', 'NSI_053')) || []
  NSI_058.value = (await indexDB.getFromDatabase('catalog', 'NSI_058')) || []
  NSI_081.value = (await indexDB.getFromDatabase('catalog', 'NSI_081')) || []
  NSI_307.value = (await indexDB.getFromDatabase('catalog', 'NSI_307')) || []
  measurementUnitCode.value = await requests.get('/api/classifier/epassport/units-and-counting')
}
load()
</script>
