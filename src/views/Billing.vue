<template>
  <layout class-prefix="layout" >
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="block">
      <span class="demonstration">
         <icon name="calendar"/>
      </span>
      <el-date-picker class="picker"
                      v-model="selectedDate"
                      type="datetime"
                      format="yyyy年M月d日H时m分"
                      placeholder="选择日期时间">
      </el-date-picker>
    </div>
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
import clone from '@/lib/clone';


@Component({components: {Tabs, FormItem, NumberPad, Notes, Tags},})
export default class Billing extends Vue {


  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;
  selectedDate = new Date();
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
      
      return this.$message.warning('请选择一个标签');

    }

    const newRecord: RecordItem = clone(this.record);
    newRecord.createAt = this.selectedDate;
    this.recordList.push(newRecord);
    this.$store.commit('saveRecords');


    this.$message.success('已记账');
    this.record.notes = '';


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

.block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;

  > .demonstration {
    font-size: 25px;
    padding-right: 16px;
  }

  > .picker {
    flex: 1;

  }

}

</style>
