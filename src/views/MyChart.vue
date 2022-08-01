<template>
  <div>
    <layout>
      <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
      <div class="monthSum" v-for="(group1,index1) in sumList" :key="index1">
        <h3> {{ monthBeautify(group1.title) }}{{ typeFetch(type) }}总计：
        </h3>
        <span>￥{{ group1.total }}</span>
      </div>
      <div class="block">
          <span class="demonstration">
          <icon name="calendar"/>
          </span>
        <el-date-picker class="picker"
                        v-model="currentDate"
                        type="month"
                        format="yyyy年M月"
                        placeholder="选择月">
        </el-date-picker>
      </div>
      <Chart :options="x"  class="chartWrapper"/>
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
import Chart from '@/components/Chart.vue';


@Component({
  components: {Chart, Tabs},
})
export default class Statistics extends Vue {
  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;


  }

  get sumList() {
    const {recordList} = this;
    type RecordSumList = {
      title: string
      items: RecordItem[]
      total?: number
    }[]

    const thisMonthList = clone(recordList).filter(r => r.type === this.type
        && dayjs(r.createAt, 'month').format('YYYY-MM') === (dayjs(this.currentDate, 'month').format('YYYY-MM'))
    ).sort((a, b) => dayjs(b.createAt, 'month').valueOf() - dayjs(a.createAt, 'month').valueOf());

    if (thisMonthList.length === 0) {
      return [];
    }

    const recordSumList: RecordSumList = [{
      title: dayjs(thisMonthList[0].createAt, 'month').format('YYYY-MM'),
      items: [thisMonthList[0]],
      total: thisMonthList[0].amount
    }];

    for (let i = 1; i < thisMonthList.length; i++) {
      const current = thisMonthList[i];
      const latest = recordSumList[recordSumList.length - 1];

      if (dayjs(latest.title).isSame(dayjs(current.createAt), 'month')) {
        latest.items.push(current);
      } else {
        recordSumList.push({
          title: dayjs(current.createAt, 'month').format('YYYY-MM'),
          items: [current]
        });
      }

      recordSumList.map(g => {
            g.total = g.items.reduce((sum, currentItem) => sum + currentItem.amount, 0);
          }
      );

    }

    return recordSumList;


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

  get x(){
return{
  title: {
    text: '',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

  }


  // eslint-disable-next-line no-undef
  tagToString(tags: Tag[]) {
    return tags.length === 0 ? '无标签' : tags.map(item => item.name).join(',');

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

  monthBeautify(string: string) {
    return dayjs(string).format('YYYY年M月');

  }

  typeFetch(type: string) {
    if (type === '-') {
      return '支出';
    } else {
      return '收入';
    }
  }


  created() {
    this.$store.commit('fetchRecordList');


  }


  type = '-';
  recordTypeList = recordTypeList;
  currentDate = new Date();


}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

::v-deep {


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
    height: 30px;
    width: 30px;
    fill: currentColor;
    overflow: hidden;
    vertical-align: middle;

  }

  .nowDate {
    margin-left: 40px;
  }


}

.van {
  height: 50px;
  font-size: 25px;
  @extend %innerShadow;
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

.empty-wrapper {
  display: flex;
  justify-content: center;

  > .empty {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

.monthSum {
  @extend %innerShadow;
  display: flex;
  justify-content: space-between;
  align-items: center;


  > h3 {
    margin-left: 10px;
  }

  > span {
    font-size: 26px;
    margin-right: 10px;
  }


}


.titleSum {
  max-height: 20vh;
  overflow: scroll;
}


</style>