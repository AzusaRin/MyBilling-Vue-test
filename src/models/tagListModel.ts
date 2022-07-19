import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],
  //获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  //创建标签
  create(name) {
    const id = createId().toString();
    const names = this.data.map(item => item.name);
    if (names.includes(name)) {
      return 'duplicated';
    } else if (name.length >= 10) {
      return 'long';
    } else {
      this.data.push({id, name: name});
      this.save();
      return 'succeed';
    }
  },
  //新增标签
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.includes(id)) {
      const names = this.data.map(item => item.name);
      if (names.includes(name)) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        tag.id = name;
        this.save();
        return 'succeed';
      }
    } else {
      return 'not found';
    }
  },
  //删除标签
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    return true;

  },
  //保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;