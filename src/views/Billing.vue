<template>
  <layout class-prefix="layout">
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <van-notice-bar
        color="#1989fa" background="#ecf9ff" left-icon="info-o"
        text="记得要给我好评哦"
    />
    <tags @update:value="nowTags"/>
    <div class="notes">
      <FormItem field-name="备注" place-holder="请在这里输入备注" :value.sync="record.notes"/>
    </div>
    <number-pad @update:value="nowAmount" @submit="saveRecord"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';

import Tags from '@/components/Billing/tags.vue';
import Notes from '@/components/Billing/FormItem.vue';
import NumberPad from '@/components/Billing/numberPad.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Billing/FormItem.vue';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({components: {Tabs, FormItem, NumberPad, Notes, Tags},})
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

  // eslint-disable-next-line no-undef
  nowTags(value: Tag[]) {
    this.record.tags = value;
  }



  nowAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return this.$toast.fail('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      this.$toast.success('已记账');
      this.record.notes = '';
    }


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
