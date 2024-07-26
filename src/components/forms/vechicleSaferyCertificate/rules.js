// import model from '../schema/conformityDocDetails.json';
export const createSBKTS = {
  docId: (value) => {
    if (!value) return `Обязательно к заполнению`
    return true
  },
  docStartDate: (value) => {
    if (!value) return `Обязательно к заполнению`
    return true
  },
  docValidityDate: (value) => {
    if (!value) return `Обязательно к заполнению`
    return true
  },
  authority: (value) => {
    if (!value) return `Обязательно к заполнению`
    return true
  }
}

export const rules = {
  docId: (value) => {
    if (!value) return `Поле "Номер документа" обязательно к заполнению`
    return true
  },

  vehicleMakeName: (value) => {
    if (!value) {
      return `Поле "Марка" обязательно к заполнению`
    }
    return true
  },
  vehicleCommercialName: (value) => {
    if (!value) {
      return `Поле "Коммерческое наименование" обязательно к заполнению`
    }
    return true
  },
  vehicleTypeId: (value) => {
    if (!value) return `Поле "Идентификатор типа" обязательно к заполнению`
    return true
  },
  frameType: (value) => {
    if (!value) return `Поле "Идентификатор типа" обязательно к заполнению`
    return true
  },

  vehicleTechCategoryCode: (value) => {
    if (!value)
      return `Поле "Категория ТС в соответствии с ТР ТС № 018/2011 " обязательно к заполнению`
    return true
  },
  vehicleEcoClassCode: (value) => {
    if (!value) {
      return `Поле "Экологический класс" обязательно к заполнению`
    }
    return true
  },

  authority: (value) => {
    if (!value) return `Поле "Организация" обязательно к заполнению`
    return true
  },
  businessEntityBriefName: (value) => {
    if (!value) return `Поле "Краткое наименование организации" обязательно к заполнению`
    return true
  },
  unifiedCommodityMeasure: (value) => {
    if (value <= 0) return `Поле "Количество штук в партии" обязательно к заполнению`
    return true
  },
  vehicleLayoutPatternText: (value) => {
    if (!value) return `Поле "Схема компоновки транспортного средства" обязательно к заполнению`
    return true
  },
  vehicleComponentLocationText: (value) => {
    if (!value) return `Поле "Расположение двигателя" обязательно к заполнению`
    return true
  },
  vehicleBodyworkType: (value) => {
    if (!value) return `Поле "Тип кузова" обязательно к заполнению`
    return true
  },
  vehicleDoorQuantity: (value) => {
    if (!value) return `Поле "Количество дверей" обязательно к заполнению`
    return true
  },
  seatQuantity: (value) => {
    if (!value) return `Поле "Количество мест" обязательно к заполнению`
    return true
  },
  seatRawOrdinal: (value) => {
    if (!value) return `Поле "Ряд" обязательно к заполнению`
    return true
  },
  vehicleWheelFormula: (value) => {
    if (!value) return `Поле "Колесная формула" обязательно к заполнению`
    return true
  },
  poweredWheel: (value) => {
    if (!value) return `Поле "Ведущие колеса" обязательно к заполнению`
    return true
  },
  lengthMeasure: (value) => {
    if (!value) return `Поле "Значение длины" обязательно к заполнению`
    return true
  },
  widthMeasure: (value) => {
    if (!value) return `Поле "Значение ширины" обязательно к заполнению`
    return true
  },
  heightMeasure: (value) => {
    if (!value) return `Поле "Значение высоты" обязательно к заполнению`
    return true
  },
  minMassMeasure: (value) => {
    if (!value) return `Поле "Значение массы" обязательно к заполнению`
    return true
  },
  vehicleComponentMakeName: (value) => {
    if (!value) return `Поле "Марка" обязательно к заполнению`
    return true
  },
  electricalMachineType: (value) => {
    if (!value) return `Поле "Тип электромашины" обязательно к заполнению`
    return true
  },
  electricalMachineVoltageMeasure: (value) => {
    if (!value) return `Поле "Рабочее напряжение" обязательно к заполнению`
    return true
  },
  electricMotorPowerMeasure: (value) => {
    if (!value) return `Поле "Максимальная 30-минутная мощность" обязательно к заполнению`
    return true
  },
  text: (value) => {
    if (!value) return `Поле "Тип" обязательно к заполнению`
    return true
  },
  vehicleComponentModelCode: (value) => {
    if (!value)
      return `Поле "Тип(описание) двигателя внутреннего сгорания" обязательно к заполнению`
    return true
  },
  vehicleEngineMakeName: (value) => {
    if (!value) return `Поле "Марка двигателя" обязательно к заполнению`
    return true
  },
  engineCylinderQuantity: (value) => {
    if (!value) return `Поле "Количество цилиндров" обязательно к заполнению`
    return true
  },
  engineCompressionRate: (value) => {
    if (!value) return `Поле "Степень сжатия" обязательно к заполнению`
    return true
  },
  engineCapacityMeasure: (value) => {
    if (!value) return `Поле "Рабочий объём цилиндров" обязательно к заполнению`
    return true
  },
  engineCylinderArrangementText: (value) => {
    if (!value) return `Поле "Расположение цилиндров" обязательно к заполнению`
    return true
  },
  engineMaxPowerMeasure: (value) => {
    if (!value) return `Поле "Максимальная мощность" обязательно к заполнению`
    return true
  },
  vehicleFuelKindName: (value) => {
    if (!value) return `Поле "Вид топлива" обязательно к заполнению`
    return true
  },
  fuelFeedType: (value) => {
    if (!value) return `Поле "Описание типа системы питания" обязательно к заполнению`
    return true
  },
  vehicleIgnitionType: (value) => {
    if (!value) return `Поле "Тип системы зажигания" обязательно к заполнению`
    return true
  },
  exhaustType: (value) => {
    if (!value) return `Поле "Тип системы нейтрализации" обязательно к заполнению`
    return true
  },
  vehicleClutchType: (value) => {
    if (!value) return `Поле "Тип сцепления" обязательно к заполнению`
    return true
  },
  vehicleTransmissionText: (value) => {
    if (!value) return `Поле "Тип трансмиссии" обязательно к заполнению`
    return true
  },
  transmissionUnitGearType: (value) => {
    if (!value) return `Поле "Тип коробки передач" обязательно к заполнению`
    return true
  },

  vehicleSuspensionKindCode: (value) => {
    if (!value) return `Поле "Вид подвески ТС" обязательно к заполнению`
    return true
  },
  vehicleComponentText: (value) => {
    if (!value) return `Поле "Описание" обязательно к заполнению`
    return true
  },
  vehicleWheelLocationText: (value) => {
    if (!value)
      return `Поле "Описание месторасположения рулевого управления транспортного средства" обязательно к заполнению`
    return true
  },
  wheelType: (value) => {
    if (!value) return `Поле "Описание типа рулевого управления" обязательно к заполнению`
    return true
  },
  vehicleBrakingSystemItemName: (value) => {
    if (!value) return `Поле "Наименование элемента тормозной системы" обязательно к заполнению`
    return true
  },
  vehicleBrakComponentText: (value) => {
    if (!value) return `Поле "Описание" обязательно к заполнению`
    return true
  },
  vehicleTyreKindSize: (value) => {
    if (!value) return `Поле "Обозначение размера" обязательно к заполнению`
    return true
  },
  vehicleTyreKindCategorySpeed: (value) => {
    if (value.length == [])
      return `Поле "Классификатор скоростных категорий" обязательно к заполнению`
    return true
  },
  vehicleTyreKindMinIndexSingleTire: (value) => {
    if (!value)
      return `Поле "Минимальный индекс несущей способности односкатных шин транспортного средства" обязательно к заполнению`
    return true
  },
  vehicleTyreKindMinIndexGableTire: (value) => {
    if (!value)
      return `Поле "Минимальный индекс несущей способности двускатных шин транспортного средства" обязательно к заполнению`
    return true
  },
  vehicleManufacturerLocationText: (value) => {
    if (value.length == [])
      return `Поле "Место расположения таблички изготовителя" обязательно к заполнению`
    return true
  },
  vehicleIdentificationNumberLocationText: (value) => {
    if (value.length == [])
      return `Поле "Место расположения идентификационного номера" обязательно к заполнению`
    return true
  },
  /* engineIdentificationNumberLocationText: (value) => {
    if(value.length == []) return `Поле "Место расположения идентификационного номера  двигателя" обязательно к заполнению`
    return true
}, */
  idCharacterQuantity: (value) => {
    if (!value) return `Поле "По" обязательно к заполнению`
    return true
  },
  typeDate: (value) => {
    if (!value) return `Поле "Тип данных" обязательно к заполнению`
    return true
  },
  idCharacterText: (value) => {
    if (!value) return `Поле "Описание" обязательно к заполнению`
    return true
  },
  vehicleTrunkVolumeMeasure: (value) => {
    if (!value) return `Поле "Общий объем багажных отделений ТС" обязательно к заполнению`
    return true
  },
  transmissionTypeVehicleComponentText: (value) => {
    if (!value)
      return `Поле "Описание конструктивных особенностей (типа) коробки передач" обязательно к заполнению`
    return true
  },
  transferCaseType: (value) => {
    if (!value)
      return `Поле "Описание конструктивных особенностей (типа) раздаточной коробки" обязательно к заполнению`
    return true
  },
  mainGearType: (value) => {
    if (!value)
      return `Поле "Описание конструктивных особенностей (типа) главной передачи" обязательно к заполнению`
    return true
  },
  vehicleUnitKindCode: (value) => {
    if (!value) return `Поле "Узел" обязательно к заполнению`
    return true
  },
  lengthIntFractionNumber: (payload) => {
    const { nameField, value, int, fract } = payload
    const numbers = (value + '').split('.')
    if (numbers[0].length > int)
      // if (true) return `Поле "${nameField}" содержит слишком большое значение`
    if (numbers[1] && numbers[1].length > fract)
      return `Поле  "${nameField}" содержит в дробной части слишком большое количество символов`
    return true
  },
  vehicleTyreKindLocation: (value) => {
    if (!value) return `Поле "Расположение" обязательно к заполнению`
    return true
  },
  identityNumberValidator: (value) => {
    if (!value) return 'Введите идентификационный номер ТС'
    if (/^([A-HJ-NPR-Z0-9]{17}$)/g.test(value)) {
      return true
    } else return 'Некорректный идентификационный номер ТС'
  },
  // vehicleMaxUnbrakedTrailerWeightMeasure: value => {
  //   let rule1 = true;
  //   let rule2 = true;

  //   if ($this.formModel.notVehicleTrailerIndicator) {
  //     if ((value == 0 || !value) && !$this.formModel.vehicleMaxBrakedTrailerWeightMeasure.value) {
  //       rule1 = false;
  //     }
  //     rule2 = func.valueInValues({
  //       value,
  //       objName: $this.formModel.vehicleMaxUnbrakedTrailerWeightMeasure,
  //       fieldName: 'Масса прицепа без тормозной системы',
  //     });
  //     console.log('rule1', rule1);
  //     console.log('rule2', rule2);
  //     return rule1
  //       ? rule2
  //       : 'В случае буксировки прицепа должно быть корректно заполнено хотя бы одно поле массы прицепа';
  //   }
  //   return true;
  // },
  vehicleMaxUnbrakedTrailerWeightMeasure: (braked, unbraked) => {
    if ((!braked || braked <= 0) && (!unbraked || unbraked <= 0)) {
      return 'В случае буксировки прицепа должно быть корректно заполнено хотя бы одно поле массы прицепа'
    }
    return true
  },
  // vehicleMaxBrakedTrailerWeightMeasure: (value) => {
  //   let rule1 = true
  //   let rule2 = true
  //   if ($this.formModel.notVehicleTrailerIndicator) {
  //     if ((value == 0 || !value) && !$this.formModel.vehicleMaxUnbrakedTrailerWeightMeasure.value) {
  //       rule1 = false
  //     }
  //     rule2 = func.valueInValues({
  //       value,
  //       objName: $this.formModel.vehicleMaxBrakedTrailerWeightMeasure,
  //       fieldName: 'Масса прицепа с тормозной системой'
  //     })
  //     return rule1
  //       ? rule2
  //       : 'В случае буксировки прицепа должно быть корректно заполнено хотя бы одно поле массы прицепа'
  //   }
  //   return true
  // },
  vehicleHitchLoadMeasure: (item) => {
    // return func.valueInValues({
    //   value: item.value,
    //   objName: item,
    //   fieldName: 'Нагрузка на сцепное устройство ТС'
    // })
    console.log('item', item)
    return true
  },
  // vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure: (item) => {
  //   return valueInValues({
  //     value: item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure.value,
  //     objName: item.vehicleTechnicallyPermissibleMaxWeightOnAxleMeasure,
  //     fieldName: 'Технически допустимая максимальная масса на ось'
  //   })
  // },
  // existsМehicleAxleSweptPathMeasure: ({ value, axel }) => {
  //   if (
  //     (!$this.formModel.vehicleWheelFormula.match(/3x2|3x1/) && value == 0) ||
  //     (!$this.formModel.vehicleWheelFormula.match(/3x2|3x1/) && !value) ||
  //     ($this.formModel.vehicleWheelFormula.match(/3x2|3x1/) &&
  //       [1, 2].includes(axel) &&
  //       value !== 0 &&
  //       !value) ||
  //     ($this.formModel.vehicleWheelFormula.match(/3x2|3x1/) &&
  //       ![1, 2].includes(axel) &&
  //       (value == 0 || !value))
  //   )
  //     return `Поле 'Величина колеи оси ТС' обязательно к заполнению`
  //   return true
  // },
  // vehicleAxleSweptPathMeasure: (item) => {
  //   return valueInValues({
  //     value: item.vehicleAxleSweptPathMeasure.value,
  //     objName: item.vehicleAxleSweptPathMeasure,
  //     fieldName: 'Величина колеи оси ТС'
  //   })
  // },
  // vehicleWheelbaseMeasure: (item) => {
  //   return valueInValues({
  //     value: item.value,
  //     objName: item,
  //     fieldName: 'Колесная база ТС'
  //   })
  // },
  minMax: (min, max, enabled) => {
    if (Number(min) > Number(max) && enabled) return `Максимальное значение меньше минимального`
    return true
  }
}
// valueInValues({ value, objName, fieldName }){
//   if (objName.values && objName.values.length) {
//     const isValidate =
//       objName.values
//         .map(e => {
//           if (Array.isArray(e) && e.length === 2 && value >= e[0] && value <= e[1]) return true;
//           if (Array.isArray(e) && e.length === 1 && value == e[0]) return true;
//           return false;
//         })
//         .filter(e => e).length > 0;
//     if (isValidate) {
//       return true;
//     } else
//       return `Введенное значение в поле "${fieldName}" не соответствует значениям из первичного документа`;
//   }
//   return true;
// }
