<template>
  <div class="nav">
    <router-link to="/billing/">
      <svg >
       <icon name="billing"/>
      </svg>
      记账</router-link>
    |
    <router-link to="/labels/">
      <svg>
        <icon name="labels"/>
      </svg>
      标签</router-link>
    |
    <router-link to="/statistics/">
      <svg>
        <icon name="statistics"/>
      </svg>
      统计</router-link>
  </div>

</template>

<script lang="ts">


export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
.nav svg{
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>