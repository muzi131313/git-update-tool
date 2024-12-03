import { ThemeColor, ThemeColorKey } from "@/types/theme-color";

export const useThemeColor = () => {
  const getRootDom = () => document.documentElement;
  const isDarkThemeColor = () => getRootDom().className.includes(ThemeColor.Dark);
  const isSystemDarkThemeColor = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isCustomDarkThemeColor = () => localStorage.getItem(ThemeColorKey) === ThemeColor.Dark;
  const isDarkMode = () => {
    return isDarkThemeColor();
  }

  const initThemeColor = () => {
    const isDark = isCustomDarkThemeColor() || isSystemDarkThemeColor();
    getRootDom().className = isDark ? ThemeColor.Dark : ThemeColor.Light;
  }

  return {
    initThemeColor,
    isDarkMode,
  }
};
