<template>
  <div class="wrapper">
      <van-empty description="404页面不存在" class="empty"/>
    <div class="back">
      <router-link to="/" >
        <button>
          <svg class="icon">
            <icon name="back"/>
          </svg>
          回到记账页面
        </button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }


  button{
    @extend %outerShadow;
    display: flex;
    align-items: center;
    margin-top: 30px;
    background-color: white;
    padding: 8px 20px 8px 20px;
    color: #333333;
    border-radius: 8px;
    border: none;



    &:active {
      background-color: rgb(234, 236, 239);

    }
  }



  .icon {
    height: 30px;
    width: 30px;
    fill: currentColor;
    overflow: hidden;
    vertical-align: middle;


  }

}
</style>