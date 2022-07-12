<template>
  <layout class-prefix="layout">
    <span>{{ record }}</span>
    <tags :data-source.sync="tags"
          @update:value="nowTags"/>
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
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Billing/FormItem.vue';

@Component({components: {FormItem, NumberPad, Types, Notes, Tags}})
export default class Billing extends Vue {
  tags = tagListModel.fetch();
  recordList = recordListModel.fetch();
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
    const newRecord = recordListModel.clone(this.record);
    newRecord.createAt = new Date();
    this.recordList.push(newRecord);

  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}
.notes{
  background-color: white;
  padding: 6px 0;
}

</style>
