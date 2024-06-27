<template>
  <div>
    <base-is-missing
      v-model="shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].notTransmissionUnit"
      v-model:data="shema.vehicleVariantDetails[0].vehicleRunningGearDetails"
      :default-data="shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails"
      label="Трансмиссия - отсутствует"
    >
      <base-autocomplete
        v-model="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].vehicleTransmissionText
        "
        label="Тип трансмиссии*"
        :items="NSI_058"
        max-length="1000"
        multiple
        :rules="[conformityRules.vehicleTransmissionText]"
        class="full"
      ></base-autocomplete>

      <base-constructor
        v-model="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].transmissionUnitDetails
        "
        :filter-data="
          shema.vehicleVariantDetails[0].vehicleRunningGearDetails[0].transmissionUnitDetails
        "
        :default-data="
          shemaDefault.vehicleVariantDetails[0].vehicleRunningGearDetails[0]
            .transmissionUnitDetails[0]
        "
        class="full"
      >
        <template #label="props">
          {{
            !props.item.vehicleUnitKindCode ||
            (!NSI_018.find((e) => e.key === props.item.vehicleUnitKindCode) &&
              !NSI_018.find((e) => e.title === props.item.vehicleUnitKindCode))
              ? 'Узел трансмиссии'
              : props.item.vehicleUnitKindCode.length === 2
                ? NSI_018.find((e) => e.key === props.item.vehicleUnitKindCode).title
                : props.item.vehicleUnitKindCode
          }}
        </template>
        <template #default="props">
          <base-autocomplete
            v-if="
              (props.item.vehicleUnitKindCode && props.item.vehicleUnitKindCode.length === 2) ||
              docStatus === 'Черновик' ||
              !docStatus
            "
            v-model="props.item.vehicleUnitKindCode"
            label="Узел*"
            :items="NSI_018"
            item-value="key"
            class="full"
          ></base-autocomplete>

          <base-autocomplete
            v-else
            v-model="props.item.vehicleUnitKindCode"
            label="Узел*"
            :items="NSI_018"
            item-value="title"
            class="full"
          ></base-autocomplete>

          <template v-if="!!props.item.vehicleUnitKindCode.indexOf('20')">
            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('05')"
              id="transmissionTypeVehicleComponentText"
              v-model="props.item.vehicleComponentText"
              label="Описание конструктивных особенностей (типа) коробки передач*"
              :items="NSI_053"
              :rules="[conformityRules.transmissionTypeVehicleComponentText]"
              class="full"
            ></base-autocomplete>

            <base-textfield
              v-if="!props.item.vehicleUnitKindCode.indexOf('10')"
              id="transferCaseType"
              v-model="props.item.vehicleComponentText"
              label="Описание конструктивных особенностей (типа) раздаточной коробки*"
              :rules="[conformityRules.transferCaseType]"
              class="full"
            ></base-textfield>

            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('15')"
              v-model="props.item.vehicleComponentText"
              label="Описание конструктивных особенностей (типа) главной передачи*"
              :items="NSI_051"
              :rules="[conformityRules.mainGearType]"
              class="span6"
            ></base-autocomplete>

            <base-autocomplete
              v-if="!props.item.vehicleUnitKindCode.indexOf('15')"
              v-model="props.item.axisDistribution"
              label="Распределение по осям"
              :items="NSI_026"
              class="span6"
            ></base-autocomplete>

            <base-textfield
              v-model="props.item.vehicleComponentMakeName"
              label="Марка"
              class="span6"
            ></base-textfield>

            <base-combobox
              v-model="props.item.vehicleComponentModelCode"
              label="Маркировка"
              class="span6"
            ></base-combobox>

            <base-textfield
              id="transmissionUnitGearForwardQuantity"
              v-model="props.item.transmissionUnitGearQuantity"
              type="number"
              label="Количество передач*"
              class="span6"
            ></base-textfield>
          </template>
        </template>
      </base-constructor>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseConstructor from '@/components/base/BaseConstructor.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'

const indexDB = useIndexDBStore() // для работы с IndexDB
const shema = useShemaStore().shema //схема

const docStatus = computed(() => shema.conformityDocStatusDetails.docStatus)
const NSI_018 = ref([])
const NSI_026 = ref([])
const NSI_051 = ref([])
const NSI_053 = ref([])
const NSI_058 = ref([])

async function load() {
  NSI_018.value = (await indexDB.getFromDatabase('catalog', 'NSI_018')) || []
  NSI_026.value = (await indexDB.getFromDatabase('catalog', 'NSI_026')) || []
  NSI_051.value = (await indexDB.getFromDatabase('catalog', 'NSI_051')) || []
  NSI_053.value = (await indexDB.getFromDatabase('catalog', 'NSI_053')) || []
  NSI_058.value = (await indexDB.getFromDatabase('catalog', 'NSI_058')) || []
}
load()
</script>
