<template>
  <div class="adaptiveGrid">
    <base-autocomplete
      label="Код страны, выдавшей  документ об оценке соответствия колесных транспортных средств"
      :items="unifiedCountryCode"
      item-value="key"
      class="span6"
    ></base-autocomplete>
  </div>
</template>

<script setup>
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseRecursiveConstructor from '@/components/base/BaseRecursiveConstructor.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseIsMissing from '@/components/base/BaseIsMissing.vue'
import BaseIsMissingDisabled from '@/components/base/BaseIsMissingDisabled.vue'
import BaseSlot from '@/components/base/BaseSlot.vue'
import BaseFile from '@/components/base/BaseFile.vue'
import BaseTableForDocuments from '@/components/base/BaseTableForDocuments.vue'
import HistoryDocument from '@/components/base/HistoryDocument.vue'
</script>

<style>
.adaptiveGrid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 12px;
  grid-auto-flow: dense;
  border: none;
  align-items: flex-start;
}
@media (max-width: 1200px) {
  .adaptiveGrid {
    grid-template-columns: repeat(6, 1fr);
  }
}
.span6 {
  grid-column: span6;
}
</style>
