import defaultTags from '@/constants/defaultTags';

function iconSetting(tag: Tag) {
  const defaultTagsName =defaultTags.map(n => n.name);
  if (parseInt(tag.id) <= 20 && defaultTagsName.includes(tag.name.toString())) {
    return tag.name;
  } else {
    return 'tag';
  }
}

export default iconSetting;