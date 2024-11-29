import { defineStore } from 'pinia'
import { addKey, updateKey, removeKey, getKeys, getJSON, setJSON, removeJSON } from '../utils/json-utils';

interface State {
  // config keys
  keys: object;
  // current choose json
  json: object;
  jsonString: string;
  // current choose key
  currentKey: string;
  // right click key
  selectKey: string;
}

export const useJsonStore = defineStore('json', {
  state: (): State => ({
    keys: {},
    json: {},
    jsonString: '',
    currentKey: '',
    selectKey: '',
  }),
  actions: {
    async init() {
      const keys = await getKeys();
      this.updateKeys(keys);
      return keys;
    },
    updateKeys(keys: object) {
      this.keys = keys;
    },
    async setJSON(value: string, json: any) {
      await addKey(value, json);
      const keys = await getKeys();
      this.updateKeys(keys);
    },
    async updateJSON(json: any) {
      const key = this.currentKey;
      if (!key) {
        console.warn('key is empty');
        return;
      }
      await setJSON(key, json);
    },
    async setCurrentKey(key: string) {
      this.currentKey = key;
      this.json = await getJSON(key);
      this.jsonString = this.json ? this.json.toString() : '';
    },
    async setSelectKey(key: string) {
      this.selectKey = key;
    },
    async getInputByKey(key: string) {
      const keys = await getKeys();
      return keys[key];
    },
    async updateInputByKey(key: string, value: string) {
      await updateKey(key, value);
      const keys = await getKeys();
      this.updateKeys(keys);
      this.setSelectKey('');
    },
    async delByKey(key: string) {
      if (this.currentKey === key) {
        await this.setCurrentKey('');
      }
      await removeKey(key);
      await removeJSON(key);
      const keys = await getKeys();
      this.updateKeys(keys);
    },
    async getJSONByKey(key: string) {
      return await getJSON(key);
    },
  }
})
