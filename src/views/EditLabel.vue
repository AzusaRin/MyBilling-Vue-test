<template>
<layout>
 <div>
   <Icon name="right"/>
   <span>编辑标签</span>
 </div>
  <notes field-name="标签名" place-holder="请输入标签名"/>
</layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Notes from '@/components/Billing/notes.vue';
@Component({
  components: {Notes}
})
export default class EditLable extends Vue {
created(){
const id = this.$route.params.id;
tagListModel.fetch;
const tag = tagListModel.data.filter(tag =>tag.id === id)[0]
  if(tag){
    console.log(tag)
  }
}
}
</script>

<style lang="scss" scoped>

</style>