<template>
  <layout class-prefix="layout">
    <tags @update:value="nowTags"/>
    <div class="notes">
      <FormItem field-name="备注" place-holder="请在这里输入备注" @update:value="nowNotes"/>
    </div>
    <types :value="record.type" @update:value="nowTypes"/>
    <number-pad @update:value="nowAmount" @submit="saveRecord"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';

import Tags from '@/components/Billing/tags.vue';
import Notes from '@/components/Billing/FormItem.vue';
import Types from '@/components/Billing/types.vue';
import NumberPad from '@/components/Billing/numberPad.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Billing/FormItem.vue';


@Component({components: {FormItem, NumberPad, Types, Notes, Tags},})
export default class Billing extends Vue {
  record: RecordItem = {
    tags: [], type: '-', notes: '', amount: 0
  };

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecordList');
  }

  nowTags(value: string[]) {
    this.record.tags = value;
  }

  nowNotes(value: string) {
    this.record.notes = value;
  }

  nowTypes(value: string) {
    this.record.type = value;
  }

  nowAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);

  }


}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}

.notes {
  background-color: white;
  padding: 6px 0;
}

</style>
