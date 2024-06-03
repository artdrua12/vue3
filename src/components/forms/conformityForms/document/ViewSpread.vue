<template>
  <div class="adaptiveGrid">
    <base-checkbox
      v-model="shema.series"
      label="На серийно выпускаемую продукцию"
      :disabled="shema.party.partyValue"
      class="full"
    ></base-checkbox>

    <base-is-missing
      v-model="shema.party.partyValue"
      v-model:data="shema.unifiedCommodityMeasure"
      label="На партию транспортных средств"
      :disabled="shema.series"
      :default-data="shemaDefault.unifiedCommodityMeasure"
      invert
      class="full"
      @change="change"
    >
      <base-textfield
        id="unifiedCommodityMeasure"
        v-model="shema.unifiedCommodityMeasure.value"
        label="Количество штук в партии*"
        type="number"
        :rules="[conformityRules.unifiedCommodityMeasure]"
        class="span6"
      ></base-textfield>

      <base-autocomplete
        v-model="shema.unifiedCommodityMeasure.measurementUnitCode.measurementUnitCodeListId"
        label="Ед. измерения"
        :items="NSI_033"
        item-text="key"
        item-value="key"
        class="span6"
      ></base-autocomplete>

      <base-is-missing
        v-model="shema.party.smallParty.smallPartyValue"
        v-model:data="shema.party.smallParty"
        label="Малая партия"
        :disabled="shema.series"
        :default-data="shemaDefault.party.smallParty"
        invert
        class="full"
      >
        <p class="title full mb-3">Диапазон VIN</p>
        <base-textfield
          v-model="shema.party.smallParty.vinNumber.constant"
          label="VIN (Постоянная часть)"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="shema.party.smallParty.vinNumber.numberWith"
          label="VIN Производственный номер с"
          class="span6"
        ></base-textfield>

        <base-textfield
          v-model="shema.party.smallParty.vinNumber.numberBy"
          label="VIN Производственный номер по"
          class="span6"
        ></base-textfield>

        <base-combobox
          v-model="shema.party.smallParty.vinNumber.vin"
          label="VIN"
          class="span6"
        ></base-combobox>
      </base-is-missing>
    </base-is-missing>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shema from '@/components/forms/conformityForms/shema'
import shemaDefault from '@/components/forms/conformityForms/shemaDefault'
import { conformityRules } from '../rules'
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
const indexDB = useIndexDBStore()
const NSI_033 = ref([])

function change() {
  if (shema.unifiedCommodityMeasure) {
    shema.party.smallParty.smallPartyValue = false
  }
}
async function load() {
  NSI_033.value = (await indexDB.getFromDatabase('catalog', 'NSI_033')) || []
}
load()
</script>
