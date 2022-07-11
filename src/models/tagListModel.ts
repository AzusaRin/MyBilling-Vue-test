const localStorageKeyName = 'tagList';
type Tag = {
  id: string
  name: string
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => string //
  save: () => void
}
const tagListModel: TagListModel = {
  data: [],
  //获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name)
    if (names.includes(name)) {
      return 'duplicated';
    } else if (name.length >= 10) {
      return 'long';
    } else {
      this.data.push({id:name,name:name});
      this.save();
      return 'succeed';
    }
  },
  //保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;