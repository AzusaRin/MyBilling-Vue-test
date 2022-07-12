<template>
  <layout>
    <div class="navBar">
      <Icon name="left"/>
      <span class="title">编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <DeleteButton>删除标签</DeleteButton>
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
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tag = tagListModel.data.filter(tag => tag.id === id)[0];
    if (tag) {
      console.log(tag);
    }
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

.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;

}
</style>