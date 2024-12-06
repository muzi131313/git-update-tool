import LocalForage from './storage';
import { getRandomString } from './string';

const KEY_KEY = 'keys';
const JSON_KEY = 'json';

export function parseJSON(json: string) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export async function getKeys() {
  const keys: string | null = await LocalForage.getItem(KEY_KEY);
  if (!keys) {
    return {};
  }

  const json = parseJSON(keys);
  if (!json) {
    return {};
  }
  return json;
}

async function _updateKeyKey(keys: object) {
  await LocalForage.setItem(KEY_KEY, JSON.stringify(keys));
}

/**
 * save the key in [keys]'s value
 * @param {string} value
 */
export async function setKey(value: string) {
  const keys = await getKeys();
  const key = getRandomString(8);
  keys[key] = value;
  await _updateKeyKey(keys);
  return key;
}

/**
 *
 * @param {string} key
 * @returns
 */
export async function getKey(key: string) {
  const keys = await getKeys();
  return keys[key];
}

export async function updateKey(key: string, value: string) {
  const keys = await getKeys();
  keys[key] = value;
  await _updateKeyKey(keys);
}

/**
 * delete the key in [keys]'s value
 * @param {string} key
 */
export async function removeKey(key: string) {
  const keys = await getKeys();
  delete keys[key];
  await _updateKeyKey(keys);
}

/**
 * add the key and json
 * @param {string} key
 * @param {any} json
 */
export async function addKey(value: string, json: any) {
  const key = await setKey(value);
  await setJSON(key, json);
}

/**
 * get the json by key
 * @param {string} key
 */
export async function getJSON(key: string) {
  const json: string | null = await LocalForage.getItem(`${JSON_KEY}-${key}`);
  if (!json) {
    return null;
  }

  return parseJSON(json);
}

/**
 * save the json by key
 * @param {string} key
 * @param {any} json
 */
export async function setJSON(key: string, json: any) {
  await LocalForage.setItem(`${JSON_KEY}-${key}`, JSON.stringify(json));
}

/**
 * delete the json by key
 * @param {string} key
 */
export async function removeJSON(key: string) {
  await LocalForage.removeItem(`${JSON_KEY}-${key}`);
  await removeKey(key);
}
