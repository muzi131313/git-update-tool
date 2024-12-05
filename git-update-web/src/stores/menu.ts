import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    selectId: '',
  }),
  actions: {
    updateSelectId(selectId: string) {
      this.selectId = selectId;
    },
  }
})
