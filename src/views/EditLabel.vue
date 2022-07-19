<template>
  <layout>
    <div class="navBar">
      <Icon name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="updateTag" field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <DeleteButton @click.native="removeTag">删除标签</DeleteButton>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Billing/FormItem.vue';
import DeleteButton from '@/components/DeleteButton.vue';

@Component({
  components: {DeleteButton, FormItem}
})
export default class EditLabel extends Vue {
  tag?: { id: string, name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tag = tagListModel.data.filter(tag => tag.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
  }

  removeTag() {
    if (this.tag) {
      if (tagListModel.remove(this.tag.id)) {
        this.$router.back();
      }
    }

  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
svg {
  height: 24px;
  width: 24px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #333333;
  position: absolute;
  left: 16px;
}

.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background-color: #A6E3E9;

  > .title {

  }

}

.form-wrapper {
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;

}
</style>