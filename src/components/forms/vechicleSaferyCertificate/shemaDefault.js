// данные которые беруться для компонентов по умолчанию
const shemaDefault = {
  additionalInfoText: '',
  eDocId: '',
  changeHistory: [],
  applicantDetails: {
    businessEntityName: '',
    businessEntityBriefName: '',
    businessEntityBriefNames: [],
    businessEntityTypeName: '',
    manufacturerTypeIndicator: false,
    businessEntityId: [
      {
        value: '',
        kindId: ''
      }
    ],
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
      codeListId: '',
      value: ''
    },
    vehicleManufacturerKindCode: ''
  },
  externalSystemLoadCode: '1',
  conformityAuthorityInformationDetails: {
    businessEntityBriefName: '',
    businessEntityTypeName: '',
    businessEntityId: '',
    businessEntityName: '',
    docId: '',
    authority: '',
    docStartDate: '',
    docValidityDate: '',
    fullNameDetails: {
      firstName: '',
      lastName: '',
      middleName: ''
    },
    inputManualIndicator: false,
    subjectAddressDetails: [
      {
        addressKindCode: '',
        fullAddress: '',
        postOfficeBoxId: ''
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
    ]
  },
  conformityDocKindCode: '',
  conformityDocKindName: '',
  docStatusDetails: {
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
  conformityInformation: {
    authority: '',
    docId: '',
    docStartDate: '',
    docValidityDate: '',
    documentType: ''
  },
  docAnnexDetails: [
    {
      formNumberId: []
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
  frameDetails: {
    frameMakeName: '',
    frameModification: '',
    frameType: '',
    notFrameMakeNameIndicator: false
  },
  fullNameDetails: '',
  notFrameIndicator: false,
  resourceItemStatusDetails: [
    {
      validityPeriodDetails: {
        endDateTime: '',
        startDateTime: ''
      },
      businessEntity: {
        unifiedCountry: '',
        businessEntityName: ''
      },
      updateDateTime: '',
      docNumber: '',
      docName: '',
      technicalRegulationObjectKindCode: ''
    }
  ],
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
  vehicleManufacturerDetails: [
    {
      vehicleManufacturerKindCode: '05',
      businessEntityName: '',
      businessEntityBriefName: '',
      businessEntityBriefNames: [],
      businessEntityTypeName: '',
      manufacturerTypeIndicator: false,
      businessEntityId: [
        {
          value: '',
          kindId: ''
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
    addInfo: [''],
    addInfoIndicator: false,
    manufactureYear: 0,
    notVehicleCommercialNameIndicator: false,
    notVehicleMakeNameIndicator: false,
    preferentialManufacturingModeText: '',
    vehicleCommercialName: '',
    vehicleEquipmentText: [''],
    vehicleHybridIndicator: false,
    vehicleHybridDesignText: '',
    vehicleIdentificationNumberId: '',
    validationVehicleIdentityNumberIndicator: false,
    vehicleFactoryNumberId: '',
    factoryNumberIndicator: false,
    vehicleLabelingDetails: [
      {
        engineIdentificationNumberLocationText: '',
        vehicleComponentLocationText: '',
        vehicleIdentificationNumberId: {
          number1: '?',
          number10: '?',
          number11: '?',
          number12: '?',
          number13: '?',
          number14: '?',
          number15: '?',
          number16: '?',
          number17: '?',
          number2: '?',
          number3: '?',
          number4: '?',
          number5: '?',
          number6: '?',
          number7: '?',
          number8: '?',
          number9: '?'
        },
        vehicleIdentificationNumberLocationText: '',
        vehicleIdentificationNumberIdFull: ''
      }
    ],
    vehicleLayoutPatternText: '',
    vehicleMakeCode: '',
    vehicleMakeName: '',
    vehicleMovementPermitIndicator: false,
    pictureFile: [
      {
        fileName: '',
        value: ''
      }
    ],
    vehicleRoutingIndicator: false,
    vehicleTechCategoryCode: '',
    vehicleTypeId: '',
    vehicleType: [''],
    vehicleUseRestrictionIndicator: false,
    vehicleUseRestrictionShipping: '',
    vehicleUseRestrictionText: ''
  },
  vehicleVariantDetails: {
    vehicleEmergencyCallDeviceIndicator: false,
    classCode: '',
    engineType: '',
    vehicleFuelKindCode: [],
    notVehicleBrakingSystemIndicator: false,
    ecuModelCode: '',
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
            vehicleShaftRotationFrequencyMinMeasure: {
              value: 0,
              measurementUnitCode: 'RPM'
            },
            vehicleShaftRotationFrequencyMaxMeasure: {
              value: 0,
              measurementUnitCode: 'RPM'
            }
          }
        },
        vehicleComponentMakeName: '',
        vehicleComponentText: ''
      }
    ],
    engineQuantity: 0,
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
    notClassCode: false,
    notEngineIndicator: false,
    notExhaustIndicator: false,
    notFuelFeedIndicator: false,
    notFuelKindIndicator: false,
    notPowerStorageDeviceIndicator: false,
    notVehicleEcoClassCodeIndicator: false,
    notVehicleIgnitionIndicator: false,
    notVehicleTrailerIndicator: false,
    powerStorageDeviceDetails: [
      {
        vehicleComponentLocationText: '',
        vehicleComponentText: '',
        vehicleRangeMeasure: {
          measurementUnitCode: 'KMT',
          value: 0
        }
      }
    ],
    vehicleBodyworkDetails: [
      {
        vehicleBodyworkAppointment: '',
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
        vehicleBrakingSystemItemName: '',
        vehicleBrakingSystemKindCode: '',
        vehicleComponentText: ''
      }
    ],
    vehicleComponentLocationText: '',
    vehicleEcoClassCode: '',
    vehicleElectricalMachineDetails: [
      {
        electricMotorPowerMeasure: {
          measurementUnitCode: 'KWT',
          value: 0
        },
        electricalMachineKindCode: '',
        electricalMachineKindView: '',
        electricalMachineVoltageMeasure: {
          measurementUnitCode: 'VLT',
          value: 0
        },
        engineType: '',
        vehicleComponentMakeName: '',
        vehicleComponentText: ''
      }
    ],
    vehicleFuelKindName: [
      {
        cetaneNumber: '',
        octaneNumber: '',
        vehicleFuelKindNameZ: ['']
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
    vehicleMassMeasure: [
      {
        massView: '',
        meaningMassMeasure: [
          {
            maxMassMeasure: 0,
            measurementUnitCode: 'KGM',
            minMassMeasure: 0,
            rangeIndicator: false
          }
        ],
        vehicleMassCode: ''
      }
    ],
    vehicleMaxUnbrakedTrailerWeightMeasure: {
      measurementUnitCode: 'KGM',
      value: 0.0,
      values: null
    },
    vehicleMaxBrakedTrailerWeightMeasure: {
      measurementUnitCode: 'KGM',
      value: 0.0,
      values: null
    },
    vehicleHitchLoadMeasure: [
      {
        measurementUnitCode: 'DAN',
        value: 0.0,
        values: null
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
          valueMax: 0,
          valueMin: 0
        }
      ],
      maxHeightMeasure: [
        {
          measurementUnitCode: 'MMT',
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
      ]
    },
    vehicleRunningGearDetails: {
      vehicleTransmissionText: [''],
      vehicleWheelQuantity: 0,
      notTransmissionUnitIndicator: false,
      notSteeringIndicator: false,
      notVehicleClutchIndicator: false,
      poweredWheel: '',
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
              transmissionUnitGearRate: 0.0,
              vehicleShaftRotationFrequencyMeasure: {
                value: 0.0,
                measurementUnitCode: 'RPM'
              }
            }
          ]
        }
      ],
      vehicleAxleQuantity: 0,
      vehicleAxleDetails: [
        {
          vehicleAxleOrdinal: 0,
          vehicleAxleSweptPathMeasure: {
            measurementUnitCode: 'MMT',
            value: 0,
            values: null
          },
          vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure: {
            measurementUnitCode: 'KGM',
            value: 0,
            values: null
          },
          vehicleWheelQuantity: 0
        }
      ],
      vehicleClutchDetails: {
        vehicleClutchType: '',
        vehicleComponentMakeName: '',
        vehicleComponentText: ''
      },
      vehicleFrameText: '',
      vehicleSteeringDetails: {
        vehicleComponentMakeName: '',
        wheelType: '',
        vehicleComponentText: ''
      },
      vehicleSuspensionDetails: [
        {
          vehicleComponentText: '',
          vehicleSuspensionKindCode: '',
          vehicleSuspensionView: ''
        }
      ],
      vehicleTyreKindInfo: [
        {
          differentTiresIndicator: false,
          gableTireIndicator: false,
          isSupplementVehicleTyre: false,
          vehicleTyreKindCategorySpeed: [],
          vehicleTyreKindLocation: '',
          vehicleTyreKindSize: '',
          vehicleTyreKindName: '',
          vehicleTyreKindMaxIndexGableTire: '',
          vehicleTyreKindMaxIndexSingleTire: '',
          vehicleTyreKindMinIndexGableTire: '',
          vehicleTyreKindMinIndexSingleTire: ''
        }
      ],
      vehicleWheelFormula: '',
      vehicleWheelbaseMeasure: [
        {
          measurementUnitCode: 'MMT',
          semitrailerIndicator: false,
          value: 0,
          values: null
        }
      ]
    }
  },
  cert: {
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
    serialNumber: '',
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
    serialNumber: '',
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
    },
    validFrom: '',
    validTo: '',
    version: 0
  },
  certSignature: '',
  certSignatureAdm: '',
  tcInfo: {
    itemId: '',
    rev: '',
    ownerId: '',
    userRoleId: 0,
    companyId: '',
    companyName: '',
    userIdModifiedBy: '',
    userRoleIdModifiedBy: 0,
    companyIdModifiedBy: '',
    lastModified: '',
    statusModified: ' ',
    latestRev: true
  }
}
export default shemaDefault
