type RootState = {
  recordList: RecordItem[]
  tagList: Tag[]
  currentTag?: Tag
}



type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createAt?: string
}

type Tag = {
  id: string
  name: string
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => string
  save: () => void
  remove: (id: string) => boolean
  update: (id: string, name: string) => string
}

interface Window {
  store:{
    tagList: Tag[];
    findTag: (id: string) => Tag | undefined  ;
    createTag: (tagName: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => string;
    recordList:RecordItem[];
    createRecord:(record:RecordItem) => void
  }

}
