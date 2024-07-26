<template>
  <v-form ref="form" :disabled="isLook" class="adaptiveGrid mt-5">
    <base-autocomplete      
      v-model="shema.vehicleTypeDetails.vehicleLayoutPatternText"
      :items="NSI_050"
      label="Схема компоновки транспортного средства*"
      max-length="250"
      chips
      multiple
      class="full"
    ></base-autocomplete>

    <base-constructor-one-element
      v-slot="props"
      v-model="shema.vehicleTypeDetails.vehicleEquipmentText"
      class="full"
      :disabled="isLook"
    >
      <base-textarea
        v-model="shema.vehicleTypeDetails.vehicleEquipmentText[props.index]"
        label="Оборудование транспортного средства"
      >
      </base-textarea>
    </base-constructor-one-element>

    <base-autocomplete
      label="Расположение двигателя*"
      :items="NSI_047"
      multiple
      chips
      max-length="1000"
      class="full"
    ></base-autocomplete>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseConstructorOneElement from '@/components/base/BaseConstructorOneElement.vue'

import { useIndexDBStore } from '@/stores/indexDBStore'
import { useShemaStore } from '@/stores/shemaStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const shema = useShemaStore().getShema //схема
const indexDB = useIndexDBStore() // для работы с IndexDB
const form = ref(null) // ссылка на форму
const isLook = computed(() => route.query.look != null)

const NSI_017 = ref([])
const NSI_047 = ref([])
const NSI_050 = ref([])

async function load() {
  NSI_017.value = (await indexDB.getFromDatabase('catalog', 'NSI_017')) || []
  NSI_047.value = (await indexDB.getFromDatabase('catalog', 'NSI_047')) || []
  NSI_050.value = (await indexDB.getFromDatabase('catalog', 'NSI_050')) || []
}
load()
</script>
