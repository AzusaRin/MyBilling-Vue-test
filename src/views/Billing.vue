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
const {model} = require('@/model.js');

const version = window.localStorage.getItem('version');
const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
if (version === '0.0.1') {
  //数据迁移
  recordList.forEach(record => {
    record.createAt = new Date(2020, 0, 1);
  });
  //保存数据
  window.localStorage.setItem('recordList', JSON.stringify(recordList));
}
//升级版本
window.localStorage.setItem('version', '1.0.0');
type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createAt?: Date
}

@Component({components: {NumberPad, Types, Notes, Tags}})
export default class Billing extends Vue {
  tags = ['1', '2', '3', '4'];
  recordList: Record[] = model.fetch();
  record: Record = {
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
    const newRecord: Record = JSON.parse(JSON.stringify(this.record));
    newRecord.createAt = new Date();
    this.recordList.push(newRecord);

  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}

</style>
