import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export class createTagHelper extends Vue {
  createTag() {
    const tagName = window.prompt('请输入标签名');
    if (tagName) {
      this.$store.commit('creatTag', tagName);
    } else {
      window.alert('标签名不能为空');
    }
  }
}

export default createTagHelper;