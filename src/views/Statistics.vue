<template>
  <div>
    <layout>
      <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record"
            >
              <span>{{tagToString(item.tags)  }}</span>
              <span class="notes">{{item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record"
            >
              <span>{{tagToString(item.tags)  }}</span>
              <span class="notes">{{item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record"
            >
              <span>{{tagToString(item.tags)  }}</span>
              <span class="notes">{{item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </layout>
  </div>
</template>

<script lang="ts">

import Tabs from '@/components/Tabs.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';



@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;
    type HashTableValue = {
      title: string, items: RecordItem[]
    }


    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;

  }

  // eslint-disable-next-line no-undef
  tagToString(tags:Tag[]){
    return tags.length === 0 ? '无标签':tags.join(',');
  }

  created() {
    this.$store.commit('fetchRecordList');

  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;

}
</script>

<style lang="scss" scoped>

::v-deep {
  .types-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;
    }
  }

  .interval-tabs-item {
    height: 48px;
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    @extend %item
  }

  .record {
    background: white;
    @extend %item
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;

  }
}
</style>