import { Theme, createTheme } from '@mui/material/styles';
import { Complexity } from '../interfaces/question';

export const hannahTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff84cf',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ecae2a',
      contrastText: '#ffffff'
    },
    background: {
      default: '#fff7fa',
      paper: '#ffebf5'
    },
    text: {
      primary: '#4e0d3a',
      secondary: '#7a3b69'
    }
  }
});

export const hannahThemeDark: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff84cf',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ecae2a',
      contrastText: '#33260d'
    },
    background: {
      default: '#2d132c',
      paper: '#3a1d37'
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffebf5'
    }
  }
});

export const complexityColorMap = new Map<
  Complexity,
  'success' | 'warning' | 'error'
>([
  [Complexity.Easy, 'success'],
  [Complexity.Medium, 'warning'],
  [Complexity.Hard, 'error']
]);

export const getRandomCandyEmoji = (): string => {
  const candyEmojis = [
    '🍬',
    '🍭',
    '🍫',
    '🍩',
    '🍪',
    '🧁',
    '🍰',
    '🍦',
    '🍨',
    '🍧',
    '🍨',
    '🍮',
    '🍯',
    '🍒',
    '🍓',
    '🥧'
  ];
  const randomIndex = Math.floor(Math.random() * candyEmojis.length);
  return candyEmojis[randomIndex];
};

export const getListRandomEmojis = (n: number): string[] => {
  const emojis: string[] = [];
  for (let i = 0; i < n; i++) {
    emojis.push(getRandomCandyEmoji());
  }
  return emojis;
};
