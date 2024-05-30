<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notEngine"
      v-model:data="shema.vehicleVariantDetails[0]"
      :default-data="defaultData"
      label="Двигатель - отсутствует"
    >
      <base-is-missing
        v-model="shema.vehicleTypeDetails.vehicleHybrid"
        v-model:data="shema.vehicleVariantDetails[0].vehicleElectricalMachineDetails[0]"
        label="Наличие гибридного транспортного средства"
        :default-data="defaultData2"
        class="full"
        invert
      >
        <base-combobox
          v-model="shema.vehicleTypeDetails.vehicleHybridDesignText"
          label="Описание гибридного транспортного средства"
          max-length="1000"
          class="full"
        ></base-combobox>

        <ElectroEngine class="full mb-5" />
      </base-is-missing>

      <base-textfield
        v-model="shema.vehicleVariantDetails[0].engineQuantity"
        label="Количество двигателей внутреннего сгорания"
        type="number"
        class="span6"
      ></base-textfield>

      <base-autocomplete
        v-model="shema.vehicleVariantDetails[0].engineType"
        label="Вид двигателя*"
        :items="NSI_118"
        class="span6"
        @update:model="shema.vehicleVariantDetails[0].engineTypeDependence"
      ></base-autocomplete>

      <base-constructor
        v-if="shema.vehicleVariantDetails[0].engineType === 'Двигатель внутреннего сгорания'"
        v-slot="props"
        v-model="shema.vehicleVariantDetails[0].engineDetails"
        :filter-data="shema.vehicleVariantDetails[0].engineDetails"
        :default-data="defaultData3"
        class="full"
        label="Базовое ТС"
      >
        <base-textfield
          v-model="props.item.vehicleComponentMakeName"
          label="Марка двигателя*"
          :rules="[conformityRules.vehicleEngineMakeName]"
          max-length="120"
          class="full"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.vehicleComponentText"
          label="Тип(описание) двигателя внутреннего сгорания*"
          :items="NSI_301"
          :rules="[conformityRules.vehicleComponentModelCode]"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.engineCylinderQuantity"
          label="Количество цилиндров*"
          :rules="[conformityRules.engineCylinderQuantity]"
          type="number"
          class="span6"
        ></base-textfield>

        <base-textfield
          id="engineCompressionRate"
          v-model="props.item.engineCompressionRate"
          label="Степень сжатия*"
          :rules="[conformityRules.engineCompressionRate]"
          type="number"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="props.item.engineCapacityMeasure.value"
          label="Рабочий объём цилиндров*, см³"
          :rules="[conformityRules.engineCapacityMeasure]"
          type="number"
          max-length="24"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.engineCapacityMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <base-autocomplete
          v-model="props.item.engineCylinderArrangementText"
          label="Расположение цилиндров"
          :items="NSI_308"
          :rules="[conformityRules.engineCylinderArrangementText]"
          class="full"
        ></base-autocomplete>

        <base-textfield
          v-model="props.item.engineMaxPowerDetails.engineMaxPowerMeasure.value"
          label="Максимальная мощность двигателя*"
          :rules="[conformityRules.engineMaxPowerMeasure]"
          type="number"
          max-length="24"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.engineMaxPowerDetails.engineMaxPowerMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <p class="title full">
          Скорость вращения коленчатого вала, при которой достигается максимальная мощность
          двигателя
        </p>

        <base-textfield
          v-model="
            props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency
              .vehicleShaftRotationFrequencyMinMeasure.value
          "
          label="Минимальная скорость*"
          type="number"
          :rules="[conformityRules.vehicleShaftRotationFrequencyMinMeasure]"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="
            props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency
              .vehicleShaftRotationFrequencyMinMeasure.measurementUnitCode
          "
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span2"
        ></base-autocomplete>

        <base-is-missing-disabled
          v-model="props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency.rangeIndicator"
          v-model:data="
            props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency
              .vehicleShaftRotationFrequencyMaxMeasure.value
          "
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="
              props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency
                .vehicleShaftRotationFrequencyMaxMeasure.value
            "
            label="Максимально"
            type="number"
            :disabled="
              !props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency.rangeIndicator
            "
            max-length="24"
            :rules="[
              conformityRules.minMax(
                props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency
                  .vehicleShaftRotationFrequencyMinMeasure.value,
                props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency
                  .vehicleShaftRotationFrequencyMaxMeasure.value,
                props.item.engineMaxPowerDetails.vehicleShaftRotationFrequency.rangeIndicator
              )
            ]"
          ></base-textfield>
        </base-is-missing-disabled>

        <base-textfield
          v-model="props.item.engineMaxTorqueDetails.engineMaxTorqueMeasure.value"
          label="Максимальный крутящий момент двигателя*"
          type="number"
          :validators="[conformityRules.engineMaxTorqueMeasure]"
          class="span6"
        ></base-textfield>

        <base-autocomplete
          v-model="props.item.engineMaxTorqueDetails.engineMaxTorqueMeasure.measurementUnitCode"
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span6"
        ></base-autocomplete>

        <p class="title full">
          Скорость вращения коленчатого вала, при которой достигается максимальный крутящий момент
          двигателя
        </p>

        <base-textfield
          v-model="
            props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency
              .vehicleShaftRotationFrequencyMinMeasure.value
          "
          label="Минимальная скорость*"
          :rules="[conformityRules.vehicleShaftRotationFrequencyMinMeasure]"
          type="number"
          class="span4"
        ></base-textfield>

        <base-autocomplete
          v-model="
            props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency
              .vehicleShaftRotationFrequencyMinMeasure.measurementUnitCode
          "
          label="Ед. измерения"
          :items="NSI_033"
          item-value="key"
          class="span2"
        ></base-autocomplete>

        <base-is-missing-disabled
          v-model="props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency.rangeIndicator"
          v-model:data="
            props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency
              .vehicleShaftRotationFrequencyMaxMeasure.value
          "
          default-data="0"
          label="Признак интервала значений"
          class="span6"
        >
          <base-textfield
            v-model="
              props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency
                .vehicleShaftRotationFrequencyMaxMeasure.value
            "
            label="Максимальная скорость"
            type="number"
            :disabled="
              !props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency.rangeIndicator
            "
            max-length="24"
            :rules="[
              conformityRules.minMax(
                props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency
                  .vehicleShaftRotationFrequencyMinMeasure.value,
                props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency
                  .vehicleShaftRotationFrequencyMaxMeasure.value,
                props.item.engineMaxTorqueDetails.vehicleShaftRotationFrequency.rangeIndicator
              )
            ]"
          ></base-textfield>
        </base-is-missing-disabled>
      </base-constructor>

      <ElectroEngine
        v-else-if="shema.vehicleVariantDetails[0].engineType === 'Электрический двигатель'"
      />
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import ElectroEngine from '@/components/forms/conformityForms/generalCharacteristics/ElectroEngine.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_033 = ref([])
const NSI_118 = ref([])
const NSI_301 = ref([])
const NSI_308 = ref([])

const defaultData = {
  ecuModelCode: '',
  vehicleChassisDesignCode: [],
  notVehicleBrakingSystem: false,
  notPowerStorageDevice: false,
  notVehicleIgnition: false,
  notFuelFeed: false,
  notFuelKind: false,
  notExhaust: false,
  notVehicleTypeId: false,
  notModificationVirtual: false,
  notCodOKPBY: false,
  notCodTNVED: false,
  notEngine: false,
  modificationVirtual: '',
  notBaseVehicleDetails: false,
  baseVehicleDetails: [
    {
      docCreationDate: '',
      docId: '',
      vehicleCommercialName: [],
      vehicleMakeCode: [],
      vehicleMakeName: '',
      notVehicleMakeNameIndicator: false,
      vehicleTypeId: '',
      notVehicleCommercialNameIndicator: false
    }
  ],
  codOKPBY: [],
  codTNVED: [],
  engineDetails: [
    {
      engineCapacityMeasure: {
        measurementUnitCode: 'CMQ',
        value: 0
      },
      engineCompressionRate: 0,
      engineCylinderArrangementText: '',
      engineCylinderQuantity: 0,
      engineMaxPowerDetails: {
        engineMaxPowerMeasure: {
          measurementUnitCode: 'KWT',
          measurementUnitCodeListId: '',
          value: 0
        },
        vehicleShaftRotationFrequency: {
          rangeIndicator: false,
          vehicleShaftRotationFrequencyMaxMeasure: {
            measurementUnitCode: 'RPM',
            value: 0
          },
          vehicleShaftRotationFrequencyMinMeasure: {
            measurementUnitCode: 'RPM',
            value: 0
          }
        }
      },
      engineMaxTorqueDetails: {
        engineMaxTorqueMeasure: {
          measurementUnitCode: 'NEW',
          value: 0
        },
        vehicleShaftRotationFrequency: {
          rangeIndicator: false,
          vehicleShaftRotationFrequencyMaxMeasure: {
            measurementUnitCode: 'RPM',
            value: 0
          },
          vehicleShaftRotationFrequencyMinMeasure: {
            measurementUnitCode: 'RPM',
            value: 0
          }
        }
      },
      vehicleComponentMakeName: '',
      vehicleComponentModelCode: '',
      vehicleComponentText: '',
      engineType: ''
    }
  ],
  engineQuantity: 0,
  engineType: '',
  exhaustDetails: [
    {
      vehicleComponentMakeName: '',
      vehicleComponentText: '',
      vehicleComponentElements: [
        {
          vehicleComponentName: '',
          stageDetails: [
            {
              vehicleComponentStageNumber: 'Ступень 1',
              vehicleComponentMakeName: '',
              vehicleComponentMarking: [],
              vehicleComponentType: ''
            }
          ]
        }
      ]
    }
  ],
  fuelFeedDetails: [
    {
      vehicleComponentText: '',
      vehicleComponentMakeName: '',
      vehicleComponentElements: [
        {
          vehicleComponentName: '',
          vehicleComponentMakeName: '',
          vehicleComponentText: '',
          vehicleComponentType: '',
          vehicleComponentMarking: [],
          stageDetails: [
            {
              vehicleComponentStageNumber: 'Ступень 1',
              vehicleComponentMakeName: '',
              vehicleComponentMarking: []
            }
          ]
        }
      ]
    }
  ],
  notVehicleTrailerIndicator: false,
  powerStorageDeviceDetails: [
    {
      capacity: {
        measurementUnitCode: 'AMH',
        value: 0
      },
      electrochemicalSteam: '',
      massValue: {
        measurementUnitCode: 'KGM',
        value: 0
      },
      powerStorageDeviceVoltageMeasure: {
        measurementUnitCode: 'VLT',
        value: 0
      },
      text: '',
      vehicleComponentText: '',
      elementsQuantity: 0,
      vehicleComponentLocationText: '',
      vehicleMakeName: '',
      vehicleRangeMeasure: {
        measurementUnitCode: 'KMT',
        value: 0
      }
    }
  ],
  vehicleBodyworkDetails: [
    {
      vehicleBodyworkAppointment: [''],
      vehicleBodyworkType: '',
      vehicleCarriageSpaceImplementationText: [''],
      vehicleComponentText: [''],
      vehicleDoorQuantity: 0,
      vehiclePassengerQuantity: 0,
      vehicleSeatDetails: [
        {
          seatQuantity: 0,
          vehicleSeatRawDetails: [
            {
              seatQuantity: 0,
              seatRawOrdinal: 0
            }
          ],
          vehicleSeatText: ''
        }
      ],
      vehicleTrunkVolumeMeasure: {
        measurementUnitCode: 'MTQ',
        value: 0
      }
    }
  ],
  vehicleBrakingSystemDetails: [
    {
      vehicleBrakingSystemCylindersType: '',
      vehicleBrakingSystemItemName: '',
      vehicleBrakingSystemKindCode: '',
      vehicleBrakingSystemLocationCylinders: '',
      vehicleBrakingSystemLocationСambers: '',
      vehicleBrakingSystemModelCode: [],
      vehicleBrakingSystemСambersType: '',
      vehicleComponentText: ''
    }
  ],
  vehicleComponentLocationText: [],
  vehicleEcoClassCode: [],
  vehicleElectricalMachineDetails: [
    {
      electricMotorPowerMeasure: {
        measurementUnitCode: 'KWT',
        value: 0
      },
      electricalMachineKindCode: '',
      electricalMachineKindView: '',
      electricalMachineType: '',
      electricalMachineVoltageMeasure: {
        measurementUnitCode: 'VLT',
        value: 0
      },
      vehicleComponentMakeName: '',
      vehicleComponentText: '',
      engineType: ''
    }
  ],
  vehicleFuelKindName: [
    {
      cetaneNumber: '',
      octaneNumber: '',
      vehicleFuelKindNameZ: [],
      vehicleFuelKindCode: []
    }
  ],
  vehicleHitchLoadMeasure: [
    {
      measurementUnitCode: 'DAN',
      rangeIndicator: false,
      valueMax: 0,
      valueMin: 0
    }
  ],
  vehicleIgnitionDetails: [
    {
      vehicleComponentMakeName: '',
      vehicleComponentText: '',
      vehicleComponentElements: [
        {
          vehicleComponentName: '',
          vehicleComponentMakeName: '',
          vehicleComponentType: '',
          vehicleComponentMarking: []
        }
      ]
    }
  ],
  vehicleMassMeasures: [
    {
      vehicleMassCode: '',
      massView: '',
      meaningMassMeasure: [
        {
          maxMassMeasure: 0,
          measurementUnitCode: 'KGM',
          minMassMeasure: 0,
          rangeIndicator: false,
          axisNumber: [0.0]
        }
      ]
    }
  ],
  vehicleMaxBrakedTrailerWeightMeasure: [
    {
      measurementUnitCode: 'KGM',
      rangeIndicator: false,
      valueMax: 0,
      valueMin: 0
    }
  ],
  vehicleMaxUnbrakedTrailerWeightMeasure: [
    {
      measurementUnitCode: 'KGM',
      rangeIndicator: false,
      valueMax: 0,
      valueMin: 0
    }
  ],
  vehicleOverallDimensionDetails: {
    containerParametersIndicator: false,
    heightMeasure: [
      {
        measurementUnitCode: 'MMT',
        rangeIndicator: false,
        valueMax: 0,
        valueMin: 0
      }
    ],
    lengthMeasure: [
      {
        measurementUnitCode: 'MMT',
        rangeIndicator: false,
        valueMax: 0,
        valueMin: 0
      }
    ],
    loadingHeightMeasure: [
      {
        measurementUnitCode: 'MMT',
        rangeIndicator: false,
        valueMax: 0,
        valueMin: 0
      }
    ],
    maxHeightMeasure: [
      {
        measurementUnitCode: 'MMT',
        rangeIndicator: false,
        valueMax: 0,
        valueMin: 0
      }
    ],
    widthMeasure: [
      {
        measurementUnitCode: 'MMT',
        rangeIndicator: false,
        valueMax: 0,
        valueMin: 0
      }
    ],
    workingPositionHeightMeasure: [
      {
        measurementUnitCode: 'MMT',
        rangeIndicator: false,
        valueMax: 0,
        valueMin: 0
      }
    ]
  },
  vehicleRunningGearDetails: [
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
  ],
  vehicleTypeVariantId: [],
  notClassCode: false,
  classCode: [],
  notVehicleEcoClassCodeIndicator: false,
  vehicleEmergencyCallDeviceIndicator: false
}
const defaultData2 = {
  electricMotorPowerMeasure: {
    measurementUnitCode: 'KWT',
    value: 0
  },
  electricalMachineKindCode: '',
  electricalMachineKindView: '',
  electricalMachineType: '',
  electricalMachineVoltageMeasure: {
    measurementUnitCode: 'VLT',
    value: 0
  },
  vehicleComponentMakeName: '',
  vehicleComponentText: '',
  engineType: ''
}
const defaultData3 = {
  engineCapacityMeasure: {
    measurementUnitCode: 'CMQ',
    value: 0
  },
  engineCompressionRate: 0,
  engineCylinderArrangementText: '',
  engineCylinderQuantity: 0,
  engineMaxPowerDetails: {
    engineMaxPowerMeasure: {
      measurementUnitCode: 'KWT',
      measurementUnitCodeListId: '',
      value: 0
    },
    vehicleShaftRotationFrequency: {
      rangeIndicator: false,
      vehicleShaftRotationFrequencyMaxMeasure: {
        measurementUnitCode: 'RPM',
        value: 0
      },
      vehicleShaftRotationFrequencyMinMeasure: {
        measurementUnitCode: 'RPM',
        value: 0
      }
    }
  },
  engineMaxTorqueDetails: {
    engineMaxTorqueMeasure: {
      measurementUnitCode: 'NEW',
      value: 0
    },
    vehicleShaftRotationFrequency: {
      rangeIndicator: false,
      vehicleShaftRotationFrequencyMaxMeasure: {
        measurementUnitCode: 'RPM',
        value: 0
      },
      vehicleShaftRotationFrequencyMinMeasure: {
        measurementUnitCode: 'RPM',
        value: 0
      }
    }
  },
  vehicleComponentMakeName: '',
  vehicleComponentModelCode: '',
  vehicleComponentText: '',
  engineType: ''
}
async function load() {
  NSI_033.value = await indexDB.getFromDatabase('catalog', 'NSI_033')
  NSI_118.value = await indexDB.getFromDatabase('catalog', 'NSI_118')
  NSI_301.value = await indexDB.getFromDatabase('catalog', 'NSI_301')
  NSI_308.value = await indexDB.getFromDatabase('catalog', 'NSI_308')
}
load()
</script>
