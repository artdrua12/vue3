// данные которые беруться для компонентов по умолчанию
const shemaDefault = {
  docStatusCode: '',
  conformityDocStatus: '',
  eDocId: '',
  changeHistory: [],
  refuseReason: '',
  additionalInfoText: '',
  applicantDetails: {
    businessEntityName: '',
    businessEntityBriefName: '',
    businessEntityBriefNames: [],
    businessEntityTypeName: '',
    unifiedCountryCode: {
      value: '',
      codeListId: 'NSI_034'
    },
    businessEntityId: [
      {
        value: '',
        kindId: ''
      }
    ],
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
        communicationChannelCode: {
          value: '',
          codeListId: 'NSI_042'
        }
      }
    ],
    fullNameDetails: {
      firstName: '',
      lastName: '',
      middleName: ''
    },
    vehicleManufacturerKindCode: ''
  },
  externalSystemLoadCode: '1',
  conformityAuthorityInformationDetails: {
    authority: '',
    businessEntityBriefName: '',
    businessEntityId: '',
    businessEntityKindId: '',
    businessEntityName: '',
    businessEntityTypeName: '',
    docId: '',
    docStartDate: '',
    docValidityDate: '',
    expertDetails: {
      fullName: ''
    },
    fullNameDetails: {
      firstName: '',
      lastName: '',
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
        communicationChannelCode: {
          value: 'TE',
          codeListId: 'NSI_042'
        }
      }
    ]
  },
  conformityDocKindCode: '',
  conformityDocKindName: '',
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
  expiration: '',
  formNumberId: {
    formAdditionalNumberId: [],
    formNumberMain: ''
  },
  fullDetails: '',
  id: null,
  instead: '',
  docItemStatusDetails: [
    {
      businessEntityName: '',
      docId: '',
      docName: '',
      docNumber: '',
      updateDateTime: ''
    }
  ],
  approveDocumentDetails: [
    {
      technicalRegulationObjectKindCode: '',
      docNumber: '',
      updateDateTime: '',
      objectType: ''
    }
  ],

  shippingDoc: [
    {
      docCreationDate: '',
      docId: '',
      docName: ''
    }
  ],
  technicalRegulations: [],
  technicalRegulationObjectKindCode: '',
  unifiedCommodityMeasure: {
    measurementUnitCode: 'H87',
    measurementUnitCodeListId: 'NSI_033',
    value: 0
  },
  unifiedCountryCode: {
    value: '',
    codeListId: 'NSI_034'
  },
  vehicleComplianceDocDetails: [
    {
      docCreationDate: '',
      docId: '',
      docName: ''
    }
  ],
  vehicleDetails: {
    vehicleIdInfoDetails: {
      vehicleFactoryNumberId: ''
    }
  },
  vehicleManufacturerDetails: [
    {
      businessEntityName: '',
      businessEntityBriefName: '',
      businessEntityBriefNames: [],
      businessEntityTypeName: '',
      unifiedCountryCode: {
        value: '',
        codeListId: 'NSI_034'
      },
      businessEntityId: [
        {
          value: '',
          kindId: ''
        }
      ],
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
          communicationChannelCode: {
            value: '',
            codeListId: 'NSI_042'
          }
        }
      ],
      fullNameDetails: {
        firstName: '',
        lastName: '',
        middleName: ''
      },
      vehicleManufacturerKindCode: '05'
    }
  ],
  vehicleTypeDetails: {
    notVehicleCommercialNameIndicator: false,
    vehicleCharacteristicsName: [],
    notVehicleMakeNameIndicator: false,
    notVehicleTypeIndicator: false,
    vehiclePicture: [],
    preferentialManufacturingModeText: '',
    propulsionKindCode: '',
    propulsionKindName: '',
    reversibleControlIndicator: false,
    vehicleCommercialName: [],
    vehicleHybrid: false,
    vehicleHybridDesignText: [],
    vehicleLabelingDetails: {
      engineIdentificationNumberLocationText: [''],
      notManufacturerPlateIndicator: false,
      vehicleComponentLocationText: [''],
      vehicleIdentificationNumberLocationText: ['']
    },
    vehicleLayoutPatternText: [],
    vehicleMakeCode: [],
    vehicleMakeName: [],
    machineTechCategoryCode: [],
    vehicleTypeId: [],
    vehicleType: [],
    vehicleUseRestrictionIndicator: false,
    vehicleUseRestrictionText: ['']
  },
  vehicleVariantDetails: {
    baseVehicleDetails: [
      {
        docCreationDate: '',
        docId: '',
        vehicleCommercialName: '',
        vehicleMakeName: '',
        vehicleTypeId: ''
      }
    ],
    codTNVED: [],
    ecuModelCode: [],
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
            value: 0,
            measurementUnitCodeListId: 'NSI_33'
          },
          vehicleShaftRotationFrequencyMeasure: {
            measurementUnitCode: 'RPM',
            rangeIndicator: false,
            valueMax: 0,
            valueMin: 0
          }
        },
        engineMaxTorqueDetails: {
          engineMaxTorqueMeasure: {
            measurementUnitCode: 'NMT',
            value: 0
          },
          vehicleShaftRotationFrequencyMeasure: {
            measurementUnitCode: 'RPM',
            rangeIndicator: false,
            valueMax: 0,
            valueMin: 0
          }
        },
        vehicleComponentMakeName: '',
        vehicleComponentModelCode: '',
        vehicleComponentText: ''
      }
    ],
    drivenEngineDetails: [
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
            value: 0,
            measurementUnitCodeListId: 'NSI_33'
          },
          vehicleShaftRotationFrequencyMeasure: {
            measurementUnitCode: 'RPM',
            rangeIndicator: false,
            valueMax: 0,
            valueMin: 0
          }
        },
        engineMaxTorqueDetails: {
          engineMaxTorqueMeasure: {
            measurementUnitCode: 'NMT',
            value: 0
          },
          vehicleShaftRotationFrequencyMeasure: {
            measurementUnitCode: 'RPM',
            rangeIndicator: false,
            valueMax: 0,
            valueMin: 0
          }
        },
        vehicleComponentMakeName: '',
        vehicleComponentModelCode: '',
        vehicleComponentText: ''
      }
    ],
    engineQuantity: 0,
    engineType: '',
    drivedMotorType: '',
    exhaustDetails: [
      {
        vehicleComponentMakeName: '',
        vehicleComponentText: '',
        notVehicleComponentMakeName: false
      }
    ],
    fuelFeedDetails: [
      {
        vehicleComponentMakeName: '',
        vehicleComponentText: '',
        notVehicleComponentMakeName: false
      }
    ],
    notBaseVehicleIndicator: false,
    notCodTNVED: false,
    notEngineIndicator: false,
    notDrivedMotorIndicator: true,
    notExhaust: false,
    notFuelFeed: false,
    notFuelKind: false,
    notPowerStorageDevice: false,
    notVehicleBrakingSystem: false,
    notVehicleEcoClassCodeIndicator: false,
    notVehicleIgnition: false,
    notVehicleTrailerIndicator: false,
    vehicleTrailer: [
      {
        permissibleTowableWeightMeasure: [
          {
            measurementUnitCode: 'KGM',
            value: 0
          }
        ],
        vehicleMaxUnbrakedTrailerWeightMeasure: [
          {
            measurementUnitCode: 'KGM',
            value: 0
          }
        ],
        vehicleMaxBrakedTrailerWeightMeasure: [
          {
            measurementUnitCode: 'KGM',
            value: 0
          }
        ],
        vehicleHitchLoadMeasure: [
          {
            measurementUnitCode: 'KGM',
            valueMax: 0,
            valueMin: 0
          }
        ]
      }
    ],
    notVehicleTypeVariantId: false,
    powerStorageDeviceDetails: [
      {
        powerStorageDeviceVoltageMeasure: {
          measurementUnitCode: 'VLT',
          value: 0
        },
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
        vehicleCarriageSpaceImplementationText: [''],
        vehicleComponentText: '',
        vehiclePassengerQuantity: 0
      }
    ],
    vehicleBrakingSystemDetails: [
      {
        vehicleBrakingSystemKindCode: '',
        vehicleBrakingSystemKindName: '',
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
        electricalMachineVoltageMeasure: {
          measurementUnitCode: 'VLT',
          value: 0
        },
        vehicleComponentMakeName: '',
        vehicleComponentText: ''
      }
    ],
    drivenVehicleElectricalMachineDetails: [
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
        vehicleComponentMakeName: '',
        vehicleComponentText: ''
      }
    ],
    vehicleFuelKindCode: [],
    vehicleFuelKindName: [],
    vehicleIgnitionDetails: [
      {
        vehicleComponentMakeName: '',
        vehicleComponentText: '',
        notVehicleComponentMakeName: false
      }
    ],
    vehicleMassDetails: [
      {
        massView: '',
        meaningMassMeasure: [
          {
            maxMassMeasure: 0,
            measurementUnitCode: 'KGM',
            minMassMeasure: 0,
            rangeIndicator: false,
            codeListId: 'NSI_33'
          }
        ],
        vehicleMassCode: ''
      }
    ],
    vehicleMaxSpeedMeasure: [
      {
        measurementUnitCode: 'KMH',
        value: 0
      }
    ],
    vehicleOverallDimensionDetails: {
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
      machineFrameText: '',
      machineTransmissionText: [],
      notSteering: false,
      notTransmissionUnit: false,
      notVehicleClutch: false,
      transmissionUnitDetails: [
        {
          axisDistribution: '',
          transmissionUnitGearBackQuantity: '',
          transmissionUnitGearDetails: [
            {
              transmissionUnitGearName: '',
              transmissionUnitGearRate: 0,
              rangeTransmissionName: '',
              transmissionUnitGearType: '',
              transmissionUnitGearRateMax: 0,
              transmissionUnitReverseGearIndicator: false
            }
          ],
          transmissionUnitGearQuantity: '',
          vehicleComponentMakeName: '',
          vehicleComponentModelCode: [],
          vehicleComponentText: '',
          vehicleComponentLocationText: '',
          vehiclePowerTakeOffDetails: [
            {
              transmissionUnitGearRate: 0,
              vehicleShaftRotationFrequencyMeasure: {
                measurementUnitCode: 'RPM',
                rangeIndicator: false,
                valueMax: 0,
                valueMin: 0
              }
            }
          ],
          vehicleUnitKindCode: ''
        }
      ],
      vehicleGroundClearanceMeasure: [
        {
          measurementUnitCode: 'MMT',
          value: 0
        }
      ],
      vehicleAxleDetails: [
        {
          brakingAxleIndicator: false,
          drivingAxleIndicator: false,
          dualTireAxleIndicator: false,
          steeringAxleIndicator: false,
          vehicleAxleOrdinal: 0,
          vehicleAxleSweptPathMeasure: {
            measurementUnitCode: 'MMT',
            rangeMeasure: [
              {
                valueMin: 0,
                valueMax: 0
              }
            ],
            rangeIndicator: false,
            value: [0]
          },
          vehicleGroundClearanceMeasure: {
            rangeIndicator: false,
            value: 0,
            valueMin: 0,
            valueMax: 0,
            measurementUnitCode: 'MMT'
          },
          vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure: {
            measurementUnitCode: 'KGM',
            value: 0
          },
          vehicleTyre: [
            {
              vehicleTyreKindSize: []
            }
          ]
        }
      ],
      vehicleAxleQuantity: [0],
      vehicleClutchDetails: [
        {
          vehicleComponentMakeName: '',
          vehicleComponentText: ''
        }
      ],
      vehicleSteeringDetails: [
        {
          steeringWheelPositionCode: '',
          steeringWheelPositionName: '',
          vehicleComponentLocationText: '',
          vehicleComponentMakeName: '',
          vehicleComponentText: ''
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
      vehicleWheelQuantity: [0],
      vehicleWheelbaseMeasure: [
        {
          measurementUnitCode: 'MMT',
          valueMax: 0,
          valueMin: 0
        }
      ],
      poweredWheelLocation: [],
      poweredWheelQuantity: ''
    },
    vehicleTypeVariantId: [],
    vehicleVoltageMeasure: {
      measurementUnitCode: 'VLT',
      value: 0
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
    },
    validFrom: '',
    validTo: '',
    version: 0
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
