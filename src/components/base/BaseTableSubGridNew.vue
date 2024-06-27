<template>
  <div class="wrapper">
    <div class="tableGrid">
      <div :key="tableHeaderKey" class="tableFixHead">
        <div class="fixPos">
          <v-tooltip text="Настройки таблицы" location="top">
            <template #activator="{ activatorProps }">
              <v-btn
                v-bind="activatorProps"
                icon="mdi-tune-variant"
                rounded="0"
                variant="text"
                height="100%"
                class="cell"
                @click="isOpen = true"
              ></v-btn>
            </template>
          </v-tooltip>

          <div v-for="(fh, index) in fixHeader" :key="fh.elem.text" class="headCell">
            <div class="headPin">
              <img src="@/assets/png1.png" width="40" class="pin" @click="removeFixed(index)" />
            </div>

            <span class="headText">{{ fh.elem.text }}</span>

            <label class="headSort">
              <input
                type="checkbox"
                name="selectingTableRow"
                :value="index"
                @click.self="(e) => sorting(fh, e.target)"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z"
                />
              </svg>
            </label>
          </div>
        </div>

        <div v-for="(hh, index) in header" :key="index" class="headCell">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="headPin"
            @click="addFixed(index)"
          >
            <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
          </svg>

          <span class="headText">{{ hh.text }}</span>

          <label class="headSort">
            <input
              type="checkbox"
              name="selectingTableRow"
              :value="index"
              @click.self="(e) => sorting(hh, e.target)"
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" />
            </svg>
          </label>
        </div>
      </div>

      <div v-if="tableData.length == 0" class="tableNoData">
        <v-icon size="30" icon="mdi-select-search"></v-icon>
        <span> Данные отсутствуют</span>
      </div>

      <div v-else class="tableContent">
        <label
          v-for="(item, index) in tableData"
          :key="index"
          :class="{ selection: item.id == tableRowSelectedID }"
          class="row"
        >
          <div class="fixPos">
            <div class="cell">
              <input
                :id="item.id"
                v-model="tableRowSelectedID"
                type="radio"
                name="selectingTableRow"
                :value="item.id"
                @click="(e) => selectingTableRow(e, item)"
              />
            </div>
            <span v-for="fixHeaderItem in fixHeader" :key="fixHeaderItem.el" class="cell">
              <!-- {{ item[fixHeaderItem.elem.value] }} -->
              {{ valueFromPatch(item, fixHeaderItem.elem.value) }}
            </span>
          </div>

          <span
            v-for="headerItem in header"
            :key="headerItem.value"
            class="cell"
            :class="checkClass(item)"
          >
            <!-- {{ item[headerItem.value] }} -->
            {{ valueFromPatch(item, headerItem.value) }}
          </span>
        </label>
      </div>
    </div>

    <base-modal
      v-model:isOpen="isOpen"
      title="Настройки"
      ok-title="Снять все выделения"
      :ok-function="removeActiveCheckboxes"
      :is-close-after-click="false"
      cancel-title="применить"
    >
      <div>
        <base-checkbox
          v-for="(item, index) in additionalHeaders"
          :key="index"
          v-model="item.model"
          :label="item.text"
          @change="modifateColumnsTable(item)"
        ></base-checkbox>
      </div>
    </base-modal>

    <div class="pagination">
      <div class="itemBottom">
        <span>Строк на странице</span>
        <div class="pagination-select">
          <input :value="size" readonly class="pagination-select__input" @click="showSize = true" />
          <div v-show="showSize" role="listbox" class="pagination-select__listbox">
            <div
              v-for="item in sizes"
              :key="item"
              role="option"
              class="pagination-select__option"
              :class="{ active: item == size }"
              @click="modificationSize(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <div class="itemBottom">
        <span v-if="tableData.length > 0">
          {{ countNotesStart }}-{{ countNotesEnd }} из {{ totalCount }}
        </span>
        <span v-else> &mdash; </span>
      </div>

      <span class="itemBottom">
        <v-btn
          class="pagination-icon"
          variant="tonal"
          icon="mdi-chevron-double-left"
          :disabled="page < 1"
          @click="clicksPagination(0)"
        >
        </v-btn>

        <v-btn
          class="pagination-icon"
          variant="tonal"
          icon="mdi-chevron-left"
          :disabled="page < 1"
          @click="clicksPagination(props.page - 1)"
        >
        </v-btn>

        <v-btn
          class="pagination-icon"
          variant="tonal"
          icon="mdi-chevron-right"
          :disabled="page + 1 >= countPage"
          @click="clicksPagination(props.page + 1)"
        >
        </v-btn>

        <v-btn
          class="pagination-icon"
          variant="tonal"
          icon="mdi-chevron-double-right"
          :disabled="page + 1 >= countPage"
          @click="clicksPagination(countPage - 1)"
        >
        </v-btn>
      </span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineEmits, onMounted, defineProps, computed } from 'vue'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  pathToStatus: { type: String, required: true }, // путь для статуса
  tableHeaders: { type: Array, required: true }, // массив заголовков таблицы
  additionalTableHeaders: { type: Array, required: true }, // дополнительный массив заголовков таблицы при вызове меню "Настройки"
  // данные для таблицы + данные пагинации
  tableDataAndPagination: {
    type: Object,
    default() {
      return { result: [] }
    }
  }
})

const isOpen = ref(false) // модальное окно "Настройки"
const tableRowSelectedID = ref('') // id выбранной строки
const showSize = ref(false) //открытие меню выбора количества строк таблицы на одной странице
const sizes = [5, 10, 15, 20, 50]
const fixHeader = reactive([]) //фиксированые заголовки

let header = reactive(JSON.parse(JSON.stringify(props.tableHeaders))) //заголовки для таблицы
// дополнительные заголовки для таблицы при открытии модального окна "Настройки"
const additionalHeaders = reactive(JSON.parse(JSON.stringify(props.additionalTableHeaders)))

const emit = defineEmits(['find', 'update:tableRowSelect'])
const tableHeaderKey = ref(0) // ключ который меняется для перерисовки заголовка таблицы
let size = defineModel('size', { type: Number, required: true }) //количество строк на одной странице
let page = defineModel('page', { type: Number, required: true }) // текущая страница
const tableRowSelect = defineModel('tableRowSelect', { type: Object, required: true }) // выбранная строка таблицы
// количество записей при текущей страницы пагинации(начало отрезка)
const countNotesStart = computed(() => {
  const count = page.value * size.value
  return count == 0 ? 1 : count
})
// количество записей при текущей страницы пагинации(конец отрезка)
const countNotesEnd = computed(() => {
  const count = size.value + page.value * size.value
  return count > totalCount.value ? totalCount : count
})
const tableData = computed(() => {
  return props.tableDataAndPagination?.result || [] // получаем данные для таблицы
})
const totalCount = computed(() => props.tableDataAndPagination?.totalCount || 0) // всего записей
const countPage = computed(() => Math.ceil(totalCount.value / size.value)) // всего страниц

function addFixed(index) {
  const del = header.splice(index, 1)
  fixHeader.push({ elem: del[0], index: index })

  const el = document.querySelector('.tableGrid')
  const cyrrentFixColumns = getComputedStyle(el).getPropertyValue('--countFixColumns')
  el.style.setProperty('--countFixColumns', +cyrrentFixColumns + 1)
}
function removeFixed() {
  const removeElemet = fixHeader.pop()
  header.splice(removeElemet.index, 0, removeElemet.elem)

  const el = document.querySelector('.tableGrid')
  const cyrrentFixColumns = getComputedStyle(el).getPropertyValue('--countFixColumns')
  el.style.setProperty('--countFixColumns', +cyrrentFixColumns - 1)
}
function selectingTableRow(e, item) {
  if (tableRowSelectedID.value == e.target.id) {
    e.target.checked = false
    tableRowSelectedID.value = ''
    tableRowSelect
    emit('update:tableRowSelect', {})
  } else {
    emit('update:tableRowSelect', item)
  }
}
function sorting(item, e) {
  if (e.checked) {
    tableData.value.sort(function (a, b) {
      console.log(a, b)
      const valueA = eval(`a.${Array.isArray(item.value) ? item.value[0] : item.value}`) || ''
      const valueB = eval(`b.${Array.isArray(item.value) ? item.value[0] : item.value}`) || ''
      return valueA == valueB ? 0 : valueA > valueB ? 1 : -1
    })
  } else {
    tableData.value.sort(function (a, b) {
      console.log(a, b)
      const valueA = eval(`a.${Array.isArray(item.value) ? item.value[0] : item.value}`) || ''
      const valueB = eval(`b.${Array.isArray(item.value) ? item.value[0] : item.value}`) || ''
      return valueA == valueB ? 0 : valueA < valueB ? 1 : -1
    })
  }
}
function modificationSize(index) {
  showSize.value = false
  size.value = index
  page.value = 0 //при изменении количество отображаемых строк, переходим на первую страницу
  emit('find')
}

function clicksPagination(newPage) {
  tableRowSelectedID.value = ''
  emit('update:tableRowSelect', {})
  page.value = newPage
  // emit('update:page', newPage)
  emit('find')
}
function valueFromPatch(item, patch) {
  let value = '' //возвращаемое значение

  if (Array.isArray(patch)) {
    patch.forEach((patchItem) => {
      value = value + ' ' + valueUseEval(item, patchItem)
    })
  } else {
    value = valueUseEval(item, patch)
  }

  //Если рузультирующее значение массив
  if (Array.isArray(value)) {
    const str = value.join()
    return str.replace(/,/gi, ', ')
  }
  return value.trim()
}

function valueUseEval(item, patch) {
  try {
    return eval(`item.${patch}`) || ''
  } catch {
    return ''
  }
}

function modifateColumnsTable(item) {
  const el = document.querySelector('.tableGrid')
  if (item.model) {
    header.push(item)
  } else {
    header = header.filter((i) => i.id !== item.id)
  }
  const length = header.length + fixHeader.length

  el.style.setProperty('--countColumns', length)
  tableHeaderKey.value = length // для перерисовки таблицы
}

function removeActiveCheckboxes() {
  for (let i = 0; i < additionalHeaders.length; i++) {
    additionalHeaders[i].model = false
    modifateColumnsTable(additionalHeaders[i])
  }
}
function checkClass(item) {
  item ? '' : console.log('no item')

  if (!props.pathToStatus) return ''
  const status = eval(`item.${props.pathToStatus}`)
  if (status === 'Действующий') return 'greenText'
  else if (status === 'На утверждении') return 'orangeText'
  else if (status === 'Незавершенный') return 'blueText'
}

onMounted(() => {
  const el = document.querySelector('.tableGrid')
  el.style.setProperty('--countColumns', header.length)
})
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-color: #2c4957;
  border: 1px solid;
  border-top: none;
  height: 100%;
  max-height: calc(85vh + 3px);
}
.wrapper::after {
  content: '';
  width: calc(100% + 2px);
  height: 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid;
  position: absolute;
  z-index: 1;
  right: -1px;
  top: 0px;
}

.headPin,
.headSort {
  width: 22px;
  height: 22px;
  position: relative;
  left: -2px;
}
.headText {
  grid-area: 1/2/-1/-1;
  margin-right: 5px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
}

.headSort {
  align-self: flex-end;
}
.headCell {
  display: grid;
  grid-template-columns: 17px 1fr;
  grid-template-rows: 25px 1fr;
  align-items: center;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.tableGrid {
  height: 100%;
  --countFixColumns: 2;
  --countColumns: 8;
  display: grid;
  grid-template-columns: 42px repeat(var(--countColumns), auto);
  grid-template-rows: auto 1fr;
  padding-top: 16px;
  overflow: auto;
  scrollbar-width: thin;
}

.tableFixHead {
  top: 0px;
  position: sticky;
  z-index: 2;
  text-align: center;
  font-weight: bold;
  box-shadow: 0px 2px 4px -1px rgba(0, 1, 6, 0.35);
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: subgrid;
  background-color: #dbdbdb;
}
.tableContent {
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: subgrid;
  align-content: flex-start;
}
.tableNoData {
  grid-column: 1/-1;
  justify-self: center;
  align-self: center;
}
.pin {
  width: 35px;
  margin: -15px 0px 0px -10px;
  position: absolute;
  transform: rotate(-15deg);
  /* animation: fade2 0.3s ease-in forwards; */
}
.cell {
  border-bottom: 1px solid;
  border-right: 1px solid;
  padding: 0px 5px;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  min-height: 34px;
}
.cell:last-child,
.headCell:last-child {
  border-right: none;
}
.row {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  z-index: 1;
}
.row:hover,
.selection {
  background-color: #dbdbdb;
}

.fixPos {
  grid-column: 1 / var(--countFixColumns);
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: subgrid;
  position: sticky;
  left: 0px;
  z-index: 3;
  background-color: #dbdbdb;
  border-right: 1px solid;
}

/* checkbox */
input[type='radio'] {
  width: 0px;
  margin: -8px 24px 0px 0px;
}
input[type='checkbox'] {
  display: none;
}
input[type='radio']::before {
  content: '';
  display: block;
  width: 22px;
  height: 22px;
  margin: auto;
  border: 2px solid #686d70;
  border-radius: 0.25em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 77%;
}

input[type='radio']:checked::before {
  border-color: #686d70;
  background-color: #546e7a;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
svg {
  opacity: 0.34;
  fill: #455a64;
  transition: transform 0.2s;
}
svg:hover {
  opacity: 1;
}
input[type='checkbox']:checked + svg {
  transform: rotate(-180deg);
}

/* пагинация */
.pagination {
  height: 40px;
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 0px 5px;
  justify-content: flex-end;
  align-items: center;
  background-color: #dbdbdb;
  font-size: 15px;
  font-weight: 450;
  user-select: none;
  color: rgba(0, 0, 0, 0.75);
  border-top: 1px solid;
}
.pagination-icon {
  width: 40px;
  height: 30px;
  background-color: #546e7a;
  color: #dbdbdb;
  border-radius: 4px;
}
.itemBottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 90px;
}
.pagination-select {
  position: relative;
  /* width: 30px; */
  padding: 5px;
}
.pagination-select__input {
  width: 45px;
  height: 30px;
  text-align: center;
  position: relative;
  padding: 0px 3px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.75);
}
.pagination-select__listbox {
  left: -4px;
  bottom: 5px;
  position: absolute;
  contain: content;
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: white;
  z-index: 3;
}
.pagination-select__option {
  padding: 11px 22px;
  text-align: center;
  color: #546e7a;
}
.pagination-select__option:hover {
  background-color: #e7e7e7;
}
.active {
  color: #000000;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  background-color: #e7e7e7;
}
/* строки таблицы с зависимости от статуса */
.greenText {
  color: #459e15;
}
.orangeText {
  color: #d18007;
}
.blueText {
  color: #5c89d6;
}
@keyframes fade2 {
  from {
    transform: translate3d(0%, 0px, 0);
  }
  30% {
    transform: translate3d(3px, -3px, 0) rotate(20deg);
  }
  50% {
    transform: rotate(140deg);
  }
  to {
    transform: translate3d(0px, 60vh, 0);
  }
}
</style>
