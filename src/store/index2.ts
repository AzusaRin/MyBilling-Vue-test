import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {recordListModel.create(record);},


  //tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  createTag: (tagName: string) => {
    const message = tagListModel.create(tagName);
    if (message === 'duplicated') {
      window.alert('请勿输入重复标签');
    }
    if (message === 'long') {
      window.alert('标签名过长，请控制在10字符以内');
    }
    if (message === 'succeed') {
      window.alert('标签添加成功');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};

export default store;