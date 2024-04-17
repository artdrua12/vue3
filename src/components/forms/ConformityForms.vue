<template>
  <layout-forms v-model:data="data"></layout-forms>
</template>

<script setup>
import { computed, reactive } from 'vue'
import LayoutForms from '@/components/layout/LayoutForms.vue'
const data = reactive([
  {
    title: 'Документ об оценке соответствия',
    id: '#vehicle-details',
    tabs: [
      {
        title: 'Документ',
        id: '#vehicle-details-document',
        fields: {
          unifiedCountryCode: {
            label:
              'Код страны, выдавшей документ об оценке соответствия колесных транспортных средств',
            width: '6',
            value: '',
            type: 'BaseAutocomplete',
            items: [],
            text: 'name',
            itemValue: 'type'
          },
          docId: {
            label: 'Номер документа*',
            width: '6',
            value: '',
            type: 'BaseTextfield'
          },
          conformityDocKindName: {
            label: 'Наименование вида документа об оценке соответствия',
            width: '6',
            value: '',
            type: 'BaseAutocomplete',
            items: [],
            text: 'name',
            itemValue: 'type'
          },
          docCreationDate: {
            label: 'Дата оформления бумажного ОТТС',
            width: '6',
            value: '',
            type: 'BaseDatefield'
          },
          docStartDate: {
            label: 'Дата начала срока действия документа*',
            width: '6',
            value: '',
            type: 'BaseDatefield'
          },
          docValidityDate: {
            label: 'Дата истечения срока действия документа*',
            width: '6',
            value: '',
            type: 'BaseDatefield'
          },
          formNumberId: {
            label: 'Номер бланка документа',
            width: '6',
            value: '',
            type: 'BaseTextfield'
          },
          formAdditionalNumberId: {
            label: 'Номер бланка дополнительного листа',
            width: '6',
            value: '',
            type: 'BaseTextfield'
          },
          objectOrdinal: {
            label: 'Приложение к документу',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                objectOrdinal: {
                  label: 'Номер приложения',
                  width: '3',
                  value: '',
                  type: 'BaseTextfield'
                },
                pageQuantity: {
                  width: '3',
                  label: 'Количество листов',
                  value: '',
                  type: 'BaseTextfield'
                },
                formNumberId: {
                  width: '6',
                  label: 'Номер бланка приложения',
                  value: null,
                  type: 'BaseCombobox'
                }
              }
            ]
          },
          additionalInfoText: {
            label: 'Иные сведения',
            width: '6',
            value: '',
            type: 'BaseTextarea'
          },
          docName: {
            label: 'Наименование документа об изменении статуса документа об оценке соответствия',
            width: '6',
            value: '',
            type: 'BaseTextarea'
          },
          docNumber: {
            label: 'Номер документа',
            width: '4',
            value: '',
            type: 'BaseDatefield'
          },
          dateType: {
            label: 'Дата истечения срока действия документа*',
            width: '2',
            value: '',
            type: 'BaseDatefield'
          },
          formNumberMain: {
            label: 'Номер бланка документа',
            width: '6',
            value: '',
            type: 'BaseDatefield'
          },
          startDate2: {
            label: 'Начальная дата',
            width: '6',
            value: '',
            type: 'BaseDatefield'
          },
          endDate2: {
            label: 'Конечная дата',
            width: '6',
            value: '',
            type: 'BaseDatefield'
          },
          noteText: {
            label: 'Примечание',
            width: 'all',
            value: '',
            type: 'BaseDatefield'
          }
        }
      },
      {
        title: 'Транспортное средство',
        id: '#vehicle-details-vehicle',
        fields: {
          vehicleMakeName: {
            label: 'Марка*',
            width: '6',
            type: 'BaseIsMissingDisabled',
            additionData: 'BaseCombobox'
          },

          vehicleCommercialName: {
            label: 'Коммерческое наименование*',
            width: '6',
            type: 'BaseIsMissingDisabled',
            additionData: 'BaseCombobox'
          },

          vehicleTypeId: {
            label: 'Тип',
            width: '6',
            value: null,
            type: 'BaseCombobox',
            items: []
          },
          vehicleTypeIdZ: {
            label: 'Идентификатор типа*',
            width: '6',
            value: null,
            type: 'BaseCombobox',
            items: []
          },
          vehicleTypeVariantId: {
            label: 'Модификация транспортного средства',
            width: '6',
            type: 'BaseIsMissingDisabled',
            additionData: 'BaseCombobox'
          },

          modificationVirtual: {
            label: 'Виртуальная модификация*',
            width: '6',
            type: 'BaseIsMissingDisabled',
            additionData: 'BaseTextfield'
          },
          vehicleTechCategoryCode: {
            label: 'Категория ТС в соответствии с ТР ТС № 018/2011*',
            width: 'all',
            type: 'BaseCombobox'
          },
          vehicleEcoClassCode: {
            label: 'Экологический класс*',
            width: 'all',
            type: 'BaseCombobox'
          },
          vehicleEcoClassCode2: {
            label: 'Код ОКП*',
            width: '6',
            type: 'BaseIsMissingDisabled',
            additionData: 'BaseCombobox'
          },
          vehicleEcoClassCode3: {
            label: 'Код ТН ВЭД*',
            width: '6',
            type: 'BaseIsMissingDisabled',
            additionData: 'BaseCombobox'
          }
        }
      },
      {
        title: 'Наименование органа, выдавшего документ',
        id: '#vehicle-details-certification',
        fields: {
          accreditationId: {
            label: 'Организация*',
            width: 'all',
            type: 'BaseAutocomplete'
          },
          businessEntityName: {
            label: 'Полное наименование органа по сертификации',
            width: '6',
            type: 'BaseTextarea'
          },
          businessEntityBriefName: {
            label: 'Краткое наименование органа по сертификации',
            width: '6',
            type: 'BaseTextarea'
          },
          businessEntityId: {
            label: 'Идентификатор хозяйствующего субъекта',
            width: '6',
            type: 'BaseTextfield'
          },
          docId: {
            label: 'Номер аттестата аккредитации',
            width: '6',
            type: 'BaseTextfield'
          },
          docStartDate: {
            label: 'Дата начала действия аттестата',
            width: '6',
            type: 'BaseDatefield'
          },
          docValidityDate: {
            label: 'Срок окончания действия аттестата',
            width: '6',
            type: 'BaseDatefield'
          },
          title: {
            label: 'Контактная информация',
            width: 'all',
            type: 'BaseSlot'
          },
          unifiedCommunicationChannelCode: {
            label: 'Тип контактной информации',
            width: '6',
            type: 'BaseAutocomplete'
          },
          communicationChannelId: {
            label: 'Контактные данные',
            width: '6',
            type: 'BaseCombobox'
          },
          fullName: {
            label: 'ФИО руководителя хозяйствующего субъекта',
            width: 'all',
            type: 'BaseDatefield'
          }
        }
      },
      {
        title: 'Заявитель и его адрес',
        id: '#vehicle-details-applicant',
        fields: {
          businessEntityName: {
            label: 'Организация*',
            width: '6',
            type: 'BaseAutocomplete'
          },
          unifiedCountryCode: {
            label: 'Код страны',
            width: '6',
            type: 'BaseAutocomplete'
          },
          businessEntityTypeName: {
            label: 'Наименование организационно-правовой формы',
            width: 'all',
            type: 'BaseAutocomplete'
          },
          businessEntityName4: {
            label: 'Местонахождение',
            width: 'all',
            type: 'BaseTextarea'
          },
          title: {
            label: 'Контактная информация',
            width: 'all',
            type: 'BaseSlot'
          },
          unifiedCommunicationChannelCode: {
            label: 'Тип контактной информации',
            width: '6',
            type: 'BaseAutocomplete'
          },
          communicationChannelId: {
            label: 'Контактные данные',
            width: '6',
            type: 'BaseCombobox'
          }
        }
      },
      {
        title: 'Изготовитель и его адрес',
        id: '#vehicle-details-manufacturer',
        fields: {
          businessEntityName: {
            label: 'Организация*',
            width: '6',
            type: 'BaseAutocomplete'
          },
          unifiedCountryCode: {
            label: 'Код страны',
            width: '6',
            type: 'BaseAutocomplete'
          },
          businessEntityTypeName: {
            label: 'Наименование организационно-правовой формы',
            width: 'all',
            type: 'BaseAutocomplete'
          },
          businessEntityName4: {
            label: 'Местонахождение',
            width: 'all',
            type: 'BaseTextarea'
          },
          title: {
            label: 'Контактная информация',
            width: 'all',
            type: 'BaseSlot'
          },
          unifiedCommunicationChannelCode: {
            label: 'Тип контактной информации',
            width: '6',
            type: 'BaseAutocomplete'
          },
          communicationChannelId: {
            label: 'Контактные данные',
            width: '6',
            type: 'BaseCombobox'
          }
        }
      },
      {
        title: 'Представители изготовителя и их адреса',
        id: '#vehicle-details-representatives',
        fields: {
          BaseIsMissing: {
            width: 'all',
            type: 'BaseIsMissing',
            label: 'Представители изготовителя и их адреса - отсутствует',
            additionData: false,
            fields: {
              manufacturerAddress: {
                label: 'Представитель изготовителя и его адрес',
                width: 'all',
                type: 'BaseRecursiveConstructor',
                fields: [
                  {
                    businessEntityName: {
                      label: 'Организация*',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    unifiedCountryCode: {
                      label: 'Код страны',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    businessEntityTypeName: {
                      label: 'Наименование организационно-правовой формы',
                      width: 'all',
                      type: 'BaseAutocomplete'
                    },
                    businessEntityName4: {
                      label: 'Местонахождение',
                      width: 'all',
                      type: 'BaseTextarea'
                    },
                    title: {
                      label: 'Контактная информация',
                      width: 'all',
                      type: 'BaseSlot'
                    },
                    unifiedCommunicationChannelCode: {
                      label: 'Тип контактной информации',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    communicationChannelId: {
                      label: 'Контактные данные',
                      width: '6',
                      type: 'BaseCombobox'
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        title: 'Сборочный завод и его адрес',
        id: '#vehicle-details-factory',
        fields: {
          BaseIsMissing: {
            width: 'all',
            type: 'BaseIsMissing',
            label: 'Сборочный завод и его адрес - отсутствует',
            additionData: false,
            fields: {
              manufacturerAddress: {
                label: 'Представитель изготовителя и его адрес',
                width: 'all',
                type: 'BaseRecursiveConstructor',
                fields: [
                  {
                    businessEntityName: {
                      label: 'Организация*',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    unifiedCountryCode: {
                      label: 'Код страны',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    businessEntityTypeName: {
                      label: 'Наименование организационно-правовой формы',
                      width: 'all',
                      type: 'BaseAutocomplete'
                    },
                    businessEntityName4: {
                      label: 'Местонахождение',
                      width: 'all',
                      type: 'BaseTextarea'
                    },
                    title: {
                      label: 'Контактная информация',
                      width: 'all',
                      type: 'BaseSlot'
                    },
                    unifiedCommunicationChannelCode: {
                      label: 'Тип контактной информации',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    communicationChannelId: {
                      label: 'Контактные данные',
                      width: '6',
                      type: 'BaseCombobox'
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        title: 'Поставщик сборочных комплектов и его адрес',
        id: '#vehicle-details-provider',
        fields: {
          BaseIsMissing: {
            width: 'all',
            type: 'BaseIsMissing',
            label: 'Поставщик сборочных комплектов и его адрес - отсутствует',
            additionData: false,
            fields: {
              manufacturerAddress: {
                label: 'Представитель изготовителя и его адрес',
                width: 'all',
                type: 'BaseRecursiveConstructor',
                fields: [
                  {
                    businessEntityName: {
                      label: 'Организация*',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    unifiedCountryCode: {
                      label: 'Код страны',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    businessEntityTypeName: {
                      label: 'Наименование организационно-правовой формы',
                      width: 'all',
                      type: 'BaseAutocomplete'
                    },
                    businessEntityName4: {
                      label: 'Местонахождение',
                      width: 'all',
                      type: 'BaseTextarea'
                    },
                    title: {
                      label: 'Контактная информация',
                      width: 'all',
                      type: 'BaseSlot'
                    },
                    unifiedCommunicationChannelCode: {
                      label: 'Тип контактной информации',
                      width: '6',
                      type: 'BaseAutocomplete'
                    },
                    communicationChannelId: {
                      label: 'Контактные данные',
                      width: '6',
                      type: 'BaseCombobox'
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        title: 'Вид распространения',
        id: '#vehicle-details-view',
        fields: {
          series: {
            width: 'all',
            label: 'На серийно выпускаемую продукцию',
            type: 'BaseCheckbox',
            disabled: computed(() => data[0].tabs[8].fields.BaseIsMissing.value),
            value: false
          },
          BaseIsMissing: {
            width: 'all',
            label: 'На партию транспортных средств',
            value: false,
            disabled: computed(() => data[0].tabs[8].fields.series.value),
            type: 'BaseIsMissing',
            fields: {
              businessEntityName: {
                label: 'Количество штук в партии*',
                width: '6',
                type: 'BaseTextfield'
              },
              unifiedCountryCode: {
                width: '6',
                label: 'Ед. измерения',
                type: 'BaseAutocomplete'
              },
              BaseIsMissingTabIntro: {
                width: 'all',
                label: 'малая партия',
                type: 'BaseIsMissing',
                fields: {
                  title: {
                    label: 'Диапазон VIN',
                    width: 'all',
                    type: 'BaseSlot'
                  },
                  constant: {
                    label: 'VIN (Постоянная часть)',
                    width: 'all',
                    type: 'BaseTextfield'
                  },
                  numberWith: {
                    label: 'VIN Производственный номер с',
                    width: '6',
                    type: 'BaseTextfield'
                  },
                  numberBy: {
                    label: 'VIN Производственный номер по',
                    width: '6',
                    type: 'BaseCombobox'
                  }
                }
              }
            }
          }
        }
      },
      {
        title: 'Дополнительная информаци',
        id: '#vehicle-details-additional',
        fields: {
          clearVehicleUseRestrictionText: {
            width: 'all',
            label: 'Наличие ограничений использования ТС',
            type: 'BaseIsMissing',
            fields: {
              vehicleUseRestrictionIndicator: {
                label: 'Ограничения на возможность использования на дорогах общего пользования',
                width: 'all',
                type: 'BaseRecursiveConstructor',
                fields: [
                  {
                    abs: {
                      label:
                        'Ограничения на возможность использования на дорогах общего пользования',
                      width: 'all',
                      type: 'BaseTextarea',
                      value: ''
                    }
                  }
                ]
              }
            }
          },
          vehicleUseRestrictionShipping: {
            label: 'Ограничения для перевозки опасных грузов, пищевых продуктов и т.д.',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                abs: {
                  label: 'Ограничения для перевозки опасных грузов, пищевых продуктов и т.д.',
                  width: 'all',
                  value: '',
                  type: 'BaseTextarea'
                }
              }
            ]
          },
          isAddInfoIndicator: {
            width: 'all',
            label: 'Признак обязательности оформления специального разрешения',
            value: false,
            additionData: false,
            type: 'BaseCheckbox'
          },
          preferentialManufacturingModeText: {
            label: 'Сведения о производстве с применением льготного режима производства',
            width: 'all',
            type: 'BaseAutocomplete'
          },
          addInfo: {
            label: 'Прочая информация',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                abs: {
                  label: 'Прочая информация',
                  width: 'all',
                  value: '',
                  type: 'BaseTextarea'
                }
              }
            ]
          },

          test: {
            label: 'Ограничения на возможность использования на дорогах общего пользования',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                abs: {
                  label: 'Ограничения на возможность использования на дорогах общего пользования',
                  width: '6',
                  type: 'BaseTextfield',
                  value: ''
                },
                sba: {
                  label: 'Ограничения на возможность использования на дорогах общего пользования',
                  width: '6',
                  type: 'BaseTextfield',
                  value: ''
                },
                test: {
                  label: 'test1',
                  width: 'all',
                  type: 'BaseRecursiveConstructor',
                  fields: [
                    {
                      abs: {
                        label: 'Ограничения на возможность использования ',
                        width: '6',
                        type: 'BaseTextfield',
                        value: ''
                      },
                      sba: {
                        label:
                          'Ограничения на возможность использования на дорогах общего пользования',
                        width: '6',
                        type: 'BaseTextfield',
                        value: ''
                      },
                      test2: {
                        label: 'test1',
                        width: 'all',
                        type: 'BaseRecursiveConstructor',
                        fields: [
                          {
                            abs: {
                              label: 'Ограничения на возможность использования ',
                              width: '6',
                              type: 'BaseTextfield',
                              value: ''
                            },
                            abs2: {
                              label: 'Ttytcn  ',
                              width: '6',
                              type: 'BaseTextfield',
                              value: ''
                            }
                          }
                        ]
                      },
                      test12: {
                        label: 'test1',
                        width: 'all',
                        type: 'BaseRecursiveConstructor',
                        fields: [
                          {
                            abs: {
                              label: 'Ограничения на возможность использования ',
                              width: 'all',
                              type: 'BaseTextfield',
                              value: ''
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                test2: {
                  label: 'test1',
                  width: 'all',
                  type: 'BaseRecursiveConstructor',
                  fields: [
                    {
                      abs: {
                        label: 'Ограничения на возможность использования ',
                        width: 'all',
                        type: 'BaseTextfield',
                        value: ''
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  },
  {
    title: 'Базовое ТС',
    id: '#base-vehicle',
    fields: {
      BaseIsMissing: {
        width: 'all',
        type: 'BaseIsMissing',
        label: 'Представители изготовителя и их адреса - отсутствует',
        additionData: false,
        fields: {
          manufacturerAddress: {
            label: 'Представитель изготовителя и его адрес',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                vehicleMakeName: {
                  label: 'Марка*',
                  width: 'all',
                  type: 'BaseIsMissingDisabled',
                  additionData: 'BaseAutocomplete'
                },
                vehicleTypeId: {
                  label: 'Идентификатор типа*',
                  width: '6',
                  type: 'BaseTextfield'
                },
                vehicleCommercialName: {
                  label: 'Коммерческое наименование транспортного средства',
                  width: '6',
                  type: 'BaseCombobox'
                },
                docId: {
                  label: 'Номер бумажного паспорта базового ТС (шасси ТС)',
                  width: '6',
                  type: 'BaseTextfield'
                },
                docCreationDate: {
                  label: 'Дата документа',
                  width: '6',
                  type: 'BaseDatefield'
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    id: '#vehicle-setting',
    tabs: [
      {
        title: 'Компоновка транспортного средства',
        id: '#vehicle-composition',
        fields: {
          vehicleLayoutPatternText: {
            label: 'Схема компоновки транспортного средства*',
            width: 'all',
            type: 'BaseCombobox'
          },
          BaseRecursiveConstructor: {
            label: 'Представитель изготовителя и его адрес',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                vehicleEquipmentText: {
                  label: 'Оборудование транспортного средства',
                  width: 'all',
                  type: 'BaseTextarea'
                }
              }
            ]
          },
          vehicleComponentLocationText: {
            label: 'Расположение двигателя*',
            width: 'all',
            type: 'BaseCombobox'
          },
          bodyCar: {
            label: 'Кузов',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                vehicleBodyworkType: {
                  label: 'Тип кузова*',
                  width: '6',
                  type: 'BaseAutocomplete'
                },
                vehicleDoorQuantity: {
                  label: 'Количество дверей*',
                  width: '3',
                  type: 'BaseTextfield'
                },
                vehiclePassengerQuantity: {
                  label: 'Пассажировместимость',
                  width: '3',
                  type: 'BaseTextfield'
                },
                vehicleComponentText: {
                  width: '6',
                  type: 'BaseRecursiveConstructor',
                  fields: [
                    {
                      vehicleComponentText: {
                        label: 'Конструктивные особенности (тип) кузова (кабины, шасси)',
                        width: 'all',
                        type: 'BaseTextarea'
                      }
                    }
                  ]
                },
                vehicleBodyworkAppointment: {
                  width: '6',
                  type: 'BaseRecursiveConstructor',
                  fields: [
                    {
                      vehicleBodyworkAppointment: {
                        label: 'Назначение',
                        width: 'all',
                        type: 'BaseTextarea'
                      }
                    }
                  ]
                },
                seatQuantity: {
                  width: 'all',
                  label: 'Количество мест для сидения',
                  type: 'BaseRecursiveConstructor',
                  fields: [
                    {
                      seatQuantity: {
                        label: 'Количество мест для сидения',
                        width: 'all',
                        type: 'BaseTextfield'
                      },
                      vehicleSeatText: {
                        label: 'Описание количества мест для сидения',
                        width: 'all',
                        type: 'BaseTextarea'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      {
        title: 'Ходовая часть ТС',
        id: '#numbers-vheels',
        fields: {
          vehicleWheelFormula: {
            label: 'Колесная формула*',
            width: '6',
            type: 'BaseAutocomplete'
          },
          poweredWheel: {
            label: 'Ведущие колеса*',
            width: '6',
            type: 'BaseAutocomplete'
          },
          vehicleWheelLocation: {
            label: 'Расположение колес',
            width: '6',
            type: 'BaseTextfield'
          },
          vehicleFrameText: {
            label: 'Рама',
            width: '6',
            type: 'BaseTextfield'
          }
        }
      },
      {
        title: 'Ось транспортного средства',
        id: '#vehicle-axis',
        fields: {
          vehicleUseRestrictionIndicator: {
            label: 'Ось транспортного средства',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            fields: [
              {
                vehicleAxleOrdinal: {
                  label: 'Порядковый номер оси транспортного средства',
                  width: 'all',
                  type: 'BaseTextarea',
                  value: ''
                },
                title: {
                  label: 'Технически допустимая максимальная масса на ось',
                  width: 'all',
                  type: 'BaseSlot',
                  additionData: {
                    value: {
                      label: 'Минимально',
                      width: '3',
                      type: 'BaseTextfield',
                      value: ''
                    },
                    maxValue: {
                      label: 'Максимально',
                      width: '6',
                      type: 'BaseIsMissingDisabled',
                      additionData: 'BaseTextfield'
                    },
                    measurementUnitCode: {
                      label: 'Ед. измерения',
                      width: '3',
                      type: 'BaseAutocomplete'
                    }
                  }
                }
              }
            ]
          }
        }
      },
      {
        title: 'Габаритные размеры',
        id: '#dimensions'
      },
      {
        title: 'Масса',
        id: '#weight'
      },
      {
        title: 'Масса буксируемого прицепа',
        id: '#weight-towed-trailer'
      },
      {
        title: 'Двигатель',
        id: '#engine'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Устройство накопления энергии',
        id: '#storage-device'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Топливо',
        id: '#fuel'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система питания',
        id: '#supply-system'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система зажигания',
        id: '#ignition-system'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Система выпуска и нейтрализации отработавших газов',
        id: '#neutralization-system'
        // hide:
        //   this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i)) &&
        //   this.engineType === 'Двигатель внутреннего сгорания'
      },
      {
        title: 'Сцепление',
        id: '#clutch'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Трансмиссия',
        id: '#transmission'
        // hide: this.techCategoryCode.every((i) => !['O1', 'O2', 'O3', 'O4'].includes(i))
      },
      {
        title: 'Подвеска',
        id: '#suspension'
      },
      {
        title: 'Рулевое управление',
        id: '#steerage'
      },
      {
        title: 'Тормозные системы',
        id: '#brake-systems'
      },
      {
        title: 'Шины',
        id: '#tires'
      }
    ]
  },
  {
    title: 'Описание маркировки транспортного средства (Шасси)',
    id: '#description-of-vehicle-markings'
  },
  {
    title: 'Общий вид транспортного средства (Шасси)',
    id: '#vehicle-general-form'
  },
  {
    title: 'Документ, подтверждающий соответствие обязательным требованиям',
    id: '#confirming-document'
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТТС',
    id: '#list-of-documents'
    // hide: this.formModel.conformityDocKindCode === '30'
  },
  {
    title: 'Перечень документов, являющихся основанием для оформления ОТШ',
    id: '#list-of-documents'
    // hide: this.formModel.conformityDocKindCode === '35'
  },
  {
    title: 'История изменения документа',
    id: '#conformity-change-history'
  }
])
</script>

<style></style>
