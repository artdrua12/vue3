// данные которые беруться для компонентов по умолчанию
const shemaDefault = {
  docStatusCode: '',
  docStatus: '',
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
  businessId: '',
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
    fullNameDetails: {
      firstName: '',
      lastName: '',
      middleName: ''
    },
    subjectAddressDetails: [
      {
        addressKindCode: '',
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
    expertDetails: {
      fullName: ''
    },
    unifiedCommunicationDetails: [
      {
        communicationChannelId: [],
        communicationChannelName: '',
        communicationChannelCode: {
          value: '',
          codeListId: 'NSI_042'
        }
      }
    ]
  },
  conformityDocKindCode: '',
  conformityDocKindName: '',
  docAnnexDetails: [
    {
      objectOrdinal: '',
      pageQuantity: 0
    }
  ],
  docCreationDate: '',
  docId: '',
  docStartDate: '',
  docValidityDate: '',
  expiration: '',
  fullDetails: '',
  instead: '',
  docItemStatusDetails: [
    {
      docName: '',
      docNumber: '',
      updateDateTime: '',
      businessEntityName: '',
      docIde: ''
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
    codeListId: 'NSI_034',
    value: ''
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
    notVehicleMakeNameIndicator: false,
    notVehicleTypeIndicator: false,
    vehicleCommercialName: [],
    vehicleMakeName: [],
    vehicleTechCategoryCode: [],
    vehicleTypeId: [],
    vehicleType: [],
    vehicleCharacteristicsName: []
  },
  vehicleVariantDetails: {
    codTNVED: [],
    notCodTNVED: false,
    notVehicleEcoClassCodeIndicator: false,
    notVehicleTypeVariantId: false,
    vehicleEcoClassCode: [],
    vehicleTypeVariantId: []
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
