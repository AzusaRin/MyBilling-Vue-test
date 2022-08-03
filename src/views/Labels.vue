<template>
  <div>
    <layout class-prefix="layout">
      <div class="tags">
        <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
          <icon class="tagIcon" :name="iconName(tag)"/>
          <span>{{ tag.name }}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <DeleteButton class="createTag" @click.native="createTag">
          <icon name="createTag"/>
          新建标签
        </DeleteButton>
        <DeleteButton class="createTag" @click.native="tagReset">
          <icon name="tagReset"/>
          标签初始化
        </DeleteButton>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">


import {Component} from 'vue-property-decorator';
import DeleteButton from '@/components/DeleteButton.vue';
import {mixins} from 'vue-class-component';
import createTagHelper from '@/mixins/createTagHelper';


@Component({
  components: {DeleteButton},
})
export default class Labels extends mixins(createTagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  // eslint-disable-next-line no-undef
  iconName(tag: Tag) {
    if (parseInt(tag.id) <= 20) {
      return tag.name;
    } else {
      return 'tag';
    }
  }

  tagReset() {
    if (window.confirm('真的要初始化所有标签吗？')) {

      this.tags.splice(0, 10000);
      this.tags.push({id: '0', name: '交通'},
          {id: '1', name: '餐饮'},
          {id: '2', name: '礼金'},
          {id: '3', name: '学习'},
          {id: '4', name: '维修'},
          {id: '5', name: '旅行'},
          {id: '6', name: '数码'},
          {id: '7', name: '汽车'},
          {id: '8', name: '书籍'},
          {id: '9', name: '烟酒'},
          {id: '10', name: '社交'},
          {id: '11', name: '礼物'},
          {id: '12', name: '办公'},
          {id: '13', name: '长辈'},
          {id: '14', name: '孩子'},
          {id: '15', name: '住房'},
          {id: '16', name: '美容'},
          {id: '17', name: '衣服'},
          {id: '18', name: '电话'},
          {id: '19', name: '家具'},
          {id: '20', name: '娱乐'});
      this.$store.commit('saveTags');
    }
  }


  created() {
    this.$store.commit('fetchTagList');
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .layout-content {
    padding-top: 0!important;
  }
}


.tags {
  background-color: white;
  font-size: 16px;
  padding-left: 16px;
  height: 30rem;
  overflow: scroll;
  border-bottom: 1px solid #333333;

  svg {
    height: 24px;
    width: 24px;
    padding: 2px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    color: #333333;
    margin-right: 16px;
  }

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: #A6E3E9 1px solid;
  }
}

.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;

  > .createTag {
    margin: 0 20px;
  }

}


</style>