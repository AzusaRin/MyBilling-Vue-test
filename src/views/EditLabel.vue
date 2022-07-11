<template>
<layout>
  编辑标签
</layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
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