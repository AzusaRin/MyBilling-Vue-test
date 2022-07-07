<template>
  <div>
    <label class="notes">
      <span class="noteName">备注</span>
      <input type="text" :value="value" @change="onChange" placeholder="请在这里输入备注信息">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class notes extends Vue {
  value = '';
  onChange(event:KeyboardEvent){
    this.value = (event.target as HTMLInputElement).value;
  }
}
</script>

<style lang="scss" scoped>
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

</style>