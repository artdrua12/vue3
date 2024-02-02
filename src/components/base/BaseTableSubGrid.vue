<template>
  <div class="wrapper">
    <div class="tableWrapper">
      <div class="fixPosHead">
        <div class="fixPos">
          <span class="cell">
            <v-tooltip text="Настройки" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-tune-variant"
                  variant="text"
                  @click="isOpen = true"
                  size="auto"
                ></v-btn>
              </template>
            </v-tooltip>
          </span>
          <div v-for="(fh, index) in fixHeader" :key="fh.elem.text" class="headCell">
            <div class="headPin">
              <img src="@/assets/png1.png" width="40" class="pin" @click="removeFixed(index)" />
            </div>

            <span class="headText">{{ fh.elem.text }}</span>

            <label class="headSort">
              <input
                type="checkbox"
                name="choice"
                :value="index"
                @click.self="(e) => sortf(fh, e.target)"
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
            @click="addFixed(index)"
            class="headPin"
          >
            <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
          </svg>

          <span class="headText">{{ hh.text }}</span>

          <label class="headSort">
            <input
              type="checkbox"
              name="choice"
              :value="index"
              @click.self="(e) => sortf(hh, e.target)"
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" />
            </svg>
          </label>
        </div>
      </div>

      <label
        class="row"
        v-for="(item, index) in tableData"
        :key="index"
        :class="{ selection: item.f1 == checkedElement }"
      >
        <div class="fixPos">
          <div class="cell">
            <input
              type="radio"
              name="choice"
              v-model="checkedElement"
              :value="item.f1"
              :id="item.f1"
              @click="(e) => choice(e, item)"
            />
          </div>
          <span v-for="f in fixHeader" :key="f.el" class="cell">
            {{ item[f.elem.value] }}
          </span>
        </div>

        <span v-for="h in header" :key="h" class="cell">
          {{ item[h.value] }}
        </span>
      </label>
    </div>

    <base-modal v-model:isOpen="isOpen" title="Настройки">
      <div>
        <base-check-box
          v-for="(item, index) in header"
          :key="index"
          :label="item.text"
        ></base-check-box>
      </div>
    </base-modal>

    <div class="pagination">
      <span class="itemBottom">
        <span>Строк на странице</span>
        <div class="pagination-select">
          <input :value="size" readonly class="pagination-select__input" @click="show = true" />
          <div role="listbox" class="pagination-select__listbox" v-show="show">
            <div
              role="option"
              v-for="item in 5"
              :key="item"
              class="pagination-select__option"
              @click="onChangeSelect(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </span>

      <span v-if="2 > 0">1 из 5 </span>
      <span v-else> &mdash; </span>
      <span class="itemBottom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="45"
          height="30"
          class="icon-pagination"
          :fill="2 < 1 ? '#c6c6c6' : ''"
        >
          <path d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="45"
          height="30"
          class="icon-pagination"
          :fill="2 < 1 ? '#c6c6c6' : ''"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="45"
          height="30"
          class="icon-pagination"
          :fill="2 + 1 >= 3 ? '#c6c6c6' : ''"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="45"
          height="30"
          class="icon-pagination"
          :fill="2 + 1 >= 3 ? '#c6c6c6' : ''"
        >
          <path d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineEmits } from 'vue'
import BaseCheckBox from './BaseCheckBox.vue'
import BaseModal from './BaseModal.vue'
const isOpen = ref(false)
const checkedElement = ref('')
const show = ref(false)
const size = ref(1)
const fixHeader = reactive([])
const header = reactive([
  { text: 'field1 ', value: 'f1' },
  { text: 'field2', value: 'f2' },
  { text: 'field3 dfgasf dhf hasg ', value: 'f3' },
  { text: 'field4', value: 'f4' },
  { text: 'field5', value: 'f5' },
  { text: 'field6', value: 'f6' },
  { text: 'field7', value: 'f7' },
  { text: 'field8', value: 'f8' },
  { text: 'field9', value: 'f9' }
])
const emit = defineEmits(['choise'])

const tableData = reactive([
  {
    f1: 'a1',
    f2: 'a2',
    f3: 'a3',
    f4: 'a4',
    f5: 'a5',
    f6: 'a6',
    f7: 'a7',
    f8: 'a8',
    f9: 'a9'
  },
  {
    f1: 'b1',
    f2: 'b2',
    f3: 'b3',
    f4: 'b4',
    f5: 'b5dasf df as dfa sfasd fd asasasasasasasasasasasasas  adsffffffff adfsdfsdfsdfsdfsdfs',
    f6: 'b6',
    f7: 'b7',
    f8: 'b8',
    f9: 'b9'
  },
  {
    f1: 'c1',
    f2: 'c2',
    f3: 'c3',
    f4: 'c4',
    f5: 'c5',
    f6: 'c6',
    f7: 'c7',
    f8: 'c8',
    f9: 'c9'
  },
  {
    f1: 'd1',
    f2: 'd2',
    f3: 'd3',
    f4: 'd4',
    f5: 'd5',
    f6: 'd6',
    f7: 'd7',
    f8: 'd8',
    f9: 'd9'
  },
  {
    f1: 'e1',
    f2: 'e2',
    f3: 'e3',
    f4: 'e4',
    f5: 'e5',
    f6: 'e6',
    f7: 'e7',
    f8: 'e8',
    f9: 'e9'
  },
  {
    f1: 'f1',
    f2: 'f2',
    f3: 'f3',
    f4: 'f4',
    f5: 'f5',
    f6: 'f6',
    f7: 'f7',
    f8: 'f8',
    f9: 'f9'
  },
  {
    f1: 'g1',
    f2: 'g2',
    f3: 'g3',
    f4: 'g4',
    f5: 'g5',
    f6: 'g6',
    f7: 'g7',
    f8: 'g8',
    f9: 'g9'
  },
  {
    f1: 'h1',
    f2: 'h2',
    f3: 'h3',
    f4: 'h4',
    f5: 'h5',
    f6: 'h6',
    f7: 'h7',
    f8: 'h8',
    f9: 'h9'
  },
  {
    f1: 'i1',
    f2: 'i2',
    f3: 'i3',
    f4: 'i4',
    f5: 'i5',
    f6: 'i6',
    f7: 'i7',
    f8: 'i8',
    f9: 'i9'
  },
  {
    f1: 'j1',
    f2: 'j2',
    f3: 'j3',
    f4: 'j4',
    f5: 'j5',
    f6: 'j6',
    f7: 'j7',
    f8: 'j8',
    f9: 'j9'
  },
  {
    f1: 'k1',
    f2: 'k2',
    f3: 'k3',
    f4: 'k4',
    f5: 'k5',
    f6: 'k6',
    f7: 'k7',
    f8: 'k8',
    f9: 'k9'
  },
  {
    f1: 'l1',
    f2: 'l2',
    f3: 'l3',
    f4: 'l4',
    f5: 'l5',
    f6: 'l6',
    f7: 'l7',
    f8: 'l8',
    f9: 'l9'
  },
  {
    f1: 'm1',
    f2: 'm2',
    f3: 'm3',
    f4: 'm4',
    f5: 'm5',
    f6: 'm6',
    f7: 'm7',
    f8: 'm8',
    f9: 'm9'
  },
  {
    f1: 'n1',
    f2: 'n2',
    f3: 'n3',
    f4: 'n4',
    f5: 'n5',
    f6: 'n6',
    f7: 'n7',
    f8: 'n8',
    f9: 'n9'
  },
  {
    f1: 'o1',
    f2: 'o2',
    f3: 'o3',
    f4: 'o4',
    f5: 'o5',
    f6: 'o6',
    f7: 'o7',
    f8: 'o8',
    f9: 'o9'
  },
  {
    f1: 'p1',
    f2: 'p2',
    f3: 'p3',
    f4: 'p4',
    f5: 'p5',
    f6: 'p6',
    f7: 'p7',
    f8: 'p8',
    f9: 'p9'
  },
  {
    f1: 'q1',
    f2: 'q2',
    f3: 'q3',
    f4: 'q4',
    f5: 'q5',
    f6: 'q6',
    f7: 'q7',
    f8: 'q8',
    f9: 'q9'
  },
  {
    f1: 'r1',
    f2: 'r2',
    f3: 'r3',
    f4: 'r4',
    f5: 'r5',
    f6: 'r6',
    f7: 'r7',
    f8: 'r8',
    f9: 'r9'
  },
  {
    f1: 's1',
    f2: 's2',
    f3: 's3',
    f4: 's4',
    f5: 's5',
    f6: 's6',
    f7: 's7',
    f8: 's8',
    f9: 's9'
  }
])
function addFixed(index) {
  const del = header.splice(index, 1)
  fixHeader.push({ elem: del[0], index: index })

  const el = document.querySelector('.tableWrapper')
  const a = getComputedStyle(el).getPropertyValue('--sdf')
  el.style.setProperty('--sdf', +a + 1)
}
function removeFixed() {
  const removeElemet = fixHeader.pop()
  header.splice(removeElemet.index, 0, removeElemet.elem)

  const el = document.querySelector('.tableWrapper')
  const a = getComputedStyle(el).getPropertyValue('--sdf')
  el.style.setProperty('--sdf', +a - 1)
}
function choice(e, item) {
  if (checkedElement.value == e.target.id) {
    e.target.checked = false
    checkedElement.value = ''
    emit('choise', null)
  } else {
    emit('choise', item)
  }
}
function sortf(item, t) {
  if (t.checked) {
    console.log('Down', item)
  } else {
    console.log('UP', item)
  }
}
function onChangeSelect(index) {
  size.value = index
  show.value = false
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border: 1px solid;
  border-top: none;
  border-radius: 5px;
  /* min-height: 470px; */
  height: 100%;
  max-height: 86vh;
}
.wrapper::after {
  content: '';
  width: calc(100% + 2px);
  height: 16px;
  background-color: #fff3e4;
  border-bottom: 1px solid;
  position: absolute;
  z-index: 1;
  right: -1px;
  top: 0px;
}

.headPin {
  width: 22px;
  height: 22px;
}
.headText {
  grid-area: 1/2/-1/-1;
  margin-right: 5px;
  font-size: 16px;
}

.headSort {
  width: 22px;
  height: 22px;
  align-self: flex-end;
}
.headCell {
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-template-rows: 25px 1fr;
  align-items: center;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.tableWrapper {
  --sdf: 2;
  display: grid;
  grid-template-columns: 42px repeat(9, minmax(min-content, 400px));
  padding-top: 16px;
  overflow: auto;
}

.fixPosHead {
  top: 0px;
  position: sticky;
  z-index: 2;
  text-align: center;
  font-weight: bold;
  box-shadow: 0px 2px 4px -1px rgba(0, 1, 6, 0.35);
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: subgrid;
  background-color: rgb(237, 237, 237);
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
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
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
  background-color: bisque;
}

.fixPos {
  grid-column: 1 / var(--sdf);
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: subgrid;
  position: sticky;
  left: 0px;
  z-index: 3;
  background-color: rgb(237, 237, 237);
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
  background-color: #686d70;
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
  gap: 30px;
  width: 100%;
  padding: 0px 5px;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(237, 237, 237);
  font-size: 15px;
  font-weight: 450;
  user-select: none;
  color: rgba(0, 0, 0, 0.75);
  border-radius: 0 0 5px 5px;
  border-top: 1px solid;
}
.icon-pagination {
  /* background-color: #ededed; */
  background-color: #eb8484;
  border-radius: 4px;
}
.itemBottom {
  display: flex;
  align-items: center;
  gap: 7px;
}
.pagination-select {
  position: relative;
  width: 30px;
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
