import { ThemeColor } from '@/utils/constant';
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    themeColor: ThemeColor.Light,
  }),
  getters: {
    isDark(state) {
      return state.themeColor === ThemeColor.Dark;
    },
  },
  actions: {
    updateThemeColor(themeColor: ThemeColor) {
      this.themeColor = themeColor;
    },
  }
})
