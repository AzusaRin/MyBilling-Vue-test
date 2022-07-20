type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createAt?: Date
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
  tagList: Tag[];
  createTag: (tagName: string) => void;
}
