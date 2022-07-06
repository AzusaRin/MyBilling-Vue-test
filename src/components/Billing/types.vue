<template>
  <div>
    <ul class="types">
      <li class="selected">收入</li>
      <li>支出</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'types'
};
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