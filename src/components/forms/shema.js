import { reactive } from 'vue'
export const shema = reactive({
  refuseReason: '',
  eDocId: '',
  changeHistory: [],
  additionalInfoText: '',
  applicantDetails: {
    businessEntityName: '',
    businessEntityTypeName: '',
    fullNameDetails: {
      lastName: '',
      firstName: '',
      middleName: ''
    },
    subjectAddressDetails: [
      {
        addressKindCode: '4',
        unifiedCountryCode: {
          value: '',
          codeListId: 'NSI_034'
        },
        territoryCode: '',
        regionName: '',
        districtName: '',
        cityName: '',
        settlementName: '',
        streetName: '',
        buildingNumberId: '',
        roomNumberId: '',
        postCode: '',
        postOfficeBoxId: '',
        fullAddress: ''
      }
    ],
    unifiedCommunicationDetails: [
      {
        communicationChannelId: [],
        communicationChannelName: '',
        unifiedCommunicationChannelCode: {
          value: '',
          codeListId: 'NSI_042'
        }
      }
    ],
    unifiedCountryCode: {
      codeListId: 'NSI_034',
      value: ''
    },
    businessEntityId: [
      {
        kindId: '',
        value: ''
      }
    ]
  },
  businessId: '',
  externalSystemLoadCode: '1',
  conformityAuthorityInformationDetails: {
    authority: '',
    inputManual: false,
    businessEntityBriefName: '',
    businessEntityId: '',
    businessEntityName: '',
    businessEntityTypeName: '',
    docId: '',
    docStartDate: '',
    docValidityDate: '',
    subjectAddressDetails: [
      {
        addressKindCode: '',
        postOfficeBoxId: '',
        fullAddress: ''
      }
    ],
    unifiedCommunicationDetails: [
      {
        communicationChannelId: [],
        communicationChannelName: '',
        unifiedCommunicationChannelCode: {
          value: '',
          codeListId: 'NSI_042'
        }
      }
    ],
    fullNameDetails: {
      firstName: '',
      middleName: '',
      lastName: ''
    }
  },
  conformityDocKindCode: '',
  conformityDocKindName: '',
  conformityDocStatusDetails: {
    docStatus: '',
    docStatusChangeDocDetails: {
      docCreationDate: '',
      docId: 0,
      docKindCode: {
        value: ''
      },
      docName: '',
      formNumberId: ''
    },
    docStatusCode: '',
    endDate: '',
    noteText: '',
    startDate: ''
  },
  docAnnexDetails: [
    {
      formNumberId: [],
      objectOrdinal: '',
      pageQuantity: 0
    }
  ],
  docCreationDate: '',
  docId: '',
  docStartDate: '',
  docValidityDate: '',
  formNumberId: {
    formAdditionalNumberId: [],
    formNumberMain: ''
  },
  fullNameDetails: '',
  party: {
    partyValue: false,
    smallParty: {
      smallPartyValue: false,
      vinNumber: {
        constant: '',
        numberBy: '',
        numberWith: '',
        vin: []
      }
    }
  },
  resourceItemStatusDetails: [
    {
      technicalRegulationObjectKindCode: '',
      docName: '',
      docNumber: '',
      updateDateTime: '',
      businessEntity: {
        unifiedCountry: '',
        businessEntityName: ''
      },
      validityPeriodDetails: {
        endDateTime: '',
        startDateTime: ''
      }
    }
  ],
  series: false,
  unifiedCommodityMeasure: {
    measurementUnitCode: {
      measurementUnitCodeListId: 'H87'
    },
    value: 0
  },
  unifiedCountryCode: {
    codeListId: '',
    value: ''
  },
  vehicleComplianceDocDetails: [
    {
      businessEntityId: '',
      businessEntityName: '',
      docCreationDate: '',
      docId: '',
      docName: '',
      eventDate: ''
    }
  ],
  notVehicleAssemblyPlantDetails: false,
  notVehicleRepresentativeDetails: false,
  notVehicleProviderDetails: false,
  vehicleManufacturerDetails: [
    {
      vehicleManufacturerKindCode: '05',
      businessEntityName: '',
      businessEntityBriefName: '',
      businessEntityTypeName: '',
      businessEntityId: [
        {
          kindId: '',
          value: ''
        }
      ],
      unifiedCountryCode: {
        value: '',
        codeListId: 'NSI_034'
      },
      subjectAddressDetails: [
        {
          addressKindCode: '4',
          unifiedCountryCode: {
            value: '',
            codeListId: 'NSI_034'
          },
          territoryCode: '',
          regionName: '',
          districtName: '',
          cityName: '',
          settlementName: '',
          streetName: '',
          buildingNumberId: '',
          roomNumberId: '',
          postCode: '',
          postOfficeBoxId: '',
          fullAddress: ''
        }
      ],
      unifiedCommunicationDetails: [
        {
          communicationChannelId: [],
          communicationChannelName: '',
          unifiedCommunicationChannelCode: {
            value: '',
            codeListId: 'NSI_042'
          }
        }
      ],
      fullNameDetails: {
        firstName: '',
        lastName: '',
        middleName: ''
      }
    }
  ],
  vehicleTypeDetails: {
    isNotRequiredVehicleEmergencyCallDeviceIndicator: false,
    vehicleHybrid: false,
    manufactureYear: '',
    vehicleTypeIdZ: [],
    addInfo: [''],
    addInfoIndicator: false,
    notVehicleCommercialNameIndicator: false,
    notVehicleMakeNameIndicator: false,
    preferentialManufacturingModeText: '',
    vehicleCommercialName: [],
    vehicleEquipmentText: [''],
    vehicleHybridDesignText: [],
    vehicleLabelingDetails: [
      {
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
    ],
    vehicleLayoutPattern: '',
    vehicleLayoutPatternText: [],
    vehicleMakeCode: [],
    vehicleMakeName: [],
    vehicleMakeNameZ: [],
    vehicleMovementPermitIndicator: false,
    vehiclePicture: [],
    vehicleRoutingIndicator: false,
    vehicleTechCategoryCode: [],
    vehicleTypeId: [],
    vehicleUseRestrictionIndicator: false,
    vehicleUseRestrictionShipping: [''],
    vehicleUseRestrictionText: [''],
    notVehicleHybridDesignText: ''
  },
  vehicleVariantDetails: [
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
  ],
  cert: {
    serialNumber: '',
    validFrom: '',
    validTo: '',
    version: 0,
    issuer: {
      commonName: '',
      country: '',
      email: '',
      locality: '',
      name: '',
      organization: '',
      stateOrProvince: '',
      street: '',
      surname: ''
    },
    signer: {
      commonName: '',
      country: '',
      email: '',
      locality: '',
      name: '',
      organization: '',
      stateOrProvince: '',
      street: '',
      surname: ''
    }
  },
  certAdm: {
    serialNumber: '',
    validFrom: '',
    validTo: '',
    version: 0,
    issuer: {
      commonName: '',
      country: '',
      email: '',
      locality: '',
      name: '',
      organization: '',
      stateOrProvince: '',
      street: '',
      surname: ''
    },
    signer: {
      commonName: '',
      country: '',
      email: '',
      locality: '',
      name: '',
      organization: '',
      stateOrProvince: '',
      street: '',
      surname: ''
    }
  },
  certApproved: {
    serialNumber: '',
    validFrom: '',
    validTo: '',
    version: 0,
    issuer: {
      commonName: '',
      country: '',
      email: '',
      locality: '',
      name: '',
      organization: '',
      stateOrProvince: '',
      street: '',
      surname: ''
    },
    signer: {
      commonName: '',
      country: '',
      email: '',
      locality: '',
      name: '',
      organization: '',
      stateOrProvince: '',
      street: '',
      surname: ''
    }
  },
  certSignature: '',
  certSignatureAdm: '',
  certApprovedSignature: ''
})
