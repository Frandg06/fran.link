import React, { useState } from 'react';
import { useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('');

  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setTheme(theme);
    if (theme) {
      document.documentElement.classList.add(theme);
    }
  }, []);

  return { theme, toggleTheme };
};
