<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title> </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div
          style="grid-column: 1/-1"
          v-if="JSON.stringify(searchAdditionally) !== '{}'"
          color="#E3EDF4"
          iconStyle="padding-right: 50%"
          iconColor="#103C59"
          elevation="0"
        >
          <div class="baseLayoutForm mt-5">
            <component
              v-for="(item, index) in searchAdditionally"
              :key="index"
              :style="{
                'grid-column': `${
                  item.width == 'all' ? '1/-1' : 'span ' + item.width
                }`,
              }"
              :label="item.label"
              :is="item.type"
            ></component>
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {},
});
</script>

<style></style>
