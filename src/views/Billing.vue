<template>
  <layout class-prefix="layout">
    <tags :data-source="tags"/>
    <notes/>
    <types/>
    <number-pad/>
  </layout>
</template>

<script lang="js">


import Tags from '@/components/Billing/tags.vue';
import Notes from '@/components/Billing/notes.vue';
import Types from '@/components/Billing/types.vue';
import NumberPad from '@/components/Billing/numberPad.vue';

export default {
  name: 'Billing',
  components: {NumberPad, Types, Notes, Tags},
  data(){
    return{
      tags:['1','2','3','4']
    }

  }

};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}

</style>
