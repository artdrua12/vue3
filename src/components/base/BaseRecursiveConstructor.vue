<template>
  <div class="constructor">
    <fieldset v-for="(obj, indexObj) in fieldsArray" :key="indexObj + 100" class="adaptiveGrid">
      <div class="button">
        <v-icon color="green" icon="mdi-plus-box" class="bt" @click="add"> </v-icon>
        <v-icon
          v-if="fieldsArray.length != 1"
          color="red"
          icon="mdi-delete"
          class="ml-5 bt"
          @click="remove"
        >
        </v-icon>
      </div>
      <legend>
        {{ fieldsArray.length == 1 ? props.label : props.label + ' ' + (indexObj + 1) }}
      </legend>

      <component
        :is="item.type"
        v-for="(item, index) in obj"
        :key="index"
        v-model="item.value"
        :style="{
          'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
        }"
        :label="item.label"
        :data-slot="item.dataSlot"
        :items="item.items"
        :item-text="item.text"
        :item-value="item.itemValue"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :fields="item.fields"
        @update:enter="find"
      ></component>
    </fieldset>
  </div>
</template>

<script>
import BaseDateField from './BaseDateField.vue'
import BaseAutocomplete from './BaseAutocomplite.vue'
import BaseTextField from './BaseTextField.vue'
import BaseCheckBox from './BaseCheckBox.vue'
import BaseSlot from './BaseSlot.vue'
import { ref } from 'vue'
export default {
  name: 'BaseRecursiveConstructor',
  components: {
    BaseDateField,
    BaseAutocomplete,
    BaseTextField,
    BaseCheckBox,
    BaseSlot
  },
  props: {
    label: { type: String, required: true },
    fields: {
      type: Object,
      required: true
    }
  },
  emits: ['find'], // событие для запуска поиска

  setup(props, contex) {
    let fieldsArray = ref([])
    add()

    function find() {
      contex.emit('find')
    }
    function add() {
      console.log('add')
      fieldsArray.value.push(JSON.parse(JSON.stringify(props.fields)))
    }
    function remove() {
      console.log('remove')
      fieldsArray.value.pop()
    }
    return {
      fieldsArray,
      contex,
      props,
      find,
      add,
      remove
    }
  }
}
</script>

<style scoped>
.constructor {
  width: 100%;
  padding-left: 50px;
}
.adaptiveGrid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 12px 12px;
  padding: 25px 24px 10px 24px;
  overflow: visible;
}
.fullWidth {
  grid-column: 1/-1;
}
legend {
  padding: 0px 10px 5px 10px;
  font-weight: 700;
  font-size: 17px;
  color: #2c4957;
}
legend::after {
  width: 40px;
  height: 50%;
  content: '';
  position: absolute;
  left: -40px;
  bottom: 50%;
  border-bottom: 1px solid #2c4957;
  border-left: 1px solid #2c4957;
}
legend::before {
  width: 40px;
  height: calc(50% + 40px);
  content: '';
  position: absolute;
  left: -40px;
  top: 50%;
  border-left: 1px solid #2c4957;
}

legend:last-child {
  border: none;
}
fieldset {
  width: 100%;
  border: 1px solid #2c4957;
  border-radius: 0px;
  overflow: hidden;
  background-color: rgba(233, 225, 191, 0.2);
  margin-bottom: 20px;
}
.button {
  position: absolute;
  right: 20px;
  top: -30px;
}
.bt {
  background-color: #f7f7f7;
}

@media (max-width: 1200px) {
  .adaptiveGrid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
