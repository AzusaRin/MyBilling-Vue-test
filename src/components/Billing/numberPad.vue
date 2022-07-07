<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button>+</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button>-</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button>x</button>
      <button class="ok" >OK</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button>%</button>
      <button>+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class numberPad extends Vue {
  output = '0';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.innerText !;
    if (this.output.length === 16) {
      return;
    }

    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0) {
      if (input === '.') {
        return;
      }
    }

    this.output += input;

  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear(){
    this.output = '0'
  }



}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    min-height: 72px;
  }

  .buttons {
    @extend %clearfix;

    > button {
      width: 20%;
      height: 64px;
      float: left;
      background-color: transparent;
      border: none;


      &.ok {
        height: 128px;
        float: right;
      }

      $buttonColor: #c1ffff;

      &:nth-child(1) {
        background-color: $buttonColor;
      }

      &:nth-child(2), &:nth-child(6) {
        background-color: darken($buttonColor, 5%);
      }

      &:nth-child(3), &:nth-child(7), &:nth-child(11) {
        background-color: darken($buttonColor, 10%);
      }

      &:nth-child(4), &:nth-child(8), &:nth-child(12), &:nth-child(16) {
        background-color: darken($buttonColor, 15%);
      }

      &:nth-child(5), &:nth-child(9), &:nth-child(13), &:nth-child(17) {
        background-color: darken($buttonColor, 20%);
      }

      &:nth-child(10), &:nth-child(14), &:nth-child(18) {
        background-color: darken($buttonColor, 25%);
      }

      &:nth-child(19) {
        background-color: darken($buttonColor, 30%);
      }

      &:nth-child(15) {
        background-color: darken($buttonColor, 40%);
      }
    }
  }
}

</style>