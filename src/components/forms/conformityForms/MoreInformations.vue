<template>
  <div class="adaptiveGrid">
    <base-is-missing
      v-model="shema.vehicleTypeDetails.vehicleUseRestrictionIndicator"
      v-model:data="shema.vehicleTypeDetails.vehicleUseRestrictionText"
      label="Наличие ограничений использования ТС"
      :default-data="['']"
      invert
    >
      <base-constructor-one-element
        v-slot="props"
        v-model:data="shema.vehicleTypeDetails.vehicleUseRestrictionText"
        default-data=""
        class="full"
      >
        <base-textarea
          v-model="shema.vehicleTypeDetails.vehicleUseRestrictionText[props.index]"
          label="Ограничения на возможность использования на дорогах общего пользования"
          class="full"
        ></base-textarea>
      </base-constructor-one-element>
    </base-is-missing>

    <base-constructor-one-element
      v-slot="props"
      v-model:data="shema.vehicleTypeDetails.vehicleUseRestrictionShipping"
      default-data=""
      class="full"
    >
      <base-textarea
        v-model="shema.vehicleTypeDetails.vehicleUseRestrictionShipping[props.index]"
        label="Ограничения для перевозки опасных грузов, пищевых продуктов и т.д."
        class="full"
      ></base-textarea>
    </base-constructor-one-element>

    <base-checkbox
      v-if="isConformityDocKindCode_Not35"
      v-model="shema.vehicleTypeDetails.vehicleRoutingIndicator"
      label="Признак маршрутного ТС"
      class="full"
    ></base-checkbox>

    <base-checkbox
      v-model="shema.vehicleTypeDetails.vehicleMovementPermitIndicator"
      label="Признак обязательности оформления специального разрешения"
      class="full"
    ></base-checkbox>

    <base-autocomplete
      v-model="shema.vehicleTypeDetails.preferentialManufacturingModeText"
      label="Сведения о производстве с применением льготного режима производства"
      :items="NSI_067"
      class="full mt-5"
    ></base-autocomplete>

    <base-checkbox
      v-if="isConformityDocKindCode_Not35"
      v-model="shema.vehicleTypeDetails.isNotRequiredVehicleEmergencyCallDeviceIndicator"
      label="Возможность оформления ЭПТС без УВЭОС"
      :disabled="
        shema.vehicleTypeDetails.addInfoIndicator
        // || !shema.vehicleTypeDetails.docId.match(/^ТС /)
      "
      class="full"
    >
    </base-checkbox>

    <base-checkbox
      v-if="isConformityDocKindCode_Not35"
      v-model="shema.vehicleTypeDetails.addInfoIndicator"
      :label="emergencyCallDeviceFree"
      :disabled="
        shema.vehicleTypeDetails.isNotRequiredVehicleEmergencyCallDeviceIndicator
        // || !shema.vehicleTypeDetails.docId.match(/^ТС /)
      "
      class="full"
      @change="onChange"
    ></base-checkbox>

    <base-constructor-one-element
      v-slot="props"
      v-model:data="shema.vehicleTypeDetails.addInfo"
      default-data=""
      class="full mt-5"
    >
      <base-textarea
        v-model="shema.vehicleTypeDetails.addInfo[props.index]"
        label="Прочая информация"
        class="full"
        :disabled="props.index == 0 && isEmergencyCallDeviceFree"
      ></base-textarea>
    </base-constructor-one-element>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import shema from '@/components/forms/shema'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing2.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore()

const NSI_067 = ref([])
const emergencyCallDeviceFree =
  'Без применения пункта 13-1 Технического регламента, пунктов 113 и 114 приложения N 2 к Техническому регламенту и пунктов 16 и 17 приложения N 3 к Техническому регламенту.'

const isConformityDocKindCode_Not35 = computed(() => {
  return shema.vehicleTypeDetails.conformityDocKindCode !== '35'
})
// проверяем содержится ли в первом элементе массива emergencyCallDeviceFree
const isEmergencyCallDeviceFree = computed(() => {
  return shema.vehicleTypeDetails.addInfo[0].match(emergencyCallDeviceFree)
})

// добавляем в первый элементе массива emergencyCallDeviceFree
function onChange() {
  if (shema.vehicleTypeDetails.addInfoIndicator && !isEmergencyCallDeviceFree.value) {
    //если checkbox=true и emergencyCallDeviceFree нет в первом элементе массива - добавляем
    shema.vehicleTypeDetails.addInfo.unshift(emergencyCallDeviceFree)
  } else if (!shema.vehicleTypeDetails.addInfoIndicator && isEmergencyCallDeviceFree.value) {
    //если checkbox=false и emergencyCallDeviceFree есть в первом элементе массива - удаляем
    shema.vehicleTypeDetails.addInfo.shift()
  }
}

async function load() {
  NSI_067.value = await indexDB.getFromDatabase('catalog', 'NSI_067')
}
load()
</script>
