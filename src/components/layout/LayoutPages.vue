<template>
  <div class="layoutPages">
    <base-panel class="baseSearch" elevation="3" props-panel="1">
      <template #title>{{ props.title }}</template>
      <div class="layoutPagesForm">
        <component
          :is="getComponent(item.type)"
          v-for="(item, index) in props.fields"
          :key="index"
          v-model="item.value"
          :style="{
            'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
          }"
          :label="item.label"
          :addition-data="item.additionData"
          :items="item.items"
          :item-text="item.text"
          :item-value="item.itemValue"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          @update:enter="find"
        ></component>

        <base-panel
          v-if="JSON.parse(JSON.stringify(props.fieldsMore)) !== '{}'"
          class="fullWidth"
          elevation="3"
        >
          <div class="layoutPagesForm mt-3">
            <component
              :is="getComponent(item.type)"
              v-for="(item, index) in props.fieldsMore"
              :key="index"
              v-model="item.value"
              :style="{
                'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
              }"
              :label="item.label"
              :addition-data="item.additionData"
              :items="item.items"
              :item-text="item.text"
              :item-value="item.itemValue"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              @update:enter="find"
            ></component>
          </div>
        </base-panel>
      </div>
      <div class="fullWidth base-button">
        <v-btn
          prepend-icon="mdi-close-circle"
          color="red"
          size="small"
          class="rounded-0"
          variant="tonal"
        >
          Очистить форму
        </v-btn>
        <v-btn
          append-icon="mdi-magnify"
          width="120px"
          color="#546e7a"
          size="small"
          elevation="3"
          class="rounded-0"
          @click="find"
        >
          Поиск
        </v-btn>
      </div>
    </base-panel>
    <div class="base-action elevation-5">
      <base-panel props-panel="1">
        <template #title>Выбор действия</template>
        <base-threeview :selected="tableRowSelect"></base-threeview>
      </base-panel>
    </div>
    <base-table
      v-model:size="size"
      v-model:page="page"
      v-model:tableRowSelect="tableRowSelect"
      class="base-table"
      @find="find"
    ></base-table>
  </div>
</template>

<script setup>
import BaseTextfield from '@/components/base/BaseTextfield.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseThreeview from '@/components/base/BaseThreeview.vue'
import BaseTable from '@/components/base/BaseTableSubGrid.vue'
import BaseDatefield from '@/components/base/BaseDatefield.vue'
import BaseAutocomplete from '@/components/base/BaseAutocomplete.vue'
import BaseSlot from '@/components/base/BaseSlot.vue'
import BasePanel from '@/components/base/BasePanel.vue'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  // поля для поиска (основные)
  fields: {
    type: Object,
    required: true
  },
  // поля для поиска (дополнительные)
  fieldsMore: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  }
})
const emit = defineEmits(['find']) // событие для запуска поиска

const allComponents = {
  BaseThreeview,
  BaseTable,
  BaseDatefield,
  BaseAutocomplete,
  BaseTextfield,
  BaseCheckbox,
  BaseSlot,
  BasePanel
}

const tableRowSelect = ref({}) // выбранная строка из таблицы
let size = ref(5) //количество строк на одной странице
let page = ref(0) // текущая страница в пагинации

function find() {
  emit('find', { page: page.value, size: size.value })
}
function getComponent(type) {
  return allComponents[type]
}
</script>

<style scoped>
.layoutPages {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: auto 1fr;
  gap: 5px 20px;
  padding: 10px 5px 15px 20px;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;
  overflow-x: hidden;
  /* резервирует место под скролл */
  scrollbar-gutter: stable;
}
.baseForm {
  width: 100%;
}
.base-search {
  grid-area: 1/1/2/2;
}
.base-action {
  grid-area: 1/2/-1/3;
  overflow: hidden;
  max-height: 90vh;
  z-index: 1;
  position: absolute;
  right: 23px;
  width: 400px;
}
.base-table {
  grid-area: 2/1/3/-1;
  z-index: 0;
}
.base-button {
  display: flex;
  justify-content: space-between;
}
.fullWidth {
  grid-column: 1/-1;
}
.layoutPagesForm {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 22px;
  padding: 12px 24px 10px 24px;
}
@media (max-width: 1200px) {
  .layoutPagesForm {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
