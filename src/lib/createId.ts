const localStorageKeyName = '_idMax';

let id = parseInt(localStorage.getItem(localStorageKeyName) || '0') || 0;

function createId() {
    id++
    window.localStorage.setItem(localStorageKeyName,id.toString())
    return id
}

export default createId