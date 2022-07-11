<template>
  <div>
    <label class="notes">
      <span class="noteName">{{ this.fieldName }}</span>
      <input type="text" :placeholder="this.placeHolder"
             v-model="value">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class notes extends Vue {
  value = '';
  @Prop({required: true}) fieldName!: string;
  @Prop() placeHolder?: string;

  @Watch('value')
  onValueChange(value: string) {
    this.$emit('update:value', value);
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