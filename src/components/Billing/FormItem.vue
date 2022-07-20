<template>
  <div>
    <label class="notes">
      <span class="noteName">{{ this.fieldName }}</span>
      <input type="text" :placeholder="placeHolder"
             :value="value"  @input="onValueChanged($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default:''})value!:string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeHolder?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }


}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;
  background-color: white;


  .noteName {
    padding-right: 16px;

  }

  input {
    height: 40px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    padding-right: 16px;
    font-size: 14px;
  }
}

</style>