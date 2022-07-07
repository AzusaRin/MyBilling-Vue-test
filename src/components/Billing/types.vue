<template>
  <div>
    <ul class="types">
      <li v-bind:class="type==='+' && 'selected'" @click="selectType('+')">收入</li>
      <li v-bind:class="type==='-' && 'selected'" @click="selectType('-')">支出</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';

@Component
export default class types extends Vue {
  @Prop(Number) xxx: number | undefined

  type = '+';
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
   this.type = type;

  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.types {
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