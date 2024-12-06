import { ref, watch } from 'vue';

export function useLocalStorage(key: string, defaultValue: any) {
  // init data from localStorage
  const storedValue = localStorage.getItem(key);
  const data = ref(storedValue ? JSON.parse(storedValue) : defaultValue);

  // listen data change，and sync change to localStorage
  watch(
    data,
    (newValue) => {
      if (newValue === null || newValue === undefined) {
        localStorage.removeItem(key); // 移除键
      } else {
        localStorage.setItem(key, JSON.stringify(newValue)); // 存储数据
      }
    },
    { deep: true }
  );

  return data;
}
