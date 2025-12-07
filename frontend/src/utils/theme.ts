export type Theme = 'light' | 'dark';

export const getTheme = (): Theme => {
  const stored = localStorage.getItem('theme') as Theme;
  return stored || 'light';
};

export const setTheme = (theme: Theme): void => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

export const initTheme = (): void => {
  const theme = getTheme();
  setTheme(theme);
};

export const toggleTheme = (): Theme => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
};

