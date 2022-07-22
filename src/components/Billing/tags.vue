<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签11</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.includes(tag)}"
          @click="toggle(tag)"
      >{{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2';
import createId from '@/lib/createId';

@Component
export default class tags extends Vue {
  tagList = store.fetchTags();
  selectedTags: string[] = [];

  toggle(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

  create() {
    const tagName = window.prompt('请输入新标签名');
    if(tagName){
     return store.createTag(tagName);
    }
  }


}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;


  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #A6E3E9;
      height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin: 8px;

      &.selected {
        background-color: blue;
      }
    }
  }

  .new {
    padding-top: 16px;

    button {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid;
      padding: 0 4px;
      color: #71C9CE;

    }
  }
}

</style>