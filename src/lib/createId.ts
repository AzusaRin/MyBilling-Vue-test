let id: number = parseInt(window.localStorage.getItem('_idMax') || '21');

function createId() {
  id++;

  window.localStorage.setItem('_idMax', id.toString());
  return id;
}

export default createId;