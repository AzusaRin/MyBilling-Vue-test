<template>
  <div class="layout-wrapper">
    <div class="content" v-bind:class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
      <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
  props: ['classPrefix']
};
</script>

<style lang="scss" scoped>

.layout-wrapper{
  display: flex;
  border: 1px solid blue;
  flex-direction: column;
  min-height: 100vh;


}
.content{
  flex: 1;
  overflow: auto;
}


</style>