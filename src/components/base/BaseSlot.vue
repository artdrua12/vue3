<template>
  <div class="slot">
    <p v-if="props.label" class="slot-title">{{ props.label }}</p>
    <component
      :is="item.type"
      v-for="(item, index) in props.additionData"
      :key="index"
      v-model="item.value"
      :style="{
        'grid-column': `${item.width == 'all' ? '1/-1' : 'span ' + item.width}`
      }"
      :label="item.label"
      :array="item.array"
      :item-text="item.text"
      :items="item.items"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
    ></component>
  </div>
</template>

<script>
import BaseCheckBox from './BaseCheckBox.vue'
import BaseTextField from './BaseTextField.vue'
import BaseCombobox from '@/components/base/BaseCombobox.vue'

export default {
  components: {
    BaseTextField,
    BaseCheckBox,
    BaseCombobox
  },
  props: {
    label: { type: String, default: null },
    additionData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      props
    }
  }
}
</script>

<style scoped>
.slot {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 0px 12px;
}
.slot-title {
  grid-column: 1/-1;
  text-align: center;
  font-size: 19px;
  color: #546e7a;
  margin: -5px 0px 2px 0px;
}
</style>
