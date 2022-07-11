<template>
  <div>
    <layout>
      <ol class="tags">
        <li v-for="tag in tags" :key="tag.id">
          <span>{{ tag.name }}</span>
          <Icon name="right"/>
        </li>
      </ol>
      <div class="createTag-wrapper">
        <button class="createTag" @click="createTag">新建标签</button>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">


import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();

@Component
export default class Labels extends Vue {

  tags = tagListModel.data;

  createTag() {
    const tagName = window.prompt('请输入标签名');
    if (tagName) {
      const message = tagListModel.create(tagName);
      if (message === 'duplicated') {
        window.alert('请勿输入重复标签');
      }
      if (message === 'long') {
        window.alert('标签名过长，请控制在10字符以内');
      }
      if (message === 'succeed') {
        window.alert('标签添加成功');
      }
      console.log(message);

    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  font-size: 16px;
  padding-left: 16px;

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

  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: #A6E3E9 1px solid;
  }
}

.createTag {
  background-color: #71C9CE;
  color: #333333;
  border-radius: 4px;
  border: none;
  padding: 0 16px;
  height: 40px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}

</style>