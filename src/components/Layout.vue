<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.nav{
border: 1px solid red;
}
.nav-wrapper{
  display: flex;
  border: 1px solid blue;
  flex-direction: column;
  height: 100vh;

}
.content{
  flex: 1;
  overflow: auto;
}


</style>