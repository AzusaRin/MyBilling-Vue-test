<template>
  <layout class-prefix="layout">
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
    <div>
      <label class="notes">
        <span class="noteName">备注</span>
        <input type="text" placeholder="请在这里输入备注信息">
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">收入</li>
        <li>支出</li>
      </ul>
    </div>
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
  </layout>
</template>

<script lang="ts">


export default {
  name: 'Billing'

};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}

</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";


.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #A6E3E9;
      height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin: 8px;
    }
  }

  .new {
    padding-top: 16px;

    button {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid;
      padding: 0 4px;
      color: #71C9CE;

    }
  }
}

.notes {
  background-color: #CBF1F5;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;

  .noteName {
    padding-right: 16px;

  }

  input {
    padding: 16px 0;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    padding-right: 16px;
  }
}

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