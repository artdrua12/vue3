// import model from '../schema/conformityDocDetails.json';
export const conformityRules = {
  docId: value => {
    if (!value) return `Поле "Номер документа" обязательно к заполнению`;
    return true;
  },
  docStartDate: value => {
    if (!value) return `Поле "Дата начала срока действия документа" обязательно к заполнению`;
    return true;
  },
  /*  docValidityDate: value => {
    if (!value && !model.party.partyValue)
      return `Поле "Дата истечения срока действия документа" обязательно к заполнению`;
    return true;
  }, */
  vehicleMakeName: value => {
    if (value.length == 0) {
      return `Поле "Марка" обязательно к заполнению`;
    }
    return true;
  },
  vehicleCommercialName: value => {
    if (value.length == []) {
      return `Поле "Коммерческое наименование" обязательно к заполнению`;
    }
    return true;
  },
  vehicleTypeIdZ: value => {
    if (value.length == []) return `Поле "Идентификатор типа" обязательно к заполнению`;
    return true;
  },
  vehicleTypeVariantId: value => {
    if (value.length == []) {
      return `Поле "Модификация" обязательно к заполнению`;
    }
    return true;
  },
  vehicleTechCategoryCode: value => {
    if (value.length == [])
      return `Поле "Категория ТС в соответствии с ТР ТС № 018/2011 " обязательно к заполнению`;
    return true;
  },
  vehicleEcoClassCode: value => {
    if (value.length == []) {
      return `Поле "Экологический класс" обязательно к заполнению`;
    }
    return true;
  },
  codOKPBY: value => {
    if (value.length == []) {
      return `Поле "Код ОКП" обязательно к заполнению`;
    }
    return true;
  },
  codTNVED: value => {
    if (value.length == []) {
      return `Поле "Код ТН ВЭД" обязательно к заполнению`;
    }
    return true;
  },
  authority: value => {
    if (!value) return `Поле "Организация" обязательно к заполнению`;
    return true;
  },
  unifiedCommodityMeasure: value => {
    if (value <= 0) return `Поле "Количество штук в партии" обязательно к заполнению`;
    return true;
  },
  vehicleTypeId: value => {
    if (!value) {
      return `Поле "Идентификатор типа" обязательно к заполнению`;
    }
    return true;
  },
  vehicleMakeNameString: value => {
    if (!value) {
      return `Поле "Марка" обязательно к заполнению`;
    }
    return true;
  },
  vehicleLayoutPatternText: value => {
    if (value.length == [])
      return `Поле "Схема компоновки транспортного средства" обязательно к заполнению`;
    return true;
  },
  vehicleComponentLocationText: value => {
    if (value?.length == []) return `Поле "Расположение двигателя" обязательно к заполнению`;
    return true;
  },
  vehicleBodyworkType: value => {
    if (!value) return `Поле "Тип кузова" обязательно к заполнению`;
    return true;
  },
  vehicleDoorQuantity: value => {
    if (!value) return `Поле "Количество дверей" обязательно к заполнению`;
    return true;
  },
  seatQuantity: value => {
    if (!value) return `Поле "Количество мест" обязательно к заполнению`;
    return true;
  },
  seatRawOrdinal: value => {
    if (!value) return `Поле "Ряд" обязательно к заполнению`;
    return true;
  },
  vehicleWheelFormula: value => {
    if (value.length == []) return `Поле "Колесная формула" обязательно к заполнению`;
    return true;
  },
  poweredWheel: value => {
    if (value.length == []) return `Поле "Ведущие колеса" обязательно к заполнению`;
    return true;
  },
  lengthMeasure: value => {
    if (!value) return `Поле "Минимальная длина" обязательно к заполнению`;
    return true;
  },
  widthMeasure: value => {
    if (!value) return `Поле "Минимальная ширина" обязательно к заполнению`;
    return true;
  },
  heightMeasure: value => {
    if (!value) return `Поле "Минимальная высота" обязательно к заполнению`;
    return true;
  },
  minMassMeasure: value => {
    if (!value) return `Поле "Минимальная масса" обязательно к заполнению`;
    return true;
  },
  vehicleComponentMakeName: value => {
    if (!value) return `Поле "Марка" обязательно к заполнению`;
    return true;
  },
  electricalMachineType: value => {
    if (!value) return `Поле "Тип электромашины" обязательно к заполнению`;
    return true;
  },
  electricalMachineVoltageMeasure: value => {
    if (!value) return `Поле "Рабочее напряжение" обязательно к заполнению`;
    return true;
  },
  electricMotorPowerMeasure: value => {
    if (!value) return `Поле "Максимальная 30-минутная мощность" обязательно к заполнению`;
    return true;
  },
  text: value => {
    if (!value) return `Поле "Тип" обязательно к заполнению`;
    return true;
  },
  vehicleComponentModelCode: value => {
    if (!value)
      return `Поле "Тип(описание) двигателя внутреннего сгорания" обязательно к заполнению`;
    return true;
  },
  vehicleEngineMakeName: value => {
    if (!value) return `Поле "Марка двигателя" обязательно к заполнению`;
    return true;
  },
  engineCylinderQuantity: value => {
    if (!value) return `Поле "Количество цилиндров" обязательно к заполнению`;
    return true;
  },
  engineCompressionRate: value => {
    if (!value) return `Поле "Степень сжатия" обязательно к заполнению`;
    return true;
  },
  engineCapacityMeasure: value => {
    if (!value) return `Поле "Рабочий объём цилиндров" обязательно к заполнению`;
    return true;
  },
  engineCylinderArrangementText: value => {
    if (!value) return `Поле "Расположение цилиндров" обязательно к заполнению`;
    return true;
  },
  engineMaxPowerMeasure: value => {
    if (!value) return `Поле "Максимальная мощность" обязательно к заполнению`;
    return true;
  },
  vehicleShaftRotationFrequencyMinMeasure: value => {
    if (!value) return `Поле "Минимальная скорость вращения вала" обязательно к заполнению`;
    return true;
  },
  engineMaxTorqueMeasure: value => {
    if (!value) return `Поле "Максимальный крутящий момент двигателя" обязательно к заполнению`;
    return true;
  },
  vehicleFuelKindName: value => {
    if (value.length == []) return `Поле "Вид топлива" обязательно к заполнению`;
    return true;
  },
  fuelFeedType: value => {
    if (!value) return `Поле "Описание типа*" обязательно к заполнению`;
    return true;
  },
  vehicleIgnitionType: value => {
    if (!value) return `Поле "Описание типа*" обязательно к заполнению`;
    return true;
  },
  exhaustType: value => {
    if (!value) return `Поле "Описание типа*" обязательно к заполнению`;
    return true;
  },
  vehicleClutchType: value => {
    if (!value) return `Поле "Описание типа*" обязательно к заполнению`;
    return true;
  },
  vehicleTransmissionText: value => {
    if (value.length == []) return `Поле "Тип трансмиссии" обязательно к заполнению`;
    return true;
  },
  transmissionTypeVehicleComponentText: value => {
    if (!value)
      return `Поле "Описание конструктивных особенностей (типа) коробки передач" обязательно к заполнению`;
    return true;
  },
  transmissionUnitGearForwardQuantity: value => {
    if (!value) return `Поле "Количество передач" обязательно к заполнению`;
    return true;
  },
  transmissionUnitGearName: value => {
    if (!value) return `Поле "Наименование передачи" обязательно к заполнению`;
    return true;
  },
  transmissionUnitGearType: value => {
    if (!value) return `Поле "Вид передаточного числа" обязательно к заполнению`;
    return true;
  },
  transmissionUnitGearRate: value => {
    if (!value) return `Поле "Передаточное число" обязательно к заполнению`;
    return true;
  },
  transferCaseType: value => {
    if (!value)
      return `Поле "Описание конструктивных особенностей (типа) раздаточной коробки" обязательно к заполнению`;
    return true;
  },
  mainGearType: value => {
    if (!value)
      return `Поле "Описание конструктивных особенностей (типа) главной передачи" обязательно к заполнению`;
    return true;
  },
  vehicleSuspensionKindCode: value => {
    if (!value) return `Поле "Вид подвески транспортных средств" обязательно к заполнению`;
    return true;
  },
  vehicleComponentText: value => {
    if (!value) return `Поле "Описание" обязательно к заполнению`;
    return true;
  },
  vehicleWheelLocationText: value => {
    if (!value)
      return `Поле "Описание месторасположения рулевого управления транспортного средства" обязательно к заполнению`;
    return true;
  },
  wheelType: value => {
    if (!value) return `Поле "Тип рулевого механизма" обязательно к заполнению`;
    return true;
  },
  vehicleBrakingSystemItemName: value => {
    if (!value) return `Поле "Наименование элемента тормозной системы" обязательно к заполнению`;
    return true;
  },
  vehicleBrakComponentText: value => {
    if (!value) return `Поле "Описание" обязательно к заполнению`;
    return true;
  },
  vehicleTyreKindSize: value => {
    if (!value) return `Поле "Обозначение размера" обязательно к заполнению`;
    return true;
  },
  vehicleTyreKindCategorySpeed: value => {
    if (value.length == [])
      return `Поле "Классификатор скоростных категорий" обязательно к заполнению`;
    return true;
  },
  vehicleTyreKindMinIndexSingleTire: value => {
    if (!value)
      return `Поле "Минимальный индекс несущей способности односкатных шин транспортного средства" обязательно к заполнению`;
    return true;
  },
  vehicleTyreKindMinIndexGableTire: value => {
    if (!value)
      return `Поле "Минимальный индекс несущей способности двускатных шин транспортного средства" обязательно к заполнению`;
    return true;
  },
  vehicleManufacturerLocationText: value => {
    if (!value) return `Поле "Место расположения таблички изготовителя" обязательно к заполнению`;
    return true;
  },
  vehicleIdentificationNumberLocationText: value => {
    if (!value)
      return `Поле "Место расположения идентификационного номера" обязательно к заполнению`;
    return true;
  },

  idCharacterQuantity: value => {
    if (!value) return `Поле "По" обязательно к заполнению`;
    return true;
  },
  typeDate: value => {
    if (!value) return `Поле "Тип данных" обязательно к заполнению`;
    return true;
  },
  idCharacterText: value => {
    if (!value) return `Поле "Описание" обязательно к заполнению`;
    return true;
  },
  vehicleTrunkVolumeMeasure: value => {
    if (!value)
      return `Поле "Общий объем багажных отделений транспортного средства" обязательно к заполнению`;
    return true;
  },
  vehicleComponentNameExhaust: value => {
    if (!value)
      return `Поле "Наименование элемента системы выпуска и нейтрализации отработавших газов" обязательно к заполнению`;
    return true;
  },

  minMax: (min, max, enabled) => {
    if (Number(min) > Number(max) && enabled) return `Максимальное значение меньше минимального`;
    return true;
  },
};
