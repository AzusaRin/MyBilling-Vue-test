import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export class createTagHelper extends Vue {
  createTag() {
    const tagName = window.prompt('请输入标签名');
    if(!tagName||tagName.length===0){
      this.$notify({type:'warning',message:'标签名不能为空'})
    }
    if (tagName) {
      this.$store.commit('creatTag', tagName);
    }

    }
  }


export default createTagHelper;