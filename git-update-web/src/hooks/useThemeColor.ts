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

  const initThemeColor = () => {
    const isDark = hasCustomThemeColor() ? isCustomDarkThemeColor() : isSystemDarkThemeColor();
    const themePrefix = isDark ? ThemeColor.Dark : ThemeColor.Light;
    getRootDom().className = `${themePrefix}-theme`;
  }

  return {
    initThemeColor,
    isDarkMode,
  }
};
