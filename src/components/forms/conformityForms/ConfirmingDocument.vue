<template>
  <div class="adaptiveGrid mt-5">
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].docName"
      label="Наименование документа, подтверждающего соответствие обязательным требованиям"
      class="span6"
    ></base-textfield>
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].docId"
      label="Номер документа, подтверждающего соответствие обязательным требованиям"
      class="span6"
    ></base-textfield>
    <base-datefield
      v-model="shema.vehicleComplianceDocDetails[0].docCreationDate"
      label="Дата документа"
      class="span3"
    ></base-datefield>
    <base-datefield
      v-model="shema.vehicleComplianceDocDetails[0].eventDate"
      label="Дата внесения записи о документе в единый реестр"
      class="span3"
    ></base-datefield>
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].businessEntityName"
      label="Наименование хозяйствующего субъекта, выдавшего документ"
      class="span6"
    ></base-textfield>
    <base-textfield
      v-model="shema.vehicleComplianceDocDetails[0].businessEntityId"
      label="Идентификатор хозяйствующего субъекта, присвоенный при государственной регистрации"
      class="span6"
    ></base-textfield>
    <base-textfield
      v-model="shema.fullNameDetails"
      label="ФИО руководителя уполномоченного органа"
      class="span6"
    ></base-textfield>
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
