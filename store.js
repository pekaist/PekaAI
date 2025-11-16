// Very simple local memory store using a JSON file path.
// In real app, use AsyncStorage or secure storage.
const fs = null; // not available in RN; placeholder to show concept.

// Here we'll simulate with an in-memory array during runtime.
let _store = [];

async function save(item) {
  _store.push(item);
  console.log('Memory saved', item);
}

async function all() {
  return _store;
}

export default { save, all };
