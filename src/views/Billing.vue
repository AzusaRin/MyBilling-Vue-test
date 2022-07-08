<template>
  <layout class-prefix="layout">
    {{ record }}
    <tags :data-source.sync="tags"
          @update:value="nowTags"/>
    <notes @update:value="nowNotes"/>
    <types @update:value="nowTypes"/>
    <number-pad @update:value="nowAmount"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';

import Tags from '@/components/Billing/tags.vue';
import Notes from '@/components/Billing/notes.vue';
import Types from '@/components/Billing/types.vue';
import NumberPad from '@/components/Billing/numberPad.vue';
import {Component} from 'vue-property-decorator';

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}

@Component({components: {NumberPad, Types, Notes, Tags}})
export default class Billing extends Vue {
  tags = ['1', '2', '3', '4'];
  record: Record = {
    tags: [], type: '-', notes: '', amount: 0
  };

  nowTags(value: string[]) {
    this.record.tags = value;
  }

  nowNotes(value: string) {
    this.record.notes = value;
  }

  nowTypes(value: string) {
    this.record.type = value;
  }

  nowAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;

}

</style>
