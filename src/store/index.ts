import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);
type RootState = {
  recordList: RecordItem[]
  tagList: Tag[]
  currentTag?: Tag
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    fetchRecordList(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');

    },
    createRecord(state, record) {
      const newRecord: RecordItem = clone(record);
      newRecord.createAt = new Date();
      state.recordList.push(newRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTagList(state) {
      try {
        state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      } catch (error) {
        state.tagList = [];
      }
    },
    setCurrentTag(state, id) {
      state.currentTag = state.tagList.filter(tag => tag.id === id)[0];
    },
    creatTag(state, tagName) {
      const id = createId().toString();
      const names = state.tagList.map(item => item.name);
      if (names.includes(tagName)) {
        window.alert('请勿输入重复标签');
      } else if (tagName.length >= 10) {
        window.alert('标签名过长，请控制在10字符以内');
        return 'long';
      } else {
        state.tagList.push({id, name: tagName});
        store.commit('saveTags');
        window.alert('标签添加成功');
      }
    },
    removeTag(state, id) {
      if (window.confirm('确定删除该标签吗？')) {
        let index = -1;
        for (let i = 0; i < this.tagList.length; i++) {
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
          window.alert('标签删除失败');
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
