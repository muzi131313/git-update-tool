import { useCommonStore } from '@/stores/common';
import { ThemeColor, ThemeColorKey } from '@/utils/constant';


export const useThemeColor = () => {
  const getRootDom = () => document.documentElement;
  const isDarkThemeColor = () => getRootDom().className.includes(ThemeColor.Dark);
  const isSystemDarkThemeColor = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getLocalThemeColor = () => localStorage.getItem(ThemeColorKey);
  const hasCustomThemeColor = () => {
    const localTheme = getLocalThemeColor();
    return localTheme && [ThemeColor.Dark, ThemeColor.Light].includes(localTheme as ThemeColor);
  };
  const isCustomDarkThemeColor = () => getLocalThemeColor() === ThemeColor.Dark;
  const isDarkMode = () => {
    return isDarkThemeColor();
  }

  const isCurrentDarkMode = () => {
    const isDark = hasCustomThemeColor() ? isCustomDarkThemeColor() : isSystemDarkThemeColor();
    return isDark;
  }

  const updateThemeColor = (theme: ThemeColor) => {
    useCommonStore().updateThemeColor(theme);
    getRootDom().className = `${theme}-theme`;
    localStorage.setItem(ThemeColorKey, theme);
  }

  const initThemeColor = () => {
    const isDark = isCurrentDarkMode();
    const theme = isDark ? ThemeColor.Dark : ThemeColor.Light;
    updateThemeColor(theme);
  }

  const toggleThemeColor = () => {
    const isDark = isCurrentDarkMode();
    const theme = isDark ? ThemeColor.Light : ThemeColor.Dark;
    updateThemeColor(theme);
    // TODO: update theme color in editor/terminal
    window.location.reload();
  }

  return {
    initThemeColor,
    toggleThemeColor,
    isDarkMode,
  }
};
