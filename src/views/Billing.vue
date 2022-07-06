<template>
  <layout class-prefix="layout">
    <tags/>
    <notes/>
    <types/>
    <number-pad/>
  </layout>
</template>

<script lang="ts">


import Tags from '@/components/Billing/tags.vue';
import Notes from '@/components/Billing/notes.vue';
import Types from '@/components/Billing/types.vue';
import NumberPad from '@/components/Billing/numberPad.vue';

export default {
  name: 'Billing',
  components: {NumberPad, Types, Notes, Tags}
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}

</style>
