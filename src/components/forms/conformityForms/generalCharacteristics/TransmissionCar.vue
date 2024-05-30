<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].notTransmissionUnit"
      v-model:data="shema.vehicleVariantDetails[0].vehicleRunningGearDetails"
      :default-data="defaultData"
      label="Трансмиссия - отсутствует"
    >
      <base-autocomplete
        v-model="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleTransmissionText
        "
        label="Тип трансмиссии*"
        :items="NSI_058"
        max-length="1000"
        multiple
        :rules="[conformityRules.vehicleTransmissionText]"
        class="full"
      ></base-autocomplete>

      <base-constructor
        v-model="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].transmissionUnitDetails
        "
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].transmissionUnitDetails
        "
        :default-data="defaultData[0].transmissionUnitDetails[0]"
        class="full"
      >
        <template #label="props">
          {{
            !props.item.vehicleUnitKindCode ||
            (!NSI_018.find((e) => e.key === props.item.vehicleUnitKindCode) &&
              !NSI_018.find((e) => e.title === props.item.vehicleUnitKindCode))
              ? 'Узел трансмиссии'
              : item.vehicleUnitKindCode.length === 2
                ? NSI_018.find((e) => e.key === props.item.vehicleUnitKindCode).title
                : props.item.vehicleUnitKindCode
          }}
        </template>
        <template #default="props">
          <base-autocomplete
            v-if="
              (props.item.vehicleUnitKindCode && props.item.vehicleUnitKindCode.length === 2) ||
              docStatus === 'Черновик' ||
              !docStatus
            "
            v-model="props.item.vehicleUnitKindCode"
            label="Узел*"
            :items="NSI_018"
            item-value="key"
            class="full"
          ></base-autocomplete>

          <base-autocomplete
            v-else
            v-model="props.item.vehicleUnitKindCode"
            label="Узел*"
            :items="NSI_018"
            item-value="title"
            class="full"
          ></base-autocomplete>

          <template v-if="!!props.item.vehicleUnitKindCode.indexOf('20')">
            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('05')"
              id="transmissionTypeVehicleComponentText"
              v-model="props.item.vehicleComponentText"
              label="Описание конструктивных особенностей (типа) коробки передач*"
              :items="transmissionTypeVehicleComponentText"
              :rules="[conformityRules.transmissionTypeVehicleComponentText]"
              class="full"
            ></base-autocomplete>

            <base-textfield
              v-if="!props.item.vehicleUnitKindCode.indexOf('10')"
              id="transferCaseType"
              v-model="props.item.vehicleComponentText"
              label="Описание конструктивных особенностей (типа) раздаточной коробки*"
              :rules="[conformityRules.transferCaseType]"
              class="full"
            ></base-textfield>

            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('15')"
              v-model="props.item.vehicleComponentText"
              label="Описание конструктивных особенностей (типа) главной передачи*"
              :items="NSI_051"
              :rules="[conformityRules.mainGearType]"
              class="span6"
            ></base-autocomplete>

            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('15')"
              v-model="props.item.axisDistribution"
              label="Распределение по осям"
              :items="NSI_026"
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

            <base-textfield
              id="transmissionUnitGearForwardQuantity"
              v-model="props.item.transmissionUnitGearQuantity"
              type="number"
              label="Количество передач*"
              class="span6"
            ></base-textfield>
          </template>
        </template>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'

const indexDB = useIndexDBStore() // для работы с IndexDB

const docStatus = computed(() => shema.conformityDocStatusDetails.docStatus)
const NSI_018 = ref([])
const NSI_026 = ref([])
const NSI_051 = ref([])
const NSI_058 = ref([])

const defaultData = [
  {
    vehicleWheelQuantity: [0],
    notVehicleClutch: false,
    notTransmissionUnit: false,
    poweredWheel: [],
    poweredWheelQuantity: 0,
    transmissionUnitDetails: [
      {
        vehicleUnitKindCode: '',
        axisDistribution: '',
        vehicleComponentText: '',
        vehicleComponentLocationText: '',
        vehicleComponentMakeName: '',
        vehicleComponentModelCode: [],
        transmissionUnitGearQuantity: '',
        transmissionUnitGearDetails: [
          {
            transmissionUnitGearType: '',
            transmissionUnitGearName: '',
            transmissionUnitGearRate: '',
            transmissionUnitGearRateMax: '',
            transmissionUnitReverseGearIndicator: false
          }
        ],
        vehiclePowerTakeOffDetails: [
          {
            vehicleShaftRotationFrequencyMeasure: {
              value: 0.0,
              measurementUnitCode: 'RPM'
            },
            transmissionUnitGearRate: 0.0
          }
        ]
      }
    ],
    vehicleAxleQuantity: 0,
    vehicleAxleDetails: [
      {
        vehicleWheelQuantity: 0,
        brakingAxleIndicator: false,
        drivingAxleIndicator: false,
        dualTireAxleIndicator: false,
        steeringAxleIndicator: false,
        vehicleAxleOrdinal: 0,
        vehicleAxleSweptPathMeasure: {
          measurementUnitCode: 'MMT',
          value: 0,
          maxValue: 0,
          rangeIndicator: false
        },
        vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure: {
          measurementUnitCode: 'KGM',
          value: 0,
          rangeIndicator: false
        },
        vehicleTyre: {
          vehicleTyreKindSize: ''
        },
        vehicleTyreKindCode: ''
      }
    ],
    vehicleClutchDetails: [
      {
        vehicleClutchType: '',
        vehicleComponentMakeName: '',
        vehicleComponentText: ''
      }
    ],
    vehicleFrameText: [],
    notSteeringWheel: false,
    vehicleSteeringDetails: [
      {
        modelCode: '',
        steeringWheelPositionCode: '',
        vehicleComponentLocationText: '',
        vehicleComponentMakeName: '',
        vehicleComponentText: '',
        wheelType: ''
      }
    ],
    vehicleSuspensionDetails: [
      {
        vehicleComponentText: '',
        vehicleSuspensionKindCode: '',
        vehicleSuspensionView: ''
      }
    ],
    vehicleTransmissionText: [],
    vehicleTyreKindInfo: [
      {
        gableTireIndicator: false,
        isSupplementVehicleTyre: false,
        vehicleTyreKindCategorySpeed: [],
        vehicleTyreKindCode: '',
        vehicleTyreKindLocation: '',
        vehicleTyreKindMaxIndexGableTire: '',
        vehicleTyreKindMaxIndexSingleTire: '',
        vehicleTyreKindMinIndexGableTire: '',
        vehicleTyreKindMinIndexSingleTire: '',
        vehicleTyreKindSize: '',
        vehicleTyreKindStaticRadius: {
          measurementUnitCode: 'MTR',
          value: 0
        },
        differentTires: false
      }
    ],
    vehicleWheelFormula: [],
    vehicleWheelLocation: '',
    vehicleWheelbaseMeasure: [
      {
        measurementUnitCode: 'MMT',
        rangeIndicator: false,
        valueMax: 0,
        valueMin: 0,
        semitrailerIndicator: false
      }
    ]
  }
]

async function load() {
  NSI_018.value = await indexDB.getFromDatabase('catalog', 'NSI_018')
  NSI_026.value = await indexDB.getFromDatabase('catalog', 'NSI_026')
  NSI_051.value = await indexDB.getFromDatabase('catalog', 'NSI_051')
  NSI_058.value = await indexDB.getFromDatabase('catalog', 'NSI_058')
}
load()
</script>
