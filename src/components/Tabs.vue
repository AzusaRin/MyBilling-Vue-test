<template>
  <ul :class="{[classPrefix+'-tabs']:classPrefix}" class="tabs">
    <li
        v-for="item in dataSource" :key="item.value"
        @click="select(item)"
        :class="{selected:item.value === value,[classPrefix+'-tabs-item']:classPrefix}"
        class="tabs-item"
    >
     <span class="text">{{ item.text }}</span>
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
  font-size: 16px;


  &-item {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    padding: 16px;
    transition: all .6s;

    &.selected {
      box-shadow: none;
      font-weight: bolder;
      background: rgb(242, 243, 245);

      > .text{
        @-webkit-keyframes shake {
          10% {
            transform: rotate(15deg);
          }
          20% {
            transform: rotate(-10deg);
          }
          30% {
            transform: rotate(5deg);
          }
          40% {
            transform: rotate(-5deg);
          }
          50%,
          100% {
            transform: rotate(0deg);
          }
        }
        -webkit-animation: shake 1s 0.15s linear infinite;
      }




    }
  }
}
</style>