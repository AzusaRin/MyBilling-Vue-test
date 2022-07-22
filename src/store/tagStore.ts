import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },

  findTag(id: string) {
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  createTag(tagName: string) {
    const id = createId().toString();
    const names = this.tagList.map(item => item.name);
    if (names.includes(tagName)) {
      window.alert('请勿输入重复标签');
      return 'duplicated';
    } else if (tagName.length >= 10) {
      window.alert('标签名过长，请控制在10字符以内');
      return 'long';
    } else {
      this.tagList.push({id, name: tagName});
      this.saveTags();
      window.alert('标签添加成功');
      return 'succeed';
    }
  },
  removeTag(id: string) {
    if(window.confirm('确定删除该标签吗？')){
      let index = -1;
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      this.tagList.splice(index, 1);
      this.saveTags();

      return true;
    }

  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.includes(id)) {
      const names = this.tagList.map(item => item.name);
      if (names.includes(name)) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'succeed';
      }
    } else {
      return 'not found';
    }
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};

tagStore.fetchTags();

export default tagStore;