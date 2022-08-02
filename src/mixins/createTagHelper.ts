import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export class createTagHelper extends Vue {
  createTag() {
    const tagName = window.prompt('请输入标签名');
    if(tagName===null){
      return;
    }
    else if(tagName.length===0){
      this.$message.warning('标签名不能为空')
      return;
    }
    if (tagName) {
      this.$store.commit('creatTag', tagName);
    }

    }
  }


export default createTagHelper;