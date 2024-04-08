<template>
  <layout-forms v-model:data="data"></layout-forms>
</template>

<script setup>
import { reactive } from 'vue'
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
            type: 'BaseAutocomplite',
            items: [],
            text: 'name',
            itemValue: 'type'
          },
          docId: {
            label: 'Номер документа*',
            width: '6',
            value: '',
            type: 'BaseTextField'
          },
          conformityDocKindName: {
            label: 'Наименование вида документа об оценке соответствия',
            width: '6',
            value: '',
            type: 'BaseAutocomplite',
            items: [],
            text: 'name',
            itemValue: 'type'
          },
          docCreationDate: {
            label: 'Дата оформления бумажного ОТТС',
            width: '6',
            value: '',
            type: 'BaseDateField'
          },
          docStartDate: {
            label: 'Дата начала срока действия документа*',
            width: '6',
            value: '',
            type: 'BaseDateField'
          },
          docValidityDate: {
            label: 'Дата истечения срока действия документа*',
            width: '6',
            value: '',
            type: 'BaseDateField'
          },
          formNumberId: {
            label: 'Номер бланка документа',
            width: '6',
            value: '',
            type: 'BaseTextField'
          },
          formAdditionalNumberId: {
            label: 'Номер бланка дополнительного листа',
            width: '6',
            value: '',
            type: 'BaseTextField'
          },
          objectOrdinal: {
            label: 'Приложение к документу',
            width: 'all',
            type: 'BaseRecursiveConstructor',
            constructorFields: [
              {
                objectOrdinal: {
                  label: 'Номер приложения',
                  width: '3',
                  value: '',
                  type: 'BaseTextField'
                },
                pageQuantity: {
                  width: '3',
                  label: 'Количество листов',
                  value: '',
                  type: 'BaseTextField'
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
            type: 'BaseDateField'
          },
          dateType: {
            label: 'Дата истечения срока действия документа*',
            width: '2',
            value: '',
            type: 'BaseDateField'
          },
          formNumberMain: {
            label: 'Номер бланка документа',
            width: '6',
            value: '',
            type: 'BaseDateField'
          },
          startDate2: {
            label: 'Начальная дата',
            width: '6',
            value: '',
            type: 'BaseDateField'
          },
          endDate2: {
            label: 'Конечная дата',
            width: '6',
            value: '',
            type: 'BaseDateField'
          },
          noteText: {
            label: 'Примечание',
            width: 'all',
            value: '',
            type: 'BaseDateField'
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
            type: 'BaseIsMissing',
            dataSlot: 'BaseCombobox'
          },

          vehicleCommercialName: {
            label: 'Коммерческое наименование*',
            width: '6',
            type: 'BaseIsMissing',
            dataSlot: 'BaseCombobox'
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
            type: 'BaseIsMissing',
            dataSlot: 'BaseCombobox'
          },

          modificationVirtual: {
            label: 'Виртуальная модификация*',
            width: '6',
            type: 'BaseIsMissing',
            dataSlot: 'BaseTextField'
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
            label:"Код ОКП*",
            width: '6',
            type: 'BaseIsMissing',
            dataSlot: 'BaseCombobox'
          },
          vehicleEcoClassCode3: {
            label: 'Код ТН ВЭД*',
            width: '6',
            type: 'BaseIsMissing',
            dataSlot: 'BaseCombobox'
          }
        }
      },
      {
        title: 'Наименование органа, выдавшего документ',
        id: '#vehicle-details-certification'
      },
      {
        title: 'Заявитель и его адрес',
        id: '#vehicle-details-applicant'
      },
      {
        title: 'Изготовитель и его адрес',
        id: '#vehicle-details-manufacturer'
      },
      {
        title: 'Представители изготовителя и их адрес',
        id: '#vehicle-details-representatives'
      },
      {
        title: 'Сборочный завод и его адрес',
        id: '#vehicle-details-factory'
      },
      {
        title: 'Поставщик сборочных комплектов и его адрес',
        id: '#vehicle-details-provider'
      },
      {
        title: 'Вид распространения',
        id: '#vehicle-details-view'
      },
      {
        title: 'Дополнительная информаци',
        id: '#vehicle-details-additional'
      }
    ]
  },
  {
    title: 'Базовое ТС',
    id: '#base-vehicle'
  },
  {
    title: 'Общие характеристики транспортного средства (Шасси)',
    id: '#vehicle-setting',
    tabs: [
      {
        title: 'Компоновка транспортного средства',
        id: '#vehicle-composition'
      },
      {
        title: 'Ходовая часть ТС',
        id: '#numbers-vheels'
      },
      {
        title: 'Ось транспортного средства',
        id: '#vehicle-axis'
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
