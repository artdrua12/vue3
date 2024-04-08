<template>
  <div class="slot">
    <component
      :is="item.type"
      v-for="(item, index) in props.dataSlot"
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
    dataSlot: {
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


</style>
