<template>
  <nav>
    <router-link to="/billing/" class="item">
      <svg class="icon">
        <icon name="billing"/>
      </svg>
      记账
    </router-link>
    <router-link to="/labels/" class="item">
      <svg class="icon">
        <icon name="labels"/>
      </svg>
      标签
    </router-link>
    <router-link to="/statistics/" class="item">
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
nav {
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
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

}

</style>