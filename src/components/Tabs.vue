<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        @click="select(item)"
        :class="{selected:item.value === value,[classPrefix+'-tabs-item']:classPrefix}"
    >{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string }


@Component
export default class Tabs extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];


  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs {
  background-color: #71C9CE;
  display: flex;
  font-size: 24px;


  > li {
    @extend %outerShadow;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    opacity: 0.7;
    transition: all .3s;

    &.selected {
      box-shadow: none;
      font-weight: bolder;
      opacity: 1;
      content: '';

    }
  }
}
</style>