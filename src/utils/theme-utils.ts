
export const applyTheme = (theme: 'light' | 'dark' | 'auto') => {
  const root = document.documentElement;
  
  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  localStorage.setItem('theme', theme);
};

export const getStoredTheme = (): 'light' | 'dark' | 'auto' => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }
  return 'auto';
};

export const initializeTheme = () => {
  const theme = getStoredTheme();
  applyTheme(theme);
};
