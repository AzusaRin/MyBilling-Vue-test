<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
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
import createTag, {createTagHelper} from '@/mixins/createTagHelper';
import {mixins} from 'vue-class-component';


@Component
export default class tags extends mixins(createTagHelper) {

  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList();
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
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