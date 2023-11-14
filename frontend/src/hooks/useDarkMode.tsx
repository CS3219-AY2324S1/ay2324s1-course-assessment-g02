import { useEffect, useState } from 'react';
import { useMonaco } from '@monaco-editor/react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };
  const monaco = useMonaco();

  // Define themes

  useEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme('hannahLight', {
      "base": "vs",
      "inherit": true,
      "rules": [
        { "token": "keyword", "foreground": "ff84cf" },
        { "token": "variable", "foreground": "ecae2a" },
        { "token": "function", "foreground": "ecae2a" },
        { "token": "foreground", "foreground": "4e0d3a" },
        { "token": "comment", "foreground": "7a3b69" },
        { "token": "string", "foreground": "6A20BC" },
        { "token": "number", "foreground": "1F8348" },
        { "token": "constant", "foreground": "1F8348" },
        { "token": "entity.name.function", "foreground": "d08770" }
      ],
      "colors": {
        "editor.background": "#fff7fa",
        "selection.background": "#fff7fa",
        "editor.selectionBackground": "#D7BCF4",
        "editor.lineHighlightBackground": "#D7BCF4",
        "editorActiveLineNumber.foreground": "#3A0A3C"
      }
    }
    );

    monaco.editor.defineTheme('hannahDark', {
      "base": "vs-dark",
      "inherit": true,
      "rules": [
        { "token": "keyword", "foreground": "ff84cf" },
        { "token": "foreground", "foreground": "ffffff" },
        { "token": "variable", "foreground": "ecae2a" },
        { "token": "function", "foreground": "ecae2a" },
        { "token": "string", "foreground": "6c9e74" },
        { "token": "number", "foreground": "9a70a4" },
        { "token": "constant", "foreground": "9a70a4" },
        { "token": "entity.name.function", "foreground": "5c83b1" }
      ],
      "colors": {
        "editor.background": "#3A0A3C",
        "selection.background": "#2d132c",
        "editor.selectionBackground": "#2d132c",
        "editor.lineHighlightBackground": "#3a1d37",
      }
    });
  }, [monaco]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
      monaco?.editor.setTheme('hannahDark');
    } else {
      setMode('light');
      monaco?.editor.setTheme('hannahLight');
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