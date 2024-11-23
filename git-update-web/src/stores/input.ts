import { defineStore } from 'pinia'

export const useInputStore = defineStore('input', {
  state: () => ({
    show: false,
  }),
  actions: {
    updateShow(show: boolean) {
      this.show = show;
    },
  }
})
