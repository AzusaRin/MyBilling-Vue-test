<template>
  <button class="button">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class DeleteButton extends Vue {

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.button {
  @extend %outerShadow;
  margin-top: 20px;
  background-color: white;
  padding: 8px 20px 8px 8px;
  color: #333333;
  border-radius: 8px;
  border: none;


  }

</style>