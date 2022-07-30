import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';


Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    createRecordError:null,
    recordList: [],
    tagList: [
      {id:'0',name:'交通'},
      {id:'1',name:'餐饮'},
      {id:'2',name:'礼金'},
      {id:'3',name:'学习'},
      {id:'4',name:'维修'},
      {id:'5',name:'旅行'},
      {id:'6',name:'数码'},
      {id:'7',name:'汽车'},
      {id:'8',name:'书籍'},
      {id:'9',name:'烟酒'},
      {id:'10',name:'社交'},
      {id:'11',name:'礼物'},
      {id:'12',name:'办公'},
      {id:'13',name:'长辈'},
      {id:'14',name:'孩子'},
      {id:'15',name:'住房'},
      {id:'16',name:'美容'},
      {id:'17',name:'衣服'},
      {id:'18',name:'电话'},
      {id:'19',name:'家具'},
      {id:'20',name:'娱乐'}],
    currentTag: undefined,
  } as RootState,
  mutations: {
    fetchRecordList(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');

    },
    createRecord(state, record: RecordItem) {
      const newRecord: RecordItem = clone(record);
      newRecord.createAt = new Date();
      state.recordList.push(newRecord);
      store.commit('saveRecords');

    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTagList(state) {

      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id) {
      state.currentTag = state.tagList.filter(tag => tag.id === id)[0];
    },
    creatTag(state, tagName) {
      const id = createId().toString();
      const names = state.tagList.map(item => item.name);
      if (names.includes(tagName)) {
        window.alert('请勿输入重复标签');
        return;
      } else if (tagName.length >= 10) {
        window.alert('标签名过长，请控制在10字符以内');
        return;
      } else {
        state.tagList.push({id, name: tagName});
        store.commit('saveTags');
      }
    },
    removeTag(state, id) {
      if (window.confirm('确定删除该标签吗？')) {
        let index = -1;
        for (let i = 0; i < state.tagList.length; i++) {
          if (state.tagList[i].id === id) {
            index = i;
            break;
          }
        }
        if (index >= 0) {
          state.tagList.splice(index, 1);
          store.commit('saveTags');
          router.back();
        } else {
          window.alert('请确定标签是否存在');
        }
      }

    },
    updateTag(state, payload: { id: string, name: string }) {
      const id = payload.id;
      const name = payload.name;
      const idList = state.tagList.map(item => item.id);
      if (idList.includes(id)) {
        const names = state.tagList.map(item => item.name);
        if (names.includes(name)) {
          window.alert('标签名已存在');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },

    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  },
});


export default store;
