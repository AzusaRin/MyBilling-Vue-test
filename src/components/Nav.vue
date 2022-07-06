<template>
  <nav>
     <router-link to="/billing/" class="item"  active-class="selected">
      <svg class="icon">
        <icon name="billing"/>
      </svg>
      记账
    </router-link>
    <router-link to="/labels/" class="item"  active-class="selected">
      <svg class="icon">
        <icon name="labels"/>
      </svg>
      标签
    </router-link>
    <router-link to="/statistics/" class="item"  active-class="selected">
      <svg class="icon">
        <icon name="statistics"/>
      </svg>
      统计
    </router-link>
  </nav>

</template>

<script lang="ts">


export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;

  .icon {
    height: 32px;
    width: 32px;
    padding: 2px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

  }


  > .item {
    padding: 5px 0;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  >.item.selected{
    color:$color-highlight;
  }
}

</style>