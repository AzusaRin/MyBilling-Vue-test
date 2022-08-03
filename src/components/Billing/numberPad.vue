<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">0</button>
      <button class="ok" @click="ok">OK</button>
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
      if ('0123456789'.includes(input)) {
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
    this.output = this.output.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");

  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }


  ok() {
    if (this.output === '0' || this.output==='0.') {
      this.$message.warning('没钱不记账哦')
      return;
    } else {
      this.$emit('update:value', this.output);
      this.$emit('submit', this.output);
      this.output = '0';
    }

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

  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    align-content: stretch;
    padding-left: 6px;



    > button {
      color: #000000;
      flex-grow: 1;
      flex-basis: 20%;
      height: 3.5rem;
      background-color: white;
      border-radius: 8px;
      border: none;
      margin: 0 6px 6px 0;
      font-family: Consolas, monospace;
      font-size: 28px;

      &:nth-child(4) {
        font-family: "Arial Black",serif;
      }

      &:nth-child(8) {
        font-family: "Arial Black",serif;
      }

      &:active {
        background-color: rgb(234, 236, 239);
      }


    }
  }
}

</style>