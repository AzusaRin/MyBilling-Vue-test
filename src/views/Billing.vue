<template>
  <layout class-prefix="layout">
    {{ recordList }}
    <tags :data-source.sync="tags"
          @update:value="nowTags"/>
    <notes @update:value="nowNotes"/>
    <types :value="record.type" @update:value="nowTypes"/>
    <number-pad @update:value="nowAmount" @submit="saveRecord"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';

import Tags from '@/components/Billing/tags.vue';
import Notes from '@/components/Billing/notes.vue';
import Types from '@/components/Billing/types.vue';
import NumberPad from '@/components/Billing/numberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import model from '@/model';

@Component({components: {NumberPad, Types, Notes, Tags}})
export default class Billing extends Vue {
  tags = ['1', '2', '3', '4'];
  recordList = model.fetch();
  record: RecordItem = {
    tags: [], type: '-', notes: '', amount: 0
  };

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
    const newRecord = model.clone(this.record);
    newRecord.createAt = new Date();
    this.recordList.push(newRecord);

  }

  @Watch('recordList')
  onRecordListChange() {
    model.save(this.recordList);
  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}

</style>
