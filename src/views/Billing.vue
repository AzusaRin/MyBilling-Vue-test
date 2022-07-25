<template>
  <layout class-prefix="layout">
    <Tabs data-source="recordTypeList" :value="record.type"/>
    <tags @update:value="nowTags"/>
    <div class="notes">
      <FormItem field-name="备注" place-holder="请在这里输入备注" @update:value="nowNotes"/>
    </div>
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
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({components: {Tabs, FormItem, NumberPad, Types, Notes, Tags},})
export default class Billing extends Vue {

  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [], type: '-', notes: '', amount: 0
  };


  created() {
    this.$store.commit('fetchRecordList');
  }

  nowTags(value: string[]) {
    this.record.tags = value;
  }

  nowNotes(value: string) {
    this.record.notes = value;
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
