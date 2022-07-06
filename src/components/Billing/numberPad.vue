<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>x</button>
      <button class="ok">OK</button>
      <button>0</button>
      <button>.</button>
      <button>%</button>
      <button>+</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'numberPad'
};
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