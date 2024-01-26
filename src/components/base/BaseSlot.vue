<template>
  <div class="slot">
    <component
      v-for="(item, index) in props.dataSlot"
      :key="index"
      :label="item.label"
      :model="item.value"
      :array="item.array"
      :itemText="item.text"
      v-bind:is="item.type"
      :items="item.items"
    ></component>
  </div>
</template>

<script>
import BaseCheckBox from "./BaseCheckBox.vue";
import BaseTextField from "./BaseTextField.vue";
export default {
  components: {
    BaseTextField,
    BaseCheckBox,
  },
  props: {
    dataSlot: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<!-- <script >
import { defineProps } from "vue";

const props = defineProps({
  dataSlot: { type: String, default: "" },
});
</script> -->

<style scoped>
.slot {
  width: 100%;
  display: flex;
  grid-gap: 0px 12px;
}
</style>
