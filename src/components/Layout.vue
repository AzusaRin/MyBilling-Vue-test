<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
      <Nav class="nav"/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
  props: ['classPrefix']
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.layout-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
  @extend %outerShadow;


}
.content{
  flex-grow: 1;
  overflow: auto;
  padding-top: 55px;
  padding-bottom: 60px;
}

.nav{
  max-width: 470px;
  width: 100vw;
  position: fixed;
  bottom:0;
  background-color: rgb(242,243,245);
  z-index: 1;
}


</style>