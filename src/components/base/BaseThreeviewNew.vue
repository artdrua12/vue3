<template>
  <div class="wrapper">
    <div v-for="item in actionsFiltered" :key="item.text">
      <div v-if="item.children">
        <input :id="item.text" type="checkbox" :value="item.text" />
        <label :for="item.text" class="bold threeTitle mainTitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="gray"
            class="threeFolder"
          >
            <path d="M10,17L15,12L10,7V17Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="black"
            class="closeFolder"
          >
            <path
              d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="black"
            class="openFolder"
          >
            <path
              d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z"
            />
          </svg>
          {{ item.text }}
        </label>
        <div class="threeChield">
          <div
            v-for="itm in item.childrenFiltered"
            :key="itm.text"
            class="threeTitle threeTitle--padding"
            @click="runAction(itm)"
          >
            <v-icon size="25px" class="icon">{{ itm.icon }}</v-icon>
            <span class="">{{ itm.text }}</span>
          </div>
        </div>
      </div>

      <div v-else class="threeTitle" @click="runAction(item)">
        <v-icon size="25px" class="icon">{{ item.icon }}</v-icon>
        <span class="bold">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const user = useUserStore() //получение permissions из пользователя
const { getPermissions } = storeToRefs(user) //получение permissions

const route = useRouter()
console.log(route.listening)
const props = defineProps({
  selected: { type: Object, required: true }, // выбранная строка из таблицы
  pathToStatus: { type: String, required: true }, // путь для статуса
  actions: { type: Array, required: true } // массив всех действия
})
let isSelected = computed(() => Object.keys(props.selected).length > 0)
let actionsFiltered = computed(() => {
  return filteringByEnabled(props.actions)
})

function runAction(item) {
  try {
    const funActions = item.action
    funActions(props.selected.id)
  } catch {
    console.log('Ошибка при выполнении действия')
  }
}

function filteringByEnabled(array) {
  return array.filter((item) => {
    if (item.children) {
      item.childrenFiltered = filteringByEnabled(item.children)
    }
    return typeof item.enabled === 'object' ? checkObj(item.enabled) : item.enabled
  })
}

function checkObj(obj) {
  let isTrue = true
  for (let key in obj) {
    if (key === 'notEmpty') {
      isTrue = isSelected.value
    } else if (key === 'permission') {
      const arr = obj[key]
      for (let i = 0; i < arr.length; i++) {
        if (!getPermissions.value.has(arr[i])) return false
      }
    } else if (key === 'notEmptyAndStatus') {
      if (!isSelected.value) return false //проверка что не пустой
      try {
        const evalVal = eval(`props.selected.${props.pathToStatus}`) || ''
        isTrue = obj[key].includes(evalVal)
      } catch {
        return false
      }
    } else if (key === 'notEqual') {
      const subObj = obj[key]
      for (let subKey in subObj) {
        let arr = subObj[subKey]
        let val = props.selected.subKey
        if (arr.includes(val)) return false
      }
    }

    if (!isTrue) {
      return false
    }
  }
  return isTrue
}
</script>

<style scoped>
.wrapper {
  max-height: 90vh;
  overflow: auto;
  scrollbar-width: none;
}
.wrapper::-webkit-scrollbar {
  width: 0;
}
.threeTitle {
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
  user-select: none;
  cursor: pointer;
  gap: 7px;
  color: #2c4957;

  font-size: 14px;
  padding: 7px 0px 7px 22px;
  line-height: 15px;
}
.threeTitle.mainTitle {
  grid-template-columns: auto 25px 1fr;
  /* margin-left: -12px; */
  padding: 10px 0px 10px 5px;
}
.threeTitle:hover {
  /* background-color: rgba(128, 128, 128, 0.1); */
  background-color: #d3d2d1;
}
.threeChield {
  grid-column: 1/-1;
  height: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.threeTitle--padding {
  padding: 5px 0px 5px 45px;
}
.bold {
  font-weight: bolder;
}
input[type='checkbox']:checked ~ .threeChield {
  height: 100%;
}
input[type='checkbox'] {
  display: none;
}

.threeFolder {
  transition: transform 0.25s;
}
.openFolder {
  display: none;
}
input[type='checkbox']:checked ~ .threeTitle .openFolder {
  display: block;
}
input[type='checkbox']:checked ~ .threeTitle .closeFolder {
  display: none;
}

input[type='checkbox']:checked ~ .threeTitle .threeFolder {
  transform: rotate(90deg);
}
.icon {
  color: black;
}
</style>
