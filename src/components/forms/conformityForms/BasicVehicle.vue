<template>
  <div class="adaptiveGrid">
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].notBaseVehicleDetails"
      v-model:data="shema.vehicleVariantDetails"
      label="Базовое ТС - отсутствует"
      :default-data="JSON.parse(JSON.stringify(defaultData))"
    >
      <base-constructor
        v-slot="props"
        v-model:data="shema.vehicleVariantDetails"
        :filter-data="shema.vehicleVariantDetails"
        :default-data="JSON.parse(JSON.stringify(defaultData[0]))"
        class="full"
        label="Базовое ТС"
      >
        <base-is-missing-disabled v-model="props.item.notVehicleMakeNameIndicator" class="full">
          <base-autocomplete
            v-model="props.item.vehicleMakeName"
            label="Марка*"
            :items="NSI_046"
            :disabled="props.item.notVehicleMakeNameIndicator"
            item-value="key"
            max-length="120"
            :rules="
              props.item.notVehicleMakeNameIndicator ? [] : [conformityRules.vehicleMakeNameString]
            "
          ></base-autocomplete>
        </base-is-missing-disabled>

        <base-textfield
          id="type"
          v-model="props.item.vehicleTypeId"
          label="Идентификатор типа*"
          :validators="[conformityRules.vehicleTypeId]"
          max-length="50"
          class="span6"
        ></base-textfield>
        <base-combobox
          v-model="props.item.vehicleCommercialName"
          label="Коммерческое наименование транспортного средства"
          max-length="120"
          class="span6"
        ></base-combobox>
        <base-textfield
          v-model="props.item.docId"
          label="Номер бумажного паспорта базового ТС (шасси ТС)"
          max-length="50"
          class="span6"
        ></base-textfield>

        <base-datefield v-model="props.item.docCreationDate" label="Дата документа" class="span6">
        </base-datefield>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/shema'
import { conformityRules } from './rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing2.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled2.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore() // для работы с IndexDB

const NSI_046 = ref([])
const defaultData = [
  {
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
]

async function load() {
  NSI_046.value = await indexDB.getFromDatabase('catalog', 'NSI_046')
}
load()
</script>
