<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">
        <svg class="icon">
          <icon name="createTag"/>
        </svg>
        新增标签
      </button>
      <router-link to="/labels/" class="item" active-class="selected">
        <button>
          <svg class="icon">
            <icon name="labels"/>
          </svg>
          管理标签
        </button>
      </router-link>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.includes(tag)}"
          @click="toggle(tag)"
      >
        <div class="svgWrapper">
          <icon class="tagIcon" :name="iconName(tag)"/>
        </div>
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {createTagHelper} from '@/mixins/createTagHelper';
import {mixins} from 'vue-class-component';


@Component
export default class tags extends mixins(createTagHelper) {

  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  // eslint-disable-next-line no-undef
  iconName(tag: Tag) {
    if (parseInt(tag.id) <= 20) {
      return tag.name;
    } else {
      return 'tag';
    }
  }


  created() {
    this.$store.commit('fetchTagList');

  }

  toggle(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    } else if (this.selectedTags.length >= 1) {
      this.selectedTags.splice(0, 1);
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }


}


</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  height: 5rem;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;


  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    > ul {
      overflow: scroll;

    }

    > li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;

      > .svgWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 60px;
        background-color: white;
        border-radius: 50%;
        padding: 0 16px;
        margin: 8px;

        > .tagIcon {
          height: 60px;
          width: 60px;
          fill: currentColor;
          overflow: hidden;
          vertical-align: middle;
          padding: 2px;
        }
      }

      &.selected {
        > .svgWrapper {
          background-color: #71C9CE;
          @-webkit-keyframes shake {
            10% {
              transform: rotate(15deg);
            }
            20% {
              transform: rotate(-10deg);
            }
            30% {
              transform: rotate(5deg);
            }
            40% {
              transform: rotate(-5deg);
            }
            50%,
            100% {
              transform: rotate(0deg);
            }
          }
          -webkit-animation: shake 1s 0.15s linear infinite;
        }
      }
    }
  }

  .new {
    display: flex;
    justify-content: space-between;


    button {
      @extend %outerShadow;
      margin-top: 10px;
      background-color: white;
      padding: 8px 20px 8px 8px;
      color: #333333;
      border-radius: 8px;
      border: none;


      &:active {
        background-color: rgb(234, 236, 239);

      }


    }


    .icon {
      height: 22px;
      width: 22px;
      fill: currentColor;
      overflow: hidden;
      vertical-align: middle;
      padding-left: 2px;
      padding-bottom: 4px;

    }

  }
}

.calendar {
  display: flex;


  > .van-cell {
    width: 20%;

  }
}
</style>