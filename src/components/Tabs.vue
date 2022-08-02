<template>
  <ul :class="{[classPrefix+'-tabs']:classPrefix}" class="tabs">
    <li class="left"></li>
    <li
        v-for="item in dataSource" :key="item.value"
        @click="select(item)"
        :class="{selected:item.value === value,[classPrefix+'-tabs-item']:classPrefix}"
        class="tabs-item"
    >
      <span class="text">{{ item.text }}</span>
    </li>
    <li class="right"></li>
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
  font-size: 18px;

  > .left {
    width: 100px;
  }

  > .right {
    width: 100px;
  }

  &-item {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    padding: 20px 16px 8px 16px;
    position: relative;

    &.selected {
      box-shadow: none;
      font-weight: bolder;

      &::after {
        content: "";

        width: 100%;

        height: 2px;

        background: #000;

        position: absolute;

        left: 0;

        bottom: 1px;

      }
    }
  }
}
</style>