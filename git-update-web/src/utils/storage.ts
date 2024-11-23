import localforage from 'localforage';

localforage.config({
  name: 'git-update',
  driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  version: 1,
  size: 4980736,
});

export default localforage as LocalForage;
