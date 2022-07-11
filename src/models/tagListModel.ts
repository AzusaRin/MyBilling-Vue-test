const localStorageKeyName = 'tagList';
type TagListModel = {
  data: string[]
  fetch: () => string[]
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
    if (this.data.includes(name)) {
      return 'duplicated';
    }
    else if(name.length>=10){
      return 'long'
    }else {
      this.data.push(name);
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