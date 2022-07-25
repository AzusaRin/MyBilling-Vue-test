<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">
        <svg class="icon">
          <icon name="createTag"/>
        </svg>
        新增标签
      </button>
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
import {Component} from 'vue-property-decorator';
import {createTagHelper} from '@/mixins/createTagHelper';
import {mixins} from 'vue-class-component';


@Component
export default class tags extends mixins(createTagHelper) {

  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;

  }

  created() {
    this.$store.commit('fetchTagList');
    console.log(this.$store.state.tagList);

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


    button {
      background-color: transparent;
      padding: 0 8px;
      color: #333333;





      > .icon {
        height: 22px;
        width: 22px;
        fill: currentColor;
        overflow: hidden;
        vertical-align: middle;
        padding-left: 2px;
        padding-bottom: 4px;
      }
    }
  }
}

</style>