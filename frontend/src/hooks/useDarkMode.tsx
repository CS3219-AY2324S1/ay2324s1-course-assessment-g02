import { useEffect, useState } from 'react';
import {
  defineMonacoLightTheme,
  defineMonacoDarkTheme
} from '../constants/monacoThemes';
import { editor as MonacoEditor } from 'monaco-editor';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  defineMonacoDarkTheme();
  defineMonacoLightTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
      MonacoEditor.setTheme('hannahDark');
    } else {
      setMode('light');
      MonacoEditor.setTheme('hannahLight');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !localTheme
      ? setMode('dark')
      : localTheme
      ? setTheme(localTheme)
      : setMode('light');
    setComponentMounted(true);
  }, []);

  return { theme, toggleTheme, componentMounted };
};
