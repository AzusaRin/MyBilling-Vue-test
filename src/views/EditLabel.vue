<template>
  <layout class-prefix="layout">
    <div class="navBar">
      <Icon class="left" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name" @update:value="beforeUpdateTag" field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <DeleteButton @click.native="removeTag">
        <icon name="deleteTag"/>
        删除标签
      </DeleteButton>
      <DeleteButton @click.native="updateTag">
        <icon name="confirm"/>
        确认修改
      </DeleteButton>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Billing/FormItem.vue';
import DeleteButton from '@/components/DeleteButton.vue';


@Component({
  components: {DeleteButton, FormItem},
})
export default class EditLabel extends Vue {

  newTagName?: string = '';

  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTagList');
    this.$store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  updateTag() {
    if (window.confirm('确定修改吗？')) {
      this.$store.commit('updateTag', {id: this.currentTag.id, name: this.newTagName});
    }

  }


  beforeUpdateTag(value: string) {
    this.newTagName = value;
  }

  removeTag() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id);
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .layout-content {
    padding-top: 0 !important;
  }
}

.left {
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
  position: relative;
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background-color: #A6E3E9;
}

.form-wrapper {
  margin-top: 8px;
}

.button-wrapper {
  padding: 16px;
  margin-top: 44-16px;
  display: flex;
  justify-content: space-around;
  align-items: center;



}
</style>