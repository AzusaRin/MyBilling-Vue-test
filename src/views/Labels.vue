<template>
  <div>
    <layout>
      <div class="tags">
        <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
          <span>{{ tag.name }}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <DeleteButton class="createTag" @click.native="createTag">新建标签</DeleteButton>
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

created() {
    this.$store.commit('fetchTagList');
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  font-size: 16px;
  padding-left: 16px;
  height: 600px;
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
}


</style>