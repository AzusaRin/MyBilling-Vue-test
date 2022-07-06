<template>
  <div>
    <label class="notes">
      <span class="noteName">备注</span>
      <input type="text" placeholder="请在这里输入备注信息">
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: 'notes'
};
</script>

<style lang="scss" scoped>
.notes {
  background-color: #CBF1F5;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;

  .noteName {
    padding-right: 16px;

  }

  input {
    padding: 16px 0;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    padding-right: 16px;
  }
}

</style>