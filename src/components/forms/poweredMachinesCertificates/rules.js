export const rules = {
  vehicleTyreKindSize: (value) => {
    if (value.filter((e) => e).length < 2) {
      return 'Если  указан "Признак оси колес со сдвоенными шинами", должно быть не менее 2-ух размерностей'
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
  }
}
