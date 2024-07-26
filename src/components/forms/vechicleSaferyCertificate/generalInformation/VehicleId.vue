<template>
  <v-form ref="form" class="adaptiveGrid mt-5" :disabled="isLook">
    <base-checkbox
      v-model="shema.vehicleTypeDetails.factoryNumberIndicator"
      label="Заводской номер"
      class="full mb-5"
      @change="onChange"
    ></base-checkbox>

    <base-textfield
      v-if="shema.vehicleTypeDetails.factoryNumberIndicator"
      v-model="shema.vehicleTypeDetails.vehicleFactoryNumberId"
      label="Заводской номер"
      class="full"
    ></base-textfield>

    <template v-else>
      <base-textfield
        v-model="shema.vehicleTypeDetails.vehicleIdentificationNumberId"
        label="Идентификационный номер*"
        :rules="
          shema.vehicleTypeDetails.validationVehicleIdentityNumberIndicator
            ? []
            : [rules.identityNumberValidator]
        "
        class="full"
      ></base-textfield>

      <base-checkbox
        v-model="shema.vehicleTypeDetails.validationVehicleIdentityNumberIndicator"
        label="VIN номер, не соответствующий 17-разрядной кодировке"
        class="full"
      ></base-checkbox>

      <p class="full title">Маркировка</p>

      <div class="full" style="margin: auto; max-width: 100%">
        <BaseConstructorOneElement
          v-slot="props"
          v-model="shema.vehicleTypeDetails.vehicleLabelingDetails"
          :disabled="isLook"
          :default-data="shemaDefault.vehicleTypeDetails.vehicleLabelingDetails"
        >
          <base-squares
            :items="
              shema.vehicleTypeDetails.vehicleLabelingDetails[props.index]
                .vehicleIdentificationNumberId
            "
            class="full mb-5"
          ></base-squares>
        </BaseConstructorOneElement>
      </div>
    </template>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseSquares from '@/components/base/BaseSquares.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'
import { rules } from '@/components/forms/vechicleSaferyCertificate/rules'
import shemaDefault from '@/components/forms/vechicleSaferyCertificate/shemaDefault'
const route = useRoute()
const shema = useShemaStore().getShema //схема
const form = ref(null) // ссылка на форму

const isLook = computed(() => route.query.look != null)

function onChange() {
  // маркировка
  shema.vehicleTypeDetails.vehicleLabelingDetails.length = 1
  shema.vehicleTypeDetails.vehicleLabelingDetails[0] =
    shemaDefault.vehicleTypeDetails.vehicleLabelingDetails[0]

  //чексбокс в дефолтное значение
  shema.vehicleTypeDetails.validationVehicleIdentityNumberIndicator =
    shemaDefault.vehicleTypeDetails.validationVehicleIdentityNumberIndicator

  //идентификационыый номер в дефолтное значение
  shema.vehicleTypeDetails.vehicleIdentificationNumberId =
    shemaDefault.vehicleTypeDetails.vehicleIdentificationNumberId
}
// для того что бы метод был доступен у родителя
defineExpose({
  async isValidation() {
    const { valid } = await form.value.validate()
    return valid
  }
})
</script>
