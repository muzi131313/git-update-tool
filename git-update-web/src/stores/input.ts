import { defineStore } from 'pinia'

export const useInputStore = defineStore('input', {
  state: () => ({
    show: false,
    isEdit: false,
  }),
  actions: {
    updateShow(show: boolean, isEdit?: boolean) {
      if (this.show === show) {
        this.show = !show;
        setTimeout(() => {
          this.show = show;
        });
      } else {
        this.show = show;
      }
      this.isEdit = isEdit || false;
    },
  }
})
