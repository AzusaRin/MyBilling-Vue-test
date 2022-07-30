<template>
  <div>
    <layout>
      <van-sticky>
        <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
        <van-cell is-link @click="showPopup">
          <svg class="icon">
            <icon name="calendar"/>
          </svg>
          按年月选择： <span>{{ selectedDate(currentDate) }}</span></van-cell>
        <van-popup v-model="show" round>
          <van-datetime-picker
              v-model="currentDate"
              type="year-month"
              title="选择年月"
              :min-date="minDate"
              :max-date="maxDate"
              :formatter="formatter"
          />
        </van-popup>
      </van-sticky>
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }} <span>总计￥{{ group.total }}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record">
              <span>{{ tagToString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span class="time">{{ timeChecker(item.createAt) }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else>
        <van-empty image="error" description="当月没有相关记账记录"/>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">

import Tabs from '@/components/Tabs.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';


@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;

  }

  get groupedList() {

    const {recordList} = this;
    type ResultList = {
      title: string
      items: RecordItem[]
      total?: number
    }[]

    const orderedRecordList = clone(recordList)
        .filter(r => r.type === this.type
            && dayjs(r.createAt, 'month').format('YYYY-MM') === (dayjs(this.currentDate, 'month').format('YYYY-MM'))
        )

        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (orderedRecordList.length === 0) {
      return [];
    }
    const resultList: ResultList = [{
      title: dayjs(orderedRecordList[0].createAt).format('YYYY-MM-DD'),
      items: [orderedRecordList[0]],
    }];
    for (let i = 1; i < orderedRecordList.length; i++) {
      const current = orderedRecordList[i];
      const latest = resultList[resultList.length - 1];
      if (dayjs(latest.title).isSame(dayjs(current.createAt), 'day')) {
        latest.items.push(current);
      } else {
        resultList.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    resultList.map(group => {
      group.total = group.items.reduce((sum, currentItem) => sum + currentItem.amount, 0);
    });
    return resultList;
  }

  // eslint-disable-next-line no-undef
  tagToString(tags: Tag[]) {
    return tags.length === 0 ? '无标签' : tags.map(item => item.name).join(',');

  }

  selectedDate(date: Date) {
    return dayjs(date, 'month').format('YYYY年M月');
  }

  timeChecker(date: Date) {
    return dayjs(date).format('H时m分');
  }

  beautify(string: string) {
    if (dayjs(string).isSame(dayjs(), 'day')) {
      return '今天';
    } else if (dayjs(string).isSame(dayjs().subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (dayjs(string).isSame(dayjs().subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (dayjs().isSame(dayjs(string), 'year')) {
      return dayjs(string).format('今年M月D日');
    } else if (dayjs().subtract(1, 'year').isSame(dayjs(string), 'year')) {
      return dayjs(string).format('去年M月D日');
    } else if (dayjs().subtract(2, 'year').isSame(dayjs(string), 'year')) {
      return dayjs(string).format('前年M月D日');
    } else {
      return dayjs(string).format('YYYY年M月D日');
    }
  }

  formatter(type: string, val: number) {
    if (type === 'year') {
      return `${val}年`;
    } else if (type === 'month') {
      return `${val}月`;
    }
    return val;
  }

  showPopup() {
    this.show = true;
  }


  created() {
    this.$store.commit('fetchRecordList');


  }


  type = '-';
  recordTypeList = recordTypeList;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  currentDate = new Date();
  show = false;

}
</script>

<style lang="scss" scoped>

::v-deep {
  .types-tabs-item {

    &.selected {
      background: rgb(242, 243, 245);
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
    overflow: auto;
    @extend %item
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
    font-size: 10px;

  }

  .time {
    margin-left: auto;
    margin-right: 20px;
    font-size: 10px;
  }

  .icon {
    height: 22px;
    width: 22px;
    fill: currentColor;
    overflow: hidden;
    vertical-align: middle;
    padding-left: 2px;
    padding-bottom: 4px;
  }


}
</style>