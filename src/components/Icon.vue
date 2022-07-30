<template>
  <svg class="svg-icon">
    <use  :xlink:href="'#' + name"/>
  </svg>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {requireContext.keys().forEach(requireContext);};
try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}


export default {
  props: ['name'],
  name: 'Icon'
};
</script>

<style lang="scss" >
.svg-icon{
  height: 22px;
  width: 22px;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
  padding-left: 2px;
  padding-bottom: 4px;
}
</style>